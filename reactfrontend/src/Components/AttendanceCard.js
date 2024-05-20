import React, { useEffect, useState } from 'react';
import ProgressBar from "@ramonak/react-progress-bar";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function AttendanceCard() {
    const [attendance, setAttendance] = useState(0);
    const [Std_id, setStd_id] = useState("");
    const navigate = useNavigate()
    useEffect(() => {
        function getID() {
            const userId = localStorage.getItem("user_id");
            setStd_id(userId);
            console.log(typeof(Std_id));
        }
        getID();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            if (Std_id) {
                let config = {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `JWT ${localStorage.getItem('access')}`,
                        'Accept': 'application/json'
                    }
                };

                try {
                    const response = await axios.get(`http://127.0.0.1:8000/api/attendance/${Std_id}/`, config);
                    setAttendance(response.data.attendance_percentage);
                } catch (error) {
                    console.log("Couldn't get attendance");
                }
            }
        };

        fetchData();
    }, [Std_id]);

    return (
        <div className="w-[54rem] h-[6rem] p-3 bg-black rounded-[1rem] ml-3">
            <h1 className="text-white mb-2">Attendance</h1>
            <ProgressBar completed={attendance} bgColor='#4942bc' animateOnRender />
        </div>
    );
}
