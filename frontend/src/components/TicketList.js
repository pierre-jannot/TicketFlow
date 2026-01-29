import { useEffect, useState } from "react";
import { AddTicket } from "./AddTicket"
import { RemoveTicket } from "./RemoveTicket"

export function TicketList(){
    //Mise à jour de la liste tickets
    const [tickets, setTickets] = useState([]);
    const [selectedTicket, setSelectedTicket] = useState(null);

    //Gestion des ajouts de tickets
    const addTicket = (newTicket) => {
        setTickets(prevTickets => [...prevTickets, newTicket]);
    }

    //Gestion de la suppression des tickets
    const removeTicket = (id) => {
        setTickets(prev => prev.filter(ticket => ticket.id !== id));
    }

    //GET des tickets
    useEffect(() => {
        fetch("/tickets")
        .then((res) => res.json())
        .then((data) => {
            setTickets(data);
        })
        .catch((err) => console.error(err));
    }, []);

    //Affichage dans App.js des éléments
    return (
        <>
            <div id="add-ticket">
                <AddTicket onAddTicket={addTicket}/>
            </div>
            <ul id="tickets">
                {
                    tickets.map((ticket) => (
                        <li key={ticket.id} className={`ticket ticket-${ticket.priority.toLowerCase()}`}>
                            <section>
                                <strong className="title">{ticket.title}</strong>
                                <p>{ticket.description}</p>
                                <p><strong>Statut</strong> : {ticket.status}</p>
                                <button onClick={() => setSelectedTicket(ticket.id)}>Supprimer</button>
                            </section>
                        </li>
                    ))
                }
            </ul>
            {selectedTicket && (
                <RemoveTicket
                onRemoveTicket={removeTicket}
                onClose={() => setSelectedTicket(null)}
                id={selectedTicket}
                />
            )}
        </>
    );
}