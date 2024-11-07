//THIS CODE MAKES THE DATE LOOK LIKE THIS -> Feb 17 2024
export function convertDateFormat(dateString) {
    const date = new Date(dateString);
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    return `${month} ${day} ${year}`;
}


//THIS CODE MAKES THE DATE AND TIME LOOK LIKE THIS -> Sept 12 2024   |  7:30 PM
export function convertDateFormat_II(dateString) {
    const date = new Date(dateString);
    const dateOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    const timeOptions = { hour: 'numeric', minute: 'numeric', hour12: true };
    const formattedDate = new Intl.DateTimeFormat('en-US', dateOptions).format(date);
    const formattedTime = new Intl.DateTimeFormat('en-US', timeOptions).format(date);
    return `${formattedDate} | ${formattedTime}`;
}