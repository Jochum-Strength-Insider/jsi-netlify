import React from 'react';
import Button from 'react-bootstrap/Button';
import { useAccordionToggle } from 'react-bootstrap/AccordionToggle';

const CustomToggle = ({ children, eventKey }) => {
   const decoratedOnClick = useAccordionToggle(eventKey);

   return (
      <Button
         variant="link"
         type="button"
         onClick={decoratedOnClick}
         size="lg"
      >
         {children}
      </Button>
   );
}

export default CustomToggle;