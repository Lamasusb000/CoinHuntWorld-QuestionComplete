$("#NetlifyIdentity").off("load", Beta)
$("#NetlifyIdentity").on("load", Beta)

function Beta(){
    if (netlifyIdentity.currentUser()){
        console.log("Approved Tester")
    }else{
        console.log("Not An Approved Tester")
        window.location.href = "/"
    }
}