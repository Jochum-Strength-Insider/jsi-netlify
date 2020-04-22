import React from 'react';

import './style.css';

import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';

const StarRating = ({ onChange, rating, size, id }) => (
   <Col className="d-flex justify-content-center">
      {console.log("refresh", rating)}
      <Form.Group className="star_rating" xs={12} md={size}>
         <input type="radio" checked={rating === "5"} onChange={onChange} id={`${id}-star5`} name="rating" className="star" value="5" />
         <label htmlFor={`${id}-star5`} className="star" title="1 stars"></label>
         <input type="radio" checked={rating === "4"} onChange={onChange} id={`${id}-star4`} name="rating" className="star" value="4" />
         <label htmlFor={`${id}-star4`} className="star" title="4 stars"></label>
         <input type="radio" checked={rating === "3"} onChange={onChange} id={`${id}-star3`} name="rating" className="star" value="3" />
         <label htmlFor={`${id}-star3`} className="star" title="3 stars"></label>
         <input type="radio" checked={rating === "2"} onChange={onChange} id={`${id}-star2`} name="rating" className="star" value="2" />
         <label htmlFor={`${id}-star2`} className="star" title="2 stars"></label>
         <input type="radio" checked={rating === "1"} onChange={onChange} id={`${id}-star1`} name="rating" className="star" value="1" />
         <label htmlFor={`${id}-star1`} className="star" title="1 stars"></label>
      </Form.Group>
   </Col>
)



export default StarRating;