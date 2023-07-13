//add object into local storage 

const flashcards = [
  {
    page: 'page1',
    sequence: 1,
    question: 'Apa nama perbuatan ini?',
    seen: false,
    name: 'Kuda-kuda',
    imagePath: '../flashcard/flashcard_kuda-kuda.gif',
    remember1: false,
    remember2: false,
    remember3: false,
    index: 0
  },
  {
    page:'page2',
    sequence: 2,
    question: 'Apa nama gerakan ini?',
    seen: false,
    name: 'Tumbuk Pintal Tali',
    imagePath: '../flashcard/flashcard_gerakan1.gif',
    remember1: false,
    remember2: false,
    remember3: false,
    index: 1
  },
  {
    page:'page3',
    sequence: 3,
    seen: false,
    question: 'Apa nama gerakan ini?',
    name: 'Pancung Dayung',
    imagePath: '../flashcard/flashcard_gerakan2.gif',
    remember1: false,
    remember2: false,
    remember3: false,
    index: 2
  },
  // Add more flashcards...
  {
    page:'page4',
    sequence: 4,
    seen: false,
    question: 'Apa nama gerakan ini?',
    name: 'Tumbuk Bertapak',
    imagePath: '../flashcard/flashcard_gerakan3.gif',
    remember1: false,
    remember2: false,
    remember3: false,
    index: 3
  },
];

// add object into local storage
//check if there is any object in local storage 
if (!localStorage.getItem('flashcards')) {
  localStorage.setItem('flashcards', JSON.stringify(flashcards));
}

// get object from local storage

let currentIndex = 1; // Keep track of the current flashcard index
if(!localStorage.getItem('currentIndex')){ // Check if there is a current index in local storage
   localStorage.setItem('currentIndex', JSON.stringify(currentIndex));
}



const flashcardcontainer = document.querySelector('.flashcard-container');
const flashcardcontainer2 = document.querySelector('.flashcard-container2');

function createFlashcardElement(flashcard) {
  const flashcardElement = document.createElement('div');
  const flashcardtitle = document.createElement('h2');
  flashcardElement.classList.add('flashcard-main');
  
  const imageElement = document.createElement('img');
  imageElement.src = flashcard.imagePath;
  imageElement.alt = flashcard.name;

  flashcardtitle.classList.add('flashcard-title');
  flashcardtitle.textContent = flashcard.question;
  
  flashcardElement.appendChild(flashcardtitle);


//chapter content
  const chapterContent = document.createElement('div');
  chapterContent.classList.add('chapter-content');


// flash card
  const flashcardContent = document.createElement('div');
  flashcardContent.classList.add('flashcard');


  const flashcardmain = document.createElement('div');
    flashcardmain.classList.add('flash-card');
    flashcardmain.setAttribute('data-move', flashcard.sequence);
    flashcardmain.setAttribute('id', flashcard.sequence);


    if (flashcard.remember1 ){
      flashcardmain.classList.add('remember1');
      }
    if (flashcard.remember2){
      flashcardmain.classList.add('remember2');
    } 
    if (flashcard.remember3){
      flashcardmain.classList.add('remember3');
    }   

  // flash card front
    const flashcardFront = document.createElement('div');
    flashcardFront.classList.add('flash-card-front');

    const flashcardback = document.createElement('div');
    flashcardback.classList.add('flash-card-back');

    const flashcardbacktitle = document.createElement('p');
    flashcardbacktitle.textContent = flashcard.name;

    flashcardback.appendChild(flashcardbacktitle);
    flashcardFront.appendChild(imageElement);

    flashcardmain.appendChild(flashcardFront);
    flashcardmain.appendChild(flashcardback);

    flashcardContent.appendChild(flashcardmain);
    flashcardElement.appendChild(flashcardContent);

    


  return flashcardElement;
}

// Get the stored flash card states from local storage
const storedFlashCardStates = JSON.parse(localStorage.getItem('flashcards')) || {};

