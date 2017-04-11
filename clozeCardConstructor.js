// We use the inputs we give to the inquirer prompts to populate our flash cards.
// Make sure inquirer NPM package is installed in the file directory!
var inquirer = require("inquirer");

// Using the fs package we are able to grab other files, interpret the data,
// and append/modify the contents of the file. In this case, we are modifying
// the clozeCardList json file, appending new cards as they are created.
var fs = require("fs");

// JSON file with a few existing demo cards- add cards via the BasicCard constructor via
// the newFlashCard function.
var clozeCardList = require("./clozeCardList.json");


// the cloze flash card simply has a full string of text with one or two words ommitted, aka the answer.
// The incomplete card is the one with the "..." replacing the answer,
// while the answer is simply the missing portion of the text statement
function ClozeCard(completeText, answer) {

		// divides the flash card into the two sections, the completed text and the desired anwer that
		// must be deleted from the completed text.
		var clozeSections = clozeDelete(completeText, answer);

		this.incomplete = incompleteCard(completeText, clozeSections);
		this.answer = answer;

		// function to delete the answer text from the complete statement text. Also checks to ensure
		// that the answer you wish to delete from the complete statement text actually appears
		// in the statement text.
		function clozeDelete(completeText, answer) {
			var start = completeText.indexOf(answer);
			if(start !== -1) {
				return [start, start + answer.length];
			}

			throw new Error("Could not find the flashcard answer within the completed text.")
		}

		// function that creates the cloze deleted card by slicing the completed text around the answer's
		// location in the text, replacing the answer with the string " ... ".
		function incompleteCard(completeText, clozeSections) {
			var start = completeText.slice(0, clozeSections[0]);
			var end = completeText.slice(clozeSections[1], completeText.length);
			return start + " ... " + end;
		}
}


// added function to the ClozeCard constructor, the showCard function, which console.logs the complete text
// by replacing the "..." from our incompleteCard function with the answer that we had replaced with "...".
ClozeCard.prototype.showCard = function showCard(){
	console.log(this.incomplete.replace("..."), this.answer)
}

// Function to create the new flashcards.
function newFlashCard() {
	inquirer.prompt([{
		type: "input",
		name: "completeText",
		message: "What is the complete text of the desired flashcard?"
	},

	{	type: "input",
		name: "answer",
		message: "What is the answer that we are removing from the complete text of the flashcard?"
	}

	// after the inquirer prompts responses are completed, runs the 'card' variable,
	// using the ClozeCard constructor to generate the new card, the showCard prototype
	// function to display the completed flashcard text, and pushes the new
	// card to the clozeCardList jsonfile.
	]).then(function(inputs) {
		var card = new ClozeCard(inputs.completeText, inputs.answer);
		card.showCard;
		clozeCardList.push(card);
		
		var newClozeCardData = JSON.stringify(clozeCardList, null, '\t');
		fs.writeFile('./clozeCardList.json', newClozeCardData, function(err){
			if(err) throw err;
			console.log("New Cloze flashcard created!")
		})
	});

}

newFlashCard();