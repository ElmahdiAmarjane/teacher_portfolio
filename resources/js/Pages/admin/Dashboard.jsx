import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import Authenticated from "@/Layouts/AuthenticatedLayout";



const Dashboard = ()=>{

    return (
     <>
   
        
      <h1 className="text-red-700">HELLOW FROM DASH</h1>  

    
                            <div className="mt-3 space-y-1">
                                <ResponsiveNavLink href={route('profile.edit')}>Profile</ResponsiveNavLink>
                                <ResponsiveNavLink method="post" href={route('logout')} as="button">
                                    Log Out
                                </ResponsiveNavLink>
                            </div>

    </>
    )
}

export default Dashboard;
