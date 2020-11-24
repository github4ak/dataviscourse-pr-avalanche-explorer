class Calendar {
    constructor(rose, map) {
        this.rose = rose;
        this.map = map;
    }

    show() {
        UACForecasts.load().then((data) => {
            this.data = data;
            const date = d3.timeDay(new Date('01-01-2020'));
            this.selectDate(date);
        });
    }

    selectDate(date) {
        const forecast = this.data.get(date.toJSON());
        this.map.forecast = forecast;
        this.map.infoBox.text(date.toLocaleDateString());
        this.rose.showForecast(forecast);
    }
}