import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";

const Slideshow = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Centralized media array (includes both images and video)
  const media = [
    "/assets/slideshow/img19.jpg",
    "/assets/slideshow/img20.jpg",
    "/assets/slideshow/img21.jpg", // Example video file
    "/assets/slideshow/img23.jpg",
    "/assets/slideshow/vdo4.mp4",
    "/assets/slideshow/vdo5.mp4", // Example video file
    "/assets/slideshow/img5.jpg",
    "/assets/slideshow/img6.jpg",
    "/assets/slideshow/img7.jpg",
    "/assets/slideshow/img8.jpg",
    "/assets/slideshow/img9.jpg",
  ];

  // Cycle through media every 4 seconds
  useEffect(() => {
    const delay = media[currentIndex].type === "video" ? 6000 : 4000;
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % media.length);
    }, delay); // Change slide every 4 seconds

    return () => clearInterval(interval); // Cleanup on component unmount
  }, [currentIndex.length]);

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        height: "100%",
        overflow: "hidden",
        borderRadius: "12px",
      }}
    >
      {media.map((src, index) => {
        const isVideo = src.endsWith(".mp4") || src.endsWith(".webm"); // Check for video file extension
        return isVideo ? (
          <Box
            key={index}
            component="video"
            src={src}
            alt={`Slide ${index + 1}`}
            autoPlay
            muted
            loop
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              opacity: currentIndex === index ? 1 : 0, // Show the current video
              transition: "opacity 1s ease-in-out",
            }}
          />
        ) : (
          <Box
            key={index}
            component="img"
            src={src}
            alt={`Slide ${index + 1}`}
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              opacity: currentIndex === index ? 1 : 0, // Show the current image
              transition: "opacity 1s ease-in-out",
            }}
          />
        );
      })}
    </Box>
  );
};

export default Slideshow;
