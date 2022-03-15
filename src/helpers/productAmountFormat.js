export default function productAmountFormated(value) {
    if(value === 1 || (value > 11 && value % 10 === 1)) return 'товар'
    else if(value >= 2 & value <= 4) return 'товара'
    else return 'товаров'
}