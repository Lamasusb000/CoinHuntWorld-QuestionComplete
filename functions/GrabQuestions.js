const faunadb = require('faunadb'),
q = faunadb.query;
const Client = new faunadb.Client({ secret: 'fnAEN56_MwACQKzzE9wDEAAY4w5EUN7nNnstIyAN' })
Output = "JSON Did not Attach"

exports.handler = (callback) => {
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
        console.log(result.data)
		Output = result.data
		return callback(null, {
			statusCode: 200,
			body: JSON.stringify(result.data)
		  })
	})
  }