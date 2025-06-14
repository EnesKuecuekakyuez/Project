import SectionTitle from "../SectionTitle/SectionTitle";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { User } from "lucide-react";

const Client = () => {
    const clientSays = [
        {
            id: 1,
            description: "Absolutely love the EMMAF Motors merchandise! The quality of the T-shirts and hoodies is outstanding. I get compliments every time I wear them.",
            name: "Michael Thompson",
            position: "Car Enthusiast, Berlin"
        },
        {
            id: 2,
            description: "The EMMAF caps and sunglasses are my favorite accessories. Stylish and comfortable. Highly recommend for anyone who loves motorsports and fashion!",
            name: "Sophie Müller",
            position: "Auto Blogger, Munich"
        },
        {
            id: 3,
            description: "Finally a brand that combines performance and style! The water bottles and model cars are perfect collectibles. Can’t wait for the next drop!",
            name: "Lucas Brandt",
            position: "Collector, Hamburg"
        },
        {
            id: 4,
            description: "Fast delivery, amazing quality, and a real motorsport vibe! EMMAF Motors nailed it. I'll definitely be ordering again.",
            name: "Emma Rossi",
            position: "Race Fan, Stuttgart"
        }
    ];

    const settings = {
        dots: false,
        infinite: true,
        slidesToShow: 2,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000
    };

    return (
        <div className="lg:container mx-auto">
            <SectionTitle title="What our customers say about EMMAF Motors" mb="mb-11" />

            <div className="slider-container w-full h-full">
                <Slider {...settings}>
                    {
                        clientSays.map((client, index) => (
                            <div key={index} className="p-12 border-[1px] border-[#e1e1e3] rounded-lg">
                                <p className="text-2xl mb-4 text-[#636270] font-inter font-normal client_say_description">{client.description}</p>
                                <div className="flex items-center gap-4">
                                    <User size='4rem' />
                                    <div>
                                        <h4 className="text-2xl text-[#272343] font-inter font-medium capitalize mb-1.5">{client.name}</h4>
                                        <p className="text-base text-[#9a9caa] font-inter capitalize font-normal">{client.position}</p>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </Slider>
            </div>
        </div>
    );
};

export default Client;
