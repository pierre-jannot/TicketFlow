from fastapi import FastAPI, HTTPException, Request
from script import *
from pydantic import BaseModel
from typing import List
from enum import Enum
from fastapi.responses import JSONResponse
from fastapi.exceptions import RequestValidationError

app = FastAPI()

@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request: Request, exc: RequestValidationError):
    return JSONResponse(
        status_code=422,
        content={
            "code": 422,
            "message": "Unprocessable content",
            "value": ""
        }
    )

class Priority(str, Enum):
    High = "High"
    Medium = "Medium"
    Low = "Low"

class Status(str, Enum):
    Open = "Ouvert"
    InProgress = "En cours"
    Closed = "Fermé"

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
    try:
        return readTickets()
    except:
        raise HTTPException(status_code=404, detail="Tickets not found")

@app.get("/tickets/{sortMethod}")
def sort_tickets(sortMethod: str):
    try:
        return sortTickets(sortMethod)
    except:
        raise HTTPException(status_code=400, detail="Bad sort method request")

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
    try:
        return updateTicket(id,status)
    except:
        raise HTTPException(status_code=404, detail="Ticket not found")

@app.delete("/tickets/{id}")
def remove_ticket(id: int):
    try:
        return deleteTicket(id)
    except:
        raise HTTPException(status_code=404, detail="Ticket not found")
