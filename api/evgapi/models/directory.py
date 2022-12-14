from dataclasses import dataclass
from datetime import datetime
from marshmallow import (
    Schema,
    fields,
    # ValidationError,
)


from .common import BaseSchema


@dataclass
class Directory:
    name: str
    path: str
    windows: str
    updated_at: datetime = datetime.now


class DirectoryField(Schema):
    name = fields.Str(required=True)
    path = fields.Str(required=True)
    windows = fields.Str()
    updated_at = fields.DateTime()


class DirectorySchema(BaseSchema, DirectoryField):
    pass


class DirectoriesSchema(BaseSchema):
    directories = fields.List(fields.Nested(DirectoryField))
