import Footer from "@/Components/student/Footer";
import Header from "@/Components/student/Header";


export default function StudentLayout({children}){

    return (
        <>
           <Header/>
            <main>
                {children}
            </main>
            <Footer/>
        </>
    )
}