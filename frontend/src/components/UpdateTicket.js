import { useState } from "react";

// Composant de mise à jour du statut d'un ticket
export function UpdateTicket({ toggleReload, onClose, selectedTicket, setError }){
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState(selectedTicket.status);

    // Exécution de la mise à jour du ticket
    const handleUpdateTicket = async () => {
        setLoading(true);
        try {
            // Mise à jour sur le backend
            const res = await fetch(`/tickets/${selectedTicket.id}`, {
                method: "PATCH",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    status: status.replace("-", " ")
                })
            });
            const text = await res.text();
            let data;

            try {
                data = text ? JSON.parse(text) : null;
            } catch {
                data = null;
            } 
            if(!res.ok){
                const err = data
                ? `Code: ${data.code || res.status} - Message: ${data.detail || data.message}`
                : `Erreur serveur (${res.status})`;
                throw new Error(err);
            }
            // Rechargement du GET/POST
            toggleReload();
        } catch (err) {
            console.error(err);
            const error = `${err.message}`
            setError(error);
        }
        finally {
            setLoading(false);
            // Fermeture de la modale
            onClose();
        }
    };

    return (
        // Affichage de la modale
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
                {/* Confirmation de l'update du ticket */}
                <button onClick={handleUpdateTicket} disabled={loading}>
                    {loading ? "Modification en cours..." : "Modifier le ticket"}
                </button>
            </div>
        </div>
    );
}