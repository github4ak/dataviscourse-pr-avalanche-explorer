class Info{
    static uac_forecast_url_prefix = "https://utahavalanchecenter.org/forecast/salt-lake/"
    static uac_observation_url_part_1_of_2 = "https://utahavalanchecenter.org/observations?rid=All&term=6&fodv%5Bmin%5D%5B";
    static uac_observation_url_part_2_of_2 = "&fodv%5Bmax%5D%5B";
    static uac_tutorial_url = "https://utahavalanchecenter.org/forecast/tutorial";

    showTextInfo(date){

        let that = this;
        
        let infoDiv = document.getElementById("info-view");

        that.updateForecast(infoDiv, date);
        that.updateObservation(infoDiv, date);
        that.showTutorial(infoDiv);

    }

    updateForecast(infoDiv, date){

        let that = this;

        let forecastParagraph = document.getElementById("uac-forecast-today");

        let url_date = that.getUrlFormattedDate(date,true);

        let a = document.createElement('a');  
        let link = document.createTextNode("here"); 
        a.appendChild(link);  

        a.title = "forecast-link";  
        a.href = Info.uac_forecast_url_prefix+url_date; 
        a.target="_blank" 
        a.rel="noopener noreferrer"

        forecastParagraph.innerHTML = "The official forecast for the Salt Lake area mountains for "+"<b><i>"+url_date+"</i></b>"+" can be found "
        forecastParagraph.appendChild(a);
        infoDiv.appendChild(forecastParagraph);
    }

    updateObservation(infoDiv, date){

        let that = this;

        let observationParagraph = document.getElementById("uac-observation-today");

        let url_date = that.getUrlFormattedDate(date,false);
        let forecast_date = that.getUrlFormattedDate(date,true);
        
        let a = document.createElement('a');  
        let link = document.createTextNode("here"); 
        a.appendChild(link);  

        a.title = "observation-link";  
        a.href = Info.uac_observation_url_part_1_of_2+url_date+Info.uac_observation_url_part_2_of_2+url_date;
        a.target="_blank" 
        a.rel="noopener noreferrer"

        observationParagraph.innerHTML = "The official observations for the Salt Lake region for "+"<b><i>"+forecast_date+"</i></b>"+" can be found "
        observationParagraph.appendChild(a);
        infoDiv.appendChild(observationParagraph);

    }

    showTutorial(infoDiv){

        let that = this;

        let tutorialParagraph = document.getElementById("uac-tutorial");
        
        let a = document.createElement('a');  
        let link = document.createTextNode("here"); 
        a.appendChild(link);  

        a.title = "tutorial-link";  
        a.href = Info.uac_tutorial_url;
        a.target="_blank" 
        a.rel="noopener noreferrer"

        tutorialParagraph.innerHTML = "The official tutorial on how to read the forecast can be found "
        tutorialParagraph.appendChild(a);
        infoDiv.appendChild(tutorialParagraph);

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