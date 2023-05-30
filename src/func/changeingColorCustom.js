import React from 'react'
import axios from "axios";

const changeingColorCustom = async (id) => {
    const res = await axios.get(`http://localhost:4000/event`);
    // console.log("Axios -->", res);
    if(res?.data?.data?.id === id) {
        document.querySelector('.rbc-event-content').style.color = 'green'
    }
}

export default changeingColorCustom