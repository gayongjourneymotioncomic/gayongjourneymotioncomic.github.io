const chapterItems = document.querySelectorAll('.chapter-item');

chapterItems.forEach((item) => {
  item.addEventListener('click', () => {
    console.log('Chapter item clicked:', item.querySelector('h3').textContent);
  });
});

window.addEventListener('scroll', playVideosOnScroll);

function playVideosOnScroll() {
  const videos = document.querySelectorAll('.video-player');

  videos.forEach(video => {
    const videoOffsetTop = video.offsetTop;
    const windowHeight = window.innerHeight;
    const windowScrollTop = window.scrollY;
    const windowMiddle = windowScrollTop + windowHeight / 3;

    if (windowMiddle > videoOffsetTop && windowMiddle < videoOffsetTop + video.offsetHeight) {
      video.play();
    } else {
      video.pause();
    }
  });
}


  


