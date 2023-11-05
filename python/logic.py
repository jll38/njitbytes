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
        api_url = f"{api_base_url}{period}?platform=0&date={current_date}"
        menu = filter_food_items(api_url)
        cached_menus[period] = menu


def get_menu(meal_period: str):
    """
    Retrieves the cached specified menu.

    Returns:
        cached_menus.get(meal_period, None): The specified menu data or None if not cached.
    """
    if meal_period not in ["8f7d", "8f73", "8f5b"]:
        raise ValueError("Invalid meal period. Can only be one of [8f7d, 8f73, 8f5b]")
    return cached_menus.get(meal_period, None)


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

    breakfast_menu = get_menu("8f7d")
    lunch_menu = get_menu("8f73")
    dinner_menu = get_menu("8f5b")

    print(breakfast_menu)


if __name__ == "__main__":
    main()
