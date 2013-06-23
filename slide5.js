;(function() {

var currentSlideNum = 1,
    slides;

window.addEventListener('DOMContentLoaded', function() {
    slides = document.querySelectorAll('.slide');
    hashchange();
    setClassName();
});

window.addEventListener('keydown', function(e) {
    if(e.keyCode === 37 || e.keyCode === 38) {
        e.preventDefault();
        back();
    }
    if(e.keyCode === 39 || e.keyCode === 40) {
        e.preventDefault();
        forward();
    }
});

window.addEventListener('hashchange', function() {
    hashchange();
});

function hashchange() {
    var hashNum = ~~window.location.hash.split('#')[1];
    if(hashNum < 1) {
        currentSlideNum = 1;
    } else if(hashNum > slides.length) {
        currentSlideNum = slides.length;
    } else if(hashNum === currentSlideNum) {
        return;
    } else {
        currentSlideNum = hashNum;
    }
    setClassName();
}

function back() {
    if(currentSlideNum === 1) {
        return;
    }
    currentSlideNum--;
    setClassName();
}

function forward() {
    var currentSlide = document.querySelector('.current'),
        currentToShow = currentSlide.querySelector('.to-show');
    if(currentToShow) {
        currentToShow.classList.remove('to-show');
    } else {
        if(currentSlideNum >= slides.length) {
            return;
        }
        currentSlideNum++;
        setClassName();
    }
}

function setClassName() {
    var currentSlide,
        prevSlide,
        nextSlide;
    for(var i = 0, iLen = slides.length; i < iLen; i++) {
        slides[i].classList.remove('prev');
        slides[i].classList.remove('current');
        slides[i].classList.remove('next');
    }
    currentSlide = document.querySelector('.slide:nth-of-type(' + currentSlideNum + ')');
    prevSlide = currentSlide.previousElementSibling;
    nextSlide = currentSlide.nextElementSibling;
    currentSlide.classList.add('current');
    prevSlide && prevSlide.classList.add('prev');
    nextSlide && nextSlide.classList.add('next');
    window.location.hash = currentSlideNum;
}

})();