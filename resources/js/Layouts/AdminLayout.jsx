import SideBar from "@/Components/admin/SideBar";


export default function AdminLayout({children}){

    return (
        <>
           <div className="flex">
           <SideBar/>
             {/* Main Content */}
             <main className="flex-1 p-4">
                {children}
            </main>
           </div>
          
        </>
    )
}