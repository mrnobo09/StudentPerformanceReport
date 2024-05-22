import { useState, useEffect } from 'react';

export default function ProfileCard() {
    const [name, setName] = useState('');
    const [time, setTime] = useState('');

    useEffect(() => {
        function getName() {
            const firstName = localStorage.getItem("user_first_name") || "First";
            const lastName = localStorage.getItem("user_last_name") || "Last";
            setName(`${firstName} ${lastName}`);
        }
        getName();
    }, []);

    useEffect(() => {
        function updateClock() {
            const now = new Date();
            const hours = now.getHours().toString().padStart(2, '0');
            const minutes = now.getMinutes().toString().padStart(2, '0');
            const seconds = now.getSeconds().toString().padStart(2, '0');
            setTime(`${hours}:${minutes}:${seconds}`);
        }

        updateClock();

        const intervalId = setInterval(updateClock, 1000);

        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className="grid grid-flow-col grid-cols-3 w-[20vw] h-[9vh] rounded-[3rem] mt-5 mb-4 justify-center items-center bg-gradient-to-r from-[#384dbb] to-[#515d9a]">
            <img className="rounded-[50%] col-span-1 m-2" src="https://placehold.co/60" alt="Profile"/>
            <h1 className="col-span-2 text-white text-xl text-center">{name}</h1>
            <div className="grid grid-flow-col col-span-2 justify-end items-center">
                <img className="m-2 w-[2rem]" src="https://iili.io/JrJTAZX.png" alt="Icon 1"/>
                <img className="m-2 w-[2rem]" src="https://iili.io/JrJIRrx.png" alt="Icon 2"/>
            </div>
        </div>
    );
}
