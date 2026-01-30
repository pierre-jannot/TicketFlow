import { useEffect, useState } from "react";
import { AddTicket } from "./AddTicket"
import { RemoveTicket } from "./RemoveTicket"
import { UpdateTicket } from "./UpdateTicket";

export function TicketList(){
    //Mise à jour de la liste tickets
    const [reload, setReload] = useState(false);
    const [tickets, setTickets] = useState([]);
    const [sortMethod, setSortMethod] = useState('');
    const [filterMethod, setFilterMethod] = useState([]);
    const [filterOpen, setFilterOpen] = useState(false);
    const [removeSelectedTicket, setRemoveSelectedTicket] = useState(null);
    const [updateSelectedTicket, setUpdateSelectedTicket] = useState(null);
    const availableTags = [
            "bug","backend","documentation","feature","form",
            "frontend","mobile","performance","search",
            "sorting","ui","ux","validation","workflow"
            ];
    //Rechargement du GET/POST
    const toggleReload = () => {
        setReload(prev => !prev);
    }

    //Gestion des erreurs
    const [error, setError] = useState(null);

    // Mise en place du toggle/untoggle des filtres tags
    const toggleTag = (tag) => {
        setFilterMethod(prev =>
            prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
        );
    }

    //GET des tickets
    useEffect(() => {
        const load = async() => {
            setError(null);
            try {
                let res;
                //Si méthode de tri ou filtre
                if(sortMethod || filterMethod.length){
                    res = await fetch(`/tickets/sort`, {
                        method: "POST",
                        headers: {"Content-Type": "application/json"},
                        body: JSON.stringify({
                            sortMethod: sortMethod,
                            filterMethod: filterMethod
                        })
                    })
                }
                //Sinon GET classique
                else {
                    res = await fetch(`/tickets`);
                }
                const text = await res.text();
                let data;

                try {
                    data = text ? JSON.parse(text) : null;
                } catch {
                    data = null;
                }

                console.log(data)

                if (!res.ok) {
                    const err = data
                    ? `Code: ${data.code || res.status} - Message: ${data.detail || data.message}`
                    : `Erreur serveur (${res.status})`;
                    throw new Error(err);
                }

                setTickets(data);
            }
            catch(err) {
                console.error(err);
                const error = `${err.message}`
                setError(error);
            }
        };
        load();
    },
    [sortMethod,filterMethod,reload]);

    //Affichage dans App.js des éléments
    return (
        <>
            {error && <p className="error">⚠ {error}</p>}
            <section className="sort-and-filter">
                {/* Liste des méthodes de tri */}
                <section className="sort-window">
                    <p><strong>Trier par :</strong></p>
                    <select
                    name="sort-method"
                    value={sortMethod}
                    onChange={(e) => setSortMethod(e.target.value)}>
                        <option value="Id Asc">Id ↑</option>
                        <option value="Id Desc">Id ↓</option>
                        <option value="Priority">Priorité</option>
                        <option value="Status">Statut</option>
                        <option value="Date Asc">Date ↑</option>
                        <option value="Date Desc">Date ↓</option>
                    </select>
                </section>
                {/* Choix des tags de filtre */}
                <section className="filter-window">
                    <button onClick={() => setFilterOpen(!filterOpen)} className="filter-dropdown">
                        Filtres {filterOpen ? "▲" : "▼"}
                    </button>
                    {filterOpen && (
                        <div className="filters">
                            {availableTags.map(tag => (
                                <label key={tag}>
                                    <input type="checkbox" checked={filterMethod.includes(tag)} onChange={() => toggleTag(tag)}/>
                                    {tag}
                                </label>
                            ))}
                        </div>
                    )}
                </section>
            </section>
            {/* Affichage des tickets */}
            <ul id="tickets">
                {/* Appel d'ajout de ticket */}
                <AddTicket toggleReload={toggleReload} setError={setError}/>
                {
                    tickets.map((ticket) => (
                        <li key={ticket.id} className={`ticket ticket-${ticket.priority.toLowerCase()}`}>
                            <section>
                                <strong className="title">{`${ticket.id} - ${ticket.title}`}</strong>
                                <p>{ticket.description}</p>
                                <p><strong>Statut</strong> : {ticket.status}</p>
                                <p><strong>Tags</strong> : {ticket.tags.join(", ")}</p>
                                <p><strong>Date de création</strong> : {ticket.createdAt}</p>
                                <button className="delete-button" onClick={() => setRemoveSelectedTicket(ticket.id)}>Supprimer</button>
                                <button className="modify-button" onClick={() => setUpdateSelectedTicket(ticket)}>Modifier</button>
                            </section>
                        </li>
                    ))
                }
            </ul>
            {/* Si le bouton supprimer est cliqué, exécution de RemoveTicket */}
            {removeSelectedTicket && (
                <RemoveTicket
                toggleReload={toggleReload}
                onClose={() => setRemoveSelectedTicket(null)}
                id={removeSelectedTicket}
                setError={setError}
                />
            )}
            {/* Si le bouton modifier est cliqué, exécution de UpdateTicket */}
            {updateSelectedTicket && (
                <UpdateTicket
                toggleReload={toggleReload}
                onClose={() => setUpdateSelectedTicket(null)}
                selectedTicket={updateSelectedTicket}
                setError={setError}
                />
            )}
        </>
    );
}