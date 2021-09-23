const faunadb = require("faunadb"),
    q = faunadb.query
const Client = new faunadb.Client({
    secret: "fnAEN56_MwACQKzzE9wDEAAY4w5EUN7nNnstIyAN",
})

exports.handler = (event, callback) => {
    var FormatedQuesitons = JSON.parse(event.body)

    console.log(FormatedQuesitons)
    for (let i = 0; i < FormatedQuesitons.length; i++) {
        FormatedQuesitons[i].ApprovalStatus = await QueryDatabase(FormatedQuesitons[i].Question)        
    }
    return callback(null, {
        statusCode: 200,
        body: JSON.stringify(FormatedQuesitons),
    })
}

async function QueryDatabase(Question) {
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
                resolve(false)
            }
        })
    })
}
