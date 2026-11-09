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

import {FinishModalMovie} from "../../assets/Icons";
import httpResponseCodeList from "../../helpers/httpResponseCodeList";
import commonErrorViewStringContent from "../../helpers/commonConstants";
import {commonDescription, textBlockByRequest, textBlockDescription} from "../../helpers/modalsText";

import {MovieDetailsState} from "../../wizards/MoviesStep/MovieDetails";

import RelaxStepLoader from "../../components/RelaxStepLoader";

import workflow, {MoviesWizardState} from "./workflow";

const header = "Приятного просмотра!";
const msg =
    "Если контент пришёлся вам по душе, вы можете поддержать наш проект пожертвованием или поделиться своим отзывом, чтобы помочь нам стать ещё лучше";
const btnText = "Назад к описанию";

const MoviesPage = () => {
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
        return (props: IFinishModal<MovieDetailsState>) => (
            <GsuDefaultWizardFinishModal
                Emoji={FinishModalMovie}
                header={header}
                msg={msg}
                btnText={btnText}
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
                <title>Кино и анимация — Relax AI</title>
                <meta
                    name="description"
                    content="Relax AI подберёт фильм, мультфильм или сериал под ваш вкус и настроение — быстро и персонально. Без бесконечных списков и лишних поисков."
                />
                <link rel="canonical" href="https://relax.alivio.ai/movies" />

                <meta property="og:title" content="Кино и анимация — Relax AI" />
                <meta
                    property="og:description"
                    content="Укажите параметры: взрослые или дети, жанр, формат, тема и настроение — и Relax AI предложит 4 фильма, мультфильма или сериала с описаниями и фактами."
                />
                <meta property="og:url" content="https://relax.alivio.ai/movies" />

                <meta name="twitter:title" content="Кино и анимация — Relax AI" />
                <meta
                    name="twitter:description"
                    content="ИИ подберёт фильмы, мультфильмы и сериалы под ваше настроение. Жанр, формат и тема — всё учитывается для точных рекомендаций."
                />

                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "WebApplication",
                        name: "Relax AI — Кино и анимация",
                        url: "https://relax.alivio.ai/movies",
                        applicationCategory: "LifestyleApplication",
                        operatingSystem: "Web",
                        inLanguage: "ru-RU",
                        description:
                            "Relax AI подбирает фильмы, мультфильмы и сериалы под ваш вкус и настроение. Укажите жанр, формат и тему — получите 4 персональных варианта с описаниями и интересными фактами.",
                        featureList: [
                            "Подбор фильмов, мультфильмов и сериалов",
                            "Фильтры по жанру, формату, теме и настроению",
                            "Описание сюжета, актёров и интересные факты",
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
                        name: "Кино и анимация — Relax AI",
                        url: "https://relax.alivio.ai/movies",
                        description:
                            "ИИ Relax AI предложит фильмы, мультфильмы и сериалы под ваше настроение с краткими описаниями, актёрским составом и фактами о создании.",
                    })}
                </script>
            </Head>

            <div className={styles.wizardPageContainer}>
                <GsuWizard
                    workflow={workflow}
                    id={"Movie"}
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

export default MoviesPage;
