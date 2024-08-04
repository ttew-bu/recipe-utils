Many times, I've run into issues with cooking along with recipe websites. The recipes themselves can be awesome, but often these pages are littered with ads and prose that is sometimes interesting, but often gets in the way when I'm trying to gather an ingredient list and/or actually go through the steps to cook the dish.

Since I assume that others run into similar issues, I wanted to create a tool that I'd use, but also create something that others could use to collect recipes and build their own personal repositories without needing to save links that may or may not persist over time.

# RecipeSnipper Browser Extension Demo
The following is a demo for a browser extension that pulls down recipes from the current site and returns a formatted template with the recipe metadata. 

### Requirements
- Python 3.12 and libraries contained within requirements.txt
- OPENAI_API_TOKEN environment variable (can be set in .env file, bash_profile, or similar)
- API_URL environment variable
    - for local testing it should be this -> API_URL="http://127.0.0.1:8000/"
    - there is no global server at this time, so unless you make your own, just use localhost
