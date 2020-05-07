import { useState, useRef, useEffect } from 'react';
import throttle from 'lodash.throttle';

const useResizeWindow = (width) => {
   const [isMobile, setIsMobile] = useState(window.innerWidth < width);
   // const [screenSize, setScreenSize] = useState(window.innerWidth)

   const resize = () => {
      setIsMobile(window.innerWidth < width)
      // setScreenSize(window.innerWidth);
   }

   const throttled = useRef(throttle(resize, 200))

   useEffect(() => {
      // const throttledHandleWindowResize = () => {
      //    return throttled.current;
      // }
      const throttledRef = throttled.current;
      window.addEventListener('resize', throttledRef);
      return () => window.removeEventListener('resize', throttledRef);
   }, []);

   return isMobile
}

export default useResizeWindow;