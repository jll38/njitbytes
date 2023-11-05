from datetime import datetime
import os
import requests
from flask import Flask, jsonify
from flask_basicauth import BasicAuth
from dotenv import load_dotenv
from typing import Any, List, Dict, Tuple, Optional

load_dotenv()

MEAL_PERIOD_MAPPING = {
    "8f7d": "breakfast",
    "8f73": "lunch",
    "8f5b": "dinner",
}
cached_menus: Dict[str, Any] = {}

app: Flask = Flask("NJIT Bytes")
basic_auth: BasicAuth = BasicAuth(app)

basic_auth_username: str = os.environ.get("BASIC_AUTH_USERNAME")
basic_auth_password: str = os.environ.get("BASIC_AUTH_PASSWORD")

if not basic_auth_username or not basic_auth_password:
    raise ValueError(
        "BASIC_AUTH_USERNAME and BASIC_AUTH_PASSWORD must be defined in the .env file."
    )

app.config["BASIC_AUTH_USERNAME"] = basic_auth_username
app.config["BASIC_AUTH_PASSWORD"] = basic_auth_password
app.config["BASIC_AUTH_FORCE"] = True


def get_and_cache_menu(api_base_url: str, current_date: str) -> None:
    """
    Fetches menu data from an API, filters, and caches it.

    Args:
        api_base_url (str): The base URL of the menu API.
        current_date (str): The current date in "YYYY-MM-DD" format.

    Returns:
        None
    """
    meal_periods: List[str] = list(MEAL_PERIOD_MAPPING.keys())
    for period in meal_periods:
        api_url: str = f"{api_base_url}{period}?platform=0&date={current_date}"
        menu: Tuple[str, List[Dict[str, Any]]] = filter_food_items(api_url)
        meal_name: str = MEAL_PERIOD_MAPPING.get(period, "")
        cached_menus[meal_name] = menu


def get_menu(meal_period: str) -> Optional[Dict[str, Any]]:
    """
    Returns the cached menu for the specified meal period.

    Args:
        meal_period (str): The meal period identifier.

    Returns:
        dict or None: The menu data for the specified meal period or None if not available.
    """
    return cached_menus.get(meal_period, None)


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


@app.route("/api/<meal_period>", methods=["GET"])
@basic_auth.required
def get_menu_endpoint(meal_period: str) -> Tuple[str, int]:
    """
    Endpoint to retrieve and return the cached menu for the specified meal period.

    Args:
        meal_period (str): The meal period identifier.

    Returns:
        JSON response: The menu data or an error message.
    """
    menu_data = get_menu(meal_period)

    if menu_data:
        return jsonify(menu_data), 200
    else:
        return (
            jsonify({"error": f"{meal_period.capitalize()} menu is not available"}),
            404,
        )



# Error handler for unauthorized access
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
    current_date: str = datetime.now().strftime("%Y-%m-%d")
    api_base_url: str = "https://api.dineoncampus.com/v1/location/615f4f93a9f13a32678e5feb/periods/64ecff62351d53075fcb"
    get_and_cache_menu(api_base_url, current_date)
    app.run(host="0.0.0.0", port=8080)
