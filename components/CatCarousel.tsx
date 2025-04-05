"use client";
import { useState, useEffect } from "react";
import { Box, IconButton } from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import CatCard from "./CatCard";
import { Cat, fetchRandomCat } from "../api/services/catApi";
import Loading from "@/app/loading";

export default function CatCarousel() {
  const [cats, setCats] = useState<Cat[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [prefetching, setPrefetching] = useState<boolean>(false);

  // Fetch initial cat on component mount
  useEffect(() => {
    // Load first cat immediately
    fetchNextCat();
  }, []);

  // prefetch next cat whenever we display a new one
  useEffect(() => {
    // If weve displayed a cat and there's no next one queued up, prefetch
    if (cats.length > 0 && currentIndex >= cats.length - 1 && !prefetching) {
      prefetchNextCat();
    }
  }, [cats, currentIndex, prefetching]);

  const fetchNextCat = async () => {
    setLoading(true);
    try {
      const newCat = await fetchRandomCat();
      if (newCat) {
        setCats((prevCats) => [...prevCats, newCat]);
      } else {
        throw new Error("No cat returned from API");
      }
    } catch (err) {
      console.error("Error fetching cat:", err);
    } finally {
      setLoading(false);
    }
  };

  const prefetchNextCat = async () => {
    setPrefetching(true);
    try {
      const newCat = await fetchRandomCat();
      if (newCat) {
        setCats((prevCats) => [...prevCats, newCat]);
      }
    } catch (err) {
      console.error("Error prefetching next cat:", err);
    } finally {
      setPrefetching(false);
    }
  };

  const handleNext = () => {
    // Check if we need to wait for a cat to load
    if (currentIndex === cats.length - 1 && prefetching) {
      // Don't increment yet if we're still loading the next cat
      return;
    }

    // otherwise move to the next cat
    setCurrentIndex(currentIndex + 1);
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <Box sx={{ width: { sm: "100%", md: "80%" }, margin: "0 auto" }}>
      <Box
        sx={{ display: "flex", alignItems: "center", gap: { xs: 1, sm: 2 } }}
      >
        <IconButton
          onClick={handlePrevious}
          sx={{
            color: "white",
            backgroundColor: "rgba(0, 0, 0, 0.4)",
            "&:hover": {
              color: "primary.main",
            },
          }}
        >
          <ArrowBackIos fontSize="large" />
        </IconButton>

        <Box sx={{ flexGrow: 1 }}>
          <CatCard cat={cats[currentIndex]} />
        </Box>

        <IconButton
          onClick={handleNext}
          sx={{
            color: "white",
            backgroundColor: "rgba(0, 0, 0, 0.4)",
            "&:hover": {
              color: "primary.main",
            },
          }}
        >
          <ArrowForwardIos fontSize="large" />
        </IconButton>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mt: 2,
        }}
      ></Box>
    </Box>
  );
}
