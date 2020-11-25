new AreaMap().load().then(function(map) {
    const avalancheRose = new Rose(map);
    avalancheRose.draw();

    window.currentCalendar = new Calendar(avalancheRose, map);
    window.currentCalendar.show();
});
