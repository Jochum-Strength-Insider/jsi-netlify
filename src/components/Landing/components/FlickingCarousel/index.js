import React, { useRef } from 'react';

import './styles.css';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Flicking from "@egjs/react-flicking";

// import results4 from "../../../../images/results4.jpg";
// import results5 from "../../../../images/results5.jpg";
// import results6 from "../../../../images/results6.jpg";
// import results7 from "../../../../images/results7.jpg";
// import results8 from "../../../../images/results8.jpg";
// import results9 from "../../../../images/results9.jpg";
// import results10 from "../../../../images/results10.jpg";
// import results11 from "../../../../images/results11.jpg";
// import results12 from "../../../../images/results12.jpg";


import results1Before from "../../../../images/carousel/results-1-before.jpg";
import results1After from "../../../../images/carousel/results-1-after.jpg";
import results2Before from "../../../../images/carousel/results-2-before.jpg";
import results2After from "../../../../images/carousel/results-2-after.jpg";
import results3Before from "../../../../images/carousel/results-3-before.jpg";
import results3After from "../../../../images/carousel/results-3-after.jpg";
import results4Before from "../../../../images/carousel/results-4-before.jpg";
import results4After from "../../../../images/carousel/results-4-after.jpg";
import results4After2 from "../../../../images/carousel/results-4-after-2.jpg";
import results5Before from "../../../../images/carousel/results-5-before.jpg";
import results5After from "../../../../images/carousel/results-5-after.jpg";
import results5After2 from "../../../../images/carousel/results-5-after-back.jpg";
import results6After from "../../../../images/carousel/results-6-after.jpg";
import results6Before from "../../../../images/carousel/results-6-before.jpg";
import results6Before2 from "../../../../images/carousel/results-6-before-front.jpg";

const results = [
  { img: results1Before, alt: "Selfy photo of Jochum Strength trainee before training." },
  { img: results1After, alt: "Selfy photo of Jochum Strength trainee after training." },
  { img: results2Before, alt: "Selfy photo of Jochum Strength trainee before training." },
  { img: results2After, alt: "Selfy photo of Jochum Strength trainee after training." },
  { img: results3Before, alt: "Selfy photo of Jochum Strength trainee before training." },
  { img: results3After, alt: "Selfy photo of Jochum Strength trainee after training." },
  { img: results4Before, alt: "Selfy photo of Jochum Strength trainee before training." },
  { img: results4After, alt: "Selfy photo of Jochum Strength trainee after training." },
  { img: results4After2, alt: "Selfy photo of Jochum Strength trainee after training." },
  { img: results5Before, alt: "Selfy photo of Jochum Strength trainee before training." },
  { img: results5After, alt: "Selfy photo of Jochum Strength trainee after training." },
  { img: results5After2, alt: "Selfy photo of Jochum Strength trainee after training." },
  { img: results6After, alt: "Selfy photo of Jochum Strength trainee after training." },
  { img: results6Before, alt: "Selfy photo of Jochum Strength trainee before training." },
  { img: results6Before2, alt: "Selfy photo of Jochum Strength trainee before training." }
];


const PrevArrow = ({ onClick }) => <button className="carousel-control-prev" onClick={onClick}><span aria-hidden="true" className="carousel-control-prev-icon"></span><span className="sr-only">Previous</span></button>

const NextArrow = ({ onClick }) => <button className="carousel-control-next" onClick={onClick}><span aria-hidden="true" className="carousel-control-next-icon"></span><span className="sr-only">Next</span></button>

const FlickingCarousel = () => {
  // const [list, setList] = useState(results);
  const flickingRef = useRef(null);
  const next = () => {
    flickingRef.current.flicking.next();
  };
  const prev = () => {
    flickingRef.current.flicking.prev();
  };

  return (
    <div id="transformation" className="text-center">
      <Container>
        <Row>
          <Col md={12} className="transformation-title">
            <h2>Transformations</h2>
          </Col>
        </Row>
        <Row>
          <Col>
            <div style={{ position: "relative" }}>
              <PrevArrow onClick={prev} />
              <Flicking
                ref={flickingRef}
                className="flicking flicking1"
                gap={15}
                circular={true}
                moveType={{ type: "snap", count: 3 }}
                defaultIndex={3}
                autoResize={true}
              // overflow={true}
              // infinite={true}
              // infiniteThreshold={50}
              // onNeedPanel={() => {
              //   const end = list[list.length - 1] || 0;
              //   setList([...list, end + 1, end + 2]);
              // }}
              >
                {results.map((panel, idx) => {
                  return (
                    <CarouselImage key={idx} idx={idx} img={panel.img} alt={panel.alt} />
                  );
                })}
              </Flicking>
              <NextArrow onClick={next} />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  )
};

const CarouselImage = ({ idx, img, alt }) => {
  return (
    <Col xs={6} md={3} lg={2} className={`d-flex justify-content-center flick-${idx} px-0 mx-0`}>
      <div className="img-container">
        <img draggable="false" className="carousel-img" src={img} alt={alt} />
      </div>
    </Col>
  );
};

export default FlickingCarousel;