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
        console.log("Not an Approved Tester")
        window.location.href = "/"
    }
}

var RoundCounter = 1
function CheckLoad(){
    try{
        if (netlifyloader){
            console.log(`It took ${RoundCounter} Attemp/s to load Netlify Identity`)
            BetaV2()
        }
    }catch(err){
        RoundCounter ++
        setTimeout(CheckLoad, 100)
    }
}

CheckLoad()