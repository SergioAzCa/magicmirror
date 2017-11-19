
//Variables globales
var hora_metro = [];
var hora_metro_prox = ['Proxima hora'];
var texto_bueno = ['Horario Metro']
var datos_horario = "Horario :";

//METRO VALENCIA


//PETICION PDF
//http://www.metrovalencia.es/horarios_pdf.php?origen=3&destino=11&fecha=12/11/2017&hini=00:00&hfin=23:59

//Código para la geolocalización para la posición del tiempo
navigator.geolocation.getCurrentPosition(function(position) {
  console.log(position.coords.latitude, position.coords.longitude);
  var lat= position.coords.latitude;
  var long= position.coords.longitude;
  weatherReport(lat,long); 
  calcularhorario();
  setInterval(function(){ 
    $("#tiempo").empty(); // ELIMINAMOS EL CONTENIDO PARA LA RECARGA
    $("#forecast").empty(); // BORRAMOS EL CONTENIDO PARA LA RECARGA
 	 weatherReport(lat,long); 

  },500000);//Set interval para que se refresque cada 15 min
  
});



//RELOJ DIGITAL
$(document).ready(function() {
// Create two variable with the names of the months and days in an array
var monthNames = [ "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre" ]; 
var dayNames= ["Domingo","Lunes","Martes","Miercoles","Jueves","Viernes","Sabado"]

// Create a newDate() object
var newDate = new Date();
// Extract the current date from Date object
newDate.setDate(newDate.getDate());
// Output the day, date, month and year   
$('#Date').html(dayNames[newDate.getDay()] + " " + newDate.getDate() + ' ' + monthNames[newDate.getMonth()] + ' ' + newDate.getFullYear());

setInterval( function() {
	// Create a newDate() object and extract the seconds of the current time on the visitor's
	var seconds = new Date().getSeconds();
	// Add a leading zero to seconds value
	$("#sec").html(( seconds < 10 ? "0" : "" ) + seconds);
	},1000);
	
setInterval( function() {
	// Create a newDate() object and extract the minutes of the current time on the visitor's
	var minutes = new Date().getMinutes();
	// Add a leading zero to the minutes value
	$("#min").html(( minutes < 10 ? "0" : "" ) + minutes);
    },1000);
	
setInterval( function() {
	// Create a newDate() object and extract the hours of the current time on the visitor's
	var hours = new Date().getHours();
	// Add a leading zero to the hours value
	$("#hours").html(( hours < 10 ? "0" : "" ) + hours);
    }, 1000);	
});












