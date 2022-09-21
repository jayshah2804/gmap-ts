// import logo from './logo.svg';
import './App.css';
// import {useEffect} from "react";

function App() {
      const script = document.createElement('script');  
      script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyAq88vEj-mQ9idalgeP1IuvulowkkFA-Nk&callback=initMap&libraries=places&v=weekly";
      script.async = true;
  
      document.body.appendChild(script);
    
  
  // "use strict";
// Object.defineProperty(exports, "__esModule", { value: true });
function initMap() {
  
  var map = new window.google.maps.Map(document.getElementById("map"), {
      center: { lat: 40.749933, lng: -73.98633 },
      zoom: 13,
      mapTypeControl: false,
  });
  console.log(map);
  var card = document.getElementById("pac-card");
  var input = document.getElementById("pac-input");
  var biasInputElement = document.getElementById("use-location-bias");
  var strictBoundsInputElement = document.getElementById("use-strict-bounds");
  var options = {
      fields: ["formatted_address", "geometry", "name"],
      strictBounds: false,
      types: ["establishment"],
  };
  map.controls[window.google.maps.ControlPosition.TOP_LEFT].push(card);
  var autocomplete = new window.google.maps.places.Autocomplete(input, options);
  // Bind the map's bounds (viewport) property to the autocomplete object,
  // so that the autocomplete requests use the current map bounds for the
  // bounds option in the request.
  autocomplete.bindTo("bounds", map);
  var infowindow = new window.google.maps.InfoWindow();
  var infowindowContent = document.getElementById("infowindow-content");
  infowindow.setContent(infowindowContent);
  var marker = new window.google.maps.Marker({
      map: map,
      anchorPoint: new window.google.maps.Point(0, -29),
  });
  autocomplete.addListener("place_changed", function () {
      infowindow.close();
      marker.setVisible(false);
      var place = autocomplete.getPlace();
      if (!place.geometry || !place.geometry.location) {
          // User entered the name of a Place that was not suggested and
          // pressed the Enter key, or the Place Details request failed.
          window.alert("No details available for input: '" + place.name + "'");
          return;
      }
      // If the place has a geometry, then present it on a map.
      if (place.geometry.viewport) {
          map.fitBounds(place.geometry.viewport);
      }
      else {
          map.setCenter(place.geometry.location);
          map.setZoom(17);
      }
      marker.setPosition(place.geometry.location);
      marker.setVisible(true);
      infowindowContent.children["place-name"].textContent = place.name;
      infowindowContent.children["place-address"].textContent =
          place.formatted_address;
      infowindow.open(map, marker);
  });
  // Sets a listener on a radio button to change the filter type on Places
  // Autocomplete.
  function setupClickListener(id, types) {
      var radioButton = document.getElementById(id);
      radioButton.addEventListener("click", function () {
          autocomplete.setTypes(types);
          input.value = "";
      });
  }
  setupClickListener("changetype-all", []);
  setupClickListener("changetype-address", ["address"]);
  setupClickListener("changetype-establishment", ["establishment"]);
  setupClickListener("changetype-geocode", ["geocode"]);
  setupClickListener("changetype-cities", ["(cities)"]);
  setupClickListener("changetype-regions", ["(regions)"]);
  biasInputElement.addEventListener("change", function () {
      if (biasInputElement.checked) {
          autocomplete.bindTo("bounds", map);
      }
      else {
          // User wants to turn off location bias, so three things need to happen:
          // 1. Unbind from map
          // 2. Reset the bounds to whole world
          // 3. Uncheck the strict bounds checkbox UI (which also disables strict bounds)
          autocomplete.unbind("bounds");
          autocomplete.setBounds({ east: 180, west: -180, north: 90, south: -90 });
          strictBoundsInputElement.checked = biasInputElement.checked;
      }
      input.value = "";
  });
  strictBoundsInputElement.addEventListener("change", function () {
      autocomplete.setOptions({
          strictBounds: strictBoundsInputElement.checked,
      });
      if (strictBoundsInputElement.checked) {
          biasInputElement.checked = strictBoundsInputElement.checked;
          autocomplete.bindTo("bounds", map);
      }
      input.value = "";
  });
}
window.initMap = initMap;

  return (
    <div>
      <div className="pac-card" id="pac-card">
      <div>
        <div id="title">Autocomplete search</div>
        <div id="type-selector" className="pac-controls">
          <input
            type="radio"
            name="type"
            id="changetype-all"
            // checked="checked"
            defaultChecked
          />
          <label htmlFor="changetype-all">All</label>

          <input type="radio" name="type" id="changetype-establishment" />
          <label htmlFor="changetype-establishment">establishment</label>

          <input type="radio" name="type" id="changetype-address" />
          <label htmlFor="changetype-address">address</label>

          <input type="radio" name="type" id="changetype-geocode" />
          <label htmlFor="changetype-geocode">geocode</label>

          <input type="radio" name="type" id="changetype-cities" />
          <label htmlFor="changetype-cities">(cities)</label>

          <input type="radio" name="type" id="changetype-regions" />
          <label htmlFor="changetype-regions">(regions)</label>
        </div>
        <br />
        <div id="strict-bounds-selector" className="pac-controls">
          <input type="checkbox" id="use-location-bias" value="" defaultChecked />
          <label htmlFor="use-location-bias">Bias to map viewport</label>

          <input type="checkbox" id="use-strict-bounds" value="" />
          <label htmlFor="use-strict-bounds">Strict bounds</label>
        </div>
      </div>
      <div id="pac-container">
        <input id="pac-input" type="text" placeholder="Enter a location" />
      </div>
    </div>
    <div id="map"></div>
    <div id="infowindow-content">
      <span id="place-name" className="title"></span><br />
      <span id="place-address"></span>
    </div>
    </div>
  );
}

export default App;
