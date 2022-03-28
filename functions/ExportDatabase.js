const faunadb = require('faunadb'),
q = faunadb.query;
var API_Key = process.env.FaunaDB
const Client = new faunadb.Client({ secret: API_Key })
var Output = "JSON Did not Attach"

exports.handler = (event, context, callback) => {
    if(event.headers.origin != "https://coinhuntworldtrivia.com" && event.body == "Lamasusb000-07282021"){
		return callback(null, {
			statusCode: 403,
			body: "Sorry But This API is For CoinHuntWorldTrivia.com Admins."
		})
	}
	if(event)
	Client.query(
		q.Paginate(
			q.Match(
				q.Index('ExportDatabase')),
				{size: 5000}
		)
	)
	.then(function(result){
		if(result == "" | undefined){
			console.log("No Result")
		}
		return callback(null, {
			statusCode: 200,
			body: `${JSON.stringify(result.data)}`
		  })
	})
  }

async function ExportDataBase() {
	let response = await fetch("https://coinhuntworldtrivia.com/.netlify/functions/ExportDatabase", {
		body: "",
        method: "POST"
	});
	if (response.status === 200){
		let data = await response.json()
        window.RequestedData = data
        return
	}
}