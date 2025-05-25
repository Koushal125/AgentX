from fastapi import FastAPI
from pydantic import BaseModel
import httpx
import os
from dotenv import load_dotenv

load_dotenv(".env.local") 
app = FastAPI()

GROK_API_URL = os.getenv("GROK_API_URL")
GROK_API_KEY = os.getenv("GROK_API_KEY")

class UserInput(BaseModel):
    prompt: str

@app.post("/parse/")
async def parse_input(user_input: UserInput):
    headers = {
        "Authorization": f"Bearer {GROK_API_KEY}",
        "Content-Type": "application/json"
    }

    payload = {
        "model": "grok-3-latest",
        "messages": [
            {"role": "system", "content": "You are a task-to-workflow parser. Extract structured JSON from task descriptions."},
            {"role": "user", "content": f"Extract a workflow from: '{user_input.prompt}'. Output JSON with keys: trigger, action, role, condition, escalation."}
        ],
        "temperature": 0,
        "stream": False
    }

    async with httpx.AsyncClient() as client:
        response = await client.post(GROK_API_URL, headers=headers, json=payload)
        result = response.json()

    try:
        structured_output = result['choices'][0]['message']['content']
        return {"parsed": structured_output}
    except Exception as e:
        return {
            "error": "Failed to parse output",
            "details": str(e),
            "raw": result
        }
