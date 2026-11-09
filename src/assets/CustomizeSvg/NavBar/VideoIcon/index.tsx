import {FC} from "react";

import {NavBarIconProps} from "@gsu-ai/gsu-ui-core/dist/types/types/globalTypes";

import styles from "../index.module.css";

const VideoIcon: FC<NavBarIconProps> = ({active}) => {
    return (
        <svg
            className={active ? styles.active : styles.default}
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M15.8333 2.5H4.16667C3.24619 2.5 2.5 3.24619 2.5 4.16667V15.8333C2.5 16.7538 3.24619 17.5 4.16667 17.5H15.8333C16.7538 17.5 17.5 16.7538 17.5 15.8333V4.16667C17.5 3.24619 16.7538 2.5 15.8333 2.5Z"
                stroke="#909090"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M7.50001 7.50186C7.49956 7.35398 7.53848 7.20863 7.61277 7.08075C7.68705 6.95288 7.79403 6.84707 7.92272 6.7742C8.05141 6.70133 8.19718 6.66402 8.34505 6.6661C8.49293 6.66818 8.63758 6.70957 8.76417 6.78603L12.9283 9.28353C13.0523 9.35742 13.155 9.46224 13.2263 9.58772C13.2975 9.7132 13.335 9.85504 13.335 9.99936C13.335 10.1437 13.2975 10.2855 13.2263 10.411C13.155 10.5365 13.0523 10.6413 12.9283 10.7152L8.76417 13.2127C8.63752 13.2892 8.49279 13.3306 8.34484 13.3326C8.1969 13.3347 8.05107 13.2973 7.92236 13.2243C7.79364 13.1514 7.68667 13.0454 7.61245 12.9174C7.53822 12.7894 7.49941 12.644 7.50001 12.496V7.50186Z"
                stroke="#909090"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};

export default VideoIcon;
