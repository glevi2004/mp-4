import { CircularProgress, Container, Typography } from "@mui/material";
import React from "react";

const Loading = () => {
  return (
    <Container
      maxWidth="md"
      sx={{
        height: "80vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CircularProgress size={40} />
      <Typography sx={{ mt: 2 }}>Loading cat information...</Typography>
    </Container>
  );
};

export default Loading;
