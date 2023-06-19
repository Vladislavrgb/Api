const wsUri = "wss://echo-ws-service.herokuapp.com/"; //

const output = document.getElementById("output"); //
const btnOpen = document.querySelector('.j-btn-open'); //
const btnGeo = document.querySelector('.j-btn-geo'); //
let input = document.querySelector('#message');

const geo = document.querySelector('.geo');
const status = document.querySelector('#status');
const mapLink = document.querySelector('#map-link');
const btn = document.querySelector('.j-btn-test');
let websocket;

function writeToScreen(message) {
  let pre = document.createElement("p");
  pre.style.wordWrap = "break-word";
  pre.innerHTML = message;
  output.appendChild(pre);
}
websocket = new WebSocket(wsUri);
  websocket.onopen = function(evt) {
    //writeToScreen("CONNECTED");
  };
btnOpen.addEventListener('click', () => {
  const message = input.value;
  writeToScreen('<div class="client-message">' + message+'</div>');
  websocket.send(message);
  websocket.onmessage = function(evt) {
    writeToScreen(
      '<div class="server-message">' + evt.data+'</div>'
    );
  };
  websocket.onerror = function(evt) {
    writeToScreen(
      '<span style="color: red;">ERROR:</span> ' + evt.data
    );
  };
});

btnGeo.addEventListener('click', () => { 
    mapLink.href = '';
  mapLink.textContent = '';
  
  if (!navigator.geolocation) {
    status.textContent = 'Geolocation не поддерживается вашим браузером';
  } else {
    navigator.geolocation.getCurrentPosition(success, error);
  }
 });

 const error = () => {
  status.textContent = 'Невозможно получить ваше местоположение';
}

const success = (position) => {
  console.log('position', position);
  const latitude  = position.coords.latitude;
  const longitude = position.coords.longitude;
  const block = `
      <div class="client-message">
        <p id="status"></p>
        <a href="https://www.openstreetmap.org/#map=18/${latitude}/${longitude}">Ссылка на карту</a></div>
      </div>
    `;  
  geo.innerHTML = block;
 

}