class Info{
    static uac_forecast_url_prefix = "https://utahavalanchecenter.org/forecast/salt-lake/"
    static uac_observation_url_part_1_of_2 = "https://utahavalanchecenter.org/observations?rid=All&term=6&fodv%5Bmin%5D%5B";
    static uac_observation_url_part_2_of_2 = "&fodv%5Bmax%5D%5B";

    constructor() {
        this.forecastLink = document.getElementById("daily-forecast");
        this.observationLink = document.getElementById("daily-observations");
        this.currentDateSpan = document.getElementById("info-view-date")
    }

    showTextInfo(date){
        this.currentDateSpan.textContent = date.toLocaleDateString();
        this.updateForecast(date);
        this.updateObservation(date);
    }

    updateForecast(date){
        const url_date = this.getUrlFormattedDate(date,true);

        this.forecastLink.setAttribute(
            'href',
            Info.uac_forecast_url_prefix + url_date
        );
    }

    updateObservation(date){
        const url_date = this.getUrlFormattedDate(date,false);

        this.observationLink.setAttribute(
            'href',
            Info.uac_observation_url_part_1_of_2 + url_date +
            Info.uac_observation_url_part_2_of_2 + url_date
        )
    }

    getUrlFormattedDate(date, isUpdateForecast){
        let unprefixedDate = date.getDate();
        let day = parseInt(unprefixedDate) < 10 && !isUpdateForecast ? "0"+unprefixedDate : unprefixedDate;

        let oneIndexedMonth = parseInt(date.getMonth())+1;
        let month = parseInt(oneIndexedMonth) < 10 && !isUpdateForecast ? "0"+oneIndexedMonth : oneIndexedMonth;

        let year = date.getFullYear();

        if(isUpdateForecast){
            return month+"/"+day+"/"+year;
        }

        return "date%5D="+month+"%2F"+day+"%2F"+year;
    }
}