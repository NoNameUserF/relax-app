import React, {FC, useEffect, useRef} from "react";
import "mapbox-gl/dist/mapbox-gl.css";

import mapboxgl from "mapbox-gl";

import {CloseMapIcon} from "../../../../assets/Icons";

import {IActivity} from "../../../../api/interfaces";

import GsuZoomControl from "./GsuZoomControl/GsuZoomControl";
import {drawMap, removeMap} from "./utils/drawMap";
import addKeyDownListener from "./utils/addKeyDownListener";
import focusOnMarker from "./utils/focusOnMarker";
import updateMapBounds from "./utils/updateMapBounds";
import createOverlayClick from "./utils/handleOverlayClick";

import "./mapBox.css";
import styles from "./index.module.css";
import createMarkers from "./utils/createMarkers";
import handleMapMove from "./utils/handleMapMove";
import seeAllMarkersOnMap from "./utils/seeAllMarkersOnMap";

export interface MapState {
    points: IActivity[];
    onMarkerClick: (activity: IActivity | null) => void;
    selectedMarker: IActivity | null;
    activeElementToggler: string;
    setActiveElementToggler: (activeElementToggler: string) => void;
    nextClickHandler: () => void;
    city: string | undefined;
}

const ActivitiesMap: FC<MapState> = ({
    points,
    selectedMarker,
    activeElementToggler,
    setActiveElementToggler,
    onMarkerClick,
    nextClickHandler,
    city,
}) => {
    const mapContainerRef = useRef<HTMLDivElement>(null);
    const mapRef = useRef<mapboxgl.Map | null>(null);
    const currentPopupRef = useRef<mapboxgl.Popup | null>(null);
    const pointsRef = useRef(points);
    const boundsRef = useRef<mapboxgl.LngLatBounds | null>(null);
    const isUserEventRef = useRef<boolean>(true);
    const originalViewRef = useRef({
        center: [0, 0] as [number, number],
        zoom: 10,
    });

    const coordinatesRef = useRef(
        points.map((point) => ({
            latitude: point.latitude,
            longitude: point.longitude,
        })),
    );

    const closeMap = () => {
        setActiveElementToggler("ACTIVITIES");
        onMarkerClick(null);
    };
    const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape" && activeElementToggler === "MAP") {
            closeMap();
        }
    };

    const handleOverlayClick = (e: React.MouseEvent) => {
        createOverlayClick({
            e,
            styles: {
                wrapperClass: styles.wrapper,
                expandedMapClass: styles.expandedMap,
            },
            activeElementToggler,
            setActiveElementToggler,
        });
    };

    const handlerZoomIn = () => {
        mapRef.current?.zoomIn();
    };

    const handlerZoomOut = () => {
        mapRef.current?.zoomOut();
    };

    useEffect(() => {
        const center = boundsRef.current?.getCenter();

        if (center) {
            originalViewRef.current.center = [center.lng, center.lat];
        }

        mapRef.current = drawMap(
            mapContainerRef.current,
            originalViewRef.current.center,
            originalViewRef.current.zoom,
            "ru",
        );

        const interactionHandler = handleMapMove({currentPopupRef, isUserEventRef, onMarkerClick});

        mapRef.current?.on("movestart", interactionHandler);
        mapRef.current?.on("zoomstart", interactionHandler);

        return () => {
            removeMap(mapRef.current);
            mapRef.current?.off("movestart", interactionHandler);
            mapRef.current?.off("zoomstart", interactionHandler);
        };
    }, []);

    useEffect(() => addKeyDownListener(handleKeyDown), [activeElementToggler]);

    useEffect(() => {
        boundsRef.current = updateMapBounds(coordinatesRef.current);

        if (boundsRef.current) {
            seeAllMarkersOnMap(mapRef.current, boundsRef.current);
        }
    }, [points]);

    useEffect(() => {
        const map = mapRef.current;
        const coordinates = coordinatesRef.current;

        if (map) {
            const markersAndPopups = createMarkers({
                map,
                coordinates,
                points,
                onMarkerClick,
                nextClickHandler,
                currentPopupRef,
                selectedMarker,
                city,
            });
            focusOnMarker({
                selectedMarker,
                map,
                points: pointsRef.current,
                markersAndPopups,
                currentPopupRef,
                isUserEventRef,
            });
        }
    }, [selectedMarker, points]);

    return (
        <div className={styles.wrapper} onClick={handleOverlayClick} role="button">
            <div
                ref={mapContainerRef}
                className={styles.expandedMap}
                onClick={(e) => e.stopPropagation()}
                role="dialog"
            >
                <GsuZoomControl onClickZoomIn={handlerZoomIn} onClickZoomOut={handlerZoomOut} />
                <button onClick={closeMap} className={styles.expandButton}>
                    <CloseMapIcon />
                </button>
            </div>
        </div>
    );
};

export default ActivitiesMap;
