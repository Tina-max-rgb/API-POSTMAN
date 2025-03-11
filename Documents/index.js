// Importation des modules
const express = require('express');
const axios = require('axios');

// Initialisation de l'application
const app = express();
const port = 3000;
app.use(express.json());

// Données fictives des utilisateurs
let users = [
    { id: 1, name: "Tina", email: "bounoua.thinhinane@gmail.com" },
    { id: 2, name: "Alex", email: "alex24@gmail.com" }
];

// Récupérer tous les utilisateurs
app.get('/api/users', (req, res) => {
    res.json(users);
});

// Récupérer un utilisateur par son ID
app.get('/api/users/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) return res.status(404).json({ message: "Utilisateur non trouvé" });
    res.json(user);
});

// Ajouter un nouvel utilisateur
app.post('/api/users', (req, res) => {
    const { name, email } = req.body;
    if (!name || !email) return res.status(400).json({ message: "Nom et email requis" });
    const newUser = { id: users.length + 1, name, email };
    users.push(newUser);
    res.status(201).json(newUser);
});

// Mettre à jour un utilisateur existant
app.put('/api/users/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) return res.status(404).json({ message: "Utilisateur non trouvé" });
    
    const { name, email } = req.body;
    if (name) user.name = name;
    if (email) user.email = email;
    res.json(user);
});

// Supprimer un utilisateur
app.delete('/api/users/:id', (req, res) => {
    const userIndex = users.findIndex(u => u.id === parseInt(req.params.id));
    if (userIndex === -1) return res.status(404).json({ message: "Utilisateur non trouvé" });
    
    users.splice(userIndex, 1);
    res.json({ message: "Utilisateur supprimé" });
});

// Récupérer des détails supplémentaires sur un utilisateur depuis une API externe
app.get('/api/users/:id/details', async (req, res) => {
    try {
        const response = await axios.get(`https://jsonplaceholder.typicode.com/users/${req.params.id}`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la récupération des données externes" });
    }
});

// Démarrage du serveur
app.listen(port, () => {
    console.log(`Serveur démarré sur http://localhost:${port}`);
});
