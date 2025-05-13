import { useState } from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import axios from "axios";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

   const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setError(null);

  try {
    const response = await axios.post("/contact", {
      name,
      email,
      message,
    });

    if (response.data.success) {
      alert("Message sent!");
      setName("");
      setEmail("");
      setMessage("");
    }
  } catch (err) {
    if (err.response?.data?.errors) {
      // Erreurs de validation Laravel
      const firstError = Object.values(err.response.data.errors)[0][0];
      setError(firstError);
    } else {
      setError("Something went wrong. Try again later.");
    }
  } finally {
    setLoading(false);
  }
};


  return (
    <section className="min-h-screen flex items-center justify-center bg-white text-teal-900 px-6 py-12">
      <div className="max-w-5xl w-full grid md:grid-cols-2 gap-12">
        {/* Left Section */}
        <div>
          <h2 className="text-4xl font-extrabold">
            Get in{" "}
            <span className="bg-gradient-to-r from-teal-500 to-teal-300 text-transparent bg-clip-text">
              touch
            </span>
          </h2>
          <p className="text-teal-600 mt-4">
            I'm currently available to take on new projects. Feel free to send me a message anytime!
          </p>

          {/* Contact Info */}
          <div className="mt-6 space-y-4">
            <div className="flex items-center space-x-3">
              <Mail className="text-teal-400" />
              <a href="mailto:youremail@example.com" className="hover:underline">
                youremail@example.com
              </a>
            </div>
            <div className="flex items-center space-x-3">
              <Phone className="text-teal-400" />
              <span>+123-456-7890</span>
            </div>
            <div className="flex items-center space-x-3">
              <MapPin className="text-teal-400" />
              <span>City, Country</span>
            </div>
          </div>
        </div>

        {/* Right Section (Form) */}
        <div className="bg-white p-6 rounded-lg shadow-lg border border-teal-100">
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="text-teal-600 block">Your Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="w-full p-3 bg-teal-50 rounded-md border border-teal-300 focus:border-teal-500 focus:ring focus:ring-teal-500 outline-none text-teal-900"
              />
            </div>
            <div>
              <label className="text-teal-600 block">Your Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full p-3 bg-teal-50 rounded-md border border-teal-300 focus:border-teal-500 focus:ring focus:ring-teal-500 outline-none text-teal-900"
              />
            </div>
            <div>
              <label className="text-teal-600 block">Your Message</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write your message here"
                rows="4"
                className="w-full p-3 bg-teal-50 rounded-md border border-teal-300 focus:border-teal-500 focus:ring focus:ring-teal-500 outline-none text-teal-900"
              />
            </div>
            {error && <div className="text-red-500">{error}</div>}
            <button
              type="submit"
              className="w-full py-3 mt-4 rounded-md bg-gradient-to-r from-teal-500 to-teal-300 text-white font-semibold shadow-md hover:scale-105 transition"
              disabled={loading} // Désactive le bouton pendant l'envoi
            >
              {loading ? "Sending..." : "Submit now"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;