import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { MoveLeft, MoveRight } from "lucide-react";

const Banner = () => {

    const products = [
        {
            id: 1,
            title: "Best T-Shirt collection for your Style",
            subTitle: "T-shirts",
            image: "/src/assets/Banner/Tshirt_image.png"
        },
        {
            id: 2,
            title: "Best Sweatshirts collection for your Style",
            subTitle: "Sweatshirts",
            image: "/src/assets/Banner/Pullover_image.png"
        },
        {
            id: 3,
            title: "Best Caps collection for your Style",
            subTitle: "Caps",
            image: "/src/assets/Banner/Caps_image.png"
        },
        {
            id: 4,
            title: "Best Sonnenbrillen collection for your Style",
            subTitle: "Sonnenbrillen",
            image: "/src/assets/Banner/Sonnenbrille_image.png"
        },
        {
            id: 4,
            title: "Best Bottles collection for Hydration",
            subTitle: "Bottles",
            image: "/src/assets/Banner/Flasche_image.png"
        },
        {
            id: 4,
            title: "Model Cars for your Hobby",
            subTitle: "Model Cars",
            image: "/src/assets/Banner/banner_image.png"
        },
    ]

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    return (
        <div className="lg:container">
            <div className="slider-container slider_container w-full h-full">
                <Slider {...settings}>
                    {
                        products?.map((product) => (
                            <div key={product?.id} className="banner_slide_item">

                                {/* banner text  */}
                                <div className="banner_text">
                                    <p className="text-4xl font-inter text-[#272343] uppercase font-normal">{product?.subTitle}</p>
                                    <h3 className="text-4xl text-[#272343] font-inter capitalize leading-16 max-w-[px] w-full font-bold mb-5">{product?.title}</h3>
                                    <button className="max-w-[300px] w-full flex items-center justify-center gap-2 h-[100px] bg-[#029fae] rounded-lg capitalize text-white cursor-pointer text-2xl">shop now <MoveRight size={40} /></button>
                                </div>


                                {/* banner image  */}
                                <div className="banner_image w-[375px] h-[500px] flex items-center justify-end">
                                    <img src={product?.image} alt={product?.title} />
                                </div>

                            </div>
                        ))
                    }
                </Slider>
            </div>
        </div>
    );
};

export default Banner;