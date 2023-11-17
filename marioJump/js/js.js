// DOM - >


const mario = document.querySelector(".mario");
const pipe = document.querySelector(".pipe");
const points = document.querySelector("#pontos");
const clouds = document.querySelector(".clouds");
const pointsFinals = document.querySelector("#pontosFinais");
const gameOver = document.querySelector("#gameOver");
const recomecar = document.querySelector("#recomecar");
const fases = document.querySelector("#fase");
const div = document.querySelector(".game-board");
const obstaculo = document.querySelector("#obstac");
const audio = document.querySelector("#audioTematico");
const perdeu = document.querySelector("#perdeu");
const pulo = document.querySelector("#pulo");
let contador = 0;
let contadorFases = 0;

// Toda vez que apertar uma tecla. o audio de pulo se inicia
const pular = () => {
  pulo.play();
};


//  Toda vez que aperta uma tecla, é adicionada a class Jump, que 
//  faz com que o boneco pule, logo após usamos o setTimeout e removemos
//  a class após 5ms

const jump = () => {
  mario.classList.add("jump");

  setTimeout(() => {
    mario.classList.remove("jump");
  }, 500);
};

const loop = setInterval(() => {
  const pipePosition = pipe.offsetLeft;  // Obtém a posição do cano
  const marioPosition = +window
    .getComputedStyle(mario)
    .bottom.replace("px", "");  // Obtém a posição do Mario


    // Após saber os valores, fazemos uma verificação, caso sejam verdadeiras
    // o jogo encerra.

  if (pipePosition <= 135 && pipePosition > 0 && marioPosition < 105) {
    pipe.style.left = `${pipePosition}px`;
    pipe.style.animation = "none";
    mario.style.animation = "none";
    mario.style.bottom = `${marioPosition}px`;
    mario.src = "./image/game-over.png";
    mario.style.width = "80px";
    mario.style.marginLeft = "55px";
    gameOver.src = "./image/gameover.png";
    contador++;
    points.textContent = "0";
    pointsFinals.textContent = `Sua pontuação final foi: ${contador}`;
    recomecar.textContent = "Pressione f5 para recomecar";
    clearInterval(loop);
    div.classList.add("derrota");
    perdeu.play();
    audio.pause();

    setTimeout(() => {
      window.location.reload();  //Após 8s a pagina irá reccargar automaticamente
    }, 8000);
  } else {
    contador++;
    points.textContent = `${contador}`;
    audio.play();


    //A cada multiplo de 100, o contador aumenta +1, o que aumenta a fase do jogo
    if (contador % 100 === 0) {  
      contadorFases++;


      //O switch case foi usado a partir do contadorFases e toda vez que eu aumento de fase
      // a velocidade aumenta
      switch (contadorFases) {
        case 1:
          pipe.style.animationDuration = "1.8s";
          pipe.src = "image/foguete.png";
          pipe.style.width = '110px'
          
          break;
        case 2:
          pipe.style.animationDuration = "1.6s";
          pipe.src = "./image/pipe.png";
          break;
        case 3:
          pipe.style.animationDuration = "1.4s";
          break;
        case 4:
          pipe.style.animationDuration = "1.2s";
          break;
        case 5:
          pipe.style.animationDuration = "1.1s";
          break;
      }
      fases.textContent = `${contadorFases}`;
    }
  }
}, 100);


// Eventos
document.addEventListener("keydown", jump);
document.addEventListener("keydown", pular);
