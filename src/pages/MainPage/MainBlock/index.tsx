import {FC} from "react";

import {GsuMainPageMainBlock} from "@gsu-ai/gsu-ui-core";

import styles from "./index.module.css";

const mainPageAnchors = [
    {label: "Кино и анимация", anchor: "#movies"},
    {label: "Компьютерные игры", anchor: "#games"},
    {label: "Настольные игры", anchor: "#board-games"},
    {label: "Видео", anchor: "#videos"},
    {label: "Книги", anchor: "#books"},
    {label: "Активности", anchor: "#activities"},
];

const MainBlock: FC = () => {
    return (
        <GsuMainPageMainBlock
            mainPageAnchors={mainPageAnchors}
            appName={"Relax AI"}
            appNameGradientClass={styles.gradientMain}
            title={"ваш досуг — наша идея"}
            description={
                "Поделитесь своим настроением — и мы превратим его в идеи для отдыха, созданные специально для вас"
            }
            btnName={"ВПЕРЕД!"}
            btnLink={"/movies"}
            imgSrc={"/images/main-page-icons/head-section-bg.webp"}
        />
    );
};

export default MainBlock;
