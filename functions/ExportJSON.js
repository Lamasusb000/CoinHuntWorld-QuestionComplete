const faunadb = require("faunadb"),
    q = faunadb.query
const Client = new faunadb.Client({
    secret: "fnAEN56_MwACQKzzE9wDEAAY4w5EUN7nNnstIyAN",
})

exports.handler = (event, context, callback) => {
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
        var Authorization = ""
        if (event.headers.authorization) {
            Authorization = event.headers.authorization
        } else {
            if (event.headers.origin) {
                Authorization = event.headers.origin
            } else {
                Authorization = "No Origin Or Authorization"
            }
        }
        Client.query(
            q.Paginate(q.Match(q.Index("MeteringLookup"), Authorization))
        ).then(function (result) {
            if (result) {
                RefID = JSON.stringify(result.data[0][2])
                RefID = JSON.parse(RefID)
                RefID = RefID["@ref"].id
                Count = parseInt(result.data[0][1])
                Count++
                Client.query(
                    q.Update(q.Ref(q.Collection("EmbedMetering"), `${RefID}`), {
                        data: {
                            Requests: `${Count}`,
                        },
                    })
                )
            } else {
                var CurrentDate = new Date()
                var Months = [
                    "January",
                    "February",
                    "March",
                    "April",
                    "May",
                    "June",
                    "July",
                    "August",
                    "September",
                    "October",
                    "November",
                    "December",
                ]
                CurrentMonth = CurrentMonth.getUTCMonth
                Client.query(
                    q.Create(q.Collection("EmbedMetering"), {
                        data: {
                            SiteName: event.headers.authorization,
                            Requests: 1,
                            Month: `${Months[CurrentDate.getUTCMonth()]}`,
                        },
                    })
                )
            }
        })

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
