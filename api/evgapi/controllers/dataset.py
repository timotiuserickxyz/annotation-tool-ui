from datetime import datetime

from ..models.common import (
    BaseSchema,
)

from ..models.dataset import (
    DatasetSchema,
    DatasetsSchema,
)

from ..models.directory import (
    DirectorySchema,
)


class DatasetListEndpoint:
    """Dataset List endpoint.
    ---
    get:
        description: Get a list of datasets
        responses:
            200:
                description: A list of existing datasets
                content:
                    application/json:
                        schema:
                            $ref: '#/components/schemas/Datasets'
    """

    async def on_get(self, req, resp):
        res = {
            "status": "ok",
            "datasets": [{
                "id": 1,
                "name": "source_dataset_1_1",
                "source_dir": "/mnt/c/Users/SosukeKato/.evgautomation/source/source_dataset_1",
                "label_mode": "relative_path",
                "num_of_csvs": 2052,
                "num_of_labels": 3,
                "num_of_columns": 54,
                "status": "ok",
                "memo": "v3として作成。ラベルモードは相対パスを利用。",
            }, {
                "id": 2,
                "name": "source_dataset_1_2",
                "source_dir": "/mnt/c/Users/SosukeKato/.evgautomation/source/source_dataset_1",
                "label_mode": "csv_file",
                "num_of_csvs": 2052,
                "num_of_labels": 2,
                "num_of_columns": 54,
                "status": "ok",
                "memo": "v3として作成。ラベルモードはCSVファイルを指定。",
            }, {
                "id": 3,
                "name": "source_dataset_2_1",
                "source_dir": "/mnt/c/Users/SosukeKato/.evgautomation/source/source_dataset_2",
                "label_mode": "relative_path",
                "num_of_csvs": 3052,
                "num_of_labels": 3,
                "num_of_columns": 54,
                "status": "ok",
                "memo": "v3として作成。ラベルモードは相対パスを利用。",
            }]
        }
        resp.media = DatasetsSchema().dump(res)


class DatasetEndpoint:
    """Dataset endpoint.
    ---
    get:
        description: Get information of a dataset
        parameters:
            -   in: path
                name: dataset_id
                required: true
                schema:
                    type: integer
                description: The id of a dataset
        responses:
            200:
                description: Information of the dataset whose id is {dataset_id}
                content:
                    application/json:
                        schema:
                            $ref: '#/components/schemas/Dataset'
    """

    async def on_get(self, req, resp, *, dataset_id):
        res = {
            "status": "ok",
            "id": dataset_id,
            "name": "source_dataset_1_1",
            "created_at": datetime.now(),
            "source_dir": "/mnt/c/Users/SosukeKato/.evgautomation/source/source_dataset_1",
            "label_mode": "relative_path",
            "relative_path": "first",
            "label_type": "classification",
            "num_of_csvs": 3000,
            "num_of_labels": 3,
            "labels": [
                "High",
                "Mid",
                "Low",
            ],
            "num_of_columns": 4,
            "columns": [
                "Speed1",
                "Speed2",
                "Speed3",
                "Speed4",
            ],
            "split_groups": ["train", "valid", "test"],
            "split_ratios": [0.8, 0.1, 0.1],
            "split_random_seed": 2021,
            "csv_names": "csvnames.parquet",
            "csvs": [
                {"name": "1.csv", "label": "High", "group": "train"},
                {"name": "2.csv", "label": "High", "group": "train"},
                {"name": "3.csv", "label": "High", "group": "train"},
                {"name": "4.csv", "label": "High", "group": "train"},
                {"name": "5.csv", "label": "Mid", "group": "train"},
                {"name": "6.csv", "label": "Mid", "group": "train"},
                {"name": "7.csv", "label": "Low", "group": "train"},
                {"name": "8.csv", "label": "Low", "group": "train"},
                {"name": "9.csv", "label": "Low", "group": "train"},
                {"name": "10.csv", "label": "Low", "group": "train"},
                {"name": "11.csv", "label": "Low", "group": "train"},
                {"name": "12.csv", "label": "Low", "group": "train"},
                {"name": "13.csv", "label": "High", "group": "valid"},
                {"name": "14.csv", "label": "Low", "group": "valid"},
                {"name": "15.csv", "label": "Low", "group": "test"},
            ]
        }
        resp.media = DatasetSchema().dump(res)


