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
    var InputData = JSON.parse(event.body)
	Client.query(
		q.Paginate(
			q.Match(
				q.Index('LeaderboardLookup')),
				{size: 5000}
		)
	)
	.then(function(result){
		if(result == "" | undefined){
			console.log("No Result")
		}
        for (let i = 0; i < result.data.length; i++) {
            console.log(result.data[i][0])
            if(InputData.UserID == result.data[i][0]){
                var TempObj = JSON.stringify(result.data[i][2])
                TempObj = JSON.parse(TempObj)
            }
        }

        if(TempObj == undefined){
            Client.query(
                q.Create(
                    q.Collection("LeaderboardNames"),
                    {
                        data: {
                            UserID: InputData.UserID,
                            Name: InputData.Name
                        }
                    }
                )
            )
        }


        RefID = TempObj["@ref"].id
        Client.query(
            q.Update(
                q.Ref(q.Collection("LeaderboardNames"), `${TempObj["@ref"].id}`),
                {
                  data: {
                    Name: `${InputData.Name}`
                  }
                }
              )
        )



		return callback(null, {
			statusCode: 200,
			body: `Leaderboards Successfully Updated`
		  })
	})
  }