//INICIO DE LAS FUNCIONES para el tiempo
function weatherReport(lat,long) {
	
	


	var apiKey           = '328d9ebcd87e9efeb1df8eaecc146730',
			url          = 'https://api.darksky.net/forecast/',
			lati         = lat,
			longi        = long,
			api_call     = url + apiKey + "/" + lat + "," + long+ "?lang=es&units=si&extend=hourly&callback=?";
			console.log(api_call);
	// Hold our days of the week for reference later.
	var days = [
		'Sunday',
		'Monday',
		'Tuesday',
		'Wednesday',
		'Thursday',
		'Friday',
		'Saturday'
	];

	var sunday    = [],
		monday    = [],
		tuesday   = [],
		wednesday = [],
		thursday  = [],
		friday    = [],
		saturday  = [];

	function hourlyReport(day, selector) {
		for(var i = 0, l = day.length; i < l; i++) {
			$("." + selector + " " + "ul").append('<li>' + Math.round(day[i]) + '</li>');
		}
	}

	// Call to the DarkSky API to retrieve JSON
	$.getJSON(api_call, function(forecast) {

		//DIA ACTUAL
			var date     = new Date(forecast.currently.time * 1000),
				abreviatura = forecast.currently.summary,
				skicons     = forecast.currently.icon,
				tiempo     = forecast.currently.time,
				viento     = forecast.currently.windSpeed,
				humidity = forecast.currently.humidity,
				summary  = forecast.currently.summary,
				temp    = forecast.currently.temperature,
				aparente_temp = forecast.currently.apparentTemperature,
				rocio = forecast.currently.dewPoint,
				nubes = forecast.currently.cloudCover,
				uv = 	forecast.currently.uvIndex,
				visibilidad = forecast.currently.visibility,
				ozono = forecast.currently.ozone;
		
		$("#tiempo").append(
					'<div class="shade-'+ skicons +'"><div class="card-container"><div><div class="front card"></div>' +
					"<div class='graphic_tiempo'><canvas class=" + skicons + "></canvas></div>" +
					//"<div><b>Día</b>: " + date.toLocaleDateString() + "</div>" +
					"<div><b>Temperatura</b>: " + temp + "</div>" +
					"<div><b>Temperatura aparente</b>: " + aparente_temp + "</div>" +
					"<div><b>Humedad</b>: " + humidity *100+ "%</div>" +
					"<div><b>Rocio</b>: " + rocio + "</div>" +
					"<div><b>Viento</b>: " + viento + "</div>" +
					"<div><b>Nubes</b>: " + nubes + "</div>" +
					"<div><b>índice UV</b>: " + uv + "</div>" +
					"<div><b>Visibilidad</b>: " + visibilidad + "</div>" +
					"<div><b>Ozono</b>: " + ozono + "</div>" +
					'</div></div><div class="back card">' 
					
			);


		// Bucle para las horas
		for(var j = 0, k = forecast.hourly.data.length; j < k; j++) {
			var hourly_date    = new Date(forecast.hourly.data[j].time * 1000),
					hourly_day     = days[hourly_date.getDay()],
					hourly_temp    = forecast.hourly.data[j].temperature;

			// Ponemos los valores de 24 horas en los array vacios
			switch(hourly_day) {
				case 'Sunday':
					sunday.push(hourly_temp);
					break;
				case 'Monday':
					monday.push(hourly_temp);
					break;
				case 'Tuesday':
					tuesday.push(hourly_temp);
					break;
				case 'Wednesday':
					wednesday.push(hourly_temp);
					break;
				case 'Thursday':
					thursday.push(hourly_temp);
					break;
				case 'Friday':
					friday.push(hourly_temp);
					break;
				case 'Saturday':
					saturday.push(hourly_temp);
					break;
				default: console.log(hourly_date.toLocaleTimeString());
					break;
			}
		}

		// Bucle para los días
		for(var i = 0, l = forecast.daily.data.length; i < l - 1; i++) {

			var date     = new Date(forecast.daily.data[i].time * 1000),
					day      = days[date.getDay()],
					skicons  = forecast.daily.data[i].icon,
					time     = forecast.daily.data[i].time,
					wind     = forecast.daily.data[i].windSpeed,
					humidity = forecast.daily.data[i].humidity,
					summary  = forecast.daily.data[i].summary,
					temp    = Math.round(forecast.hourly.data[i].temperature),
					tempMin = Math.round(forecast.daily.data[i].temperatureLow),
					tempMax = Math.round(forecast.daily.data[i].temperatureMax);



			// Append Markup for each Forecast of the 7 day week
			
			$("#forecast").append(
				    "<div class='contenedor_datos'>"+
					'<divclass="shade-'+ skicons +'">' +
					"<div class='graphic'><canvas class=" + skicons + "></canvas></div>" +
					"<div style='float:left;margin-left:5px;'><img src='/svg/calendar.svg' height='30'/>  " + date.toLocaleDateString() + "</div>" +
					"<div style='float:left;margin-left:5px;'><img src='/svg/temperatura_basic.svg' height='30'/>  " + temp + "</div>" +
					"<div style='float:left;margin-left:5px;'><img src='/svg/temperature_cold.svg' height='30'/> " + tempMin + "</div>" +
					"<div style='float:left;margin-left:5px;'><img src='/svg/temperature_hot.svg' height='30'/>  " + tempMax + "</div>" +
					"<div style='float:left;margin-left:5px;'><img src='/svg/humidity.svg' height='30'/> " + humidity + "</div>" +
					"<div style='float:left;margin-left:5px;'><img src='/svg/windy.svg' height='30'/>  " + wind + "</div>" +
					"</div>"+
					'</div></div><div class="back card">' 
					
			);

			// Daily forecast report for each day of the week
			switch(day) {
				case 'Sunday':
					hourlyReport(sunday, days[0]);
					break;
				case 'Monday':
					hourlyReport(monday, days[1]);
					break;
				case 'Tuesday':
					hourlyReport(tuesday, days[2]);
					break;
				case 'Wednesday':
					hourlyReport(wednesday, days[3]);
					break;
				case 'Thursday':
					hourlyReport(thursday, days[4]);
					break;
				case 'Friday':
					hourlyReport(friday, days[5]);
					break;
				case 'Saturday':
					hourlyReport(saturday, days[6]);
					break;
			}
		}
		
		skycons(); //Añadimos los iconos
	});
}

