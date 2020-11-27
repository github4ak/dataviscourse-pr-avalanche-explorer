new AreaMap().then(function(map) {
    const avalancheRose = new Rose(map);
    const info = new Info();
    avalancheRose.draw();

    window.currentCalendar = new Calendar(avalancheRose, map, info);
    window.currentCalendar.show();
    
});
