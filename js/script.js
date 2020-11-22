
d3.json('data/january_2020.json').then(data => {
    const currentMap = new AreaMap();
    currentMap.load();

    window.avalancheRose = new Rose(data, currentMap);
    avalancheRose.draw();
    avalancheRose.showForecast();
});