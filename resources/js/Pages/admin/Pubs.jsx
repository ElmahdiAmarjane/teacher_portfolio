
import { useActionState, useState } from "react";
import PubsCours from "./pubs/PubsCours";
import PubsTp from "./pubs/PubsTp";
import PubsTd from "./pubs/PubsTd";
import PubsHeader from "./pubs/PubsHeader";



const Pubs = () => {
    const [courseOpen, setCourseOpen] = useState(true);
    const [tdOpen, setTdOpen] = useState(true);
    const [tpOpen, setTpOpen] = useState(true);

   
    return (
        <>
            <div className="  ">
               <PubsHeader/>
               <PubsCours/>
               <PubsTp/>
               <PubsTd/>
             


            </div>


            
        </>
    );
};

export default Pubs;
