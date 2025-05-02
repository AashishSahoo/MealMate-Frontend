import React, { useState, useEffect } from "react";
import { Box, useTheme } from "@mui/material";

const Slideshow = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const theme = useTheme();

  const media = [
    "../assets/slideshow/img19.jpg",
    "../assets/slideshow/img20.jpg",
    "../assets/slideshow/img21.jpg", // Example video file
    "../assets/slideshow/img23.jpg",
    "../assets/slideshow/vdo4.mp4",
    "../assets/slideshow/vdo5.mp4", // Example video file
    "../assets/slideshow/img5.jpg",
    "../assets/slideshow/img6.jpg",
    "../assets/slideshow/img7.jpg",
    "../assets/slideshow/img8.jpg",
    "../assets/slideshow/img9.jpg",
  ];

  useEffect(() => {
    const isVideo =
      media[currentIndex].endsWith(".mp4") ||
      media[currentIndex].endsWith(".webm");
    const delay = isVideo ? 6000 : 4000;
    const timer = setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % media.length);
    }, delay);

    return () => clearTimeout(timer);
  }, [currentIndex, media.length]);

  return (
    <Box
      sx={{
        height: "95vh",
        position: "relative", // Ensure absolutely positioned children align properly
        backgroundColor: theme.palette.background.default,
        flex: 1,
        overflow: "hidden",
      }}
    >
      {media.map((src, index) => {
        const isVideo = src.endsWith(".mp4") || src.endsWith(".webm");
        return (
          <Box
            key={index}
            component={isVideo ? "video" : "img"}
            src={src}
            alt={`Slide ${index}`}
            sx={{
              position: "absolute",
              width: "100%",
              height: "100%",
              objectFit: "cover",
              opacity: currentIndex === index ? 1 : 0,
              transition: "opacity 1s ease-in-out",
              filter: "grayscale(20%)",
            }}
            {...(isVideo && { autoPlay: true, muted: true, loop: true })}
          />
        );
      })}
    </Box>
  );
};

export default Slideshow;
