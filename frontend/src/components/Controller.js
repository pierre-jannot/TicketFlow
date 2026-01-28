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
            li.className = `ticket ticket-${ticket.priority.toLowerCase()}`;
            li.innerHTML = `
                <section>
                <strong class="title">${ticket.title}</strong>
                <p>${ticket.description}</p>
                <p>Statut : ${ticket.status}</p>
                </section>
            `;
            list.appendChild(li);
            })
        })
        .catch((err) => console.error(err));
    }, []);
}