const faunadb = require("faunadb"),
    q = faunadb.query
var API_Key = process.env.FaunaDB
const Client = new faunadb.Client({ secret: API_Key })

exports.handler = (event, callback) => {
    if (event.headers.origin != "https://coinhuntworldtrivia.com") {
        return callback(null, {
            statusCode: 403,
            body:
                "Sorry But This API is For CoinHuntWorldTrivia.com. Please Reach To Arrange Access",
        })
    }
    Client.query(
        q.Create(q.Collection("ReportedQuestions"), {
            data: {
                ReferenceID: event.body,
            },
        })
    ).then(function (result) {
        if ((result == "") | undefined) {
            console.log("No Result")
        }
        return callback(null, {
            statusCode: 200,
            body: `${JSON.stringify(result.data)}`,
        })
    })
}
