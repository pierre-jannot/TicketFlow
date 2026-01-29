import { useState } from "react";

export function UpdateTicket({ onUpdateTicket, onClose, selectedTicket }){
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState(selectedTicket.status);

    const handleUpdateTicket = async () => {
        setLoading(true);
        console.log(JSON.stringify({
                    status: status
                }));
        try {
            const response = await fetch(`/tickets/${selectedTicket.id}`, {
                method: "PATCH",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    status: status.replace("-", " ")
                })
            });
            const ticket = await response.json();
            onUpdateTicket(ticket.id, ticket.status);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
            onClose();
        }
    };

    return (
        <div className="overlay" onClick={(onClose)}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
                <strong>Modification du ticket {selectedTicket.id}</strong>
                <strong>Titre : {selectedTicket.title}</strong>
                <p>Description : {selectedTicket.description}</p>
                <strong>Statut :</strong>
                <section id="status-buttons" className={`selected-${status}`}>
                    <button id="button-ouvert" onClick={() => setStatus("Ouvert")}>Ouvert</button>
                    <button id="button-en-cours" onClick={() => setStatus("En-cours")}>En cours</button>
                    <button id="button-fermé" onClick={() => setStatus("Fermé")}>Fermé</button>
                </section>
                <button onClick={handleUpdateTicket} disabled={loading}>
                    {loading ? "Modification en cours..." : "Modifier le ticket"}
                </button>
            </div>
        </div>
    );
}