import mapboxgl from "mapbox-gl";
import {createRoot} from "react-dom/client";

import React from "react";

import MarkerElement from "../CreateMarkerElement/MarkerElement";
import styles from "../CreateMarkerElement/index.module.css";
import {IActivity} from "../../../../../api/interfaces";
import ActivitiesCard from "../../ActivitiesCard";

interface markerCoordinates {
    latitude: number;
    longitude: number;
}

interface createMarkersProps {
    map: mapboxgl.Map;
    coordinates: markerCoordinates[];
    points: IActivity[];
    onMarkerClick: (activity: IActivity | null) => void;
    nextClickHandler: () => void;
    currentPopupRef: React.MutableRefObject<mapboxgl.Popup | null>;
    selectedMarker: IActivity | null;
    city: string | undefined;
}

interface drowMarkerElementOnMapProps {
    markerContainer: HTMLDivElement;
    coord: {latitude: number; longitude: number};
    map: mapboxgl.Map;
}

interface createPopupCardProps {
    activity: IActivity;
    popup: mapboxgl.Popup;
    popupContainer: HTMLDivElement;
    nextClickHandler: () => void;
    city: string | undefined;
}

interface drowPopupOnMapProps {
    marker: mapboxgl.Marker;
    popupContainer: HTMLDivElement;
}

interface HandleMarkerClickParams {
    e: MouseEvent;
    marker: mapboxgl.Marker;
    popup: mapboxgl.Popup;
    currentPopupRef: React.MutableRefObject<mapboxgl.Popup | null>;
    activity: IActivity;
    onMarkerClick: (activity: IActivity | null) => void;
}

export const handleMarkerClick = ({
    e,
    marker,
    popup,
    currentPopupRef,
    activity,
    onMarkerClick,
}: HandleMarkerClickParams) => {
    if (currentPopupRef.current) {
        currentPopupRef.current.remove();
    }
    marker.togglePopup();

    e.stopPropagation();
    onMarkerClick(activity);

    return popup;
};

export interface IMarkersAndPopups {
    [id: string]: {
        marker: mapboxgl.Marker;
        popup: mapboxgl.Popup;
    };
}

const drowMarkerContainerOnMap = ({markerContainer, coord, map}: drowMarkerElementOnMapProps): mapboxgl.Marker => {
    return new mapboxgl.Marker({
        element: markerContainer,
        anchor: "left",
        offset: [-20, 0],
    })
        .setLngLat([coord.longitude, coord.latitude])
        .addTo(map);
};

const drowMarkerElementOnMarkerContainer = (
    activity: IActivity,
    index: number,
    markerContainer: HTMLDivElement,
    selectedMarker: IActivity | null,
    popup: mapboxgl.Popup,
) => {
    const root = createRoot(markerContainer);
    root.render(
        <MarkerElement activity={activity} index={index} selectedMarker={selectedMarker} popup={popup} key={index} />,
    );
};

const createPopupCard = ({activity, popup, popupContainer, nextClickHandler, city}: createPopupCardProps) => {
    const root = createRoot(popupContainer);

    root.render(
        <ActivitiesCard
            card={activity}
            isMap={true}
            clickCloseButton={() => popup.remove()}
            nextClickHandler={nextClickHandler}
            city={city}
        />,
    );
};

const drowPopupOnMap = ({marker, popupContainer}: drowPopupOnMapProps): mapboxgl.Popup => {
    const popup = new mapboxgl.Popup({
        offset: 32,
        closeButton: false,
        closeOnClick: true,
    }).setDOMContent(popupContainer);

    marker.setPopup(popup);

    return popup;
};

const removeOldMarkers = (queryClass: string) => {
    const containers = document.querySelectorAll(`.${queryClass}`);
    const hasMarkers = containers.length > 0;

    if (hasMarkers) {
        containers.forEach((markerElement) => markerElement.remove());
    }
};

const createMarkers = ({
    map,
    coordinates,
    points,
    onMarkerClick,
    nextClickHandler,
    currentPopupRef,
    selectedMarker,
    city,
}: createMarkersProps) => {
    removeOldMarkers(`${styles.markerContainer}`);
    const markersAndPopups: IMarkersAndPopups = {};
    coordinates.forEach((coord, i) => {
        const activity = points[i];
        const popupContainer = document.createElement("div");
        const markerContainer = document.createElement("div");
        const id: number = +activity.longitude + +activity.latitude;
        markerContainer.classList.add(styles.markerContainer);

        const marker = drowMarkerContainerOnMap({markerContainer, coord, map}); // Инициализируем маркер на карте с пустым контейнером

        const popup = drowPopupOnMap({marker, popupContainer});

        drowMarkerElementOnMarkerContainer(activity, i, markerContainer, selectedMarker, popup); // Добавляем в markerContainer компонент MarkerElement

        createPopupCard({activity, popup, popupContainer, nextClickHandler, city});

        markerContainer.addEventListener("click", (e) => {
            currentPopupRef.current = handleMarkerClick({
                e,
                marker,
                popup,
                currentPopupRef,
                activity,
                onMarkerClick,
            });
        });
        markersAndPopups[id] = {marker, popup};
    });
    return markersAndPopups;
};

export default createMarkers;
