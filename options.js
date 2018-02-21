// Saves options to chrome.storage
function save_pin() {
  var newPin = document.getElementById('newPin').value;
  chrome.storage.sync.set({
    pin: newPin
  }, function() {
    // Update status to let user know options were saved.
    alert("PIN successfully changed.");
  });
}

function save_url() {
  var urls = document.getElementById('urls').value;
  chrome.storage.sync.set({
    urls: urls.replace(/\s/g, '')
  }, function() {
    // Update status to let user know options were saved.
    alert("URLs successfully changed.");
  });
}

function save_timeout() {
  var timeout = document.getElementById('timeout').value;
  chrome.storage.sync.set({
    timeout: timeout
  }, function() {
    // Update status to let user know options were saved.
    alert("Timeout delay successfully changed.");
  });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  // Use default value color = 'red' and likesColor = true.
  chrome.storage.sync.get(null, function(items) {
    document.getElementById('urls').value = items.urls;
    document.getElementById('timeout').value = items.timeout;
  });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('savePin').addEventListener('click',
    save_pin);
document.getElementById('saveUrl').addEventListener('click',
    save_url);
document.getElementById('saveTimeout').addEventListener('click',
    save_timeout);