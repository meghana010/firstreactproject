import { useEffect ,useState } from "react";
import cl from "./assets/cold.jpg";
import ht from "./assets/sunny.jpg";
import Description from "./components/Description";
import { getFormattedWeatherData } from "./weatherservice";
function App() {
  const [city,setCity]=useState("Hyderabad");
  const [weather,setWeather]= useState(null);
  const [units,setUnits]= useState('metric');
  const [bg,setBg]=useState(ht);

  useEffect(()=>{
  const  fetchweatherdata=async ()=>{
      const data=await getFormattedWeatherData(city,units);
      if(data===null || data===undefined)
      return;
      setWeather(data);
      const threshold='metric'? 20 :70;
        if(data.temp<=threshold)
        {
          setBg(cl);
        }
        else
        {
          setBg(ht);
        }

    };
    fetchweatherdata();
  },[units,city]
    
  );

const enterkeypressed=async (e)=>{
if(e.keyCode===13)
{
  const x=e.currentTarget.value;
  console.log("ki");
  const t = await getFormattedWeatherData(x,document.getElementById("btn").innerText.slice(1)==='C'?  'metric' : 'imperial' ));
  
  console.log("t:", t);
  if(t===null || t===undefined){
    alert("City doesnot exist. Please kindly cross-check");
 
  }
  else{
    
    setCity(x);
  }
}
};

  const handlecl=(e)=>{
    const button=e.currentTarget;
   const currentUnit = button.innerText.slice(1);
button.innerText=currentUnit==='C'? '℉' : '℃';
setUnits(currentUnit==='C' ? 'metric' : 'imperial');
  };
  return (
    <div className="app"  style={{backgroundImage:`url(${bg})`}}>
  
    
   <div className="overlay">
    
{weather  && (<div className="container">
<div className="section section__inputs">
<input onKeyDown={(e)=>enterkeypressed(e)} type="text" name="city" placeholder="Enter city .."/>
<button onClick={(e)=>handlecl(e) } id="btn">{`°${units==='metric' ? 'F':'C'}`}</button>
</div>
<div className="section section__temperature">
  <div className="icon">
    <h3>{`${weather.name},${weather.country}`}</h3>
    <img src={weather.iconURL} alt=""/> </div>
    <h3>{`${weather.description}`}</h3>


<div className="temperature">
<h1>{`${weather.temp.toFixed()} °${units==='metric' ? 'C':'F'}`}</h1>
</div>


</div>
<Description weather={weather} units={units}/>
   </div>)}

   </div>


    </div>
    
  );
}

export default App;
