let appointments = [];
let currentEditingAppointment = null;

const appointmentForm = document.getElementById('appointmentForm');
const appointmentList = document.getElementById('appointmentList');

appointmentForm.addEventListener('submit', function (event) {
  event.preventDefault();
  
  const location = document.getElementById('location').value;
  const date = document.getElementById('date').value;
  const volunteer = document.getElementById('volunteer').value;
  const city = document.getElementById('city').value;
  const state = document.getElementById('state').value;
  
  if (currentEditingAppointment === null) {
    const newAppointment = { 
      id: new Date().getTime(),
      location,
      date,
      volunteer,
      city,
      state
    };
    appointments.push(newAppointment);
  } else {
    currentEditingAppointment.location = location;
    currentEditingAppointment.date = date;
    currentEditingAppointment.volunteer = volunteer;
    currentEditingAppointment.city = city;
    currentEditingAppointment.state = state;
    currentEditingAppointment = null;
  }
  
  updateList();
  appointmentForm.reset();
});

function updateList() {
  appointmentList.innerHTML = '';
  for (const appointment of appointments) {
    const listItem = document.createElement('div');
    listItem.className = 'card mb-2';
    listItem.innerHTML = `
      <div class="card-body">
        <h5 class="card-title">${appointment.location}</h5>
        <p class="card-text">Data: ${appointment.date}</p>
        <p class="card-text">Voluntário: ${appointment.volunteer}</p>
        <p class="card-text">Cidade: ${appointment.city}</p>
        <p class="card-text">UF: ${appointment.state}</p>
        <button class="btn btn-primary mr-2" onclick="editAppointment(${appointment.id})">Editar</button>
        <button class="btn btn-danger" onclick="deleteAppointment(${appointment.id})">Excluir</button>
      </div>
    `;
    appointmentList.appendChild(listItem);
  }
}

function editAppointment(id) {
  currentEditingAppointment = appointments.find(appointment => appointment.id === id);
  if (currentEditingAppointment) {
    document.getElementById('location').value = currentEditingAppointment.location;
    document.getElementById('date').value = currentEditingAppointment.date;
    document.getElementById('volunteer').value = currentEditingAppointment.volunteer;
    document.getElementById('city').value = currentEditingAppointment.city;
    document.getElementById('state').value = currentEditingAppointment.state;
  }
}

function deleteAppointment(id) {
  appointments = appointments.filter(appointment => appointment.id !== id);
  updateList();
}

// Cache implementation
function cacheData() {
  localStorage.setItem('appointmentsData', JSON.stringify(appointments));
}

function loadCachedData() {
  const cachedData = localStorage.getItem('appointmentsData');
  if (cachedData) {
    appointments = JSON.parse(cachedData);
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