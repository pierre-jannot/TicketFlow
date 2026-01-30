# README du frontend projet

## Installation App React :

Dans le dossier TicketFlow, via l'invite de commandes :

npx create-react-app frontend

## Lancement App React :

Dans l'invite de commande, dans TicketFlow\frontend :

npm start

## Récupération des endpoints :

Endpoint GET avec le component TicketList.js
Chemin : http://127.0.0.1:8000/tickets

Endpoint POST avec le component AddTicket.js
Chemin : http://127.0.0.1:8000/tickets
Method : POST
Body : titre, description, priorité, tags

Endpoint PATCH avec le component UpdateTicket.js
Chemin : http://127.0.0.1:8000/tickets/idTicket
Method : PATCH
Body : priorité

Endpoint DELETE avec le component RemoveTicket.js
Chemin : http://127.0.0.1:8000/tickets/idTicket
Methode : DELETE

