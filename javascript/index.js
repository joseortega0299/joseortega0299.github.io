src="https://maps.googleapis.com/maps/api/js?key=AIzaSyA1ApTl2C0qpKmtfzAkE8H1yriqr_iifvo&libraries=places&callback=initAutocomplete"


function calcular_distancia(latitud1,latitud2,longitud1,longitud2) {
  var R = 6378137; // Earth’s mean calcular_mateius in meter
  var dLat = calcular_mate(latitud2 - latitud1);
  var dLong = calcular_mate(longitud2 - longitud1);
  var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(calcular_mate(latitud1)) * Math.cos(calcular_mate(latitud2)) *
    Math.sin(dLong / 2) * Math.sin(dLong / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c;
  return d; // returns the distance in meter
}

function initAutocomplete() {
        var map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: 33.810485, lng: -117.91898900000001},
          zoom: 13,
          mapTypeId: 'roadmap'
        });

        // Create the search box and link it to the UI element.
        var input = document.getElementById('pac-input');
        var searchBox = new google.maps.places.SearchBox(input);
        map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

        // Bias the SearchBox results towards current map's viewport.
        map.addListener('bounds_changed', function() {
          searchBox.setBounds(map.getBounds());
        });

        var markers = [];
        // Listen for the event fired when the user selects a prediction and retrieve
        // more details for that place.
        searchBox.addListener('places_changed', function() {
          var places = searchBox.getPlaces();

          if (places.length == 0) {
            return;
          }

          // Clear out the old markers.
          markers.forEach(function(marker) {
            marker.setMap(null);
          });
          markers = [];

          // For each place, get the icon, name and location.
          var bounds = new google.maps.LatLngBounds();
          places.forEach(function(place) {
            if (!place.geometry) {
              console.log("Returned place contains no geometry");
              return;
            }
            var icon = {
              url: place.icon,
              size: new google.maps.Size(71, 71),
              origin: new google.maps.Point(0, 0),
              anchor: new google.maps.Point(17, 34),
              scaledSize: new google.maps.Size(25, 25)
            };

            // Create a marker for each place.
            markers.push(new google.maps.Marker({
              map: map,
              icon: icon,
              title: place.name,
              position: place.geometry.location
            }));

            var inputFechaSalida = document.getElementById("salidadate").value;
            var inputFechaLlegada = document.getElementById('llegadadate').value;
            var inputTags = document.getElementById('txtTags').value;
            var inputInfoAdicional = document.getElementById('txtInfoadicional').value;
            
            var latlng = new google.maps.LatLng(parseFloat(place.geometry.location.lat()), parseFloat(place.geometry.location.lng()));
            new google.maps.Geocoder().geocode({'latLng' : latlng}, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
        if (results[1]) {
            var country = null, countryCode = null, city = null, cityAlt = null;
            var c, lc, component;
            for (var r = 0, rl = results.length; r < rl; r += 1) {
                var result = results[r];

                if (!city && result.types[0] === 'locality') {
                    for (c = 0, lc = result.address_components.length; c < lc; c += 1) {
                        component = result.address_components[c];

                        if (component.types[0] === 'locality') {
                            city = component.long_name;
                            break;
                        }
                    }
                }
                else if (!city && !cityAlt && result.types[0] === 'administrative_area_level_1') {
                    for (c = 0, lc = result.address_components.length; c < lc; c += 1) {
                        component = result.address_components[c];

                        if (component.types[0] === 'administrative_area_level_1') {
                            cityAlt = component.long_name;
                            break;
                        }
                    }
                } else if (!country && result.types[0] === 'country') {
                    country = result.address_components[0].long_name;
                    countryCode = result.address_components[0].short_name;
                }

                if (city && country) {
                    break;
                }
            }
            for (i = 0; i < array_paises.length; i++){
              if (countryCode === array_paises[i]){
                  break;
              } 
            }
            if (i === array_paises.length){
              array_paises.push(countryCode);
            }

            for (z = 0; z < array_ciudades.length; z++){
              if (city === array_ciudades[z]){
                  break;
              } 
            }
            if (z === array_ciudades.length){
              array_ciudades.push(city);
            }
            console.log("City: " + city + ", City2: " + cityAlt + ", Country: " + country + ", Country Code: " + countryCode);
        }
    }
});
            LatLong=place;
            
            if (place.geometry.viewport) {
              // Only geocodes have viewport.
              bounds.union(place.geometry.viewport);
            } else {
              bounds.extend(place.geometry.location);
            }
            
          });

          map.fitBounds(bounds);

        });

        
      }

