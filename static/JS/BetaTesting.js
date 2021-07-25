$("#NetlifyIdentity").off("load", BetaV2)
$("#NetlifyIdentity").on("load", BetaV2)

function BetaV2(){
    if (netlifyIdentity.currentUser()){
        if (netlifyIdentity.currentUser().app_metadata.roles.includes("Beta")){
            console.log("Approved Tester")
        }else{
            console.log("Not an Approved Tester")
            window.location.href = "/"
        }
    }else{
        console.log("Not an Approved Tester")
        window.location.href = "/"
    }
}