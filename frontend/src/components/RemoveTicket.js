import { useState } from "react";

// Composant de suppression de ticket
export function RemoveTicket({ onRemoveTicket, onClose, id, setError }){
    const [loading, setLoading] = useState(false);

    // Exécution de la suppression du ticket
    const handleRemoveTicket = async () => {
        setLoading(true);
        try {
            // Suppression du ticket dans le back
            const response = await fetch(`/tickets/${id}`, {
                method: "DELETE"
            });
            const data = await response.json();
            if(data.code==204){
                const deletedId = parseInt(id, 10);
                // Suppression du ticket dans le front
                onRemoveTicket(deletedId);
            }
            else{
                throw data;
            }
        } catch (err) {
            console.error(err);
            const error = `Code: ${err.code} - Message: ${err.message}`
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