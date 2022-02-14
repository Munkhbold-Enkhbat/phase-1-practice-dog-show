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

function putInfoToTable(dog, row) {
  row.innerHTML = `
  <td id ='name'>${dog.name}</td>
  <td id = 'breed'>${dog.breed}</td>
  <td id = 'sex'>${dog.sex}</td>
  <td><button id='edit'>Edit Dog</button></td>
  <td><button id='delete'>Delete</button></td>`
  row.querySelector('button#edit').addEventListener('click', () => {
    handleEditButton(dog, row)
  })
  row.querySelector('button#delete').addEventListener('click', () => {
    row.innerHTML = ''
    deleteDog(dog.id)
  })
  document.querySelector('tbody#table-body').appendChild(row)
}

function handleEditButton(obj, row) {
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
    editTableRow(obj, row)
  })
}

function editTableRow(dog, row) {
  row.querySelector('#name').innerText = dog.name
  row.querySelector('#breed').innerText = dog.breed
  row.querySelector('#sex').innerText = dog.sex
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
  .then(obj => console.log(obj))
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