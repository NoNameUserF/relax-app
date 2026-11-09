import {FC} from "react";

import {NavBarIconProps} from "@gsu-ai/gsu-ui-core/dist/types/types/globalTypes";

import styles from "../index.module.css";

const GamesIcon: FC<NavBarIconProps> = ({active}) => {
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
                d="M5 9.16669H8.33333"
                stroke="#909090"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M6.66797 7.5V10.8333"
                stroke="#909090"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M12.5 10H12.5083"
                stroke="#909090"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M15 8.33331H15.0083"
                stroke="#909090"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M14.4346 4.16669H5.56797C4.7432 4.16688 3.94779 4.47283 3.3355 5.02541C2.7232 5.57798 2.33751 6.33793 2.25297 7.15835C2.24797 7.20169 2.24464 7.24252 2.2388 7.28502C2.1713 7.84669 1.66797 12.0467 1.66797 13.3334C1.66797 13.9964 1.93136 14.6323 2.4002 15.1011C2.86904 15.57 3.50493 15.8334 4.16797 15.8334C5.0013 15.8334 5.41797 15.4167 5.83464 15L7.01297 13.8217C7.32546 13.5091 7.74931 13.3334 8.1913 13.3334H11.8113C12.2533 13.3334 12.6771 13.5091 12.9896 13.8217L14.168 15C14.5846 15.4167 15.0013 15.8334 15.8346 15.8334C16.4977 15.8334 17.1336 15.57 17.6024 15.1011C18.0712 14.6323 18.3346 13.9964 18.3346 13.3334C18.3346 12.0459 17.8313 7.84669 17.7638 7.28502C17.758 7.24335 17.7546 7.20169 17.7496 7.15919C17.6653 6.33861 17.2797 5.57846 16.6674 5.02572C16.0551 4.47297 15.2595 4.1669 14.4346 4.16669Z"
                stroke="#909090"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};

export default GamesIcon;
