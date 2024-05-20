import { useState } from 'react';
import { Link } from 'react-router-dom';
const SideBar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  
  const toggleButtonClass = isOpen
    ? 'h-8 w-8 text-[#00000] rotate-90 transition-transform duration-300 ml-[4rem]'
    : 'h-8 w-8 text-[#00000] transition-transform duration-300 ml-[4rem]';

  return (
    <div className={`top-0 left-0 h-screen ${isOpen ? 'w-56' : 'w-0'} overflow-hidden transition-all duration-300 ease-in-out bg-gradient-to-t from-[#394ebc] to-[#5539bc] grid justify-center text-white`}>
      {/* Sidebar Content */}
      <button
        className="fixed top-0 left-0 m-4 text-white block"
        onClick={toggleSidebar}
      >
        <svg className={toggleButtonClass} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 10h16M4 14h16M4 18h16"/>
        </svg>
      </button>
      <div className="p-4 mt-16">
        <div className="mt-10">
          <img className="rounded-[50%]" src="https://placehold.co/80" alt="Profile"/>
        </div>
        <div>
          <ul className = {`mt-4 ${isOpen ? '' : 'hidden'}`}>
            <li className="mt-2 text-xl"><Link to='/dashboard'>Dashboard</Link></li>
            <li className="mt-2 text-xl"><Link to='/performance'>Performance</Link></li>
            <li className="mt-2 text-xl"><Link to='/result'>Result</Link></li>
            <li className="mt-2 text-xl"><Link to='/dashboard'>Dashboard</Link></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
