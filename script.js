const main = document.querySelector("#main");
const canvas = document.querySelector(".canvas canvas");
const modeToggleBtn = document.querySelector(".btn__1 button");
const thicknessRange = document.querySelector("#rangevalue");
const thicknessOutput = document.querySelector("#output");
const colorPicker = document.querySelector(".btn__2 input");
const colorcan = document.querySelector("#color__can");
const allBtn = document.querySelector(".btn__4 button");

const ctx = canvas.getContext("2d");

let isDrawing = false;
let isErasing = false;
let strokeColor = colorPicker.value;
let isColorPickerActive = false;

window.addEventListener("load", () => {
  resizeCanvas();
  setCanvasColor();
});

const resizeCanvas = () => {
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
};

const setCanvasColor = () => {
  canvas.style.backgroundColor = colorcan.value;
};

const getClientPosition = (e) => {
  const rect = canvas.getBoundingClientRect();
  let x, y;
  if (
    e.type === "mousedown" ||
    e.type === "mouseup" ||
    e.type === "mousemove" ||
    e.type === "mouseout"
  ) {
    x = e.clientX - rect.left;
    y = e.clientY - rect.top;
  } else if (
    e.type === "touchstart" ||
    e.type === "touchend" ||
    e.type === "touchmove" ||
    e.type === "touchcancel"
  ) {
    x = e.touches[0].clientX - rect.left;
    y = e.touches[0].clientY - rect.top;
  }
  return { x, y };
};

const startDrawing = (e) => {
  if (isColorPickerActive) return;
  e.preventDefault();
  isDrawing = true;
  const { x, y } = getClientPosition(e);
  ctx.beginPath();
  ctx.moveTo(x, y);
};

const draw = (e) => {
  if (isColorPickerActive || !isDrawing) return;
  e.preventDefault();
  const { x, y } = getClientPosition(e);

  ctx.lineJoin = "round";
  ctx.lineCap = "round";
  ctx.lineJoinSmithe = "smooth";

  ctx.lineTo(x, y);
  ctx.strokeStyle = isErasing ? canvas.style.backgroundColor : strokeColor;
  ctx.lineWidth = isErasing ? 20 : thicknessRange.value;
  ctx.stroke();
};

const stopDrawing = (e) => {
  e.preventDefault();
  isDrawing = false;
};

const clearCanvas = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
};

modeToggleBtn.textContent = "Drawing Mode";
const toggleDrawingMode = () => {
  isErasing = !isErasing;
  modeToggleBtn.textContent = isErasing ? "Erasing Mode" : "Drawing Mode";
};

const resetCanvas = () => {
  clearCanvas();
  isErasing = false;
  modeToggleBtn.textContent = "Drawing Mode";
};
colorcan.classList.add("hidden");
const toggleColorPicker = () => {
  colorcan.classList.toggle("hidden");
};

modeToggleBtn.addEventListener("click", toggleDrawingMode);
canvas.addEventListener("mousedown", startDrawing);
canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mouseup", stopDrawing);
canvas.addEventListener("mouseout", stopDrawing);
canvas.addEventListener("touchstart", startDrawing);
canvas.addEventListener("touchmove", draw);
canvas.addEventListener("touchend", stopDrawing);
canvas.addEventListener("touchcancel", stopDrawing);

colorPicker.addEventListener("input", (e) => {
  strokeColor = e.target.value;
});
thicknessRange.addEventListener("input", (e) => {
  thicknessOutput.textContent = e.target.value;
});

canvas.addEventListener("dblclick", resetCanvas);
modeToggleBtn.addEventListener("dblclick", resetCanvas);

allBtn.addEventListener("click", toggleColorPicker);

colorcan.addEventListener("input", setCanvasColor);

window.addEventListener("resize", () => {
  resizeCanvas();
});

const saveCanvas = document.createElement("canvas");
const saveCtx = saveCanvas.getContext("2d");

const saveDrawing = () => {
  if (confirm("Are you sure you want to save the drawing?")) {
    // *** Set the dimensions of the save canvas
    saveCanvas.width = canvas.width;
    saveCanvas.height = canvas.height;

    // ***Fill the save canvas with the background color
    saveCtx.fillStyle = colorcan.value;
    saveCtx.fillRect(0, 0, saveCanvas.width, saveCanvas.height);

    // ***Draw the current canvas content (drawing) on top of the background color
    saveCtx.drawImage(canvas, 0, 0);

    const link = document.createElement("a");
    link.href = saveCanvas.toDataURL();
    link.download = "_FattyPaint_.png";
    link.click();
  }
};

document.querySelector(".btn__5 button").addEventListener("click", saveDrawing);
