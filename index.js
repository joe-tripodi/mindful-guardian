import * as url_stuff from './scripts/data_functions.js';

const no_button = document.getElementById("no-button");
const yes_button = document.getElementById("yes-button");
const skip_buttons = document.getElementsByClassName("skip-icon");
const continue_button = document.getElementById("continue-button");

no_button.addEventListener(
  "click",
  function(){
    console.log("User has selected NO");
    window.location = 'http://www.quotationspage.com/mqotd.html';
  }
);
yes_button.addEventListener(
  "click",
  function(){
    const question_container = document.getElementById("question-container");
    const intention_container = document.getElementById("intention-container");
    question_container.style.display = "none";
    intention_container.style.display = "flex";
    intention_container.style.gap = "50px";
    console.log("User has selected YES");
  }
);
continue_button.addEventListener(
  "click",
  function(){
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    url_stuff.get_urls_to_block().then((urls_to_block) => {
      urls_to_block[urlParams.get('urlKey')].allowForSomeMinutesFromNow = Date.now();
      chrome.storage.sync.set({urls_to_block: urls_to_block});
      window.location = urlParams.get('prevUrl');
    });
  }
);
for(let index = 0; index < skip_buttons.length; index++){
  skip_buttons[index].addEventListener(
    "click",
    function(){
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      url_stuff.get_urls_to_block().then((urls_to_block) => {
        urls_to_block[urlParams.get('urlKey')].allowForSomeMinutesFromNow = Date.now();
        chrome.storage.sync.set({urls_to_block: urls_to_block});
        window.location = urlParams.get('prevUrl');
      });
      console.log("User has selected SKIP");
    }
  )
}
