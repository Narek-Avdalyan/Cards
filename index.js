const usersArray = [];
const colors = [];

const randomNumber =  () => {
    return Math.floor(Math.random() * 300);
}

const creatCard = (element,Card) => {

    const number = document.createElement("h1");
    number.innerHTML = usersArray.indexOf(element)+1;

    const id = document.createElement("p");
    id.innerHTML = `Id: ${element.id}`;

    const userId= document.createElement("p");
    userId.innerHTML = `userId: ${element.userId}`;

    const title = document.createElement("p");
    title.innerHTML = `title: ${element.title}`;

    const completed = document.createElement("p");
    completed.innerHTML = `completed: ${element.completed}`;

    Card.appendChild(number);
    Card.appendChild(userId);
    Card.appendChild(id);
    Card.appendChild(title);
    Card.appendChild(completed);
}

const newPage  = (acceptedId,main) =>{

    main.remove();
    
    const element = colors[acceptedId];

    const newMainDiv = document.createElement('div');
    newMainDiv.id = 'newMainDivId';

    const arrayIndex = usersArray.findIndex((item) => item == usersArray[acceptedId]);
    const pageDiv = document.createElement("div");
    pageDiv.id = 'newDiv';
    pageDiv.setAttribute("style",`background-color: rgb(${element.firstRgb},${element.secondRgb},${element.lastRgb})`);

    const backButton = document.createElement("a");
    backButton.setAttribute("href","index.html");
    backButton.innerHTML = "back";

    newMainDiv.appendChild(backButton);
    newMainDiv.appendChild(pageDiv);

    creatCard(usersArray[arrayIndex],pageDiv);

    document.body.appendChild(newMainDiv);
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

     const main = document.createElement("main");
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
          Card.id = element.id - 1;
          Card.setAttribute("style",`background-color: rgb(${firstColor},${secondColor},${lastColor})`);
          Card.addEventListener("click",() => newPage(Card.id,main));

          creatCard(element,Card);
  
          main.appendChild(Card);
      
          document.body.appendChild(main);
      
      })
  })
}

mainFunction();
