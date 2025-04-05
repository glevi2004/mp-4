"use client";
import { Container, Typography, Box } from "@mui/material";
import { Pets } from "@mui/icons-material";
import CatCarousel from "../components/CatCarousel";
import styles from "./page.module.css";

export default function Home() {
  return (
    <Container className={styles.container}>
      <Box className={styles.main}>
        {/* Title with cat icon */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mb: 1,
            gap: 1.5,
          }}
        >
          <Pets sx={{ fontSize: 36, color: "pink" }} />
          <Typography
            variant="h2"
            gutterBottom
            className={styles.title}
            sx={{
              mb: 0,
              fontSize: "3rem",
            }}
          >
            Cat as a Service
          </Typography>
        </Box>

        <Typography
          variant="subtitle1"
          gutterBottom
          className={styles.subtitle}
          sx={{
            fontStyle: "italic",
            mb: 4,
          }}
        >
          Your daily dose of cat cuteness! 🐾{" "}
        </Typography>

        <CatCarousel />
      </Box>
    </Container>
  );
}
