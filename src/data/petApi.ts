export interface DogApiResponse {
    message: string;
    status: "success" | "error";
}

export const fetchRandomDogImage = async (
    signal: AbortSignal
): Promise<string> => {
    const controllerTimeout = setTimeout(() => {
        throw new Error("Request timeout");
    }, 8000);

    const response = await fetch("https://dog.ceo/api/breeds/image/random", {
        signal,
    });

    clearTimeout(controllerTimeout);

    if (!response.ok) {
        throw new Error("Network error");
    }

    const json: DogApiResponse = await response.json();

    if (json.status !== "success") {
        throw new Error("API error");
    }

    return json.message;
};
