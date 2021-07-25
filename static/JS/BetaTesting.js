if (netlifyIdentity.currentUser()){
    console.log("Approved Tester")
}else{
    console.log("Not An Approved Tester")
    window.location.href = "/"
}