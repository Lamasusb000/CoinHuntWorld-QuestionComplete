const faunadb = require('faunadb'),
q = faunadb.query;
const Client = new faunadb.Client({ secret: 'fnAEN56_MwACQKzzE9wDEAAY4w5EUN7nNnstIyAN' })
var Output = "JSON Did not Attach"

exports.handler = (event, context, callback) => {
	Client.query(
		q.Paginate(
			q.Match(
				q.Index('VaultColorSelection'),
				 'Red'
			)
		)
	)
	.then(function(result){
		if(result == "" | undefined){
			console.log("No Result")
		}
        var Questions = []
		Output = result.data
        for (let i = 0; i < Output.length; i++) {
            Questions[i] = Output[i].data
            
        }
		return callback(null, {
			statusCode: 200,
			body: `${JSON.stringify(Questions)}`
		  })
	})
  }