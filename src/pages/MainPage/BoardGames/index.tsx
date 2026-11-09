import {FC} from "react";
import {
    GsuMainPageBlock,
    GsuMainPageBlockContainer,
    GsuMainPageDescription,
    GsuMainPageImages,
} from "@gsu-ai/gsu-ui-core";

const textParts = [
    {
        text: "Хотите",
        highlighted: false,
    },
    {
        text: " провести вечер ",
        highlighted: true,
    },
    {
        text: "с друзьями или семьёй? Наш ИИ подберёт настольную игру под вашу компанию. Вместо долгих поисков вы сразу получите четыре подходящих варианта с описанием и ключевой информацией. ",
        highlighted: false,
    },
    {
        text: "Выбирать игру ",
        highlighted: true,
    },
    {
        text: "для уютного вечера ещё никогда не было",
        highlighted: false,
    },
    {
        text: " так просто ",
        highlighted: true,
    },
];

const BoardGames: FC = () => {
    const renderTextBlock = () => {
        return <GsuMainPageDescription textParts={textParts} btnText={"ВЫБРАТЬ ИГРУ"} btnLink={"/board-games"} />;
    };

    const renderImagesBlock = () => {
        return (
            <GsuMainPageImages
                image1Src={"/images/main-page-icons/board-games/block5-image1.jpg"}
                image2Src={"/images/main-page-icons/board-games/block5-image2.jpg"}
                image1Alt={"BoardGames"}
                image2Alt={"BoardGames"}
            />
        );
    };

    return (
        <GsuMainPageBlockContainer id={"board-games"} background={"gray"} title={"Настольные игры"}>
            <GsuMainPageBlock
                textBlock={renderTextBlock()}
                imagesBlock={renderImagesBlock()}
                imagesPosition="left"
                btnLink={"/board-games"}
                btnText={"ВЫБРАТЬ ИГРУ"}
            />
        </GsuMainPageBlockContainer>
    );
};

export default BoardGames;
