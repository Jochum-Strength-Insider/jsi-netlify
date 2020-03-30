import React, { useState } from 'react';
import Button from 'react-bootstrap/Button'

const HoverButton = ({ variant, text, hoveredText, onClick }) => {
   const [hovered, setHovered] = useState(false);
   const onMouseEnter = () => setHovered(true);
   const onMouseLeave = () => setHovered(false);
   const style = { width: "6rem" };

   return (
      <Button style={style} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} variant={variant} onClick={onClick}>
         {hovered ? hoveredText : text}
      </Button>
   )
}
export default HoverButton