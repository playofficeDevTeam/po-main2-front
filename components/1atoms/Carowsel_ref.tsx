import styled from "styled-components";
import Slider, { Settings } from "react-slick";
import useIsMobile from "../hooks/useIsMobile";

const CustomCarousel: any = styled.div`
  width: 100%;
  & .slick-slider {
    height: 100%;
    & .slick-prev {
      z-index: 10;
      left: ${(props: { isMobile: boolean }) =>
        props.isMobile ? "1rem" : "-1rem"};
      padding-bottom: 1rem;
      &:before {
        font-size: ${(props: { isMobile: boolean }) =>
          props.isMobile ? "0" : "4rem"};
        font-family: "Font Awesome 5 Free";
        font-weight: 900;
        color: #cccccc;
        content: "\f053";
      }
    }
    & .slick-next {
      z-index: 10;
      right: ${(props: { isMobile: boolean }) =>
        props.isMobile ? "1rem" : "-0.2rem"};
      padding-bottom: 1rem;
      &:before {
        font-size: ${(props: { isMobile: boolean }) =>
          props.isMobile ? "0" : "4rem"};
        font-family: "Font Awesome 5 Free";
        font-weight: 900;
        color: #cccccc;
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

    & div:focus {
      outline: none;
    }
  }
`;

export default function App({ children }: any) {
  const isMobile = useIsMobile();

  const settings: Settings = isMobile
    ? {
        dots: true,
        infinite: true,
        fade: false,
        speed: 300,
        slidesToShow: 1,
        slidesToScroll: 1,
        centerMode: true,
        centerPadding: "30px",
      }
    : {
        dots: true,
        infinite: true,
        fade: false,
        speed: 300,
        slidesToShow: 1,
        slidesToScroll: 1,
      };
  return (
    <CustomCarousel isMobile={isMobile}>
      <Slider {...settings}>{children}</Slider>
    </CustomCarousel>
  );
}
