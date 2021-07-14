import React from "react"
import { Helmet } from "react-helmet"

class JSimport extends React.Component {
    render() {
        return (
            <Helmet>
                <script defer src={`${this.props.URL}`}/>
            </Helmet>
        )
    }
}
export default JSimport