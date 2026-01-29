import { useEffect, useState } from "react";
import { AddTicket } from "./AddTicket"
import { RemoveTicket } from "./RemoveTicket"
import { UpdateTicket } from "./UpdateTicket";

export function TicketList(){
    //Mise à jour de la liste tickets
    const [tickets, setTickets] = useState([]);
    const [removeSelectedTicket, setRemoveSelectedTicket] = useState(null);
    const [updateSelectedTicket, setUpdateSelectedTicket] = useState(null);

    //Gestion des erreurs
    const [error, setError] = useState(null);

    //Gestion des ajouts de tickets
    const addTicket = (newTicket) => {
        setTickets(prevTickets => [...prevTickets, newTicket]);
    }

    //Gestion de la suppression des tickets
    const removeTicket = (id) => {
        setTickets(prev => prev.filter(ticket => ticket.id !== id));
    }

    //Gestion de la suppression des tickets
    const updateTicket = (id, newStatus) => {
        setTickets(prev => prev.map(ticket => ticket.id === id ? {...ticket, status: newStatus } : ticket));
    }

    //GET des tickets
    useEffect(() => {
        const load = async() => {
            try {
                const res = await fetch("/tickets"); // assure-toi que le serveur est UP
                const text = await res.text(); // on lit le body en texte
                let data;

                try {
                    data = text ? JSON.parse(text) : null; // on parse seulement si possible
                } catch {
                    data = null; // body pas JSON
                }

                if (!res.ok) {
                    throw new Error(
                    data?.detail || `Erreur serveur (${res.status})`
                    );
                }

                console.log(data.code);
                console.log(data.message);
                setTickets(data.value);
            }
            catch(err) {
                console.log(err);
                setError(err.message);
            }
        };
        load();
    },
    []);

    //Affichage dans App.js des éléments
    return (
        <>
            {error && <p className="error">⚠ {error}</p>}
            {/* Appel d'ajout de ticket */}
            <div id="add-ticket">
                <AddTicket onAddTicket={addTicket} setError={setError}/>
            </div>
            {/* Affichage des tickets */}
            <ul id="tickets">
                {
                    tickets.map((ticket) => (
                        <li key={ticket.id} className={`ticket ticket-${ticket.priority.toLowerCase()}`}>
                            <section>
                                <strong className="title">{ticket.title}</strong>
                                <p>{ticket.description}</p>
                                <p><strong>Statut</strong> : {ticket.status}</p>
                                <button onClick={() => setRemoveSelectedTicket(ticket.id)}>Supprimer</button>
                                <button onClick={() => setUpdateSelectedTicket(ticket)}>Modifier</button>
                            </section>
                        </li>
                    ))
                }
            </ul>
            {/* Si le bouton supprimer est cliqué, exécution de RemoveTicket */}
            {removeSelectedTicket && (
                <RemoveTicket
                onRemoveTicket={removeTicket}
                onClose={() => setRemoveSelectedTicket(null)}
                id={removeSelectedTicket}
                />
            )}
            {/* Si le bouton modifier est cliqué, exécution de UpdateTicket */}
            {updateSelectedTicket && (
                <UpdateTicket
                onUpdateTicket={updateTicket}
                onClose={() => setUpdateSelectedTicket(null)}
                selectedTicket={updateSelectedTicket}
                />
            )}
        </>
    );
}