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
window.Stopper = false
function LoadBetaSoftware(){
    if(window.Stopper == false){
        try{
            if (jQuery.ready){
                window.Stopper = true
                console.log(`It took ${RoundCounter} Attemp/s to load BetaTesting`)
                BetaV2()
                return
            }
        }catch(err){
            RoundCounter ++
            if (window.Stopper == false){
                setTimeout(LoadBetaSoftware, 100)
            }
        }
    }

}

$(window).off("load", LoadBetaSoftware)
$(window).on("load", LoadBetaSoftware)