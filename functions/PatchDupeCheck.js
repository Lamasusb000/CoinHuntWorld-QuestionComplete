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
		var DatabaseLength = result.data.length
		var Success = 0
		var Failure = 0
		for (let i = 0; i < result.data.length; i++) {
			var TempObj = JSON.stringify(result.data[i][3])
			TempObj = JSON.parse(TempObj)
			console.log(TempObj)
			Client.query(
				q.Update(
					q.Ref(q.Collection("QuestionAnswerCollection"), `${TempObj["@ref"].id}`),
					{
					  data: {
						DupeCheck: `${result.data[i][0].replace(/[^A-Za-z]/g, '').toLowerCase()}`
					  }
					}
				  )
			)
			.then(function (result){
				if(result == "" | undefined){
					Failure++
					console.log(`${i} / ${DatabaseLength} Completed With ${Success} Successful and ${Failure} Failures`)
				}else{
					Success++
					console.log(`${i} / ${DatabaseLength} Completed With ${Success} Successful and ${Failure} Failures`)
				}
			})
			
		}



		return callback(null, {
			statusCode: 200,
			body: `Function Finished`
		  })
	})
  }
