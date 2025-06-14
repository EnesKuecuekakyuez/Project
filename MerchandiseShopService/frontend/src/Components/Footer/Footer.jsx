// Import von Icons aus lucide-react
import { CarFront, Banknote, CreditCard, Facebook, Instagram, Youtube } from "lucide-react";
import { Link } from "react-router"; // Für Navigation innerhalb der App

// Custom Icon für TikTok (SVG direkt eingebunden)
const TikTokIcon = () => (
  <svg width="24" height="24" fill="white" viewBox="0 0 24 24">
    <path d="M16 8.245a6.748 6.748 0 0 0 3.771 1.21V6.379a3.584 3.584 0 0 1-3.55-3.206H13.77v14.472a2.431 2.431 0 1 1-2.439-2.428c.254 0 .501.043.729.122V11.33a5.13 5.13 0 0 0-.729-.056 5.505 5.505 0 1 0 5.5 5.503V8.245z" />
  </svg>
);

// Custom Icon für X (ehemals Twitter)
const XIcon = () => (
  <svg width="24" height="24" fill="white" viewBox="0 0 24 24">
    <path d="M14.2 10.9L21.5 2h-1.9l-6.2 7.4L8.6 2H2l7.7 11.1L2 22h1.9l6.7-8.1 5.1 8.1H22l-7.8-11.1z" />
  </svg>
);

// Footer-Komponente
const Footer = () => {
  return (
    <footer className="bg-[#272343] text-white"> {/* Hintergrund dunkel, Schrift weiß */}

      {/* 🔝 Oberer Footer-Bereich */}
      <div className="w-full border-t border-b border-[#3e3f5e] pt-[80px] pb-[60px]">
        <div className="lg:container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

            {/* Logo und Beschreibung */}
            <div>
              {/* Logo und Name der Marke */}
              <div className="logo_wrapper mb-7">
                <Link to='/' className="text-3xl font-inter font-medium capitalize flex items-center gap-2">
                  <CarFront size='2rem' color="#ffffff" /> EMMAF Motors
                </Link>
              </div>

              {/* Beschreibungstext */}
              <p className="text-base font-inter font-normal mb-4 max-w-[350px] text-white/80">
                Discover exclusive EMMAF Motors merchandise – crafted with passion for motorsport fans. Join the ride!
              </p>

              {/* Social Media Icons */}
              <div className="flex items-center gap-3">
                <Link className="p-3 rounded-full border-white border inline-block"><Facebook size='1.5rem' /></Link>
                <Link className="p-3 inline-block"><XIcon /></Link> {/* X (ehem. Twitter) */}
                <Link className="p-3 inline-block"><Instagram size='1.5rem' /></Link>
                <Link className="p-3 inline-block"><Youtube size='1.5rem' /></Link>
                <Link className="p-3 inline-block"><TikTokIcon /></Link> {/* TikTok-Icon */}
              </div>
            </div>

            {/* Kategorien-Liste */}
            <div>
              <h3 className="text-xl font-inter font-medium uppercase text-white/70">Shop Categories</h3>
              <ul className="space-y-2 mt-4">
                <li><Link className="text-base font-inter capitalize text-white">T-Shirts</Link></li>
                <li><Link className="text-base font-inter capitalize text-white">Hoodies</Link></li>
                <li><Link className="text-base font-inter capitalize text-white">Caps</Link></li>
                <li><Link className="text-base font-inter capitalize text-white">Sunglasses</Link></li>
                <li><Link className="text-base font-inter capitalize text-white">Bottles</Link></li>
                <li><Link className="text-base font-inter capitalize text-white">Model Cars</Link></li>
              </ul>
            </div>

            {/* Rechtliches Menü */}
            <div>
              <h3 className="text-xl font-inter font-medium uppercase text-white/70">Legal</h3>
              <ul className="space-y-2 mt-4">
                <li><Link className="text-base font-inter capitalize text-white">Impressum</Link></li>
                <li><Link className="text-base font-inter capitalize text-white">Privacy Policy</Link></li>
                <li><Link className="text-base font-inter capitalize text-white">Terms & Conditions</Link></li>
                <li><Link className="text-base font-inter capitalize text-white">Shipping & Returns</Link></li>
              </ul>
            </div>

            {/* Newsletter-Eintragung */}
            <div>
              <h3 className="text-xl font-inter font-medium uppercase text-white/70">Newsletter</h3>
              <form action="#" className="mt-4 max-w-[424px] w-full flex items-center gap-2">
                {/* Eingabefeld für E-Mail */}
                <input type="email" placeholder="Your Email..." className="max-w-[285px] w-full h-[46px] border border-white/40 bg-transparent text-white placeholder-white/60 rounded-lg pl-2" />
                {/* Button zum Absenden */}
                <button type="submit" className="text-base text-white font-semibold capitalize w-[127px] h-[46px] bg-[#007580] rounded-lg cursor-pointer">
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* 🔻 Unterer Footer-Bereich */}
      <div className="w-full h-[75px] flex items-center justify-center bg-[#1e1f3a]">
        <div className="lg:container mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 px-4">

            {/* Copyright-Text */}
            <p className="text-sm text-white/70 font-inter">
              © 2025 EMMAF Motors – Powered by <span className="text-white">Lifeonthecode</span>
            </p>

            {/* Zahlungsmethoden */}
            <div className="flex items-center gap-4">
              <p className="flex items-center gap-2 text-white/70 text-sm"><Banknote size='1.5rem' /> Bank Transfer</p>
              <p className="flex items-center gap-2 text-white/70 text-sm"><CreditCard size='1.5rem' /> Credit Card</p>
            </div>
          </div>
        </div>
      </div>

    </footer>
  );
};

export default Footer;
