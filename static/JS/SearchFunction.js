$("#autoComplete-Import").on("load", LoadQuestions)

async function ContactAPI() {
	let response = await fetch("https://coinhuntworldtrivia.com/.netlify/functions/GrabQuestionsV2", {
		body: JSON.stringify({
            Text: "Dummy Text"
        }),
        method: "POST"
	});
	if (response.status === 200){
		let data = await response.json()
        window.RequestedData = data
        return
	}
}

async function GetQuestions(){
	await ContactAPI()
    var QuestionList = []
    for (let i = 0; i < window.RequestedData.length; i++) {
        QuestionList.push(window.RequestedData[i][0])
    }
    return QuestionList
}




function LoadQuestions() {
    var autoCompleteJS = new autoComplete({
		placeHolder: "Search Question",
		data: {
			src: GetQuestions(),
			cache: true,
		},
		resultItem: {
			highlight: true
		},
		events: {
			input: {
				selection: (event) => {
					const selection = event.detail.selection.value;
					setTimeout(function(){
						autoCompleteJS.input.value = "";
						autoCompleteJS.input.blur()
						autoCompleteJS.input.focus()
					},100)
					CollectResult(selection)
				}
			}
		}
	});
}

function CollectResult(selection){
    for (let i = 0; i < window.RequestedData.length; i++) {
        if (selection === window.RequestedData[i][0]){
            SendAnswer(window.RequestedData[i][1])
        }
    }
}

function SendAnswer(Answer){
    document.getElementById("AnswerResults").innerText = Answer
}
var RoundCounter = 1
function CheckPageLoad(){
    try{
        if (jQuery.ready){
            console.log(`It took ${RoundCounter} Attemp/s to load AutoComplete`)
            LoadQuestions()
        }
    }catch(err){
        RoundCounter ++
        setTimeout(CheckPageLoad, 100)
    }
}

CheckPageLoad()


