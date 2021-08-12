const faunadb = require("faunadb"),
    q = faunadb.query
const Client = new faunadb.Client({
    secret: "fnAEN56_MwACQKzzE9wDEAAY4w5EUN7nNnstIyAN",
})
var Output = "JSON Did not Attach"
var RecievedData = []

exports.handler = (event, context, callback) => {
    if (event.headers.origin != "https://coinhuntworldtrivia.com") {
        return callback(null, {
            statusCode: 403,
            body:
                "Sorry But This API is For CoinHuntWorldTrivia.com. Please Reach To Arrange Access",
        })
    }
    RecievedData = JSON.parse(event.body)

    if (RecievedData.UserID == undefined || RecievedData.UserID == "") {
        RecievedData.UserID = "No UserID Provided"
    }
    if (RecievedData.UserEmail == undefined || RecievedData.UserEmail == "") {
        RecievedData.UserEmail = "No UserEmail Provided"
    }
    Client.query(
        q.Paginate(
            q.Match(
                q.Index("FindQuestion"),
                //prettier-ignore
                `${RecievedData.Question.replace(/[^A-Za-z]/g,"").toLowerCase()}`
            )
        )
    ).then(function (result) {
        var AnswerString = result.data[0]
        if (AnswerString == undefined) {
            Client.query(
                q.Create(
                    q.Collection("QuestionAnswerCollection"),
                    // prettier-ignore
                    { data: {
						Question: `${RecievedData.Question.replace(/[^A-Za-z0-9" "]/g, "")}`,
						Answer: `${RecievedData.Answer.replace(/[^A-Za-z0-9" "]/g, "")}`,
						Color: `${RecievedData.Color.replace(/[^A-Za-z0-9" "]/g, "")}`,
						Category: `${RecievedData.Category.replace(/[^A-Za-z0-9" "]/g, "")}`,
						UserID: `${RecievedData.UserID}`,
						ContributorID: `${JSON.stringify(RecievedData.UserID)}`,
						ContributorEmail: `${JSON.stringify(RecievedData.UserEmail)}`,
						UserEmail: `${RecievedData.UserEmail}`,
						DupeCheck: `${RecievedData.Question.replace(/[^A-Za-z]/g, '').toLowerCase()}`,
                        AnswerArray: `${JSON.stringify(new Array(RecievedData.Answer.replace(/[^A-Za-z0-9" "]/g, "")))}`
					}}
                )
            ).then(function (result) {
                if ((result == "") | undefined) {
                    console.log("No Result")
                    return callback(null, {
                        statusCode: 500,
                        body: "Could Not Post Question",
                    })
                }
                return callback(null, {
                    statusCode: 200,
                    body: `Successfully Posted Quesiton`,
                })
            })

            return callback(null, {
                body: "Success",
            })
        } else {
            //prettier-ignore
            var AnswerArray = JSON.parse(result.data[0].AnswerArray).replace(/[^A-Za-z0-9" ""//?"]/g, "")
            //prettier-ignore
            if (AnswerArray.includes(RecievedData.Answer.replace(/[^A-Za-z0-9" ""//?"]/g, ""))) {
                return callback(null, {
                    body: "Failed. Already in Database",
                })
            } else {

            }
        }
    })
}
