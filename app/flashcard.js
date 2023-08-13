//add object into local storage 
const flashcards = [
  {
    sequence: 1,
    question: 'Apakah logo ini',
    seen: false,
    name: 'Logo Pertubuhan Silat Seni Gayong Malaysia',
    imagePath: '../flashcard/flashcard_logo.png',
    remember1: false,
    remember2: false,
    remember3: false,
  },
  {
    sequence: 2,
    question: 'Apa nama perbuatan ini?',
    seen: false,
    name: 'Kuda-kuda',
    imagePath: '../flashcard/flashcard_kuda-kuda.gif',
    remember1: false,
    remember2: false,
    remember3: false,
  },
  {
    sequence: 3,
    question: 'Apa nama gerakan ini?',
    seen: false,
    name: 'Tumbuk Pintal Tali',
    imagePath: '../flashcard/flashcard_gerakan1.gif',
    remember1: false,
    remember2: false,
    remember3: false,
  },
  {
    sequence: 3,
    seen: false,
    question: 'Apa nama gerakan ini?',
    name: 'Pancung Dayung',
    imagePath: '../flashcard/flashcard_gerakan2.gif',
    remember1: false,
    remember2: false,
    remember3: false,
  },
  // Add more flashcards...
  {
    sequence: 4,
    seen: false,
    question: 'Apa nama gerakan ini?',
    name: 'Tumbuk Bertapak',
    imagePath: '../flashcard/flashcard_gerakan3.gif',
    remember1: false,
    remember2: false,
    remember3: false,
  },
];

// add object into local storage
//check if there is any object in local storage 
if (!localStorage.getItem('flashcards')) {
  localStorage.setItem('flashcards', JSON.stringify(flashcards));
}

// get object from local storage



const flashcardcontainer = document.querySelector('.flashcard-container');

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
let sequence = 1; 
function showFlashcards() {
  flashcardcontainer.innerHTML = ''; // Clear the container

  //find the current flashcard sequence by sequence number 
  const currentFlashcard = storedFlashCardStates.find(flashcard => flashcard.sequence === sequence);


  console.log(currentFlashcard);
  console.log(storedFlashCardStates);
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
          sequence++;

          // Update the index to show the flashcard again after next 3 moves
          // Save the updated flashcard states to local storage even page refresh or close

          localStorage.setItem('flashcards', JSON.stringify(storedFlashCardStates));
  });
  
    }
  }


showFlashcards();



const nextButton = document.getElementById('next');
nextButton.addEventListener('click', () => {
  currentIndex = JSON.parse(localStorage.getItem('currentIndex'));
  localStorage.setItem('currentIndex', JSON.stringify(currentIndex));
});