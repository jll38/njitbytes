import requests
from datetime import datetime
from typing import List, Dict


def filter_food_items(api_url: str):
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
            calories = item.get("calories", 0)

            item_info = {
                "Item Name": item_name,
                "Description": description,
                "Calories": calories,
            }
            category_info["items"].append(item_info)

        structured_data.append(category_info)

    return period_name, structured_data


def main():
    current_time = datetime.now().time()
    current_date = datetime.now().strftime("%Y-%m-%d")
    api_base_url = "https://api.dineoncampus.com/v1/location/615f4f93a9f13a32678e5feb/periods/64ecff62351d53075fcb"

    if (
        datetime.strptime("07:00:00", "%H:%M:%S").time()
        <= current_time
        < datetime.strptime("09:59:59", "%H:%M:%S").time()
    ):
        api_url = api_base_url + "8f7d?platform=0&date=" + current_date
    elif (
        datetime.strptime("10:00:00", "%H:%M:%S").time()
        <= current_time
        < datetime.strptime("15:59:59", "%H:%M:%S").time()
    ):
        api_url = api_base_url + "8f73?platform=0&date=" + current_date
    elif (
        datetime.strptime("16:00:00", "%H:%M:%S").time()
        <= current_time
        < datetime.strptime("22:00:00", "%H:%M:%S").time()
    ):
        api_url = api_base_url + "8f5b?platform=0&date=" + current_date
    else:
        print("GDS is closed :(")
        return None

    print(filter_food_items(api_url))


if __name__ == "__main__":
    main()
