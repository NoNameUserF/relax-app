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
import {FinishModalVideo} from "../../assets/Icons";

import {VideoDetailsState} from "../../wizards/VideoStep/VideoFinishStep";

import RelaxStepLoader from "../../components/RelaxStepLoader";

import workflow, {VideoWizardState} from "./workflow";

const header = "Приятного просмотра!";
const msg =
    "Если контент пришёлся вам по душе, вы можете поддержать наш проект пожертвованием или поделиться своим отзывом, чтобы помочь нам стать ещё лучше";
const btnText = "Назад к описанию";

const VideosPage = () => {
    useEffect(() => {
        ReactGA.send({hitType: "pageview", page: location.pathname});
    }, []);

    const ErrorModal = (componentState: VideoWizardState, wizardState: IWizardState, error: GsuError) => {
        if (isGsuServerError(error) && error.status === httpResponseCodeList.tooManyRequests) {
            return (props: IErrorModal<VideoWizardState>) => (
                <GsuDefaultErrorModal
                    btnLabel={commonErrorViewStringContent}
                    header={textBlockByRequest}
                    description={textBlockDescription}
                    action={props.reset}
                    {...props}
                />
            );
        }

        return (props: IErrorModal<VideoWizardState>) => (
            <GsuDefaultErrorModal
                btnLabel={commonErrorViewStringContent}
                description={commonDescription}
                action={props.reset}
                {...props}
            />
        );
    };

    const FinishModal = () => {
        return (props: IFinishModal<VideoDetailsState>) => (
            <GsuDefaultWizardFinishModal
                Emoji={FinishModalVideo}
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

    const wizardContentStyle = (componentState: VideoWizardState, wizardState: IWizardState) => {
        return wizardState._loader ? {paddingTop: "0"} : {};
    };

    return (
        <>
            <Head>
                <title>Видео — Relax AI</title>
                <meta
                    name="description"
                    content="Ищете видео для вдохновения или отдыха? Relax AI подберёт видео под ваше настроение и вкус — интерактивно, персонально и с интересными фактами."
                />
                <link rel="canonical" href="https://relax.alivio.ai/videos" />

                <meta property="og:title" content="Видео — Relax AI" />
                <meta
                    property="og:description"
                    content="Пройдите короткий интерактивный опрос, и Relax AI предложит 4 видео под ваше настроение. Узнайте больше о жанре, сюжете, канале и интересных фактах."
                />
                <meta property="og:url" content="https://relax.alivio.ai/videos" />

                <meta name="twitter:title" content="Видео — Relax AI" />
                <meta
                    name="twitter:description"
                    content="Relax AI подберёт видео под ваше настроение — вдохновляющие, расслабляющие и развлекательные подборки с описаниями и фактами."
                />

                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "WebApplication",
                        name: "Relax AI — Видео",
                        url: "https://relax.alivio.ai/videos",
                        applicationCategory: "LifestyleApplication",
                        operatingSystem: "Web",
                        inLanguage: "ru-RU",
                        description:
                            "Relax AI помогает найти видео под ваше настроение. Пройдите короткий опрос — ИИ подберёт 4 варианта с описанием, жанром, сюжетом и интересными фактами.",
                        featureList: [
                            "Интерактивный подбор видео",
                            "Учёт вкусов и настроения пользователя",
                            "Подробная информация о жанре, сюжете и канале",
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
                        name: "Видео — Relax AI",
                        url: "https://relax.alivio.ai/videos",
                        description:
                            "ИИ Relax AI подберёт видео под ваше настроение и вкус. Интерактивный опрос, персональные подборки и интересные факты о видео.",
                    })}
                </script>
            </Head>

            <div className={styles.wizardPageContainer}>
                <GsuWizard
                    workflow={workflow}
                    id={"Video"}
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

export default VideosPage;
