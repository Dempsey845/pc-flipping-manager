import { getTimeDifferenceString } from "./epoch";

export function calculateAverageTimeToSell(builds) {
  const timeDiffsInSeconds = [];

  const processedBuilds = builds.map((build) => {
    if (build.status === "Sold" && build.soldDate && build.listDate) {
      const listEpoch = new Date(build.listDate).getTime();
      const soldEpoch = new Date(build.soldDate).getTime();

      const timeSinceSold = getTimeDifferenceString(listEpoch, soldEpoch);
      timeDiffsInSeconds.push((soldEpoch - listEpoch) / 1000);

      return {
        ...build,
        timeSinceSold,
      };
    }

    return build;
  });

  if (timeDiffsInSeconds.length > 0) {
    const totalSeconds = timeDiffsInSeconds.reduce((sum, s) => sum + s, 0);
    const avgSeconds = totalSeconds / timeDiffsInSeconds.length;
    const avgTime = getTimeDifferenceString(0, avgSeconds * 1000);

    return { processedBuilds, avgTime };
  } else {
    return { processedBuilds, avgTime: null };
  }
}
