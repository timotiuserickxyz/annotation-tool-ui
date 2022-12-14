import responder
from .controllers import ENDPOINTS
from .models import SCHEMAS


class EVGAutomationAPI(responder.API):

    DEFAULT_PREFIX = "/api/v0"

    OPENAPI_PARAMS = {
        "title": "EVG Automation API",
        # "version": "3.0.2",
        "openapi": "3.0.2",
    }

    def __init__(self, static_dir=None, prefix=None, **kwargs):
        params = {
            "docs_route": "/apidocs",
        }
        params.update(self.OPENAPI_PARAMS)
        params.update(kwargs)

        if static_dir is not None:
            params.update({
                "static_dir": str(static_dir),
                "static_route": "/static",
            })

        super().__init__(**params)

        # if static_dir is not None:
        #     self.add_route("/", static=True, default=True)

        if prefix is None:
            prefix = self.DEFAULT_PREFIX

        for route, endpoint in ENDPOINTS.items():
            self.add_route(prefix + route, endpoint)

        for name, schema in SCHEMAS.items():
            self.schema(name)(schema)
