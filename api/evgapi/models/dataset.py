# from dataclasses import dataclass
# from datetime import datetime
from marshmallow import (
    Schema,
    fields,
    # ValidationError,
)


from .common import BaseSchema


class CSVField(Schema):
    name = fields.Str()
    label = fields.Str()
    group = fields.Str()


class DatasetField(Schema):
    id = fields.Int(required=True)
    name = fields.Str(required=True)
    created_at = fields.DateTime()
    status = fields.Str()
    source_dir = fields.Str(required=True)
    label_mode = fields.Str(required=True)
    relative_path = fields.Str()
    csv_file = fields.Str()
    labels = fields.List(fields.Str)
    label_type = fields.Str()
    num_of_csvs = fields.Int()
    num_of_labels = fields.Int()
    num_of_columns = fields.Int()
    split_groups = fields.List(fields.Str)
    split_ratios = fields.List(fields.Float)
    labels = fields.List(fields.Str)
    columns = fields.List(fields.Str)
    split_random_seed = fields.Int()
    csv_names = fields.Str()
    memo = fields.Str()
    csvs = fields.List(fields.Nested(CSVField))


class DatasetSchema(BaseSchema, DatasetField):
    pass


class DatasetsSchema(BaseSchema):
    datasets = fields.List(fields.Nested(DatasetField))
