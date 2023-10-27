"use strict";
//In-class assessment - 20%
//Duration: 2 Hours
//Submission: Zip Everything (all files) and upload to the 'Software-Upload' link on week 6 of Moodle
//You can change (e.g. add id attributes) the HTML file if required

//IIFE function runs on page load
(function(){
    //Event listener for the title with an id of 'banner'
    //1. When the title is clicked, rotate the entire page by 
    //180 degrees. Use querySelector
    //10 Marks
	document.getElementById('myTitle').addEventListener("click", rotatePage, false);

    // 7 Marks for creating the other event listeners
    
    // task 2
    window.addEventListener("load", elementCounter, false)

    // task 3 
    document.getElementById('copyright').addEventListener('click', styleChange, false)

    // task 4
    document.getElementById('changeDiv').addEventListener('click', doTasks, false)

    // task 5
    document.getElementById('banner').addEventListener('click', modifyPsAndH2s, false)

    // task 6
    document.getElementById('banner').addEventListener('mouseout', removeButtonClasses, false)

    // task 7
    document.getElementById('myImg').addEventListener('click', mayhem, false)

    // task 8
    document.getElementById('myImg2').addEventListener('click', modifyAttrs, false)
}());

function rotatePage() {
    const doc = document.querySelector("body")
    doc.style.transform = "rotate(180deg)"
}

//2. On the page load, write out to the browser console the total
//number of elements on the page
//Also write out each element tag name (e.g.,p, div, img etc) - you can use the nodeName property
//8 Marks
function elementCounter() {
    const all = Array.from(document.getElementsByTagName('*'))
    console.log(`${all.length} elements in total`)  // how many elements
    console.log(all.map(elem => elem.nodeName))  // all elements' names
}


//3. When the footer is clicked (<div> with id of 'copyright'), make any 6 style changes to a 
//paragraph of your choice
//You are not allowed use styles used anywhere else in the JavaScript file
//12 Marks
function styleChange() {
    const ps = Array.from(document.getElementsByTagName('p'))
    const lastP = ps[ps.length - 1]
    lastP.classList.add("six-styles")
    // check custom-styles.css for the 6 styles
}


//4. For the div with an id of "changeDiv"", add an event listener such that when it's clicked, the following
//tasks are performed:
function doTasks(e) {
    const div = e.currentTarget

    const newPar = addPar(div)
    change2Styles(newPar)
    const img = addDesert(newPar)
    imgKiller(img)
}

//a. A new paragraph containing the text 'new paragraph' ic created as a child of the div
//6 Marks
function addPar(element) {
    const newPar = document.createElement('p')
    newPar.innerText = 'new paragraph'

    element.appendChild(newPar)

    return newPar
}

//b. Change any two styles of the paragraph excluding anything to with colours, fonts or borders
//6 Marks
function change2Styles(par) {
    par.classList.add("two-styles")
}

//c. When the paragraph is clicked, a new image (use Desert.jpg) is created as a child of 
//the new paragraph
//8 Marks
function addDesert(par) {
    const img = document.createElement('img')
    img.src = "Desert.jpg"
    img.alt = "a desert picture"
    img.style.width = '200px'

    par.addEventListener('click', () => {
        par.appendChild(img)
    }, false)

    return img
}


// NOTE:
// clicking the paragraph can make the website snap up (because of scrolling)
// which would activate the 'mouseover' event
// which would remove the image instantaneously
// so it might appear like no image is being created at first
// but it actually is and I hope it's clear from the code


//d. When the new image has the mouse hovered over it, it is removed from the page
//5 Marks
function imgKiller(img) {
    img.addEventListener('mouseover', () => {
        img.remove()
    }, false)
}



//5. When the 'banner' div is clicked, change all paragraph text to uppercase
//Also, put a 2 pixel red dashed border around every <h2> element
//Use querySelectorAll in both cases
//10 Marks 
function modifyPsAndH2s() {
    const ps = Array.from(document.querySelectorAll('p'))
    ps.forEach(p => p.style.textTransform = 'uppercase')

    const h2s = Array.from(document.querySelectorAll('h2'))
    h2s.forEach(h2 => h2.style.border = '2px dashed red')
}

//6. When the mouse is moved out of the 'banner' div, remove the 'button'
//class from all elements associated with it
//7 Marks
function removeButtonClasses() {
    const elems = Array.from(document.getElementsByClassName('button'))
    elems.forEach(elem => elem.classList.remove('button'))
}

//7. When the image with the id of myImg is clicked, add the button class to all
//paragraphs on the page, and remove all images from the page
//15 Marks
function mayhem() {
    const ps = Array.from(document.getElementsByTagName('p'))
    ps.forEach(p => p.classList.add('button'))
    
    const imgs = Array.from(document.getElementsByTagName('img'))
    imgs.forEach(img => img.remove())
}


//8. When the image with the id of myImg2 is clicked, use setAttribute twice on any one 
//element
//6 Marks
function modifyAttrs(e) {
    const img = e.currentTarget

    img.setAttribute('height', '100')
    img.setAttribute('src', 'Desert.jpg')
}
