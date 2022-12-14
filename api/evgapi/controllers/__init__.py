from .dataset import (
    DatasetListEndpoint,
    DatasetEndpoint,
    DatasetNewEndpoint,
    DatasetDeleteEndpoint,
    DatasetUpdateEndpoint,
    DatasetOpenEndpoint,
)
from .dataset_source import (
    DatasetSourceListEndpoint,
    DatasetSourceOpenEndpoint,
)
from .dataset_zip import (
    DatasetZIPListEndpoint,
    DatasetZIPOpenEndpoint,
)
from .user import (
    UserStatusEndpoint,
)
from .config_context import (
    ContextListEndpoint,
    ContextUploadEndpoint,
)
from .config_preprocess import (
    PreprocessListEndpoint,
    PreprocessInfoEndpoint,
    PreprocessNewEndpoint,
    PreprocessUploadEndpoint,
)
from .training import (
    TrainingStartEndpoint,
    TrainingStopEndpoint,
    TrainingAvailableAlgorithmsEndpoint,
    TrainingStatusEndpoint,
)
from .result import (
    ResultListEndpoint,
    ResultEndpoint,
    ResultDeleteEndpoint,
)


ENDPOINTS = {
    "/user/status": UserStatusEndpoint,
    "/dataset/list": DatasetListEndpoint,
    "/dataset/id/{dataset_id}": DatasetEndpoint,
    "/dataset/new/source/{source_name}": DatasetNewEndpoint,
    "/dataset/delete": DatasetDeleteEndpoint,
    "/dataset/update/{dataset_id}": DatasetUpdateEndpoint,
    "/dataset/open/{dataset_id}": DatasetOpenEndpoint,
    "/dataset/source/list": DatasetSourceListEndpoint,
    "/dataset/source/open": DatasetSourceOpenEndpoint,
    "/dataset/zip/list": DatasetZIPListEndpoint,
    "/dataset/zip/open": DatasetZIPOpenEndpoint,
    "/context-config/list": ContextListEndpoint,
    "/context-config/upload": ContextUploadEndpoint,
    "/preprocess-config/list": PreprocessListEndpoint,
    "/preprocess-config/info/{config_name}": PreprocessInfoEndpoint,
    "/preprocess-config/new": PreprocessNewEndpoint,
    "/preprocess-config/upload": PreprocessUploadEndpoint,
    "/training/start": TrainingStartEndpoint,
    "/training/stop": TrainingStopEndpoint,
    "/training/algorithm/available": TrainingAvailableAlgorithmsEndpoint,
    "/training/status": TrainingStatusEndpoint,
    "/result/list": ResultListEndpoint,
    "/result/id/{result_id}": ResultEndpoint,
    "/result/delete": ResultDeleteEndpoint,
}
