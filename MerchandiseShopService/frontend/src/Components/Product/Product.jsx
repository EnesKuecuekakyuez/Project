// 📦 React-Hook zur Zustandsverwaltung importieren
import { useState } from "react";

// 🧩 Eigene Komponente für Abschnittsüberschriften importieren
import SectionTitle from "../SectionTitle/SectionTitle";

// 🛒 Einkaufswagen-Icon von lucide-react (für "In den Warenkorb"-Button)
import { ShoppingCart } from "lucide-react";

// 🧾 Hauptkomponente für die Produktanzeige
const Product = () => {

    // 📊 Liste der aktuellen Trending-Produkte
    const products = [
        {
            title: 'EMMAF Hoodie – Black Edition',
            status: 'New',
            price: '$100',
            image: '/src/assets/Banner/Pullover_image.png',
            currentPrice: '$120',
            product: 'trending',
        },
        {
            title: 'Classic EMMAF T-Shirt',
            status: 'Bestseller',
            price: '$29',
            image: '/src/assets/Banner/Tshirt_image.png',
            product: 'trending',
        },
        {
            title: 'EMMAF Logo Cap',
            status: 'Bestseller',
            price: '$25',
            image: 'src/assets/Banner/Capp_image.png',
            product: 'trending',
        },
        {
            title: 'EMMAF Bottle 0,5l',
            status: 'Bestseller',
            price: '$120',
            image: '/src/assets/Banner/Flasche_image.png',
            product: 'trending',
        }
    ];

    return (
        // 🌐 Hauptcontainer mit neuer Hintergrundfarbe + weißem Text
        <div className="lg:container mx-auto bg-white text-white py-16 px-6 rounded-lg shadow-lg">

            {/* 🔤 Titelbereich mit zentrierter Überschrift */}
            <div className="flex flex-col items-center justify-center">
                <SectionTitle
                    title={'Trending Products'}
                    textAlign={'center'}
                    mb={'mb-10'}
                    textColor="text-white" // Sicherstellen, dass SectionTitle es übernimmt
                />
            </div>

            {/* 🧱 Produktübersicht im Grid-Layout */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {
                    products.map((product, index) => (
                        <div key={index} className="p-4 bg-gray-500 rounded-lg shadow-md">
                            
                            {/* 🖼️ Produktbild + Label */}
                            <div className="feature_image mb-4 relative">
                                <img
                                    className="w-full max-h-[312px] rounded-lg object-cover"
                                    src={product.image}
                                    alt={product.title}
                                />
                                {
                                    product.status && (
                                        <div className="absolute top-4 left-4 bg-[#007580] text-white px-2 py-1 rounded-lg">
                                            <span className="text-sm font-inter font-normal">{product.status}</span>
                                        </div>
                                    )
                                }
                            </div>

                            {/* 📄 Produktinformationen */}
                            <div className="feature_content">

                                {/* 🔠 Titel + Warenkorbbutton */}
                                <div className="flex items-center justify-between">
                                    <h4 className="text-base text-white capitalize font-inter font-semibold mb-4">
                                        {product.title}
                                    </h4>

                                    <span className="bg-[#007580] h-[44px] w-[44px] rounded-lg flex items-center justify-center">
                                        <ShoppingCart size='1.5rem' color="#fff" />
                                    </span>
                                </div>

                                {/* 💰 Preisbereich */}
                                <p className="text-xl flex items-center gap-2 text-white font-semibold font-inter">
                                    {product.price}
                                    {
                                        product.currentPrice && (
                                            <span className="text-sm text-[#9a9caa] font-inter font-normal line-through">
                                                {product.currentPrice}
                                            </span>
                                        )
                                    }
                                </p>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

// 📤 Komponente exportieren
export default Product;
