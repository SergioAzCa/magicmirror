
//Variables globales
var hora_metro = [];
var hora_metro_prox = ['Proxima hora'];
var texto_bueno = ['Horario Metro']
var datos_horario = "Horario :";

//METRO VALENCIA
// LAT LONG : 39.573050699999996 -0.32989759999999996

//PETICION PDF
//http://www.metrovalencia.es/horarios_pdf.php?origen=3&destino=11&fecha=12/11/2017&hini=00:00&hfin=23:59

//Código para la geolocalización para la posición del tiempo
navigator.geolocation.getCurrentPosition(function(position) {
  console.log(position.coords.latitude, position.coords.longitude);
  var lat= position.coords.latitude;
  var long= position.coords.longitude;
  weatherReport(lat,long); 
  google_calendar();
  calcularhorario();
  setInterval(function(){ 
    $("#tiempo").empty(); // ELIMINAMOS EL CONTENIDO PARA LA RECARGA
    $("#forecast").empty(); // BORRAMOS EL CONTENIDO PARA LA RECARGA
    $("#metro").empty();
    $("#calendar").empty();
    $("#cumple").empty();
    google_calendar();
 	weatherReport(lat,long); 
 	calcularhorario();
  },500000);//Set interval para que se refresque cada 15 min
  
});



//----------------------------------------------------------------------------
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

//----------------------------------------------------------------------------



