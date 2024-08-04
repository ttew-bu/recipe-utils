from fastapi import FastAPI, Request
import logging
from api.recipe_extractor import grab_recipe_from_url, grab_recipe_from_text
from pydantic import BaseModel

app = FastAPI(swagger_ui_parameters={"syntaxHighlight": False},
              debug=True,
              )
log = logging.getLogger()


class URL(BaseModel):
    url : str

class SiteText(BaseModel):
    text : str
    url : str

@app.get("/")
def read_root():
    return {"200": "Welcome to Heroku"}

@app.post("/extract_from_url/")
async def extract_content_from_url(url: URL):
    """API Wrapper that pulls in supplied URL and 
    returns the server response for grab_recipe"""
    log.info(f"Attempting API call for: {url.url}")
    response = grab_recipe_from_url(url.url)
    log.info("API call complete")
    
    return response


@app.post("/extract_from_text/")
async def extract_content_from_text(site_text: SiteText):
    """API Wrapper that pulls in text extracted from the live website, passes data onto server,
    returns the server response for grab_recipe"""
    log.info(f"Attempting API call for given site text")
    response = grab_recipe_from_text(site_text.text, site_text.url)
    log.info("API call complete")
    
    return response