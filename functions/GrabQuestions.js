const faunadb = require('faunadb'),
q = faunadb.query;
const Client = new faunadb.Client({ secret: 'fnAEN56_MwACQKzzE9wDEAAY4w5EUN7nNnstIyAN' })
var Output = "JSON Did not Attach"

exports.handler = () => {
	Client.query(
        q.Map(
            q.Paginate(q.Match(q.Index("QuestionAndAnswer"))),
            q.Lambda("X", q.Get(q.Var("X")))
          )
	)
	.then(function(result){
		if(result == "" | undefined){
			console.log("No Result")
		}
		Output = result.data
		var Questions = []
		for (let i = 0; i < Output.length; i++) {
			Questions[i].Question = Output.data[0].Question
			Questions[i].Answer = Output.data[0].Answer
		}


        console.log(Questions)
		console.log(JSON.stringify(Questions))
		return {
			statusCode: 200,
			body: `Hello!`
		  }
	})
  }