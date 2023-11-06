const getDayWithTime = (dayOfWeek, hours, minutes) => {
    let now = new Date();
    let date = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    // It will adjust the day of the week correctly whether it's in the current week or the next
    let dayDiff = (dayOfWeek - now.getDay() + 7) % 7;
    date.setDate(date.getDate() + dayDiff);
    date.setHours(hours);
    date.setMinutes(minutes);
    date.setSeconds(0);
    date.setMilliseconds(0);
    return date;
};

const dayNames = [
    'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
];

const openHours = [
    { open: 0, close: 20 }, // Sunday
    { open: 7, close: 22 }, // Monday
    { open: 7, close: 22 }, // Tuesday
    { open: 7, close: 22 }, // Wednesday
    { open: 7, close: 22 }, // Thursday
    { open: 7, close: 21 }, // Friday
    { open: 10, close: 20 } // Saturday
];

export const isOpenNow = () => {
    let now = new Date();
    const currentDayOfWeek = now.getDay();
    const currentHour = now.getHours();

    // Define the serving time ranges
    const breakfastTimeRange = { start: 7, end: 10 };
    const brunchTimeRange = { start: 10, end: 12 };
    const lunchTimeRange = { start: 12, end: 17 };
    const dinnerTimeRange = { start: 17, end: 22 };

    const openingTime = openHours[currentDayOfWeek].open;
    const closingTime = openHours[currentDayOfWeek].close;

    if (currentHour >= openingTime && currentHour < closingTime) {
        if (currentHour >= breakfastTimeRange.start && currentHour < breakfastTimeRange.end) {
            return { message: 'Breakfast is being served 🥞', color: '#3A9A72' };
        } else if (currentHour >= brunchTimeRange.start && currentHour < brunchTimeRange.end) {
            return { message: 'Brunch is being served 🥞', color: '#3A9A72' };
        } else if (currentHour >= lunchTimeRange.start && currentHour < lunchTimeRange.end) {
            return { message: 'Lunch is being served 🍔', color: '#3A9A72' };
        } else if (currentHour >= dinnerTimeRange.start && currentHour < dinnerTimeRange.end) {
            return { message: 'Dinner is being served 🍽️', color: '#3A9A72' };
        }
    }

    return { message: 'GDS is Closed', color: '#BF0A30' };
};

