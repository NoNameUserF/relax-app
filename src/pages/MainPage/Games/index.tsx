import {FC} from "react";
import {
    GsuMainPageBlock,
    GsuMainPageBlockContainer,
    GsuMainPageDescription,
    GsuMainPageImages,
} from "@gsu-ai/gsu-ui-core";

const textParts = [
    {
        text: "Не знаете, во что поиграть? Наша платформа",
        highlighted: false,
    },
    {
        text: " подберёт игру ",
        highlighted: true,
    },
    {
        text: "под ваш вкус. Больше никаких бесконечных обзоров: вы сразу получите четыре",
        highlighted: false,
    },
    {
        text: " подходящих варианта ",
        highlighted: true,
    },
    {
        text: "с описанием и ключевой информацией. Открывать",
        highlighted: false,
    },
    {
        text: " новые игровые миры ",
        highlighted: true,
    },
    {
        text: "ещё никогда не было так просто и увлекательно",
        highlighted: false,
    },
];

const Games: FC = () => {
    const renderTextBlock = () => {
        return <GsuMainPageDescription textParts={textParts} btnText={"ВЫБРАТЬ ИГРУ"} btnLink={"/video-games"} />;
    };

    const renderImagesBlock = () => {
        return (
            <GsuMainPageImages
                image1Src={"/images/main-page-icons/games/block4-image1.jpg"}
                image2Src={"/images/main-page-icons/games/block4-image2.jpg"}
                image1Alt={"Games"}
                image2Alt={"Games"}
            />
        );
    };

    return (
        <GsuMainPageBlockContainer id={"games"} title={"Компьютерные игры"}>
            <GsuMainPageBlock
                textBlock={renderTextBlock()}
                imagesBlock={renderImagesBlock()}
                imagesPosition="right"
                btnLink={"/video-games"}
                btnText={"ВЫБРАТЬ ИГРУ"}
            />
        </GsuMainPageBlockContainer>
    );
};

export default Games;
