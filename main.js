const symbols = document.querySelectorAll(".symbol-selection");
const symbolsDiv = document.querySelector(".symbols");
const pickedDiv = document.querySelector(".picked");
const pickPlayer = document.querySelector(".pick-player");
const pickComputer = document.querySelector(".pick-comupter");
const symbolDefault = document.querySelector(".symbol-default");
const pickDefault = document.querySelector(".pick-default");
const resultDiv = document.querySelector(".result");
const title = resultDiv.querySelector("h1");
const btnPlayAgain = document.querySelector(".btn-playagain");
const containerMain = document.querySelector("main .container");

const score = document.querySelector(".count");
let scoreCount = 0;


symbols.forEach(el => {
	el.addEventListener("click", playGame);
});	

function playGame(e){
	containerMain.classList.add("display-none");
	/*symbolsDiv.classList.add("display-none");*/
	symbolsDiv.classList.add("symbols-transform");
	pickedDiv.classList.add("display-flex");

	const playerChoice = getPlayerChoice(e);
	const computerChoice = getComputerChoice();

	const playerSymbol = createSymbol(playerChoice, "player");
	insertAfter(playerSymbol, document.querySelector(".wrapper-player h2"));
	renderSymbolEffects(playerSymbol);
	
	setTimeout(()=> {
		symbolDefault.classList.add("symbol-default-animation");
		
		setTimeout(()=> {
			symbolDefault.classList.remove("symbol-default-animation");
			const computerSymbol = createSymbol(computerChoice, "computer");
			insertAfter(computerSymbol, document.querySelector(".wrapper-computer .pick"));
			
			setTimeout(() => {
				renderSymbolEffects(computerSymbol, true);
				
				setTimeout(() => {
					pickDefault.classList.add("display-none");
					playerSymbol.classList.add("translateX-neg50");
					pickedDiv.querySelector(".wrapper-player h2").classList.add("translateX-neg50");
					computerSymbol.classList.add("translateX-50");
					pickedDiv.querySelector(".wrapper-computer h2").classList.add("translateX-50");
					
					setTimeout(()=>{
						getResult(playerChoice, computerChoice);
						resultDiv.classList.add("display-block");
						btnPlayAgain.addEventListener("click", resetGame);
					}, 250);			
				}, 1750);
			}, 50);
		}, 2500)	
	}, 1500)
};

function getPlayerChoice(e){
	if (e.target.hasAttribute("src") === true){
		return e.target.parentNode.parentNode.parentNode.title;
	} else if (e.target.classList.contains("symbol-inner-circle")){
		return e.target.parentNode.parentNode.title;
	} else if (e.target.classList.contains("symbol-wrapper")){
		return e.target.parentNode.title;
	} else if (e.target.classList.contains("symbol-selection")){
		return e.target.title;
	};
}

function getComputerChoice(){
	const randomNumber = Math.random();
	console.log(randomNumber)
	if(randomNumber < 0.2){
		return "Scissors";
	} else if(randomNumber < 0.4){
		return "Spock";
	} else if(randomNumber < 0.6){
		return "Paper";
	} else if(randomNumber < 0.8){
		return "Lizard";
	} else{
		return "Rock";
	}
}

function getResult(playerChoice, computerChoice){
	const pChoice = playerChoice.toLowerCase();
	const cChoice = computerChoice.toLowerCase();
	if (pChoice === cChoice){
		title.innerHTML = "Draw";
	} else if (
		pChoice === "spock" && (cChoice === "scissors" || cChoice === "paper") || 
		pChoice === "scissors" && (cChoice === "paper" || cChoice === "lizard") ||
		pChoice === "paper" && (cChoice === "rock" || cChoice === "spock") ||
		pChoice === "rock" && (cChoice === "lizard" || cChoice === "scissors") ||
		pChoice === "lizard" && (cChoice === "spock" || cChoice === "paper")
		){
		++scoreCount;
		title.innerHTML = "You win"; 
		setTimeout(() => {
			renderWinnerEffect("player");
		}, 1);
	} else{
		--scoreCount;
		title.innerHTML = "You lose"; 
		setTimeout(() => {
			renderWinnerEffect("computer");
		}, 1);
	}
	score.innerHTML = scoreCount;
	if(scoreCount < 0){
		score.classList.add("count-negative");
	} else{
		if(score.classList.contains("count-negative")){
			score.classList.remove("count-negative");
		}
	}
};


