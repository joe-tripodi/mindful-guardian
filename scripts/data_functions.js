// Retrieve the list of URLs from the storage
export function get_urls_to_block(){
 return chrome.storage.sync.get({urls_to_block: {}}).then((result) => {
   return result.urls_to_block;
 });
}



