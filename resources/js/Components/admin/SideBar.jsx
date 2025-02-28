import { useState } from "react";
import logo from "@/assets/images/logo.png"

const SideBar = () => {
  const [open , setOpen] = useState(true);
  const toogleSidebar = ()=>{
     
  }
  return (
    <>
      <div className={`${open? "w-72"  : " w-20"} p-5 pt-6 duration-300 h-screen bg-blue-900 relative`}>
      
        <svg
          onClick={()=>{setOpen(!open)  }}
          xmlns="http://www.w3.org/2000/svg"
          fill="white"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className={`size-6 absolute cursor-pointer -right-3 top-9  ${!open && "rotate-180"}` }
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m11.25 9-3 3m0 0 3 3m-3-3h7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>
         
         <div className="flex items-center gap-x-4">
             <img src={logo} alt="" className="w-12 duration-500 cursor-pointer"/>
             <h1 className={`text-white origin-left font-medium text-xl  ${!open && "scale-0"}`}>Admin Panel</h1>
         </div>


      </div>
    </>
  );
};

export default SideBar;
