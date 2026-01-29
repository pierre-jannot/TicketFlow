import { useState } from "react";

export function RemoveTicket({ onRemoveTicket, onClose, id }){
    const [loading, setLoading] = useState(false);

    const handleRemoveTicket = async () => {
        setLoading(true);
        try {
            const response = await fetch(`/tickets/${id}`, {
                method: "DELETE"
            });
            const ticket = await response.json();
            console.log(ticket);
            const deletedId = parseInt(id, 10);
            onRemoveTicket(deletedId);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
            onClose();
        }
    };

    return (
        <div className="overlay" onClick={onClose}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
                <strong>Souhaitez vous vraiment supprimer le ticket {id} ?</strong>
                <section>
                    <button onClick={handleRemoveTicket} disabled={loading}>
                        {loading ? "Suppression en cours..." : "Supprimer"}
                    </button>
                </section>
            </div>
        </div>
    );
}