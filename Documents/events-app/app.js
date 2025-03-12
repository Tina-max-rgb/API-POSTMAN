const express = require("express");
const app = express();
const port = 3000;

// Configuration d'EJS
app.set("view engine", "ejs");
app.use(express.static("public"));

// Modèle de données (liste des événements)
const events = [
    { id: 1, title: "Conférence JAVASCRIPT", date: "2025-03-20", description: "Conférence sur les pratiques de javascript.", status: "actif" },
    { id: 2, title: "Atelier Pratique React", date: "2025-04-10", description: "Atelier pratique sur React.", status: "inactif" },
    { id: 3, title: "Meetup Node.js", date: "2025-05-05", description: "Rencontre entre développeurs Node.js.", status: "actif" },
];

// Route principale
app.get("/", (req, res) => {
    res.render("index", { events });
});

// Lancer le serveur
app.listen(port, () => {
    console.log(`Serveur démarré sur http://localhost:${port}`);
});
