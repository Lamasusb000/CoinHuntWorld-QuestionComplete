const faunadb = require('faunadb'),
q = faunadb.query;
const Client = new faunadb.Client({ secret: 'fnAEN56_MwACQKzzE9wDEAAY4w5EUN7nNnstIyAN' })
var Output = "JSON Did not Attach"

exports.handler = ( callback ) => {
	Client.query(
        q.Map(
            q.Paginate(q.Match(q.Index("QuestionAndAnswer"))),
            q.Lambda("X", q.Get(q.Var("X")))
          )
	)
	.then(function(result){
		if(result == "" | undefined){
			console.log("Hopefully This Says It Didnt Work")
		}
		Output = result.data
        console.log(Output)
		return {
			statusCode: 200,
			body: JSON.stringify(Output)
		}
	})
  }