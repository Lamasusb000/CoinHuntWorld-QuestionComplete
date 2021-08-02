$("#autoComplete-Import").on("load", LoadQuestions)


var TempDate = new Date()
var ExpirationDate = new Date()
var HourInUTC = TempDate.getUTCHours()
var DayInUTC = TempDate.toGMTString()

if (0 <= HourInUTC && HourInUTC <= 11){
    ExpirationDate.setUTCHours(12, 0, 0, 0)
    console.log(DayInUTC)
    console.log(ExpirationDate.toGMTString())
}else{
    ExpirationDate.setUTCDate(TempDate.getUTCDay() + 2)
    ExpirationDate.setUTCHours(0, 0, 0, 0)
    console.log(DayInUTC)
    console.log(ExpirationDate.toGMTString())
}


async function CheckForCookies(){
    if ( readCookie("Cache") == null){
        await ContactAPI()
        localStorage.setItem("Cache", JSON.stringify(RequestedData))
        createCookie("Cache", "True", ExpirationDate.toGMTString())
        console.log("Created a Cookie")
    }else{
        console.log("Cookie Already Exists")
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

function CheckCache(){
	if ( readCookie("Cache") != null){
		return JSON.parse(localStorage.getItem("Cache"))
	}else{
		GetQuestions()
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
function CheckPageLoad(){
    try{
        if (jQuery.ready){
            console.log(`It took ${RoundCounter} Attemp/s to load AutoComplete`)
            LoadQuestions()
			return
        }
    }catch(err){
        RoundCounter ++
        setTimeout(CheckPageLoad, 100)
    }
}

CheckPageLoad()


