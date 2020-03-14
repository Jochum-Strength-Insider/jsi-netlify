import React from 'react';
import Button from 'react-bootstrap/Button';
import { useAccordionToggle } from 'react-bootstrap/AccordionToggle';

const CustomToggle = ({ children, eventKey, variant, size }) => {
   const handleClicked = useAccordionToggle(eventKey);

   return (
      <Button
         variant={variant}
         type="button"
         onClick={handleClicked}
         size={size}
      >
         {children}
      </Button>
   );
}

export default CustomToggle;