from loguru import logger

from ..models.config_preprocess import (
    PreprocessingConfigSchema,
    PreprocessingConfigsSchema,
)


class PreprocessListEndpoint:
    """Preprocess List endpoint.
    ---
    get:
        description: Get a list of configs for preprocessing
        responses:
            200:
                description: A list of uploaded or created configs for preprocessing
                content:
                    application/json:
                        schema:
                            $ref: '#/components/schemas/PreprocessingConfigs'
    """

    async def on_get(self, req, resp):
        res = {
            "status": "ok",
            "configs": [{
                "name": "context11",
                "num_of_ch": 1,
                "num_of_ctx": 2,
                "num_of_norm": 4,
                "num_of_resampling": 2,
                "total": 14,
            },{
                "name": "context12",
                "num_of_ch": 2,
                "num_of_ctx": 2,
                "num_of_norm": 4,
                "num_of_resampling": 2,
                "total": 28,
            }]
        }
        resp.media = PreprocessingConfigsSchema().dump(res)


class PreprocessInfoEndpoint:
    """Preprocess Info endpoint.
    ---
    get:
        description: Get information of config for preprocessing
        parameters:
            -   in: path
                name: config_name
                required: true
                schema:
                    type: string
                description: The name of the config
        responses:
            200:
                description: Information of config for preprocessing
                content:
                    application/json:
                        schema:
                            $ref: '#/components/schemas/PreprocessingConfig'
    """

    async def on_get(self, req, resp, *, config_name):
        res = {
            "status": "ok",
            "name": config_name,
            "num_of_ch": 1,
            "num_of_ctx": 2,
            "num_of_norm": 4,
            "num_of_resampling": 2,
            "total": 14,
            "preprocessings": [{ # 1
                "channel": 1,
                "ctx_flags": "0000000000",
                "norm_flag": 0,
                "resampling": 0,
            },{ # 2
                "channel": 1,
                "ctx_flags": "1000000000",
                "norm_flag": 0,
                "resampling": 0,
            },{ # 3
                "channel": 1,
                "ctx_flags": "0000000000",
                "norm_flag": 1,
                "resampling": 0,
            },{ # 4
                "channel": 1,
                "ctx_flags": "0000000000",
                "norm_flag": 2,
                "resampling": 0,
            },{ # 5
                "channel": 1,
                "ctx_flags": "1000000000",
                "norm_flag": 2,
                "resampling": 0,
            },{ # 6
                "channel": 1,
                "ctx_flags": "0000000000",
                "norm_flag": 3,
                "resampling": 0,
            },{ # 7
                "channel": 1,
                "ctx_flags": "1000000000",
                "norm_flag": 3,
                "resampling": 0,
            },{ # 8
                "channel": 1,
                "ctx_flags": "0000000000",
                "norm_flag": 0,
                "resampling": 1,
            },{ # 9
                "channel": 1,
                "ctx_flags": "1000000000",
                "norm_flag": 0,
                "resampling": 1,
            },{ # 10
                "channel": 1,
                "ctx_flags": "0000000000",
                "norm_flag": 1,
                "resampling": 1,
            },{ # 11
                "channel": 1,
                "ctx_flags": "0000000000",
                "norm_flag": 2,
                "resampling": 1,
            },{ # 12
                "channel": 1,
                "ctx_flags": "1000000000",
                "norm_flag": 2,
                "resampling": 1,
            },{ # 13
                "channel": 1,
                "ctx_flags": "0000000000",
                "norm_flag": 3,
                "resampling": 1,
            },{ # 14
                "channel": 1,
                "ctx_flags": "1000000000",
                "norm_flag": 3,
                "resampling": 1,
            }]

        }
        resp.media = PreprocessingConfigSchema().dump(res)


class PreprocessNewEndpoint:
    """Preprocess New endpoint.
    ---
    post:
        description: |
            Create a new config for preprocessing.
        requestBody:
            required: true
            content:
                application/json:
                    schema:
                        type: object
                        properties:
                            config_name:
                                nullable: true
                                type: string
                                example: "simple"
                            channel_list:
                                required: true
                                type: array
                                items:
                                    type: number
                            ctx_flags_list:
                                required: true
                                type: array
                                items:
                                    type: string
                            norm_flag_list:
                                required: true
                                type: array
                                items:
                                    type: number
                            resampling_list:
                                required: true
                                type: array
                                items:
                                    type: number
        responses:
            200:
                description: The created config for preprocessing
                content:
                    application/json:
                        schema:
                            $ref: '#/components/schemas/PreprocessingConfig'
    """

    async def on_post(self, req, resp):
        res = {
            "status": "ok",
            "name": "context11",
            "num_of_ch": 1,
            "num_of_ctx": 2,
            "num_of_norm": 4,
            "num_of_resampling": 2,
            "total": 14,
        }
        resp.media = PreprocessingConfigSchema().dump(res)




class PreprocessUploadEndpoint:
    """Preprocess Upload endpoint.
    ---
    post:
        description: |
            Upload a csv file for preprocessing.
        requestBody:
            required: true
            content:
                multipart/form-data:
                    schema:
                        type: object
                        properties:
                            csv:
                                type: file
        responses:
            200:
                description: The uploaded config for preprocessing
                content:
                    application/json:
                        schema:
                            $ref: '#/components/schemas/PreprocessingConfig'
    """

    async def on_post(self, req, resp):
        res = {
            "status": "ok",
            "name": "context11",
            "num_of_ch": 1,
            "num_of_ctx": 2,
            "num_of_norm": 4,
            "num_of_resampling": 2,
            "total": 14,
        }
        data = await req.media(format="files")
        file_name = data["csv"]["filename"]
        logger.debug(f"The name of the uploaded file is {file_name}")
        resp.media = PreprocessingConfigSchema().dump(res)
