async function ContactAPI() {
	let response = await fetch("https://keen-mclean-f877d3.netlify.app/.netlify/functions/GrabQuestions", {
		body: JSON.stringify({
            Text: "Dummy Text"
        }),
        method: "POST"
	});
	if (response.status === 200){
		let data = await response.json()
        window.RequestedData = data
	}
}

function GetQuestions(){
    var QuestionList = []
    for (let i = 0; i < window.RequestedData.length; i++) {
        QuestionList.push(window.RequestedData[i].Question)
    }
    return QuestionList
}

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
                autoCompleteJS.input.value = selection;
                CollectResult(selection)
            }
        }
    }
});

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
