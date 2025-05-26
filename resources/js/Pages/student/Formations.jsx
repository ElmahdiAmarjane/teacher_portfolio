import React, { useState, useMemo } from "react";
import FormationCard from "./FormationCard"; // composant carte

export default function Formations({ formations }) {
    const [search, setSearch] = useState("");

    const filteredFormations = useMemo(() => {
        return formations.filter(f =>
            f.title.toLowerCase().includes(search.toLowerCase())
        );
    }, [search, formations]);

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            {/* Titre */}
            <div className="mb-6 text-center">
                <h1 className="text-3xl font-bold text-gray-800">Nos Formations</h1>
                <p className="text-gray-500 mt-1">Explorez notre catalogue de formations enrichissantes.</p>
            </div>

            {/* Barre de recherche */}
            <div className="flex justify-center mb-8">
                <input
                    type="text"
                    placeholder="Rechercher une formation..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full sm:w-1/2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            {/* Liste des cartes */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {filteredFormations.length > 0 ? (
                    filteredFormations.map((formation) => (
                        <FormationCard
                            key={formation.id}
                            formation={formation}
                           
                        />
                    ))
                ) : (
                    <p className="text-center text-gray-500 col-span-full">
                        Aucune formation trouvée.
                    </p>
                )}
            </div>
        </div>
    );
}
