const faunadb = require('faunadb'),
q = faunadb.query;
const Client = new faunadb.Client({ secret: 'fnAEN56_MwACQKzzE9wDEAAY4w5EUN7nNnstIyAN' })
var Output = "JSON Did not Attach"

exports.handler = (event, context, callback) => {
    console.log(event.headers.origin)
	Client.query(
		q.Paginate(
			q.Match(
				q.Index('GrabAllQuestionsV3')),
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