function createSymbol(symbolName, player){
	const divPick = document.createElement("div");
	divPick.className = `pick pick-${player}`;
	const divOuterCircle = document.createElement("div");
	divOuterCircle.className = `symbol-outer-circle symbol-picked symbol-${symbolName.toLowerCase()}`;
	const divWrapper = document.createElement("div");
	divWrapper.className = "symbol-wrapper";
	const divSymbolText = document.createElement("div");
	divSymbolText.className = "symbol-text";
	divSymbolText.innerHTML = symbolName.toUpperCase();
	const divInnerCirlce = document.createElement("div");
	divInnerCirlce.className = "symbol-inner-circle";
	const img = document.createElement("img");
	img.setAttribute("src", `images/icon-${symbolName.toLowerCase()}.svg`); 
	divInnerCirlce.appendChild(img);
	divWrapper.appendChild(divSymbolText);
	divWrapper.appendChild(divInnerCirlce);
	divOuterCircle.appendChild(divWrapper);
	divPick.appendChild(divOuterCircle);
	return divPick;	
};

function insertAfter(newNode, referenceNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

function renderSymbolEffects(symbol, computer){
	setTimeout(() => {
		if(computer === true){
			symbol.classList.add("left0");
		} else{
			symbol.classList.add("right0");
		}
		symbol.querySelector(".symbol-picked").classList.add("symbol-rotation");
	}, 50);
	setTimeout(() => {
		symbol.querySelector(".symbol-text").classList.add("text-scale-animation");
		symbol.classList.add("get-above");
	}, 250);
	setTimeout(() => {
		symbol.querySelector(".symbol-text").remove();
		symbol.classList.remove("get-above");
	}, 1250);
};

function renderWinnerEffect(player){

	const parentNode = document.querySelector(`.pick-${player} .symbol-picked`);
	const referenceNode = parentNode.querySelector(".symbol-wrapper");
	
	const circle1 = document.createElement("div");
	circle1.classList.add("circle1");
	parentNode.insertBefore(circle1, referenceNode);
	
	const circle2 = document.createElement("div");
	circle2.classList.add("circle2");
	parentNode.insertBefore(circle2, referenceNode);
	
	const circle3 = document.createElement("div");
	circle3.classList.add("circle3");
	parentNode.insertBefore(circle3, referenceNode);
}

function resetGame(){
	pickedDiv.classList.remove("display-flex");
	containerMain.classList.remove("display-none");
	/*symbolsDiv.classList.remove("display-none");*/
	setTimeout(() => {
		symbolsDiv.classList.add("symbols-transform");
	}, 0)

	pickDefault.classList.remove("display-none");
	pickedDiv.querySelector(".wrapper-player h2").classList.remove("translateX-neg50");
	pickedDiv.querySelector(".wrapper-computer h2").classList.remove("translateX-50");
	resultDiv.classList.remove("display-block");
	score.classList.remove("text-scale-animation");

	document.querySelector(".pick-player").remove();
	document.querySelector(".pick-computer").remove();
};

/////////// MODAL ///////////////////
const btnRules = document.querySelector(".btn-rules");
const btnClose = document.querySelector(".btn-close");
const modalDiv = document.querySelector(".modal");
const modalRulesDiv = document.querySelector(".modal-rules");

btnRules.addEventListener("click", () => {
	modalDiv.classList.add("display-flex");
	setTimeout(() => {
		modalDiv.classList.add("modal-background");
		modalRulesDiv.classList.add("modal-rules-translate");
	
	}, 50)
});

btnClose.addEventListener("click", () => {
	modalDiv.classList.remove("modal-background");
	modalRulesDiv.classList.remove("modal-rules-translate");
	setTimeout(()=> {
		modalDiv.classList.remove("display-flex");
	}, 250)
});

