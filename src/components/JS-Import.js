import React from "react"
import { Helmet } from "react-helmet"
import { withPrefix} from "gatsby-link"
import PropTypes from "prop-types"

class JSimport extends React.Component {
    render() {
        return (
            <Helmet>
                <script id={GetScriptID(this.props.File)}  defer={this.props.Defer} src={withPrefix(`JS/${this.props.File}`)}/>
            </Helmet>
        )
    }
}
export default JSimport

function GetScriptID(FileName){
    FileName = `${FileName.slice(0, -3)}-Import`
    return FileName
}

JSimport.defaultProps = {
    Defer: true
  }
  
  JSimport.propTypes = {
    Defer: PropTypes.string
  }