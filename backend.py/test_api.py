import capitol_api as c_api
import requests
import os
import json
import asyncio
import logging, http.client as http_client

from capitol_api import create_story
from dotenv import load_dotenv

http_client.HTTPConnection.debuglevel = 1
logging.basicConfig(level=logging.DEBUG)
logging.getLogger("requests.packages.urllib3").setLevel(logging.DEBUG)


def test_api_functionality():
    try:
        API_KEY = os.getenv("CAPITOL_AI_API_KEY")
        if not API_KEY:
            raise ValueError(
                "Capitol AI API key not found. Please set CAPITOL_AI_API_KEY in your .env file"
            )

        url = "https://clj-services-development.capitol.ai/api/v1/api_prompts"

        headers = {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "x-api-key": API_KEY,
            "x-domain": "test",
            "x-user-id": "1",
        }
        try:
            response = requests.get(url, headers=headers)
            response.raise_for_status()
            print("OK:", response.status_code, response.text)
            success = True
        except requests.HTTPError as http_err:
            print(f"HTTP error: {http_err}")
            print("Response body:", response.text or "<empty>")
            success = False

    except Exception as e:
        print(f"API call failed: {str(e)}")
        return False


if __name__ == "__main__":
    load_dotenv()
    external_id, draft_id, socket_addr, url = create_story(
        "write a patent-infringement suit involving a wireless earbud charging case, include facts"
    )
    print(f"url: {url}")
