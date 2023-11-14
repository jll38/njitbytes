""" NJIT Bytes Backend API """

from datetime import datetime
import os
import requests
import json
from flask import Flask, jsonify
from flask_basicauth import BasicAuth
from flask_cors import CORS
from dotenv import load_dotenv
from typing import Any, List, Dict, Tuple
from google.cloud import storage
import pytz

load_dotenv()

class Config:
    BASIC_AUTH_USERNAME = os.environ.get("BASIC_AUTH_USERNAME")
    BASIC_AUTH_PASSWORD = os.environ.get("BASIC_AUTH_PASSWORD")
    GC_BUCKET_NAME = os.environ.get("GC_BUCKET_NAME")
    API_BASE_URL = os.environ.get("API_BASE_URL")

if not Config.BASIC_AUTH_USERNAME or not Config.BASIC_AUTH_PASSWORD:
    raise ValueError(
        "BASIC_AUTH_USERNAME and BASIC_AUTH_PASSWORD must be defined in the .env file."
    )

MEAL_PERIOD_MAPPING = {
    "8f7d": "breakfast",
    "8f73": "lunch",
    "8f5b": "dinner",
}

cached_data: dict = {}
app = Flask(__name__)
app.config.from_object(Config)
CORS(app)
basic_auth = BasicAuth(app)
storage_client = storage.Client()
current_date = datetime.now(pytz.timezone("America/New_York")).strftime("%Y-%m-%d")


def filter_food_items(api_url: str) -> Tuple[str, List[Dict[str, Any]]]:
    """
    Fetches and filters food items from an API.

    Args:
        api_url (str): The API URL for menu data.

    Returns:
        tuple: A tuple containing period name (str) and structured menu data (list of dictionaries).
    """
    menu_data: Dict[str, Any] = requests.get(api_url).json()
    structured_data: List[Dict[str, Any]] = []

    periods: Dict[str, Any] = menu_data.get("menu", {}).get("periods", {})
    period_name: str = periods.get("name")

    categories: List[Dict[str, Any]] = periods.get("categories", [])
    for category in categories:
        name: str = category.get("name")
        items: List[Dict[str, Any]] = category.get("items", [])
        category_info: Dict[str, Any] = {"name": name, "items": []}

        for item in items:
            item_name: str = item.get("name")
            description: str = item.get("desc", "")
            portion: str = item.get("portion", "")
            calories: int = item.get("calories", 0)

            item_info: Dict[str, Any] = {
                "Item Name": item_name,
                "Description": description,
                "Portion": portion,
                "Calories": calories,
            }
            category_info["items"].append(item_info)
        structured_data.append(category_info)
    return period_name, structured_data


def get_and_cache_menu(current_date: str) -> str:
    """
    Fetches menu data from an API, filters, and caches it.

    Args:
        current_date (str): The current date in "YYYY-MM-DD" format.

    Returns:
        JSON response: A message indicating whether the menu data was updated successfully.
    """
    meal_periods: List[str] = list(MEAL_PERIOD_MAPPING.keys())
    for period in meal_periods:
        api_url: str = f"{Config.API_BASE_URL}{period}?platform=0&date={current_date}"
        menu: Tuple[str, List[Dict[str, Any]]] = filter_food_items(api_url)
        meal_name: str = MEAL_PERIOD_MAPPING.get(period, "")
        cached_data[meal_name] = menu
    return json.dumps({"message": "Menu data updated successfully."})


@app.route("/update-menus", methods=["POST"])
def update_buckets() -> str:
    """
    Updates the buckets with the cached menu data.

    Returns:
        None
    """
    get_and_cache_menu(current_date)
    bucket = storage_client.get_bucket(Config.GC_BUCKET_NAME)
    for meal_period, menu_data in cached_data.items():
        blob = bucket.blob(f"{meal_period}/menu.json")
        blob.upload_from_string(json.dumps(menu_data))
    return json.dumps({"message": "Menu data updated successfully."})

def get_bucket_data(meal_period: str):
    """
    Fetches and returns the menu data from the buckets. If the file is empty or doesn't exist,
    triggers the update of menus.

    Args:
        meal_period (str): The meal period identifier (breakfast, lunch, dinner).

    Returns:
        json: The menu data or an error message.
    """
    bucket = storage_client.get_bucket(Config.GC_BUCKET_NAME)
    blob = bucket.blob(f"{meal_period}/menu.json")
    menu_data = blob.download_as_string()

    if not menu_data:
        update_buckets()
    return json.loads(menu_data)

@app.route("/<meal_period>", methods=["GET", "OPTIONS"])
def get_menu_endpoint(meal_period: str):
    """
    Endpoint to retrieve and return the menu for the specified meal period.

    Args:
        meal_period (str): The meal period identifier (breakfast, lunch, dinner).

    Returns:
        JSON response: The menu data or an error message.
    """
    return get_bucket_data(meal_period)


@app.route("/", methods=["GET", "OPTIONS"])
def hello() -> str:
    """Return a friendly HTTP greeting.

    Returns:
        A string with the words 'Hello World!'.
    """
    return "NJIT Bytes API"


@app.errorhandler(401)
def unauthorized(e: Exception) -> Tuple[str, int]:
    """
    Error handler for unauthorized access.

    Returns:
        JSON response: An error message for unauthorized access.
    """
    return (
        jsonify({"error": "Unauthorized access. Please provide valid credentials."}),
        401,
    )


if __name__ == "__main__":
    app.run()
