let format_numeric = function (value) {
    return Number(value).toLocaleString();
};

let format_snake_to_title = function (str) {
    str = str.toLowerCase().split('_');
    for (let i = 0; i < str.length; i++) {
        str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
    }
    return str.join(' ');
};

let format_percentage = function (value, decimals) {
    if (!value) value = 0;
    if (!decimals) decimals = 0;

    value = value * 100;
    return Math.round(value * Math.pow(10, decimals)) / Math.pow(10, decimals) + '%';
};

var slugify = function (text) {
    return text.toString().toLowerCase()
        .replace(/\s+/g, '-') // Replace spaces with -
        .replace(/[^\w-]+/g, '') // Remove all non-word chars
        .replace(/--+/g, '-') // Replace multiple - with single -
        .replace(/^-+/, '') // Trim - from start of text
        .replace(/-+$/, ''); // Trim - from end of text
};

export default {
    format_numeric,
    format_snake_to_title,
    format_percentage,
    slugify
}