import styled from "styled-components";
import Slider, { Settings } from "react-slick";
import useIsMobile from "../../../hooks/useIsMobile";

const CustomCarousel = styled.div`
  width: 100%;
  & .slick-slider {
    height: 100%;
    & .slick-prev {
      z-index: 10;
      left: 1rem;
      padding-bottom: 1rem;
      &:before {
        font-size: 0rem;
        font-family: "Font Awesome 5 Free";
        font-weight: 900;
        color: grey;
        content: "\f053";
      }
    }
    & .slick-next {
      z-index: 10;
      right: 1rem;
      padding-bottom: 1rem;
      &:before {
        font-size: 0rem;
        font-family: "Font Awesome 5 Free";
        font-weight: 900;
        color: grey;
        content: "\f054";
      }
    }
    & .slick-dots {
      z-index: 10;
      bottom: -2.4rem;
      & button {
        &:before {
          color: #ea580c;
        }
      }
    }

    & div:focus {
      outline: none;
    }
  }
`;

const defaultData = [<div>1</div>, <div>2</div>, <div>3</div>];

const App = ({ children = defaultData }: any) => {
  const isMobile = useIsMobile();

  const settings: Settings = isMobile
    ? // 모바일
      // 모바일
      // 모바일
      {
        dots: false,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        speed: 2000,
        autoplaySpeed: 4000,
        draggable: false,
        swipe: false,
        pauseOnHover: false,
        className: "center",
        centerMode: true,
        centerPadding: "60px",
        lazyLoad: "ondemand",
      }
    : //   피씨
      //   피씨
      //   피씨
      {
        dots: false,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        speed: 2000,
        autoplaySpeed: 4000,
        draggable: false,
        pauseOnHover: false,
        lazyLoad: "ondemand",
      };
  return (
    <CustomCarousel>
      <Slider {...settings}>
        {children.map((val, idx) => (
          <div>{val}</div>
        ))}
      </Slider>
    </CustomCarousel>
  );
};

export default App;
