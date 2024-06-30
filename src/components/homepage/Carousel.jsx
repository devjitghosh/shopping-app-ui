import React from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import slide1 from "../../assets/carousel/slide1.webp";
import slide2 from "../../assets/carousel/slide2.webp";
import slide3 from "../../assets/carousel/slide3.webp";
import slide4 from "../../assets/carousel/slide4.webp";
import "./Carousel.css";

export function Carousel() {
  const [emblaRef] = useEmblaCarousel({ loop: true }, [Autoplay()]);

  return (
    <div className="embla" ref={emblaRef}>
      <div className="embla__container">
        <div className="embla__slide">
          <img src={slide1} />
        </div>
        <div className="embla__slide">
          <img src={slide2} />
        </div>
        <div className="embla__slide">
          <img src={slide3} />
        </div>
        <div className="embla__slide">
          <img src={slide4} />
        </div>
      </div>
    </div>
  );
}

export default Carousel;
