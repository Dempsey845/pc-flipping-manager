import { useEffect, useState } from "react";
import "./App.css";
import Analytics from "./components/Analytics";
import Builds from "./components/Builds";
import { calculateAverageTimeToSell, createBuild } from "./helpers/build";

const testBuild = {
  id: 1,
  title: "Custom Gaming PC | Ryzen 5 | GTX 1070 | 16GB DDR4 | 1TB",
  price: 415,
  status: "Sold",
  listDate: 1751448766,
  soldDate: 1751448776, // 1749989231
  timeSinceSold: null,
  imageSrc:
    "https://scontent-man2-1.xx.fbcdn.net/v/t45.5328-4/498714416_1396967997920745_3329994914885161320_n.jpg?stp=dst-jpg_p960x960_tt6&_nc_cat=105&ccb=1-7&_nc_sid=247b10&_nc_ohc=9ig94iC6KGIQ7kNvwEjNfvi&_nc_oc=AdkQvZq7ram7FEA-39bxlyv-q9ePh_yOnSkZm-Dhsh1CWhS8B6lv4PC-4Hv-nHLjwXE&_nc_zt=23&_nc_ht=scontent-man2-1.xx&_nc_gid=BZSCNvOhJq-f07EJ3_SZCA&oh=00_AfMAjSFirBCobwZSyAuwj5wq6V_zt61zxQEd_Qavk_7mUA&oe=6865A426",
};

const testBuild2 = {
  id: 2,
  title: "Custom Gaming PC | Ryzen 7 | GTX 1080ti | 16GB DDR4 | 1TB",
  price: 600,
  status: "For sale",
  listDate: 1749439050,
  soldDate: null, // 1749469050
  timeSinceSold: null,
  imageSrc:
    "https://scontent-man2-1.xx.fbcdn.net/v/t45.5328-4/498714416_1396967997920745_3329994914885161320_n.jpg?stp=dst-jpg_p960x960_tt6&_nc_cat=105&ccb=1-7&_nc_sid=247b10&_nc_ohc=9ig94iC6KGIQ7kNvwEjNfvi&_nc_oc=AdkQvZq7ram7FEA-39bxlyv-q9ePh_yOnSkZm-Dhsh1CWhS8B6lv4PC-4Hv-nHLjwXE&_nc_zt=23&_nc_ht=scontent-man2-1.xx&_nc_gid=BZSCNvOhJq-f07EJ3_SZCA&oh=00_AfMAjSFirBCobwZSyAuwj5wq6V_zt61zxQEd_Qavk_7mUA&oe=6865A426",
};

const testBuild3 = {
  id: 3,
  title: "Custom Gaming PC | Ryzen 3 | RTX 2060 | 16GB DDR4 | 1TB",
  price: 300,
  status: "Sold",
  listDate: 1750411655,
  soldDate: 1750671655,
  timeSinceSold: null,
  imageSrc:
    "https://scontent-man2-1.xx.fbcdn.net/v/t45.5328-4/498714416_1396967997920745_3329994914885161320_n.jpg?stp=dst-jpg_p960x960_tt6&_nc_cat=105&ccb=1-7&_nc_sid=247b10&_nc_ohc=9ig94iC6KGIQ7kNvwEjNfvi&_nc_oc=AdkQvZq7ram7FEA-39bxlyv-q9ePh_yOnSkZm-Dhsh1CWhS8B6lv4PC-4Hv-nHLjwXE&_nc_zt=23&_nc_ht=scontent-man2-1.xx&_nc_gid=BZSCNvOhJq-f07EJ3_SZCA&oh=00_AfMAjSFirBCobwZSyAuwj5wq6V_zt61zxQEd_Qavk_7mUA&oe=6865A426",
};

const testBuild4 = {
  id: 4,
  title: "Budget Build | i5 | RX 580 | 8GB DDR4 | 512GB SSD",
  price: 320,
  status: "Sold",
  listDate: 1749647802,
  soldDate: 1749907802,
  timeSinceSold: null,
  imageSrc:
    "https://scontent-man2-1.xx.fbcdn.net/v/t45.5328-4/498714416_1396967997920745_3329994914885161320_n.jpg?stp=dst-jpg_p960x960_tt6&_nc_cat=105&ccb=1-7&_nc_sid=247b10&_nc_ohc=9ig94iC6KGIQ7kNvwEjNfvi&_nc_oc=AdkQvZq7ram7FEA-39bxlyv-q9ePh_yOnSkZm-Dhsh1CWhS8B6lv4PC-4Hv-nHLjwXE&_nc_zt=23&_nc_ht=scontent-man2-1.xx&_nc_gid=BZSCNvOhJq-f07EJ3_SZCA&oh=00_AfMAjSFirBCobwZSyAuwj5wq6V_zt61zxQEd_Qavk_7mUA&oe=6865A426",
};

const testBuild5 = {
  id: 5,
  title: "High-End Build | Ryzen 7 | RTX 3070 | 32GB DDR4 | 2TB NVMe",
  price: 950,
  status: "For sale",
  listDate: 1750758420,
  soldDate: null, // 1750968420
  timeSinceSold: null,
  imageSrc: "your-image-url.jpg",
};

function App() {
  const [builds, setBuilds] = useState([]);
  const [avgTTS, setAvgTTS] = useState(null);

  useEffect(() => {
    const initialBuilds = [
      createBuild(testBuild),
      createBuild(testBuild2),
      createBuild(testBuild3),
      createBuild(testBuild4),
      createBuild(testBuild5),
    ];

    // TODO: only calculate this when a build is edited / added / deleted, save to user data and display (or when refresh stats button is pressed)
    const tts = calculateAverageTimeToSell(initialBuilds);
    console.log(tts.string);
    setAvgTTS(tts);

    setBuilds(initialBuilds);
  }, []);

  useEffect(() => {
    console.log("Builds updated");
  }, [builds]);

  return (
    <div className="app flex flex-col bg-gray-200 w-full h-full">
      <div className="content m-3 flex flex-col gap-15">
        <Analytics />
        <Builds builds={builds} setBuilds={setBuilds} />
      </div>
    </div>
  );
}

export default App;
