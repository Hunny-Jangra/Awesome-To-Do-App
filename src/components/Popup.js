import popupStyles from "../styles/popup.module.css";
import { useState } from "react";
import DatePicker from "react-datepicker";
// import DateTimePicker from 'react-datetime-picker';
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';
import "react-datepicker/dist/react-datepicker.css"; 
import {useEventstitle} from "../hooks/useEventstitle";
import { useNavigate } from "react-router-dom";
// import { hr } from "date-fns/locale";
const Popup = () => {
  const home = useNavigate();
    const [title, setTitle] = useState("");
    const [start, setStartDate] = useState("");
    const [end, setEndDate] = useState("");
    const allDay = true;
    const {mutate} = useEventstitle();
    const handleInputs = () => {
        console.log(title, start, end);
        console.log({title, start, end});
        const titles = {title, start, end, allDay}
        console.log('Start', start.getDay());
        console.log('End', end);
        console.log(new Date())
        const current = new Date();
        if((current.getFullYear() === start.getFullYear())) {
          if(current.getDay() <= start.getDay()) {
            mutate(titles);
            home("/")
          }else{
            console.log(`Please enter Current Date or within this week not previous date`);
          }
        }else{
          console.log(`Please enter Current Date or within this week not previous date`);
        }
        // mutate(titles);
        

    }
    
  return (
    <>
      <div className={popupStyles.container}>
        <div className={popupStyles.popup}>
            <h2 className={popupStyles.heading}>Add a New Schedule 📰</h2>
            <div className={popupStyles.inputs}>
                <label htmlFor="title" className={popupStyles.labels}>Title: ✍️</label>
                <input type="text" name="title" value={title} onChange={(e) => setTitle(e.target.value)} id="title" className={popupStyles.input}/>
                <DatePicker selected={start} placeholderText="Select Start Date" className={popupStyles.date_1} onChange={(date) => setStartDate(date)}></DatePicker>
                <DatePicker selected={end} placeholderText="Select End Date" className={popupStyles.date_2} onChange={(date) => setEndDate(date)}></DatePicker>
            </div>
            <div className="Add_ItemBTN">
                <button className={popupStyles.add_btn} onClick={handleInputs}>Add Page</button>
                
            </div>
        </div>
      </div>
    </>
  );
};

export default Popup;
