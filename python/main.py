import requests
from datetime import datetime


cached_menus = {}


def get_and_cache_menu(api_base_url: str, current_date: str) -> None:
    """
    Fetches and caches breakfast, lunch, and dinner menus based on the current date.

    Args:
        api_base_url (str): The base URL for the menu API.
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


def main() -> None:
    current_date = datetime.now().strftime("%Y-%m-%d")
    api_base_url = "https://api.dineoncampus.com/v1/location/615f4f93a9f13a32678e5feb/periods/64ecff62351d53075fcb"

    get_and_cache_menu(api_base_url, current_date)

    breakfast_menu = get_breakfast()
    lunch_menu = get_lunch()
    dinner_menu = get_dinner()

    print(breakfast_menu)


if __name__ == "__main__":
    main()
