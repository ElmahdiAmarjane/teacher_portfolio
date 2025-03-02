import { useState } from "react";


const Pubs = ()=>{

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
  
    const handleSubmit = (e) => {
      e.preventDefault();
      alert(`Course Added: ${title}`);
      setTitle("");
      setDescription("");
    };

    return (
     <>
    
    <div className="p-6 bg-white rounded shadow-md">
        <h2 className="mb-4 text-2xl font-bold">Add New Course</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2 font-semibold text-gray-700">Course Title</label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2 font-semibold text-gray-700">Description</label>
            <textarea
              className="w-full p-2 border rounded"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            ></textarea>
          </div>

          <button type="submit" className="p-2 text-white bg-blue-500 rounded hover:bg-blue-700">
            Add Course
          </button>
        </form>
      </div>  

    </>
    )
}

export default Pubs;
