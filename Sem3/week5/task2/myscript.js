// JavaScript Document
"use strict";

//Immediately Invoked Function Expression to set up event listeners
(function(){
	document.getElementById('hgroup').addEventListener("click", changeLinks, false);
	document.getElementById('img1').addEventListener("mouseover", reduceImage, false);
	document.getElementById('img2').addEventListener("click", flipImage, false);
	
	document.getElementById('img3').addEventListener("click", task1, false)
	// todo 2.
	document.querySelector('input[type="text"][value="Search Our Website…"]').addEventListener("click", task2, false)

	const textLinks = Array.from(document.getElementsByTagName('a')).filter(a => a.innerText.toUpperCase() == "TEXT LINK")
	textLinks[0].addEventListener("click", task3, false)
	textLinks[1].addEventListener("click", task4, false)

	const titles = Array.from(document.getElementsByClassName("title"))
	titles[titles.length - 1].addEventListener("click", task5, false)
	
	document.getElementById("footer").addEventListener("dblclick", task6, false)
	document.querySelector('input[type="submit"]').addEventListener("click", task7, false)

	const h2s = Array.from(document.getElementsByTagName('h2')).filter(h2 => h2.innerText.toUpperCase() == "LORUM IPSUM DOLOR")
	h2s[0].addEventListener("click", task8, false)
}());


function changeLinks()
{
	//When the logo is clicked, change the link colour and background colour of every link
	let x = document.getElementsByTagName('a');
	for (let i=0; i < x.length; i++)
	{
        x[i].style.backgroundColor="cyan";
        x[i].style.color="red";
        //Alternative approach below.
		//x[i].setAttribute("style", "background-color: cyan; color: red");
	}
}

function reduceImage()
{
	//When the first image is mouseover, add a border and reduce the opacity
	let x = document.getElementById('img1');
	x.style.opacity="0.25";
	x.style.border="5px dashed";
}

function flipImage()
{
	//When the second image is clicked, rotate it 180 degrees
	let x = document.getElementById('img2');
	x.style.transform="rotate(180deg)";
}

function task1(e) {
	const img = e.currentTarget

	img.src = 'https://lh5.googleusercontent.com/proxy/a3w14vcWuHDoYaecTcPaOZKw6pgU00aFqVg8Xc4rKcXNf0Zvy_4Nvt6qOz2NQq6MAWjQKNFAwkw1C_1AZZy1W2lZIF4PsOs79n4=s0-d'
	img.style.width = "200px"
}

function task2(e) {
	const input = e.currentTarget
	console.log(input)
}

function task3(e) {
	e.preventDefault()
	window.location.replace("https://www.itsligo.ie/");
}

function task4(e) {
	e.preventDefault()

	const footer = document.getElementById('footer')
	footer.style.backgroundColor = "green"
	footer.style.height = "200px"
}

function task5(e) {
	const title = e.currentTarget

	title.innerText = "Not about us"
	title.style.fontSize = "200%"
	title.style.transform = "rotate(5deg)"
}

function task6(e) {
	console.log("hi")

	const as = Array.from(document.getElementsByTagName('a'))
	as.forEach(a => a.href = "https://www.facebook.com/")
}

function task7(e) {
	e.preventDefault()

	const submit = e.currentTarget
	submit.style.backgroundColor = "green"
}

function task8(e) {
	const par = e.currentTarget.nextElementSibling

	par.style.color = "blue"
	par.style.transform = "skew(-5deg, -5deg)"
	par.style.margin = "2rem 0"
	par.style.transition = "all 0.2s ease-out"

	const header = document.getElementById("header")
	const newPar = document.createElement("p")
	newPar.innerText = "new paragraph"
	header.appendChild(newPar)
}

//1. When the third image is clicked, set any two other styles OR change any 2 other attributes pertaining to the image

//2. When text is entered into the textbox, make its colour red and make the text uppercase on the mouseout.

//3. When the first "TEXT LINK" is clicked, bring the user to itsligo.ie

//4. When the second "TEXT LINK" is clicked, make 2 changes to the footer

//5. When the "About Us" text is clicked, change the text to something else, and apply 2 styles. Use getElementsByClassName

//6. When the footer is double clicked, make sure all href attributes for <a> elements point to facebook.com

//7. When the 'Submit' button is clicked, change its background colour
//(NOTE: DEPENDING ON HOW YOU APPROACH THIS, YOU MAY ONLY BE ABLE TO VERIFY IT WORKS BY USING F11 IN CHROME DEV TOOLS)

//8. When the 'Lorum ipsum dolor' header is clicked, make 3 style changes to the paragraph just below it. Also append a new paragraph to the header (with text 'New Paragraph', font size 72).