function GuardarViaje(){
  var inputFechaSalida = document.getElementById("salidadate").value;
  var inputFechaLlegada = document.getElementById('llegadadate').value;
  var inputTags = document.getElementById('txtTags').value;
  var inputInfoAdicional = document.getElementById('txtInfoadicional').value;
  var inputLugar = document.getElementById('pac-input').value="";

  var viaje1 = new Object();
  viaje1.FechaSalida = inputFechaSalida;
  viaje1.FechaLlegada = inputFechaLlegada;
  viaje1.tags = inputTags;
  viaje1.InfoAdicional = inputInfoAdicional;
  viaje1.Lugar = inputLugar;
  viaje1.Latitud = LatLong.geometry.location.lat();
  viaje1.Longitud = LatLong.geometry.location.lng();
  array_viajes.push(viaje1);
  console.log(document.getElementById('pac-input').value);
  console.log("Mostrando la Info del objeto viaje1");
  console.log(viaje1.FechaSalida);
  console.log(viaje1.FechaLlegada);
  console.log(viaje1.tags);
  console.log(viaje1.InfoAdicional);
  console.log(viaje1.Latitud);
  console.log(viaje1.Longitud);
  console.log(viaje1.Lugar);
  document.getElementById('salidadate').value="";
  document.getElementById('llegadadate').value="";
  document.getElementById('txtTags').value="";
  document.getElementById('txtInfoadicional').value="";
  document.getElementById('pac-input').value="";

  
}

function initMap(){
      var options = {
        zoom:13,
        center:{lat:9.933333,lng:-84.083333}
      }

      var map = new google.maps.Map(document.getElementById('map'), options);
      var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      var labelIndex = 0;


      // Listen for click on map
      /*google.maps.event.addListener(map, 'click', function(event){
        // Add marker
        addMarker({coords:event.latLng});
      });

      
      // Add marker
      var marker = new google.maps.Marker({
        position:{lat:42.4668,lng:-70.9495},
        map:map,
        icon:'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png'
      });

      var infoWindow = new google.maps.InfoWindow({
        content:'<h1>Lynn MA</h1>'
      });

      marker.addListener('click', function(){
        infoWindow.open(map, marker);
      });
      */

      // Array of markers
      
      var markers = [];
      //var flightPlanCoordinates = [];
      for (i = 0; i < array_viajes.length; i++) {
       markers.push({
          coords:{lat:parseFloat(array_viajes[i].Latitud),lng:parseFloat(array_viajes[i].Longitud)},
          content: "Fechas: " + array_viajes[i].FechaSalida + " " + "/ " + array_viajes[i].FechaLlegada + "\n" + " Tags: " + array_viajes[i].tags + "\n" + " Info Adicional: " + array_viajes[i].InfoAdicional
         })
     };

       /*flightPlanCoordinates.push(
        {lat:parseFloat(array_viajes[i].Latitud),lng:parseFloat(array_viajes[i].Longitud)}) 

      
      var flightPath = new google.maps.Polyline({
          path: flightPlanCoordinates,
          geodesic: true,
          strokeColor: '#FF0000',
          strokeOpacity: 1.0,
          strokeWeight: 2
        });
       flightPath.setMap(map);*/





      // Loop through markers
      for(var i = 0;i < markers.length;i++){
        // Add marker
        addMarker(markers[i]);
      }

      // Add Marker Function
      function addMarker(props){
        var marker = new google.maps.Marker({
          position:props.coords,
          label: labels[labelIndex++ % labels.length],
          map:map
          //icon:props.iconImage
        });

        // Check for customicon
        if(props.iconImage){
          // Set icon image
          marker.setIcon(props.iconImage);
          marker.set('labelContent', 'X');
        }

        // Check content
        if(props.content){
          var infoWindow = new google.maps.InfoWindow({
            content:props.content
          });

          marker.addListener('click', function(){
            infoWindow.open(map, marker);
          });
        }
        
        
      }
    }

    function initMap2(){
      var options = {
        zoom:13,
        center:{lat:9.933333,lng:-84.083333}
      }

      var map = new google.maps.Map(document.getElementById('map'), options);
      var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      var labelIndex = 0;


      // Listen for click on map
      /*google.maps.event.addListener(map, 'click', function(event){
        // Add marker
        addMarker({coords:event.latLng});
      });

      
      // Add marker
      var marker = new google.maps.Marker({
        position:{lat:42.4668,lng:-70.9495},
        map:map,
        icon:'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png'
      });

      var infoWindow = new google.maps.InfoWindow({
        content:'<h1>Lynn MA</h1>'
      });

      marker.addListener('click', function(){
        infoWindow.open(map, marker);
      });
      */

      // Array of markers
      
      var markers = [];
      var flightPlanCoordinates = [];
      for (i = 0; i < array_viajes.length; i++) {
       markers.push({
          coords:{lat:parseFloat(array_viajes[i].Latitud),lng:parseFloat(array_viajes[i].Longitud)},
          content: "Fechas: " + array_viajes[i].FechaSalida + " " + "/ " + array_viajes[i].FechaLlegada + "\n" + " Tags: " + array_viajes[i].tags + "\n" + " Info Adicional: " + array_viajes[i].InfoAdicional
         })

       flightPlanCoordinates.push(
        {lat:parseFloat(array_viajes[i].Latitud),lng:parseFloat(array_viajes[i].Longitud)}) 

      };
      var flightPath = new google.maps.Polyline({
          path: flightPlanCoordinates,
          geodesic: true,
          strokeColor: '#FF0000',
          strokeOpacity: 1.0,
          strokeWeight: 2
        });
       flightPath.setMap(map);




        
      // ]};
      //array_viajes.forEach(function(viaje){
        //markers.push({
          //coords:{lat:parseInt(viaje.Latitud),lng:parseInt(viaje.Longitud)},
          //content:viaje.InfoAdicional
        //});
      //});
      //console.dir(markers);

      // Loop through markers
      for(var i = 0;i < markers.length;i++){
        // Add marker
        addMarker(markers[i]);
      }

      // Add Marker Function
      function addMarker(props){
        var marker = new google.maps.Marker({
          position:props.coords,
          label: labels[labelIndex++ % labels.length],
          map:map
          //icon:props.iconImage
        });

        // Check for customicon
        if(props.iconImage){
          // Set icon image
          marker.setIcon(props.iconImage);
          marker.set('labelContent', 'X');
        }

        // Check content
        if(props.content){
          var infoWindow = new google.maps.InfoWindow({
            content:props.content
          });

          marker.addListener('click', function(){
            infoWindow.open(map, marker);
          });
        }
        
        
      }
    }

