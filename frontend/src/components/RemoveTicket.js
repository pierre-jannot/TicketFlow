import { useState } from "react";

// Composant de suppression de ticket
export function RemoveTicket({ toggleReload, onClose, id, setError }){
    const [loading, setLoading] = useState(false);

    // Exécution de la suppression du ticket
    const handleRemoveTicket = async () => {
        setLoading(true);
        try {
            // Suppression du ticket dans le back
            const res = await fetch(`/tickets/${id}`, {
                method: "DELETE"
            });
            const text = await res.text();
            let data;

            try{
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
        } finally {
            setLoading(false);
            // Fermeture de la modale
            onClose();
        }
    };

    return (
        // Modale de suppression
        <div className="overlay" onClick={onClose}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
                <strong>Souhaitez vous vraiment supprimer le ticket {id} ?</strong>
                <section>
                    {/* Bouton de confirmation de suppression */}
                    <button onClick={handleRemoveTicket} disabled={loading}>
                        {loading ? "Suppression en cours..." : "Supprimer"}
                    </button>
                </section>
            </div>
        </div>
    );
}