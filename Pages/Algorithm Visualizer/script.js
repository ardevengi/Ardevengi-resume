const n = 20;
const array = [];

var slider = document.getElementById("myRange");
var x;
slider.addEventListener("mousemove", function () {
  x = slider.value;
});
slider.addEventListener("touchmove", function () {
  x = slider.value;
});

init();

function init() {
  for (let i = 0; i < n; i++) {
    array[i] = Math.random();
  }
  showBars();
}

function play() {
  const copy = [...array];
  const moves = sort(copy);
  animate(moves);
}

function animate(moves) {
  if (moves.length == 0) {
    showBars();
    return;
  }
  const move = moves.shift();
  const [i, j] = move.indices;
  if (move.type == "swap") [array[i], array[j]] = [array[j], array[i]];
  showBars(move);

  setTimeout(function () {
    animate(moves);
  }, x);
}

function sort(arr) {
  const moves = [];
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      moves.push({ indices: [j, j + 1], type: "comp" });
      if (arr[j] > arr[j + 1]) {
        moves.push({ indices: [j, j + 1], type: "swap" });
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  return moves;
}

function showBars(move) {
  container.innerHTML = "";
  for (let i = 0; i < array.length; i++) {
    const bar = document.createElement("div");
    bar.style.height = array[i] * 100 + "%";
    bar.classList.add("bars");
    if (move && move.indices.includes(i)) {
      bar.style.backgroundColor = move.type == "swap" ? "red" : "blue";
    }
    container.appendChild(bar);
  }
}
