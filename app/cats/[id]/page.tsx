"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

import {
  Box,
  Typography,
  Paper,
  Container,
  Divider,
  Chip,
  Button,
  CircularProgress,
} from "@mui/material";
import { Cat, fetchCatById } from "../../../api/services/catApi";
import {
  Pets,
  Public,
  Favorite,
  AccessTime,
  ArrowBack,
} from "@mui/icons-material";
import Image from "next/image";
import Loading from "@/app/loading";
import Head from "next/head";

export default function CatPage() {
  const { id } = useParams();
  const [cat, setCat] = useState<Cat | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadCat() {
      setLoading(true);
      try {
        const catData = await fetchCatById(id as string);
        setCat(catData);
      } catch (err) {
        console.error("Failed to load cat:", err);
        setError("Could not load this cat's information.");
      } finally {
        setLoading(false);
      }
    }
    loadCat();
  }, [id]);

  if (loading) {
    return <Loading />;
  }

  if (error || !cat) {
    return (
      <Container maxWidth="md" sx={{ py: 5, textAlign: "center" }}>
        <Typography variant="h5" color="error" gutterBottom>
          Oops! Something went wrong
        </Typography>
        <Typography>{error || "Cat not found"}</Typography>
        <Button
          component={Link}
          href="/"
          startIcon={<ArrowBack />}
          sx={{ mb: 3 }}
        >
          Back to cats
        </Button>
      </Container>
    );
  }

  const breed = cat.breeds && cat.breeds.length > 0 ? cat.breeds[0] : null;
  const title = breed
    ? `${breed.name} Cat | Cat as a Service`
    : "Mystery Cat | Cat as a Service";
  const description = "Learn more about this lovely cat";

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Head>
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Button
          component={Link}
          href="/"
          startIcon={<ArrowBack />}
          sx={{ mb: 3 }}
        >
          Back to cats
        </Button>

        <Paper
          elevation={2}
          sx={{
            borderRadius: 4,
            overflow: "hidden",
          }}
        >
          <Box sx={{ position: "relative", width: "100%", height: 400 }}>
            <Image
              src={cat.url}
              alt={breed ? `A ${breed.name} cat` : "A cat"}
              fill
              style={{ objectFit: "cover" }}
              priority
            />
          </Box>

          <Box sx={{ p: 4 }}>
            {breed ? (
              <>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: { xs: "column", sm: "row" },
                    alignItems: { xs: "start", sm: "center" },
                    mb: 2,
                    gap: 2,
                    justifyContent: "space-between",
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Pets sx={{ color: "pink", mr: 2, fontSize: 30 }} />
                    <Typography variant="h4" component="h1">
                      {breed.name}
                    </Typography>
                  </Box>

                  <Chip
                    icon={<Public />}
                    label={breed.origin}
                    sx={{
                      borderRadius: "16px",
                      px: 1,
                    }}
                  />
                </Box>

                <Divider sx={{ my: 3 }} />

                <Box sx={{ mb: 3 }}>
                  <Typography variant="h6" gutterBottom>
                    Temperament
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ color: "text.secondary", fontStyle: "italic" }}
                  >
                    "{breed.temperament}"
                  </Typography>
                </Box>

                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 4 }}>
                  <Chip
                    icon={<Favorite fontSize="small" />}
                    label={`Life span: ${breed.life_span} years`}
                    sx={{
                      borderRadius: 4,
                    }}
                  />

                  <Chip
                    icon={<AccessTime fontSize="small" />}
                    label={`Weight: ${breed.weight.metric} kg`}
                    sx={{
                      borderRadius: 4,
                    }}
                  />
                </Box>

                {breed.wikipedia_url && (
                  <Button
                    variant="outlined"
                    href={breed.wikipedia_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    startIcon={<Pets />}
                    sx={{ mt: 2 }}
                  >
                    Learn more on Wikipedia
                  </Button>
                )}
              </>
            ) : (
              <Box sx={{ textAlign: "center", py: 3 }}>
                <Typography variant="h5" gutterBottom>
                  Mystery Cat
                </Typography>
                <Typography>
                  This cat has no breed information available, but it's still
                  adorable!
                </Typography>
              </Box>
            )}

            <Divider sx={{ my: 3 }} />

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: 2,
              }}
            >
              <Box>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  display="block"
                >
                  Image ID
                </Typography>
                <Typography variant="body2">{cat.id}</Typography>
              </Box>

              <Box>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  display="block"
                >
                  Image Dimensions
                </Typography>
                <Typography variant="body2">
                  {cat.width} × {cat.height} px
                </Typography>
              </Box>
            </Box>
          </Box>
        </Paper>
      </Container>
    </>
  );
}
