import React, { useRef } from 'react';
import "./style.css";
// import Button from 'react-bootstrap/Button';
import { useAccordionToggle } from 'react-bootstrap/AccordionToggle';

// const CustomToggle = ({ onClick, children, eventKey, variant, size }) => {
//    const handleClicked = useAccordionToggle(eventKey, onClick);

//    return (
//       <Button
//          variant={variant}
//          type="button"
//          onClick={handleClicked}
//          size={size}
//       >
//          {children}
//       </Button>
//    );
// }

const CustomToggle = ({ onClick, children, eventKey }) => {
   const scrollToRef = useRef(null);
   const scrollAndClick = () => {
      scrollToRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      return onClick;
   }
   const handleClicked = useAccordionToggle(eventKey, scrollAndClick);

   return (
      <div
         onClick={handleClicked}
         onKeyPress={handleClicked}
         role="button"
         tabIndex="0"
         className="customToggle"
         ref={scrollToRef}
      >
         {children}
      </div>
   );
}

export default CustomToggle;