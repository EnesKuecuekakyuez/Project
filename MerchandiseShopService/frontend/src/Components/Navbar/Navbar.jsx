import { Check, Heart, Info, Menu, Search, ShoppingCart, User } from "lucide-react";
import { Link, NavLink } from "react-router";

// Hauptkomponente für die Navigation
const Navbar = () => {
    return (
        <div>

            {/* 🔵 Obere Navbar-Leiste mit Versand-Info und Sprache/Hilfe */}
            <div className="navbar_top flex items-center justify-center bg-[#272343] h-[60px] w-full">
                <div className="lg:container flex justify-between items-center">
                    
                    {/* Versand-Hinweis */}
                    <p className="flex items-center gap-2 text-base font-inter font-normal text-white capitalize">
                        <Check /> Free shipping on all orders over €50
                    </p>

                    {/* Sprachauswahl, FAQ und Hilfe */}
                    <div className="navbar_top_right flex items-center gap-6">
                        <select defaultValue="language" className="bg-none h-[30px] w-[80px] text-base font-inter font-normal capitalize text-white">
                            <option>English</option>
                            <option>Deutsch</option>
                        </select>

                        <button>
                            <Link className="text-base text-white font-inter font-normal capitalize">FAQ</Link>
                        </button>

                        <button>
                            <Link className="flex items-center gap-1 text-base text-white font-inter font-normal capitalize">
                                <Info /> Help
                            </Link>
                        </button>
                    </div>
                </div>
            </div>

            {/* 🟡 Mittlere Navbar mit Logo, Suchfeld und Icons */}
            <div className="navbar_middle flex items-center justify-center bg-[#f0f2f3] w-full h-[90px]">
                <div className="lg:container grid grid-cols-3 items-center">

                    {/* Logo */}
                    <div className="logo_wrapper">
                        <Link to='/' className="text-4xl text-black font-inter font-semibold capitalize flex items-center gap-3">
                            <img src="/src/assets/Logo/Logoo_image.png" alt="EMMAF Motors Logo" className="w-12 h-12 object-contain" />
                            EMMAF MOTORS
                        </Link>
                    </div>

                    {/* Suchfeld */}
                    <div className="search_box">
                        <form action="#" className="max-w-[443px] h-[50px] relative">
                            <input type="text" placeholder="Search for products..." className="w-full h-full bg-white rounded-lg pl-4 text-base placeholder:text-gray-700 text-gray-800" />
                            <button className="absolute right-4 top-1/2 -translate-y-1/2">
                                <Search size='24px' color="#272343" />
                            </button>
                        </form>
                    </div>

                    {/* Icons: Cart, Wishlist, User Dropdown */}
                    <div className="navbar_middle_right flex items-center gap-5 justify-end">
                        
                        {/* Warenkorb */}
                        <button className="btn capitalize text-base">
                            <ShoppingCart /> Cart <div className="badge badge-sm bg-[#029fae]">0</div>
                        </button>

                        {/* Favoriten */}
                        <button className="btn capitalize text-base">
                            <Heart />
                        </button>

                        {/* Benutzer Dropdown */}
                        <div className="dropdown">
                            <div tabIndex={0} role="button" className="btn m-1"><User /></div>
                            <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                                <li><a><Link>My Account</Link></a></li>
                                <li><a><Link>Logout</Link></a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {/* 🔻 Untere Navbar mit Kategorien und Hauptnavigation */}
            <div className="navbar_bottom flex items-center justify-center w-full h-[80px] bg-white border-b-[1px] border-[#e1e3e5]">
                <div className="lg:container flex items-center justify-between">

                    {/* Linke Seite: Kategorien + Navigation */}
                    <div className="navbar_bottom_left flex items-center gap-10">

                        {/* Kategorien Dropdown */}
                        <div className="dropdown dropdown-start">
                            <div tabIndex={0} role="button" className="btn m-1 flex items-center gap-5 capitalize text-xl">
                                <Menu /> Categories
                            </div>
                            <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-1 w-55 p-2 shadow-sm text-xl">
                                <li><a>T-Shirts</a></li>
                                <li><a>Sweatshirts</a></li>
                                <li><a>Caps</a></li>
                                <li><a>Sunglasses</a></li>
                                <li><a>Bottles</a></li>
                                <li><a>Model Cars</a></li>
                            </ul>
                        </div>

                        {/* Hauptnavigation – Schriftgröße erhöht */}
                        <nav className="flex items-center gap-10">
                            <NavLink to='/' className='text-xl text-[#029fae] font-inter font-semibold capitalize'>Home</NavLink>
                            <NavLink className='text-xl text-[#636270] font-inter font-semibold capitalize'>Shop</NavLink>
                            <NavLink className='text-xl text-[#636270] font-inter font-semibold capitalize'>Products</NavLink>
                            <NavLink className='text-xl text-[#636270] font-inter font-semibold capitalize'>About Us</NavLink>
                            <NavLink className='text-xl text-[#636270] font-inter font-semibold capitalize'>Contact</NavLink>
                        </nav>
                    </div>

                    {/* Rechte Seite: Kontaktinfo */}
                    <div className="navbar_bottom_right">
                        <p className="text-base text-[#636270] font-inter font-normal capitalize text-xl">
                            Contact: <span className="text-[#272343]">(0711) 593526</span>
                        </p>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Navbar;
