import React from "react"

const Modal = ({ children, Title, ID, SubmitLang, CloseLang, Buttons }) => {
    return (
        <div
            className="modal fade"
            id={ID}
            tabIndex="-1"
            role="dialog"
            aria-hidden="true"
        >
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLongTitle">
                            {Title}
                        </h5>
                        <button
                            type="button"
                            className="close"
                            data-dismiss="modal"
                            aria-label="Close"
                        >
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">{children}</div>
                    {CheckForButtons(Buttons, CloseLang, SubmitLang)}
                </div>
            </div>
        </div>
    )
}
Modal.defaultProps = {
    Title: "Set a Title",
    ID: "Set a ID",
    SubmitLang: "Submit",
    CloseLang: "Close",
    Buttons: true,
    children:
        "Pass the following Props. {Title, ID, SubmitLang, CloseLang} and Place child Elements inside",
}

export default Modal

function CheckForButtons(Buttons, CloseLang, SubmitLang) {
    if (Buttons) {
        return (
            <div className="modal-footer">
                <button
                    type="button"
                    className="btn btn-secondary"
                    data-dismiss="modal"
                >
                    {CloseLang}
                </button>
                <button type="button" className="btn btn-primary">
                    {SubmitLang}
                </button>
            </div>
        )
    }
}
