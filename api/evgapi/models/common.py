from marshmallow import (
    Schema,
    fields,
)


class BaseSchema(Schema):
    status = fields.Str(required=True)
    error = fields.Str(required=False)


class IdsField(Schema):
    ids = fields.List(fields.Int)
