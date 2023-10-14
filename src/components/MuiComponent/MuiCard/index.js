import Image from "next/image";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.min.css";
import "swiper/css/navigation";
import { Autoplay, Navigation, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination";

const CardStepperImage = ({ images, key }) => {
    const [activeStep, setActiveStep] = React.useState(0);

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleStepChange = (step) => {
        setActiveStep(step);
    };

    return (<>
        <Swiper
            key={key}
            speed={1000}
            autoplay={{
                delay: 2500, disableOnInteraction: false,
            }}
            pagination={{
                clickable: true,
            }}
            navigation={true}
            modules={[Pagination, Navigation, Autoplay]}
            className="mySwiper"
        >
            {images?.map(image => <SwiperSlide  key={image?.key}>
                <Image
                    key={image?.key}
                    src={image?.src}
                    alt="Picture of the author"
                    width={image?.width || 360}
                    height={image?.height || 250}
                />
            </SwiperSlide>)}
        </Swiper>
    </>);
};

export default CardStepperImage;
