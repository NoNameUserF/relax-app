import mapboxgl from "mapbox-gl";

import React from "react";

import {IActivity} from "../../../../../api/interfaces";

import {IMarkersAndPopups} from "./createMarkers";

interface focusOnMarkerProps {
    selectedMarker: IActivity | null;
    map?: mapboxgl.Map | null;
    points: IActivity[];
    markersAndPopups: IMarkersAndPopups;
    currentPopupRef: React.MutableRefObject<mapboxgl.Popup | null>;
    isUserEventRef: React.MutableRefObject<boolean>;
}

const flyTo = (map: mapboxgl.Map | null, target: mapboxgl.LngLatLike, speed = 1.2, curve = 1, zoom?: number) => {
    if (!map) return;

    const viewportHeight = window.innerHeight;
    zoom = zoom ?? map.getZoom();

    map.flyTo({
        center: target,
        essential: true,
        zoom,
        speed,
        curve,
        offset: [0, -viewportHeight / 3], // при нажатии на маркер, маркер окажется в верхней части экрана
    });
};

const focusOnMarker = ({
    selectedMarker,
    map,
    points,
    markersAndPopups,
    currentPopupRef,
    isUserEventRef,
}: focusOnMarkerProps) => {
    if (!selectedMarker || !map || points == null) return;

    const {latitude, longitude} = selectedMarker;
    const lngLat = [longitude, latitude] as [number, number];
    const id: number = +selectedMarker.longitude + +selectedMarker.latitude;

    const activeMarkerAndPopup = markersAndPopups[id];
    if (activeMarkerAndPopup) {
        if (currentPopupRef.current) {
            currentPopupRef.current.remove();
        }
        activeMarkerAndPopup.marker.togglePopup();
        currentPopupRef.current = activeMarkerAndPopup.popup;
    }

    isUserEventRef.current = false;
    flyTo(map, lngLat, 1.2, 1.8);
    map.once("moveend", () => (isUserEventRef.current = true));
};

export default focusOnMarker;
