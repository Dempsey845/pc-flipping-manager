import { useState } from "react";
import BuildOptions from "./BuildOptions";
import { formatEpochToDayMonth, getDaysSinceEpoch } from "../helpers/epoch";

function BuildImage({ build, listView, setTargetBuild, setShowMoreModal }) {
  const [hovered, setHovered] = useState(false);
  const imageGridViewStyle = "hover:opacity-80";

  return (
    <div
      onMouseOver={() => setHovered(true)}
      onMouseOut={() => setHovered(false)}
      className="build-img relative"
    >
      <img
        className={`w-20 h-20 sm:w-48 sm:h-48 rounded-xl bg-blue-800 shadow object-cover ${
          !listView && imageGridViewStyle
        }`}
        src={build.imageSrc}
      />

      {hovered && !listView && (
        <button
          onClick={() => {
            setTargetBuild(build);
            setShowMoreModal(true);
          }}
          className="btn btn-secondary absolute top-1 right-1"
        >
          ...
        </button>
      )}
    </div>
  );
}

export default function Build({
  build,
  listView,
  windowWidth,
  setShowMoreModal,
  setTargetBuild,
}) {
  const listViewStyle = "flex bg-white rounded-2xl shadow-lg";
  const gridViewStyle = "flex flex-col max-w-64";

  const dayMonth = formatEpochToDayMonth(build.listDate);
  const daysSinceListed = getDaysSinceEpoch(build.listDate);

  return (
    <div
      className={`build items-center justify-between w-fit ${
        listView ? listViewStyle : gridViewStyle
      } ${windowWidth < 640 && "w-full"} p-3 gap-5`}
    >
      <BuildImage
        build={build}
        listView={listView}
        setShowMoreModal={setShowMoreModal}
        setTargetBuild={setTargetBuild}
      />
      <div className="flex flex-col text-xs sm:text-base">
        <h3 className="build-title font-medium text-sm sm:text-lg">
          {build.title}
        </h3>
        <p className="price font-light">£{build.price}</p>
        <div className="flex gap-1 font-light">
          <p className="status note">{build.status}</p>
          <p> • </p>
          <p className="list-date note">Listed on {dayMonth}</p>
        </div>
        <p className="days-since-listed note">
          {build.status == "Sold"
            ? `Took ${build.timeSinceSold.string} to sell`
            : `${daysSinceListed} days since listed`}
        </p>
        {listView && windowWidth >= 640 && (
          <div className="flex justify-between gap-3">
            <BuildOptions buildStatus={build.status} />
          </div>
        )}
      </div>
      {windowWidth < 640 && (
        <div>
          <button
            onClick={() => {
              setTargetBuild(build);
              setShowMoreModal(true);
            }}
            className="btn btn-secondary"
          >
            ...
          </button>
        </div>
      )}
    </div>
  );
}
