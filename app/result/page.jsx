"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { Camera, Image as ImageIcon } from "lucide-react";
import Diamond from "@/components/diamond";
import Headers from "@/components/header";
import { useRouter } from "next/navigation";

const Result = () => {
  const router = useRouter();
  const fileInputRef = useRef(null);
  const [previewImage, setPreviewImage] = useState(null); // Will store Base64 string
  const [isLoading, setIsLoading] = useState(false);
  const [apiProgress, setApiProgress] = useState(0);
  const [apiMessage, setApiMessage] = useState("");

  const handleCameraAccess = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        console.log("Camera access granted:", stream);
        // Future step: Show camera feed and capture image
      })
      .catch((error) => {
        console.error("Camera access denied:", error);
      });
  };

  const handleGalleryUpload = () => {
    fileInputRef.current.click();
  };

  // Convert the file to a Base64 string
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        setPreviewImage(base64String); // Now previewImage holds the Base64 string
      };
      reader.readAsDataURL(file);
    }
  };

  // Full-screen Loading Overlay with API Feedback
  const LoadingOverlay = () => (
    <div className="fixed inset-0 bg-white bg-opacity-90 flex flex-col justify-center items-center z-50">
      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
      {apiMessage && <p className="mt-4 text-lg font-medium">{apiMessage}</p>}
      {apiProgress > 0 && <p className="mt-2 text-sm">Progress: {apiProgress}%</p>}
    </div>
  );

  const handleProcessImage = async () => {
    if (!previewImage) return;
  
    setIsLoading(true);
    setApiMessage("Starting image processing...");
    setApiProgress(0);
  
    try {
      const response = await fetch(
        "https://us-central1-api-skinstric-ai.cloudfunctions.net/skinstricPhaseTwo",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ image: previewImage }), 
        }
      );
  
      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }
  
      const result = await response.json();
      localStorage.setItem("analysisResult", JSON.stringify(result));
  
      setApiMessage("Processing complete!");
      await new Promise((resolve) => setTimeout(resolve, 1000));
  
      router.push("/final");
    } catch (error) {
      console.error("Error processing image:", error);
      setApiMessage("An error occurred during processing.");
    } finally {
      setIsLoading(false);
      setApiProgress(0);
      setApiMessage("");
    }
  };
  
  return (
    <>
      <Headers />
      <div className="min-h-screen flex flex-col bg-white relative pt-[64px]">
        {isLoading && <LoadingOverlay />}
        <div className="absolute top-2 left-8 text-left">
          <p className="text-black font-semibold text-sm">TO START ANALYSIS</p>
        </div>

        <div className="flex flex-1 items-center justify-center relative mb-60">
          <div
            className="absolute left-[40%] -translate-x-full flex flex-col items-center cursor-pointer"
            onClick={handleCameraAccess}
          >
            <Diamond
              className="w-[300px] h-[300px] rotate-45 border-gray-300"
              dotted
              borderColorClass="border-gray-300"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <Camera className="w-12 h-12" />
              <div className="absolute top-[50%] right-[-90px] translate-y-[-20px]">
                <div className="w-[80px] h-[1px] bg-black"></div>
                <p className="text-[10px] font-semibold mt-1">
                  ALLOW A.I.<br />TO SCAN YOUR FACE
                </p>
              </div>
            </div>
          </div>

          <div
            className="absolute left-[60%] flex flex-col items-center cursor-pointer"
            onClick={handleGalleryUpload}
          >
            <Diamond
              className="w-[300px] h-[300px] rotate-45 border-gray-300"
              dotted
              borderColorClass="border-gray-300"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <ImageIcon className="w-12 h-12" />
              <div className="absolute top-[50%] left-[-90px] translate-y-[20px]">
                <div className="w-[80px] h-[1px] bg-black"></div>
                <p className="text-[10px] font-semibold mt-1">
                  ALLOW A.I.<br />ACCESS GALLERY
                </p>
              </div>
            </div>
          </div>

          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleFileChange}
          />
        </div>

        {previewImage && (
          <>
            <h1 className="absolute top-0 right-8 w-32 h-32 text-sm font-extrabold">
              Preview
            </h1>
            <div className="absolute top-6 right-8 w-32 h-32 border rounded overflow-hidden">
              <img
                src={previewImage}
                alt="Preview"
                className="object-cover w-full h-full"
              />
            </div>
          </>
        )}

        <div className="absolute bottom-24 left-8 flex items-center gap-1 scale-[0.75]">
          <div className="relative w-14 h-14 flex items-center justify-center border border-black rotate-45">
            <span className="absolute rotate-[-45deg] text-xs font-semibold">
              BACK
            </span>
          </div>
          <Link href="/" className="absolute inset-0" aria-label="Back" />
        </div>

        {previewImage && (
          <div
            className="absolute bottom-24 right-8 flex items-center gap-1 scale-[0.75] cursor-pointer"
            onClick={handleProcessImage}
          >
            <div className="relative w-14 h-14 flex items-center justify-center border border-black rotate-45">
              <span className="absolute rotate-[-45deg] text-xs font-semibold">
                PROCESS
              </span>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Result;
