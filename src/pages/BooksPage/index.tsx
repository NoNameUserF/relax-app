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
import {FinishModalBooks} from "../../assets/Icons";

import {BooksDetailsState} from "../../wizards/BooksStep/BooksFinishStep";

import RelaxStepLoader from "../../components/RelaxStepLoader";

import workflow, {BooksWizardState} from "./workflow";

const header = "Приятного чтения!";
const msg =
    "Если контент пришёлся вам по душе, вы можете поддержать наш проект пожертвованием или поделиться своим отзывом, чтобы помочь нам стать ещё лучше";
const btnText = "Назад к описанию";

const BooksPage = () => {
    useEffect(() => {
        ReactGA.send({hitType: "pageview", page: location.pathname});
    }, []);

    const ErrorModal = (componentState: BooksWizardState, wizardState: IWizardState, error: GsuError) => {
        if (isGsuServerError(error) && error.status === httpResponseCodeList.tooManyRequests) {
            return (props: IErrorModal<BooksWizardState>) => (
                <GsuDefaultErrorModal
                    btnLabel={commonErrorViewStringContent}
                    header={textBlockByRequest}
                    description={textBlockDescription}
                    action={props.reset}
                    {...props}
                />
            );
        }

        return (props: IErrorModal<BooksWizardState>) => (
            <GsuDefaultErrorModal
                btnLabel={commonErrorViewStringContent}
                description={commonDescription}
                action={props.reset}
                {...props}
            />
        );
    };

    const FinishModal = () => {
        return (props: IFinishModal<BooksDetailsState>) => (
            <GsuDefaultWizardFinishModal
                Emoji={FinishModalBooks}
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

    const wizardContentStyle = (componentState: BooksWizardState, wizardState: IWizardState) => {
        return wizardState._loader ? {paddingTop: "0"} : {};
    };

    return (
        <>
            <Head>
                <title>Книги — Relax AI</title>
                <meta
                    name="description"
                    content="Ищете книгу для вдохновения или отдыха? Relax AI подберёт книги под ваш вкус и настроение — интерактивно, персонально и с интересными фактами."
                />
                <link rel="canonical" href="https://relax.alivio.ai/books" />

                <meta property="og:title" content="Книги — Relax AI" />
                <meta
                    property="og:description"
                    content="Пройдите короткий опрос — и Relax AI предложит подборку из 4 книг под ваше настроение. Узнайте сюжет, жанр, автора и интересные факты."
                />
                <meta property="og:url" content="https://relax.alivio.ai/books" />

                <meta name="twitter:title" content="Книги — Relax AI" />
                <meta
                    name="twitter:description"
                    content="Relax AI подберёт книги под ваше настроение и предпочтения. Персональные рекомендации с описанием, жанром и интересными фактами о книгах."
                />

                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "WebApplication",
                        name: "Relax AI — Книги",
                        url: "https://relax.alivio.ai/books",
                        applicationCategory: "LifestyleApplication",
                        operatingSystem: "Web",
                        inLanguage: "ru-RU",
                        description:
                            "Relax AI подбирает книги под ваше настроение и вкус. Пройдите интерактивный опрос — ИИ предложит 4 персональные книги с описанием, жанром и фактами об авторах.",
                        featureList: [
                            "Интерактивный подбор книг",
                            "Персональные рекомендации под настроение",
                            "Описание, жанр, автор и интересные факты",
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
                        name: "Книги — Relax AI",
                        url: "https://relax.alivio.ai/books",
                        description:
                            "ИИ Relax AI предложит книги под ваше настроение и вкус. 4 персональные рекомендации с описанием, жанром и интересными фактами о книгах.",
                    })}
                </script>
            </Head>

            <div className={styles.wizardPageContainer}>
                <GsuWizard
                    workflow={workflow}
                    id={"Place"}
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

export default BooksPage;
