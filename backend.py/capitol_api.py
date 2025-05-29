# capitol_api.py
import os
import requests
import json
import asyncio
import websockets
from dotenv import load_dotenv


def create_story(prompt: str):
    """
    create_story: prompt-> str, user's prompt
    creates a story generated from the user's prompt
    """
    try:
        load_dotenv()
        API_KEY = os.getenv("CAPITOL_AI_API_KEY")
        if not API_KEY:
            raise ValueError(
                "Capitol AI API key not found. Please set CAPITOL_AI_API_KEY in your .env file"
            )

        url = "https://clj-services-development.capitol.ai/api/v1/chat/async"

        headers = {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "x-api-key": API_KEY,
            "x-domain": "test",
            "x-user-id": "1",
        }

        obj = {
            "user-config-params": {
                "academic_web_search": False,
                "ai_graphs": True,
                "ai_images": False,
                "audience": "general",
                "cot": False,
                "custom_instructions": "",
                "format": "turbo_article",
                "general_web_search": True,
                "headers": True,
                "hero_image": True,
                "image_height": 768,
                "image_style": "auto",
                "image_width": 1344,
                "images": True,
                "metrics": True,
                "paragraphs": True,
                "quotes": True,
                "rag_budget": "default",
                "response_language": "english",
                "response_length": "3 pages",
                "response_model": "claude-3-5-sonnet-20240620",
                "tables": True,
                "title": True,
                "tweets": False,
                "use_perplexity": True,
                "user_images": [],
                "user_pdf_documents": [],
                "user_pdf_urls": [],
                "user_pre_processed_sources": [],
                "user_query": prompt,
                "user_urls": [],
                "web_graphs": True,
            }
        }

        response = requests.post(url, headers=headers, json=obj)
        response.raise_for_status()
        print("OK:", response.status_code, response.text)
        data = response.json()
        return data["externalId"], data["draftId"], data["socketAddress"], data["url"]

    except Exception as e:
        print(f"API call failed: {str(e)}")
        return False


def search(query):
    # query is a string that we search for relevent embedings
    pass
    # pass # return a list of string documents in rank order ~ other output formats can work