class DatasetNewEndpoint:
    """Dataset New endpoint.
    ---
    post:
        description: |
            Create a new dataset using CSV(s) under a source directory
            such as '/mnt/c/Users/{USERNAME}/.evgautomation/source/{source_name}'.
        parameters:
            -   in: path
                name: source_name
                required: true
                schema:
                    type: string
                description: The name of the source directory
        requestBody:
            required: true
            content:
                application/json:
                    schema:
                        type: object
                        properties:
                            dataset_name:
                                required: true
                                type: string
                                example: "dataset_v1"
                            label_mode:
                                required: true
                                type: string
                                example: "relative_path"
                            relative_path:
                                nullable: true
                                type: string
                                example: "firtst"
                            csv_file:
                                nullable: true
                                type: string
                            column_mode:
                                required: true
                                type: string
                                example: "majority"
                            num_of_columns:
                                nullable: true
                                type: integer
                            memo:
                                nullable: true
                                type: string
                                example: "ノイズの多い高評価オペレータの音声データセット"
        responses:
            200:
                description: A information of the created dataset
                content:
                    application/json:
                        schema:
                            $ref: '#/components/schemas/Dataset'
    """

    async def on_post(self, req, resp, *, source_name):
        res = {
            "status": "ok",
            "id": 1,
            "name": source_name,
            "created_at": datetime.now(),
            "source_dir": "/mnt/c/Users/SosukeKato/.evgautomation/source/source_dataset_1",
            "label_mode": "relative_path",
            "relative_path": "first",
            "label_type": "classification",
            "num_of_csvs": 3000,
            "num_of_labels": 3,
            "num_of_columns": 50,
            "split_groups": ["train", "test"],
            "split_ratios": [0.9, 0.1],
            "split_random_seed": 2021,
            "csv_names": "csvnames.parquet",
        }
        resp.media = DatasetSchema().dump(res)


class DatasetDeleteEndpoint:
    """Dataset Delete endpoint.
    ---
    post:
        description: Delete dataset JSONs of the given ids
        requestBody:
            description: dataset ids to be deleted
            required: true
            content:
                application/json:
                    schema:
                        $ref: '#/components/schemas/Ids'
        responses:
            200:
                description: A information of the extracted directory from the source ZIP file
                content:
                    application/json:
                        schema:
                            $ref: '#/components/schemas/Base'
    """

    async def on_post(self, req, resp):
        res = {
            "status": "ok",
        }
        resp.media = BaseSchema().dump(res)


class DatasetUpdateEndpoint:
    """Dataset Update endpoint.
    ---
    post:
        description: Update dataset JSONs of the given id
        parameters:
            -   in: path
                name: dataset_id
                required: true
                schema:
                    type: string
                description: The id of the dataset
        requestBody:
            required: true
            content:
                application/json:
                    schema:
                        type: object
                        properties:
                            update_type:
                                required: true
                                type: string
                                example: "add_files|remove_files|label|group|split"
                            file_names:
                                nullable: true
                                type: array
                                items:
                                    type: string
                            file_name:
                                nullable: true
                                type: string
                            label:
                                nullable: true
                                type: string
                            group:
                                nullable: true
                                type: string
                            split:
                                type: array
                                items:
                                    type: number
        responses:
            200:
                description: A information of the extracted directory from the source ZIP file
                content:
                    application/json:
                        schema:
                            $ref: '#/components/schemas/Base'
    """

    async def on_post(self, req, resp, *, dataset_id):
        res = {
            "status": "ok",
        }
        resp.media = BaseSchema().dump(res)


class DatasetOpenEndpoint:
    """Dataset Open endpoint.
    ---
    get:
        description: |
            Get the dataset directory such as '/mnt/c/Users/{USERNAME}/.evgautomation/source/dataset1',
            and if the API server is running on WSL, try to open it using 'explorer.exe'.
        responses:
            200:
                description: The dataset directory
                content:
                    application/json:
                        schema:
                            $ref: '#/components/schemas/Directory'
    """

    async def on_get(self, req, resp, *, dataset_id):
        res = {
            "status": "ok",
            "name": "source",
            "path": f"/mnt/c/Users/SosukeKato/.evgautomation/source/{dataset_id}",
            "windows": f"C:\\\\Users\\SosukeKato\\.evgautomation\\source\\{dataset_id}",
        }
        resp.media = DirectorySchema().dump(res)
