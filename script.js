let tacka0 = {
  x: 300,
  y: 600 - 519.615242271,
};

let tacka1 = {
  x: 0,
  y: 600,
};

let tacka2 = {
  x: 600,
  y: 600,
};

document
  .getElementById("number")
  .addEventListener("change", handleChangeBrojIteracija);

function handleChangeBrojIteracija(e) {
  let brojIteracija = document.getElementById("number").value;
  iscrtaj(brojIteracija);
}

function iscrtaj(brojIteracija) {
  let c = document.getElementById("canvas");
  let ctx = c.getContext("2d");
  ctx.clearRect(0, 0, 600, 600);

  if (brojIteracija < 0) brojIteracija = 0;
  if (brojIteracija > 10) brojIteracija = 10;

  nacrtajTrougao(tacka0, tacka1, tacka2);
  sierpinski(tacka0, tacka1, tacka2, brojIteracija);
}

function nacrtajTrougao(A, B, C) {
  let c = document.getElementById("canvas");
  let ctx = c.getContext("2d");

  ctx.beginPath();
  ctx.moveTo(A.x, A.y);
  ctx.lineTo(B.x, B.y);
  ctx.lineTo(C.x, C.y);
  ctx.lineTo(A.x, A.y);
  ctx.stroke();

  ctx.closePath();
}

function sierpinski(A, B, C, n) {
  if (n === 0) nacrtajTrougao(tacka0, tacka1, tacka2);
  if (n > 0) {
    let AB = {
      x: (A.x + B.x) / 2,
      y: (A.y + B.y) / 2,
    };

    let AC = {
      x: (C.x + A.x) / 2,
      y: (A.y + B.y) / 2,
    };

    let BC = {
      x: A.x,
      y: B.y,
    };

    nacrtajTrougao(AB, BC, AC);
    if (n > 1) {
      sierpinski(A, AB, AC, n - 1);
      sierpinski(AB, B, BC, n - 1);
      sierpinski(AC, BC, C, n - 1);
    }
  }
}

iscrtaj(0);
