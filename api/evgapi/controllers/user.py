from datetime import datetime

from ..models.common import (
    BaseSchema,
)

from ..models.user import (
    UserSchema,
)


class UserStatusEndpoint:
    """User status endpoint.
    ---
    get:
        description: Get the user status
        responses:
            200:
                description: A list of existing datasets
                content:
                    application/json:
                        schema:
                            $ref: '#/components/schemas/User'
    """

    async def on_get(self, req, resp):
        res = {
            "status": "ok",
            "name": "skato",
            "icon": "https://avatars.githubusercontent.com/u/4187224",
            "training": None,
        }
        resp.media = UserSchema().dump(res)
