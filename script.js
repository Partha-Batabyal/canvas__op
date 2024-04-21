// DOM elements
const main = document.querySelector("#main");
const canvas = document.querySelector(".canvas canvas");
const modeToggleBtn = document.querySelector(".btn__1 button");
const thicknessRange = document.querySelector("#rangevalue");
const thicknessOutput = document.querySelector("#output");
const colorPicker = document.querySelector(".btn__2 input");
const colorcan = document.querySelector("#color__can");
const allBtn = document.querySelector(".btn__4 button");

// Canvas context
const ctx = canvas.getContext("2d");

// Drawing variables
let isDrawing = false;
let isErasing = false;
let strokeColor = colorPicker.value;

// Initialize canvas size
window.addEventListener("load", () => {
  resizeCanvas();
});

// Resize canvas to match container size
const resizeCanvas = () => {
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
};

// Set canvas background color
const setCanvasColor = () => {
  canvas.style.backgroundColor = colorcan.value;
};

// Get client position relative to canvas
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

// Start drawing
const startDrawing = (e) => {
  e.preventDefault();
  isDrawing = true;
  const { x, y } = getClientPosition(e);
  ctx.beginPath();
  ctx.moveTo(x, y);
};

// Draw on canvas
const draw = (e) => {
  e.preventDefault();
  if (!isDrawing) return;

  const { x, y } = getClientPosition(e);
  ctx.lineTo(x, y);
  ctx.strokeStyle = isErasing ? "white" : strokeColor;
  ctx.lineWidth = isErasing ? 20 : thicknessRange.value;
  ctx.stroke();
};

// Stop drawing
const stopDrawing = (e) => {
  e.preventDefault();
  isDrawing = false;
};

// Clear canvas
const clearCanvas = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
};

// Toggle drawing mode (drawing or erasing)
modeToggleBtn.textContent = "Erasing Mode";
const toggleDrawingMode = () => {
  isErasing = !isErasing;
  modeToggleBtn.textContent = isErasing ? "Drawing Mode" : "Erasing Mode";
};

// Reset canvas and button state
const resetCanvas = () => {
  clearCanvas();
  isErasing = false;
  modeToggleBtn.textContent = "Drawing Mode";
};

// Toggle color picker visibility
const toggleColorPicker = () => {
  colorcan.classList.toggle("hidden");
};

// Event listeners
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

// Double click events to reset canvas
canvas.addEventListener("dblclick", resetCanvas);
modeToggleBtn.addEventListener("dblclick", resetCanvas);

// Tap to toggle color picker visibility (for mobile)
allBtn.addEventListener("click", toggleColorPicker);

// Change canvas color based on color picker input
colorcan.addEventListener("input", setCanvasColor);

// Handle canvas resize on window resize event
window.addEventListener("resize", () => {
  resizeCanvas();
});
