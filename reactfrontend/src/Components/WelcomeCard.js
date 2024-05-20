import react from 'react'
import {useState,useEffect} from 'react'
export default function WelcomeCard(){
    const [FirstName,setFirstName] = useState()
    useEffect(() => {
        function getName() {
          setFirstName(localStorage.getItem("user_first_name"));
        }
        getName();
      }, []);
    
    return(
        <div class = "w-[75em] h-[15em] bg-gradient-to-r from-[#384dbb] to-[#515d9a] rounded-[1.5rem] grid grid-flow-col grid-cols-1 items-center">
            <div class="m-[2rem]">
                <p class="text-[#ffffff98] text-lg m-0">{currentDate()}</p>
                <h1 class="text-white text-[4rem] font-bold">Welcome Back, {FirstName}! </h1>
                <p class="text-[#ffffff98] text-lg m-0">Always stay updated in your Student Portal!</p>
            </div>
            <div>

            </div>
            <div class="grid grid-flow-col grid-cols-1">
            <img src="https://iili.io/JgybkYB.png" alt="Scholarcap scroll" border="0"/>
            <img class='' src="https://iili.io/JgysYqN.png" alt="Welcome1" border="0"/>
            </div>
        </div>
    );
}

function currentDate(){
    let day = new Date().toLocaleString("en-US", { day : '2-digit'})
    let month = new Date().toLocaleString("en-US", { month: "long" })
    let year = new Date().getFullYear()

    let date = `${day}-${month}-${year}`;

    return date
}