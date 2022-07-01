import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import first from "../assets/images/first.png";
import fren1 from "../assets/images/fren1.png";
import fren2 from "../assets/images/fren2.png";
import fren3 from "../assets/images/fren3.png";
import fren4 from "../assets/images/fren2.png";
import fren5 from "../assets/images/fren5.png";
import heart from "../assets/images/heart.png";

export default class VariableWidth extends Component {
  render() {
    const settings = {
      className: "slider variable-width",
      dots: true,
      infinite: true,
      centerMode: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      variableWidth: true,
    };
    return (
      <div>
        <h2>Variable width</h2>
        <Slider {...settings}>
          <div style={{ width: 420 }}>
            <p>420</p>
          </div>
          <div style={{ width: 300 }}>
            <p>300 1</p>
          </div>
          <div style={{ width: 300 }}>
            <p>300 2</p>
          </div>
          <div style={{ width: 300 }}>
            <p>300 3</p>
          </div>
          <div style={{ width: 425 }}>425</div>
          <div style={{ width: 425 }}>425</div>
        </Slider>
      </div>
    );
  }
}
