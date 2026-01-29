import { useState } from "react";

export function AddTicket({ onAddTicket }){
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const handleAddTicket = async () => {
        setLoading(true);
        try {
            const response = await fetch("/tickets", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    title: "titre",
                    description: "desc",
                    priority: "High",
                    tags: ["ui"]
                })
            });
            const ticket = await response.json();
            onAddTicket(ticket);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
            setShowModal(false);
        }
    };

    return (
        <div>
            <button onClick={() => setShowModal(true)}>Ajouter</button>

            {showModal && (
                <div className="overlay" onClick={() => setShowModal(false)}>
                    <div className="modal" onClick={(e) => e.stopPropagation()}>
                        <button onClick={handleAddTicket} disabled={loading}>
                            {loading ? "Ajout en cours..." : "Ajouter ticket test"}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}