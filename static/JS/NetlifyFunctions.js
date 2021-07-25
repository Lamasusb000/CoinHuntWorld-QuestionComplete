$(".NetlifyOpen").off("click", NetlifyOpen)
$(".NetlifyOpen").on("click", NetlifyOpen)

function NetlifyOpen(){
    netlifyIdentity.open()
}