import { useEffect, useState } from "react";

export function GetTickets(){
    useEffect(() => {
        fetch("/tickets")
        .then((res) => res.json())
        .then((data) => {
            const list = document.getElementById("tickets");
            data.forEach(ticket => {
            const li = document.createElement("li");
            li.id = ticket.id;

            li.innerHTML = `
                <section class="ticket">
                <strong>${ticket.title}</strong>
                <p>Description : ${ticket.description}</p>
                <p>Priorité : ${ticket.priority}</p>
                <p>Statut : ${ticket.status}</p>
                </section>
            `;
            list.appendChild(li);
            })
        })
        .catch((err) => console.error(err));
    }, []);
}