import { useRef, useState, useCallback } from "react";

export default function ImageUploader({ onImageSelect }) {
  const [previewUrl, setPreviewUrl] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef(null);

  const handleFiles = useCallback(
    (files) => {
      const file = files[0];
      if (file && file.type.startsWith("image/")) {
        const url = URL.createObjectURL(file);
        setPreviewUrl(url);
        if (onImageSelect) onImageSelect(file);
      }
    },
    [onImageSelect]
  );

  const handleInputChange = (e) => {
    handleFiles(e.target.files);
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleClick = () => {
    inputRef.current.click();
  };

  return (
    <div
      className={`border border-gray-300 ${
        dragActive ? "border-gray-500 bg-gray-50" : "hover:border-gray-500"
      } cursor-pointer flex flex-col w-48 h-48 items-center justify-center relative`}
      onClick={handleClick}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
    >
      {previewUrl ? (
        <img
          src={previewUrl}
          alt="preview"
          className="object-cover w-full h-full"
        />
      ) : (
        <>
          <p>Add Photo</p>
          <p>or drag and drop</p>
        </>
      )}
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        className="hidden"
        onChange={handleInputChange}
      />
    </div>
  );
}
