const faunadb = require("faunadb"),
    q = faunadb.query
var API_Key = process.env.FaunaDB
const Client = new faunadb.Client({ secret: API_Key })

exports.handler = async (event, context, callback) => {
    if (event.httpMethod == "OPTIONS") {
        return callback(null, {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "Authorization",
                "Access-Control-Request-Headers": "Authorization",
                "Access-Control-Allow-Credentials": true,
            },
        })
    }
    if (event.httpMethod == "POST") {
        var FormatedQuesitons = JSON.parse(event.body)
        for (let i = 0; i < FormatedQuesitons.length; i++) {
            FormatedQuesitons[i].ApprovalStatus = await QueryDatabase(
                FormatedQuesitons[i].Question,
                FormatedQuesitons[i].Answer
            )
        }
        return callback(null, {
            statusCode: 200,
            body: JSON.stringify(FormatedQuesitons),
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "Authorization",
                "Access-Control-Request-Headers": "Authorization",
                "Access-Control-Allow-Credentials": true,
            },
        })
    }
}

async function QueryDatabase(Question, Answer) {
    return new Promise(resolve => {
        Client.query(
            q.Paginate(
                q.Match(
                    q.Index("FindQuestion"),
                    //prettier-ignore
                    `${Question.replace(/[^A-Za-z]/g,"").toLowerCase()}`
                )
            )
        ).then(function (result) {
            //Positive Result returns False for Approval
            //Negative Result returns True for Approval
            if (!result.data[0]) {
                //No Result Returns True
                resolve(true)
            } else {
                //Positive Result Returns False
                var AnswerArray = JSON.parse(result.data[0][1])
                var AnswerDupeCheck = []
                for (let i = 0; i < AnswerArray.length; i++) {
                    AnswerDupeCheck.push(
                        AnswerArray[i].replace(/[^A-Za-z0-9" ""//?"]/g, "")
                    )
                }
                if (
                    AnswerDupeCheck.includes(
                        Answer.replace(/[^A-Za-z0-9" ""//?"]/g, "")
                    )
                ) {
                    // Previous Answer Contains new Answer
                    resolve(false)
                } else {
                    // New Answer is Unique
                    resolve(true)
                }
            }
        })
    })
}
