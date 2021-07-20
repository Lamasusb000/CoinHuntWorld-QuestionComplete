const faunadb = require('faunadb'),
q = faunadb.query;
const Client = new faunadb.Client({ secret: '' })
var Output = "JSON Did not Attach"

exports.handler = (event, context, callback) => {
	var RecievedData = []
	RecievedData = JSON.parse(event.body)

	if( RecievedData.UserID == undefined || RecievedData.UserID == ""){
		RecievedData.UserID = "No UserID Provided"
	}
	Client.query(
        q.Create(
			q.Collection("QuestionAnswerCollection"),
			{ data: {
				Question: `${RecievedData.Question}`,
				Answer: `${RecievedData.Answer}`,
				Color: `${RecievedData.Color}`,
				Category: `${RecievedData.Category}`,
				UserID: `${RecievedData.UserID}`
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
  }