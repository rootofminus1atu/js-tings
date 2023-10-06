
let isDivStyle1 = true;

function divStyleChange() {
    const divStyle = document.getElementById("the-div").style
    
    if (isDivStyle1) {
        divStyle.animation = "glow-animation 1s linear infinite"
        divStyle.backgroundImage = 'url("images/crab-rave.gif")'
        divStyle.fontSize = "4rem"
        divStyle.display = "flex"
    } else {
        divStyle.animation = "none"
        divStyle.backgroundImage = 'url("images/crab-calm.webp")'
        divStyle.fontSize = "1rem"
        divStyle.display = "block"
    }

    isDivStyle1 = !isDivStyle1
}

let h1IsStyle1 = true;

function h1StyleChange() {
    const h1Style = document.getElementById("the-h1").style

    if (h1IsStyle1) {
        h1Style.transform = "rotate(180deg)"
        h1Style.letterSpacing = "1rem"
        h1Style.fontFamily = "'Comic Sans MS', cursive"
    } else {
        h1Style.transform = "none"
        h1Style.letterSpacing = ""
        h1Style.fontFamily = ""
    }

    h1IsStyle1 = !h1IsStyle1
}
