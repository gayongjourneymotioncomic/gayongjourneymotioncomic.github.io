const clickedFlashcardElement = document.querySelectorAll('.flash-card');


clickedFlashcardElement.forEach((flashcardElement) => {
  flashcardElement.addEventListener('click', () => {
    flashcardElement.classList.toggle('flipped');

  });
}); 
  

const nextButton = document.getElementById('next');
nextButton.addEventListener('click', () => {
  currentIndex = JSON.parse(localStorage.getItem('currentIndex'));
  localStorage.setItem('currentIndex', JSON.stringify(currentIndex));
});