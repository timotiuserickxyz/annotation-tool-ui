from loguru import logger

from ..models.config_context import (
    ContextualizationConfigSchema,
    ContextualizationConfigsSchema,
)


class ContextListEndpoint:
    """Context List endpoint.
    ---
    get:
        description: Get a list of configs for contextualization
        responses:
            200:
                description: A list of uploaded configs for contextualization
                content:
                    application/json:
                        schema:
                            $ref: '#/components/schemas/ContextualizationConfigs'
    """

    async def on_get(self, req, resp):
        res = {
            "status": "ok",
            "configs": [{
                "name": "context11",
                "flag_names": [
                    "F10%",
                    "F20%",
                    "F30%",
                    "F40%",
                    "F50%",
                    "F60%",
                    "F70%",
                    "F80%",
                    "F90%",
                    "F100%",
                ],
            },{
                "name": "context12",
                "flag_names": [
                    "F5%",
                    "F15%",
                    "F25%",
                    "F35%",
                    "F45%",
                    "F55%",
                    "F65%",
                    "F75%",
                    "F85%",
                    "F95%",
                ],
            }]
        }
        resp.media = ContextualizationConfigsSchema().dump(res)


class ContextUploadEndpoint:
    """Context Upload endpoint.
    ---
    post:
        description: |
            Upload a config file for contextualization.
        requestBody:
            required: true
            content:
                multipart/form-data:
                    schema:
                        type: object
                        properties:
                            config:
                                type: file
        responses:
            200:
                description: The uploaded config for contextualization
                content:
                    application/json:
                        schema:
                            $ref: '#/components/schemas/ContextualizationConfig'
    """

    async def on_post(self, req, resp):
        res = {
            "status": "ok",
            "name": "context11",
            "flag_names": [
                "F10%",
                "F20%",
                "F30%",
                "F40%",
                "F50%",
                "F60%",
                "F70%",
                "F80%",
                "F90%",
                "F100%",
            ],
        }
        data = await req.media(format="files")
        file_name = data["config"]["filename"]
        logger.debug(f"The name of the uploaded file is {file_name}")
        resp.media = ContextualizationConfigSchema().dump(res)
