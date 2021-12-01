let doorList = document.querySelectorAll(".door");

let openDoors = [];

if (localStorage.getItem("storedOpenDoors")){
    openDoors = JSON.parse(localStorage.getItem("storedOpenDoors"));
}

let date = new Date();

let currentDate = date.getDate(); //giver dagens dato
let currentMonth = date.getMonth(); //giver måned -1

let isDecember = false;

//alle links med klassen "modal-links" (nodelink/array)
let modalLinks = document.querySelectorAll(".modal-link");

//det HTML-element, der udgør selve overlay-vinduet til pop-up
let modalOuter = document.querySelector(".modal-outer");

//Det element, hvor der skal komme tekst i pop-up-vinduet
let modalContent = document.querySelector(".modal-content");


//sakl sættes til 11, hvis vi skal tjekke, om det er december.
if (currentMonth == 11) {
    isDecember = true;
}



doorList.forEach(function (element, index) {
    
    if (openDoors[index] == true){
        element.classList.add("open");
    }

    element.addEventListener("click", function () {

        if (isDecember && element.dataset.entry <= currentDate) {
            element.classList.toggle("open");

            //Jeg tilføjer klassen 'active' til modal-outer-elementet, 
            //sådan at det nu ved hjælp af styling af '.active' får opacity 1 (bliver synlig), pointer-events bliver mulige og transformerer/skalerer op i størrelse
            modalOuter.classList.add("active");

            //Jeg giver modal-content det indhold, der er defineret i de enkelte door-elementers data-attributter: 
            //henholdsvis 'data-image', 'data-heading' og 'data-paragraph'
            modalContent.innerHTML = "<img src='"+element.dataset.image+"'> <h3>"+element.dataset.heading+"</h3> <p>"+element.dataset.paragraph+"</p>";

            //Jeg tilføjer en eventlistener til at lytte efter klik på min modalOuter.
            
            modalOuter.addEventListener("click", function(){
                //I denne funktion fører dette event til, at klassen 'active' fjernes fra modalOuter-elementet, 
                //og den transformerer ned størrelse takket være styling
                modalOuter.classList.remove("active");
            
            })

            if (element.classList.contains("open")){
                openDoors[index] = true;
            }
            else {
                openDoors [index] = false;
            }
            
            localStorage.setItem("storedOpenDoors", JSON.stringify(openDoors));

            //console.log(openDoors); 
        }

        else {
            alert("Hov hov! Ikke snyde! Det er ikke d. "+element.dataset.entry +". december endnu!");
        }

    });
});



