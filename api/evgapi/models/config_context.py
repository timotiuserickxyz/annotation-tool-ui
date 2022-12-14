# from dataclasses import dataclass
# from datetime import datetime
from marshmallow import (
    Schema,
    fields,
    # ValidationError,
)


from .common import BaseSchema


class ContextualizationConfigField(Schema):
    name = fields.Str()
    flag_names = fields.List(fields.Str)


class ContextualizationConfigSchema(BaseSchema, ContextualizationConfigField):
    pass


class ContextualizationConfigsSchema(BaseSchema):
    configs = fields.List(fields.Nested(ContextualizationConfigField))