function showFlashcards() {
  flashcardcontainer.innerHTML = ''; // Clear the container

  currentIndex = JSON.parse(localStorage.getItem('currentIndex'));
  // Find the next flashcard to display based on the current index
  currentpage = document.querySelector('.current-page');
  console.log(currentpage.id);
  let currentFlashcard = storedFlashCardStates.find(flashcard => flashcard.page === currentpage.id);

    
  if (currentFlashcard) {
    const flashcardElement = createFlashcardElement(currentFlashcard);
    if (currentFlashcard.remember1 ){
      flashcardElement.classList.add('remember1');
      }
    if (currentFlashcard.remember2){
      flashcardElement.classList.add('remember2');
    } 
    if (currentFlashcard.remember3){
      flashcardElement.classList.add('remember3');
    }   
    //add id to flashcard element
    flashcardcontainer.appendChild(flashcardElement);

    currentFlashcard.seen = true;
    storedFlashCardStates[currentFlashcard.seen] = currentFlashcard;
    //store in local storage
    localStorage.setItem('flashcards', JSON.stringify(storedFlashCardStates));

    //add event listener to flashcard element

    const clickedFlashcardElement = document.getElementById(currentFlashcard.sequence);
    clickedFlashcardElement.addEventListener('click', function(){
      clickedFlashcardElement.classList.toggle('flipped');

          if (!currentFlashcard.remember1) {
            currentFlashcard.remember1 = true;
            clickedFlashcardElement.classList.add('remember1');
          } else if (!currentFlashcard.remember2) {
            currentFlashcard.remember2 = true;
            flashcardElement.classList.add('remember2');
          } else if (!currentFlashcard.remember3) {
            currentFlashcard.remember3 = true;
            flashcardElement.classList.add('remember3');
          }

          // Update the index to show the flashcard again after next 3 moves
          currentFlashcard.index += 1;
          // Save the updated flashcard states to local storage even page refresh or close

          localStorage.setItem('flashcards', JSON.stringify(storedFlashCardStates));
  });
  
    }
  }

 
function showFlashcards2(){
  flashcardcontainer2.innerHTML = ''; // Clear the container

  currentIndex = JSON.parse(localStorage.getItem('currentIndex'));
  // Find the next flashcard to display based on the current index
  //retrieve the object from local storage and convert it into array 
  
  let index = -1;
  storedFlashCardStates.forEach(flashcardstate => {
    // check if any of the flashcard remember1, remember2, remember3 is true
    if(flashcardstate.seen) {
      if(flashcardstate.remember1){
        index = flashcardstate.index;
        return;
      }
      else if(flashcardstate.remember1 && flashcardstate.remember2 ){
        index = flashcardstate.index;
        return;
      }
      else if(flashcardstate.remember1 && flashcardstate.remember2 && flashcardstate.remember3){
        index = flashcardstate.index;
        return;
      }
      else{
        return;
      }
    }

  });
  let currentFlashcard = storedFlashCardStates.find(flashcard => flashcard.index === index);
  if (currentFlashcard) {
    const flashcardElement = createFlashcardElement(currentFlashcard);
    if (currentFlashcard.remember1 ){
      flashcardElement.classList.add('remember1');
      }
    if (currentFlashcard.remember2){
      flashcardElement.classList.add('remember2');
    } 
    if (currentFlashcard.remember3){
      flashcardElement.classList.add('remember3');
    }   
    flashcardcontainer2.appendChild(flashcardElement);
  
  }
const clickedFlashcardElement = document.getElementById(currentFlashcard.sequence);
    clickedFlashcardElement.addEventListener('click', function(){
      clickedFlashcardElement.classList.toggle('flipped');

          if (!currentFlashcard.remember1) {
            currentFlashcard.remember1 = true;
            clickedFlashcardElement.classList.add('remember1');
          } else if (!currentFlashcard.remember2) {
            currentFlashcard.remember2 = true;
            flashcardElement.classList.add('remember2');
          } else if (!currentFlashcard.remember3) {
            currentFlashcard.remember3 = true;
            flashcardElement.classList.add('remember3');
          }

          // Update the index to show the flashcard again after next 3 moves
          currentFlashcard.index += 1;
          // Save the updated flashcard states to local storage even page refresh or close

          localStorage.setItem('flashcards', JSON.stringify(storedFlashCardStates));
  });
}


showFlashcards();
showFlashcards2();



const nextButton = document.getElementById('next');
nextButton.addEventListener('click', () => {
  currentIndex = JSON.parse(localStorage.getItem('currentIndex'));
  localStorage.setItem('currentIndex', JSON.stringify(currentIndex));
});