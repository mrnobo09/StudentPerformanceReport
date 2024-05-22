import React, { useState, useEffect } from 'react';
import { Radar } from 'react-chartjs-2';
import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from 'chart.js';
import axios from 'axios';

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

const MarksRadar = () => {
    const [subjects, setSubjects] = useState([]);
    const [performance, setPerformance] = useState([]);
    const [average, setAverage] = useState([]);

    useEffect(() => {
        const std_id = localStorage.getItem("user_id");
        const fetchData = async () => {
            let config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `JWT ${localStorage.getItem('access')}`,
                    'Accept': 'application/json'
                }
            };

            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/student-performance/${std_id}/`, config);
                const subjects = Object.keys(response.data.performance_by_course);
                const performance = Object.values(response.data.performance_by_course);
                setSubjects(subjects);
                setPerformance(performance);

                const response_2 = await axios.get(`http://127.0.0.1:8000/api/classAverage/`, config);
                const averageData = response_2.data.map(course => course.average_percentage);
                setAverage(averageData);
                console.log(averageData);
            } catch (error) {
                console.log("Error getting Marks:", error);
            }
        };

        fetchData();
    }, []); 

    const data = {
        labels: subjects,
        datasets: [
            {
                label: 'Performance',
                data: performance,
                backgroundColor: 'rgba(251, 255, 28, 0.3)',
                borderColor: 'rgba(251, 255, 28, 1)',
                borderWidth: 1,
            },
            {
                label: 'Class Average',
                data: average,
                backgroundColor: 'rgba(21, 101, 192, 0.3)',
                borderColor: 'rgba(74, 89, 164, 1)',
                borderWidth: 1,
            },
            
        ],
    };

    const options = {
        scales: {
            r: {
                angleLines: {
                    display: true,
                    color: 'rgba(0, 0, 0, 0.8)', // Darker color for the angle lines
                },
                grid: {
                    color: 'rgba(0, 0, 0, 0.8)', // Darker color for the grid lines
                },
                ticks: {
                    display: false, // Hide the numbers on the scale
                },
                suggestedMin: 0,
                suggestedMax: 100,
            },
        },
    };

    return( 
        <div class='w-[50w]'>
            <Radar data={data} options={options} />
        </div>
    );
};

export default MarksRadar;
