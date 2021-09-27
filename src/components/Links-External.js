import React from "react"
import Extlink from "../../site/settings/HeaderLinks.json"
import "../components/CSS/bootstrap.min.css"

function ExternalLinks() {
    return (
        <ul className="navbar-nav mr-auto">
            {Extlink.LinkSet.map((Link, index) => (
                <li className="nav-item">
                    <a href={Link.LinkURL} className="nav-link">
                        {Link.LinkName}
                    </a>
                </li>
            ))}
        </ul>
    )
}

export default ExternalLinks
