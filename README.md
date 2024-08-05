# RecipeSnipper Browser Extension Demo
The following is a demo for a browser extension that pulls down recipes from the current site and returns a formatted JSON file with the recipe metadata. 

Production backend is hosted on Heroku and powered by FastAPI

As for why I've built this service, I've run into issues with accessibility and cooking websites. Often, these pages are filled with ads and are difficult to navigate; many require an email being added to a mailing list to pull a copy of the recipe. 

Since I assume that others run into similar issues, I wanted to create a tool that I'd use to store recipes of interest in a way others may also benefit.

The hope here is to allow folks to collect recipes and build their own personal repositories without needing to save links that may or may not persist over time or deal with the other accessibility challenges described above.

### Requirements
- Python 3.12 and libraries contained within requirements.txt
- OPENAI_API_TOKEN environment variable (can be set in .env file, bash_profile, or similar), set this before spinning up API locally

### Running the API Locally
- The actual browser extension runs off of a hosted API for all requests, but if you're testing locally, do the following:
sh run_server.sh

### Running the Extension Locally
- Open up Chrome, click on the puzzle piece for extension managemetn, and then click into manage extensions
- Switch the slider for dev mode to on
- Click "load unpacked"
- In the file selector, click the extension folder (which should have the manifest, popup.html, and script.js)
- You should now be able to trigger


### Future Work
- The intent is to publish the extension on the Chrome store and have that run against the back end in Heroku allowing for anyone to use this
- The addition of user management and persistent storage of recipes are future considerations as well