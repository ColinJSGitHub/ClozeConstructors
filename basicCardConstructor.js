// Cloze Cards homework- Basic Flashcards portion

// We use the inputs we give to the inquirer prompts to populate our flash cards.
// Make sure inquirer NPM package is installed in the file directory!
var inquirer = require("inquirer");

// Using the fs package we are able to grab other files, interpret the data,
// and append/modify the contents of the file. In this case, we are modifying
// the basicCardList json file, appending new cards as they are created.
var fs = require("fs");

// JSON file with a few existing demo cards- add cards via the BasicCard constructor via
// the newFlashCard function.
var basicCardList = require("./basicCardList.json")
console.log(basicCardList);


// the basic flash card simply has text on the front and text on the back.
// the text string on the front should be the question you wish to ask,
// while the backside should be the answer. The BasicCard constructor accepts two arguments,
// the desired strings on the front and the back of the card.
function BasicCard(frontText, backText) {
	this.front = frontText;
	this.back = backText;
}

// Function to create the new flashcards.
function newFlashCard() {
	inquirer.prompt([{
		type: "input",
		name: "frontText",
		message: "What question would you like you flashcard to ask?"
	},

	{	type: "input",
		name: "backText",
		message: "What is the correct answer to the desired flashcard question?"
	}

	// after the inquirer prompts responses are completed, runs the 'card' variable,
	// using the BasicCard constructor to generate the new card, and pushes the new
	// card to the basicCardList jsonfile.
	]).then(function(inputs) {
		var card = new BasicCard(inputs.frontText, inputs.backText);
		basicCardList.push(card);
		
		var newBasicCardData = JSON.stringify(basicCardList, null, '\t');
		fs.writeFile('./basicCardList.json', newBasicCardData, function(err){
			if(err) throw err;
			console.log("New Basic flashcard created!")
		})
	});

}

newFlashCard();