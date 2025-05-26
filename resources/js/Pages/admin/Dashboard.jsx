import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { LetterText, MessageSquareTextIcon, Newspaper, TextIcon, User2, UserCheck, UserCog, UserMinus, UserPen, Users } from "lucide-react";



const Dashboard = ()=>{

    return (
       <>
       <div className="flex flex-wrap justify-around m-auto  gap-2 ">

       <div className="flex flex-1 bg-slate-400 items-center p-2 gap-3 text-white min-w-60    rounded ">
             <Users className="bg-slate-500 w-16 h-16 p-3 rounded-full "/>

             <div>
              <p className="text-xl font-bold">2899</p>
              <p className="text-light-gray">Nbr Users</p>
             </div>
             
          </div>
          <div className="flex flex-1 bg-slate-400 items-center p-2 gap-3 text-white min-w-60  rounded ">
             <Newspaper className="bg-slate-500 w-16 h-16 p-3 rounded-full "/>

             <div>
              <p className="text-xl font-bold">2899</p>
              <p className="text-light-gray">Nbr Articles</p>
             </div>
             
          </div>
          <div className="flex flex-1 bg-slate-400 items-center p-2 gap-3 text-white min-w-60   rounded ">
             <TextIcon className="bg-slate-500 w-16 h-16 p-3 rounded-full "/>

             <div>
              <p className="text-xl font-bold">2899</p>
              <p className="text-light-gray">Nbr Courses</p>
             </div>
             
          </div>

          <div className="flex flex-1 bg-slate-400 items-center p-2 gap-3 text-white min-w-60   rounded ">
             <UserMinus className="bg-slate-500 w-16 h-16 p-3 rounded-full  "/>

             <div>
              <p className="text-xl font-bold">2899</p>
              <p className="text-light-gray">Nbr Not Verified Users</p>
             </div>
             
          </div> 
       </div>
      </>
    )
}

export default Dashboard;
