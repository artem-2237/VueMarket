export default function priceFormated(value) {
    // return value !== 0 ? Math.floor(value/1000) + ` ${value % 1000}`: 0;
    if (value !== 0 && value % 1000 >= 100) return Math.floor(value/1000) + ` ${value % 1000}`
    else if (value !== 0 && value % 1000 < 100) return Math.floor(value/1000) + ` 0${value % 1000}`
    else return 0
}