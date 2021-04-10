import { Video } from "./types";

export function getTotalDaysToWatch(
  videos: Video[],
  availableDays: number[]
): number {
  if (availableDays.length !== 7)
    throw new Error(
      "Available days needs be a array with seven values (one per day on week)"
    );

  const maxAvailableTime = Math.max(...availableDays);

  let totalVideos = videos.filter(
    (video: Video) => video.duration < maxAvailableTime
  );

  let day = 0;

  let totalDays = 0;

  do {
    const { canWatch, lastIndex } = videosCanWatch(
      totalVideos,
      availableDays[day]
    );

    if (canWatch.length) {
      totalVideos = totalVideos.slice(lastIndex + 1, totalVideos.length);
    }

    totalDays += 1;

    if (day >= 6) day = 0;
    else day += 1;
  } while (totalVideos.length);

  return totalDays;
}

function videosCanWatch(
  videos: Video[],
  time: number
): { canWatch: number[]; lastIndex: number } {
  const canWatch: number[] = [];

  const total = (initial: number): number =>
    canWatch.reduce(
      (acc: number, index: number): number => acc + videos[index].duration,
      initial
    );

  for (let i = 0; i < videos.length; i++) {
    if (total(videos[i].duration) <= time) {
      canWatch.push(i);
    } else {
      break;
    }
  }

  const [lastIndex] = canWatch.reverse();

  return {
    canWatch,
    lastIndex,
  };
}
