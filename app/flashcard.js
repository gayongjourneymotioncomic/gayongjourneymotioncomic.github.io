//add object into local storage 

const flashcards = [
  {
    sequence: 1,
    name: 'Tumbuk Pintal Tali',
    imagePath: '../img/silat2_bg.jpg',
    remember1: false,
    remember2: false,
    remember3: false
  },
  {
    sequence: 2,
    name: 'Pancung Dayung',
    imagePath: '../img/silat_bg.jpg',
    remember1: false,
    remember2: false,
    remember3: false
  },
  // Add more flashcards...
];

let currentIndex = 0; // Keep track of the current flashcard index
const flashcardcontainer = document.querySelector('.flashcard-container');

function createFlashcardElement(flashcard) {
  const flashcardElement = document.createElement('div');
  const flashcardtitle = document.createElement('h2');
  flashcardElement.classList.add('flashcard');
  
  const imageElement = document.createElement('img');
  imageElement.src = flashcard.imagePath;
  imageElement.alt = flashcard.name;

  flashcardtitle.textContent = "Flashcard";
  
  flashcardElement.appendChild(flashcardtitle);


// chapter content
  const chapterContent = document.createElement('div');
  chapterContent.classList.add('chapter-content');


// flash card
  const flashcardContent = document.createElement('div');
  chapterContent.classList.add('flash-card');


  const flashcardmain = document.createElement('div');
    flashcardmain.classList.add('flash-card');
    flashcardmain.setAttribute('data-move', flashcard.sequence);


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

function showFlashcards() {
  flashcardcontainer.innerHTML = ''; // Clear the container
  
  const currentFlashcard = flashcards[currentIndex];
  const flashcardElement = createFlashcardElement(currentFlashcard);
  
  flashcardcontainer.appendChild(flashcardElement);
  
  // Check the remember states and calculate the next index
  if (!currentFlashcard.remember1 && !currentFlashcard.remember2 && !currentFlashcard.remember3) {
    // Flashcard should appear again after next 3 moves
    currentIndex += 3;
  } else {
    // Flashcard should appear in the next 6 moves
    currentIndex += 6;
  }
  
  // If we reached the end of the flashcards, loop back to the beginning
  if (currentIndex >= flashcards.length) {
    currentIndex = 0;
  }
}

showFlashcards();

const storedFlashCardStates = JSON.parse(localStorage.getItem('flashcards')) || [];


// Add event listeners to all flash cards
const flashCards = document.querySelectorAll('.flash-card');
flashCards.forEach(flashCard => {
  const chapter = flashCard.closest('.chapter').getAttribute('data-chapter');
  const move = flashCard.getAttribute('data-move');
  

  // Check if the flash card remember state is stored in local storage is true 
  if (storedFlashCardStates.remember1 ){
    flashCard.classList.add('remember1');
  }
  if (storedFlashCardStates.remember2){
    flashCard.classList.add('remember2');
  } 
  if (storedFlashCardStates.remember3){
    flashCard.classList.add('remember3');
  }

  flashCard.addEventListener('click', () => {
    console.log('Flash card clicked:', chapter, move);  
    console.log('clicked');
    console.log(storedFlashCardStates);

    flashCard.classList.toggle('flipped');

    if (!storedFlashCardStates.remember1 ){
       storedFlashCardStates.remember1 = true; 
        flashCard.classList.add('remember1');
    }
    else if (!storedFlashCardStates.remember2 ){
       storedFlashCardStates.remember2 = true; 
        flashCard.classList.add('remember2');
    } 
    else if (!storedFlashCardStates.remember3 ){
       storedFlashCardStates.remember3 = true; 
        flashCard.classList.add('remember3');
    }

    // Save the updated flash card states to local storage
    localStorage.setItem('storedFlashCardStates', JSON.stringify(storedFlashCardStates));
  }
  )
  }
);
