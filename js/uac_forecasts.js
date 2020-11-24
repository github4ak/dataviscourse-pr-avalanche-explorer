class UACForecasts {
    static parseLevel(levelData) {
        let data = {};
        let level = 1;
        for (let i = 0; i < 24; i++) {
            if (i === 8 || level === 16) level++;
            data[i + 1] = levelData[
                `${UACForecasts.DATA_PREFIX}-${level}/${Rose.DIRECTIONS[i % 8]}`
                ];
        }
        return data;
    }

    static parse(data) {
        return d3.rollup(
            data,
            v => UACForecasts.parseLevel(v[0]),
            d => d.date
        )
    }
}

UACForecasts.DATA_PREFIX = 'data/level';
