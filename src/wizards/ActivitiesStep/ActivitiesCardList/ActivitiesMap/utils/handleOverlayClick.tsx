import React from "react";

interface createOverlayClickProps {
    e: React.MouseEvent;
    styles: {
        wrapperClass: string;
        expandedMapClass: string;
    };
    activeElementToggler: string;
    setActiveElementToggler: (value: string) => void;
}

const createOverlayClick = ({e, styles, activeElementToggler, setActiveElementToggler}: createOverlayClickProps) => {
    const target = e.target as HTMLElement;
    const isWrapper = target.classList.contains(styles.wrapperClass) && !target.closest(`.${styles.expandedMapClass}`);
    if (isWrapper && activeElementToggler === "MAP") {
        setActiveElementToggler("ACTIVITIES");
    }
};
export default createOverlayClick;
