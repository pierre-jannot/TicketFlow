from fastapi import FastAPI
from script import *
from pydantic import BaseModel
from typing import List
from enum import Enum

app = FastAPI()

class Priority(str, Enum):
    High = "High"
    Medium = "Medium"
    Low = "Low"

class Status(str, Enum):
    Open = "Open"
    InProgress = "In progress"
    Closed = "Closed"

class UpdateTicket(BaseModel):
    status: Status

class NewTicket(BaseModel):
    title: str
    description: str
    priority: Priority
    tags: List[str]

@app.get("/")
def read_root():
    return "Bonjour !"

@app.get("/tickets")
def show_tickets():
    return readTickets()

@app.post("/tickets")
def add_ticket(item: NewTicket):
    title = item.title
    description = item.description
    priority = item.priority
    tags = item.tags
    return addTicket(title,description,priority,tags)

@app.patch("/tickets/{id}")
def update_ticket(id: int, item: UpdateTicket):
    status = item.status
    return updateTicket(id,status)

@app.delete("/tickets/{id}")
def remove_ticket(id: int, confirm: str):
    if confirm == "DELETE":
        return deleteTicket(id)
    else:
        return "To remove the ticket, send DELETE"