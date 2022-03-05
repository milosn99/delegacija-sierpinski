//Definisanje pocetnih tacaka
const tacka0 = {
  x: 300,
  y: 600 - 519.615242271,
};

const tacka1 = {
  x: 0,
  y: 600,
};

const tacka2 = {
  x: 600,
  y: 600,
};

//Definisanje boja zbog vizualizacije
const boje = [
  "blue",
  "lightblue",
  "green",
  "yellow",
  "red",
  "purple",
  "pink",
  "black",
  "white",
  "gray",
];

//Definisanje velicine kanvasa i broja iteracija
const kontekst = {
  sirina: 600,
  visina: 600,
  maxIteracija: 10,
  minIteracija: 0,
};

//Definisanje listerenera za promjenu broja iteracija
document
  .getElementById("number")
  .addEventListener("change", handleChangeBrojIteracija);

function handleChangeBrojIteracija(e) {
  let brojIteracija = document.getElementById("number").value;
  resenje(brojIteracija);
}

//funkcija za iscrtavanje
function resenje(brojIteracija) {
  let c = document.getElementById("canvas");
  let ctx = c.getContext("2d");
  ctx.canvas.width = kontekst.sirina;
  ctx.canvas.height = kontekst.visina;

  if (brojIteracija < kontekst.minIteracija)
    brojIteracija = kontekst.minIteracija;
  if (brojIteracija > kontekst.maxIteracija)
    brojIteracija = kontekst.maxIteracija;

  sierpinski(tacka0, tacka1, tacka2, brojIteracija);
}

//funkcija za crtanje jednog trougla
function nacrtajTrougao(A, B, C, boja) {
  let c = document.getElementById("canvas");
  let ctx = c.getContext("2d");

  ctx.beginPath();
  ctx.moveTo(A.x, A.y);
  ctx.lineTo(B.x, B.y);
  ctx.lineTo(C.x, C.y);
  ctx.lineTo(A.x, A.y);
  ctx.closePath();

  ctx.fillStyle = boja;
  ctx.fill();
}

//Algoritam za kreiranje trougla Sjerpinskog za N iteracija
function sierpinski(A, B, C, n) {
  if (n >= 0) {
    nacrtajTrougao(A, B, C, boje[n]);

    //Racunanje vrhova unutrasnjeg trougla
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

    //Rekurzivni poziv za gornji, levi i desni trougao
    if (n > 0) {
      sierpinski(A, AB, AC, n - 1);
      sierpinski(AB, B, BC, n - 1);
      sierpinski(AC, BC, C, n - 1);
    }
  }
}

resenje(0);
