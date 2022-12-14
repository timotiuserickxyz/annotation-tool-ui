from ..models.directory import (
    DirectoriesSchema,
    DirectorySchema,
)


class DatasetSourceListEndpoint:
    """Dataset Source List endpoint.
    ---
    get:
        description: Get a list of source directories
        responses:
            200:
                description: A list of existing directories
                content:
                    application/json:
                        schema:
                            $ref: '#/components/schemas/Directories'
    """

    async def on_get(self, req, resp):
        res = {
            "status": "ok",
            "directories": [{
                "name": "source_dataset_1",
                "path": "/mnt/c/Users/SosukeKato/.evgautomation/source/source_dataset_1",
                "windows": "C:\\\\Users\\SosukeKato\\.evgautomation\\source\\source_dataset_1",
            }]
        }
        resp.media = DirectoriesSchema().dump(res)


class DatasetSourceOpenEndpoint:
    """Dataset Source Open endpoint.
    ---
    get:
        description: |
            Get the source root directory such as '/mnt/c/Users/{USERNAME}/.evgautomation/source',
            and if the API server is running on WSL, try to open it using 'explorer.exe'.
        responses:
            200:
                description: The source root directory
                content:
                    application/json:
                        schema:
                            $ref: '#/components/schemas/Directory'
    """

    async def on_get(self, req, resp):
        res = {
            "status": "ok",
            "name": "source",
            "path": "/mnt/c/Users/SosukeKato/.evgautomation/source",
            "windows": "C:\\\\Users\\SosukeKato\\.evgautomation\\source",
        }
        resp.media = DirectorySchema().dump(res)
