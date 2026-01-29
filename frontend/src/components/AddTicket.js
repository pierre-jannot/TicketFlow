import { useState } from "react";

// Composant d'ajout de ticket
export function AddTicket({ onAddTicket }){
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [title, setTitle] = useState('Non renseigné');
    const [description, setDescription] = useState('Pas de description');
    const [priority, setPriority] = useState("Medium");
    const [selectedTags, setSelectedTags] = useState([]);
    const availableTags = [
            "bug","backend","documentation","feature","form",
            "frontend","mobile","performance","search",
            "sorting","ui","ux","validation","workflow"
            ];

    // Mise en place du toggle/untoggle des tags
    const toggleTag = (tag) => {
        setSelectedTags(prev =>
            prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
        );
    };

    // Execution de l'ajout de ticket
    const handleAddTicket = async () => {
        setLoading(true);
        try {
            // Ajout du ticket dans le back
            const response = await fetch("/tickets", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    title: title,
                    description: description,
                    priority: priority,
                    tags: selectedTags
                })
            });
            const ticket = await response.json();
            // Ajout du ticket dans le front
            onAddTicket(ticket);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
            // Fermeture de la modale
            setShowModal(false);
        }
    };

    return (
        <div>
            {/* Bouton d'ouverture de la modale */}
            <button onClick={() => setShowModal(true)}>Ajouter</button>

            {/* Affichage de la modale */}
            {showModal && (
                <div className="overlay" onClick={() => setShowModal(false)}>
                    <div className="modal" onClick={(e) => e.stopPropagation()}>
                        <strong>Création d'un ticket</strong>
                        <input type="text" id="title" placeholder="Titre" required minLength="4"
                        value={title} onChange={(e) => setTitle(e.target.value)}></input>
                        <textarea id="description" placeholder="Description" rows={4} required minLength="15"
                        value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                        <strong>Priorité :</strong>
                        <section id="priority-buttons" className={`selected-${priority}`}>
                            <button id="button-low" onClick={() => setPriority("Low")}>Basse</button>
                            <button id="button-medium" onClick={() => setPriority("Medium")}>Moyenne</button>
                            <button id="button-high" onClick={() => setPriority("High")}>Haute</button>
                        </section>
                        <p>Cochez les tags pertinents :</p>
                        <div className="tags">
                            {availableTags.map(tag => (
                                <label key={tag}>
                                    <input type="checkbox" checked={selectedTags.includes(tag)} onChange={() => toggleTag(tag)}/>
                                    {tag}
                                </label>
                            ))}
                        </div>
                        {/* Bouton de confirmation de l'ajout */}
                        <button onClick={handleAddTicket} disabled={loading}>
                            {loading ? "Ajout en cours..." : "Ajouter ticket test"}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}