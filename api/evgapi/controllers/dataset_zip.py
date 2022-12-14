from ..models.directory import (
    DirectoriesSchema,
    DirectorySchema,
)


class DatasetZIPListEndpoint:
    """Dataset ZIP List endpoint.
    ---
    get:
        description: Get a list of source ZIP files
        responses:
            200:
                description: A list of existing source ZIP files
                content:
                    application/json:
                        schema:
                            $ref: '#/components/schemas/Directories'
    """

    async def on_get(self, req, resp):
        res = {
            "status": "ok",
            "directories": [{
                "name": "source_dataset_2020.zip",
                "path": "/mnt/c/Users/SosukeKato/.evgautomation/zips/source_dataset_2020.zip",
                "windows": "C:\\\\Users\\SosukeKato\\.evgautomation\\zips\\source_dataset_2020.zip",
            },{
                "name": "source_dataset_2021.zip",
                "path": "/mnt/c/Users/SosukeKato/.evgautomation/zips/source_dataset_2021.zip",
                "windows": "C:\\\\Users\\SosukeKato\\.evgautomation\\zips\\source_dataset_2021.zip",
            }]
        }
        resp.media = DirectoriesSchema().dump(res)


class DatasetZIPOpenEndpoint:
    """Dataset ZIP Open endpoint.
    ---
    get:
        description: |
            Get the source ZIP directory such as '/mnt/c/Users/{USERNAME}/.evgautomation/zips',
            and if the API server is running on WSL, try to open it using 'explorer.exe'.
        responses:
            200:
                description: The source ZIP directory
                content:
                    application/json:
                        schema:
                            $ref: '#/components/schemas/Directory'
    """

    async def on_get(self, req, resp):
        res = {
            "status": "ok",
            "name": "source",
            "path": "/mnt/c/Users/SosukeKato/.evgautomation/zips",
            "windows": "C:\\\\Users\\SosukeKato\\.evgautomation\\zips",
        }
        resp.media = DirectorySchema().dump(res)
