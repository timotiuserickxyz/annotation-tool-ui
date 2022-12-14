from pathlib import Path
from loguru import logger

from evgapi.app import EVGAutomationAPI

REPOSITORY_DIR = Path(__file__).resolve().parent.parent
STATIC_DIR = REPOSITORY_DIR / "ui/public"
logger.info(f"static: {str(STATIC_DIR)}")

cors_options = {
    "cors": True,
    "cors_params": {
        "allow_origins": ["*"],
        "allow_methods": ["*"],
        "allow_headers": ["*"],
    }
}
api = EVGAutomationAPI(static_dir=STATIC_DIR, **cors_options)


if __name__ == '__main__':
    # cors_options = {
    #     "cors": True,
    #     "cors_params": {
    #         "allow_origins": ["*"],
    #         "allow_methods": ["*"],
    #         "allow_headers": ["*"],
    #     }
    # }
    # api = EVGAutomationAPI(static_dir=STATIC_DIR, **cors_options)
    # api = EVGAutomationAPI(static_dir=None)
    api.run()
