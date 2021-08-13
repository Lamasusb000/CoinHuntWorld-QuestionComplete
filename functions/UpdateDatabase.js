const faunadb = require("faunadb"),
    q = faunadb.query
const Client = new faunadb.Client({
    secret: "fnAEN56_MwACQKzzE9wDEAAY4w5EUN7nNnstIyAN",
})
var Output = "JSON Did not Attach"

exports.handler = (event, context, callback) => {
    if (event.headers.origin != "https://coinhuntworldtrivia.com") {
        return callback(null, {
            statusCode: 403,
            body:
                "Sorry But This API is For CoinHuntWorldTrivia.com. Please Reach Out To Arrange Access",
        })
    }
    Client.query(
        q.Paginate(q.Match(q.Index("UpdateData")), { size: 5000 })
    ).then(function (result) {
        if ((result == "") | undefined) {
            console.log("No Result")
        }
        var DatabaseLength = result.data.length
        var Success = 0
        var Failure = 0
        var Completed = 0
        var Length = result.data.length
        //prettier-ignore
        for (let i = 0; i < result.data.length; i++) {
            var TempObj = JSON.stringify(result.data[i][3])
            TempObj = JSON.parse(TempObj)

            //#region Usable Variables
            var Question = result.data[i][0]
            var Answer = result.data[i][1]
            var AnswerArray = new Array(result.data[i][1].replace(/[^A-Za-z0-9" "]/g, ""))
            var ContributorID = result.data[i][2]
            var ReferenceID = TempObj
            var Color = result.data[i][4]
            var Category = result.data[i][5]
            var ContributorEmail =
                result.data[i][6] != null
                    ? [result.data[i][6]]
                    : "FileUploadedJSON"

            //#endregion

            Client.query(
                q.Update(
                    q.Ref(
                        q.Collection("QuestionAnswerCollection"),
                        `${TempObj["@ref"].id}`
                    ),
                    {
                        data: {
                            ContributorID: JSON.stringify(
                                new Array(ContributorID)
                            ),
                            ContributorEmail: JSON.stringify(
                                new Array(ContributorEmail)
                            ),
                        },
                    }
                )
            ).then(function (result) {
                if ((result == "") | undefined) {
                    Failure++
                    Completed++
                } else {
                    Success++
                    Completed++
                }
                if (Completed == Length) {
                    return callback(null, {
                        statusCode: 200,
                        body: `Function Finished With ${Failure} Failures and ${Success} Successful Updates`,
                    })
                }
            })
        }
    })
}

//#region Code To Run in Console
/*
async function UpdateDatabase() {
    let response = await fetch(
        "https://coinhuntworldtrivia.com/.netlify/functions/UpdateDatabase",
        {
            body: JSON.stringify({
                Text: "Dummy Text",
            }),
            method: "POST",
        }
    )
    if (response.status === 200) {
        let data = await response.text()
        console.log(data)
        return
    }
}
*/
//#endregion
