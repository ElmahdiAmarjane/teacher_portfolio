import {
    ArrowBigUpDash,
    EllipsisVertical,
    EyeOff,
    Pencil,
    Trash,
} from "lucide-react";
import { useState } from "react";

const BASE_URL = "http://127.0.0.1:8000/";

export function PubItem({ item, onDelete }) {
    const [openActionPub, setOpenActionPub] = useState(false);

    const handleDelete = async () => {
        try {
            const response = await fetch(`${BASE_URL}api/publications/delete`, {
                method: "DELETE", // Using DELETE request
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ id: item.id }), // Sending the publication ID
            });

            const data = await response.json();

            if (response.ok) {
                // If the delete was successful, notify parent component
                onDelete(item.id);
            } else {
                console.error("Error deleting publication:", data);
            }
        } catch (error) {
            console.error("Error deleting publication:", error);
        }
    };

    return (
        <div className="border-[1px] rounded border-[#1C2029] shadow-xl p-2">
            <div className="flex justify-between">
                <h1 className=" font-extrabold text-xl ">⭕{item.title} </h1>
                <div className="relative">
                    <button onClick={() => setOpenActionPub(!openActionPub)}>
                        <EllipsisVertical />
                    </button>

                    <div
                        className={`${
                            !openActionPub && "hidden"
                        } absolute bg-gray-800 text-white top-8 right-5 p-2 rounded-lg shadow-md space-y-2`}
                    >
                        <p className="flex items-center gap-2 p-1 hover:bg-gray-700 rounded-md transition-colors cursor-pointer">
                            <Pencil size={16} /> Update
                        </p>
                        <p
                            className="flex items-center gap-2 p-1 hover:bg-gray-700 rounded-md transition-colors cursor-pointer"
                            onClick={handleDelete}
                        >
                            <Trash size={16} /> Delete
                        </p>
                        <p className="flex items-center gap-2 p-1 hover:bg-gray-700 rounded-md transition-colors cursor-pointer">
                            <EyeOff size={16} /> Hide
                        </p>
                    </div>
                </div>
            </div>
            <div>
                <p className="text-gray-400">Description : </p>
                {item.description}
            </div>
            <div>
                <p className="text-gray-400">Files : </p>
                <div className="flex flex-wrap gap-4 p-2 shadow-[inset_0px_1px_6px_0px_rgba(0,_0,_0,_0.35)]">
                    {item.files.map((file, index) => (
                        <>
                            {file.type === "img" && (
                                <div
                                    key={index}
                                    className="w-48 border-2 border-gray-400 rounded-lg overflow-hidden shadow-md flex flex-col items-center justify-between p-2"
                                >
                                    <div className="w-full h-40 bg-gray-200 flex items-center justify-center">
                                        <img
                                            className="w-full h-full object-cover"
                                            src={file.link}
                                            alt={"img"}
                                        />
                                    </div>
                                    <p className="text-sm font-semibold text-center mt-2">
                                        {file.titleImg}
                                    </p>
                                </div>
                            )}
                            {file.type === "pdf" && (
                                <div
                                    key={index}
                                    className="w-48 border-2 border-gray-400 rounded-lg overflow-hidden shadow-md flex flex-col items-center justify-between p-2"
                                >
                                    <div className="w-full h-40 bg-gray-200 flex items-center justify-center">
                                        <embed
                                            className="w-full h-full object-cover"
                                            src={file.link}
                                            type="application/pdf"
                                        />
                                    </div>
                                    <p className="text-sm font-semibold text-center mt-2">
                                        {file.title}
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