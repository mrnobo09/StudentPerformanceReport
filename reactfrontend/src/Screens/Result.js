
import react from 'react';
import SideBar from '../Components/SideBar';
import ResultsTable from '../Components/ResultsTable';


export default function Result(){
    return(
        <div class = "grid grid-flow-col">
            <SideBar/>
            <div class="w-[40rem] h-[40rem]">
                <ResultsTable/>
            </div>
        </div>
    );
}