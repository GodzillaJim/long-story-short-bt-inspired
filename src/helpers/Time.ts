import { isYesterday, isToday, format } from "date-fns"
export const formatAMPM = (date: Date)=> {
    let hours = date.getHours();
    const minutes = date.getMinutes();
    let minutesString = ""
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutesString = minutes < 10 ? '0'+ minutes : minutes +"";
    const strTime = hours + ':' + minutesString + ' ' + ampm;
    return strTime;
  }
  export const getTimeCreated = (date: Date) => {
    if (isYesterday(date)) {
      return "Yesterday";
    }
    if (isToday(date)) {
      return formatAMPM(date);
    }
    return format(date, "dd/MM/yy");
  };