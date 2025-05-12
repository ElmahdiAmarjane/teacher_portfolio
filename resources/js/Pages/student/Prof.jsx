import React from "react";

const Prof=()=>{
    return(
        <div  className='bg-black text-white text-center py-16'>
            <img src="" alt="" className=''/>
            <h1 className='text-4x1 font-bold'>
                I'm{""}
                <span className='text-transparent bg-clip-text bg-gradient-to-r form-freen-400 to-blue-500'>Mohammad Azizi</span>
                ,Professor
                </h1>
                <p className='mt-4 text-lg text-gray-300 '>
                    I specialize in ...
                </p>
                <div className='mt-8 space-x-4'>
                    <button>Contact with me</button>
                    <button>Resume</button>
                </div>
        </div>
    )
}
export default Prof;