import {FC} from "react";

import {GsuMainPageBlock, GsuMainPageBlockContainer, GsuMainPageImages, GsuMainPageSteps} from "@gsu-ai/gsu-ui-core";

import {Block3Icon1, Block3Icon2, Block3Icon3} from "../../../assets/Icons";

const steps = [
    {
        Icon: Block3Icon1,
        title: "Укажите параметры:",
        description: " взрослые или дети, жанр, формат, тема и настроение",
    },
    {
        Icon: Block3Icon2,
        title: "Получите подборку:",
        description: " ИИ предложит 4 варианта с кратким описанием и основной информацией",
    },
    {
        Icon: Block3Icon3,
        title: "Выберите один и узнайте больше:",
        description: " сюжет, актёры и интересные факты",
    },
];

const description =
    "Наш сервис с ИИ подберёт фильм, мультфильм или сериал под ваш вкус и настроение — " +
    "без бесконечных списков и долгих поисков";

const Movie: FC = () => {
    const renderSteps = () => {
        return <GsuMainPageSteps steps={steps} btnText={"ВПЕРЕД!"} btnLink={"/movies"} />;
    };

    const renderImages = () => {
        return (
            <GsuMainPageImages
                image1Src={"/images/main-page-icons/movies/image1.jpg"}
                image2Src={"/images/main-page-icons/movies/image2.jpg"}
                image1Alt={"Movies"}
                image2Alt={"Movies"}
            />
        );
    };

    return (
        <GsuMainPageBlockContainer
            id={"movies"}
            background={"primary"}
            description={description}
            title={"Кино и анимация"}
        >
            <GsuMainPageBlock
                imagesPosition={"right"}
                textBlock={renderSteps()}
                imagesBlock={renderImages()}
                btnText={"ВПЕРЕД!"}
                btnLink={"/movies"}
                type="steps"
            />
        </GsuMainPageBlockContainer>
    );
};

export default Movie;
