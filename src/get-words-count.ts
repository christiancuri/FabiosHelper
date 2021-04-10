import { WordsCount } from "./types";

function isNumber(value: string): boolean {
  try {
    return !!parseInt(value);
  } catch (error) {
    return false;
  }
}

export function getWordsCount(str: string): WordsCount {
  const words = str.split(" ");

  const countObj = words.reduce((acc: WordsCount, word: string) => {
    const key = word
      .toLowerCase()
      .replace(/[^a-z0-9\u00C0-\u024F\u1E00-\u1EFF]/gi, "");

    if (isNumber(key) || !key || key.length < 2) return acc;

    return {
      ...acc,
      [key]: (acc[key] || 0) + 1,
    };
  }, {});

  return countObj;
}
