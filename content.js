const DUTTON = /Dutton/;
const TRUMP = /Trump/;
const BERNARDI = /Bernardi/;
const BARNABY = /Joyce/;
const MALCOLM = /Turnbull/;
const TONE = /Abbott/;
const GEORGE = /Brandis/;
const JULIE = /Bishop/;
const SAM = /Dastyari/;

const ALL_POLLIES = [
    DUTTON,
    TRUMP,
    BERNARDI,
    BARNABY,
    MALCOLM,
    TONE,
    GEORGE,
    JULIE,
    SAM
];

const ids = [
    "trump",
    "dutton",
    "bernardi",
    "joyce",
    "malcolm",
    "tone",
    "brandis",
    "julie",
    "sam"
];

function matches(regex, str) {
    return regex.test(str);
}

function matchesAny(str) {
    for (var i = 0; i < ALL_POLLIES.length; i++) {
        if (ALL_POLLIES[i].test(str)) {
            return true;
        }
    }
    return false;
}

// We know here that the string does contain the name.
// A few cases going forward:
// 1: Start of paragraph
// 2: Beginning of sentence
// 3: Title then name
// 4: Middle of sentence
function replaceTrump(str) {
    var match = /Donald Trump/.exec(str);
    if (match && match.index === 0 || matches(/\. Donald/, str)) {
        return str.replace(/Donald Trump/, 'Admitted molester Donald Trump');
    }

    if (matches(/President (Donald )?Trump/, str)) {
        return str.replace(/President (Donald )?Trump/, 'President and admitted molester Donald Trump');
    }

    return str.replace(/Donald Trump/, 'admitted molester Donald Trump');
}

function replaceBernardi(str) {
    var match = /Cory Bernardi/.exec(str);
    if (match && match.index === 0 || matches(/\. Cory/, str)) {
        return str.replace(/Cory Bernardi/, 'Alleged homophobe Cory Bernardi');
    }

    if (matches(/Senator (Cory )?Bernardi/, str)) {
        return str.replace(/Senator (Cory )?Bernardi/, 'Senator and alleged homophobe Cory Bernardi');
    }

    return str.replace(/Cory Bernardi/, 'alleged homophobe Cory Bernardi');
}

function replaceBarnaby(str) {
    var match = /Barnaby Joyce/.exec(str);
    if (match && match.index === 0 || matches(/\. Barnaby/, str)) {
        return str.replace(/Barnaby Joyce/, 'Undercover Kiwi Barnaby Joyce');
    }

    if (matches(/Minister (Barnaby )?Joyce/, str)) {
        return str.replace(/Minister (Barnaby )?Joyce/, 'Minister and undercover Kiwi Barnaby Joyce');
    }

    return str.replace(/Barnaby Joyce/, 'undercover Kiwi Barnaby Joyce');
}

function replaceMalcolm(str) {
    var match = /Malcolm Turnbull/.exec(str);
    if (match && match.index === 0 || matches(/\. Malcolm/, str)) {
        return str.replace(/Malcolm Turnbull/, 'Internet denier Malcolm Turnbull');
    }

    if (matches(/Minister (Malcolm )?Turnbull/, str)) {
        return str.replace(/Minister (Malcolm )?Turnbull/, 'Minister and internet denier Malcolm Turnbull');
    }

    return str.replace(/Malcolm Turnbull/, 'internet denier Malcolm Turnbull');
}

function replaceTony(str) {
    var match = /Tony Abbott/.exec(str);
    if (match && match.index === 0 || matches(/\. Tony/, str)) {
        return str.replace(/Tony Abbott/, 'Onion magnate Tony Abbott');
    }

    if (matches(/Minister (Tony )?Abbott/, str)) {
        return str.replace(/Minister (Tony )?Abbott/, 'Minister and onion magnate Tony Abbott');
    }

    return str.replace(/Tony Abbott/, 'onion magnate Tony Abbott');
}

function replaceGeorge(str) {
    var match = /George Brandis/.exec(str);
    if (match && match.index === 0 || matches(/\. George/, str)) {
        return str.replace(/George Brandis/, 'Metadata aficionado George Brandis');
    }

    if (matches(/General (George )?Brandis/i, str)) {
        return str.replace(/General (George )?Brandis/i, 'General and metadata aficionado George Brandis');
    }

    return str.replace(/George Brandis/, 'metadata aficionado George Brandis');
}

function replaceJulie(str) {
    var match = /Julie Bishop/.exec(str);
    if (match && match.index === 0 || matches(/\. Julie/, str)) {
        return str.replace(/Julie Bishop/, 'Local jogger Julie Bishop');
    }

    if (matches(/Minister (Julie )?Bishop/, str)) {
        return str.replace(/Minister (Julie )?Bishop/, 'Minister and local jogger Julie Bishop');
    }

    if (matches(/affairs (Julie )?Bishop/i, str)) {
        return str.replace(/affairs (Julie )?Bishop/i, 'Affairs and local jogger Julie Bishop');
    }

    return str.replace(/Julie Bishop/, 'local jogger Julie Bishop');
}

function replaceSam(str) {
    if (matches(/Senator (Sam )?Dastyari/, str)) {
        return str.replace(/Senator (Sam )?Dastyari/, 'Senator and Chinese informant Sam Dastyari');
    }

    return str.replace(/Sam Dastyari/, 'Chinese informant Cory Bernardi');    
}

var treeWalker = document.createTreeWalker(
    document.body,
    NodeFilter.SHOW_TEXT,
    {acceptNode: function(node) {
        return matchesAny(node.nodeValue)
            ? NodeFilter.FILTER_ACCEPT 
            : NodeFilter.FILTER_REJECT;
    }},
    false
);

chrome.storage.sync.get(null, function(settings) {
    ids.map(function(id) {
        if (settings[id] == null) {
            settings[id] = true;
        }
    });

    var n = treeWalker.nextNode();
    while (n) {
        if (settings['dutton'] && matches(DUTTON, n.nodeValue)) {
            n.nodeValue = n.nodeValue.replace(/Peter Dutton/g, "Potato Dutton");    
        }
        if (settings['trump'] && matches(TRUMP, n.nodeValue)) {
           n.nodeValue = replaceTrump(n.nodeValue);    
        }
        if (settings['bernardi'] && matches(BERNARDI, n.nodeValue)) {
            n.nodeValue = replaceBernardi(n.nodeValue);
        }
        if (settings['joyce'] && matches(BARNABY, n.nodeValue)) {
            n.nodeValue = replaceBarnaby(n.nodeValue);
        }
        if (settings['malcolm'] && matches(MALCOLM, n.nodeValue)) {
            n.nodeValue = replaceMalcolm(n.nodeValue);
        }
        if (settings['tone'] && matches(TONE, n.nodeValue)) {
            n.nodeValue = replaceTony(n.nodeValue);
        }
        if (settings['brandis'] && matches(GEORGE, n.nodeValue)) {
            n.nodeValue = replaceGeorge(n.nodeValue);
        }
        if (settings['julie'] && matches(JULIE, n.nodeValue)) {
            n.nodeValue = replaceJulie(n.nodeValue);
        }
        if (settings['sam'] && matches(SAM, n.nodeValue)) {
            n.nodeValue = replaceSam(n.nodeValue);
        }
       n = treeWalker.nextNode();
    }
    chrome.storage.sync.set(settings);
});