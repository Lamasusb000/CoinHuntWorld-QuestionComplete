const faunadb = require('faunadb'),
q = faunadb.query;
const Client = new faunadb.Client({ secret: 'fnAEN56_MwACQKzzE9wDEAAY4w5EUN7nNnstIyAN' })
var Output = "JSON Did not Attach"

exports.handler = (event, context, callback) => {
    if(event.headers.origin != "https://coinhuntworldtrivia.com"){
		return callback(null, {
			statusCode: 403,
			body: "Sorry But This API is For CoinHuntWorldTrivia.com. Please Reach To Arrange Access"
		})
	}
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
		console.log(result.data)
		console.log(JSON.stringify(result.data))
		console.log(JSON.parse(JSON.stringify(result.data)))
		for (let i = 0; i < result.data.length; i++) {
			console.log(result.data[i])
			Client.query(
				q.Update(
					q.Ref(q.Collection("QuestionAnswerCollection"), `${result.data[i][3]["@ref"].id}`),
					{
					  data: {
						DupeCheck: `${result.data[i][0].replace(/[^A-Za-z]/g, '').toLowerCase()}`
					  }
					}
				  )
			)
			.then(function (result){
				if(result == "" | undefined){
					console.log("Failed Modification")
				}else{
					console.log("Successfull Modification")
				}
			})
			
		}



		return callback(null, {
			statusCode: 200,
			body: `Function Finished`
		  })
	})
  }
