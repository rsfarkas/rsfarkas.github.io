function tagLine(){
    var tag = document.getElementById('title');

    if(tag.classList.contains('beenClicked') == false){
        tag.insertAdjacentHTML('beforeend',"<p style='font-family:Dosis, sans serif; font-size:10vh; color:#f4e21a'>#noneinfour</p>");
    }

    tag.className += ' beenClicked';
};

//stackoverflow.com/questions/195951/change-an-elements-class-with-javascript

var slideIndex = 1;
showSlide(slideIndex);

function switchSlide(n) {
    showSlide(slideIndex += n);
}

function currentSlide(n) {
  showSlide(slideIndex = n);
}

function showSlide(n) {
    var i;
    var slidesArray = document.getElementsByClassName("slides");
    var dotsArray = document.getElementsByClassName("myDot");

    if (n > slidesArray.length) {
        slideIndex = 1;
    }

    if (n < 1) {
        slideIndex = slidesArray.length;
    };

    for (i = 0; i < slidesArray.length; i++) {
     slidesArray[i].className = slidesArray[i].className.replace(" fadeImage", "");
 }

 for (i = 0; i < dotsArray.length; i++) {
     dotsArray[i].className = dotsArray[i].className.replace(" dot-filled", "");
 }
    slidesArray[slideIndex-1].className += " fadeImage";
    dotsArray[slideIndex-1].className += " dot-filled";
}

window.setInterval(function(){
    switchSlide(1)
}, 8000);

// Slider is from an in class exercise 