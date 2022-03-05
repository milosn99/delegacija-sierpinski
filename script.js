//Definisanje velicine kanvasa i broja iteracija
const kontekst = {
  sirina: 600,
  visina: 600,
  maxIteracija: 10,
  minIteracija: 0,
};

//Definisanje temena pocetnog trougla
const tacka0 = {
  x: kontekst.sirina / 2,
  y: kontekst.visina - (Math.sqrt(3) * kontekst.visina) / 2, //Visina jednakostranicnog trougla
};

const tacka1 = {
  x: 0,
  y: kontekst.visina,
};

const tacka2 = {
  x: kontekst.sirina,
  y: kontekst.visina,
};

//Definisanje boja zbog vizualizacije
const boje = [
  "yellow",
  "orange",
  "red",
  "pink",
  "purple",
  "blue",
  "lightblue",
  "teal",
  "lightgreen",
  "green",
  "darkgreen",
];

//Definisanje listenera za promjenu broja iteracija
document.getElementById("brojIteracija").addEventListener("change", (e) => {
  let brojIteracija = document.getElementById("brojIteracija").value;
  resenje(brojIteracija);
});

//Funkcija za pocetak iscrtavanja
function resenje(brojIteracija) {
  let ctx = document.getElementById("canvas").getContext("2d");
  ctx.canvas.width = kontekst.sirina;
  ctx.canvas.height = kontekst.visina;

  //Postavljanje limita na vrednosti broja iteracija
  if (brojIteracija < kontekst.minIteracija)
    brojIteracija = kontekst.minIteracija;
  if (brojIteracija > kontekst.maxIteracija)
    brojIteracija = kontekst.maxIteracija;

  sierpinski(tacka0, tacka1, tacka2, brojIteracija);
}

//Funkcija za crtanje jednog trougla
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
  if (n < 0) return;

  nacrtajTrougao(A, B, C, boje[n]);

  //Rekurzivni poziv za gornji, levi i desni trougao
  if (n > 0) {
    //Racunanje temena unutrasnjeg trougla
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

    sierpinski(A, AB, AC, n - 1);
    sierpinski(AB, B, BC, n - 1);
    sierpinski(AC, BC, C, n - 1);
  }
}

resenje(0);
