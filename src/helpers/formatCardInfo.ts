interface FormatOptions {
    locale?: string;
    units?: {
        thousand: string;
        million: string;
        billion: string;
    };
}

function formatCardInfo(num: number, options: FormatOptions = {}): string {
    const {locale = "ru-RU", units = {thousand: "тыс", million: "млн", billion: "млрд"}} = options;

    if (num < 1000) {
        return new Intl.NumberFormat(locale).format(num);
    }

    if (num < 1000000) {
        const thousands = num / 1000;
        const rounded = +thousands.toFixed(1);
        const showDecimal = rounded % 1 !== 0;
        const formatter = new Intl.NumberFormat(locale, {
            minimumFractionDigits: showDecimal ? 1 : 0,
            maximumFractionDigits: showDecimal ? 1 : 0,
        });
        return rounded === 1000
            ? `${formatter.format(1)} ${units.million}`
            : `${formatter.format(rounded)} ${units.thousand}`;
    }

    if (num < 1000000000) {
        const millions = num / 1000000;
        const rounded = +millions.toFixed(1);
        const showDecimal = rounded % 1 !== 0;
        const formatter = new Intl.NumberFormat(locale, {
            minimumFractionDigits: showDecimal ? 1 : 0,
            maximumFractionDigits: showDecimal ? 1 : 0,
        });
        return rounded === 1000
            ? `${formatter.format(1)} ${units.billion}`
            : `${formatter.format(rounded)} ${units.million}`;
    }

    const billiions = num / 1000000000;
    const rounded = +billiions.toFixed(1);
    const showDecimal = rounded % 1 !== 0;

    const formatter = new Intl.NumberFormat(locale, {
        minimumFractionDigits: showDecimal ? 1 : 0,
        maximumFractionDigits: showDecimal ? 1 : 0,
    });
    return `${formatter.format(rounded)} ${units.billion}`;
}

export default formatCardInfo;
