import { useEffect, useState } from "react";
import Build from "./Build";
import BuildOptions from "./BuildOptions";

const testBuild = {
  title: "Custom Gaming PC | Ryzen 5 | GTX 1070 | 16GB DDR4 | 1TB",
  price: 415,
  status: "For sale",
  listDate: "26/06",
  imageSrc:
    "https://scontent-man2-1.xx.fbcdn.net/v/t45.5328-4/498714416_1396967997920745_3329994914885161320_n.jpg?stp=dst-jpg_p960x960_tt6&_nc_cat=105&ccb=1-7&_nc_sid=247b10&_nc_ohc=9ig94iC6KGIQ7kNvwEjNfvi&_nc_oc=AdkQvZq7ram7FEA-39bxlyv-q9ePh_yOnSkZm-Dhsh1CWhS8B6lv4PC-4Hv-nHLjwXE&_nc_zt=23&_nc_ht=scontent-man2-1.xx&_nc_gid=BZSCNvOhJq-f07EJ3_SZCA&oh=00_AfMAjSFirBCobwZSyAuwj5wq6V_zt61zxQEd_Qavk_7mUA&oe=6865A426",
};

const testBuild2 = {
  title: "Custom Gaming PC | Ryzen 7 | GTX 1080ti | 16GB DDR4 | 1TB",
  price: 600,
  status: "For sale",
  listDate: "26/06",
  imageSrc:
    "https://scontent-man2-1.xx.fbcdn.net/v/t45.5328-4/498714416_1396967997920745_3329994914885161320_n.jpg?stp=dst-jpg_p960x960_tt6&_nc_cat=105&ccb=1-7&_nc_sid=247b10&_nc_ohc=9ig94iC6KGIQ7kNvwEjNfvi&_nc_oc=AdkQvZq7ram7FEA-39bxlyv-q9ePh_yOnSkZm-Dhsh1CWhS8B6lv4PC-4Hv-nHLjwXE&_nc_zt=23&_nc_ht=scontent-man2-1.xx&_nc_gid=BZSCNvOhJq-f07EJ3_SZCA&oh=00_AfMAjSFirBCobwZSyAuwj5wq6V_zt61zxQEd_Qavk_7mUA&oe=6865A426",
};

const testBuild3 = {
  title: "Custom Gaming PC | Ryzen 3 | RTX 2060 | 16GB DDR4 | 1TB",
  price: 300,
  status: "Sold",
  listDate: "26/06",
  imageSrc:
    "https://scontent-man2-1.xx.fbcdn.net/v/t45.5328-4/498714416_1396967997920745_3329994914885161320_n.jpg?stp=dst-jpg_p960x960_tt6&_nc_cat=105&ccb=1-7&_nc_sid=247b10&_nc_ohc=9ig94iC6KGIQ7kNvwEjNfvi&_nc_oc=AdkQvZq7ram7FEA-39bxlyv-q9ePh_yOnSkZm-Dhsh1CWhS8B6lv4PC-4Hv-nHLjwXE&_nc_zt=23&_nc_ht=scontent-man2-1.xx&_nc_gid=BZSCNvOhJq-f07EJ3_SZCA&oh=00_AfMAjSFirBCobwZSyAuwj5wq6V_zt61zxQEd_Qavk_7mUA&oe=6865A426",
};

const testBuild4 = {
  title: "Budget Build | i5 | RX 580 | 8GB DDR4 | 512GB SSD",
  price: 320,
  status: "Sold",
  listDate: "20/06",
  imageSrc:
    "https://scontent-man2-1.xx.fbcdn.net/v/t45.5328-4/498714416_1396967997920745_3329994914885161320_n.jpg?stp=dst-jpg_p960x960_tt6&_nc_cat=105&ccb=1-7&_nc_sid=247b10&_nc_ohc=9ig94iC6KGIQ7kNvwEjNfvi&_nc_oc=AdkQvZq7ram7FEA-39bxlyv-q9ePh_yOnSkZm-Dhsh1CWhS8B6lv4PC-4Hv-nHLjwXE&_nc_zt=23&_nc_ht=scontent-man2-1.xx&_nc_gid=BZSCNvOhJq-f07EJ3_SZCA&oh=00_AfMAjSFirBCobwZSyAuwj5wq6V_zt61zxQEd_Qavk_7mUA&oe=6865A426",
};

const testBuild5 = {
  title: "High-End Build | Ryzen 7 | RTX 3070 | 32GB DDR4 | 2TB NVMe",
  price: 950,
  status: "For sale",
  listDate: "15/06",
  imageSrc: "your-image-url.jpg",
};

function BuildsHeader({
  searchInput,
  setSearchInput,
  listView,
  setListView,
  windowWidth,
}) {
  return (
    <div className="builds-header flex justify-between bg-white p-3 items-center rounded-lg">
      <h1 className="font-bold">Your builds</h1>
      <div className="flex right-side">
        {windowWidth >= 640 && (
          <div className="flex gap-2 mx-2">
            <button
              onClick={() => setListView(true)}
              className={`list-view btn ${
                listView ? "btn-primary-2" : "btn-primary"
              }`}
            >
              List
            </button>
            <button
              onClick={() => setListView(false)}
              className={`list-view btn ${
                listView ? "btn-primary" : "btn-primary-2"
              }`}
            >
              Grid
            </button>
          </div>
        )}
        <div className="flex search-bar bg-gray-200 rounded-full p-2">
          <input
            onChange={(e) => setSearchInput(e.target.value)}
            className="search-builds"
            type="text"
            placeholder="Search your builds"
            value={searchInput}
          />
        </div>
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

export default function Builds() {
  const [listView, setListView] = useState(false);
  const [searchInput, setSearchInput] = useState("");

  const [showMoreModal, setShowMoreModal] = useState(false);
  const [targetBuild, setTargetBuild] = useState(null);

  const { windowWidth, windowHeight } = useWindowSize();

  useEffect(() => {
    if (windowWidth < 640) {
      setListView(true);
    }
  }, [windowWidth]);

  const listViewStyle =
    "flex flex-col items-center justify-center w-full gap-3";
  const gridViewStyle =
    "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-3";

  const allBuilds = [testBuild, testBuild2, testBuild3, testBuild4, testBuild5];

  const filteredBuilds = allBuilds.filter((build) =>
    build.title.toLowerCase().includes(searchInput.toLowerCase())
  );

  return (
    <>
      {showMoreModal && (
        <MoreModal setShowModal={setShowMoreModal} targetBuild={targetBuild} />
      )}
      <div className="flex flex-col gap-5">
        <BuildsHeader
          searchInput={searchInput}
          setSearchInput={setSearchInput}
          listView={listView}
          setListView={setListView}
          windowWidth={windowWidth}
        />

        <div className={`builds ${listView ? listViewStyle : gridViewStyle}`}>
          {filteredBuilds.length > 0 ? (
            filteredBuilds.map((build, index) => (
              <Build
                key={index}
                id={build.price + index}
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