function FiltroTags(){
  var options = {
    zoom:13,
    center:{lat:9.933333,lng:-84.083333}
  }

  var map = new google.maps.Map(document.getElementById('map'), options);
  var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  var labelIndex = 0;

  // Array of markers
  
  var markers = [];
  //var flightPlanCoordinates = [];
  for (i = 0; i < array_viajes.length; i++) {
    var inputTags = document.getElementById('txtFiltrotags').value;
    if(array_viajes[i].tags===inputTags){

      markers.push({
      coords:{lat:parseFloat(array_viajes[i].Latitud),lng:parseFloat(array_viajes[i].Longitud)},
      content: "Fechas: " + array_viajes[i].FechaSalida + " " + "/ " + array_viajes[i].FechaLlegada + "\n" + " Tags: " + array_viajes[i].tags + "\n" + " Info Adicional: " + array_viajes[i].InfoAdicional
      })
    }
 };


  // Loop through markers
  for(var i = 0;i < markers.length;i++){
    // Add marker
    addMarker(markers[i]);
  }

  // Add Marker Function
  function addMarker(props){
    var marker = new google.maps.Marker({
      position:props.coords,
      label: labels[labelIndex++ % labels.length],
      map:map
      //icon:props.iconImage
    });

    // Check for customicon
    if(props.iconImage){
      // Set icon image
      marker.setIcon(props.iconImage);
      marker.set('labelContent', 'X');
    }

    // Check content
    if(props.content){
      var infoWindow = new google.maps.InfoWindow({
        content:props.content
      });

      marker.addListener('click', function(){
        infoWindow.open(map, marker);
      });
    }
    
    
  }
}

function FiltroFechas(){
  var options = {
    zoom:13,
    center:{lat:9.933333,lng:-84.083333}
  }

  var map = new google.maps.Map(document.getElementById('map'), options);
  var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  var labelIndex = 0;



  // Array of markers
  
  var markers = [];
  //var flightPlanCoordinates = [];
  for (i = 0; i < array_viajes.length; i++) {
    var inputFechaSalida = new Date(document.getElementById("filtroSalidadate").value);
    var inputFechaLlegada = new Date(document.getElementById("filtroLlegadadate").value);
    var arrFechaSalida= new Date(array_viajes[i].FechaSalida);
    var arrFechaLlegada= new Date(array_viajes[i].FechaLlegada);
    if(arrFechaSalida>=inputFechaSalida && arrFechaLlegada<=inputFechaLlegada){

        markers.push({
        coords:{lat:parseFloat(array_viajes[i].Latitud),lng:parseFloat(array_viajes[i].Longitud)},
        content: "Fechas: " + array_viajes[i].FechaSalida + " " + "/ " + array_viajes[i].FechaLlegada + "\n" + " Tags: " + array_viajes[i].tags + "\n" + " Info Adicional: " + array_viajes[i].InfoAdicional
        })
    }
 };

  // Loop through markers
  for(var i = 0;i < markers.length;i++){
    // Add marker
    addMarker(markers[i]);
  }

  // Add Marker Function
  function addMarker(props){
    var marker = new google.maps.Marker({
      position:props.coords,
      label: labels[labelIndex++ % labels.length],
      map:map
      //icon:props.iconImage
    });

    // Check for customicon
    if(props.iconImage){
      // Set icon image
      marker.setIcon(props.iconImage);
      marker.set('labelContent', 'X');
    }

    // Check content
    if(props.content){
      var infoWindow = new google.maps.InfoWindow({
        content:props.content
      });

      marker.addListener('click', function(){
        infoWindow.open(map, marker);
      });
    }
    
    
  }
}


