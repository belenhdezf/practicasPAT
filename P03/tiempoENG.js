function toggleZoomScreen() { document.body.style.zoom="80%" }


const searchForm = document.getElementById("busqueda");
var results = [];

searchForm.addEventListener("submit", function(event){
event.preventDefault();

let fotosDia = ["https://p4.wallpaperbetter.com/wallpaper/557/326/420/nature-other-wallpaper-preview.jpg","https://image.freepik.com/foto-gratis/gotas-lluvia-sobre-fondo-blanco-negro_23-2147828349.jpg","https://image.freepik.com/foto-gratis/arboles-escarchados-canal-agua-paisaje-nevado-blanco-negro-concepto-invierno_137728-91.jpg","https://cdn.pixabay.com/photo/2017/05/16/00/27/trees-2316526_1280.jpg","https://sividaplena.files.wordpress.com/2013/11/cropped-paisajes-151.jpg","https://i.pinimg.com/originals/18/39/c4/1839c464370fe1e8134b1dcb4888a0df.jpg"];
let fotosNoche = ["https://img.fotocommunity.com/noche-de-tormenta-5-39f8a5dc-5ac1-4ab6-a8f0-8980c645a1db.jpg?height=1080","https://www.wallpapertip.com/wmimgs/79-790202_660914-title-photography-rain-road-night-light-wallpaper.jpg","https://sierradelguadarrama.com/wp-content/uploads/2019/02/raquetas-nieve-noche-Madrid.jpg","https://s1.1zoom.me/big0/533/431985-Kycb.jpg","https://media-cdn.tripadvisor.com/media/photo-s/0f/42/e5/bd/noche-despejada.jpg","https://p1.pxfuel.com/preview/330/611/776/month-night-night-sky-astro.jpg"];
 
//0 tomenta, 1 lluvia, 2 nieve, 3 niebla, 4 soleado, 5 nublado
fetch(`https://api.weatherbit.io/v2.0/current?city=${document.getElementById("search-input").value},&key=aeaaccd55af141f9bf1473ea2cd6c474&include=hourly&lang=en&units=I`, {
  headers: {
    Accept: 'application/json'
  },
  method: 'GET'
})
.then(Response => Response.json())
.then(r => {
  //results= r.Search;
  console.log("Updating cards");
  console.log(r);
  let html ='';
  var foto = chargePhoto();

  var i1 = `<img src=`;
  var i2 = ` class="Card image">`

  var fotoString = i1+foto+i2;
  console.log(fotoString);
  html += '<div class="card bg-dark text-black">'
          + fotoString
          +' <div class="card-img-overlay">' 
            +' <div class="row">' 
              +'<div class = "col">' 
                +'<div class ="row">'
                  +'<div class= "col-3">'
                    +`<h1 class="card-title">${r.data[0].city_name}</h1>`
                    +`<h2 class="card-text">${r.data[0].temp} ºF</h2>`
                    +`<h6 class="card-text">${r.data[0].weather.description}</h6>`
                    +`<p class="card-text"><small class="text-muted"><b>Thermal sensation ${r.data[0].app_temp}ºF</b></small></p>`
                  +'</div>'
                  +'<div class="col-1">'
                    +`<img src="https://www.weatherbit.io/static/img/icons/${r.data[0].weather.icon}.png" alt="...">`
                  +'</div>'
                +'</div>'
              +'</div>'
          +'<div class= "col">'
            +'<div class="row">'
              +'<div class= "col">'
                +'</div>'
                +'<div class="col">'
                  +'<div class="alert alert-secondary alert-dismissible fade show" role="alert">'
                    +`<h4 class="alert-heading"> Humidity and clouds</h4>`            
                    +'<hr>'
                    +`<h5><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-speedometer2" viewBox="0 0 16 16"><path d="M8 4a.5.5 0 0 1 .5.5V6a.5.5 0 0 1-1 0V4.5A.5.5 0 0 1 8 4zM3.732 5.732a.5.5 0 0 1 .707 0l.915.914a.5.5 0 1 1-.708.708l-.914-.915a.5.5 0 0 1 0-.707zM2 10a.5.5 0 0 1 .5-.5h1.586a.5.5 0 0 1 0 1H2.5A.5.5 0 0 1 2 10zm9.5 0a.5.5 0 0 1 .5-.5h1.5a.5.5 0 0 1 0 1H12a.5.5 0 0 1-.5-.5zm.754-4.246a.389.389 0 0 0-.527-.02L7.547 9.31a.91.91 0 1 0 1.302 1.258l3.434-4.297a.389.389 0 0 0-.029-.518z"/><path fill-rule="evenodd" d="M0 10a8 8 0 1 1 15.547 2.661c-.442 1.253-1.845 1.602-2.932 1.25C11.309 13.488 9.475 13 8 13c-1.474 0-3.31.488-4.615.911-1.087.352-2.49.003-2.932-1.25A7.988 7.988 0 0 1 0 10zm8-7a7 7 0 0 0-6.603 9.329c.203.575.923.876 1.68.63C4.397 12.533 6.358 12 8 12s3.604.532 4.923.96c.757.245 1.477-.056 1.68-.631A7 7 0 0 0 8 3z"/></svg> Relative humidity: ${r.data[0].rh} %</h5>`
                    +`<h5> <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-cloud-fill" viewBox="0 0 16 16"><path d="M4.406 3.342A5.53 5.53 0 0 1 8 2c2.69 0 4.923 2 5.166 4.579C14.758 6.804 16 8.137 16 9.773 16 11.569 14.502 13 12.687 13H3.781C1.708 13 0 11.366 0 9.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383z"/></svg> Cloud coverage: ${r.data[0].clouds} % </h5>`
                    +`<h5><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-droplet-fill" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M8 16a6 6 0 0 0 6-6c0-1.655-1.122-2.904-2.432-4.362C10.254 4.176 8.75 2.503 8 0c0 0-6 5.686-6 10a6 6 0 0 0 6 6zM6.646 4.646c-.376.377-1.272 1.489-2.093 3.13l.894.448c.78-1.559 1.616-2.58 1.907-2.87l-.708-.708z"/></svg> Precipitation rate: ${r.data[0].precip} in/h</h5>`
                    +`<h5><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-award" viewBox="0 0 16 16"><path d="M9.669.864L8 0 6.331.864l-1.858.282-.842 1.68-1.337 1.32L2.6 6l-.306 1.854 1.337 1.32.842 1.68 1.858.282L8 12l1.669-.864 1.858-.282.842-1.68 1.337-1.32L13.4 6l.306-1.854-1.337-1.32-.842-1.68L9.669.864zm1.196 1.193l.684 1.365 1.086 1.072L12.387 6l.248 1.506-1.086 1.072-.684 1.365-1.51.229L8 10.874l-1.355-.702-1.51-.229-.684-1.365-1.086-1.072L3.614 6l-.25-1.506 1.087-1.072.684-1.365 1.51-.229L8 1.126l1.356.702 1.509.229z"/><path d="M4 11.794V16l4-1 4 1v-4.206l-2.018.306L8 13.126 6.018 12.1 4 11.794z"/></svg> Air quality: ${r.data[0].aqi} + </h5>`
                    +'<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>'

                +'</div>'

                +'<div class="alert alert-warning alert-dismissible fade show" role="alert">'
                  +`<h4 class="alert-heading"> Sunrise & Sunset | UV index </h4>`          
                  +'<hr>'
                  +'<div class="row">'
                    +'<div class="col">'
                      +`<h5><svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-brightness-alt-high" viewBox="0 0 16 16"><path d="M8 3a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 3zm8 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zm-13.5.5a.5.5 0 0 0 0-1h-2a.5.5 0 0 0 0 1h2zm11.157-6.157a.5.5 0 0 1 0 .707l-1.414 1.414a.5.5 0 1 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm-9.9 2.121a.5.5 0 0 0 .707-.707L3.05 5.343a.5.5 0 1 0-.707.707l1.414 1.414zM8 7a4 4 0 0 0-4 4 .5.5 0 0 0 .5.5h7a.5.5 0 0 0 .5-.5 4 4 0 0 0-4-4zm0 1a3 3 0 0 1 2.959 2.5H5.04A3 3 0 0 1 8 8z"/></svg>   ${r.data[0].sunrise} </h5>`
                    +'</div>'
                    +'<div class="col">'
                      +`<h5><svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-brightness-alt-high-fill" viewBox="0 0 16 16"><path d="M8 3a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 3zm8 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zm-13.5.5a.5.5 0 0 0 0-1h-2a.5.5 0 0 0 0 1h2zm11.157-6.157a.5.5 0 0 1 0 .707l-1.414 1.414a.5.5 0 1 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm-9.9 2.121a.5.5 0 0 0 .707-.707L3.05 5.343a.5.5 0 1 0-.707.707l1.414 1.414zM8 7a4 4 0 0 0-4 4 .5.5 0 0 0 .5.5h7a.5.5 0 0 0 .5-.5 4 4 0 0 0-4-4z"/></svg>    ${r.data[0].sunset} </h5>`
                    +'</div>'
                    +'<div class="col">'
                      +`<h5><svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" class="bi bi-sun" viewBox="0 0 16 16"><path d="M3.5 8a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0z"/><path d="M8.202.28a.25.25 0 0 0-.404 0l-.91 1.255a.25.25 0 0 1-.334.067L5.232.79a.25.25 0 0 0-.374.154l-.36 1.51a.25.25 0 0 1-.282.188l-1.532-.244a.25.25 0 0 0-.286.286l.244 1.532a.25.25 0 0 1-.189.282l-1.509.36a.25.25 0 0 0-.154.374l.812 1.322a.25.25 0 0 1-.067.333l-1.256.91a.25.25 0 0 0 0 .405l1.256.91a.25.25 0 0 1 .067.334L.79 10.768a.25.25 0 0 0 .154.374l1.51.36a.25.25 0 0 1 .188.282l-.244 1.532a.25.25 0 0 0 .286.286l1.532-.244a.25.25 0 0 1 .282.189l.36 1.508a.25.25 0 0 0 .374.155l1.322-.812a.25.25 0 0 1 .333.067l.91 1.256a.25.25 0 0 0 .405 0l.91-1.256a.25.25 0 0 1 .334-.067l1.322.812a.25.25 0 0 0 .374-.155l.36-1.508a.25.25 0 0 1 .282-.19l1.532.245a.25.25 0 0 0 .286-.286l-.244-1.532a.25.25 0 0 1 .189-.282l1.508-.36a.25.25 0 0 0 .155-.374l-.812-1.322a.25.25 0 0 1 .067-.333l1.256-.91a.25.25 0 0 0 0-.405l-1.256-.91a.25.25 0 0 1-.067-.334l.812-1.322a.25.25 0 0 0-.155-.374l-1.508-.36a.25.25 0 0 1-.19-.282l.245-1.532a.25.25 0 0 0-.286-.286l-1.532.244a.25.25 0 0 1-.282-.189l-.36-1.509a.25.25 0 0 0-.374-.154l-1.322.812a.25.25 0 0 1-.333-.067L8.203.28zM8 2.5a5.5 5.5 0 1 1 0 11 5.5 5.5 0 0 1 0-11z"/></svg> ${r.data[0].uv}+ </h5>`
                    +'</div>'
                  +'</div>'                    
                  +'<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>'
                +'</div>'

                +'<div class="alert alert-danger alert-dismissible fade show" role="alert">'
                  +`<h4 class="alert-heading">Wind alerts</h4>`            
                  +'<hr>'
                  +`<h5><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-speedometer" viewBox="0 0 16 16"><path d="M8 2a.5.5 0 0 1 .5.5V4a.5.5 0 0 1-1 0V2.5A.5.5 0 0 1 8 2zM3.732 3.732a.5.5 0 0 1 .707 0l.915.914a.5.5 0 1 1-.708.708l-.914-.915a.5.5 0 0 1 0-.707zM2 8a.5.5 0 0 1 .5-.5h1.586a.5.5 0 0 1 0 1H2.5A.5.5 0 0 1 2 8zm9.5 0a.5.5 0 0 1 .5-.5h1.5a.5.5 0 0 1 0 1H12a.5.5 0 0 1-.5-.5zm.754-4.246a.389.389 0 0 0-.527-.02L7.547 7.31A.91.91 0 1 0 8.85 8.569l3.434-4.297a.389.389 0 0 0-.029-.518z"/><path fill-rule="evenodd" d="M6.664 15.889A8 8 0 1 1 9.336.11a8 8 0 0 1-2.672 15.78zm-4.665-4.283A11.945 11.945 0 0 1 8 10c2.186 0 4.236.585 6.001 1.606a7 7 0 1 0-12.002 0z"/></svg>   Wind speed: ${r.data[0].wind_spd} mph</h5>`
                  +`<h5><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-signpost-split" viewBox="0 0 16 16"><path d="M7 7V1.414a1 1 0 0 1 2 0V2h5a1 1 0 0 1 .8.4l.975 1.3a.5.5 0 0 1 0 .6L14.8 5.6a1 1 0 0 1-.8.4H9v10H7v-5H2a1 1 0 0 1-.8-.4L.225 9.3a.5.5 0 0 1 0-.6L1.2 7.4A1 1 0 0 1 2 7h5zm1 3V8H2l-.75 1L2 10h6zm0-5h6l.75-1L14 3H8v2z"/></svg>   Wind direction: ${r.data[0].wind_cdir_full}</h5>`
                  +'<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>'

                +'</div>'

                +'<div class="alert alert-success alert-dismissible fade show" role="alert">'
                  +`<h4 class="alert-heading">"Feels like" temperature</h4>`
                  +'<hr>'
                  +`<h5><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-thermometer" viewBox="0 0 16 16"><path d="M6 2a2 2 0 1 1 4 0v7.627a3.5 3.5 0 1 1-4 0V2zm2-1a1 1 0 0 0-1 1v7.901a.5.5 0 0 1-.25.433A2.499 2.499 0 0 0 8 15a2.5 2.5 0 0 0 1.25-4.666.5.5 0 0 1-.25-.433V2a1 1 0 0 0-1-1z"/><path d="M9.5 12.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/></svg>   Outdoor thermal sensation ${r.data[0].app_temp}ºF</h5>`
                  
                  +'<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>'

                +'</div>'

                +'<div class="alert alert-primary alert-dismissible fade show" role="alert">'
                  +`<h4 class="alert-heading">Time & date last update | Time zone</h4>`            
                  +'<hr>'
                  +'<div class="row">'
                    +'<div class="col">'
                      +`<h5><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-clock-fill" viewBox="0 0 16 16"><path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z"/></svg>      ${r.data[0].ob_time} </h5>`
                    +'</div>'
                    +'<div class="col">'
                      +`<h5><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-geo" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M8 1a3 3 0 1 0 0 6 3 3 0 0 0 0-6zM4 4a4 4 0 1 1 4.5 3.969V13.5a.5.5 0 0 1-1 0V7.97A4 4 0 0 1 4 3.999zm2.493 8.574a.5.5 0 0 1-.411.575c-.712.118-1.28.295-1.655.493a1.319 1.319 0 0 0-.37.265.301.301 0 0 0-.057.09V14l.002.008a.147.147 0 0 0 .016.033.617.617 0 0 0 .145.15c.165.13.435.27.813.395.751.25 1.82.414 3.024.414s2.273-.163 3.024-.414c.378-.126.648-.265.813-.395a.619.619 0 0 0 .146-.15.148.148 0 0 0 .015-.033L12 14v-.004a.301.301 0 0 0-.057-.09 1.318 1.318 0 0 0-.37-.264c-.376-.198-.943-.375-1.655-.493a.5.5 0 1 1 .164-.986c.77.127 1.452.328 1.957.594C12.5 13 13 13.4 13 14c0 .426-.26.752-.544.977-.29.228-.68.413-1.116.558-.878.293-2.059.465-3.34.465-1.281 0-2.462-.172-3.34-.465-.436-.145-.826-.33-1.116-.558C3.26 14.752 3 14.426 3 14c0-.599.5-1 .961-1.243.505-.266 1.187-.467 1.957-.594a.5.5 0 0 1 .575.411z"/></svg>  ${r.data[0].timezone} </h5>`
                    +'</div>'
                  +'</div>'
                  
                  +'<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>'

                +'</div>'

                +'</div>'
            +'</div>'             
          +'</div>'
            +'</div>'
         +'</div>'
        +'</div>';

  document.getElementById("container-cards").innerHTML = html;

  function chargePhoto(){
    var code = r.data[0].weather.code;
    console.log(code);
    var i = 4;
    if(code>=200 && code<300){
      i=0; //tormenta 
    }else if(code>=300 && code<600){
      i=1; //lluvia 
    }else if(code>=600 && code<700){
      i=2; //nieve
    }else if(code>=700 && code <800){
      i=3; //niebla 
    }else if(code>=700 && code<802){
      i=4; //soleado 
    }else if(code>=803 && code<900){
      i=5; //nublado 
    }

    var pod = r.data[0].pod;
    if(pod=="d"){
      return fotosDia[i];
    }else if(pod=="n"){
      return fotosNoche[i];
    }
    
  }
})
.catch(e => {
  console.error("Error " + e)
})
return false;
})
