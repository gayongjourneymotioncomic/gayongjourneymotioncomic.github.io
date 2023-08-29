const videos = document.querySelectorAll('video');
    let currentVideoIndex = 0;

    function playNextVideo() {
      if (currentVideoIndex < videos.length) {
        videos[currentVideoIndex].play();
        videos[currentVideoIndex].style.filter = 'blur(0)';
        videos[currentVideoIndex].style.width = '100%';
        if (currentVideoIndex > 0) {
          videos[currentVideoIndex - 1].style.filter = 'blur(5px)';
        }
        videos[currentVideoIndex].addEventListener('ended', playNextVideo);
        videos[currentVideoIndex].addEventListener('ended', () => {
          videos[currentVideoIndex].style.filter = 'blur(5px)';
          videos[currentVideoIndex].style.width = '80%';
        })
        currentVideoIndex++;
      }
      if (currentVideoIndex === videos.length) {
        currentVideoIndex = 0;
      }
        
    }

    setTimeout(() => {
      playNextVideo();
  }, 3000);


const notchapter = document.querySelectorAll('.not-chapter');

notchapter.forEach((notchapter) => {
  notchapter.addEventListener('click', () => {
    readchapter();
  });
});

  function readchapter(){
    alert("You have to start from the first chapter");
  }