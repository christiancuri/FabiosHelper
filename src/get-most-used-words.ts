import { getWordsCount } from "./get-words-count";
import { WordsCount } from "./types";

export function getMostUsedWords(values: string[], size: number): string[] {
  const wordsCount: WordsCount = values.reduce(
    (acc: WordsCount, words: string) => ({
      ...acc,
      ...Object.entries(getWordsCount(words)).reduce(
        (wordAcc: WordsCount, [key, value]: [string, number]) => ({
          ...wordAcc,
          [key]: (acc[key] || 0) + value,
        }),
        {}
      ),
    }),
    {}
  );

  const totalWords = Object.keys(wordsCount).sort(
    (a: string, b: string) => wordsCount[b] - wordsCount[a]
  );

  return totalWords.slice(0, size);
}
