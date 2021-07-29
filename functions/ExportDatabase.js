const faunadb = require('faunadb'),
q = faunadb.query;
const Client = new faunadb.Client({ secret: 'fnAEN56_MwACQKzzE9wDEAAY4w5EUN7nNnstIyAN' })
var Output = "JSON Did not Attach"

exports.handler = (event, context, callback) => {
    if(event.headers.origin != "https://coinhuntworldtrivia.com" && event.body.Role == "Admin" && event.body.Password == "07092021"){
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
	let response = await fetch("https://coinhuntworldtrivia.com/.netlify/functions/GrabQuestionsV2", {
		body: JSON.stringify({
            Role: `${netlifyIdentity.currentUser().app_metadata.roles[0]}`,
			Password: ""
        }),
        method: "POST"
	});
	if (response.status === 200){
		let data = await response.json()
        window.RequestedData = data
        return
	}
}