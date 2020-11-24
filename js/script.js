const currentMap = new AreaMap();
currentMap.load();

const avalancheRose = new Rose(currentMap);
avalancheRose.draw();

window.currentCalendar = new Calendar(avalancheRose, currentMap);
window.currentCalendar.show();
