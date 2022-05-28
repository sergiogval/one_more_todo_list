const curList = [];

const output = document.querySelector('.output');
const myInput = createMyElement(output, 'input', 'main');
myInput.setAttribute('type', 'text');
const myBtn = createMyElement(output, 'button', 'btn');
myBtn.textContent = 'Add new user';
const myList = createMyElement(output, 'ul', 'myList');


let getData = localStorage.getItem('curList');

window.addEventListener('DOMContentLoaded', (e) => {
  if (getData) {
    const tempArray = JSON.parse(getData);
    tempArray.forEach((user) => {
      addNewUser(user);
    })
  }
})


myBtn.addEventListener('click', (e) => {
  console.log('clicked');
  let userName = myInput.value;
  if(userName.length > 3) {
  const li = addNewUser(userName);
  myInput.value = '';
}});

function updater() {
  const myListItem = document.querySelectorAll('.info');
  curList.length = 0;
  myListItem.forEach((el) => {
  curList.push(el.textContent);
  })
  localStorage.setItem('curList', JSON.stringify(curList));
}

function addNewUser(userName) {
  curList.push(userName);
  updater();
  const li = createMyElement(output, 'li', 'myList');
  const div = createMyElement(li, 'div', 'container');
  const span1 = createMyElement(div, 'span', 'info');
  span1.textContent = userName;
  const span2 = createMyElement(div, 'span', 'editor');
  span2.textContent = 'Edit';
  const span3 = createMyElement(div, 'span', 'delete');
  span3.textContent = 'Delete';


  // function to edit user
  span2.addEventListener('click', (e) => {
    if (span2.textContent === 'Edit') {
    span1.style.backgroundColor = 'yellow';
    span1.setAttribute('contenteditable', true);
    span2.textContent = 'Save';
    updater();
    } else {
      span1.style.backgroundColor = 'white';
      span1.setAttribute('contenteditable', false);
      span2.textContent = 'Edit';
      updater();
    }
  })

  // function to delete user
  span3.addEventListener('click', (e) => {
    li.remove();
    console.log('Delete')
    updater();
  })
  updater();
  return li;
};

// Function to create new element
function createMyElement(parent, elType, classAdd) {
  const ele = document.createElement(elType);
  parent.append(ele);
  ele.classList.add(classAdd);
  return ele;
}
