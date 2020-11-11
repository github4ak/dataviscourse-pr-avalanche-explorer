d3.json('data/january_2020.json').then(data => {
    let rose = new Rose(data);
    rose.drawRose();
});
