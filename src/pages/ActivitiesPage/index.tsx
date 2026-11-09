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

import commonErrorViewStringContent from "../../helpers/commonConstants";
import {commonDescription, textBlockByRequest, textBlockDescription} from "../../helpers/modalsText";
import httpResponseCodeList from "../../helpers/httpResponseCodeList";
import {
    activitiesFinishModalBtnText as btnText,
    activitiesFinishModalHeader as header,
    activitiesFinishModalMsg as msg,
} from "../../constants/activitiesFinishModalText";
import {FinishModalActivity} from "../../assets/Icons";

import {ActivitiesList} from "../../wizards/ActivitiesStep/ActivitiesCardList";

import RelaxStepLoader from "../../components/RelaxStepLoader";

import workflow, {ActivitiesWizardState} from "./workflow";

const ActivitiesPage = () => {
    useEffect(() => {
        ReactGA.send({hitType: "pageview", page: location.pathname});
    }, []);

    const ErrorModal = (componentState: ActivitiesWizardState, wizardState: IWizardState, error: GsuError) => {
        if (isGsuServerError(error) && error.status === httpResponseCodeList.tooManyRequests) {
            return (props: IErrorModal<ActivitiesWizardState>) => (
                <GsuDefaultErrorModal
                    btnLabel={commonErrorViewStringContent}
                    header={textBlockByRequest}
                    description={textBlockDescription}
                    action={props.reset}
                    {...props}
                />
            );
        }

        return (props: IErrorModal<ActivitiesWizardState>) => (
            <GsuDefaultErrorModal
                btnLabel={commonErrorViewStringContent}
                description={commonDescription}
                action={props.reset}
                {...props}
            />
        );
    };

    const FinishModal = () => {
        return (props: IFinishModal<ActivitiesList>) => (
            <GsuDefaultWizardFinishModal
                header={header}
                msg={msg}
                btnText={btnText}
                Emoji={FinishModalActivity}
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

    const wizardContentStyle = (componentState: ActivitiesWizardState, wizardState: IWizardState) => {
        return wizardState._loader ? {paddingTop: "0"} : {};
    };

    return (
        <>
            <Head>
                <title>Активности — Relax AI</title>
                <meta
                    name="description"
                    content="Ищете идеи для отдыха? Relax AI подберёт активности и места под ваше настроение и ритм жизни. Укажите город и предпочтения — получите 4 персональные рекомендации."
                />
                <link rel="canonical" href="https://relax.alivio.ai/activities" />

                <meta property="og:title" content="Активности — Relax AI" />
                <meta
                    property="og:description"
                    content="Relax AI подберёт лучшие активности и места под ваш ритм и настроение. 4 персональные варианты с описанием и полезной информацией — быстро и просто."
                />
                <meta property="og:url" content="https://relax.alivio.ai/activities" />

                <meta name="twitter:title" content="Активности — Relax AI" />
                <meta
                    name="twitter:description"
                    content="ИИ подберёт активности и места для отдыха под ваши предпочтения и настроение. Персональные рекомендации с описанием и советами."
                />

                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "WebApplication",
                        name: "Relax AI — Активности",
                        url: "https://relax.alivio.ai/activities",
                        applicationCategory: "LifestyleApplication",
                        operatingSystem: "Web",
                        inLanguage: "ru-RU",
                        description:
                            "Relax AI помогает находить идеи для отдыха и активности под ваш ритм и настроение. Укажите город и предпочтения — получите 4 персональные рекомендации с описанием и полезной информацией.",
                        featureList: [
                            "Подбор активностей по настроению и локации",
                            "Идеи для отдыха и досуга",
                            "Описание и практические советы по каждой активности",
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
                        name: "Активности — Relax AI",
                        url: "https://relax.alivio.ai/activities",
                        description:
                            "ИИ Relax AI подберёт активности и места под ваш ритм и настроение. 4 персональные идеи для отдыха с описанием и полезной информацией.",
                    })}
                </script>
            </Head>

            <div className={styles.wizardPageContainer}>
                <GsuWizard
                    workflow={workflow}
                    id={"Activities"}
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

export default ActivitiesPage;
