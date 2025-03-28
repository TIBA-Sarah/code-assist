export async function generateCode(prompt) {
    try {
        const response = await fetch("http://localhost:5000/generate-code", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ prompt }),
        });

        const data = await response.json();
        return data.code;
    } catch (error) {
        console.error("Erreur lors de la génération du code:", error);
        return null;
    }
}
export async function loginUser(email, password) {
    try {
        const response = await fetch("http://localhost:5000/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();
        
        if (response.ok) {
            localStorage.setItem("token", data.token); // Stocker le token si connexion réussie
            return { success: true, message: "Connexion réussie !" };
        } else {
            return { success: false, message: data.message || "Échec de la connexion" };
        }
    } catch (error) {
        console.error("Erreur lors de la connexion :", error);
        return { success: false, message: "Erreur serveur" };
    }
}