//----------------------------------------------------------------------------
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
				humidity = Math.round(forecast.currently.humidity * 100,1),
				summary  = forecast.currently.summary,
				temp    = forecast.currently.temperature,
				aparente_temp = forecast.currently.apparentTemperature,
				rocio = forecast.currently.dewPoint,
				nubes = forecast.currently.cloudCover * 100,
				uv = 	forecast.currently.uvIndex,
				visibilidad = forecast.currently.visibility,
				ozono = forecast.currently.ozone;
				probabilidad_lluvia=Math.round(forecast.currently.precipProbability * 100,1);
				presion=forecast.currently.pressure;
		
		$("#tiempo").append(
					'<div class="shade-'+ skicons +'"><div class="card-container"><div><div class="front card"></div>' +
					"<div class='graphic_tiempo'><canvas class=" + skicons + "></canvas></div>" +
					//"<div><b>Día</b>: " + date.toLocaleDateString() + "</div>" +
					"<div><b>Prob. Lluvia</b>: " + probabilidad_lluvia + "%</div>" +
					"<div><b>Temperatura</b>: " + temp + "</div>" +
					"<div><b>Temperatura aparente</b>: " + aparente_temp + "</div>" +
					"<div><b>Humedad</b>: " + humidity + "%</div>" +
					"<div><b>Rocio</b>: " + rocio + "</div>" +
					"<div><b>Viento</b>: " + viento + " m/s</div>" +
					"<div><b>Nubes</b>: " + nubes + "%</div>" +
					"<div><b>Presión</b>: " + presion + " Hectopascals</div>" +
					"<div><b>índice UV</b>: " + uv + "</div>" +
					"<div><b>Visibilidad</b>: " + visibilidad + " Km</div>" +
					"<div><b>Ozono</b>: " + ozono + "</div>" +
					'</div></div><div class="back card">' 	
		);
		// Bucle para los días
		for(var i = 0, l = forecast.daily.data.length; i < l - 1; i++) {

			var date     = new Date(forecast.daily.data[i].time * 1000),
					day      = days[date.getDay()],
					skicons  = forecast.daily.data[i].icon,
					time     = forecast.daily.data[i].time,
					wind     = forecast.daily.data[i].windSpeed,
					humidity = Math.round(forecast.daily.data[i].humidity * 100,1),
					summary  = forecast.daily.data[i].summary,
	    probabilidad_lluvia  = Math.round(forecast.daily.data[i].precipProbability * 100,1),
					//temp    = Math.round(forecast.hourly.data[i].temperature),
					tempMin = Math.round(forecast.daily.data[i].temperatureLow),
					tempMax = Math.round(forecast.daily.data[i].temperatureMax);


		$("#forecast").append(
			    "<div class='contenedor_datos'>"+
				'<divclass="shade-'+ skicons +'">' +
				"<div class='graphic'><canvas class=" + skicons + "></canvas></div>" +
				"<div style='float:left;margin-left:5px;'><img src='/svg/calendar.svg' height='30'/>  " + date.toLocaleDateString() + "</div>" +
				//"<div style='float:left;margin-left:5px;'><img src='/svg/temperatura_basic.svg' height='30'/>  " + temp + "</div>" +
				"<div style='float:left;margin-left:5px;'><img src='/svg/temperature_cold.svg' height='30'/> " + tempMin + "</div>" +
				"<div style='float:left;margin-left:5px;'><img src='/svg/temperature_hot.svg' height='30'/>  " + tempMax + "</div>" +
				"<div style='float:left;margin-left:5px;'><img src='/svg/humidity.svg' height='30'/> " + humidity + "%</div>" +
				"<div style='float:left;margin-left:5px;'><img src='/svg/rain.svg' height='30'/>  " + probabilidad_lluvia + "%</div>" +
				"<div style='float:left;margin-left:5px;'><img src='/svg/windy.svg' height='30'/>  " + wind + "</div>" +
				"</div>"+
				'</div></div><div class="back card">' 	
		);
			// Daily forecast report for each day of the week
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

//----------------------------------------------------------------------------




//----------------------------------------------------------------------------
////FUNCION Y VARIABLES PARA METRO VALENCIA
function calcularhorario() {
	var horas_siguiente ;
	var horas_ahora;
	var hora_metro= [];
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
	        	var hora_final = texto_bueno[texto_bueno.length-1];
	        	var hora_inicio = texto_bueno[2];
        		var incluye =hora.includes(hora_busqueda);
        		var incluye_texto =hora.includes("Origen");
        		if (incluye == true && incluye_texto == false){
        			hora_metro.push(texto_bueno[i]);
        			var j = i + 1;
        		}
        		if (i == j){
        			hora_metro.push(texto_bueno[i]);
        		}
	        }
			horas_ahora = hora_metro[0].split(" ");
			//console.log("HORAS METRO"+horas_ahora)
			for (var i=0;i< horas_ahora.length;i++){
				var valor_hora = horas_ahora[i];

				if(valor_hora != "" && valor_hora != hora_busqueda_fin ){
					var numero = valor_hora.replace(':',',');
					if ( num_hora  < numero){	
						horario_metro.push(horas_ahora[i]);
					}
				}
			};
			//console.log(hora_metro.length)
			if (hora_metro.length > 1){
				horas_siguiente = hora_metro[1].split(" ");
				//console.log(horas_siguiente)
				for (var i=0;i< horas_siguiente.length;i++){
					var valor_hora = horas_siguiente[i];
					if(valor_hora != "" && valor_hora != hora_busqueda_fin_siguiente ){
						var numero = valor_hora.replace(':',',');
						if ( num_hora  < numero){
							horario_metro.push(horas_siguiente[i]);
						}
					}
				};
			};
			for (var i=0; i < horario_metro.length;i++){
				texto_horario = texto_horario +" "+horario_metro[i];
				//console.log("HORA "+num_hora+" TEXTO "+texto_horario)
			}
			//Obtener el último metro disponible
			var hora_comparar =f.getHours()+"."+f.getMinutes(); 
			var hora_final = hora_final.split(" ");
			var hora_final_horas = [];
			for(var i = 0;i< hora_final.length;i++){
				if (hora_final[i] != ""){
					hora_final_horas.push(hora_final[i])
				}
			};
			//Obtener el primer metro del día
			var hora_inicio = hora_inicio.split(" ");
			var hora_inicio_horas = [];
			for(var i = 0;i< hora_inicio.length;i++){
				if (hora_inicio[i] != ""){
					hora_inicio_horas.push(hora_inicio[i])
				}
			};
			var hora_inicio_buena = hora_inicio[2];
			var hora_final = hora_final_horas[hora_final_horas.length-1];
			var hora_final_verdad = hora_final.replace(':','.');
			console.log("HORA REAL : "+hora_comparar+" | HORA ULTIMO METRO : "+hora_final_verdad)
			if (hora_comparar > hora_final_verdad || (hora_comparar == 01 || hora_comparar == 02 || hora_comparar == 03 || hora_comparar == 04 || hora_comparar == 05 || hora_comparar == 00) || incluye_texto == true){
				$("#metro").append(
					"<div '><img style='right=100px;' src='/svg/train-travelling-on-railroad.svg' height='30'/> Ya no hay metros disponibles hasta las " + hora_inicio_buena + "</div>"
				);
			}else {
				$("#metro").append(
					"<div '><img style='right=100px;' src='/svg/train-travelling-on-railroad.svg' height='30'/> Horario : " + texto_horario + "</div>"
				);};
	     });
	}, function (reason) {
	    console.error(reason);
	})
	
return texto_horario;
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

//----------------------------------------------------------------------------

//////////////////////GOOGLE CALENDAR

