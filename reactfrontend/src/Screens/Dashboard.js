
import react from 'react';
import SideBar from '../Components/SideBar';
import ProfileCard from '../Components/ProfileCard';
import WelcomeCard from '../Components/WelcomeCard';
import CalenderComponent from '../Components/CalendarComponent';
import AttendanceCard from '../Components/AttendanceCard';



export default function Dashboard(){
    return(
        <div class = "grid grid-flow-col">
            <SideBar/>
            <div class = "grid grid-flow-row">
                <ProfileCard/>
                <WelcomeCard/>
                <div class="grid grid-flow-col justify-start">
                <CalenderComponent/>
                <AttendanceCard/>
                </div>
            </div>
        </div>
    );
}