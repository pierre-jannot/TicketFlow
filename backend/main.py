from fastapi import FastAPI
from script import *

app = FastAPI()

@app.get("/")
def read_root():
    return "Bonjour !"

@app.get("/tickets")
def show_tickets():
    return readTickets()