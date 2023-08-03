from pydantic import BaseModel
from typing import Literal


class CreateSessionModel(BaseModel):
    muid: str
    dev_type: Literal["pc", "ios", "android"]
    transferred: float
    is_fraud: bool


class UpdateSessionModel(CreateSessionModel):
    _id: str
