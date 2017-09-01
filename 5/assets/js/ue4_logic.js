function getRSS() {
    var xhr = new XMLHttpRequest();
    if (xhr) {
        xhr.open('GET', 'http://localhost:8888/rss', true);

        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4 && xhr.status == 200) {
                showRSS(xhr);
            }
        }
        
        xhr.send();
    }
}

function showRSS(xml) {
    var items = xml.responseXML.getElementsByTagName("item");

    for (var i=0; i < items.length; ++i) {
        if (items[i].childNodes) {
            var node = document.createElement("div");
            node.setAttribute("class", "item");
            node.setAttribute("id", "feed-" + i);

            var title = document.createElement("h2");
            title.innerHTML = items[i].childNodes[1].firstChild.nodeValue;
            node.appendChild(title);

            var description = document.createElement("p");
            description.setAttribute("class", "description");
            description.innerHTML = items[i].childNodes[5].firstChild.nodeValue;
            node.appendChild(description);

            var link = document.createElement("a");
            link.setAttribute("class", "btn btn-primary btn-sm");
            link.setAttribute("type", "button");
            link.setAttribute("target", "_blank");
            link.setAttribute("href", items[i].childNodes[3].firstChild.nodeValue);
            link.innerHTML = "More";
            node.appendChild(link);  // Button with link to website
            
            $("#content").append(node);
        }
    }
}
