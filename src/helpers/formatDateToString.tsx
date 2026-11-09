const formatDateToString = (date: Date, locale: string = "ru-RU") => {
    return new Intl.DateTimeFormat(locale, {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    })
        .format(date)
        .replace(/\./g, "-");
};

export default formatDateToString;
