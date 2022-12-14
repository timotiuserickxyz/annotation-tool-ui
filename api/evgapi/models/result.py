# from dataclasses import dataclass
# from datetime import datetime
from marshmallow import (
    Schema,
    fields,
    # ValidationError,
)


from .common import BaseSchema


class ResultField(Schema):
    id = fields.Int(required=True)
    name = fields.Str(required=True)
    created_at = fields.DateTime()
    status = fields.Str()
    dataset_name = fields.Str()
    num_of_models = fields.Int()
    page = fields.Int()
    max_models = fields.Int()
    retrieved_modesl = fields.Int()
    query = fields.Str()
    # models = fields.List(fields.Nested(fields.Dict()))


class ResultSchema(BaseSchema, ResultField):
    pass


class ResultsSchema(BaseSchema):
    results = fields.List(fields.Nested(ResultField))
