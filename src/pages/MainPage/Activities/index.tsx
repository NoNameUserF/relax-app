import {FC} from "react";
import {
    GsuMainPageBlock,
    GsuMainPageBlockContainer,
    GsuMainPageDescription,
    GsuMainPageImages,
} from "@gsu-ai/gsu-ui-core";

const textParts = [
    {
        text: "Ищете идеи для отдыха? Наш сервис подберёт",
        highlighted: false,
    },
    {
        text: " лучшие активности ",
        highlighted: true,
    },
    {
        text: "и места под ваш ритм и настроение. Достаточно указать город и предпочтения — и вы получите 4 варианта с описанием и полезной информацией.",
        highlighted: false,
    },
    {
        text: " Находить ",
        highlighted: false,
    },
    {
        text: "интересные места ",
        highlighted: true,
    },
    {
        text: "ещё никогда не было так легко",
        highlighted: false,
    },
];

const Activities: FC = () => {
    const renderTextBlock = () => {
        return <GsuMainPageDescription textParts={textParts} btnText={"ВЫБРАТЬ АКТИВНОСТИ"} btnLink={"/activities"} />;
    };

    const renderImagesBlock = () => {
        return (
            <GsuMainPageImages
                image1Src={"/images/main-page-icons/activities/image1.jpg"}
                image2Src={"/images/main-page-icons/activities/image2.jpg"}
                image1Alt={"Activities"}
                image2Alt={"Activities"}
            />
        );
    };

    return (
        <GsuMainPageBlockContainer id={"activities"} title={"Активности"}>
            <GsuMainPageBlock
                textBlock={renderTextBlock()}
                imagesBlock={renderImagesBlock()}
                imagesPosition="left"
                btnLink={"/activities"}
                btnText={"ВЫБРАТЬ АКТИВНОСТИ"}
            />
        </GsuMainPageBlockContainer>
    );
};

export default Activities;
