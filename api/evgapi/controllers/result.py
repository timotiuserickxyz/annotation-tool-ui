from datetime import datetime

from ..models.common import (
    BaseSchema,
)

from ..models.result import (
    ResultSchema,
    ResultsSchema,
)


class ResultListEndpoint:
    """Result List endpoint.
    ---
    get:
        description: Get a list of results
        responses:
            200:
                description: A list of existing results
                content:
                    application/json:
                        schema:
                            $ref: '#/components/schemas/Results'
    """

    async def on_get(self, req, resp):
        res = {
            "status": "ok",
            "results": [{
                "id": 1,
                "name": "result_dataset_1_1_1",
                "dataset_name": "source_dataset_1_1",
                "num_of_models": 15000,
                "status": "ok",
            }, {
                "id": 2,
                "name": "result_dataset_1_1_2",
                "dataset_name": "source_dataset_1_1",
                "num_of_models": 25000,
                "status": "ok",
            }, {
                "id": 3,
                "name": "result_dataset_1_1_3",
                "dataset_name": "source_dataset_1_1",
                "num_of_models": 35000,
                "status": "ok",
            }]
        }
        resp.media = ResultsSchema().dump(res)


class ResultEndpoint:
    """Result endpoint.
    ---
    post:
        description: Get information of a result
        parameters:
            -   in: path
                name: result_id
                required: true
                schema:
                    type: integer
                description: The id of a result
        requestBody:
            description: information to get models of the given result
            content:
                application/json:
                    schema:
                        type: object
                        properties:
                            max_models:
                                type: number
                            page:
                                type: number
                                example: 1
                            query:
                                type: string
                                example: "acc > 0.7"
        responses:
            200:
                description: Information of the result whose id is {result_id}
                content:
                    application/json:
                        schema:
                            $ref: '#/components/schemas/Results'
    """

    async def on_post(self, req, resp, *, result_id):
        res = {
            "status": "ok",
            "id": result_id,
            "name": "result_dataset_1_1_1",
            "dataset_name": "source_dataset_1_1",
            "num_of_models": 15000,
            "status": "ok",
            "page": 1,
            "max_models": 100,
            "retrieved_modesl": 100,
            "query": "acc > 0.7",
            "models": [{
                "created_at": "2021/01/01 09:00:00",
                "acc": 0.8,
            },{
                "created_at": "2021/01/01 09:00:01",
                "acc": 0.9,
            },{
                "created_at": "2021/01/01 09:00:02",
                "acc": 0.85,
            }]
        }
        resp.media = res


class ResultDeleteEndpoint:
    """Result Delete endpoint.
    ---
    post:
        description: Delete all data related to results of the given ids
        requestBody:
            description: result ids to be deleted
            required: true
            content:
                application/json:
                    schema:
                        $ref: '#/components/schemas/Ids'
        responses:
            200:
                description: A information of deletion
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
