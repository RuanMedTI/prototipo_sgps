let locations = [];
let currentEditingLocation = null;

const localForm = document.getElementById('localForm');
const localList = document.getElementById('localList');

localForm.addEventListener('submit', function (event) {
  event.preventDefault();
  
  const localName = document.getElementById('localName').value;
  const address = document.getElementById('address').value;
  const cep = document.getElementById('cep').value;
  const city = document.getElementById('city').value;
  const state = document.getElementById('state').value;
  
  if (currentEditingLocation === null) {
    const newLocation = { 
      id: new Date().getTime(),
      localName,
      address,
      cep,
      city,
      state
    };
    locations.push(newLocation);
  } else {
    currentEditingLocation.localName = localName;
    currentEditingLocation.address = address;
    currentEditingLocation.cep = cep;
    currentEditingLocation.city = city;
    currentEditingLocation.state = state;
    currentEditingLocation = null;
  }
  
  updateList();
  localForm.reset();
});

function updateList() {
  localList.innerHTML = '';
  for (const location of locations) {
    const listItem = document.createElement('div');
    listItem.className = 'card mb-2';
    listItem.innerHTML = `
      <div class="card-body">
        <h5 class="card-title">${location.localName}</h5>
        <p class="card-text">Endereço: ${location.address}</p>
        <p class="card-text">CEP: ${location.cep}</p>
        <p class="card-text">Cidade: ${location.city}</p>
        <p class="card-text">UF: ${location.state}</p>
        <button class="btn btn-primary mr-2" onclick="editLocation(${location.id})">Editar</button>
        <button class="btn btn-danger" onclick="deleteLocation(${location.id})">Excluir</button>
      </div>
    `;
    localList.appendChild(listItem);
  }
}

function editLocation(id) {
  currentEditingLocation = locations.find(location => location.id === id);
  if (currentEditingLocation) {
    document.getElementById('localName').value = currentEditingLocation.localName;
    document.getElementById('address').value = currentEditingLocation.address;
    document.getElementById('cep').value = currentEditingLocation.cep;
    document.getElementById('city').value = currentEditingLocation.city;
    document.getElementById('state').value = currentEditingLocation.state;
  }
}

function deleteLocation(id) {
  locations = locations.filter(location => location.id !== id);
  updateList();
}

// Cache implementation
function cacheData() {
  localStorage.setItem('locationsData', JSON.stringify(locations));
}

function loadCachedData() {
  const cachedData = localStorage.getItem('locationsData');
  if (cachedData) {
    locations = JSON.parse(cachedData);
    updateList();
  }
}

// Load cached data when the page loads
window.addEventListener('load', function () {
  loadCachedData();
});

const voltarBtn = document.getElementById('voltarBtn');

voltarBtn.addEventListener('click', () => {
  window.location.href = '../Views/index.html';
});
