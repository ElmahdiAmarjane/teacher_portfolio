import { Plus, Search } from "lucide-react";



const PubsHeader = ()=>{

 return (

<>
<div>


   <div className="sm:flex sm:justify-between border-2 border-red-500 ">

     <div className="flex gap-2 align-middle">
         <select name="" id="">
            <option value="course">Course</option>
            <option value="tp">Tp</option>
            <option value="td">Td</option>
         </select>
         <input type="text" placeholder="Search anything here .." />
          <button className="flex gap-1 items-center"> <Search/> Search</button>
     </div>
   <button className=" w-fit  items-center flex border p-1 border-[#1C2029]  ">
                            <Plus />
                            New Post
        </button>
   </div>

   </div>   
</>

 )


}

export default PubsHeader;