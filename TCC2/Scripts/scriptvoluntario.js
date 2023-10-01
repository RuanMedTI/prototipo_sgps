// Dados de pessoas (simulando um banco de dados)
let people = [];
let currentEditingPerson = null;

const personForm = document.getElementById('personForm');
const personList = document.getElementById('personList');

personForm.addEventListener('submit', function (event) {
  event.preventDefault();
  
  const name = document.getElementById('name').value;
  const age = document.getElementById('age').value;
  
  if (currentEditingPerson === null) {
    const newPerson = { id: new Date().getTime(), name, age };
    people.push(newPerson);
  } else {
    currentEditingPerson.name = name;
    currentEditingPerson.age = age;
    currentEditingPerson = null;
  }
  
  updateList();
  personForm.reset();
});

function updateList() {
  personList.innerHTML = '';
  for (const person of people) {
    const listItem = document.createElement('div');
    listItem.className = 'card mb-2';
    listItem.innerHTML = `
      <div class="card-body">
        <h5 class="card-title">${person.name}</h5>
        <p class="card-text">Idade: ${person.age}</p>
        <button class="btn btn-primary mr-2" onclick="editPerson(${person.id})">Editar</button>
        <button class="btn btn-danger" onclick="deletePerson(${person.id})">Excluir</button>
      </div>
    `;
    personList.appendChild(listItem);
  }
}

function editPerson(id) {
  currentEditingPerson = people.find(person => person.id === id);
  if (currentEditingPerson) {
    document.getElementById('name').value = currentEditingPerson.name;
    document.getElementById('age').value = currentEditingPerson.age;
  }
}

function deletePerson(id) {
  people = people.filter(person => person.id !== id);
  updateList();
}

// Cache implementation
function cacheData() {
  localStorage.setItem('peopleData', JSON.stringify(people));
}

function loadCachedData() {
  const cachedData = localStorage.getItem('peopleData');
  if (cachedData) {
    people = JSON.parse(cachedData);
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
