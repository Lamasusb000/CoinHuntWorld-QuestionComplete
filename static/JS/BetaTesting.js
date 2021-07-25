function BetaV2(){
    try{
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
    }catch(err){
        setTimeout(BetaV2, 100)
    }
}

BetaV2