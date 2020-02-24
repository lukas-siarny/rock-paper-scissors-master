const symbols = document.querySelectorAll(".main__symbols .symbol");
const symbolsDiv = document.querySelector(".main__symbols-wrapper");
const pickedDiv = document.querySelector(".main__picked-wrapper");
const pickPlayer = document.querySelector(".pick--player");
const pickComputer = document.querySelector(".pick--computer");
const symbolWaiting = document.querySelector(".symbol__waiting");
const resultDiv = document.querySelector(".main__result");
const title = resultDiv.querySelector("h1");
const btnPlayAgain = document.querySelector(".btn--playagain");

const score = document.querySelector(".header__score-count");
let scoreCount = 0;


symbols.forEach(el => {
	el.addEventListener("click", playGame);
});	

function playGame(e){
	symbolsDiv.classList.add("display-none");
	pickedDiv.classList.add("display-flex");

	const playerChoice = getPlayerChoice(e);
	const computerChoice = getComputerChoice();

	const playerSymbol = createSymbol(playerChoice, "player");
	document.querySelector(".pick--player .symbol__wrapper").appendChild(playerSymbol);
	renderSymbolEffects(playerSymbol);
	
	setTimeout(()=> {
		symbolWaiting.classList.add("symbol__waiting-animation");
		
		setTimeout(()=> {
			symbolWaiting.classList.remove("symbol__waiting-animation");
			const computerSymbol = createSymbol(computerChoice, "computer");
			insertAfter(computerSymbol, symbolWaiting);
			
			setTimeout(() => {
				renderSymbolEffects(computerSymbol, true);
				
				setTimeout(() => {
					symbolWaiting.classList.add("display-none");
					pickPlayer.classList.add("translateX-neg50");
					pickComputer.classList.add("translateX-50");
					
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
	} else if (e.target.classList.contains("symbol__inner-circle")){
		return e.target.parentNode.parentNode.title;
	} else if (e.target.classList.contains("symbol__outer-circle")){
		return e.target.parentNode.title;
	} else if (e.target.classList.contains("symbol")){
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
	const divSymbol = document.createElement("div");
	divSymbol.className = `symbol symbol--${symbolName.toLowerCase()} symbol--picked symbol--${player}-position`;
	
	const divOuterCircle = document.createElement("div");
	divOuterCircle.className = `symbol__outer-circle`;
	
	const divSymbolText = document.createElement("div");
	divSymbolText.className = "symbol__text";
	divSymbolText.innerHTML = symbolName;
	
	const divInnerCirlce = document.createElement("div");
	divInnerCirlce.className = "symbol__inner-circle";
	
	const img = document.createElement("img");
	img.setAttribute("src", `images/icon-${symbolName.toLowerCase()}.svg`); 
	
	divInnerCirlce.appendChild(img);
	divOuterCircle.appendChild(divInnerCirlce);
	divSymbol.appendChild(divOuterCircle);
	divSymbol.appendChild(divSymbolText);
	return divSymbol;	
};

function insertAfter(newNode, referenceNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

function renderSymbolEffects(symbol, computer){
	setTimeout(() => {
		if(computer === true){
			symbol.classList.add("reset-position");
		} else{
			symbol.classList.add("reset-position");
		}
	}, 50);
	setTimeout(() => {
		symbol.querySelector(".symbol__text").classList.add("symbol__text-animation");
		if(computer === true){
			pickComputer.classList.add("get-above");
		} else{
			pickPlayer.classList.add("get-above");
		}
	}, 250);
	setTimeout(() => {
		symbol.querySelector(".symbol__text").remove();
	}, 1250);
};

function renderWinnerEffect(player){

	const parentNode = document.querySelector(`.pick--${player} .symbol--picked`);
	const referenceNode = parentNode.querySelector(".symbol__outer-circle");

	document.querySelectorAll(".main__pick").forEach(el => {
		el.classList.add("get-below");
	});

	const circle1 = document.createElement("div");
	circle1.classList.add("symbol__winner-circle-1");
	parentNode.insertBefore(circle1, referenceNode);
	
	const circle2 = document.createElement("div");
	circle2.classList.add("symbol__winner-circle-2");
	parentNode.insertBefore(circle2, referenceNode);
	
	const circle3 = document.createElement("div");
	circle3.classList.add("symbol__winner-circle-3");
	parentNode.insertBefore(circle3, referenceNode);
}

function resetGame(){
	pickedDiv.classList.remove("display-flex");
	symbolsDiv.classList.remove("display-none");

	setTimeout(() => {
		symbolsDiv.classList.add("main__symbols--transform");
	}, 0)

	symbolWaiting.classList.remove("display-none");
	pickPlayer.classList.remove("translateX-neg50");
	pickComputer.classList.remove("translateX-50");
	resultDiv.classList.remove("display-block");
	score.classList.remove("symbol__text-animation");

	document.querySelector(".pick--player .symbol").remove();
	document.querySelector(".pick--computer .symbol").remove();

	document.querySelectorAll(".main__pick").forEach(el => {
		if(el.classList.contains("get-above")){
			el.classList.remove("get-above");
		}

		if(el.classList.contains("get-below")){
			el.classList.remove("get-below");
		}
	});
};

/////////// MODAL ///////////////////
const btnRules = document.querySelector(".btn--rules");
const btnClose = document.querySelector(".modal__close");
const modalDiv = document.querySelector(".modal");
const modalRulesDiv = document.querySelector(".modal__rules");

btnRules.addEventListener("click", () => {
	modalDiv.classList.add("display-flex");
	setTimeout(() => {
		modalDiv.classList.add("modal__background");
		modalRulesDiv.classList.add("modal__rules--translate");
	
	}, 50)
});

btnClose.addEventListener("click", () => {
	modalDiv.classList.remove("modal__background");
	modalRulesDiv.classList.remove("modal__rules--translate");
	setTimeout(()=> {
		modalDiv.classList.remove("display-flex");
	}, 250)
});