function staggerFade() {
	setTimeout(function() {
		$('.fadein-stagger > *').each(function() {
			$(this).addClass('js-animated');
		})
	}, 30);
}
function skycons() {
        var i,
            icons = new Skycons({
               //"color" : "#190f707",
               "color" : "#FFFFFF",
                "resizeClear": true // nasty android hack
            }),
            list  = [ // listing of all possible icons
                "clear-day",
                "clear-night",
                "partly-cloudy-day",
                "partly-cloudy-night",
                "cloudy",
                "rain",
                "sleet",
                "snow",
                "wind",
                "fog"
            ];
    // loop thru icon list array
    for(i = list.length; i--;) {
        var weatherType = list[i], // select each icon from list array
                // icons will have the name in the array above attached to the 
                // canvas element as a class so let's hook into them.
                elements    = document.getElementsByClassName( weatherType );
 
        // loop thru the elements now and set them up
        for (e = elements.length; e--;) {
            icons.set(elements[e], weatherType);
        }
    }
     
    // animate the icons
    icons.play();
}







////FUNCION Y VARIABLES PARA METRO VALENCIA



function calcularhorario() {
	var f=new Date();
	hora=f.getHours()+":"+f.getMinutes(); 
	hora_busqueda=f.getHours()+":";
	hora_busqueda_fin=f.getHours();
	hora_busqueda_fin_siguiente=f.getHours() + 1;
	var num_hora = hora.replace(':',',');
	let horario_metro = [];
	let texto_horario = "";

	var PDF_URL  = '../PDF/metrohorario.pdf';
	PDFJS.getDocument(PDF_URL).then(function (PDFDocumentInstance) {
	    var totalPages = PDFDocumentInstance.pdfInfo.numPages;
	    var pageNumber = 1;
	    //Extrae el texto
	    getPageText(pageNumber , PDFDocumentInstance).then(function(textPage){
	    	//Separamos por los guiones
	        var texto = textPage.split('---')
	        for (var i=0;i < texto.length;i++){
	        	if(texto[i] === " "){
	        	}else {
	        		texto_bueno.push(texto[i]);
	        	}
	        };
	        for (var i = 0; i < texto_bueno.length;  i++){
	        	var hora = texto_bueno[i];
        		var incluye =hora.includes(hora_busqueda);
        		if (incluye == true){
        			hora_metro.push(texto_bueno[i]);
        			var j = i + 1;
        		}
        		if (i == j){
        			hora_metro.push(texto_bueno[i]);
        		}
	        }
	        
			horas_ahora = hora_metro[0].split(" ");
			for (var i=0;i< horas_ahora.length;i++){
				var valor_hora = horas_ahora[i];
				if(valor_hora != "" && valor_hora != hora_busqueda_fin ){
					var numero = valor_hora.replace(':',',');
					if ( num_hora  < numero){
						horario_metro.push(horas_ahora[i]);
					}

				}

			};
			horas_siguiente = hora_metro[1].split(" ");
			for (var i=0;i< horas_siguiente.length;i++){
				var valor_hora = horas_siguiente[i];
				if(valor_hora != "" && valor_hora != hora_busqueda_fin_siguiente ){
					var numero = valor_hora.replace(':',',');
					if ( num_hora  < numero){
						horario_metro.push(horas_siguiente[i]);
					}
				}
			};
			for (var i=0; i< horario_metro.length;i++){
				texto_horario = texto_horario +" "+horario_metro[i];
			}
			$("#metro").append(
					"<div '><img style='right=100px;' src='/svg/train-travelling-on-railroad.svg' height='30'/>  " + texto_horario + "</div>"
					 );
	     });
	}, function (reason) {
	    console.error(reason);
	})
	
return hora_metro;
	
}


function getPageText(pageNum, PDFDocumentInstance) {
    return new Promise(function (resolve, reject) {
        PDFDocumentInstance.getPage(pageNum).then(function (pdfPage) {
            pdfPage.getTextContent().then(function (textContent) {
                var textItems = textContent.items;
                var finalString = "";
                for (var i = 0; i < textItems.length; i++) {
                    var item = textItems[i];
                    finalString += item.str + " ";
                }
                resolve(finalString);
            });
        });
    });
}


