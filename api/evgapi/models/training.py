# from dataclasses import dataclass
# from datetime import datetime
from marshmallow import (
    Schema,
    fields,
    # ValidationError,
)


from .common import BaseSchema


class ConfigPairField(Schema):
    ctx_config_name = fields.Str()
    preprocess_config_name = fields.Str()

class AlgorithmField(Schema):
    name = fields.Str()
    parameters = fields.Dict()


# class ContextualizationConfigSchema(BaseSchema, ContextualizationConfigField):
#     pass


# class ContextualizationConfigsSchema(BaseSchema):
#     configs = fields.List(fields.Nested(ContextualizationConfigField))
