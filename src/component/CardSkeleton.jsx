import React from "react";
import { Skeleton, Box } from "@mui/material";

export const CardSkeleton = ({ height = 445 }) => {
  return (
    <Box
      sx={{
        width: "100%",
        height: height,
        borderRadius: 4,
        overflow: "hidden",
      }}
    >
      <Skeleton
        variant="rectangular"
        width="100%"
        height={76}
        animation="wave"
      />
      <Box sx={{ p: 3 }}>
        {[...Array(4)].map((_, index) => (
          <Box key={index} sx={{ mb: 3 }}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
              <Skeleton variant="circular" width={40} height={40} />
              <Box sx={{ ml: 2, flexGrow: 1 }}>
                <Skeleton variant="text" width="60%" height={24} />
                <Skeleton variant="text" width="40%" height={20} />
              </Box>
            </Box>
            <Skeleton variant="text" width="80%" height={20} />
            <Skeleton variant="text" width="70%" height={20} />
            <Skeleton variant="text" width="60%" height={20} />
          </Box>
        ))}
      </Box>
    </Box>
  );
};
