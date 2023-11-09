import {
  createSession,
  getSession,
  getSessions,
  NewSession,
  updateSession,
  SessionData,
  deleteSession,
} from "../../api/sessions";

export const session = {
  getAll: () => getSessions(),
  getById(_id: SessionData["_id"]) {
    validateIdExists(_id);
    return getSession(_id);
  },
  create: (newSession: NewSession) => createSession(newSession),
  update(updateData: SessionData) {
    validateIdExists(updateData._id);
    return updateSession(updateData);
  },
  delete(_id: SessionData["_id"]) {
    validateIdExists(_id);
    return deleteSession(_id);
  },
};

const validateIdExists = (_id: string) => {
  if (_id?.length > 0) return true;
  throw new Error("Session ID is required");
};
