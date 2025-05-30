from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import google.generativeai as genai

genai.configure(api_key="AIzaSyC59zXGJ5vQK0f1j931A8ajHKpHpeJtNYY")

app = FastAPI()

class PromptInput(BaseModel):
    prompt: str

@app.post("/parse/")
def parse_prompt(input: PromptInput):
    try:

        model = genai.GenerativeModel(model_name="gemini-1.5-pro-latest")

        chat = model.start_chat()
        response = chat.send_message(input.prompt)

        return {"response": response.text}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
