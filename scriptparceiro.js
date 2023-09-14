let partners = [];
let currentEditingPartner = null;

const partnerForm = document.getElementById('partnerForm');
const partnerList = document.getElementById('partnerList');

partnerForm.addEventListener('submit', function (event) {
  event.preventDefault();
  
  const name = document.getElementById('name').value;
  const cpfCnpj = document.getElementById('cpfCnpj').value;
  const address = document.getElementById('address').value;
  const phone = document.getElementById('phone').value;
  const city = document.getElementById('city').value;
  const state = document.getElementById('state').value;
  
  if (currentEditingPartner === null) {
    const newPartner = { 
      id: new Date().getTime(),
      name,
      cpfCnpj,
      address,
      phone,
      city,
      state
    };
    partners.push(newPartner);
  } else {
    currentEditingPartner.name = name;
    currentEditingPartner.cpfCnpj = cpfCnpj;
    currentEditingPartner.address = address;
    currentEditingPartner.phone = phone;
    currentEditingPartner.city = city;
    currentEditingPartner.state = state;
    currentEditingPartner = null;
  }
  
  updateList();
  partnerForm.reset();
});

function updateList() {
  partnerList.innerHTML = '';
  for (const partner of partners) {
    const listItem = document.createElement('div');
    listItem.className = 'card mb-2';
    listItem.innerHTML = `
      <div class="card-body">
        <h5 class="card-title">${partner.name}</h5>
        <p class="card-text">CPF/CNPJ: ${partner.cpfCnpj}</p>
        <p class="card-text">Endereço: ${partner.address}</p>
        <p class="card-text">Telefone: ${partner.phone}</p>
        <p class="card-text">Cidade: ${partner.city}</p>
        <p class="card-text">UF: ${partner.state}</p>
        <button class="btn btn-primary mr-2" onclick="editPartner(${partner.id})">Editar</button>
        <button class="btn btn-danger" onclick="deletePartner(${partner.id})">Excluir</button>
      </div>
    `;
    partnerList.appendChild(listItem);
  }
}

function editPartner(id) {
  currentEditingPartner = partners.find(partner => partner.id === id);
  if (currentEditingPartner) {
    document.getElementById('name').value = currentEditingPartner.name;
    document.getElementById('cpfCnpj').value = currentEditingPartner.cpfCnpj;
    document.getElementById('address').value = currentEditingPartner.address;
    document.getElementById('phone').value = currentEditingPartner.phone;
    document.getElementById('city').value = currentEditingPartner.city;
    document.getElementById('state').value = currentEditingPartner.state;
  }
}

function deletePartner(id) {
  partners = partners.filter(partner => partner.id !== id);
  updateList();
}

// Cache implementation
function cacheData() {
  localStorage.setItem('partnersData', JSON.stringify(partners));
}

function loadCachedData() {
  const cachedData = localStorage.getItem('partnersData');
  if (cachedData) {
    partners = JSON.parse(cachedData);
    updateList();
  }
}

// Load cached data when the page loads
window.addEventListener('load', function () {
  loadCachedData();
});

const voltarBtn = document.getElementById('voltarBtn');

voltarBtn.addEventListener('click', () => {
  window.location.href = 'index.html';
});