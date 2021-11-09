const usersArray = [];
const colors = [];

const randomNumber =  (a,b) => {
    return Math.floor(Math.random() * 300);
}

const creatCard = (element,Card) => {

    const number = document.createElement("h1");
    number.innerHTML = usersArray.indexOf(element)+1;

    const ID = document.createElement("p");
    ID.innerHTML = `Id: ${element.id}`;

    const userId= document.createElement("p");
    userId.innerHTML = `userId: ${element.userId}`;

    const title = document.createElement("p");
    title.innerHTML = `title: ${element.title}`;

    const completed = document.createElement("p");
    completed.innerHTML = `completed: ${element.completed}`;

    Card.appendChild(number);
    Card.appendChild(userId);
    Card.appendChild(ID);
    Card.appendChild(title);
    Card.appendChild(completed);
    
}

const mainFunction = () => {
  fetch("https://jsonplaceholder.typicode.com/todos/")
  .then((Response) => {
     return Response.json();
  })
  .then((data) => {
      
      data.forEach(element => {
          usersArray.push({
              id: element.id,
              userId: element.userId,
              title: element.title,
              completed: element.completed
          });
      });

     let main = document.createElement("main");
     main.id = "mainDiv";
     main.className = "mainClass";
      
      usersArray.forEach(element => {

        const firstColor = randomNumber();
        const secondColor = randomNumber();
        const lastColor = randomNumber();

        colors.push({
            firstRgb:firstColor,
            secondRgb:secondColor,
            lastRgb:lastColor
        });
  
          const Card = document.createElement("div");
          Card.className = "Card";
          Card.id = element.id;
          Card.setAttribute("style",`background-color: rgb(${firstColor},${secondColor},${lastColor})`);
          Card.addEventListener("click",() => cardPage(Card.id));

          creatCard(element,Card);
  
          main.appendChild(Card);
      
          document.body.appendChild(main);
      
      })
  })
}

mainFunction();

const cardPage  = (acceptedId) =>{
    var paras = document.getElementsByClassName("mainClass");
    while(paras[0]){
    paras[0].parentNode.removeChild(paras[0]);
    }
    
    const element = colors[acceptedId-1];

    const newMainDiv = document.createElement('div');
    newMainDiv.id = 'newMainDivId';

    const ArrayIndwx = usersArray.findIndex((item) => item == usersArray[acceptedId-1]);
    const pageDiv = document.createElement("div");
    pageDiv.id = 'newDiv';
    pageDiv.setAttribute("style",`background-color: rgb(${element.firstRgb},${element.secondRgb},${element.lastRgb})`);

    const backButton = document.createElement("a");
    backButton.setAttribute("href","index.html");
    backButton.innerHTML = "back";

    newMainDiv.appendChild(backButton);
    newMainDiv.appendChild(pageDiv);

    creatCard(usersArray[ArrayIndwx],pageDiv);

    document.body.appendChild(newMainDiv);
}
