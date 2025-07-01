import BuildOptions from "./BuildOptions";

export default function Build({
  build,
  listView,
  windowWidth,
  setShowMoreModal,
  setTargetBuild,
}) {
  const listViewStyle = "flex max-h-64 bg-white rounded-2xl shadow-lg";
  const gridViewStyle = "flex flex-col max-w-64";

  return (
    <div
      className={`build items-center w-fit ${
        listView ? listViewStyle : gridViewStyle
      } ${windowWidth < 640 && "w-full"} p-3 gap-5`}
    >
      <img
        className={`build-img w-20 h-20 sm:w-48 sm:h-48 rounded-xl shadow`}
        src={build.imageSrc}
      ></img>
      <div className="flex flex-col text-xs sm:text-base">
        <h3 className="build-title font-medium text-sm sm:text-lg">
          {build.title}
        </h3>
        <p className="price font-light">£{build.price}</p>
        <div className="flex gap-1 font-light">
          <p className="status note">{build.status}</p>
          <p> • </p>
          <p className="list-date note">Listed on {build.listDate}</p>
        </div>
        <p className="days-since-listed note">15 days since listed</p>
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
