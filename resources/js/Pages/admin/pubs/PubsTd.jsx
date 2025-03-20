import { useEffect, useState } from "react";
import { Newspaper, ArrowBigDownDash, Plus } from "lucide-react";
import { PubItem } from "./PubItem";

import pdfPreviewImage from "../../../assets/TP1_SIBDD.pdf"; // Fixed preview image for PDFs

const BASE_URL = "http://127.0.0.1:8000/";

const PubsTd = () => {
    const [tdOpen, setTdOpen] = useState(true);
    const [tds, setTds] = useState([]);
    const [loading, setLoading] = useState(true); // Handle loading state
    const [error, setError] = useState(null); // Handle error state

    useEffect(() => {
        const fetchTds = async () => {
            try {
                const response = await fetch(`${BASE_URL}api/publications/fetchByType`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ type: "TD" }),
                });

                const data = await response.json();

                if (data.publications && Array.isArray(data.publications)) {
                    const updatedTds = data.publications.map((td) => {
                        let parsedFiles = [];
                        try {
                            parsedFiles = JSON.parse(td.files); // Convert files string to array
                        } catch (error) {
                            console.error("Error parsing files:", error);
                        }

                        // Filter only PDFs
                        const pdfFiles = parsedFiles.filter((file) => file.endsWith(".pdf"));

                        return {
                            title: td.title,
                            description: td.description,
                            files: pdfFiles.map((pdf) => ({
                                type: "pdf",
                                link: pdfPreviewImage, // PDF file link
                                previewImage: pdfPreviewImage, // Fixed local image as preview
                                titleImg: "PDF Preview",
                            })),
                        };
                    });

                    setTds(updatedTds);
                } else {
                    console.error("Invalid response format:", data);
                }
            } catch (error) {
                setError("Error fetching TDs.");
                console.error("Error fetching TDs:", error);
            } finally {
                setLoading(false); // Stop loading once fetch is complete
            }
        };

        fetchTds();
    }, []);

    return (
        <div>
            <div
                className="flex justify-between rounded-tl rounded-tr p-2 bg-[#1C2029] border text-white cursor-pointer"
                onClick={() => setTdOpen(!tdOpen)}
            >
                <p className="flex gap-2">
                    <Newspaper className="text-white-500" />
                    TD
                </p>
                <ArrowBigDownDash className={`${!tdOpen && "rotate-180"}`} />
            </div>

            {tdOpen && (
                <div className="rounded flex flex-col gap-2 border-[#1C2029] border-2 p-1 shadow-sm">
                    {loading ? (
                        <div className="flex justify-center items-center p-4 text-gray-500">Loading...</div>
                    ) : error ? (
                        <div className="flex justify-center items-center p-4 text-red-500">{error}</div>
                    ) : tds.length > 0 ? (
                        tds.map((td, index) => <PubItem key={index} item={td} />)
                    ) : (
                        <div className="flex justify-center items-center p-4 text-gray-500">
                            No TDs available.
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default PubsTd;
