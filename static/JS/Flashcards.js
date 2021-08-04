//Grabbing All Necessary Elements

//Form
var FlashCardSelection = document.getElementById("FlashCardSelection")

//Flashcards
var TriviaCriteria = document.getElementById("TriviaCriteria")
var TriviaCategory = document.getElementById("TriviaCategory")
var TriviaQuestion = document.getElementById("TriviaQuestion")
var TriviaAnswer = document.getElementById("TriviaAnswer")
var TriviaCount = document.getElementById("TriviaCount")

//Buttons
var TriviaStart = document.getElementById("TriviaStart")
var RevealAnswer = document.getElementById("RevealAnswer")
var NextQuestion = document.getElementById("NextQuestion")
var TriviaRestart = document.getElementById("TriviaRestart")

//Defining Arrays
var Database = JSON.parse(localStorage.getItem("Cache"))
var Flashcards = []

//Define Variables
var RandomQuestion = 0
var TriviaLength = 0
var TriviaCompleted = 1


//Setting Up JQuery Listeners (Off Then On For Double Loading Issues)
function FlashcardEventListeners(){
        //Start Trivia
$(TriviaStart).off("click", StartTriva)
$(TriviaStart).on("click", StartTriva)

    //Reveal Answer
$(RevealAnswer).off("click", TriviaReveal)
$(RevealAnswer).on("click", TriviaReveal)

    //Next Question
$(NextQuestion).off("click", TriviaNext)
$(NextQuestion).on("click", TriviaNext)

    //Restart Trivia
$(TriviaRestart).off("click", RestartFlashcards)
$(TriviaRestart).on("click", RestartFlashcards)

}


//Start Trivia
function StartTriva(){
    window.TriviaStopper = undefined
    window.TriviaPreventor = undefined
    TriviaCompleted = 1
    for (let i = 0; i < Database.length; i++) {
        if (Database[i][4] == FlashCardSelection.value){
            Flashcards.push({"Question": Database[i][0], "Answer": Database[i][1],"Category": Database[i][5]})
        }
    }
    //Set Trivia Length
    TriviaLength = Flashcards.length

    //Hide Beginning Form and Display Flashcard
    $(".FormStart").css("display", "none")
    $(".FlashCard").css("display", "block")



    //Remove Disabled Attribute From Flashcard Buttons
    $(".FlashcardButton").attr("disabled", false)


    //Set First Question
    RandomQuestion = RandomNumber(0, (TriviaLength - 1))
    TriviaCriteria.innerText = `${FlashCardSelection.value} Vaults`
    TriviaCategory.innerText = `${Flashcards[RandomQuestion].Category}`
    TriviaQuestion.innerText = `${Flashcards[RandomQuestion].Question}`
    TriviaAnswer.innerText = `${Flashcards[RandomQuestion].Answer}`
    TriviaCount.innerText = `${TriviaCompleted} / ${TriviaLength}`

    //Remove Placed Question From Bank
    Flashcards.splice(RandomQuestion, 1)
}

function TriviaReveal(){
    $(TriviaAnswer).css("visibility", "visible")
    $(RevealAnswer).attr("disabled", true)
}


function TriviaNext(){
    //Check for Completion then reset
    if(TriviaLength == TriviaCompleted){
        //Hide Menu Buttons
        $(RevealAnswer).css("display", "none")
        $(NextQuestion).css("display", "none")

        //Show Restart Button
        $(TriviaRestart).css("display", "block")
        //Clear Text and Show Completion
        TriviaCategory.innerText = `You Have Finished ${FlashCardSelection.value} Vault Flashcards!`
        TriviaQuestion.innerText = `Press the Button Below to Restart The Process`
        TriviaAnswer.innerText = ""
        return
    }

    //Reset CSS
    $(TriviaAnswer).css("visibility", "hidden")
    $(RevealAnswer).attr("disabled", false)
    
    //Add To The Question Number
    TriviaCompleted++

    RandomQuestion = RandomNumber(0, (Flashcards.length - 1))
    TriviaCategory.innerText = `${Flashcards[RandomQuestion].Category}`
    TriviaQuestion.innerText = `${Flashcards[RandomQuestion].Question}`
    TriviaAnswer.innerText = `${Flashcards[RandomQuestion].Answer}`
    TriviaCount.innerText = `${TriviaCompleted} / ${TriviaLength}`

    //Remove Placed Question From Bank
    Flashcards.splice(RandomQuestion, 1)
}

//Restart Flashcards
function RestartFlashcards(){
    //Reset CSS
    $(".FormStart").css("display", "block")
    $(".FlashCard").css("display", "none")

    //Hide Reset Button
    $(TriviaRestart).css("display", "none")

    //Unhide Menu Buttons
    $(RevealAnswer).css("display", "inline-block")
    $(NextQuestion).css("display", "inline-block")

    
}




//Random Number For Random Flash Cards
function RandomNumber(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}


var RoundCounter = 1
function LoadTrivia(){
	window.TriviaPreventor = true
    if(window.TriviaStopper == undefined){
        try{
			window.TriviaStopper = true
			console.log(`It took ${RoundCounter} Attemp/s to load The Search Function`)
			FlashcardEventListeners()
			return
        }catch(err){
            RoundCounter ++
            if (window.TriviaStopper == undefined){
                setTimeout(LoadTrivia, 100)
            }
        }
    }

}


//Prevent Double Loading
$(window).off("load", LoadTrivia)
$(window).on("load", LoadTrivia)

if(window.TriviaPreventor == undefined){
	window.TriviaPreventor = true
	LoadTrivia()
}

function readCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}