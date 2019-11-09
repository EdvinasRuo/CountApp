const checkNumers = (string) => {


let numericString = string.replace(/[^\d.,]/g, '');
numericString= numericString.replace(',', '.');

return numericString;

}

export default checkNumers; 