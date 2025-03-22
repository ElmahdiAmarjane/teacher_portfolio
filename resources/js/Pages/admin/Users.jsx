import { Trash } from "lucide-react";




const Users = ()=>{
    
        // List of Tailwind background color classes
        const colors = [
            "bg-red-500",
            "bg-blue-500",
            "bg-green-500",
            "bg-yellow-500",
            "bg-purple-500",
            "bg-pink-500",
            "bg-indigo-500",
            "bg-teal-500",
            "bg-orange-500",
        ];
    
        // Function to get a random color from the list
        const getRandomColor = () => {
            const randomIndex = Math.floor(Math.random() * colors.length);
            return colors[randomIndex];
        };

    return (
        <>
            <div className=" flex justify-center m-auto  ">
                <table className=" w-full text-center">
                    <thead>
                      <tr >
                        <td className="py-2 px-1">Photo</td>
                        <td className="py-2 px-1">Email</td>
                        <td className="py-2 px-1">Date</td>
                        <td className="py-2 px-1">Status</td>
                        <td className="py-2 px-1">Action</td>
                      </tr>
                    </thead>
                    <tbody className=" ">

                       <tr className="">
                         <td className=" flex justify-center py-1 px-1"><div className={` ${getRandomColor()} text-white rounded-full w-10 h-10  text-center flex justify-center items-center`}>FR</div></td>
                         <td className="py-1 px-1" >Elmahdi@gmail.com</td>
                         <td className="py-1 px-1">10-20-2025</td>
                         <td className="py-1 px-1"> <p className="p-1 bg-rose-500 outline-none rounded text-white hover:cursor-pointer">Unverfied</p></td>
                         <td><div  className="flex justify-center items-center "><Trash className="size-6 hover:text-red-700 hover:cursor-pointer"/></div></td>
                       </tr>

                       <tr className="">
                         <td className=" flex justify-center py-1 px-1"><div className={` ${getRandomColor()} text-white rounded-full w-10 h-10  text-center flex justify-center items-center`}>FR</div></td>
                         <td className="py-1 px-1" >Elmahdi@gmail.com</td>
                         <td className="py-1 px-1">10-20-2025</td>
                         <td className="py-1 px-1 text-green-500 font-extrabold">verfied</td>
                         <td><div  className="flex justify-center items-center "><Trash className="size-6"/></div></td>
                       </tr>

                       
                       <tr className="">
                         <td className=" flex justify-center py-1 px-1"><div className={` ${getRandomColor()} text-white rounded-full w-10 h-10  text-center flex justify-center items-center`}>FR</div></td>
                         <td className="py-1 px-1" >Elmahdi@gmail.com</td>
                         <td className="py-1 px-1">10-20-2025</td>
                         <td className="py-1 px-1 text-green-500 font-extrabold">verfied</td>
                         <td><div  className="flex justify-center items-center "><Trash className="size-6"/></div></td>
                       </tr>

                       <tr className="">
                         <td className=" flex justify-center py-1 px-1"><div className={` ${getRandomColor()} text-white rounded-full w-10 h-10  text-center flex justify-center items-center`}>FR</div></td>
                         <td className="py-1 px-1" >Elmahdi@gmail.com</td>
                         <td className="py-1 px-1">10-20-2025</td>
                         <td className="py-1 px-1"> <p className="p-1 bg-rose-500 outline-none rounded text-white hover:cursor-pointer">Unverfied</p></td>
                         <td><div  className="flex justify-center items-center "><Trash className="size-6"/></div></td>
                       </tr>

                    </tbody>
                </table>
            </div>
        </>
    )



}


export default Users;