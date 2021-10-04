exports.onCreateWebpackConfig = ({
	stage,
	loaders,
	actions
 }) => {
	if (stage === "build-html") {
	   actions.setWebpackConfig({
		  module: {
			 rules: [{
				test: /react-particle-animation/,
				use: loaders.null(),
			 }, ],
		  },
	   })
	}
 }