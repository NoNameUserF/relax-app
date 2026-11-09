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

import {FinishModalQueen} from "../../assets/Icons";
import styles from "../../root/app.module.css";

import {
    boardGamesFinishModalBtnText as btnText,
    boardGamesFinishModalHeader as header,
    boardGamesFinishModalMsg as msg,
} from "../../constants/boardGamesModalText";

import httpResponseCodeList from "../../helpers/httpResponseCodeList";
import commonErrorViewStringContent from "../../helpers/commonConstants";
import {commonDescription, textBlockByRequest, textBlockDescription} from "../../helpers/modalsText";

import {GameDetailsState} from "../../wizards/BoardGamesStep/BoardGamesDetails";

import RelaxStepLoader from "../../components/RelaxStepLoader";

import workflow, {MoviesWizardState} from "./workflow";

const BoardGamesPage = () => {
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
        return (props: IFinishModal<GameDetailsState>) => (
            <GsuDefaultWizardFinishModal
                header={header}
                msg={msg}
                btnText={btnText}
                Emoji={FinishModalQueen}
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
                <title>Настольные игры — Relax AI</title>
                <meta
                    name="description"
                    content="Хотите провести вечер с друзьями или семьёй? Relax AI подберёт настольные игры под ваш вкус и настроение — быстро, просто и персонально."
                />
                <link rel="canonical" href="https://relax.alivio.ai/board-games" />

                <meta property="og:title" content="Настольные игры — Relax AI" />
                <meta
                    property="og:description"
                    content="ИИ подберёт настольную игру под ваше настроение и компанию. Получите 4 подходящих варианта с описанием и ключевой информацией."
                />
                <meta property="og:url" content="https://relax.alivio.ai/board-games" />

                <meta name="twitter:title" content="Настольные игры — Relax AI" />
                <meta
                    name="twitter:description"
                    content="Relax AI предложит настольные игры для компании или семьи. 4 точных варианта с описаниями — идеальный способ выбрать игру для уютного вечера."
                />

                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "WebApplication",
                        name: "Relax AI — Настольные игры",
                        url: "https://relax.alivio.ai/board-games",
                        applicationCategory: "LifestyleApplication",
                        operatingSystem: "Web",
                        inLanguage: "ru-RU",
                        description:
                            "Relax AI подбирает настольные игры под ваш вкус и настроение. Для семьи, друзей или пары — получите 4 персональные рекомендации с описаниями и фактами.",
                        featureList: [
                            "Подбор настольных игр под настроение и компанию",
                            "Описание и ключевая информация по каждой игре",
                            "Быстрый выбор без лишних поисков",
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
                        name: "Настольные игры — Relax AI",
                        url: "https://relax.alivio.ai/board-games",
                        description:
                            "ИИ Relax AI подберёт настольные игры под ваше настроение и компанию. 4 точных рекомендации с описанием и ключевыми деталями.",
                    })}
                </script>
            </Head>

            <div className={styles.wizardPageContainer}>
                <GsuWizard
                    workflow={workflow}
                    id={"BoardGames"}
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

export default BoardGamesPage;
