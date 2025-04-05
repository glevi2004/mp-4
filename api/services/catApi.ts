export interface Cat {
  id: string;
  url: string;
  width: number;
  height: number;
  breeds: Breed[];
}

export interface Breed {
  id: string;
  name: string;
  temperament: string;
  origin: string;
  life_span: string;
  weight: {
    imperial: string;
    metric: string;
  };
  wikipedia_url?: string;
  country_codes?: string;
  country_code?: string;
}

/**
 * Fetches a single random cat with breed information
 */
export async function fetchRandomCat(): Promise<Cat | null> {
  const apiKey = process.env.NEXT_PUBLIC_CAT_API_KEY;

  try {
    const response = await fetch(
      `https://api.thecatapi.com/v1/images/search?limit=1&has_breeds=1`,
      {
        headers: {
          "x-api-key": apiKey || "",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();
    return data.length > 0 ? data[0] : null;
  } catch (error) {
    console.error("Error fetching cat data:", error);
    return null;
  }
}

/**
 * Fetches a specific cat by ID
 */
export async function fetchCatById(id: string): Promise<Cat | null> {
  const apiKey = process.env.NEXT_PUBLIC_CAT_API_KEY;

  try {
    const response = await fetch(`https://api.thecatapi.com/v1/images/${id}`, {
      headers: {
        "x-api-key": apiKey || "",
      },
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Error fetching cat with ID ${id}:`, error);
    return null;
  }
}
