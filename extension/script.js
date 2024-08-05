// Defaults for the values that will change on the page
var recipeResponse
var siteText
var currentURL
var APIUrl = 'http://127.0.0.1:8000/'
document.getElementById("current_status").innerText = 'Waiting for Text to Load'

async function getCurrentTabUrl () {
  console.log("Executing getCurrentTabUrl");
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true})
  currentURL = tab.url
}

async function getCurrentTabText () {
const [tab] = await chrome.tabs.query({active: true, currentWindow: true});
let result;
try {
  [{result}] = await chrome.scripting.executeScript({
    target: {tabId: tab.id},
    func: () => document.documentElement.innerText,
  });
} catch (e) {
  document.body.textContent = 'Cannot access page';
  return;
}
// process the result
document.getElementById("current_status").innerText = 'Text Successfully Loaded'
siteText = result;
}

async function  snipRecipe() {

  console.log(JSON.stringify({
    url: currentURL,
    text: siteText
  }));

  const requestParams = {
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify({
      url: currentURL,
      text: siteText
    })
  };


  // Fetch from endpoint assigned
  await fetch(APIUrl+"/extract_from_text/", requestParams).then(async (response) => {
    const data = await response.json();
    console.log(data)

    // create string representation of the object
    recipeResponse = JSON.stringify(data, null, 2)

    // offer differing text based on the response
    if (data.has_recipe){
    document.getElementById("current_status").innerText = 'Grab Complete, Recipe Found!'  
    }

    else {
    document.getElementById("current_status").innerText = 'Grab Complete, No Recipe Found!'
    }
    console.log("Recipe response is: "+recipeResponse)

  });
  }

// Create hidden element and download object on click
function downloadRecipe() {

  var hiddenElement = document.createElement('a');
  hiddenElement.href = 'data:text/plain;charset=utf-8,' + encodeURI(recipeResponse);
  hiddenElement.target = '_blank';
  hiddenElement.download = currentURL+'.json';
  hiddenElement.click();
}


// need to put these on listeners for page load, refresh, etc.

getCurrentTabUrl()
getCurrentTabText()

// this function will generate the json object on click
document.getElementById("snipButton").addEventListener("click", snipRecipe);

// this function will generate the json object on click
document.getElementById("downloadButton").addEventListener("click", downloadRecipe);
