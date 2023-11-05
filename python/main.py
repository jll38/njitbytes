from dotenv import load_dotenv
from flask import Flask, jsonify
from datetime import datetime
import requests
import os
import pytz
from google.cloud import storage
import json
from flask_basicauth import BasicAuth

app = Flask(__name__)
basic_auth: BasicAuth = BasicAuth(app)
load_dotenv()

MEAL_PERIOD_MAPPING = {
    "8f7d": "breakfast",
    "8f73": "lunch",
    "8f5b": "dinner",
}

cached_menus = {}
new_york = pytz.timezone("America/New_York")

basic_auth_username: str = os.environ.get("BASIC_AUTH_USERNAME")
basic_auth_password: str = os.environ.get("BASIC_AUTH_PASSWORD")
bucket_name: str = os.environ.get("GC_BUCKET_NAME")
api_base_url: str = os.environ.get("API_BASE_URL")

if not basic_auth_username or not basic_auth_password:
    raise ValueError(
        "BASIC_AUTH_USERNAME and BASIC_AUTH_PASSWORD must be defined in the .env file."
    )

app.config["BASIC_AUTH_USERNAME"] = basic_auth_username
app.config["BASIC_AUTH_PASSWORD"] = basic_auth_password
app.config["BASIC_AUTH_FORCE"] = True


def get_and_cache_menu(current_date: str) -> None:
    """
    Fetches and caches breakfast, lunch, and dinner menus based on the current date.

    Args:
        current_date (str): The current date in the format "%Y-%m-%d".
    """
    meal_periods = ["8f7d", "8f73", "8f5b"]  # Breakfast, Lunch, and Dinner
    for period in meal_periods:
        api_url = api_base_url + period + "?platform=0&date=" + current_date
        menu = filter_food_items(api_url)
        cached_menus[period] = menu


def get_breakfast():
    """
    Retrieves the cached breakfast menu.

    Returns:
        cached_menus.get("8f7d", None): The breakfast menu data or None if not cached.
    """
    return cached_menus.get("8f7d", None)


def get_lunch():
    """
    Retrieves the cached lunch menu.

    Returns:
        cached_menus.get("8f73", None): The lunch menu data or None if not cached.
    """
    return cached_menus.get("8f73", None)


def get_dinner():
    """
    Retrieves the cached dinner menu.

    Returns:
        cached_menus.get("8f5b", None): The dinner menu data or None if not cached.
    """
    return cached_menus.get("8f5b", None)


def filter_food_items(api_url: str):
    """
    Fetches and filters food items from the provided API URL.

    Args:
        api_url (str): The API URL to fetch menu data.

    Returns:
        period_name, structured_data: A tuple containing the meal period name and structured menu data.
    """
    menu_data = requests.get(api_url).json()
    structured_data = []

    periods = menu_data.get("menu", {}).get("periods", {})
    period_name = periods.get("name")

    categories = periods.get("categories", [])
    for category in categories:
        name = category.get("name")
        items = category.get("items", [])
        category_info = {"name": name, "items": []}

        for item in items:
            item_name = item.get("name")
            description = item.get("desc", "")
            portion = item.get("portion", "")
            calories = item.get("calories", 0)

            item_info = {
                "Item Name": item_name,
                "Description": description,
                "Portion": portion,
                "Calories": calories,
            }
            category_info["items"].append(item_info)

        structured_data.append(category_info)

    return period_name, structured_data


@app.route("/update-menu", methods=["POST"])
def update_menu():
    current_date = datetime.now(new_york).strftime("%Y-%m-%d")
    api_base_url = "https://api.dineoncampus.com/v1/location/615f4f93a9f13a32678e5feb/periods/64ecff62351d53075fcb"
    get_and_cache_menu(api_base_url, current_date)
    breakfast_menu = get_breakfast()
    lunch_menu = get_lunch()
    dinner_menu = get_dinner()

    storage_client = storage.Client()
    bucket = storage_client.get_bucket("gds-menu")
    breakfast_blob = bucket.blob("breakfast_menu.json")
    lunch_blob = bucket.blob("lunch_menu.json")
    dinner_blob = bucket.blob("dinner_menu.json")

    breakfast_blob.upload_from_string(json.dumps(breakfast_menu))
    lunch_blob.upload_from_string(json.dumps(lunch_menu))
    dinner_blob.upload_from_string(json.dumps(dinner_menu))

    return "Menu updated", 200


def read_from_bucket(blob_name):
    storage_client = storage.Client()
    bucket = storage_client.get_bucket("gds-menu")
    blob = bucket.blob(blob_name)
    return blob.download_as_string()


@app.route("/get-filtered-food-items")
def get_filtered_food_items():
    current_time = datetime.now(new_york).time()
    # current_date = datetime.now(new_york).strftime("%Y-%m-%d")
    current_time = datetime.now(new_york).time()
    now = datetime.now(new_york)
    breakfast_menu = json.loads(read_from_bucket("breakfast_menu.json"))
    lunch_menu = json.loads(read_from_bucket("lunch_menu.json"))
    dinner_menu = json.loads(read_from_bucket("dinner_menu.json"))

    if 0 <= now.weekday() <= 4:
        if (
            datetime.strptime("07:00:00", "%H:%M:%S").time()
            <= current_time
            < datetime.strptime("09:59:59", "%H:%M:%S").time()
        ):
            return breakfast_menu
        elif (
            datetime.strptime("10:00:00", "%H:%M:%S").time()
            <= current_time
            < datetime.strptime("15:59:59", "%H:%M:%S").time()
        ):
            return lunch_menu
        elif (
            datetime.strptime("16:00:00", "%H:%M:%S").time()
            <= current_time
            < datetime.strptime("22:00:00", "%H:%M:%S").time()
        ):
            return dinner_menu
        else:
            print("GDS is closed :(")
            return json.dumps({})

    else:
        if (
            datetime.strptime("10:00:00", "%H:%M:%S").time()
            <= current_time
            < datetime.strptime("11:59:59", "%H:%M:%S").time()
        ):
            return breakfast_menu
        elif (
            datetime.strptime("12:00:00", "%H:%M:%S").time()
            <= current_time
            < datetime.strptime("14:59:59", "%H:%M:%S").time()
        ):
            return lunch_menu
        elif (
            datetime.strptime("15:00:00", "%H:%M:%S").time()
            <= current_time
            < datetime.strptime("20:00:00", "%H:%M:%S").time()
        ):
            return dinner_menu
        else:
            print("GDS is closed :(")
            return json.dumps({})


@app.route("/<meal_period>", methods=["GET"])
@basic_auth.required
def get_menu_endpoint(meal_period: str):
    """
    Endpoint to retrieve and return the menu for the specified meal period.

    Args:
        meal_period (str): The meal period identifier (breakfast, lunch, dinner).

    Returns:
        JSON response: The menu data or an error message.
    """
    menu = jsonify(cached_menus.get(meal_period))
    if not menu:
        get_and_cache_menu(datetime.now(new_york).strftime("%Y-%m-%d"))
        menu = jsonify(cached_menus.get(meal_period))
    return menu


if __name__ == "__main__":
    app.run(debug=True)

