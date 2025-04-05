"use client";
import { useState } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Button,
  Avatar,
} from "@mui/material";
import { Pets, Public } from "@mui/icons-material";
import { Cat } from "../api/services/catApi";
import Link from "next/link"; // Import Link from next/link instead of useRouter

interface CatCardProps {
  cat: Cat;
}

export default function CatCard({ cat }: CatCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const breed = cat.breeds && cat.breeds.length > 0 ? cat.breeds[0] : null;

  return (
    <Card
      sx={{
        maxWidth: 600,
        margin: "0 auto",
        borderRadius: 4,
        overflow: "hidden",
        transition: "transform 0.3s ease-in-out",
        "&:hover": {
          transform: "translateY(-5px)", // move a lil up when hoevred
        },
      }}
    >
      <Box sx={{ position: "relative", paddingTop: "65%" }}>
        {!imageLoaded && (
          <Box
            sx={{
              position: "absolute",
              width: "100%",
              height: "100%",
            }}
          />
        )}
        <CardMedia
          component="img"
          image={cat.url}
          alt={breed ? `A ${breed.name} cat` : "A cat"}
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: imageLoaded ? "block" : "none",
            transition: "transform 0.5s ease",
            "&:hover": {
              transform: "scale(1.05)",
            },
          }}
          onLoad={() => setImageLoaded(true)}
        />

        {/* Cute paw badge for breed info */}
        {breed && (
          <Box
            sx={{
              position: "absolute",
              top: 16,
              right: 16,
              backgroundColor: "black",
              borderRadius: "50%",
              width: 40,
              height: 40,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Pets sx={{ color: "white" }} />
          </Box>
        )}
      </Box>

      <CardContent sx={{ p: 3 }}>
        {breed ? (
          <>
            <Typography
              variant="h5"
              gutterBottom
              sx={{
                fontWeight: 700,
              }}
            >
              {breed.name}
            </Typography>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                mb: 2,
                color: "text.secondary",
              }}
            >
              <Public fontSize="small" sx={{ mr: 1 }} />
              <Typography variant="body2">{breed.origin}</Typography>
            </Box>

            <Button
              component={Link}
              href={`/cats/${cat.id}`}
              variant="contained"
              fullWidth
              sx={{
                mt: 2,
                borderRadius: 8,
                py: 1.5,
                fontSize: 16,
                color: "white",
                fontWeight: 600,
                textTransform: "none",
              }}
              endIcon={<Pets />}
            >
              Learn more about {breed.name}
            </Button>
          </>
        ) : (
          <Box sx={{ textAlign: "center", py: 2 }}>
            <Avatar
              sx={{
                width: 60,
                height: 60,
                margin: "0 auto 1rem auto",
                bgcolor: "gray",
              }}
            >
              <Pets sx={{ fontSize: 32, color: "white" }} />
            </Avatar>
            <Typography variant="body1" sx={{ mb: 1, fontWeight: 500 }}>
              Mystery Cat
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary", mb: 2 }}>
              No breed information available.
            </Typography>
            <Button
              component={Link}
              href={`/cats/${cat.id}`}
              variant="outlined"
              fullWidth
              sx={{
                borderRadius: 8,
                borderColor: "rgba(173,216,230,0.5)",
                color: "#555",
                "&:hover": {
                  borderColor: "lightblue",
                  backgroundColor: "rgba(173,216,230,0.1)",
                },
              }}
            >
              View Cat Details
            </Button>
          </Box>
        )}
      </CardContent>
    </Card>
  );
}
