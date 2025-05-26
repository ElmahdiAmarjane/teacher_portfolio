

// import { usePage } from "@inertiajs/react";
// import Formations from "./Formations";


//   const Projects = () => {
//     const { formations } = usePage().props;

//     console.log("FORMATION : "+formations);
//     return (
//         <>
     
//         <Formations formations={formations} />

//         </>
//     );
//   };
  
//   export default Projects;
  import { useState, useEffect } from "react";
import axios from "axios";
import Formations from "./Formations";
import { usePage } from "@inertiajs/react";

const Projects = () => {
    const [formations, setFormations] = useState([]);
    const [filteredFormations, setFilteredFormations] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { errors } = usePage().props; // If you're using Inertia's shared errors

    useEffect(() => {
        const fetchFormations = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get(route('api.formations.index'));
                const formattedData = Array.isArray(response.data) 
                    ? response.data 
                    : response.data?.data || [];
                
                const withSearchProps = formattedData.map(formation => ({
                    ...formation,
                    searchableTitle: formation.title.toLowerCase(),
                    searchableStatus: formation.published ? 'published' : 'draft'
                }));
                
                setFormations(withSearchProps);
                setFilteredFormations(withSearchProps);
            } catch (error) {
                console.error('Error fetching formations:', error);
                // You can use your error handling method here
                // For example, if using Inertia's shared errors:
                if (errors) {
                    console.error(errors);
                }
                setFormations([]);
                setFilteredFormations([]);
            } finally {
                setIsLoading(false);
            }
        };

        fetchFormations();
    }, []); // Empty dependency array means this runs once on mount

    if (isLoading) {
        return <div>Loading formations...</div>;
    }

    return (
        <>
            <Formations formations={filteredFormations} />
        </>
    );
};

export default Projects;