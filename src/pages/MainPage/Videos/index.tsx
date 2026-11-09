import {FC} from "react";

import {GsuMainPageBlock, GsuMainPageBlockContainer, GsuMainPageImages, GsuMainPageSteps} from "@gsu-ai/gsu-ui-core";

import {Block4Icon1, Block4Icon2, Block4Icon3} from "../../../assets/Icons";

const steps = [
    {
        Icon: Block4Icon1,
        title: "Пройдите короткий опрос:",
        description: " каждый вопрос подстраивается под ваши ответы",
    },
    {
        Icon: Block4Icon2,
        title: "Получите подборку:",
        description: " ИИ предложит 4 видео с описанием и ключевой информацией",
    },
    {
        Icon: Block4Icon3,
        title: "Выберите одно и откройте больше:",
        description: " канал, жанр, сюжет и интересные факты",
    },
];

const description =
    "Ищете видео для вдохновения или отдыха? Наш алгоритм подберёт подходящее видео под ваш вкус и настроение — интерактивно и персонально";

const Videos: FC = () => {
    const renderSteps = () => {
        return <GsuMainPageSteps steps={steps} btnText={"ВЫБРАТЬ ВИДЕО"} btnLink={"/videos"} />;
    };

    const renderImages = () => {
        return (
            <GsuMainPageImages
                image1Src={"/images/main-page-icons/videos/image-1.png"}
                image2Src={"/images/main-page-icons/videos/image-2.png"}
                image1Alt={"Videos"}
                image2Alt={"Videos"}
            />
        );
    };

    return (
        <GsuMainPageBlockContainer id={"videos"} description={description} title={"Видео"}>
            <GsuMainPageBlock
                imagesPosition={"left"}
                textBlock={renderSteps()}
                imagesBlock={renderImages()}
                btnText={"ВЫБРАТЬ ВИДЕО"}
                btnLink={"/videos"}
                type="steps"
            />
        </GsuMainPageBlockContainer>
    );
};

export default Videos;
