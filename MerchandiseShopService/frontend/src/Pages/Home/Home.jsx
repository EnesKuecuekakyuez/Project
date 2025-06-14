import Banner from "../../Components/Banner/Banner";
import Client from "../../Components/Client/Client";
import Features from "../../Components/Features/Features";
import Product from "../../Components/Product/Product";
import Recent from "../../Components/Recent/Recent";
import Delivery from './../../Components/Delivery/Delivery';

const Home = () => {
    return (
        <div>



            {/* banner component  */}
            <div className="w-full min-h-[850px] bg-[#f0f2f3] flex items-center justify-center rounded-b-3xl">

                <Banner></Banner>
            </div>

            {/* delivery component */}
            <div className="delivery_component w-full min-h-[#150px]">
                <Delivery></Delivery>
            </div>


            {/* Features component */}
            <div className="w-full flex items-center justify-center mb-[80px]">
                <Features></Features>
            </div>

           
            {/* product component  */}
            <div className="w-full flex items-center justify-center pb-[80px]">
                <Product></Product>
            </div>


            {/* client say component  */}
            <div className="w-full flex items-center justify-center bg-[#f0f2f3] min-h-[589px] pb-[80px] pt-[80px]">

                <Client></Client>

            </div>


            {/* Recent component  */}
            <div className="w-full flex items-center justify-center pb-[80px] pt-[80px]">
                <Recent></Recent>
            </div>

        </div>
    );
};

export default Home;