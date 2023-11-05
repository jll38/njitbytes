
const now = new Date();
const getDayWithTime = (dayOfWeek, hours, minutes) => {
    let date = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    date.setDate(now.getDate() + (dayOfWeek - now.getDay()));
    date.setHours(hours);
    date.setMinutes(minutes);
    date.setSeconds(0);
    date.setMilliseconds(0);
    return date;
  };

const dayNames = [
    { name: 'Sunday', open: getDayWithTime(11, 0), close: getDayWithTime(20, 0) },
    { name: 'Monday', open: getDayWithTime(7, 0), close: getDayWithTime(22, 0) },
    { name: 'Tuesday', open: getDayWithTime(7, 0), close: getDayWithTime(22, 0) },
    { name: 'Wednesday', open: getDayWithTime(7, 0), close: getDayWithTime(22, 0) },
    { name: 'Thursday', open: getDayWithTime(7, 0), close: getDayWithTime(22, 0) },
    { name: 'Friday', open: getDayWithTime(7, 0), close: getDayWithTime(21, 0) },
    { name: 'Saturday', open: getDayWithTime(10, 0), close: getDayWithTime(20, 0) },
  ];


export const isOpenNow = () => {
    
    const currentDay = dayNames[now.getDay()];
    if (now >= currentDay.open && now <= currentDay.close) {
      return {message: 'GDS is Open', color: '#3A9A72'}
    } else {
      return {message: 'GDS is Closed', color: '#BF0A30'};
    }
  };
