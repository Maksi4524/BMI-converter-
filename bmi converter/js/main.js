//click event for creating database
const userInfoForm = document.querySelector('.userInfo')
const userName = document.querySelector('.name')
const userAge = document.querySelector('.age')
// select the <ul> with class="list"
const listInfo = document.querySelector('.list')

// array which stores every data
let dataList = []



// add an eventListener on form, and listen for submit event
userInfoForm.addEventListener('submit', function(event) {
  // prevent the page from reloading when submitting the form
  event.preventDefault()
  addList(userName.value)//userAge.value       // call addList function with input box current value
});

// function to add list
function addList(item) {
  // if item is not empty
  if (item !== '') {
    // make a todo object, which has id, name, and completed properties
    const list = {
      id: Date.now(),
      name: item,
      //age: num,
      completed: false
    };
// then add it to data list array
    dataList.push(list);
    addToLocalStorage(dataList); // then renders them between <ul>
// finally clear the input box value
    userName.value = '';
    //userAge.value = ''
  }
}



// function to render given lists to screen
function renderTodos(dataList) {
  // clear everything inside <ul> with class=todo-items
  listInfo.innerHTML = '';
// run through each item inside todos
  dataList.forEach(function(item) {
    // check if the item is completed
    const checked = item.completed ? 'checked': null;
// make a <li> element and fill it
    // <li> </li>
    const li = document.createElement('li');
    // <li class="item"> </li>
    li.setAttribute('class', 'item');
    // <li class="item" data-key="20200708"> </li>
    li.setAttribute('data-key', item.id);
    /* <li class="item" data-key="20200708">
          <input type="checkbox" class="checkbox">
          Go to Gym
          <button class="delete-button">X</button>
        </li> */
    // if item is completed, then add a class to <li> called 'checked', which will add line-through style
    if (item.completed === true) {
      li.classList.add('checked');
    }
li.innerHTML = `
      <input type="checkbox" class="checkbox" ${checked}>
      ${item.name}
      <button class="delete-button">X</button>
    `;
    // finally add the <li> to the <ul>
    listInfo.append(li);
  });
}



// function to add todos to local storage
function addToLocalStorage(dataList) {
  // conver the array to string then store it.
  localStorage.setItem('dataList', JSON.stringify(dataList));
  // render them to screen
  renderTodos(dataList);
}



// function helps to get everything from local storage
function getFromLocalStorage() {
  const reference = localStorage.getItem('dataList');
  // if reference exists
  if (reference) {
    // converts back to array and store it in todos array
    dataList = JSON.parse(reference);
    renderTodos(dataList);
  }
}
// initially get everything from localStorage
getFromLocalStorage();


// toggle the value to completed and not completed
function toggle(id) {
  dataList.forEach(function(item) {
    // use == not ===, because here types are different. One is number and other is string
    if (item.id == id) {
      // toggle the value
      item.completed = !item.completed;
    }
  });
addToLocalStorage(dataList);
}
// deletes a todo from todos array, then updates localstorage and renders updated list to screen
function deleteTodo(id) {
  // filters out the <li> with the id and updates the todos array
  dataList = dataList.filter(function(item) {
    // use != not !==, because here types are different. One is number and other is string
    return item.id != id;
  });
// update the localStorage
  addToLocalStorage(dataList);
}

// after that addEventListener <ul> with class=todoItems. Because we need to listen for click event in all delete-button and checkbox
listInfo.addEventListener('click', function(event) {
  // check if the event is on checkbox
  if (event.target.type === 'checkbox') {
    // toggle the state
    toggle(event.target.parentElement.getAttribute('data-key'));
  }
// check if that is a delete-button
  if (event.target.classList.contains('delete-button')) {
    // get id from data-key attribute's value of parent <li> where the delete-button is present
    deleteTodo(event.target.parentElement.getAttribute('data-key'));
  }
});



// click event for calculate
document.querySelector('.zebra').addEventListener('click',calculate)

function calculate() {
  // get the value from inputs
  const weight = document.querySelector('.weight').value
  const height = document.querySelector('.height').value

  // quick math calculate it
  let bmiMath = (weight / ((height * height) / 10000)).toFixed(2)


  if(bmiMath < 18.5){
    document.querySelector('.placeToConvert').innerText = `Your BMI ${bmiMath} is within underweight range`
  }else if((bmiMath > 18.5) && (bmiMath < 24.9)){
    document.querySelector('.placeToConvert').innerText = `Your BMI ${bmiMath} is within normal and
    healthy weight range`
  }else if((bmiMath > 25) && (bmiMath < 29.9)){
    document.querySelector('.placeToConvert').innerText = `Your BMI ${bmiMath} is within the overweight range`
  }else if(bmiMath > 29.9){
    document.querySelector('.placeToConvert').innerText = `Your BMI ${bmiMath} is within the obese range`
  }else{
    document.querySelector('.placeToConvert').innerText = "Add correct information!"
  }

}

// create database
