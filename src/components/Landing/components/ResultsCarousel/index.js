import React from 'react';

import Carousel from 'react-bootstrap/Carousel';

import results5 from "../../../../images/results5.jpg";
import results4 from "../../../../images/results4.jpg";
import results6 from "../../../../images/results6.jpg";
import results7 from "../../../../images/results7.jpg";
import results8 from "../../../../images/results8.jpg";
import results9 from "../../../../images/results9.jpg";
import results10 from "../../../../images/results10.jpg";
import results11 from "../../../../images/results11.jpg";
import results12 from "../../../../images/results12.jpg";

const results = [
  { image: results4 },
  { image: results5 },
  { image: results6 },
  { image: results7 },
  { image: results8 },
  { image: results9 },
  { image: results10 },
  { image: results11 },
  { image: results12 },
];

const ResultsCarousel = () => (
  <div className="d-flex justify-content-center align-items-center contain px-2">
    <div className="results-carousel">
      <Carousel className="mt-2">
        {results.map((result, index) => {
          return (
            <Carousel.Item key={index}>
              <div className="img-wrapper">
                <img
                  className="d-block w-100"
                  src={result.image}
                  alt={`slide number ${index}`}
                />
              </div>
            </Carousel.Item>
          )
        })}
      </Carousel>
    </div>
  </div>
);

export default ResultsCarousel;