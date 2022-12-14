from datetime import datetime

from ..models.common import (
    BaseSchema,
)


class TrainingStartEndpoint:
    """Training Start endpoint.
    ---
    post:
        description: Start training with given parameters
        requestBody:
            required: true
            content:
                application/json:
                    schema:
                        type: object
                        properties:
                            dataset_name:
                                type: string
                                example: "dataset_v1"
                            features:
                                type: array
                                items:
                                    type: string
                            config_pairs:
                                type: array
                                items:
                                    $ref: '#/components/schemas/ConfigPair'
                            algorithms:
                                type: array
                                items:
                                    $ref: '#/components/schemas/Algorithm'
                            cache:
                                type: boolean
        responses:
            200:
                description: A information of starting
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


class TrainingStopEndpoint:
    """Training Stop endpoint.
    ---
    post:
        description: Stop current running training
        responses:
            200:
                description: A information of stoping
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


class TrainingAvailableAlgorithmsEndpoint:
    """Training Available Algorithms endpoint.
    ---
    get:
        description: Get available algorithms and hyper parameters of each algorithm
        responses:
            200:
                description: Available algorithms and hyper parameters of each algorithm
                content:
                    application/json:
                        schema:
                            type: object
                            properties:
                                algorithms:
                                    type: object
    """

    async def on_get(self, req, resp):
        res = {
            "status": "ok",
            "algorithms": {
                "decision_tree": [
                    "max_depth",
                ],
                "random_forest": [
                    "max_depth",
                    "n_estimators",
                ],
            }
        }
        resp.media = res


class TrainingStatusEndpoint:
    """Training Status endpoint.
    ---
    get:
        description: Get training status
        responses:
            200:
                description: Training status
                content:
                    application/json:
                        schema:
                            type: object
                            properties:
                                checkpoints:
                                    type: array
                                    items:
                                        type: object
    """

    async def on_get(self, req, resp):
        res = {
            "status": "ok",
            "checkpoints": [{
                "name": "start",
                "timestamp": "2021/03/01 09:00:00",
            },{
                "name": "dataset_check",
                "timestamp": "2021/03/01 09:10:00",
            }]
        }
        resp.media = res

