const { ipcRenderer } = require('electron');

let ipList = [];
let spanList = [];
let isLoading = false;
const clusters = ['eu-west', 'eu-east', 'na-west', 'na-east', 'sa', 'oc', 'af', 'as'];

// Mets à jour le ping sur les boutons
ipcRenderer.on('request-update-ping', (event, arg) => {
  let continentId = arg[0];
  let time = arg[1];
  let span = document.getElementById(`time-${continentId}`);
  let dot = document.getElementById(continentId);

  dot.className = 'dot-green';

  spanList.push(`time-${continentId}`);

  span.textContent = (time !== 0 ? `${time} ms` : `X`);

});

// Lets store in memory the list of the ip results
ipcRenderer.on('update-ip-list', (event, arg) => {
  const host = {
    id: arg[0],
    ip: arg[1],
    cityName: arg[2],
    continentId: arg[3],
    time: arg[4],
    alive: arg[5],
  };
  ipList.push(host);
});

ipcRenderer.on('spinner', (event, arg) => {
  isLoading = arg[0];
  document.getElementById("loader").style.display = isLoading === true ? 'block' : 'none';
});

ipcRenderer.on('reset-worldmap-iplist', (event, arg) => {
  ipList = [];
  spanList.forEach(spanName => {
    let span = document.getElementById(spanName);

    span.textContent = '';
  });

  clusters.forEach(id => {
    let dot = document.getElementById(id);

    dot.className = 'dot-red';
  });

});

// Ajout d'un event sur chaque boutons
clusters.forEach(id => {
  let clusterBtn = document.getElementById(id);

  clusterBtn.addEventListener('click', () => {
    if (isLoading) {
      return;
    }

    ipcRenderer.send('add-cluster-in-ip-rules', [id, ipList]);
  });
});

