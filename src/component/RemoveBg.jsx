import { removeBackground } from "@imgly/background-removal";
import React, { useState, useRef, useCallback } from "react";

const RemoveBg = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [processedImage, setProcessedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [imageType, setImageType] = useState("png");
  const [dragActive, setDragActive] = useState(false);

  const inputRef = useRef(null);

  const handleFileSelect = (file) => {
    if (file) {
      setSelectedFile(file);
      setSelectedImage(URL.createObjectURL(file));
      setProcessedImage(null);
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    handleFileSelect(file);
  };

  const handleBoxClick = () => {
    inputRef.current.click();
  };

  const handleDrag = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const file = e.dataTransfer.files?.[0];
    handleFileSelect(file);
  }, []);

  // 🔹 Background removal with pulse animation
  const handleRemovebg = async () => {
    if (!selectedFile) return alert("Please select an image first.");
    setLoading(true);
    try {
      const blob = await removeBackground(selectedFile);
      setProcessedImage(URL.createObjectURL(blob));
    } catch (error) {
      console.error("Background removal failed:", error);
      alert("Failed to remove background. Try again!");
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async () => {
    if (processedImage) {
      const response = await fetch(processedImage);
      const blob = await response.blob();
      const convertedBlob = await convertImageType(blob, imageType);

      const link = document.createElement("a");
      link.href = URL.createObjectURL(convertedBlob);
      link.download = `image_no_bg.${imageType}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const convertImageType = (blob, format) => {
    return new Promise((resolve) => {
      const img = new Image();
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        canvas.toBlob(
          (convertedBlob) => resolve(convertedBlob),
          `image/${format}`
        );
      };
      img.src = URL.createObjectURL(blob);
    });
  };

  return (
    <div className="p-4 flex flex-col gap-4 items-center text-white">
      <h1 className="text-lg font-semibold mb-3">
        Remove Background Component
      </h1>

      {/* 🔹 Upload / Processing / Result box */}
      <div
        className={`relative w-[370px] h-[456px] flex flex-col items-center justify-center rounded-2xl border-2 border-dashed transition-all cursor-pointer ${
          dragActive
            ? "border-blue-500 bg-blue-50"
            : "border-gray-300  hover:bg-gray-50"
        }`}
        onClick={handleBoxClick}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        {loading ? (
          <div className="flex flex-col items-center justify-center animate-pulse text-gray-700">
            <div className="w-16 h-16 bg-gray-300 rounded-full mb-4"></div>
            <p className="font-medium">Processing...</p>
          </div>
        ) : processedImage ? (
          <img
            src={processedImage}
            alt="Processed"
            className="object-contain w-full h-full rounded-2xl"
          />
        ) : selectedImage ? (
          <img
            src={selectedImage}
            alt="Preview"
            className="object-contain w-full h-full rounded-2xl"
          />
        ) : (
          <div className="flex flex-col items-center text-center p-6 pointer-events-none">
            <img
              src="https://cdn-icons-png.flaticon.com/512/2921/2921222.png"
              alt="Upload"
              className="w-16 h-16 mb-4 opacity-80"
            />
            <p className="text-gray-700 font-medium">
              Drag & Drop or{" "}
              <span className="text-blue-600 underline">browse</span>
            </p>
            <p className="text-gray-400 text-sm mt-2">
              Supports: JPEG, JPG, PNG
            </p>
          </div>
        )}

        {/* Hidden input */}
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
        />
      </div>

      {/* Buttons */}
      <div className="flex gap-3 mt-4">
        <button
          onClick={handleRemovebg}
          disabled={!selectedFile || loading}
          className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg disabled:opacity-50"
        >
          {loading ? "Removing..." : "Remove Background"}
        </button>

        <button
          onClick={handleDownload}
          disabled={!processedImage || loading}
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg disabled:opacity-50"
        >
          Download
        </button>
      </div>

      {/* Format Selector */}
      <div className="flex items-center gap-3 mt-2">
        <label htmlFor="type">File Type:</label>
        <select
          id="type"
          value={imageType}
          onChange={(e) => setImageType(e.target.value)}
          className="bg-transparent border border-gray-400 rounded p-1"
        >
          <option value="png">png</option>
          <option value="jpeg">jpeg</option>
          <option value="jpg">jpg</option>
          <option value="webp">webp</option>
        </select>
      </div>
    </div>
  );
};

export default RemoveBg;
