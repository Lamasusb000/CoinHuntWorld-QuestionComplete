async function ContactAPI() {
	let response = await fetch("https://keen-mclean-f877d3.netlify.app/.netlify/functions/GrabQuestions", {
		method: "GET"
	});
	if (response.status === 200){
		let data = await response.json()
		console.log(data)
	}
}





var RequestedData = [
    {
        "Question": "What Color is the inside of a watermelon",
        "Answer": "Red"
    },
    {
        "Question": "Where was the first uservault",
        "Answer": "Bellevue"
    }
]

function GetQuestions(){
    var QuestionList = []
    for (let i = 0; i < RequestedData.length; i++) {
        QuestionList.push(RequestedData[i].Question)
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
    for (let i = 0; i < RequestedData.length; i++) {
        if (selection === RequestedData[i].Question){
            SendAnswer(RequestedData[i].Answer)
        }
    }
}

function SendAnswer(Answer){
    document.getElementById("AnswerResults").innerText = Answer
}
