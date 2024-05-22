import { useEffect, useRef } from 'react';
import ProfileCard from '../Components/ProfileCard';
import WelcomeCard from '../Components/WelcomeCard';
import CalendarComponent from '../Components/CalendarComponent';
import AttendanceCard from '../Components/AttendanceCard';
import MarksRadar from '../Components/MarksRadar';
import ResultsTable from '../Components/ResultsTable';

export default function Dashboard() {
    const sections = useRef([]);

    useEffect(() => {
        const handleScroll = () => {
            sections.current.forEach((section, index) => {
                const rect = section.getBoundingClientRect();
                const button = document.querySelectorAll('.button')[index];
                if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
                    button.classList.add('scale-[2]', 'bg-blue-500');
                } else {
                    button.classList.remove('scale-[2]', 'bg-blue-500');
                }
            });
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div className="grid grid-flow-col justify-center">
            <div className="fixed ml-[6rem] w-[0.2rem] h-[20dvh] mt-[20rem] bg-[#3d51b4] flex flex-col justify-center items-center">
                <ul className="text-center space-y-16">
                    <li>
                        <a href="#home">
                            <button className="button w-[2rem] h-[2rem] p-2 bg-[#3d51b4] rounded-full flex justify-center items-center shadow-md transform transition-transform duration-150 ease-in-out">
                                <img src="https://iili.io/JieNg8F.png" />
                            </button>
                        </a>
                    </li>
                    <li>
                        <a href="#marksRadar">
                            <button className="button w-[2rem] h-[2rem] p-2 bg-[#3d51b4] rounded-full flex justify-center items-center shadow-md transform transition-transform duration-150 ease-in-out">
                                <img src="https://iili.io/JieUy0v.png"/>
                            </button>
                        </a>
                    </li>
                    <li>
                        <a href="#resultsTable">
                            <button className="button w-[2rem] h-[2rem] p-2 bg-[#3d51b4] rounded-full flex justify-center items-center shadow-md transform transition-transform duration-150 ease-in-out">
                                <img src="https://iili.io/JieLLoN.png"/>
                            </button>
                        </a>
                    </li>
                </ul>
            </div>

            <div className="grid grid-flow-row">
                <div id="home" ref={el => sections.current[0] = el}>
                    <div className="">
                        <ProfileCard />
                        <WelcomeCard />
                    </div>
                    <div className="grid grid-flow-col w-[70vw] h-[50vh] items-center justify-center">
                        <AttendanceCard />
                        <div class="w-[0.1rem] h-[22rem] bg-white mr-5 ml-2"></div>
                        <CalendarComponent />
                    </div>
                </div>
                <div id="marksRadar" ref={el => sections.current[1] = el}>
                    <MarksRadar />
                </div>
                <div id="resultsTable" ref={el => sections.current[2] = el}>
                    <ResultsTable />
                </div>
            </div>
        </div>
    );
}
