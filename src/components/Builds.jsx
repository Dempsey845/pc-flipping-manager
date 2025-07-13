import { useEffect, useState } from "react";
import Build from "./Build";
import BuildOptions from "./BuildOptions";
import AddBuild from "./AddBuild";
import { IoAddCircleOutline } from "react-icons/io5";
import { IoListSharp } from "react-icons/io5";
import { IoGrid } from "react-icons/io5";
import { CiSearch } from "react-icons/ci";

function BuildsHeader({
  searchInput,
  setSearchInput,
  listView,
  setListView,
  windowWidth,
  setShowAddBuildModal,
}) {
  return (
    <div
      className={`builds-header flex w-full justify-between bg-white p-3 items-center rounded-lg`}
    >
      <h1 className="font-bold pr-5">Your builds</h1>
      <div className="flex gap-3 right-side">
        {windowWidth >= 640 && (
          <div className="flex gap-2 mx-2">
            <button
              onClick={() => setListView(true)}
              className={`list-view btn ${
                listView ? "btn-primary-2" : "btn-primary"
              }`}
            >
              <IoListSharp size="1.5em" />
            </button>
            <button
              onClick={() => setListView(false)}
              className={`list-view btn ${
                listView ? "btn-primary" : "btn-primary-2"
              }`}
            >
              <IoGrid size="1.3em" />
            </button>
          </div>
        )}
        <button
          onClick={() => setShowAddBuildModal(true)}
          className={`add-build btn btn-primary-2`}
        >
          <IoAddCircleOutline size="1.5em" />
        </button>
        {windowWidth >= 640 ? (
          <div className="flex items-center search-bar bg-gray-200 rounded-full p-2">
            <CiSearch />
            <input
              onChange={(e) => setSearchInput(e.target.value)}
              className="search-builds"
              type="text"
              placeholder="Search your builds"
              value={searchInput}
            />
          </div>
        ) : (
          <button className="flex btn btn-secondary items-center p-2">
            <CiSearch />
          </button>
        )}
      </div>
    </div>
  );
}

function useWindowSize() {
  const [size, setSize] = useState({
    windowWidth: window.innerWidth,
    windowHeight: window.innerHeight,
  });

  useEffect(() => {
    function handleResize() {
      setSize({
        windowWidth: window.innerWidth,
        windowHeight: window.innerHeight,
      });
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return size;
}

function MoreModal({ setShowModal, targetBuild }) {
  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center">
      <div className="bg-white p-4 rounded-lg shadow-lg w-80">
        {targetBuild && (
          <div className="flex flex-col space-y-2">
            <BuildOptions buildStatus={targetBuild.status} />
            <button
              className="btn btn-error w-full mt-2"
              onClick={() => setShowModal(false)}
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function Builds({ builds, setBuilds }) {
  const [listView, setListView] = useState(false);
  const [searchInput, setSearchInput] = useState("");

  const [showMoreModal, setShowMoreModal] = useState(false);
  const [showAddBuildModal, setShowAddBuildModal] = useState(false);
  const [targetBuild, setTargetBuild] = useState(null);

  const { windowWidth, windowHeight } = useWindowSize();

  const [wasGrid, setWasGrid] = useState(false);

  const [filteredBuilds, setFilteredBuilds] = useState([]);

  useEffect(() => {
    if (windowWidth < 640) {
      if (listView == false) setWasGrid(true);
      setListView(true);
    } else if (wasGrid) {
      setListView(false);
      setWasGrid(false);
    }
  }, [windowWidth]);

  useEffect(() => {
    setFilteredBuilds(
      builds.filter((build) =>
        build.title.toLowerCase().includes(searchInput.toLowerCase())
      )
    );
  }, [searchInput, builds]);

  const listViewStyle =
    "flex flex-col items-center justify-center w-full gap-3 max-w-156";
  const gridViewStyle =
    "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-3 items-baseline justify-center";

  return (
    <>
      {showMoreModal && (
        <MoreModal setShowModal={setShowMoreModal} targetBuild={targetBuild} />
      )}
      <AddBuild
        showModal={showAddBuildModal}
        setShowModal={setShowAddBuildModal}
        setBuilds={setBuilds}
      />
      <div className="flex flex-col gap-5 justify-center items-center">
        <BuildsHeader
          searchInput={searchInput}
          setSearchInput={setSearchInput}
          listView={listView}
          setListView={setListView}
          windowWidth={windowWidth}
          setShowAddBuildModal={setShowAddBuildModal}
        />

        <div className={`builds ${listView ? listViewStyle : gridViewStyle}`}>
          {filteredBuilds && filteredBuilds.length > 0 ? (
            filteredBuilds.map((build) => (
              <Build
                key={build.id}
                id={build.id}
                build={build}
                listView={listView}
                windowWidth={windowWidth}
                setShowMoreModal={setShowMoreModal}
                setTargetBuild={setTargetBuild}
              />
            ))
          ) : (
            <p className="text-center text-gray-500 col-span-full">
              No builds match your search.
            </p>
          )}
        </div>
      </div>
    </>
  );
}
