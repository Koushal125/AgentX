from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import google.generativeai as genai
import re
import json  

genai.configure(api_key="AIzaSyC59zXGJ5vQK0f1j931A8ajHKpHpeJtNYY")

app = FastAPI()

class PromptInput(BaseModel):
    prompt: str

@app.post("/parse/")
def parse_prompt(input: PromptInput):
    try:
        instruction = """
                    You are an assistant that reads task descriptions and outputs structured JSON data.

                    Given a prompt that describes a request to create a bot to interact with people in a company, perform the following:

                    1. Extract the purpose of the bot.
                    2. Identify who the bot should interact with (roles, teams, or individuals).
                    3. Extract the deadline (date or duration).
                    4. Describe what the bot must do before the deadline.
                    5. Determine what escalation or follow-up action happens if the task is not completed by the deadline.

                    Return your output strictly as a JSON object in the following format:

                    {
                    "bot_purpose": "<string>",
                    "target_people": ["<string>", "..."],
                    "deadline": "<string>",
                    "task_to_perform": "<string>",
                    "escalation_policy": "<string>"
                    }

                    Respond ONLY with the JSON. Do not add explanations or commentary.
                    """

        model = genai.GenerativeModel(model_name="gemini-1.5-pro-latest")

        chat = model.start_chat()
       
        full_prompt = instruction + "\n\n" + input.prompt
 
        response = chat.send_message(full_prompt)

        text = response.text.strip()


        if text.startswith("```json"):
            text = re.sub(r"```json\s*|\s*```", "", text).strip()

        parsed_json = json.loads(text)

        return parsed_json

    except json.JSONDecodeError:
        raise HTTPException(status_code=500, detail="Failed to parse JSON from model response.")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
