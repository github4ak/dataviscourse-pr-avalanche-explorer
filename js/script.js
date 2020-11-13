// Leaflet needs to be loaded first.
// See below for reasoning.
window.currentMap = new AreaMap();
window.currentMap.load();

window.currentDropdown = new Dropdown();
window.currentDropdown.load()

// Draw rose after the Leaflet map, as Leaflet is
// interfering with positioning otherwise.
d3.json('data/january_2020.json').then(data => {
    let rose = new Rose(data);
    rose.draw();
    rose.showForecast();
});