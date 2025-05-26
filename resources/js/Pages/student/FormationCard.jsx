import React from "react";
import dayjs from "dayjs";
import { Link } from "@inertiajs/react";

export default function FormationCard({ formation }) {
    const isNew = dayjs().diff(dayjs(formation.published_at), "day") < 30;
    console.log(formation);
    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300">
            <div className="relative h-48">
                <img
                    src={`/storage/formations/${formation.image}`}
                    alt={formation.title}
                    className="w-full h-full object-cover"
                />
                {isNew && (
                    <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full shadow-md">
                        Nouveau
                    </span>
                )}
            </div>
            <div className="p-4 flex flex-col justify-between h-[150px]">
                <h3 className="text-lg font-bold text-gray-800 line-clamp-2">
                    {formation.title}
                </h3>
              


                <Link
                    href={`/formations/${formation.id}`}
                    className="mt-4 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-4 rounded-lg transition text-center inline-block"
                >
                    Découvrir la formation
                </Link>
            </div>
        </div>
    );
}
