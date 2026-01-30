# README du frontend projet

## Installation Dépendances React :

Via l'invite de commandes :

npm install

## Lancement App React :

Dans l'invite de commande, dans TicketFlow\frontend :

npm start

## Récupération des endpoints :

Endpoint GET avec le component TicketList.js
Chemin : /tickets

Endpoint POST avec le component TicketList.js dans le cas d'un filtre ou d'un tri
Chemin : /tickets/sort
Method : POST
Body : sortMethod, filterMethod

Endpoint POST avec le component AddTicket.js
Chemin : /tickets
Method : POST
Body : titre, description, priorité, tags

Endpoint PATCH avec le component UpdateTicket.js
Chemin : /tickets/idTicket
Method : PATCH
Body : priorité

Endpoint DELETE avec le component RemoveTicket.js
Chemin : /tickets/idTicket
Methode : DELETE

