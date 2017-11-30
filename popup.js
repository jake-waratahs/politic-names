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
    var newSettings = {};

    Object.keys(items).map(function(name) {
        var box = document.getElementById(name);
        box.checked = items[name];
    });

    var boxes = document.getElementsByTagName('input');

    for (var i = 0; i < boxes.length; i++) {
        if (items[boxes[i].id] == null) {
            newSettings[boxes[i].id] = true;
            boxes[i].checked = true;
        }
        boxes[i].onclick = function(e){
            toggle(e.target.id);
        }
    }

    chrome.storage.sync.set(newSettings);
});

