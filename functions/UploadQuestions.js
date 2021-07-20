const faunadb = require('faunadb'),
q = faunadb.query;
const Client = new faunadb.Client({ secret: 'fnAEN56_MwACQKzzE9wDEAAY4w5EUN7nNnstIyAN' })
var Output = "JSON Did not Attach"

exports.handler = (event, context, callback) => {
	var RecievedData = []
	console.log(event)
	console.log(event.body)
	RecievedData = JSON.parse(event.body)

	if( RecievedData.UserID == undefined || RecievedData.UserID == ""){
		RecievedData.UserID = "No UserID Provided"
	}
	if( RecievedData.UserEmail == undefined || RecievedData.UserEmail == ""){
		RecievedData.UserEmail = "No UserEmail Provided"
	}
	Client.query(
		q.Paginate(
			q.Match(
				q.Index("FindQuestion"), `${RecievedData.Question}`)
		)
	)
	.then(function(result){
		if (result.data[i] == "" | undefined){
			Client.query(
				q.Create(
					q.Collection("QuestionAnswerCollection"),
					{ data: {
						Question: `${RecievedData.Question}`,
						Answer: `${RecievedData.Answer}`,
						Color: `${RecievedData.Color}`,
						Category: `${RecievedData.Category}`,
						UserID: `${RecievedData.UserID}`,
						UserEmail: `${RecievedData.UserEmail}`
					}}
				)
			)
			.then(function(result){
				if(result == "" | undefined){
					console.log("No Result")
					return callback(null,{
						statusCode: 500,
						body: "Could Not Post Question"
					})
				}
				return callback(null, {
					statusCode: 200,
					body: `Successfully Posted Quesiton`
				  })
			})


			return callback(null, {
				body: "Success"
			})
		}else{
			return callback(null, {
				body: "Failed. Already in Database"
			})
		}
	})
  }