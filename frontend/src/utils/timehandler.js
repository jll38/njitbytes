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

    const openTime = getDayWithTime(currentDayOfWeek, openHours[currentDayOfWeek].open, 0);
    const closeTime = getDayWithTime(currentDayOfWeek, openHours[currentDayOfWeek].close, 0);
    
    if (now >= openTime && now < closeTime) {
        return { message: 'GDS is Open', color: '#3A9A72' };
    } else {
        return { message: 'GDS is Closed', color: '#BF0A30' };
    }
};
