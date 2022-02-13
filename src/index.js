document.addEventListener('DOMContentLoaded', () => {
  getAllDogs()
})

function getAllDogs() {
  fetch('http://localhost:3000/dogs')
    .then(res => res.json())
    .then(dogs => dogs.forEach(dog => putEachDogOnTable(dog)))
}

function putEachDogOnTable(obj) {
  const tableRow = document.createElement('tr')
  tableRow.id = obj.id
  putInfoToTable(obj, tableRow)
}

function handleButtons(obj, table) {
  const dogForm = document.querySelector('#dog-form')
  dogForm.name.value = obj.name
  dogForm.breed.value = obj.breed
  dogForm.sex.value = obj.sex

  dogForm.addEventListener('submit', (e) => {
    e.preventDefault()
    obj.name = e.target.name.value
    obj.breed = e.target.breed.value
    obj.sex = e.target.sex.value
    updateDogInfo(obj)
  })
}

function updateDogInfo(obj) {
  fetch(`http://localhost:3000/dogs/${obj.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(obj)
  })
  .then(res => res.json())
  .then(obj => putInfoToTable(obj))
}

function putInfoToTable(dog, table) {
  table.innerHTML = `
  <td>${dog.name}</td>
  <td>${dog.breed}</td>
  <td>${dog.sex}</td>
  <td><button id='edit'>Edit Dog</button></td>
  <td><button id='delete'>Delete</button></td>`
  table.querySelector('button#edit').addEventListener('click', () => {
    handleButtons(dog, table)
  })
  table.querySelector('button#delete').addEventListener('click', () => {
    table.innerHTML = ''
    deleteDog(dog.id)
  })
  document.querySelector('tbody#table-body').appendChild(table)
}

function deleteDog(id) {
  fetch(`http://localhost:3000/dogs/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(res => res.json())
  .then(dog => console.log(dog))
}