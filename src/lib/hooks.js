import {useEffect, useState} from 'react';

export const useOnClickOutside = (ref, handler) => {
    useEffect(() => {
       const listener = event => {
           if (!ref.current || ref.current.contains(event.target)) {
               return;
           }
           handler(event);
       };
       document.addEventListener('mousedown', listener, {passive: true});
       document.addEventListener('touchstart', listener, {passive: true});
       return () => {
           document.removeEventListener('mousedown', listener);
           document.removeEventListener('touchstart', listener);
       }
    },
    [ref, handler],
    );
}

export const useWindowSize = () => {
    const [ windowSize, setWindowSize ] = useState({
        width: undefined,
        height: undefined,
    });

    useEffect(() => {
        function handleResize() {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        }

        window.addEventListener("resize", handleResize, {passive: true});

        handleResize();

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return windowSize;
}