//GET https://www.googleapis.com/calendar/v3/users/me/calendarList?maxResults=50&key=AIzaSyD_zoIlbCLq_ZW9gjPa2Uq6nn18sX2e6Zo
//GET https://www.googleapis.com/calendar/v3/calendars/m50vfeum9fh2k4464qcc72j014%40group.calendar.google.com/events?key=AIzaSyDFNYWM5Xk33euOTjB88ztXM0ryYktJQLU
//https://www.googleapis.com/calendar/v3/calendars/serazca%40gmail.com/events?timeMax=2017-11-29T10%3A00%3A00-07%3A00&timeMin=2017-01-29T10%3A00%3A00-07%3A00&key=AIzaSyDFNYWM5Xk33euOTjB88ztXM0ryYktJQLU
//https://www.googleapis.com/calendar/v3/calendars/m50vfeum9fh2k4464qcc72j014%40group.calendar.google.com/events?timeMax=2017-11-29T10%3A00%3A00-07%3A00&timeMin=2017-01-29T10%3A00%3A00-07%3A00&key=AIzaSyDFNYWM5Xk33euOTjB88ztXM0ryYktJQLU
//https://www.googleapis.com/calendar/v3/calendars/m50vfeum9fh2k4464qcc72j014%40group.calendar.google.com/events?key=AIzaSyDFNYWM5Xk33euOTjB88ztXM0ryYktJQLU
function google_calendar(){

	var dateObj = new Date();
	var month = dateObj.getUTCMonth() + 1; //mes de 1 a 12 empieza en 0 de ahi el +1
	var day = dateObj.getUTCDate();
	var year = dateObj.getUTCFullYear();
	fecha_ini = year + "-" + month + "-" + day;
	dia_siguiente = day + 7;
	if (dia_siguiente >= 27){
		var dia_siguiente = "01";
		if (month == 12){
			month = "01";
		}else {
			month = month + 1
		}	
	}else {
		var dia_siguiente = day + 7;
	}
	fecha_fin = year + "-" + month + "-" + dia_siguiente;
	//request = "https://www.googleapis.com/calendar/v3/calendars/m50vfeum9fh2k4464qcc72j014%40group.calendar.google.com/events?timeMax="+String(fecha_fin)+"T10%3A00%3A00-07%3A00&timeMin="+String(fecha_ini)+"T10%3A00%3A00-07%3A00&key=AIzaSyDFNYWM5Xk33euOTjB88ztXM0ryYktJQLU";
	//console.log(request)
	//CALENDARIO CONJUNTO
	$.getJSON("https://www.googleapis.com/calendar/v3/calendars/m50vfeum9fh2k4464qcc72j014%40group.calendar.google.com/events?timeMax="+String(fecha_fin)+"T10%3A00%3A00-07%3A00&timeMin="+String(fecha_ini)+"T10%3A00%3A00-07%3A00&key=AIzaSyDFNYWM5Xk33euOTjB88ztXM0ryYktJQLU", function(calendar){
	   //console.log(calendar)
	   for(var i = 0, l = calendar.items.length; i < l ; i++) {
	   			
			evento = calendar.items[i].summary;
			empieza = calendar.items[i].start.dateTime;
			var particion_empieza = empieza.split("T");
			var particion_1 = particion_empieza[0];
			var hora_empieza = particion_1.split("-");
			var dia_empieza = hora_empieza[2];
			var mes_empieza = hora_empieza[1];
			var anyo_empieza = hora_empieza[0];
			var hora_empieza_real = dia_empieza+"-"+mes_empieza+"-"+anyo_empieza;
			acaba = calendar.items[i].end.dateTime;
			var particion_acaba = acaba.split("T");
			var particion_2 = particion_acaba[0];
			var hora_acaba = particion_2.split("-");
			var dia_acaba = hora_acaba[2];
			var mes_acaba = hora_acaba[1];
			var anyo_acaba = hora_acaba[0];
			var hora_acaba_real = dia_acaba+"-"+mes_acaba+"-"+anyo_acaba;
			if (hora_empieza_real == hora_acaba_real){
				hora_acaba_real ="";
			};

			$("#calendar").append(
			    "<div class='contenedor_calendar'>"+
				"<div style='float:left;margin-left:5px;'><img src='/svg/calendar_google.svg' height='30'/>  " + evento + "</div>" +
				"<div style='float:left;margin-left:5px;'> " + hora_empieza_real + "</div>" +
				"<div style='float:left;margin-left:5px;'> " + hora_acaba_real + "</div>" +
				"</div>"
			);
	   };
	});
	//CALENDARIO CUMPLEAÑOS
	$.getJSON("https://www.googleapis.com/calendar/v3/calendars/#contacts@group.v.calendar.google.com/events?timeMax="+String(fecha_fin)+"T10%3A00%3A00-07%3A00&timeMin="+String(fecha_ini)+"T10%3A00%3A00-07%3A00&key=AIzaSyDFNYWM5Xk33euOTjB88ztXM0ryYktJQLU", function(calendar){
	   //console.log(calendar);
	   for(var i = 0, l = calendar.items.length; i < l ; i++) {
   			evento = calendar.items[i].summary;
   			$("#cumples").append(
				    "<div class='contenedor_cumpleaños'>"+
					"<div style='float:left;margin-left:5px;'><img src='/svg/calendar_google.svg' height='30'/>  " + evento + "</div>" +
					"</div>"
			);
	   };
	});

}


