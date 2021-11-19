let hamburger = document.querySelector(".ham");
let toolkit = document.querySelector(".toolkit");
let pencil = document.querySelector(".pencil");
let eraser = document.querySelector(".eraser");
let eraserShow = false;
let pencilShow = false;
let noteShow = false;
let pencilbox = document.querySelector(".pencil-box");
let eraserbox = document.querySelector(".eraser-box");
let minimize = document.querySelector(".minimize");
let deleteNote = document.querySelector(".delete");
let stickyNotes = document.querySelector(".notes");
let stickyNote = document.querySelector(".sticky");
let image = document.querySelector(".image");
let imagebox = document.querySelector(".imgabox");
let pencolr=document.querySelector(".pencil-color");

hamburger.addEventListener("click", (e) => {
  if (hamburger.children[0].classList.contains("bi-list")) {
    hamburger.children[0].classList.remove("bi-list");
    hamburger.children[0].classList.add("bi-x-lg");
    toolkit.style.display = "none";
  } else {
    hamburger.children[0].classList.add("bi-list");
    hamburger.children[0].classList.remove("bi-x-lg");
    toolkit.style.display = "flex";
  }
});

pencil.addEventListener("click", (e) => {
  pencilShow = !pencilShow;
  if (pencilShow) {
    pencilbox.style.display = "block";
  } else {
    pencilbox.style.display = "none";
  }
});
eraser.addEventListener("click", (e) => {
  eraserShow = !eraserShow;
  if (eraserShow) {
    eraserbox.style.display = "block";
  } else {
    eraserbox.style.display = "none";
  }
});

stickyNotes.addEventListener("click", (e) => {
  noteShow = !noteShow;
  if (noteShow) {
    stickyNote.style.display = "block";
  } else {
    stickyNote.style.display = "none";
  }
});

stickyNote.onmousedown = function (event) {
  // (1) prepare to moving: make absolute and on top by z-index
  stickyNote.style.position = "absolute";
  stickyNote.style.zIndex = 1000;

  // move it out of any current parents directly into body
  // to make it positioned relative to the body
  document.body.append(stickyNote);

  // centers the stickyNote at (pageX, pageY) coordinates
  function moveAt(pageX, pageY) {
    stickyNote.style.left = pageX - stickyNote.offsetWidth / 2 + "px";
    stickyNote.style.top = pageY - stickyNote.offsetHeight / 2 + "px";
  }

  // move our absolutely positioned stickyNote under the pointer
  moveAt(event.pageX, event.pageY);

  function onMouseMove(event) {
    moveAt(event.pageX, event.pageY);
  }

  // (2) move the stickyNote on mousemove
  document.addEventListener("mousemove", onMouseMove);

  // (3) drop the stickyNote, remove unneeded handlers
  stickyNote.onmouseup = function () {
    document.removeEventListener("mousemove", onMouseMove);
    stickyNote.onmouseup = null;
  };
};
imagebox.onmousedown = function (event) {
  imagebox.style.position = "absolute";
  imagebox.style.zIndex = 1000;
  document.body.append(imagebox);
  function moveAt(pageX, pageY) {
    imagebox.style.left = pageX - imagebox.offsetWidth / 2 + "px";
    imagebox.style.top = pageY - imagebox.offsetHeight / 2 + "px";
  }
  moveAt(event.pageX, event.pageY);
  function onMouseMove(event) {
    moveAt(event.pageX, event.pageY);
  }
  document.addEventListener("mousemove", onMouseMove);
  imagebox.onmouseup = function () {
    document.removeEventListener("mousemove", onMouseMove);
    imagebox.onmouseup = null;
  };
};

image.addEventListener("click", (e) => {
  let input = document.createElement("input");
  input.setAttribute("type", "file");
  input.click();
  input.addEventListener("change", (e) => {
    let file = input.files[0];
    let url = URL.createObjectURL(file);

    let img = document.createElement("img");
    img.src = url;
    imagebox.appendChild(img);
    imagebox.style.display = "block";
  });
});

/// create canvas element and append it to document body
var canvas = document.createElement("canvas");
document.body.appendChild(canvas);

// some hotfixes... ( ≖_≖)
document.body.style.margin = 0;
canvas.style.position = "fixed";

// get canvas 2D context and set him correct size
var ctx = canvas.getContext("2d");
resize();

// last known position
var pos = { x: 0, y: 0 };

window.addEventListener("resize", resize);
document.addEventListener("mousemove", draw);
document.addEventListener("mousedown", setPosition);
document.addEventListener("mouseenter", setPosition);

// new position from mouse event
function setPosition(e) {
  pos.x = e.clientX;
  pos.y = e.clientY;
}

// resize canvas
function resize() {
  ctx.canvas.width = window.innerWidth;
  ctx.canvas.height = window.innerHeight;
}

function draw(e) {
  // mouse left button must be pressed
  if (e.buttons !== 1) return;

  ctx.beginPath(); // begin

  ctx.lineWidth = 1;
  ctx.lineCap = "round";
  
  ctx.strokeStyle = `red`;

  ctx.moveTo(pos.x, pos.y); // from
  setPosition(e);
  ctx.lineTo(pos.x, pos.y); // to

  ctx.stroke(); // draw it!
}
