import { useState, useRef, useEffect } from "react";
import {
  FaCode,
  FaServer,
  FaDatabase,
  FaRobot,
  FaChevronLeft,
  FaChevronRight,
  FaArrowRight,
} from "react-icons/fa";
import heroImage from "../../assets/images/profile.png";
import aboutImage from "../../assets/images/profile.png";

const Home = () => {
  const formations = [
    {
      title: "Développement Web",
      description:
        "Apprenez à créer des sites web interactifs avec HTML, CSS, JavaScript et des frameworks modernes.",
      icon: <FaCode className="text-teal-600 text-2xl" />,
    },
    {
      title: "Développement Backend",
      description:
        "Maîtrisez les langages côté serveur, les API RESTful et la logique métier pour des applications robustes.",
      icon: <FaServer className="text-teal-600 text-2xl" />,
    },
    {
      title: "Bases de Données",
      description:
        "Concevez et gérez des bases de données relationnelles et NoSQL efficacement.",
      icon: <FaDatabase className="text-teal-600 text-2xl" />,
    },
    {
      title: "Intelligence Artificielle",
      description:
        "Explorez les fondamentaux du Machine Learning, du Deep Learning et leurs applications.",
      icon: <FaRobot className="text-teal-600 text-2xl" />,
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef(null);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % formations.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? formations.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col-reverse lg:flex-row items-center justify-between px-6 md:px-12 lg:px-20 py-20 bg-gradient-to-r from-teal-100 to-teal-50">
        <div className="max-w-xl text-center lg:text-left">
          <p className="text-gray-800 text-lg font-semibold">Hey, I'm John</p>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 my-4 leading-tight">
            Full Stack <br className="hidden md:block" /> Developer
          </h1>
          <p className="text-gray-800 text-base sm:text-lg mb-6">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet soluta assumenda cum?
          </p>
          <button className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-md font-medium inline-flex items-center transition">
            Get in Touch <FaArrowRight className="ml-2" />
          </button>
        </div>
        <div className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xs xl:max-w-md mb-12 lg:mb-0">
          <img src={heroImage} alt="Hero" className="w-full h-auto object-cover rounded-xl" />
        </div>
      </section>

      {/* About Section */}
      <section className="flex flex-col md:flex-row items-center justify-between gap-12 px-6 md:px-12 lg:px-20 py-20 bg-teal-50">
        <div className="w-full max-w-xs sm:max-w-sm md:max-w-md">
          <img src={aboutImage} alt="About Me" className="w-full h-auto object-cover rounded-xl" />
        </div>
        <div className="max-w-2xl text-center md:text-left">
          <p className="text-sm text-teal-600 font-medium mb-2">About</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">About Me</h2>
          <p className="text-gray-800 mb-4 text-base sm:text-lg">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem, reprehenderit alias?
          </p>
          <p className="text-gray-800 text-base sm:text-lg">
            Autem officiis sit debitis omnis harum sed veniam quasi dicta accusamus.
          </p>
        </div>
      </section>

      {/* Formations Section */}
<section className="bg-teal-50 py-12">
  <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-10 text-center">
    Mes <span className="text-teal-600">Formations</span>
  </h2>

  <div className="relative max-w-4xl mx-auto"> {/* Réduction de la largeur max du carrousel */}
    <div className="overflow-hidden">
      <div
        ref={carouselRef}
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {formations.map((formation, index) => (
          <div key={index} className="w-full flex-shrink-0 px-4">
            <div className="p-6 md:p-8 rounded-xl shadow-sm">
              <div className="flex flex-col items-center text-center">
                <div className="bg-teal-100 w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center mb-6">
                  {formation.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{formation.title}</h3>
                <p className="text-gray-600 text-sm sm:text-base mb-4 max-w-md">{formation.description}</p>
                <button className="text-teal-600 font-medium hover:text-teal-800">
                  Voir le programme → 
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Flèches de défilement */}
    <button
      onClick={prevSlide}
      className="absolute left-0 top-1/2 -translate-y-1/2 -ml-4 bg-white p-3 rounded-full shadow-md hover:bg-gray-100 z-10"
    >
      <FaChevronLeft className="text-teal-600" />
    </button>

    <button
      onClick={nextSlide}
      className="absolute right-0 top-1/2 -translate-y-1/2 -mr-4 bg-white p-3 rounded-full shadow-md hover:bg-gray-100 z-10"
    >
      <FaChevronRight className="text-teal-600" />
    </button>
  </div>

  {/* Indicateurs de défilement */}
  <div className="flex justify-center mt-6 gap-2">
    {formations.map((_, index) => (
      <button
        key={index}
        onClick={() => setCurrentIndex(index)}
        className={`w-3 h-3 rounded-full ${currentIndex === index ? 'bg-teal-600' : 'bg-gray-300'}`}
      />
    ))}
  </div>
</section>

{/* Domaines d'Expertise Section */}
<section className="bg-teal-50 rounded-2xl p-6 sm:p-8 md:p-12">
  <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 mb-12">
    Domaines d'<span className="text-teal-600">Expertise</span>
  </h2>

  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
    {formations.map((formation, index) => (
      <div key={index} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition">
        <div className="flex items-center gap-4 mb-4">
          <div className="bg-teal-100 p-3 rounded-lg">
            {formation.icon}
          </div>
          <h3 className="text-lg font-semibold text-gray-900">{formation.title}</h3>
        </div>
        <p className="text-gray-600 text-sm sm:text-base">{formation.description}</p>
      </div>
    ))}
  </div>
</section>

    </div>
  );
};

export default Home;