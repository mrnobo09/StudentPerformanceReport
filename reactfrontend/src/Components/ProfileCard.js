import {useState,useEffect} from 'react'


export default function ProfileCard(){
    const [FirstName,setFirstName] = useState()
    useEffect(() => {
        function getName() {
          setFirstName(localStorage.getItem("user_first_name"));
        }
        getName();
      }, []);
    return(
        <div class = "grid grid-flow-col grid-cols-3 w-[19rem] h-[4rem] rounded-[2rem] mt-5 justify-center items-center bg-gradient-to-r from-[#384dbb] to-[#515d9a] ">
            <img class="rounded-[50%] col-span-1 m-2" src="https://placehold.co/50"/>
            <h1 class="col-span-2 text-white text-xl text-center">{FirstName}</h1>
            <div class="grid grid-flow-col col-span-2 justify-center items-center">
            <img class="m-2" src = "https://iili.io/JrJTAZX.png"/>
            <img class="m-2 mr-4" src = "https://iili.io/JrJIRrx.png"/>
            </div>
        </div>
    );
}