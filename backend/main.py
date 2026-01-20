from fastapi import FastAPI
from script import *

app = FastAPI()

@app.get("/")
def read_root():
    return "Bonjour !"