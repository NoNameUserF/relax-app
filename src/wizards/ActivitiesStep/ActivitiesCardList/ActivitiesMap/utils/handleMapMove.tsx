import React from "react";
import mapboxgl from "mapbox-gl";

import {IActivity} from "../../../../../api/interfaces";

interface IHandleMapMove {
    currentPopupRef: React.MutableRefObject<mapboxgl.Popup | null>;
    isUserEventRef: React.MutableRefObject<boolean>;
    onMarkerClick: (activity: IActivity | null) => void;
}

const handleMapMove = ({currentPopupRef, isUserEventRef, onMarkerClick}: IHandleMapMove) => {
    return () => {
        if (isUserEventRef.current && currentPopupRef.current) {
            currentPopupRef.current.remove();
            currentPopupRef.current = null;

            onMarkerClick(null);
        }
    };
};
export default handleMapMove;