function popupestads(){
  alert("Estadísticas" + "\n" + "Total de Viajes: " + array_viajes.length + "\n" +
    "Total de Dias de Viaje: " + "\n" + "Total de Distancia: " + "\n" + "Cantidad de Ciudades Visitadas: " + array_ciudades.length
    + "\n" + "Cantidad de Paises Visitados: " + array_paises.length);
}

function popupdistancias(){
  for (i = 0; i < array_viajes.length-1; i++) {
    var latitud1 = array_viajes[i].Latitud;
    var latitud2 = array_viajes[i+1].Latitud;
    var longitud1 = array_viajes[i].Longitud;
    var longitud2 = array_viajes[i+1].Longitud;
    //var prueba_distancias = calcular_distancia(latitud1,longitud1,latitud2,longitud2);
    var distancemts = google.maps.geometry.spherical.computeDistanceBetween(new google.maps.LatLng(latitud1, longitud1), new google.maps.LatLng(latitud2, longitud2));
    var distancekms = distancemts / 1000;
    array_distancias_kms.push(distancekms);
    console.log(array_viajes.length);
  }

  for (j = 0; j < array_distancias_kms.length; j++){
    var x = j+1;
    alert("La Distancia entre el punto " + j + " y el punto " + x + " es de: " + array_distancias_kms[j]);

  }



}


function largo(){
  console.log(array_viajes.length);
}

function genera_tabla() {
  // Obtener la referencia del elemento body
  var body = document.getElementsByTagName("body")[0];

  // Crea un elemento <table> y un elemento <tbody>
  var tabla   = document.createElement("table");
  var tblBody = document.createElement("tbody");
  // Crea las celdas
  for (var i = -1; i < array_viajes.length; i++) {
    // Crea las hileras de la tabla
    var hilera = document.createElement("tr");

    if(i === -1){
      var TextoNumero = document.createTextNode("#");
      var TextoTags = document.createTextNode("Tags");
      var TextoFechaLlegada = document.createTextNode("Fecha de Llegada");
      var TextoInfoAdicional= document.createTextNode("Información Adicional");
      var TextoLatitud = document.createTextNode("Latitud");
      var TextoLongitud = document.createTextNode("Longitud");
    }else{
      var TextoNumero = document.createTextNode(i+1);
      var TextoFechaLlegada = document.createTextNode(array_viajes[i].FechaLlegada);
      var TextoTags = document.createTextNode(array_viajes[i].tags);
      var TextoInfoAdicional= document.createTextNode(array_viajes[i].InfoAdicional);
      var TextoLatitud = document.createTextNode(array_viajes[i].Latitud);
      var TextoLongitud = document.createTextNode(array_viajes[i].Longitud);
    }    

    var celda = document.createElement("td"); 
    celda.appendChild(TextoNumero); 
    hilera.appendChild(celda);
    var celda2 = document.createElement("td");  
    celda2.appendChild(TextoFechaLlegada);
    hilera.appendChild(celda2);
    var celda3 = document.createElement("td");  
    celda3.appendChild(TextoTags);
    hilera.appendChild(celda3);
    var celda4 = document.createElement("td");  
    celda4.appendChild(TextoInfoAdicional);
    hilera.appendChild(celda4);
    var celda5 = document.createElement("td");  
    celda5.appendChild(TextoLatitud);
    hilera.appendChild(celda5);
    var celda6 = document.createElement("td");  
    celda6.appendChild(TextoLongitud);
    hilera.appendChild(celda6);
    
    // agrega la hilera al final de la tabla (al final del elemento tblbody)
    tblBody.appendChild(hilera);
  }
 
  // posiciona el <tbody> debajo del elemento <table>
  tabla.appendChild(tblBody);
  // appends <table> into <body>
  body.appendChild(tabla);
  // modifica el atributo "border" de la tabla y lo fija a "2";
  tabla.setAttribute("border", "2");
}
