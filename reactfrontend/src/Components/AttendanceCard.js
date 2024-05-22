import React, { useEffect, useState } from 'react';
import ProgressBar from "@ramonak/react-progress-bar";
import axios from 'axios';

export default function AttendanceCard() {
    const [attendance, setAttendance] = useState(null);
    const [stdId, setStdId] = useState("");

    useEffect(() => {
        function getID() {
            const userId = localStorage.getItem("user_id");
            setStdId(userId);
        }
        getID();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            if (stdId) {
                let config = {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `JWT ${localStorage.getItem('access')}`,
                        'Accept': 'application/json'
                    }
                };

                try {
                    const response = await axios.get(`http://127.0.0.1:8000/api/attendance/${stdId}/`, config);
                    console.log("Attendance:", response.data);
                    setAttendance(response.data);
                } catch (error) {
                    console.log("Couldn't get attendance");
                }
            }
        };

        fetchData();
    }, [stdId]);

    return (
        <div className="w-[50rem] h-[20rem] p-3 bg-[#02070f] mr-3 shadow-[25px_55px_70px_-15px_rgba(0,0,0,1)]">
            <h1 className="text-white mb-4 text-2xl">Attendance</h1>
            {attendance && attendance.attendance ? (
                attendance.attendance.map((subject, index) => (
                    <div key={index} className="mb-2">
                        <h2 className="text-white text-xl">{subject.course_name}</h2>
                        <ProgressBar 
                            completed={subject.attendance_percentage} 
                            bgColor='#1565c0' 
                            height='10px'
                            isLabelVisible={false}
                            animateOnRender 
                        />
                    </div>
                ))
            ) : (
                <p className="text-white">Loading attendance...</p>
            )}
        </div>
    );
}
