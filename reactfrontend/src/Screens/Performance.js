
import react from 'react';
import SideBar from '../Components/SideBar';
import MarksRadar from '../Components/MarksRadar';


export default function Performance(){
    return(
        <div class = "grid grid-flow-col">
            <SideBar/>
            <div class="w-[40rem] h-[40rem]">
                <MarksRadar/>
            </div>
        </div>
    );
}