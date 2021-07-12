import React from "react"
import { Helmet } from "react-helmet"
import { withPrefix} from "gatsby-link"

class JSimport extends React.Component {
    render() {
        return (
            <Helmet>
                <script defer src={withPrefix(`JS/${this.props.File}`)}/>
            </Helmet>
        )
    }
}
export default JSimport