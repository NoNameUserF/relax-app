import {GsuError, IErrorModal, IFinishModal, IWizardState} from "@gsu-ai/gsu-ui-core/dist/types/types/globalTypes";
import {useEffect} from "react";
import ReactGA from "react-ga4";

import {
    GsuDefaultErrorModal,
    GsuDefaultWizardFinishModal,
    GsuSpinner,
    GsuWizard,
    GsuWizardFooter,
    isGsuServerError,
} from "@gsu-ai/gsu-ui-core";

import {Head} from "vite-react-ssg";

import styles from "../../root/app.module.css";

import httpResponseCodeList from "../../helpers/httpResponseCodeList";
import commonErrorViewStringContent from "../../helpers/commonConstants";
import {commonDescription, textBlockByRequest, textBlockDescription} from "../../helpers/modalsText";

import {
    boardGamesFinishModalBtnText as btnText,
    boardGamesFinishModalMsg as msg,
    gameGamesFinishModalHeader as header,
} from "../../constants/boardGamesModalText";

import {FinishModalGames} from "../../assets/Icons";

import {VideoGameDetailsState} from "../../wizards/GamesStep/GamesDetails";

import RelaxStepLoader from "../../components/RelaxStepLoader";

import workflow, {MoviesWizardState} from "./workflow";

const GamesPage = () => {
    useEffect(() => {
        ReactGA.send({hitType: "pageview", page: location.pathname});
    }, []);

    const ErrorModal = (componentState: MoviesWizardState, wizardState: IWizardState, error: GsuError) => {
        if (isGsuServerError(error) && error.status === httpResponseCodeList.tooManyRequests) {
            return (props: IErrorModal<MoviesWizardState>) => (
                <GsuDefaultErrorModal
                    btnLabel={commonErrorViewStringContent}
                    header={textBlockByRequest}
                    description={textBlockDescription}
                    action={props.reset}
                    {...props}
                />
            );
        }

        return (props: IErrorModal<MoviesWizardState>) => (
            <GsuDefaultErrorModal
                btnLabel={commonErrorViewStringContent}
                description={commonDescription}
                action={props.reset}
                {...props}
            />
        );
    };

    const FinishModal = () => {
        return (props: IFinishModal<VideoGameDetailsState>) => (
            <GsuDefaultWizardFinishModal
                header={header}
                msg={msg}
                btnText={btnText}
                Emoji={FinishModalGames}
                {...props}
            />
        );
    };

    const wizardContainerStyle = () => {
        return {};
    };

    const wizardWindowStyle = () => {
        return {};
    };

    const wizardContentStyle = (componentState: MoviesWizardState, wizardState: IWizardState) => {
        return wizardState._loader ? {paddingTop: "0"} : {};
    };

    return (
        <>
            <Head>
                <title>Компьютерные игры — Relax AI</title>
                <meta
                    name="description"
                    content="Не знаете, во что поиграть? Relax AI подберёт игры под ваш вкус и настроение. Получите 4 подходящих варианта с описанием и ключевой информацией — быстро и удобно."
                />
                <link rel="canonical" href="https://relax.alivio.ai/video-games" />

                <meta property="og:title" content="Компьютерные игры — Relax AI" />
                <meta
                    property="og:description"
                    content="ИИ подберёт компьютерные игры под ваш вкус и настроение. Четыре точных рекомендации с описанием и ключевой информацией — без лишних поисков."
                />
                <meta property="og:url" content="https://relax.alivio.ai/video-games" />

                <meta name="twitter:title" content="Компьютерные игры — Relax AI" />
                <meta
                    name="twitter:description"
                    content="Relax AI поможет выбрать игру под ваш вкус. Получите 4 персональные рекомендации с описанием и важной информацией об играх."
                />

                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "WebApplication",
                        name: "Relax AI — Компьютерные игры",
                        url: "https://relax.alivio.ai/video-games",
                        applicationCategory: "LifestyleApplication",
                        operatingSystem: "Web",
                        inLanguage: "ru-RU",
                        description:
                            "Relax AI подбирает компьютерные игры под ваш вкус и настроение. ИИ предлагает 4 персональные рекомендации с описанием, жанром и ключевой информацией.",
                        featureList: [
                            "Подбор игр по интересам и настроению",
                            "Описание и ключевая информация по каждой игре",
                            "Быстрый доступ к новым игровым идеям",
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
                        name: "Компьютерные игры — Relax AI",
                        url: "https://relax.alivio.ai/video-games",
                        description:
                            "ИИ Relax AI предложит компьютерные игры под ваше настроение и вкус. Получите 4 подходящих варианта с описанием и важными деталями.",
                    })}
                </script>
            </Head>

            <div className={styles.wizardPageContainer}>
                <GsuWizard
                    workflow={workflow}
                    id={"Games"}
                    Loader={GsuSpinner}
                    StepLoader={RelaxStepLoader}
                    Footer={GsuWizardFooter}
                    ErrorModal={ErrorModal}
                    FinishModal={FinishModal}
                    styles={{
                        container: wizardContainerStyle,
                        window: wizardWindowStyle,
                        content: wizardContentStyle,
                    }}
                    classes={{
                        container: styles.wizardContainer,
                        window: styles.wizardWindow,
                        content: styles.wizardContent,
                    }}
                />
            </div>
        </>
    );
};

export default GamesPage;
