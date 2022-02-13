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
  putInfoToTable(obj, tableRow)
}

function handleEditbutton(obj, tableObj) {
  const dogForm = document.querySelector('#dog-form')
  dogForm.name.value = obj.name
  dogForm.breed.value = obj.breed
  dogForm.sex.value = obj.sex

  dogForm.addEventListener('submit', (e) => {
    e.preventDefault()
    obj.name = e.target.name.value
    obj.breed = e.target.breed.value
    obj.sex = e.target.sex.value
    putInfoToTable(obj, tableObj)
  })
}

function putInfoToTable(dog, table) {
  table.innerHTML = `
  <td>${dog.name}</td>
  <td>${dog.breed}</td>
  <td>${dog.sex}</td>
  <td><button>Edit Dog</button></td>`
  table.querySelector('button').addEventListener('click', () => {
    handleEditbutton(dog, table)
  })
  document.querySelector('tbody#table-body').appendChild(table)
}