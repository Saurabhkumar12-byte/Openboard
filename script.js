let hamburger= document.querySelector(".ham");
let toolkit= document.querySelector(".toolkit");
let pencil= document.querySelector(".pencil");
let eraser= document.querySelector(".eraser");
let eraserShow= false;
let pencilShow= false;
let noteShow= false;
let pencilbox= document.querySelector(".pencil-box");
let eraserbox= document.querySelector(".eraser-box");
let minimize= document.querySelector(".minimize");
let deleteNote= document.querySelector(".delete");
let stickyNotes= document.querySelector(".notes");
let stickyNote= document.querySelector(".sticky");

hamburger.addEventListener("click",(e)=>{
    if (hamburger.children[0].classList.contains("bi-list")) {
        hamburger.children[0].classList.remove("bi-list");
        hamburger.children[0].classList.add("bi-x-lg");
        toolkit.style.display="none"

    } else {
        hamburger.children[0].classList.add("bi-list");
        hamburger.children[0].classList.remove("bi-x-lg");
        toolkit.style.display="flex"

    }
})

pencil.addEventListener("click",(e)=>{
 pencilShow=!pencilShow;
 if (pencilShow) {
     pencilbox.style.display="block"
 } else {
    pencilbox.style.display="none"
 }
})
eraser.addEventListener("click",(e)=>{
 eraserShow=!eraserShow;
 if (eraserShow) {
     eraserbox.style.display="block"
 } else {
    eraserbox.style.display="none"
 }
})

stickyNotes.addEventListener("click", (e)=>{
   noteShow=!noteShow;
   if (noteShow) {
       stickyNote.style.display="block";
    } else {
       stickyNote.style.display="none";
       
   }
})

stickyNote.onmousedown = function(event) {
    // (1) prepare to moving: make absolute and on top by z-index
    stickyNote.style.position = 'absolute';
    stickyNote.style.zIndex = 1000;
  
    // move it out of any current parents directly into body
    // to make it positioned relative to the body
    document.body.append(stickyNote);
  
    // centers the stickyNote at (pageX, pageY) coordinates
    function moveAt(pageX, pageY) {
      stickyNote.style.left = pageX - stickyNote.offsetWidth / 2 + 'px';
      stickyNote.style.top = pageY - stickyNote.offsetHeight / 2 + 'px';
    }
  
    // move our absolutely positioned stickyNote under the pointer
    moveAt(event.pageX, event.pageY);
  
    function onMouseMove(event) {
      moveAt(event.pageX, event.pageY);
    }
  
    // (2) move the stickyNote on mousemove
    document.addEventListener('mousemove', onMouseMove);
  
    // (3) drop the stickyNote, remove unneeded handlers
    stickyNote.onmouseup = function() {
      document.removeEventListener('mousemove', onMouseMove);
      stickyNote.onmouseup = null;
    };
  
  };