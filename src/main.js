import "./style.css";

let themes = ["yellow", "green", "blue", "dark"];

setTheme(getTheme());

function createCard(date, day, games) {
  return `
    <div class="card">
    <h2>${date} <span>${day}</span></h2>
    <ul>
        ${games}
        
    </ul>
    </div>
    
    `;
  // poderia adcionar a animação com delay aqui no js, caso fosse muitos cartões para animar
  // style="animation-delay: ${delay}" inicaindo o delay com 0 fora da função
}

function createGame(player1, player2, hour) {
  return `
    <li>
    <img src="/assets/flags/icon=${player1}.svg" alt="">
    <strong>${hour}</strong>
    <img src="/assets/flags/icon=${player2}.svg" alt="">
    </li>

    `;
}

document.querySelector("#cards").innerHTML = `
  ${createCard("24/11", "quinta", createGame("brazil", "serbia", "16:00"))}     
  ${createCard(
    "28/11",
    "segunda",
    createGame("brazil", "switzerland", "13:00")
  )}  
  ${createCard("02/12", "sexta", createGame("brazil", "cameroon", "13:00"))}

`;
// para adcionar outro jogo no mesmo dia posso concatenar o creategame "+"

document.querySelector(".btnEl").addEventListener("click", changeTheme);

function changeTheme() {
  let element = document.getElementById("body");

  themes.shift(); // Remove o tema atual da lista
  themes.push(element.className); // Adiciona o tema atual ao final da lista
  setTheme(themes[0]); // Seta o nome tema que está na sequência

  //  forma alternativa
  // let classeEl = document.querySelector("#body");
  // console.log(classeEl);
  // if (classeEl.className == "yellow") {
  //   classeEl.classList.remove("yellow");
  //   classeEl.classList.add("green");
  // } else if (classeEl.className == "green") {
  //   classeEl.classList.remove("green");
  //   classeEl.classList.add("blue");
  // } else if (classeEl.className == "blue") {
  //   classeEl.classList.remove("blue");
  //   classeEl.classList.add("yellow");
  // }
}

function saveTheme(theme) {
  document.cookie = `theme=${theme}`;
}

function getTheme() {
  let cookies = document.cookie.split("; ");
  let theme = cookies.filter((item) => item.indexOf("theme=") !== -1);
  const deafultTheme = "yellow";

  return theme[0] ? theme[0].replace("theme=", "") : deafultTheme;
}

function setTheme(theme) {
  let element = document.getElementById("body");
  let index = themes.indexOf(theme); // Pega o indice do tema passado no array de temas

  themes.splice(index, 1); // Remove o tema passado da sua posição atual no array de temas
  themes.unshift(theme); // Adiciona o tema passado ao final do array de temas (para que seja possível mudar os temas infinitamente enquando o usuário pressiona o botão mudar tema)

  element.className = themes[0]; // Aplica o tema que está na posição 0 do array
  saveTheme(element.className); // Salva o array nos cookies
}

/*
  FLUXO DA APLICAÇÃO DE TEMAS
  - Ao abrir a página será procurado um tema nos cookies, através da função getTheme, se não houver nenhum tema salvo, será retornado o tema padrão (yellow):
  - O tema retornado da função getTheme é aplicado ao body da aplicação;
  - Quando o usuário solica a alteração do tema, através da função changeTheme, ocorre o seguinte fluxo:
    - O tema atual é removido do array de temas e inserido novamente no fim do array para que possa ser aplicado novamente posteriormente
    - Após aplicar um tema, atráves da função setTheme, o tema é aplicado ao body e salvo nos cookies
    - E este fluxo ocorre novamente sempre que o usuário solicita a mudança de tema;
*/
