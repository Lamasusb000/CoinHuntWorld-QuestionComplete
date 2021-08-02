var TempDate = new Date()
var ExpirationDate = new Date()
var HourInUTC = TempDate.getUTCHours()
var DayInUTC = TempDate.toGMTString()

/*Testing Code*/

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
        await ContactAPIForCookie()
        createCookie("Cache", JSON.stringify(RequestedData), ExpirationDate.toGMTString())
        console.log("Created a Cookie")
    }else{
        console.log("Cookie Already Exists")
    }
}


async function ContactAPIForCookie() {
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
