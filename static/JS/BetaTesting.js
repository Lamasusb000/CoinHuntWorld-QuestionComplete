function BetaV2(){
    try{
        if (netlifyIdentity.currentUser()){
            if (netlifyIdentity.currentUser().app_metadata.roles.includes("Beta")){
                localStorage.setItem("Beta", true)
                console.log("Approved Tester")
            }else{
                console.log("Not an Approved Tester")
                window.location.href = "/"
            }
        }else{
            if (localStorage.getItem("Beta") == true){
                console.log("Approved Tester")
            }else{
                console.log("Not an Approved Tester")
                window.location.href = "/"
            }
        }
    }catch(err){
        setTimeout(BetaV2, 100)
    }
}

BetaV2()