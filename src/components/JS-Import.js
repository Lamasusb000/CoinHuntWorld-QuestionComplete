import React from "react"
import { Helmet } from "react-helmet"
import { withPrefix} from "gatsby-link"

class JSimport extends React.Component {
    render() {
        return (
            <Helmet>
                <script async="async" id={GetScriptID(this.props.File)}  defer src={withPrefix(`JS/${this.props.File}`)}/>
            </Helmet>
        )
    }
}
export default JSimport

function GetScriptID(FileName){
    FileName = `${FileName.slice(0, -3)}-Import`
    return FileName
}