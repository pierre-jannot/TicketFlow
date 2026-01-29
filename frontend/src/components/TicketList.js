import { useEffect, useState } from "react";
import { AddTicket } from "./AddTicket"
import { RemoveTicket } from "./RemoveTicket"
import { UpdateTicket } from "./UpdateTicket";

export function TicketList(){
    //Mise à jour de la liste tickets
    const [tickets, setTickets] = useState([]);
    const [removeSelectedTicket, setRemoveSelectedTicket] = useState(null);
    const [updateSelectedTicket, setUpdateSelectedTicket] = useState(null);

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
                                <button onClick={() => setRemoveSelectedTicket(ticket.id)}>Supprimer</button>
                                <button onClick={() => setUpdateSelectedTicket(ticket)}>Modifier</button>
                            </section>
                        </li>
                    ))
                }
            </ul>
            {removeSelectedTicket && (
                <RemoveTicket
                onRemoveTicket={removeTicket}
                onClose={() => setRemoveSelectedTicket(null)}
                id={removeSelectedTicket}
                />
            )}
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