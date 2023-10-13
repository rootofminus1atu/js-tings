// JavaScript Document
"use strict";

//Set up our event listeners
(function(){
	//Add an event listener to the 'logo' div so that when the mouseout event is generated on the logo, call the function changeLogo
	document.getElementById('logo').addEventListener("mouseout", changeLogo, false);

	const ps = document.getElementsByTagName("p")
	Array.from(ps).map(p => p.addEventListener("mouseover", pEnter, false))
	Array.from(ps).map(p => p.addEventListener("mouseout", pExit, false))

	const divs = document.getElementsByTagName("div")
	Array.from(divs).map(div => {
		div.addEventListener("click", spin, false)
	})

	document.getElementById("backtotop").addEventListener("click", funThing, false)
}());

function changeLogo()
{
	//Get the logo and place in variable x
	var x = document.getElementById('logo');
	//Reduce the opacity to 20%
	x.style.opacity="0.2";
}


// my event listeners
function pEnter(e) {
	const targetP = e.currentTarget

	targetP.classList.add("p-over")
	// the 3 styles are added through the class, check `my-custom.css`
}

function pExit(e) {
	const targetP = e.currentTarget

	targetP.classList.remove("p-over")
	// the 3 styles are removed through the class, check `my-custom.css`
}

function spin(e) {
	const targetDiv = e.currentTarget

	targetDiv.classList.toggle("up-down")
}

function funThing() {
	const div = document.createElement("div")
	div.classList.add("blackout")
	div.style.transition = "all 1s ease-in"

	const p = document.createElement("p")
	p.innerText = "go outside"

	div.append(p)

	// appending our <div> with a <p> to the html
	document.body.append(div)

	
	// waiting for a short while, so that the styles below get applied gradually
	// otherwise the `transition` property in the css wouldn't be registered in time
	// and the styles would be applied in an instant
	setTimeout(() => {
		div.style.fontSize = "10rem"
		div.style.backgroundColor = "rgba(0, 0, 0, 0.9)";
	}, 10);
}