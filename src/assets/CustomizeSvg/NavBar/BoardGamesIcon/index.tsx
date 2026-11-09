import {FC} from "react";

import {NavBarIconProps} from "@gsu-ai/gsu-ui-core/dist/types/types/globalTypes";

import styles from "../index.module.css";

const BoardGamesIcon: FC<NavBarIconProps> = ({active}) => {
    return (
        <svg
            className={active ? styles.active : styles.default}
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <g clipPath="url(#clip0_6886_49897)">
                <path
                    d="M10.0013 8.33331H3.33464C2.41416 8.33331 1.66797 9.07951 1.66797 9.99998V16.6666C1.66797 17.5871 2.41416 18.3333 3.33464 18.3333H10.0013C10.9218 18.3333 11.668 17.5871 11.668 16.6666V9.99998C11.668 9.07951 10.9218 8.33331 10.0013 8.33331Z"
                    stroke="#909090"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M14.932 11.6667L17.8487 8.75C18.1579 8.40708 18.329 7.96173 18.329 7.5C18.329 7.03827 18.1579 6.59292 17.8487 6.25L13.682 2.15C13.3391 1.84081 12.8938 1.66968 12.432 1.66968C11.9703 1.66968 11.525 1.84081 11.182 2.15L8.33203 5"
                    stroke="#909090"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M5 15H5.00833"
                    stroke="#909090"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M8.33203 11.6667H8.34036"
                    stroke="#909090"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M12.5 5H12.5083"
                    stroke="#909090"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M15 7.5H15.0083"
                    stroke="#909090"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </g>
            <defs>
                <clipPath id="clip0_6886_49897">
                    <rect width="20" height="20" fill="white" />
                </clipPath>
            </defs>
        </svg>
    );
};
export default BoardGamesIcon;
