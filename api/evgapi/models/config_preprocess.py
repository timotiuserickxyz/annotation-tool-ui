# from dataclasses import dataclass
# from datetime import datetime
from marshmallow import (
    Schema,
    fields,
    # ValidationError,
)


from .common import BaseSchema


class PreprocessingField(Schema):
    channel = fields.Int()
    ctx_flags = fields.Str()
    norm_flag = fields.Int()
    resampling = fields.Int()


class PreprocessingConfigField(Schema):
    name = fields.Str()
    num_of_ch = fields.Int()
    num_of_ctx = fields.Int()
    num_of_norm = fields.Int()
    num_of_resampling = fields.Int()
    total = fields.Int()
    preprocessings = fields.List(fields.Nested(PreprocessingField))


class PreprocessingConfigSchema(BaseSchema, PreprocessingConfigField):
    pass


class PreprocessingConfigsSchema(BaseSchema):
    configs = fields.List(fields.Nested(PreprocessingConfigField))
