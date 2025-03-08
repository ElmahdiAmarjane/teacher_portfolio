
import { useActionState, useState } from "react";
import PubsCours from "./PubsCours";
import PubsTp from "./PubsTp";
import PubsTd from "./PubsTd";
import PubsHeader from "./PubsHeader";



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
