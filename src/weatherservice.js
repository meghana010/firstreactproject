const API_KEY='176f26dadbd9995d7e007c50c12e7776';

const makeIconURL=(iconId)=>`https://openweathermap.org/img/wn/${iconId}@2x.png`;
const getFormattedWeatherData = async (city,units='metric')=>{
    

    URL=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=${units}`;
    
const data=await fetch(URL)
.then((res)=>res.json())
.then((data)=>data);
//console.log(data);
if(data.cod==="404")
    {
        return null;
    }
    else
    {
const {weather,main:{temp,feels_like,temp_min,temp_max,pressure,humidity},wind:{speed},sys:{country},name,cod}=data;
 const {description,icon}=weather[0];
return {
    description,iconURL:makeIconURL(icon),temp,feels_like,temp_min,temp_max,pressure,humidity,speed,country,name,cod
};
};
}
export {getFormattedWeatherData};