// eslint-disable-next-line max-len
const PriceWithDiscount = (price: number, discountPercent: number) => price - price * (discountPercent / 100);

export default PriceWithDiscount;
