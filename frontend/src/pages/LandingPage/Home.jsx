import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import emailjs from "@emailjs/browser";
import { toast } from 'react-toastify';

// AOS
import AOS from "aos";
import "aos/dist/aos.css";

// Images
import Landingpagebg from "../../assets/images/front-pic.png";
import img1 from "../../assets/images/LP-img1.jpg";
import img2 from "../../assets/images/LP-img2.png";
import img3 from "../../assets/images/LP-img3.png";
import img4 from "../../assets/images/LP-img4.jpg";
import img5 from "../../assets/images/LP-img5.jpg";
import applynowbg from "../../assets/images/applynowbg.png";

//Components
import GalleryLayout from "../../components/GalleryLayout.jsx";
import Navbar from "../../components/Navbar.jsx";
import TermsAndConditions from "./TermsAndConditions.jsx";
import PrivacyPolicy from "./PrivacyPolicy.jsx";

function Home() {
  const formRef = useRef(); // Ref for the contact form
  const [loading, setLoading] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);

  // Handle Contact Form Submission
  const handleContactSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs
      .sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        formRef.current,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY, // Fixed: Added VITE_ prefix
      )
      .then(
        () => {
          toast.success("Message sent successfully!");
          e.target.reset();
        },
        (error) => {
          console.error("FAILED...", error);
          toast.error("Something went wrong. Please try again.");
        },
      )
      .finally(() => setLoading(false));
  };
  const items = [
    { id: 1, src: img1, caption: "Front View", slot: "left1" },
    { id: 2, src: img2, caption: "Main Gate", slot: "rightTop" },
    { id: 3, src: img3, caption: "Parking Space", slot: "left2" },
    { id: 4, src: img4, caption: "Inside the Building", slot: "rightLarge" },
    { id: 5, src: img5, caption: "Main Road", slot: "left3" },
  ];

  // Logic to handle parallax only on desktop
  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 768);

  useEffect(() => {
    const timer = setTimeout(() => {
      AOS.init({
        duration: 1200,
        once: true,
        disable: "mobile",
      });
    }, 100);

    const handleResize = () => setIsDesktop(window.innerWidth > 768);
    window.addEventListener("resize", handleResize);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <div className="overflow-x-hidden bg-white">
      <Navbar />

      {/* ===== HERO SECTION ===== */}
      <section
        id="hero"
        className="relative w-full h-screen bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: `url(${Landingpagebg})` }}
      >
        <div data-aos="zoom-out" className="relative z-10 text-center px-6">
          <div className="mx-auto max-w-[1200px]">
            <h1
              className="text-white font-OswaldRegular uppercase tracking-[6px] mb-4"
              style={{ fontSize: "clamp(40px, 6vw, 90px)", lineHeight: 1.1 }}
            >
              Modern Living <br />
              <span className="text-[#e9cbb7]">Made Simple</span>
            </h1>
            <p className="mt-4 text-white/80 font-NunitoSans tracking-[2px] max-w-2xl mx-auto uppercase text-sm md:text-lg">
              762 F. Gomez St., Barangay Ibaba, Santa Rosa, Laguna
            </p>
          </div>
        </div>
      </section>

      {/* ===== 1. OVERALL BUILDING / GALLERY ===== */}
      <section id="home" className="py-24 px-6 md:px-12 lg:px-24 bg-white">
        <div className="max-w-7xl mx-auto">
          <div
            data-aos="fade-up"
            className="mb-16 text-center flex flex-col items-center"
          >
            <h4 className="text-[#db6747] font-bold tracking-widest uppercase text-sm mb-2">
              Our Property
            </h4>
            <h2 className="text-5xl md:text-6xl font-OswaldRegular uppercase text-black">
              Overall Building
            </h2>
            <div className="w-24 h-1.5 bg-[#db6747] mt-4 mb-8 mx-auto" />
            <p className="text-gray-500 text-lg md:text-xl max-w-3xl font-NunitoSans leading-relaxed mx-auto">
              Experience convenience in a well-maintained complex designed for
              the modern professional. Located strategically for easy access to
              Santa Rosa's commercial hubs.
            </p>
          </div>
          <div data-aos="fade-up">
            <GalleryLayout items={items} />
          </div>
        </div>
      </section>

      {/* ===== 2. ABOUT US SECTION ===== */}
      <section
        id="about"
        className="py-30 px-6 md:px-12 lg:px-24 bg-[#fff7f1] border-y border-gray-100"
      >
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">
          <div
            className="hidden md:block w-full md:w-1/2"
            data-aos="fade-right"
          >
            <div className="relative p-4 border border-[#db6747]">
              <img
                src={img1}
                alt="MGC Building"
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute -bottom-6 -left-6 bg-[#db6747] text-white p-8 hidden lg:block">
                <p className="font-OswaldRegular text-4xl">10+</p>
                <p className="text-xs uppercase tracking-widest">
                  Years of Service
                </p>
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/2 space-y-8" data-aos="fade-left">
            <h4 className="text-[#db6747] font-bold tracking-widest uppercase text-sm">
              Established 2015
            </h4>
            <h2 className="text-5xl font-OswaldRegular uppercase text-gray-900 leading-tight">
              About MGC Building
            </h2>
            <p className="text-lg text-gray-600 font-NunitoSans leading-relaxed">
              MGC Building is a well-maintained 35-unit residential complex. We
              provide modern, no-fuss apartment living designed for individuals
              and couples who value comfort, security, and affordability.
            </p>
            <p className="text-lg text-gray-600 font-NunitoSans leading-relaxed italic border-l-4 border-[#db6747] pl-6">
              "We focus on simple living without compromising quality, giving
              our residents a place they can truly call home."
            </p>
          </div>
        </div>
      </section>

      {/* ===== 3. RENT CONDITIONS SECTION ===== */}
      <section className="py-24 px-6 md:px-12 lg:px-24 bg-white">
        <div className="max-w-7xl mx-auto" data-aos="fade-up">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24">
            <div className="space-y-6 text-left">
              <h4 className="text-[#db6747] font-bold uppercase text-xs tracking-[2px]">
                Monthly Rate
              </h4>
              <h3 className="text-4xl lg:text-5xl font-OswaldRegular uppercase text-black">
                ₱3,000 Rent Rate
              </h3>
              <div className="w-16 h-1 bg-[#db6747]"></div>
              <p className="text-gray-500 font-NunitoSans text-lg leading-relaxed">
                Our units are priced competitively to ensure affordability for
                working professionals. Simple pricing for a high-quality
                lifestyle in a prime Laguna location.
              </p>
              <div className="inline-block bg-[#db6747] text-white font-LemonMilkRegular text-[10px] uppercase tracking-[3px] px-6 py-2 rounded-sm">
                No Pets Allowed
              </div>
            </div>

            <div className="space-y-6 text-left">
              <h4 className="text-[#db6747] font-bold uppercase text-xs tracking-[2px]">
                Deposit Terms
              </h4>
              <h3 className="text-4xl lg:text-5xl font-OswaldRegular uppercase text-black">
                Security & Terms
              </h3>
              <div className="w-16 h-1 bg-[#db6747]"></div>
              <ul className="space-y-4 text-gray-500 font-NunitoSans text-lg">
                <li className="flex items-center gap-3 tracking-wide">
                  • One-month advance payment
                </li>
                <li className="flex items-center gap-3 tracking-wide">
                  • One-month security deposit
                </li>
                <li className="flex items-center gap-3 tracking-wide">
                  • Minimum 6-month contract
                </li>
                <li className="flex items-center gap-3 tracking-wide">
                  • Subleasing is strictly prohibited
                </li>
              </ul>
              <div className="inline-block bg-[#3a0f08] text-white font-LemonMilkRegular text-[10px] uppercase tracking-[3px] px-6 py-2 rounded-sm">
                Strict Policy
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== APPLY NOW CTA SECTION ===== */}
      <section
        id="apply"
        className="relative w-full overflow-hidden flex justify-center items-center text-center py-24 md:py-32 lg:py-51"
        style={{
          backgroundImage: `url(${applynowbg})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundAttachment: isDesktop ? "fixed" : "scroll",
        }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 max-w-4xl px-6 flex flex-col items-center">
          <div data-aos="fade-up">
            <h4 className="font-NunitoSans font-bold tracking-[4px] md:tracking-[6px] text-[#e9cbb7] text-xs md:text-base uppercase mb-3">
              Your New Home Awaits
            </h4>
            <h2 className="font-OswaldRegular text-white text-4xl md:text-6xl uppercase leading-tight mb-6">
              Ready to Join Our <br />
              <span className="text-white underline decoration-[#db6747] underline-offset-8">
                Community?
              </span>
            </h2>
            <p className="text-white/90 font-NunitoSans text-lg md:text-xl mb-12 max-w-2xl mx-auto leading-relaxed">
              Secure your spot at MGC Building. Experience comfortable, modern
              living in the heart of Santa Rosa.
            </p>
          </div>
          <Link
            to="/applynow"
            data-aos="zoom-in"
            className="group relative inline-flex items-center justify-center 
             px-6 py-3 text-lg tracking-[2px] 
             md:px-12 md:py-6 md:text-3xl md:tracking-[3px] 
             font-OswaldRegular uppercase bg-white text-[#db6747] 
             transition-all duration-500 hover:bg-[#db6747] hover:text-white 
             rounded-lg shadow-2xl w-auto"
          >
            Start Your Application
            <svg
              className="hidden md:block ml-3 w-6 h-6 transition-transform duration-500 group-hover:translate-x-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
        </div>
      </section>

      {/* ===== 4. CONTACT US SECTION (Professional Style) ===== */}
      <section
        id="contact"
        className="py-40 px-6 md:px-12 lg:px-24 bg-[#fff7f1] border-t border-gray-100"
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left Side Info */}
          <div className="space-y-10" data-aos="fade-right">
            <div>
              <h4 className="text-[#db6747] font-bold tracking-[4px] uppercase text-xs mb-2">
                Get In Touch
              </h4>
              <h2 className="text-5xl md:text-6xl font-OswaldRegular uppercase text-black leading-tight">
                Let's Start <br />{" "}
                <span className="text-[#db6747]">A Conversation</span>
              </h2>
              <div className="w-24 h-1.5 bg-[#db6747] mt-6"></div>
            </div>
            <div className="space-y-8 max-w-md">
              <p className="text-gray-600 font-NunitoSans text-lg leading-relaxed">
                Have questions about our units, amenities, or the application
                process? Our team is here to help you find your perfect home.
              </p>
              <div className="flex flex-col gap-6 pt-2">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#e9cbb7]/30 flex items-center justify-center text-[#db6747]">
                    <span>✓</span>
                  </div>
                  <p className="font-NunitoSans font-bold text-gray-700 uppercase text-xs tracking-widest">
                    Fast Inquiry Response
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#e9cbb7]/30 flex items-center justify-center text-[#db6747]">
                    <span>✓</span>
                  </div>
                  <p className="font-NunitoSans font-bold text-gray-700 uppercase text-xs tracking-widest">
                    Unit Viewing Coordination
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side Form */}
          <div
            className="bg-white p-6 md:p-10 shadow-xl shadow-gray-200/50 rounded-2xl border border-gray-50"
            data-aos="fade-left"
          >
            <form
              ref={formRef}
              onSubmit={handleContactSubmit}
              className="space-y-4 md:space-y-5"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
                <div className="space-y-1 md:space-y-2">
                  <label className="block font-NunitoSans font-bold text-gray-800 text-[9px] md:text-[10px] uppercase tracking-widest">
                    Full Name
                  </label>
                  <input
                    required
                    name="fullName" // Matches {{fullName}} in EmailJS
                    type="text"
                    placeholder="Full Name"
                    className="w-full px-4 py-3 md:py-4 bg-gray-50 border border-transparent rounded-xl focus:outline-none focus:bg-white focus:border-[#db6747] focus:ring-4 focus:ring-[#db6747]/5 font-NunitoSans transition-all text-sm md:text-base"
                  />
                </div>

                <div className="space-y-1 md:space-y-2">
                  <label className="block font-NunitoSans font-bold text-gray-800 text-[9px] md:text-[10px] uppercase tracking-widest">
                    Email
                  </label>
                  <input
                    required
                    name="email" // Matches {{email}} in EmailJS
                    type="email"
                    placeholder="Email Address"
                    className="w-full px-4 py-3 md:py-4 bg-gray-50 border border-transparent rounded-xl focus:outline-none focus:bg-white focus:border-[#db6747] focus:ring-4 focus:ring-[#db6747]/5 font-NunitoSans transition-all text-sm md:text-base"
                  />
                </div>
              </div>

              <div className="space-y-1 md:space-y-2">
                <label className="block font-NunitoSans font-bold text-gray-800 text-[9px] md:text-[10px] uppercase tracking-widest">
                  Subject
                </label>
                <input
                  required
                  name="subject" // Matches {{subject}} in EmailJS
                  type="text"
                  placeholder="What is this regarding?"
                  className="w-full px-4 py-3 md:py-4 bg-gray-50 border border-transparent rounded-xl focus:outline-none focus:bg-white focus:border-[#db6747] focus:ring-4 focus:ring-[#db6747]/5 font-NunitoSans transition-all text-sm md:text-base"
                />
              </div>

              <div className="space-y-1 md:space-y-2">
                <label className="block font-NunitoSans font-bold text-gray-800 text-[9px] md:text-[10px] uppercase tracking-widest">
                  Message
                </label>
                <textarea
                  required
                  name="message" // Matches {{message}} in EmailJS
                  rows="4"
                  placeholder="Write your message here..."
                  className="w-full px-4 py-3 md:py-4 bg-gray-50 border border-transparent rounded-xl focus:outline-none focus:bg-white focus:border-[#db6747] focus:ring-4 focus:ring-[#db6747]/5 font-NunitoSans resize-none transition-all text-sm md:text-base"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full bg-[#db6747] text-white font-OswaldRegular py-4 md:py-5 uppercase tracking-[2px] md:tracking-[3px] rounded-xl transition-all duration-300 shadow-lg shadow-[#db6747]/20 flex items-center justify-center gap-2 md:gap-3 group text-sm md:text-base ${
                  loading
                    ? "opacity-70 cursor-not-allowed"
                    : "hover:bg-[#3a0f08]"
                }`}
              >
                {loading ? "Sending..." : "Send Message"}
                {!loading && (
                  <span className="group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                )}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="bg-[#3a0f08] text-white pt-20 pb-10 px-6 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto">
          {/* Grid setup for 4 balanced columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
            {/* Column 1: Location */}
            <div className="space-y-6">
              <h4 className="font-NunitoSans font-bold text-[#db6747] uppercase tracking-widest text-xs">
                Location
              </h4>
              <a
                href="https://maps.app.goo.gl/K19mgqv5qpGkxbXB9"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 font-NunitoSans text-sm leading-relaxed block hover:text-white transition-colors"
              >
                762 F. Gomez St., Barangay Ibaba,
                <br />
                Santa Rosa, Laguna, Philippines
              </a>
            </div>

            {/* Column 2: Caretakers */}
            <div className="space-y-6">
              <h4 className="font-NunitoSans font-bold text-[#db6747] uppercase tracking-widest text-xs">
                Caretakers
              </h4>
              <ul className="space-y-4 text-gray-300 font-NunitoSans text-sm">
                <li className="flex items-center gap-3">
                  <div className="bg-white/10 p-2 rounded-full">
                    <svg
                      className="w-4 h-4 text-[#db6747]"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                    </svg>
                  </div>
                  Julie Pastrana Canete
                </li>
                <li className="flex items-center gap-3">
                  <div className="bg-white/10 p-2 rounded-full">
                    <svg
                      className="w-4 h-4 text-[#db6747]"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                    </svg>
                  </div>
                  Kenneth Selencio
                </li>
              </ul>
            </div>

            {/* Column 3: Email Address */}
            <div className="space-y-6">
              <h4 className="font-NunitoSans font-bold text-[#db6747] uppercase tracking-widest text-xs">
                Email Address
              </h4>
              <a
                href="mailto:mgcbuilding762@gmail.com"
                className="text-gray-300 hover:text-white text-sm transition-colors font-NunitoSans break-all block"
              >
                mgcbuilding762@gmail.com
              </a>
            </div>

            {/* Column 4: Inquiry Hotlines */}
            <div className="space-y-6">
              <h4 className="font-NunitoSans font-bold text-[#db6747] uppercase tracking-widest text-xs">
                Inquiry Hotlines
              </h4>
              <div className="flex flex-col space-y-3">
                {["0921 309 2286", "0991 426 2113", "0967 663 5250"].map(
                  (num) => (
                    <a
                      key={num}
                      href={`tel:${num.replace(/\s/g, "")}`}
                      className="text-gray-300 hover:text-white transition-colors font-NunitoSans text-sm flex items-center group"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#db6747] mr-3 group-hover:scale-125 transition-transform" />
                      {num}
                    </a>
                  ),
                )}
              </div>
            </div>
          </div>

          {/* Bottom Bar: Copyright & Policies */}
          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-gray-500 font-NunitoSans text-[10px] uppercase tracking-[2px] text-center md:text-left">
              © {new Date().getFullYear()} MGC BUILDING. ALL RIGHTS RESERVED.
            </p>
            <div className="flex items-center gap-6 text-gray-500 uppercase tracking-[2px] text-[10px]">
              <button
                type="button"
                onClick={() => setShowPrivacy(true)}
                className="relative transition-colors hover:text-white
               after:content-[''] after:absolute after:left-1/2 after:-translate-x-1/2 after:-bottom-1
               after:w-0 after:h-px after:transition-all after:duration-300
               hover:after:w-full"
              >
                Privacy Policy
              </button>

              <button
                type="button"
                onClick={() => setShowTerms(true)}
                className="relative transition-colors hover:text-white px-3 py-1
               after:content-[''] after:absolute after:left-1/2 after:-translate-x-1/2 after:-bottom-1
               after:w-0 after:h-pxafter:transition-all after:duration-300
               hover:after:w-full"
              >
                Terms & Conditions
              </button>
            </div>
          </div>
        </div>
      </footer>
      <TermsAndConditions
        isOpen={showTerms}
        onClose={() => setShowTerms(false)}
      />

      <PrivacyPolicy
        isOpen={showPrivacy}
        onClose={() => setShowPrivacy(false)}
      />
    </div>
  );
}

export default Home;
