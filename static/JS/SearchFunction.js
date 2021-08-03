$("#autoComplete-Import").on("load", LoadQuestions)


var TempDate = new Date()
var ExpirationDate = new Date()
var HourInUTC = TempDate.getUTCHours()
var DayInUTC = TempDate.toGMTString()

if (0 <= HourInUTC && HourInUTC <= 11){
    ExpirationDate.setUTCHours(12, 0, 0, 0)
}else{
    ExpirationDate.setUTCDate(TempDate.getUTCDay() + 2)
    ExpirationDate.setUTCHours(0, 0, 0, 0)
}


async function CheckForCookies(){
    if ( readCookie("Cache") == null){
        await ContactAPI()
        localStorage.setItem("Cache", JSON.stringify(RequestedData))
        createCookie("Cache", "True", ExpirationDate.toGMTString())
    }
}



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
		window.Preventor = undefined
        return
	}
}

async function GetQuestions(){
	await ContactAPI()
	localStorage.setItem("Cache", JSON.stringify(RequestedData))
	createCookie("Cache", "True", ExpirationDate.toGMTString())

    var QuestionList = []
    for (let i = 0; i < window.RequestedData.length; i++) {
        QuestionList.push(window.RequestedData[i][0])
    }
    return QuestionList
}

async function CheckCache(){
	if ( readCookie("Cache") != null){
		window.RequestedData = JSON.parse(localStorage.getItem("Cache"))
		var QuestionList = []
		for (let i = 0; i < window.RequestedData.length; i++) {
			QuestionList.push(window.RequestedData[i][0])
		}
		return QuestionList
	}else{
		return await GetQuestions()
	}
}


function LoadQuestions() {
    var autoCompleteJS = new autoComplete({
		placeHolder: "Search Question",
		data: {
			src: CheckCache(),
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
function LoadSearchFunction(){
	Preventor = true
    if(window.SearchStopper == undefined){
        try{
			window.SearchStopper = true
			console.log(`It took ${RoundCounter} Attemp/s to load The Search Function`)
			LoadQuestions()
			return
        }catch(err){
            RoundCounter ++
            if (window.SearchStopper == undefined){
                setTimeout(LoadSearchFunction, 100)
            }
        }
    }

}

$(window).off("load", LoadSearchFunction)
$(window).on("load", LoadSearchFunction)

if(window.Preventor == undefined){
	window.Preventor = true
	LoadSearchFunction()
}

