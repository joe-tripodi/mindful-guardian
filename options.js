const form = document.getElementById("user_input");
form.addEventListener("submit", blockUrl);

function blockUrl(event){
  event.preventDefault();
  const url_to_block = document.querySelector('[name="url_to_block"]').value;
  chrome.storage.sync.get({urls_to_block: {}}, (result) => {
    console.log(result.urls_to_block);
    result.urls_to_block[url_to_block] = {
      url: url_to_block,
      allowForSomeMinutesFromNow: 0
    };
    chrome.storage.sync.set({urls_to_block: result.urls_to_block});
  });
  document.querySelector('[name="url_to_block"]').value = "";
}

chrome.storage.onChanged.addListener(() => {
  const urlstoBlockList = document.getElementById("all_blocked_urls");
  urlstoBlockList.innerHTML = "";

  chrome.storage.sync.get({urls_to_block: []}, (result) => {
    for (const [key, _] of Object.entries(result.urls_to_block)){
      let liElement = document.createElement('li');
      liElement.innerHTML = `<span>${key}<span> <span style="cursor:pointer;" id="${key}" class="delete-btn"> - </span>`;
      const urlstoBlockList = document.getElementById("all_blocked_urls");
      urlstoBlockList.appendChild(liElement);
    }
    const delete_buttons = document.querySelectorAll('.delete-btn');
    delete_buttons.forEach(button => {
      button.addEventListener('click', deleteURL);
    });
  });
});

chrome.storage.sync.get({urls_to_block: []}, (result) => {
  for (const [key, _] of Object.entries(result.urls_to_block)){
    let liElement = document.createElement('li');
    liElement.innerHTML = `<span>${key}<span> <span style="cursor:pointer;" id="${key}" class="delete-btn"> - </span>`;
    const urlstoBlockList = document.getElementById("all_blocked_urls");
    urlstoBlockList.appendChild(liElement);
  }

  const delete_buttons = document.querySelectorAll('.delete-btn');
  delete_buttons.forEach(button => {
    button.addEventListener('click', deleteURL);
  });

});

function deleteURL(event){
  console.log(`delete ${event.target.id}`);
  chrome.storage.sync.get({urls_to_block: {}}, (result) => {
    delete result.urls_to_block[event.target.id];
    chrome.storage.sync.set({urls_to_block: result.urls_to_block});

  });
};



