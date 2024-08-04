// Trying to make analog to BeautifulSoup's getText here; minimize tokens going into API from misc scripring code
const getText = () => {
  return document.body.innerText;
}

async function getCurrentTabUrl () {
    console.log("Executing getCurrentTabUrl");
    const tabs = await chrome.tabs.query({ active: true, currentWindow: true})
    const current_url = tabs[0].url
    document.getElementById("current_url").innerText =  current_url
    return current_url
  }

async function getCurrentTabText(){
chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  console.log("Executing getCurrentTabText");
  chrome.scripting.executeScript({
    target: { tabId: tabs[0].id },
    func: getText
  }, (result) => {
    document.getElementById("current_status").innerText = 'Ready'

    //persist the query result, return string
    const site_text = result[0].result
    console.log("getCurrentTabText length of ",site_text.length);
    console.log("getCurrentTabText is ",site_text);
    return site_text
  });
});}

//Always ready for the snip upon opening the tool

getCurrentTabText();
getCurrentTabUrl();


async function  snipRecipe() {
  // load current url based on active tab, also grab text
  const current_url = await getCurrentTabUrl()
  const site_text = await getCurrentTabText()
  
  console.log(current_url)
  console.log('hey')
  console.log(site_text)

  console.log(JSON.stringify({
    url: current_url,
    text: site_text
  }))

  const requestParams = {
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify({
      url: current_url,
      text: site_text
    })
  };

  
  // Fetch from endpoint assigned
  await fetch("http://127.0.0.1:8000/extract_from_text/", requestParams).then(async (response) => {
    const data = await response.json();
    console.log(data)
    document.getElementById("recipe_grabber_response_json").innerHTML = JSON.stringify(data)
    document.getElementById("current_status").innerText = 'Grab Complete'
  });
}


// Store default value
// document.getElementById("recipe_grabber_response_json").defaultValue = "";

// this function will generate the json object on click
document.getElementById("snipButton").addEventListener("click", snipRecipe);
