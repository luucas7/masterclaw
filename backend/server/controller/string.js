function grams(text, n) {
    const nGrams = []

    const source = typeof text.slice === 'function' ? text : String(text);
    let index = source.length - n + 1;

    if (index < 1) {
      return nGrams;
    }

    while (index--) {
      nGrams[index] = source.slice(index, index + n);
    }

    return nGrams
  }



const string = {};

string.getNGrams = (text, n) => {
    return grams(text,n);
}

string.getNGramsToLen = (text, n) =>
{
    const ngrams = [];
    for (let i = n; i <= text.length; i++) {
        ngrams.push(string.getNGrams(text, i));
    }
    return ngrams;
}

module.exports = string;