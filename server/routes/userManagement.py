from fastapi import APIRouter, HTTPException
from bson import ObjectId

from entities.sessions import CreateSessionModel, UpdateSessionModel
from fastapi.responses import ORJSONResponse
from internal.mongoService import sessions_connection

sessions_router = APIRouter()


@sessions_router.get("/sessions")
async def get_sessions():
    all_sessions = list(sessions_connection.find({"is_deleted": False}))
    if not all_sessions or not len(all_sessions):
        raise HTTPException(404, "Couldn't find any session")
    return [{**session, "_id": str(session["_id"])} for session in all_sessions]


@sessions_router.get("/session/{id}")
async def get_session(id):
    requested_session = sessions_connection.find_one(
        {"_id": ObjectId(id), "is_deleted": False}
    )
    if not requested_session:
        raise HTTPException(404, "Couldn't find any sessions")

    requested_session["id"] = str(requested_session["_id"])
    return ORJSONResponse(requested_session)


@sessions_router.post("/session/")
async def create_session(session_details: CreateSessionModel):
    # _id will always be unique (mongo-generated). MUID should be unique as user defines it
    existing_session = sessions_connection.find_one({"muid": session_details.muid})

    if not existing_session:
        item = session_details.model_dump()
        created_id = sessions_connection.insert_one(
            {**item, "is_deleted": False}
        ).inserted_id
        return ORJSONResponse({**item, "_id": str(created_id)})
    if existing_session["is_deleted"]:
        await delete_session(existing_session["_id"], delete=False)
        await update_session(existing_session["_id"], session_details)

        updated_value = sessions_connection.find_one(
            {"_id": ObjectId(existing_session["_id"]), "is_deleted": False}
        )
        return {**updated_value, "_id": str(existing_session["_id"])}
    raise HTTPException(400, "A session with this ID already exists!")


@sessions_router.patch("/session/{id}")
async def update_session(id: str, session_details: UpdateSessionModel):
    obj_id = ObjectId(id)
    session = sessions_connection.find_one({"_id": obj_id, "is_deleted": False})
    if not session:
        raise HTTPException(404, "Couldn't find the requested session")
    sessions_connection.update_one(
        {"_id": obj_id, "is_deleted": False},
        {
            "$set": {
                "dev_type": session_details.dev_type,
                "transferred": session_details.transferred,
                "is_fraud": session_details.is_fraud,
            }
        },
    )
    return True


@sessions_router.delete("/session/{id}")
async def delete_session(id: str, delete=True):
    sessions_connection.update_one(
        {"_id": ObjectId(id)},
        {
            "$set": {
                "is_deleted": delete,
            }
        },
    )
    return True
