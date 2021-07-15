async function ContactAPI() {
	let response = await fetch("https://coinhuntworldtrivia.com/API/GrabQuestions", {
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
        QuestionList.push(window.RequestedData[i].Question)
    }
    return QuestionList
}

window.addEventListener('load', function() {
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
})

function CollectResult(selection){
    for (let i = 0; i < window.RequestedData.length; i++) {
        if (selection === window.RequestedData[i].Question){
            SendAnswer(window.RequestedData[i].Answer)
        }
    }
}

function SendAnswer(Answer){
    document.getElementById("AnswerResults").innerText = Answer
}
