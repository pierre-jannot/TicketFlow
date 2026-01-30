# LEARNING du projet


## Prompt 1 - Comment faire le lien entre un component parent et enfant :
J'ai un backend et un frontend. Le Backend est fonctionnel, il a une fonction GET, POST, PATCH et DELETE pour mes tickets qui sont dans un JSON Le frontend possède le GET, mais je dois réaliser le POST. Pour le POST j'ai un component AddTicket.js qui envoie au backend le ticket et récupère les informations du nouveau ticket. Dans mon component principal TicketList.js j'ai ma fonction qui fait le GET et qui utilise un useState pour ma liste de tickets. Je souhaite pouvoir mettre à jour cette liste avec le component AddTicket.js, tu peux m'aider ?

## Réponse :
Oui — c’est exactement un cas classique de communication entre composants React 👍
Ton besoin :

AddTicket crée un ticket → TicketList doit mettre à jour la liste

👉 Solution React standard : remonter l’état + passer une fonction en props.

🧠 Principe
TicketList (state tickets)
   ↓ passe fonction addTicket
AddTicket (crée ticket → appelle addTicket)


Le parent garde la vérité.
L’enfant notifie le parent.

// 👇 fonction que AddTicket va appeler
  const handleAddTicket = (newTicket) => {
    setTickets(prev => [...prev, newTicket]);
  };

// Méthode d'appel :
<AddTicket onAddTicket={handleAddTicket} />

Dans AddTicket :

function AddTicket({ onAddTicket }) {...}


## Pompt 2 - Création d'une modale :
En JS React, comment créer une pop up qui s'affiche quand on clique sur un bouton sur la page ?

## Réponse :
Bonne question — en React une “popup” = afficher un composant conditionnellement.

👉 Tu utilises useState pour contrôler visible / caché.

Par exemple :
const [showPopup, setShowPopup] = useState(false);

Avec un bouton ça donne :
click → setShowPopup(true)
→ React affiche le JSX

Tu utilises && avec ton affichage pour :
si true → afficher
si false → rien


## Prompt 3 - Problème de fermeture de la modale :
Quand je clique sur ma modale, elle se ferme, est-ce que ça a un rapport avec mon z-index ?

## Réponse :
Bonne intuition — mais ici ce n’est presque jamais un problème de z-index 🙂

Si ta modale se ferme quand tu cliques dessus, c’est parce que :

👉 ton clic “remonte” jusqu’à l’overlay
👉 l’overlay déclenche le onClick de fermeture

C’est un problème de propagation d’événement, pas d’empilement visuel.
Il faut utiliser stopPropagation() quand tu cliques sur ta modale.

⚠️ Quand c’est vraiment un z-index bug ?

Seulement si :

l’overlay est derrière un autre élément

un élément invisible capte le clic

Mais dans ton cas :

“cliquer sur la modale la ferme”

➡️ c’est 99% propagation d’événement.


## Erreur rencontrée 1 - Clignotement à l'ouverture des modales :
Lors de l'affichage des modales de suppression des tickets, nous avions un clignotement à l'ouverture de la modale.

Erreur relevée : Chaque ticket avec sa propre modale, et toutes les modales s'ouvraient en même temps quand on cliquait sur modifier

Correction : Création d'une modale unique pour l'ensemble des tickets, le contenu change en fonction du ticket utilisé pour cliquer sur modifier


## Erreur rencontrée 2 - Lecture en JSON d'une erreur en texte :
Lors de la récupération d'une erreur HTTP, nous traitions l'erreur comme un JSON et nous ne comprenions pas le message d'erreur.

Pour corriger, il fallait d'abord vérifier si la valeur pouvait être mise en JSON, on récupére donc d'abord au format texte (res.text()) puis on
vérifie avec JSON.parse(text) pour savoir si la valeur peut être mise sous format JSON.


## Erreurs du LLM :
Pas d'erreurs rencontrées du LLM, chaque réponse qui n'allait pas dans notre sens provenait d'une erreur de l'explication de la situation.