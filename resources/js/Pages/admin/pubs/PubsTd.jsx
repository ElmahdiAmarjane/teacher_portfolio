import { ArrowBigDownDash, Newspaper, Plus } from "lucide-react";
import { useActionState, useState } from "react";

import coursPdf from "../../../assets/TP1_SIBDD.pdf";
import { PubItem } from "./PubItem";

const PubsTd = () => {
    const [courseOpen, setCourseOpen] = useState(true);
    const [tdOpen, setTdOpen] = useState(true);
    const [tpOpen, setTpOpen] = useState(true);

    const courses = [
        {
            title: "Introduction au Code",
            description:
                "Un aperçu des bases du code avec un exemple pratique.",
            files: [
                {
                    type: "img",
                    link: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBbyfpnQ8jfcPo7Y8mzitgDs3Kpd6dcR_1XQ&s",
                    titleImg: "code_example.jpg",
                },
            ],
        },
        {
            title: "Framework Angular",
            description:
                "Logo officiel du framework Angular, utile pour les présentations.",
            files: [
                {
                    type: "img",
                    link: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkD02DcSOWfqUixeEhhMcu-K-DGJupNkXZNA&s",
                    titleImg: "map angular",
                },
                {
                    type: "img",
                    link: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNHV1gamrQ4FdpUtHHBaWJY7nU-oFlPfQemw&s",
                    titleImg: "logo_angular.png",
                },
                {
                    type: "img",
                    link: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpfgkXLbczQtYUXHiAaPJ6IEGrkbmVHJBsNg&s",
                    titleImg: "exapmle_code",
                },
            ],
        },
        {
            title: "Cours Python",
            description: "Un cours détaillé sur Python au format PDF.",
            files: [
                {
                    type: "pdf",
                    link: coursPdf,
                    titleImg: "Cours Python pdf",
                },
            ],
        },
    ];

    return (
        <>
            <div className="  ">
                <div
                    className="flex justify-between   rounded-tl rounded-tr p-2 bg-[#1C2029] border  text-white  "
                    onClick={() => {
                        setCourseOpen(!courseOpen);
                    }}
                >
                    <p className="flex gap-2">
                        {" "}
                        <Newspaper className="text-white-500" />
                        TD
                    </p>

                    <ArrowBigDownDash
                        className={`${!courseOpen && "rotate-180"}`}
                    />
                </div>
                <div
                    className={` ${
                        !courseOpen && "hidden"
                    } rounded flex flex-col  gap-2 border-[#1C2029] border-2  p-1 shadow-sm `}
                >
                    <button className=" w-fit  self-end flex border p-1 border-[#1C2029]  ">
                        <Plus />
                        New Post
                    </button>

                    {courses.map((e,index) => (
                        <PubItem item={e} key={index} />
                    ))}
                </div>
            </div>
        </>
    );
};

export default PubsTd;
