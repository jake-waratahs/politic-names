function toggle(key){
    chrome.storage.sync.get(key, function(items) {
        var newSettings = {};
        if (items[key]) {
            newSettings[key] = false;
        } else {
            newSettings[key] = true;
        }
        chrome.storage.sync.set(newSettings);    
    });
}


chrome.storage.sync.get(null, function(items){

    Object.keys(items).map(function(name) {
        var box = document.getElementById(name);
        box.checked = items[name];
    });

    var boxes = document.getElementsByTagName('input');

    for (var i = 0; i < boxes.length; i++) {
        boxes[i].onclick = function(e){
            toggle(e.target.id);
        }
    }
});

