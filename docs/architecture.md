Architecture de l'application Employee Management
1. Vue d’ensemble

L’application permet de gérer les employés et les départements. Elle est composée de :

Frontend : interface en React pour afficher et gérer les employés.

Backend : API REST en Spring Boot pour gérer les données.

Bases de données : MySQL (relationnel) et MongoDB (non relationnel).

Tous les services sont conteneurisés avec Docker et lancés ensemble avec Docker Compose.

2. Frontend

Développé avec React.

Sert les pages et les formulaires pour ajouter, modifier ou afficher des employés.

Docker : construit avec Node.js et servi via Nginx.

Port exposé : 3000.

3. Backend

Développé avec Spring Boot.

Fournit les endpoints pour les employés et départements (CRUD).

Communique avec MySQL et MongoDB.

Docker : construit avec OpenJDK et Maven.

Port exposé : 8085.

4. Bases de données

MySQL : stocke les données des employés et départements. Port : 3306

MongoDB : peut stocker des données non relationnelles. Port : 27017

5. Docker Compose

Permet de lancer tous les services en même temps.

Les services communiquent via le réseau Docker interne.
