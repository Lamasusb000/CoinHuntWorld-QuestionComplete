const faunadb = require("faunadb"),
    q = faunadb.query
const Client = new faunadb.Client({
    secret: "fnAEN56_MwACQKzzE9wDEAAY4w5EUN7nNnstIyAN",
})

exports.handler = (event, context, callback) => {
    console.log(event.headers)
    console.log(event.headers.authorization)
    Client.query(
        q.Paginate(q.Match(q.Index("ExportJSON")), { size: 10000 })
    ).then(function (result) {
        if ((result == "") | undefined) {
            console.log("No Result")
        }
        return callback(null, {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "Authorization",
                "Access-Control-Request-Headers": "Authorization",
                "Access-Control-Allow-Credentials": true,
            },
            body: `${JSON.stringify(result.data)}`,
        })
    })
}
