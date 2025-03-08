import { EllipsisVertical } from "lucide-react";

export function PubItem({ item }) {
    return (
        <div className="border-[1px] rounded border-[#1C2029] shadow-xl p-2">
            <div className="flex justify-between">
                <h1 className=" font-extrabold text-xl ">⭕{item.title} </h1>
                <EllipsisVertical />
            </div>
            <div>
                <p className="text-gray-400">Description : </p>
                {item.description}
            </div>
            <div>
                <p className="text-gray-400">Files : </p>
                <div className="flex flex-wrap gap-4 p-2 shadow-[inset_0px_1px_6px_0px_rgba(0,_0,_0,_0.35)]">
                   
                        {item.files.map((item) => (
                            <>
                                {item.type == "img" && (
                                    <div className="w-48  border-2 border-gray-400 rounded-lg overflow-hidden shadow-md flex flex-col items-center justify-between p-2">
                                        <div className="w-full h-40 bg-gray-200 flex items-center justify-center">
                                            <img
                                                className="w-full h-full object-cover"
                                                src={item.link}
                                                alt={"img"}
                                            />
                                        </div>
                                        <p className="text-sm font-semibold text-center mt-2">
                                            {item.titleImg}
                                        </p>
                                    </div>
                                )}
                                {item.type == "pdf" && (
                                    <div className="w-48  border-2 border-gray-400 rounded-lg overflow-hidden shadow-md flex flex-col items-center justify-between p-2">
                                        <div className="w-full h-40 bg-gray-200 flex items-center justify-center">
                                            <embed
                                                className="w-full h-full object-cover"
                                                src={item.link}
                                                type="application/pdf"
                                            />
                                        </div>
                                        <p className="text-sm font-semibold text-center mt-2">
                                            {item.title}
                                        </p>
                                    </div>
                                )}
                            </>
                        ))}
                  
                </div>
            </div>
        </div>
    );
}
