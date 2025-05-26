import SideBar from "@/Components/dashboard/SideBare";


export default function AdminLayout({children}){

    return (
        <>
           <div className="block sm:flex">
            
            <SideBar/> 
         
        
             {/* Main Content */}
             <main className="flex-1 p-4">
                {children}
            </main>
           </div>
          
        </>
    )
}