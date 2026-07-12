from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def home():
    return {"message": "Food Ordering System Backend is running!"}
