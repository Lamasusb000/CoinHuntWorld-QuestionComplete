const faunadb = require('faunadb'),
q = faunadb.query;
const Client = new faunadb.Client({ secret: 'fnAEN56_MwACQKzzE9wDEAAY4w5EUN7nNnstIyAN' })
var Output = "JSON Did not Attach"

exports.handler = (event, context, callback) => {
	var Password = "07092021"
	Password = Password.toString()
	console.log(event.headers.body)
	console.log(Password)
	console.log(event.headers.body == Password )
	
	
	if (event.headers.body != Password){
		return callback(null, {
			statusCode: 403,
			body: "This API is For https://coinhuntworldwiki.com/"
		})
	}
	Client.query(
		q.Paginate(
			q.Union(
		  		q.Match(q.Index('VaultColorSelection'), 'Purple'),
		  		q.Match(q.Index('VaultColorSelection'), 'Red'),
		  		q.Match(q.Index('VaultColorSelection'), 'Yellow'),
		  		q.Match(q.Index('VaultColorSelection'), 'Green'),
			), {size: 10000}
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