// // const projects = [
// //     { id: 1, title: "AI Research", description: "Exploring deep learning techniques for NLP." },
// //     { id: 2, title: "Web App Development", description: "Building scalable applications with React & Laravel." },
// //     { id: 3, title: "Cybersecurity Analysis", description: "Assessing network vulnerabilities and security risks." },
// //     { id: 4, title: "Data Science", description: "Analyzing large datasets for insights and predictions." },
// //     { id: 5, title: "Blockchain Project", description: "Developing decentralized finance applications." },
// //     { id: 6, title: "IoT Integration", description: "Connecting devices using smart technology." }
// //   ];
  
// //   const Projects = () => {
// //     return (
// //       <section className="min-h-screen bg-black text-white px-6 py-12">
// //         <h2 className="text-4xl font-extrabold text-center">
// //           My <span className="bg-gradient-to-r from-blue-500 to-gray-500 text-transparent bg-clip-text">Projects</span>
// //         </h2>
  
// //         {/* Grid of Projects */}
// //         <div className="grid md:grid-cols-3 gap-8 mt-12">
// //           {projects.map((project) => (
// //             <div
// //               key={project.id}
// //               className="p-6 border border-gray-700 rounded-lg transition-all duration-300 hover:bg-gray-800 hover:border-blue-500 cursor-pointer"
// //             >
// //               <h3 className="text-xl font-semibold">{project.title}</h3>
// //               <p className="text-gray-400 mt-2">{project.description}</p>
// //               <a href="#" className="mt-4 inline-block text-blue-400 hover:underline">
// //                 Read More →
// //               </a>
// //             </div>
// //           ))}
// //         </div>
// //       </section>
// //     );
// //   };
  
// //   export default Projects;
  

// import { useState } from "react";
// import { FaCode, FaServer, FaDatabase, FaRobot } from "react-icons/fa";

// const Projects = () => {
//   const formations = [
//     {
//       title: "Développement Web",
//       description:
//         "Apprenez à créer des sites web interactifs avec HTML, CSS, JavaScript et des frameworks modernes.",
//       icon: <FaCode className="text-teal-600 text-2xl" />,
//     },
//     {
//       title: "Développement Backend",
//       description:
//         "Maîtrisez les langages côté serveur, les API RESTful et la logique métier pour des applications robustes.",
//       icon: <FaServer className="text-teal-600 text-2xl" />,
//     },
//     {
//       title: "Bases de Données",
//       description:
//         "Concevez et gérez des bases de données relationnelles et NoSQL efficacement.",
//       icon: <FaDatabase className="text-teal-600 text-2xl" />,
//     },
//     {
//       title: "Intelligence Artificielle",
//       description:
//         "Explorez les fondamentaux du Machine Learning, du Deep Learning et leurs applications.",
//       icon: <FaRobot className="text-teal-600 text-2xl" />,
//     },
//   ];

//   return (
//     <div className="py-12 bg-teal-50">
//       <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-10 text-center">
//         Mes <span className="text-teal-600">Formations</span>
//       </h2>
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
//         {formations.map((formation, index) => (
//           <div key={index} className="bg-white p-6 rounded-xl shadow-sm">
//             <div className="flex flex-col items-center text-center">
//               <div className="bg-teal-100 w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center mb-6">
//                 {formation.icon}
//               </div>
//               <h3 className="text-xl font-semibold text-gray-900 mb-3">{formation.title}</h3>
//               <p className="text-gray-600 text-sm sm:text-base mb-4 max-w-md">{formation.description}</p>
//               <button className="text-teal-600 font-medium hover:text-teal-800">
//                 Voir le programme → 
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Projects;

import { usePage } from "@inertiajs/react";
import Formations from "./Formations";


  const Projects = () => {
    const { formations } = usePage().props;

    console.log("FORMATION : "+formations);
    return (
        <>
     
        <Formations formations={formations} />

        </>
    );
  };
  
  export default Projects;
  