import styled from "styled-components";
import Slider, { Settings } from "react-slick";
import useIsMobile from "../hooks/useIsMobile";

const CustomCarousel: any = styled.div`
  width: 100%;
  padding: 0 0 2rem 0;
  & .slick-slider {
    height: 100%;
    & .slick-prev {
      z-index: 10;
      left: ${(props: { isMobile: boolean }) =>
        props.isMobile ? "0.1rem" : "-2.2rem"};
      padding-bottom: 1rem;
      &:before {
        font-size: 2rem;
        font-family: "Font Awesome 5 Free";
        font-weight: 600;
        color: #dddddd;
        content: "\f053";
      }
    }
    & .slick-next {
      z-index: 10;
      right: ${(props: { isMobile: boolean }) =>
        props.isMobile ? "0.1rem" : "-2.2rem"};
      padding-bottom: 1rem;
      &:before {
        font-size: 2rem;
        font-family: "Font Awesome 5 Free";
        font-weight: 600;
        color: #dddddd;
        content: "\f054";
      }
    }
    & .slick-dots {
      z-index: 10;
      bottom: -1.6rem;
      & button {
        &:before {
          color: black;
        }
      }
    }
    & & div:focus {
      outline: none;
    }
  }
`;

export default function App({ children = [<></>] }) {
  const isMobile = useIsMobile();

  const settings: Settings = {
    dots: true,
    infinite: true,
    fade: false,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    // lazyLoad: "ondemand",
  };
  return (
    <>
      <CustomCarousel isMobile={isMobile}>
        <Slider {...settings}>{children}</Slider>
      </CustomCarousel>
    </>
  );
}
