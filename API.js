const API_URL = "http://localhost:3000"; // Adresse du backend

export async function generateCode(prompt) {
    try {
        const response = await fetch(`${API_URL}/generate-code`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ prompt }),
        });

        if (!response.ok) {
            throw new Error("Erreur lors de la génération du code");
        }

        const data = await response.json();
        return data.code;
    } catch (error) {
        console.error("Erreur API:", error);
        return null;
    }
}
