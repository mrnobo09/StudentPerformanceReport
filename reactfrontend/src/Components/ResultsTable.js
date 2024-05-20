import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ResultsTable = () => {
  const [results, setResults] = useState([]);
  const [studentName, setStudentName] = useState('');

  useEffect(() => {
    const std_id = localStorage.getItem("user_id");
    const fetchResults = async () => {
      let config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `JWT ${localStorage.getItem('access')}`,
          'Accept': 'application/json',
        },
      };

      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/results/${std_id}/`, config);
        setResults(response.data.results);
        setStudentName(response.data.student_name);
      } catch (error) {
        console.error("Error fetching results:", error);
      }
    };

    fetchResults();
  }, []);

  return (
    <div className="container mx-auto mt-10 p-5">
      <h2 className="text-2xl font-semibold mb-6 text-white">Results for {studentName}</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-black border border-white text-white">
          <thead>
            <tr className="w-full bg-gray-800 border-b border-white">
              <th className="py-2 px-4 text-left">Course</th>
              <th className="py-2 px-4 text-left">Total Marks</th>
              <th className="py-2 px-4 text-left">Grade</th>
            </tr>
          </thead>
          <tbody>
            {results.map((result) => (
              <tr key={result.id} className="w-full border-b border-white">
                <td className="py-2 px-4">{result.course.title}</td>
                <td className="py-2 px-4">{result.total_marks}</td>
                <td className="py-2 px-4">{result.grade}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ResultsTable;
