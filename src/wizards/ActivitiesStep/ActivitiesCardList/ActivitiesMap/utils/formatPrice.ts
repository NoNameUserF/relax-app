const formatPrice = (price: string = "0") => (price == "0" ? "Бесплатно" : `~${price} USD`);

export default formatPrice;
