import { getTimeDifferenceString } from "./epoch";

// Calculates time since sold for a single build using epoch milliseconds
export function calculateTimeSinceSold(build) {
  if (build.status === "Sold" && build.soldDate && build.listDate) {
    const listEpoch = build.listDate;
    const soldEpoch = build.soldDate;

    const seconds = (soldEpoch - listEpoch) / 1000;
    const timeSinceSold = getTimeDifferenceString(listEpoch, soldEpoch);

    return {
      ...build,
      timeSinceSold,
      timeSinceSoldSeconds: seconds,
    };
  }

  return build;
}

function processBuildData(build) {
  return calculateTimeSinceSold(build);
}

export function createBuild(buildData) {
  const defaultBuild = {
    id: null,
    title: "",
    price: 0,
    status: "Available",
    listDate: null,
    soldDate: null,
    imageSrc: "",
    timeSinceSold: null,
    timeSinceSoldSeconds: null,
  };

  const completeBuild = { ...defaultBuild, ...buildData };

  return processBuildData(completeBuild);
}

export function calculateAverageTimeToSell(builds) {
  const soldBuilds = builds.filter(
    (b) => b.status === "Sold" && b.timeSinceSoldSeconds != null
  );

  if (soldBuilds.length === 0) return null;

  const totalSeconds = soldBuilds.reduce(
    (sum, b) => sum + b.timeSinceSoldSeconds,
    0
  );

  const avgSeconds = totalSeconds / soldBuilds.length;
  return getTimeDifferenceString(0, avgSeconds * 1000);
}
