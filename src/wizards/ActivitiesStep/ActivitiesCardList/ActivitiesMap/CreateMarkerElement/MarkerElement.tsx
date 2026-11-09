import cn from "classnames/dedupe";

import mapboxgl from "mapbox-gl";

import {FC, useEffect, useState} from "react";

import {IActivity} from "../../../../../api/interfaces";

import styles from "./index.module.css";

interface IMarkerElement {
    activity: IActivity;
    index: number;
    selectedMarker: IActivity | null;
    popup: mapboxgl.Popup;
}

const MarkerElement: FC<IMarkerElement> = ({activity, index, selectedMarker, popup}) => {
    const [popupIsOpen, setPopupIsOpen] = useState(true);

    const isActive = activity === selectedMarker;

    const handleOpen = () => setPopupIsOpen(true);
    const handleClose = () => setPopupIsOpen(false);

    useEffect(() => {
        popup.on("open", handleOpen);
        popup.on("close", handleClose);

        return () => {
            popup.off("open", handleOpen);
            popup.off("close", handleClose);
        };
    }, [popup]);

    return (
        <>
            <div
                className={cn(styles.marker, {
                    [styles.active]: isActive && popupIsOpen,
                    [styles.activeClose]: isActive && !popupIsOpen,
                })}
                data-number={index.toString()}
            >
                <div className={styles.markerCenter}></div>
            </div>
            {((isActive && !popupIsOpen) || !isActive) && (
                <p
                    className={cn(styles.markerTitle, {
                        [styles.active]: isActive && !popupIsOpen,
                    })}
                >
                    {activity.name}
                </p>
            )}
        </>
    );
};

export default MarkerElement;
