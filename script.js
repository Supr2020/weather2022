let loc =document.getElementById("location");
let tempvalue=document.getElementById("temp-value");
let climate =document.getElementById("climate");
let iconfile;
const searchInput=document.getElementById("serach-input");
const searchButton=document.getElementById("search-button");

searchButton.addEventListener('click',(e)=>
{
    e.preventDefault();
    getWeather(searchInput.value);
    searchInput.value='';

});
const getWeather=async (city)=>
{
    try{
        const response= await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=d17cb352b84e1224366e3762b9c5c6c6`,
        {mode:'cors'}
        );
        const weatherData= await response.json();
        console.log(weatherData);
        const{name}=weatherData;
        const{feels_like}=weatherData.main ;
        const{id,main}=weatherData.weather[0]; 
        loc.textContent= name;
        climate.textContent=main;
        tempvalue.textContent=Math.round(feels_like-273);

    
    }
    catch(error)
    {
        alert('City not found')
    }
};

window.addEventListener("load"  ,()=>{
    let long;
    let lat;
     if(navigator.geolocation)
     {

        navigator.geolocation.getCurrentPosition((position)=>
        {
            long=position.coords.longitude;
            lat=position.coords.latitude;
            const proxy="https://cors-anywhere.herokuapp.com/";

            const api=`${proxy}api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=d17cb352b84e1224366e3762b9c5c6c6 `
            fetch(api).then((response)=>{
                return response.json();

            })
            .then (data=>
                {
                    const{name}=data;
                    const{feels_like}=data.main;
                    const{id,main}=data.weather[0];

                    loc.textContent=name;
                    climate.textContent=main;
                    tempvalue.textContent=Math.round(feels_like-273);
                    console.log(data);
                })
        }
        )}
     
})
