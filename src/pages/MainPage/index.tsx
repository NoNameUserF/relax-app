import {FC, useEffect} from "react";

import ReactGA from "react-ga4";
import {GsuMainPage} from "@gsu-ai/gsu-ui-core";

import {Head} from "vite-react-ssg";

import MainBlock from "./MainBlock";
import Movie from "./Movie";
import Games from "./Games";
import BoardGames from "./BoardGames";
import Books from "./Books";
import Activities from "./Activities";
import Preferences from "./Preferences";
import Videos from "./Videos";

const MainPage: FC = () => {
    useEffect(() => {
        ReactGA.send({hitType: "pageview", page: location.pathname});
    }, []);

    return (
        <>
            <Head>
                <title>Relax AI — ваш досуг — наша идея</title>
                <meta
                    name="description"
                    content="Поделитесь своим настроением — и Relax AI превратит его в персональные идеи для отдыха. Фильмы, книги, игры, видео и активности — всё, чтобы ваш досуг стал вдохновляющим и лёгким."
                />
                <link rel="canonical" href="https://relax.alivio.ai/" />

                <meta property="og:title" content="Relax AI — ваш досуг — наша идея" />
                <meta
                    property="og:description"
                    content="ИИ подберёт фильмы, книги, настольные и компьютерные игры, видео и активности под ваше настроение. Отдыхайте персонально, удобно и с вдохновением."
                />
                <meta property="og:url" content="https://relax.alivio.ai/" />

                <meta name="twitter:title" content="Relax AI — ваш досуг — наша идея" />
                <meta
                    name="twitter:description"
                    content="Relax AI подбирает развлечения под ваше настроение: фильмы, книги, игры и активности. Быстро, персонально и с вдохновением."
                />

                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "WebApplication",
                        name: "Relax AI — Главная",
                        url: "https://relax.alivio.ai/",
                        applicationCategory: "LifestyleApplication",
                        operatingSystem: "Web",
                        inLanguage: "ru-RU",
                        description:
                            "Relax AI — ИИ-платформа, которая подбирает развлечения под ваше настроение: фильмы, книги, компьютерные и настольные игры, видео и активности. Персонально, быстро и удобно.",
                        featureList: [
                            "Подбор фильмов и анимации",
                            "Компьютерные и настольные игры",
                            "Видео и книги под настроение",
                            "Идеи активностей и отдыха",
                        ],
                        creator: {
                            "@type": "Organization",
                            name: "Alivio.ai",
                            url: "https://alivio.ai",
                        },
                    })}
                </script>

                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "WebPage",
                        name: "Relax AI — ваш досуг — наша идея",
                        url: "https://relax.alivio.ai/",
                        description:
                            "Главная страница Relax AI: фильмы, игры, книги, видео и активности под ваше настроение. Разделы: Кино и анимация, Компьютерные игры, Настольные игры, Видео, Книги, Активности.",
                        hasPart: [
                            {
                                "@type": "WebPage",
                                name: "Кино и анимация",
                                url: "https://relax.alivio.ai/movies",
                            },
                            {
                                "@type": "WebPage",
                                name: "Компьютерные игры",
                                url: "https://relax.alivio.ai/video-games",
                            },
                            {
                                "@type": "WebPage",
                                name: "Настольные игры",
                                url: "https://relax.alivio.ai/board-games",
                            },
                            {
                                "@type": "WebPage",
                                name: "Видео",
                                url: "https://relax.alivio.ai/videos",
                            },
                            {
                                "@type": "WebPage",
                                name: "Книги",
                                url: "https://relax.alivio.ai/books",
                            },
                            {
                                "@type": "WebPage",
                                name: "Активности",
                                url: "https://relax.alivio.ai/activities",
                            },
                        ],
                    })}
                </script>
            </Head>

            <GsuMainPage>
                <MainBlock />
                <Preferences />
                <Movie />
                <Games />
                <BoardGames />
                <Videos />
                <Books />
                <Activities />
            </GsuMainPage>
        </>
    );
};

export default MainPage;
