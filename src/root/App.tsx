import {FC, useEffect, useState} from "react";
import {
    acceptGA,
    GSUApp, GsuBannerCookiesModal,
    hasCookiesConsent,
    isAcceptedCookiesConsent, rejectGA,
    setMainHost,
    setStage,
    setupGA,
} from "@gsu-ai/gsu-ui-core";

import ReactGA from "react-ga4";

import mapboxgl from "mapbox-gl";

import routes from "../core/routes";

import {setApplicationHost} from "../constants/api";

import image500 from "/images/error-content/error500.png";

import alivioLogo from "/images/logo/alivio-logo.svg";
import shortLogo from "/images/logo/logo-relax-in-modal-about.svg";

import "./variables.css";
import "./app.module.css";
import "@gsu-ai/gsu-ui-core/style";

const aboutText =
    "Не знаете, как расслабиться и выбрать занятие по душе? Откройте Relax AI —   в мире развлечений." +
    " Хотите ли вы посмотреть фильм, найти игру для детей, выбрать настольную или компьютерную игру, или просто погрузиться в хорошую книгу," +
    " Relax AI подберет идеальный вариант под ваше настроение и интересы." +
    " Неважно, ищете ли вы что-то для семейного вечера, уединенного отдыха или веселого времяпрепровождения с друзьями — Relax AI сделает каждый момент особенным. Расслабляйтесь с умом";

const warningText =
    "Все данные на нашем сервисе созданы искусственным интеллектом, поэтому мы не можем гарантировать результат и не несем ответственности за предложенный контент";
const App: FC = () => {
    const [openCookiesBanner, setOpenCookiesBanner] = useState(false);
    const [hydrated, setHydrated] = useState(false);

    useEffect(() => {
        setMainHost(import.meta.env.VITE_MAIN_API_URL);
        setApplicationHost(import.meta.env.VITE_APPLICATION_API_URL);
        setStage(import.meta.env.VITE_MAIN_STAGE);
        mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

        setupGA();
        if (!hasCookiesConsent()) {
            setOpenCookiesBanner(true);
        } else {
            if (isAcceptedCookiesConsent()) {
                acceptGA();
            } else {
                rejectGA();
            }
        }
        setHydrated(true);

    }, []);

    return (
        <>
            {hydrated && openCookiesBanner && (
                <GsuBannerCookiesModal openModal={openCookiesBanner} setOpenModal={setOpenCookiesBanner} />
            )}
            <GSUApp
                img500src={image500}
                appName={"Relax AI"}
                router={routes}
                aboutText={aboutText}
                warningText={warningText}
                shortLogo={shortLogo}
            />

        </>
    );
};

export default App;
