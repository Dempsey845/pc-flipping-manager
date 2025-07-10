import { useState, useRef, useEffect } from "react";
import ImageUploader from "./ui/ImageUploader";
import FloatingLabelDropdown from "./ui/FloatingLabelDropdown";
import FloatingLabelInput from "./ui/FloatingLabelInput";
import PriceBreakdown from "./PriceBreakdown";
import TextArea from "./ui/TextArea";
import { createBuild } from "../helpers/build";

export default function AddBuild({ showModal, setShowModal, setBuilds }) {
  const [titleInput, setTitleInput] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [sellPrice, setSellPrice] = useState("");
  const [totalCost, setTotalCost] = useState(0);
  const [listDateTime, setListDateTime] = useState("");
  const [soldDateTime, setSoldDateTime] = useState("");

  const options = ["For sale", "Sold"];
  const modalRef = useRef(null);

  // Handle outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setShowModal(false);
      }
    }

    if (showModal) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showModal, setShowModal]);

  const addBuild = () => {
    console.log(selectedStatus);
    const buildData = {
      id: 72,
      title: titleInput,
      price: totalCost,
      status: selectedStatus,
      listDate: listDateTime
        ? Math.floor(new Date(listDateTime).getTime() / 1000)
        : null,
      soldDate: soldDateTime
        ? Math.floor(new Date(soldDateTime).getTime() / 1000)
        : null,

      imageSrc: "",
      timeSinceSold: null,
      timeSinceSoldSeconds: null,
    };

    const processedBuild = createBuild(buildData);
    setBuilds((prev) => [...prev, processedBuild]);
    console.log(`Created new build`, processedBuild);
  };

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 bg-black/70 overflow-scroll z-50 flex items-center justify-center">
      <div
        ref={modalRef}
        className="add-build overflow-scroll flex flex-col gap-6 max-h-10/12 max-w-4xl mx-auto p-6 bg-white rounded-2xl shadow-md"
      >
        <div className="flex flex-col md:flex-row w-full gap-4">
          <FloatingLabelInput
            label="Title"
            value={titleInput}
            onChange={(e) => setTitleInput(e.target.value)}
            id="title"
            className="flex-1"
          />
          <FloatingLabelDropdown
            label="Status"
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            id="dropdown"
            options={options}
            className="flex-1"
          />
        </div>

        <div className="flex flex-col md:flex-row gap-4 w-full">
          <div className="w-full md:w-1/2">
            <ImageUploader />
          </div>
          <div className="w-full md:w-1/2">
            <TextArea placeholder="Notes" />
          </div>
        </div>

        <div className="w-full">
          <PriceBreakdown
            sellPrice={sellPrice}
            setSellPrice={setSellPrice}
            totalCost={totalCost}
            setTotalCost={setTotalCost}
          />
        </div>

        <div className="flex flex-col md:flex-row gap-4 w-full">
          <div className="flex-1">
            <label className="block text-sm text-gray-700 mb-1">
              List Date & Time
            </label>
            <input
              type="datetime-local"
              value={listDateTime}
              onChange={(e) => setListDateTime(e.target.value)}
              className="w-full border px-3 py-2 rounded-lg shadow-sm"
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm text-gray-700 mb-1">
              Sold Date & Time
            </label>
            <input
              type="datetime-local"
              value={soldDateTime}
              onChange={(e) => setSoldDateTime(e.target.value)}
              className="w-full border px-3 py-2 rounded-lg shadow-sm"
            />
          </div>
        </div>

        <div className="w-full">
          <button onClick={() => addBuild()} className="btn btn-primary-2">
            Add Build
          </button>
        </div>
      </div>
    </div>
  );
}
