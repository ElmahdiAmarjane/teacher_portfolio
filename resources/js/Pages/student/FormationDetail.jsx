import React from "react";
import { Link } from "@inertiajs/react";
import { FiDownload, FiFile, FiArrowLeft } from "react-icons/fi";

export default function FormationDetail({ formation }) {
    // Grouper les publications par type avec des libellés plus propres
    const publicationTypes = {
        course: { label: "Cours", color: "bg-blue-100 text-blue-800" },
        tp: { label: "Travaux Pratiques", color: "bg-green-100 text-green-800" },
        td: { label: "Travaux Dirigés", color: "bg-purple-100 text-purple-800" }
    };

    // Grouper les publications par type
    const publicationsByType = formation.publications?.reduce((acc, pub) => {
        if (!acc[pub.type]) acc[pub.type] = [];
        acc[pub.type].push(pub);
        return acc;
    }, {});

    // Fonction pour extraire l'extension du fichier
    const getFileExtension = (filename) => {
        return filename.split('.').pop().toUpperCase();
    };

    return (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Header */}
            <div className="mb-8">
                <Link 
                    //href={route('student.formations.index')} 
                    className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-4"
                >
                    <FiArrowLeft className="mr-2" /> Retour aux formations
                </Link>
                
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{formation.title}</h1>
                {formation.description && (
                    <p className="text-gray-600">{formation.description}</p>
                )}
            </div>

            {/* Publications par type */}
            {Object.entries(publicationTypes).map(([type, { label, color }]) => (
                <section key={type} className="mb-12">
                    <div className="flex items-center mb-6">
                        <h2 className="text-2xl font-semibold text-gray-800">{label}</h2>
                        <span className={`ml-2 px-2 py-1 text-xs font-medium rounded-full ${color}`}>
                            {publicationsByType?.[type]?.length || 0} documents
                        </span>
                    </div>

                    {publicationsByType?.[type]?.length > 0 ? (
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {publicationsByType[type].map((pub) => (
                                <div key={pub.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                                    <div className="p-5">
                                        <div className="flex items-start">
                                            <div className={`flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-md ${color} bg-opacity-20`}>
                                                <FiFile className={`text-lg ${color.replace('text-', 'text-').replace('800', '600')}`} />
                                            </div>
                                            <div className="ml-4 flex-1">
                                                <h3 className="font-medium text-gray-900 line-clamp-2">{pub.title}</h3>
                                                {pub.context && (
                                                    <p className="mt-1 text-sm text-gray-500 line-clamp-2">{pub.context}</p>
                                                )}
                                            </div>
                                        </div>
                                        
                                        <div className="mt-4 flex items-center justify-between">
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                                {getFileExtension(pub.file)}
                                            </span>
                                            <a
                                                href={`/storage/${pub.file}`}
                                                download
                                                className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                            >
                                                <FiDownload className="mr-1.5" /> Télécharger
                                            </a>
                                        </div>
                                    </div>
                                    <div className="bg-gray-50 px-5 py-3 text-xs text-gray-500">
                                        Ajouté le {new Date(pub.created_at).toLocaleDateString()}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
                            <p className="text-gray-500">Aucun document disponible pour cette catégorie</p>
                        </div>
                    )}
                </section>
            ))}
        </div>
    );
}