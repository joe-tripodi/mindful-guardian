import * as url_stuff from './scripts/data_functions.js';
import { ONE_MINUTE } from './scripts/constants.js';

chrome.webNavigation.onBeforeNavigate.addListener(function(details) {
  // A prerender occurs when the URL is autocompleted by the browser
  // If the frameType is not outermost_frame, it is most likely a plugin
  // or element on the page instead of Facebook itself
  if (details.frameType != "outermost_frame") return;
  if (details.documentLifecycle == "prerender") return;

  var url = details.url;

  url_stuff.get_urls_to_block().then((urls_to_block) => {
    for( const [block_url,url_data] of Object.entries(urls_to_block)){
      if(url.includes(block_url)) {
        if(Date.now() - url_data.allowForSomeMinutesFromNow >= ONE_MINUTE){
          var redirectUrl = `index.html?prevUrl=${url}&urlKey=${block_url}`;
          chrome.tabs.update(details.tabId, {url: redirectUrl});
          // Cancel the current navigation request
          return { redirectUrl: redirectUrl };
        }
      }
    }
  });
});



