import { useEffect, useState } from "react";
import { Newspaper, ArrowBigDownDash } from "lucide-react";
import { PubItem } from "./PubItem";

import pdfPreviewImage from "../../../assets/TP1_SIBDD.pdf"; // Fixed image for all PDFs

const BASE_URL = "http://127.0.0.1:8000/";

const PubsCours = () => {
    const [courseOpen, setCourseOpen] = useState(true);
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true); // Handle loading state
    const [error, setError] = useState(null); // Handle error state

    const handleDelete = (deletedId) => {
        setCourses((prevCourses) =>
            prevCourses.filter((course) => course.id !== deletedId)
        );
    };
    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await fetch(`${BASE_URL}api/publications/fetchByType`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ type: "COUR" }),
                });

                const data = await response.json();

                if (data.publications && Array.isArray(data.publications)) {
                    const updatedCourses = data.publications.map((course) => {
                        let parsedFiles = [];
                        try {
                            parsedFiles = JSON.parse(course.files); // Convert files string to array
                        } catch (error) {
                            console.error("Error parsing files:", error);
                        }

                        // Filter only PDFs
                        const pdfFiles = parsedFiles.filter((file) => file.endsWith(".pdf"));

                        return {
                            title: course.title,
                            description: course.description,
                            files: pdfFiles.map((pdf) => ({
                                type: "pdf",
                                link: pdfPreviewImage, // PDF file link
                                previewImage: pdfPreviewImage, // Fixed local image as preview
                                titleImg: "PDF Preview",
                            })),
                        };
                    });

                    setCourses(updatedCourses);
                } else {
                    console.error("Invalid response format:", data);
                }
            } catch (error) {
                setError("Error fetching courses.");
                console.error("Error fetching courses:", error);
            } finally {
                setLoading(false); // Stop loading once fetch is complete
            }
        };

        fetchCourses();
    }, []);

    return (
        <div>
            <div
                className="flex justify-between rounded-tl rounded-tr p-2 bg-[#1C2029] border text-white cursor-pointer"
                onClick={() => setCourseOpen(!courseOpen)}
            >
                <p className="flex gap-2">
                    <Newspaper className="text-white-500" />
                    Courses
                </p>
                <ArrowBigDownDash className={`${!courseOpen && "rotate-180"}`} />
            </div>

            {courseOpen && (
                <div className="rounded flex flex-col gap-2 border-[#1C2029] border-2 p-1 shadow-sm">
                    {loading ? (
                        <div className="flex justify-center items-center p-4 text-gray-500">Loading...</div>
                    ) : error ? (
                        <div className="flex justify-center items-center p-4 text-red-500">{error}</div>
                    ) : courses.length > 0 ? (
                        courses.map((course, index) => <PubItem key={index} item={course} onDelete={handleDelete} />)
                    ) : (
                        <div className="flex justify-center items-center p-4 text-gray-500">
                            No courses available.
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default PubsCours;