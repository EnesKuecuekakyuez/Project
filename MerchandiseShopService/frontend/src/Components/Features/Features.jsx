// 🧩 Importiere SectionTitle-Komponente
import SectionTitle from "../SectionTitle/SectionTitle";

// 💡 Features-Komponente mit 4 Kategorien: Men, Women, Kids, Accessories
const Features = () => {

    // 🧺 Kategorie-Daten (Bildpfade kannst du bei Bedarf anpassen)
    const features = [
        {
            title: 'Men',
            image: '/src/assets/Banner/Tshirt_image.png',
        },
        {
            title: 'Women',
            image: '/src/assets/Banner/Pullover_image.png',
        },
        {
            title: 'Kids',
            image: '/src/assets/Banner/Capp_image.png',
        },
        {
            title: 'Accessories',
            image: '/src/assets/Banner/Flasche_image.png',
        },
    ];

    return (
        // 🌐 Gesamter Abschnitt mit weißem Hintergrund
        <div className="bg-white py-16">
            <div className="lg:container mx-auto">

                {/* 🔤 Überschrift zentriert */}
                <div className="text-center mb-11">
                    <SectionTitle
                        title="Our Categories"
                        textAlign="center"
                    />
                </div>

                {/* 🧱 Grid mit 4 Spalten auf großen Bildschirmen */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {
                        features.map((feature, index) => (
                            <div key={index} className="p-4">

                                {/* 🖼️ Bild + Overlay-Text */}
                                <div className="relative rounded-lg overflow-hidden group">
                                    <img
                                        className="w-full h-[400px] object-cover rounded-lg"
                                        src={feature.image}
                                        alt={feature.title}
                                    />

                                    {/* 🏷️ Titel mit Hover-Zoom */}
                                    <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                                        <h4
                                            className="text-white text-2xl font-semibold font-inter capitalize transition-all duration-300 group-hover:text-3xl"
                                        >
                                            {feature.title}
                                        </h4>
                                    </div>
                                </div>

                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    );
};

export default Features;

