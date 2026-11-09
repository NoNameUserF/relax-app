import {FC} from "react";

import {GsuMainPagePreferencesBlock} from "@gsu-ai/gsu-ui-core";

import {Block2Clock, Block2Face, Block2Gamepad, Block2Recommendations} from "../../../assets/Icons";

const Preferences: FC = () => {
    const block2Content = [
        {
            icon: Block2Clock,
            title: "Время",
            text: "Забудьте о долгих поисках — находим развлечения мгновенно",
        },
        {
            icon: Block2Gamepad,
            title: "Удобство",
            text: "Интуитивно понятный интерфейс, подходящий для любого пользователя",
        },
        {
            icon: Block2Face,
            title: "Для всех",
            text: "Развлечения для семьи, друзей, пар и детей с учётом вкусов",
        },
        {
            icon: Block2Recommendations,
            title: "Актуальность",
            text: "Рекомендации с учётом трендов, новинок и классики для вас",
        },
    ];

    return <GsuMainPagePreferencesBlock title={"Почему Relax AI?"} contentItems={block2Content} />;
};

export default Preferences;
