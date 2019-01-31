var ThunderforestAPIKey = '8c44f9f9817f4c8faeb76a930142683f';
var mrgMapOnClickAddLock = false;  //Ao clicar surge um marcador. Loqueia para não criar mais.
var mrgLatLonInicial = [-24.1267,-48.3721]; 


var map = L.map('mapdiv',); //Cria o mapa 
map.options.maxZoom = 19; 
map.setView(mrgLatLonInicial, 12);

var hash = new L.Hash(map);

//Inicializa layers	
var attrIBGE = '<a href="https://github.com/tmpsantos/IBGETools" title="IBGETools" >IBGETools</a> | <a href="ftp://geoftp.ibge.gov.br/mapas_estatisticos/censo_2010/mapas_de_setores_censitarios" title="Mapas de Setores Censitários" >Mapas de Setores Censitários (2010)</a> by <a href="http://www.ibge.gov.br/" title="IBGE" >IBGE</a> | hospedado por <a href="https://www.mapbox.com/" title="MapBox" >MapBox</a> &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'; 	
var mrgLayerMapnik = L.tileLayer.provider('OpenStreetMap.Mapnik').addTo(map);
var mrgLayerMapBoxSat = L.tileLayer.provider('MapBox', {id: 'mapbox.streets-satellite',accessToken: 'pk.eyJ1IjoicHJvamV0b3JnbSIsImEiOiJqeVpremF3In0.SCxZ4ah9ZKxWcELgsKQyWA'});
var mrgLayerOpenTopoMap = L.tileLayer.provider('OpenTopoMap');
var mrgLayerStamenToner = L.tileLayer.provider('Stamen.Toner');
var mrgLayerCycle = L.tileLayer.provider('Thunderforest.OpenCycleMap',{apikey: ThunderforestAPIKey});
var mrgLayerOutdoors = L.tileLayer.provider('Thunderforest.Outdoors',{apikey: ThunderforestAPIKey});					
var mrgLayerIBGEr = L.tileLayer('https://{s}.tiles.mapbox.com/v3/tmpsantos.i00mo1kj/{z}/{x}/{y}.png', {attribution: attrIBGE} );
var mrgLayerIBGEu = L.tileLayer('https://{s}.tiles.mapbox.com/v3/tmpsantos.hgda0m6h/{z}/{x}/{y}.png', {attribution: attrIBGE} );

var mrgActiveLayer = mrgLayerMapnik; //Layer atual inicial
var mrgSideBySideControlFg = mrgLayerMapnik; //Layer inicial
var mrgSideBySideControlBk = mrgLayerMapBoxSat; //Layer inicial
var mrgSideBySideActive = false;
var mrgURLBaseMapasGEOJSON = 'https://raw.githubusercontent.com/mapaderibeirao/mapas/master/';

//Marcador que aparece ao clicar no mapa
var mrgUserTempMarker = L.marker([],{
                         'draggable' :true
						});
												
//Inicia marcador temporário - Mostra coordenadas quando clicar em alguma parte do mapa
function TempMarkerMsg(Lat,Lon,Zoom){
  var Opcoes = GerarOpcoesDoMapa(Lat,Lon,Zoom,'/mapa/');
  var Msg = "<div class='mrg-display-latlon'><span class='mrg-fg-blue fas fa-map-marker-alt'></span> "+ mrgTxtMarkerCoord +": <span class='mrg-display-latlon'>"
          + Lat+',<br> '+ Lon + '</span>'
	  + '</div>'
	  + '<p class="">' + Opcoes + '</p>';	
   return Msg; 
}
mrgUserTempMarker.on('click', function(e) {
   var Zoom = map.getZoom();
	var Lat = e.latlng.lat;
	var Lon = e.latlng.lng;

	Lat = Lat.toString().substring(0, 9);
	Lon = Lon.toString().substring(0, 9);

	var Msg = TempMarkerMsg(Lat,Lon,Zoom);
	mrgUserTempMarker.bindPopup(Msg); 
});						

//Prepara evento ao clicar no mapa
map.on('click', function(e) {
	if(!mrgMedicaoEstaAtiva()){ //Desativa atividades em caso do controle de medição estar ativo	
		   var Zoom = map.getZoom();
			var Lat = e.latlng.lat;
			var Lon = e.latlng.lng;
		
			Lat = Lat.toString().substring(0, 9);
			Lon = Lon.toString().substring(0, 9);
			
			if (!mrgMapOnClickAddLock){
				mrgMapOnClickAddLock = true;
				mrgUserTempMarker.setLatLng(e.latlng);
		        var Msg = TempMarkerMsg(Lat,Lon,Zoom);
				mrgUserTempMarker.bindPopup(Msg)
				.addTo(map)
				.openPopup();
			}else{mrgMapOnClickAddLock = false;
				map.removeLayer(mrgUserTempMarker);
			}
	}
});


//AddDataOverlay('https://raw.githubusercontent.com/mapaderibeirao/mapa-beta/master/dados/test','Táxi',null,'fa-taxi');

