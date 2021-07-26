function BetaV2(){
    try{
        console.log(netlifyIdentity.currentUser())
        if (netlifyIdentity.currentUser()){
            if (netlifyIdentity.currentUser().app_metadata.roles.includes("Beta")){
                localStorage.setItem("Beta", true)
                console.log("Approved Tester")
            }else{
                console.log("Not an Approved Tester")
                window.location.href = "/"
            }
        }else{
            if (localStorage.getItem("Beta") == "true"){
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

var RoundCounter = 1
function CheckLoad(){
    if (netlifyloader){
        console.log(`It took ${RoundCounter} Attemp/s to load Netlify Identity`)
        BetaV2()
    }else{
        RoundCounter ++
        setTimeout(CheckLoad, 100)

    }
}

CheckLoad()