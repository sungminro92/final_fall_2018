// ===========================*** WINDOW ONLOAD ***===========================
window.onload = function() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  }
};
let map;

function showPosition(position) {
  getEvents(position.coords.latitude, position.coords.longitude);
}

// ===========================*** EVENTs API ***===========================
const eventInput = document.getElementById("event-input"); // whatever that's being in input
const eventSearchButton = document.getElementById("event-search-button"); // color search button

// if (eventInput) {
//   eventInput.addEventListener("keyup", keyPress);
// }
//
// function keyPress(event) {
//   if (event.keyCode === 13) {
//     if (event.value !== undefined ) {
//       input.value = event.value;
//     }
//     // getWords();
//   }
// }

const eventResultContainer = document.getElementById("event-result-container");

if (eventSearchButton) {
  eventSearchButton.addEventListener("click", function() {
    eventSearchClick(eventInput);
  });
  // colorSearch() function on search button
}

function showEvents(events) {
  // var map = new google.maps.Map(document.getElementById("map"));
  eventResultContainer.innerHTML = "";
  console.log(events);
  for(let i=0; i< events.length; i++) {
      let latitude = events[i].Latitude;
      let longitude = events[i].Longitude;
      let name = events[i].Name;
      let venue = events[i].Venue;
      let venueName = venue.Name;
      let address = venue.Address;
      let phone = venue.Phone;
      let description = events[i].Description;
      var myLatlng = new google.maps.LatLng(latitude,longitude);

      var marker = new google.maps.Marker({
        position: myLatlng,
        title: name
      });

      marker.addEventListener("onmouseover",eventShow())

    // To add the marker to the map, call setMap();
    marker.setMap(map);



    let price = events[i].Price;
    let imageUrl = events[i].Image[2]["@attributes"].src;
    let eventDiv = document.createElement('div');
    eventDiv.classList.add("event-result");
    eventDiv.setAttribute("class", "event-div");
    eventDiv.style.margin = "0 auto";

    let eventTextDiv = document.createElement('h5');
    eventTextDiv.setAttribute("class", "font");
    // eventTextDiv.style.backgroundColor = "white";
    eventTextDiv.innerHTML = name;
    const img = document.createElement("img");
    img.src = imageUrl;
    eventDiv.append(eventTextDiv);
    eventDiv.appendChild(img);
    // eventResultContainer.append(eventDiv);
    // colorDiv.setAttribute('onclick', `getColors('${colorValue}');`);
  }
}

function eventShow() {
    let price = events[i].Price;
    let imageUrl = events[i].Image[2]["@attributes"].src;
    let eventDiv = document.createElement('div');
    eventDiv.classList.add("event-result");
    eventDiv.setAttribute("class", "event-div");
    eventDiv.style.margin = "0 auto";

    let eventTextDiv = document.createElement('h5');
    eventTextDiv.setAttribute("class", "font");
    // eventTextDiv.style.backgroundColor = "white";
    eventTextDiv.innerHTML = name;
    const img = document.createElement("img");
    img.src = imageUrl;
    eventDiv.append(eventTextDiv);
    eventDiv.appendChild(img);
}

async function getEvents(lat, lng) {
  const eventSearchURL = `https://cors-anywhere.herokuapp.com/https://www.nyartbeat.com/list/event_searchNear?latitude=${lat}&longitude=${lng}`;
  // const colorNumber = document.getElementById("color-number-input").value;
  const events = await fetch(eventSearchURL, { headers: {
    "Content-Type": "application/xml; charset=utf-8"
  }})
  .then(async function(data) {
    parser = new DOMParser();
    return (xmlToJson(parser.parseFromString(await data.text(),"text/xml"))).Events.Event;
    // createColorScheme(data.colors);
  });
  showEvents(events);
}

function xmlToJson(xml) {

  // Create the return object
  var obj = {};

  if (xml.nodeType == 1) { // element
    // do attributes
    if (xml.attributes.length > 0) {
      obj["@attributes"] = {};
      for (var j = 0; j < xml.attributes.length; j++) {
        var attribute = xml.attributes.item(j);
        obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
      }
    }
  } else if (xml.nodeType == 3) { // text
    obj = xml.nodeValue;
  }

  // do children
  // If just one text node inside
  if (xml.hasChildNodes() && xml.childNodes.length === 1 && xml.childNodes[0].nodeType === 3 && !obj["@attributes"]) {
    obj = xml.childNodes[0].nodeValue;
  }
  else if (xml.hasChildNodes()) {
    for (var i = 0; i < xml.childNodes.length; i++) {
      var item = xml.childNodes.item(i);
      var nodeName = item.nodeName;
      if (typeof(obj[nodeName]) == "undefined") {
        obj[nodeName] = xmlToJson(item);
      } else {
        if (typeof(obj[nodeName].push) == "undefined") {
          var old = obj[nodeName];
          obj[nodeName] = [];
          obj[nodeName].push(old);
        }
        obj[nodeName].push(xmlToJson(item));
      }
    }
  }
  return obj;
}

function initMap() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(initMapCb);
  }
}

// Initialize and add the map
function initMapCb(position) {
  // The location of Uluru
  var uluru = {lat: position.coords.latitude, lng: position.coords.longitude};
  // The map, centered at Uluru
  map = new google.maps.Map(
    document.getElementById('map'), {zoom: 16, center: uluru});
  // The marker, positioned at Uluru
  var image = {
    url: "https://img.icons8.com/color/1600/person-male.png",
    // This marker is 20 pixels wide by 32 pixels high.
    scaledSize: new google.maps.Size(40, 40)
  };
  var marker = new google.maps.Marker({position: uluru, map: map, icon: image});
}