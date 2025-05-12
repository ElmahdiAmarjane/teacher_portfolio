


// const Footer = ()=>{

//     return (
//      <>
    
//       <h1>Footer</h1>    

//     </>
//     )
// }

// export default Footer;
import { FaLinkedin, FaGithub, FaTwitter, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Colonne 1 - À propos */}
          <div>
            <h3 className="text-lg font-bold mb-4">À propos</h3>
            <p className="text-gray-300">
              Professeur d'informatique passionné par l'enseignement et les nouvelles technologies.
            </p>
          </div>

          {/* Colonne 2 - Liens rapides */}
          <div>
            <h3 className="text-lg font-bold mb-4">Liens rapides</h3>
            <ul className="space-y-2">
              <li><a href="#accueil" className="text-gray-300 hover:text-white transition-colors">Accueil</a></li>
              <li><a href="#formations" className="text-gray-300 hover:text-white transition-colors">Formations</a></li>
              <li><a href="#apropos" className="text-gray-300 hover:text-white transition-colors">À propos</a></li>
              <li><a href="#contact" className="text-gray-300 hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Colonne 3 - Contact */}
          <div>
            <h3 className="text-lg font-bold mb-4">Contact</h3>
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-center">
                <FaEnvelope className="mr-2" /> email@exemple.com
              </li>
              <li>Tél: +123 456 789</li>
              <li>Université de Technologie</li>
            </ul>
          </div>

          {/* Colonne 4 - Réseaux sociaux */}
          <div>
            <h3 className="text-lg font-bold mb-4">Réseaux sociaux</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white transition-colors" aria-label="LinkedIn">
                <FaLinkedin className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors" aria-label="GitHub">
                <FaGithub className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors" aria-label="Twitter">
                <FaTwitter className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-gray-700 text-center text-gray-400">
          <p>© {new Date().getFullYear()} Professeur Informatique. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;