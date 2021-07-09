import React from "react"

import ContactInfoJSON from "../../site/settings/SiteContactInfo.json"

class ContactInfo extends React.Component{
    render(){
        return (
            <div className="Left-Column">
                <h2>Contact Information</h2>
                <div>
                    {CheckPhone()}
                    {CheckEmail()}
                    <address>
                        <p>
                            Address:
                        </p>
                        <p>
                            <a
                            href={CreateMapsLink()}
                            style={{
                                color: "inherit",
                                fontFamily: "inherit"
                            }}>
                                {CheckAddressLine1()}
                                {CheckAddressLine2()}
                                {ContactInfoJSON.Address[0].City}, {ContactInfoJSON.Address[0].State} {ContactInfoJSON.Address[0].Zipcode}
                                <br/>
                                {ContactInfoJSON.Address[0].Country}
                            </a>
                        </p>
                    </address>
                </div>
            </div>
        )
    }
}

function CheckPhone(){
    if (ContactInfoJSON.Phone !== ""){
        return(
            <p>
            Contact Number: &nbsp;
            <a 
            href={GetTellLink(ContactInfoJSON.Phone)}
            style={{
                color: "inherit",
                fontFamily: "inherit"
            }}>
                {FormatTellLink(ContactInfoJSON.Phone)}
            </a>
        </p>
        )
    }
}

function CheckEmail(){
    if (ContactInfoJSON.Email !== ""){
        return(
            <p>
            Contact Email: &nbsp;
            <a
            href={GetEmailLink(ContactInfoJSON.Email)}
            style={{
                color: "inherit",
                fontFamily: "inherit"
            }}>
                {ContactInfoJSON.Email}
            </a>
        </p>
        )
    }
}

function GetTellLink(PhoneNumber){
    return `tel:${PhoneNumber}`
}
function GetEmailLink(Email){
    return `mailto:${Email}`
}
function CreateMapsLink(){
    return `https://www.google.com/maps/place/${RemoveSpaces(ContactInfoJSON.Address[0].AddressLine1)}+${RemoveSpaces(ContactInfoJSON.Address[0].AddressLine2)}+${RemoveSpaces(ContactInfoJSON.Address[0].City)},+${RemoveSpaces(ContactInfoJSON.Address[0].State)}+${RemoveSpaces(ContactInfoJSON.Address[0].Zipcode)}`
}
function RemoveSpaces(Text){
    if (Text !== ""){
        var ReturnText = Text.replace(/ /g, "+")
        return ReturnText
    }
    return ""
}

function FormatTellLink(phone) {
    phone = phone.replace(/[^\d]/g, "");

    if (phone.length === 10) {
        return phone.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");
    }

    return null;
}

function CheckAddressLine1(){
    if (ContactInfoJSON.Address[0].AddressLine1 === "" | ContactInfoJSON){
        return
    }
    if (ContactInfoJSON.Address[0].AddressLine1 !== ""){
        return(
            <span>
                {ContactInfoJSON.Address[0].AddressLine1}
                <br/>
            </span>
        )
    }
}

function CheckAddressLine2(){
    if (ContactInfoJSON.Address[0].AddressLine2 === "" | ContactInfoJSON){
        return
    }
    if (ContactInfoJSON.Address[0].AddressLine2 !== ""){
        return(
            <span>
                {ContactInfoJSON.Address[0].AddressLine2}
                <br/>
            </span>
        )
    }
}

export default ContactInfo