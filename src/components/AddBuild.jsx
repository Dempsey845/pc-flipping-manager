import { useState } from "react";
import ImageUploader from "./ui/ImageUploader";
import FloatingLabelDropdown from "./ui/FloatingLabelDropdown";
import FloatingLabelInput from "./ui/FloatingLabelInput";
import PriceBreakdown from "./PriceBreakdown";

export default function AddBuild() {
  const [titleInput, setTitleInput] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const options = ["Pending", "For Sale", "Sold"];

  return (
    <div className="add-build flex flex-col gap-5 items-center justify-center">
      <div className="flex w-full h-full gap-5 justify-center">
        <FloatingLabelInput
          label="Title"
          value={titleInput}
          onChange={(e) => setTitleInput(e.target.value)}
          id="title"
        />
        <FloatingLabelDropdown
          label="Status"
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          id="dropdown"
          options={options}
        />
      </div>

      <ImageUploader />

      <PriceBreakdown />
    </div>
  );
}
