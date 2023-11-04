from datetime import datetime
import os
import requests
from flask import Flask, request, jsonify
from flask_basicauth import BasicAuth
from dotenv import load_dotenv

load_dotenv()

cached_menus = {}

app = Flask("NJIT Bytes")
basic_auth = BasicAuth(app)

basic_auth_username = os.environ.get("BASIC_AUTH_USERNAME")
basic_auth_password = os.environ.get("BASIC_AUTH_PASSWORD")

if not basic_auth_username or not basic_auth_password:
    raise ValueError(
        "BASIC_AUTH_USERNAME and BASIC_AUTH_PASSWORD must be defined in the .env file."
    )

app.config["BASIC_AUTH_USERNAME"] = basic_auth_username
app.config["BASIC_AUTH_PASSWORD"] = basic_auth_password
app.config["BASIC_AUTH_FORCE"] = True  # Enable authentication for all endpoints


def get_and_cache_menu(api_base_url: str, current_date: str) -> None:
    """
    Fetches menu data from an API, filters and caches it.

    Args:
        api_base_url (str): The base URL of the menu API.
        current_date (str): The current date in "YYYY-MM-DD" format.

    Returns:
        None
    """
    meal_periods = ["8f7d", "8f73", "8f5b"]  # Breakfast, Lunch, and Dinner
    for period in meal_periods:
        api_url = api_base_url + period + "?platform=0&date=" + current_date
        menu = filter_food_items(api_url)
        cached_menus[period] = menu


def get_breakfast() -> dict:
    """
    Returns the cached breakfast menu.

    Returns:
        dict: The breakfast menu data.
    """
    return cached_menus.get("8f7d", None)


def get_lunch() -> dict:
    """
    Returns the cached lunch menu.

    Returns:
        dict: The lunch menu data.
    """
    return cached_menus.get("8f73", None)


def get_dinner() -> dict:
    """
    Returns the cached dinner menu.

    Returns:
        dict: The dinner menu data.
    """
    return cached_menus.get("8f5b", None)


def filter_food_items(api_url: str) -> tuple:
    """
    Fetches and filters food items from an API.

    Args:
        api_url (str): The API URL for menu data.

    Returns:
        tuple: A tuple containing period name (str) and structured menu data (list).
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


@app.route("/api/breakfast", methods=["GET"])
@basic_auth.required
def get_breakfast_menu():
    """
    Endpoint to retrieve and return the cached breakfast menu.

    Returns:
        JSON response: The breakfast menu data or an error message.
    """
    breakfast_menu = get_breakfast()

    if breakfast_menu:
        return jsonify(breakfast_menu), 200
    else:
        return jsonify({"error": "Breakfast menu is not available"}), 404


@app.route("/api/lunch", methods=["GET"])
@basic_auth.required
def get_lunch_menu():
    """
    Endpoint to retrieve and return the cached lunch menu.

    Returns:
        JSON response: The lunch menu data or an error message.
    """
    lunch_menu = get_lunch()

    if lunch_menu:
        return jsonify(lunch_menu), 200
    else:
        return jsonify({"error": "Lunch menu is not available"}), 404


@app.route("/api/dinner", methods=["GET"])
@basic_auth.required
def get_dinner_menu():
    """
    Endpoint to retrieve and return the cached dinner menu.

    Returns:
        JSON response: The dinner menu data or an error message.
    """
    dinner_menu = get_dinner()

    if dinner_menu:
        return jsonify(dinner_menu), 200
    else:
        return jsonify({"error": "Dinner menu is not available"}), 404


# Error handler for unauthorized access
@app.errorhandler(401)
def unauthorized(e):
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
    current_date = datetime.now().strftime("%Y-%m-%d")
    api_base_url = "https://api.dineoncampus.com/v1/location/615f4f93a9f13a32678e5feb/periods/64ecff62351d53075fcb"
    get_and_cache_menu(api_base_url, current_date)
    app.run(host="0.0.0.0", port=8080)
