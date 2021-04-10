import { getMostUsedWords } from "./get-most-used-words";
import { getTotalDaysToWatch } from "./get-total-days-to-watch";
import { Videos } from "./mock";

const WEEK_AVAILABLE_TIME = [15, 120, 30, 150, 20, 40, 90];

(() => {
  const videos = Videos;

  const mostUsedWords = getMostUsedWords(
    videos.map((video) => `${video.title} ${video.description}`),
    5
  );

  console.log({ mostUsedWords });

  const totalDaysToWatch = getTotalDaysToWatch(videos, WEEK_AVAILABLE_TIME);

  console.log({ totalDaysToWatch });
})();
