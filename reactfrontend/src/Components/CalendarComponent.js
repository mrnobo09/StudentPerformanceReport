import * as React from 'react';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';

export default function DateCalendarFormProps() {
  return (
    <div class = 'w-[20rem] shadow-[25px_55px_70px_-15px_rgba(0,0,0,1)]'>
         <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateCalendar sx={{
            "& .MuiTypography-root": { color: "#ffffff" },
            "& .MuiButtonBase-root": { color: "#ffffff" },
            "& .MuiDayCalendar-root": { backgroundColor: "#02070f" },
            "& .MuiPickersCalendarHeader-root": { backgroundColor: "#02070f" },
            "& .MuiPickersCalendarHeader-label" : {color:'#ffffff'},
            "& .css-1wy8uaa-MuiButtonBase-root-MuiPickersDay-root.Mui-disabled" : {color:'#ffffff'},
            "& .css-174op9o-MuiPickersYear-root" : {backgroundColor:"#02070f"},
            "& .css-innj4t-MuiPickersYear-yearButton" : {color:'#ffffff'},
            "& .css-1aqny2q-MuiPickersCalendarHeader-root":{margin:0},  
          }} defaultValue={dayjs(currentDate())} readOnly /> 
    </LocalizationProvider>
    </div>
   
  );
}

function currentDate(){
    let day = new Date().toLocaleString("en-US", { day : '2-digit'})
    let month = new Date().toLocaleString("en-US", { month: "2-digit" })
    let year = new Date().getFullYear()

    let date = `${year}-${month}-${day}`;

    return date;
}