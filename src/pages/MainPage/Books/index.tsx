import {FC} from "react";

import {GsuMainPageBlock, GsuMainPageBlockContainer, GsuMainPageImages, GsuMainPageSteps} from "@gsu-ai/gsu-ui-core";

import {Block5BookInfo, Block5Library, Block5Survey} from "../../../assets/Icons";

const steps = [
    {
        Icon: Block5Survey,
        title: "Пройдите короткий опрос:",
        description: " каждый вопрос подстраивается под ваш предыдущий ответ",
    },
    {
        Icon: Block5Library,
        title: "Получите подборку:",
        description: " ИИ предложит подборку из 4 книг с кратким описанием и основной информацией",
    },
    {
        Icon: Block5BookInfo,
        title: "Выберите одну и откройте больше:",
        description: " сюжет, жанр, автор и интересные факты о книге",
    },
];

const description =
    "Ищете книгу для настроения или расслабления?" +
    " Наш алгоритм поможет выбрать книгу именно для вас — быстро и персонально";

const Books: FC = () => {
    const renderSteps = () => {
        return <GsuMainPageSteps steps={steps} btnText={"ВЫБРАТЬ КНИГУ"} btnLink={"/books"} />;
    };

    const renderImages = () => {
        return (
            <GsuMainPageImages
                image1Src={"/images/main-page-icons/books/image1.jpg"}
                image2Src={"/images/main-page-icons/books/image2.jpg"}
                image1Alt={"Books"}
                image2Alt={"Books"}
            />
        );
    };

    return (
        <GsuMainPageBlockContainer id={"books"} background={"gray"} description={description} title={"Книги"}>
            <GsuMainPageBlock
                imagesPosition={"right"}
                textBlock={renderSteps()}
                imagesBlock={renderImages()}
                btnText={"ВЫБРАТЬ КНИГУ"}
                btnLink={"/books"}
                type="steps"
            />
        </GsuMainPageBlockContainer>
    );
};

export default Books;
