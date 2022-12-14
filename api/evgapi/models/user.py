# from dataclasses import dataclass
# from datetime import datetime
from marshmallow import (
    Schema,
    fields,
    # ValidationError,
)


from .common import BaseSchema


class UserSchema(BaseSchema):
    name = fields.Str()
    icon = fields.Str()
    training = fields.Str()
