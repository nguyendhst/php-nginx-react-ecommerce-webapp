import React, {Component} from "react";
import Carousel from "react-bootstrap/Carousel";
import 'bootstrap/dist/css/bootstrap.min.css';

export default class FeaturedCarousel extends Component {
  render() {
    return (
      <Carousel pause="hover" className="bg-dark">
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://theme.hstatic.net/200000384841/1000740278/14/home_slider_image_3.jpg?v=1109"
            alt="First slide"
          />
          <Carousel.Caption>
            <h3>First slide label</h3>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://theme.hstatic.net/200000384841/1000740278/14/home_slider_image_2.jpg?v=1109"
            alt="Second slide"
          />
        </Carousel.Item>
      </Carousel>
    );
  }
}
