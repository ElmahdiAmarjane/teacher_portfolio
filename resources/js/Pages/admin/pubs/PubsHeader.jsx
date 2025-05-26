import { Plus, Search } from "lucide-react";
import NewPubs from "./NewPubs";
import { useState } from "react";

const PubsHeader = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  return (
    <div className="border-2 border-gray-300 p-3 rounded-md mb-2">
      <div className="flex justify-between items-center flex-wrap gap-3">
        {/* Section Filtres + Recherche */}
        <div className="flex flex-wrap gap-2 items-center">
          <select className="h-9 p-1 px-2 rounded border border-gray-400">
            <option value="course">Course</option>
            <option value="tp">TP</option>
            <option value="td">TD</option>
          </select>
          <input
            className="h-9 p-2 rounded border border-gray-400 w-52"
            type="text"
            placeholder="Search anything here..."
          />
          <button className="flex gap-2 items-center bg-black text-white px-3 py-2 rounded-md hover:bg-gray-800 transition">
            <Search size={18} /> Search
          </button>
        </div>
        
        <button onClick={()=>setIsPopupOpen(true)} className="  sm:w-fit flex items-center gap-1 border px-2 py-1 border-gray-500 rounded-md hover:bg-gray-200 transition ">
          <Plus size={18} />
          New Post
        </button>
  
        {isPopupOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm z-40">
          <NewPubs isOpen={isPopupOpen} setIsPopupOpen={setIsPopupOpen} />
        </div>
      )}


      </div>
    </div>
  );
};

export default PubsHeader;
