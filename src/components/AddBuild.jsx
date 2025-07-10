import { useState, useRef, useEffect } from "react";
import ImageUploader from "./ui/ImageUploader";
import FloatingLabelDropdown from "./ui/FloatingLabelDropdown";
import FloatingLabelInput from "./ui/FloatingLabelInput";
import PriceBreakdown from "./PriceBreakdown";
import TextArea from "./ui/TextArea";

export default function AddBuild({ showModal, setShowModal }) {
  const [titleInput, setTitleInput] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const options = ["Pending", "For Sale", "Sold"];
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
          <PriceBreakdown />
        </div>
      </div>
    </div>
  );
}
