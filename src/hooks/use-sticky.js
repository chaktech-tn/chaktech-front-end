import { useEffect, useState } from "react";

const useSticky = () => {
    const [sticky, setSticky] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        
        const stickyHeader = () => {
            if (typeof window !== 'undefined' && window.scrollY > 80) {
                setSticky(true);
            } else {
                setSticky(false);
            }
        };

        // Set initial state
        stickyHeader();

        // Add scroll listener
        if (typeof window !== 'undefined') {
            window.addEventListener('scroll', stickyHeader);
        }

        return () => {
            if (typeof window !== 'undefined') {
                window.removeEventListener('scroll', stickyHeader);
            }
        };
    }, []);

    // Return false during SSR to prevent hydration mismatch
    return {
        sticky: mounted ? sticky : false,
    };
};

export default useSticky;