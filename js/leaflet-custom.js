var mymap = L.map('mapid', {scrollWheelZoom: false}).setView([42.69843, 2.90185], 17);

var OpenStreetMap_Mapnik = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(mymap);

var marker = L.marker([42.69843, 2.90185]).addTo(mymap)
    .bindPopup("<b>AliceLab</b><br />29 place du Puig<br />66000 Perpignan", {closeButton: false}).openPopup();
