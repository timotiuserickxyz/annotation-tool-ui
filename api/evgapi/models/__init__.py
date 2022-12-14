from .common import (
    IdsField,
    BaseSchema,
)

from .directory import (
    DirectoriesSchema,
    DirectorySchema,
)
from .dataset import (
    DatasetsSchema,
    DatasetSchema,
)
from .user import (
    UserSchema,
)
from .config_context import (
    ContextualizationConfigSchema,
    ContextualizationConfigsSchema,
)
from .config_preprocess import (
    PreprocessingConfigSchema,
    PreprocessingConfigsSchema,
)
from .training import (
    ConfigPairField,
    AlgorithmField,
)
from .result import (
    ResultSchema,
    ResultsSchema,
)

SCHEMAS = {
    "Directory": DirectorySchema,
    "Directories": DirectoriesSchema,
    "Dataset": DatasetSchema,
    "Datasets": DatasetsSchema,
    "Ids": IdsField,
    "Base": BaseSchema,
    "User": UserSchema,
    "ContextualizationConfig": ContextualizationConfigsSchema,
    "ContextualizationConfigs": ContextualizationConfigsSchema,
    "PreprocessingConfig": PreprocessingConfigsSchema,
    "PreprocessingConfigs": PreprocessingConfigsSchema,
    "ConfigPair": ConfigPairField,
    "Algorithm": AlgorithmField,
    "Result": ResultSchema,
    "Results": ResultsSchema,
}
