const addBtn = document.getElementById("addBook");
const overlay = document.getElementById("overlay")
const inputan = document.getElementById("Inputan")
const closeBtn = document.getElementById("closeBtn")
const bookSubmit= document.getElementById("bookSubmit")
const spanAdd= document.getElementById("spanAdd");
addBtn.addEventListener("click",()=>{
    overlay.style.cssText=
    `display:flex;
    justify-content:center;
    align-items:center`
    inputan.style.cssText=
    `position:absolute;
    display:flex;
    background-color:white;`
})
addBtn.addEventListener("mouseenter",()=>{
    spanAdd.style.cssText=
    `display:inline;`
    addBtn.style.cssText=
    `border-radius:10px;
    font-size:18px;`
    
    addBtn.addEventListener("mouseleave",()=>{
        spanAdd.style.display="none"
        addBtn.style.cssText=
        `border-radius:50%;
        font-size:30px`
        
    })
})
closeBtn.addEventListener("click",()=>{
    overlay.style.display="none"
})
bookSubmit.addEventListener("click",()=>{
    overlay.style.display="none"
})



const header =document.getElementById("header")
window.addEventListener("scroll",()=>{
    header.classList.toggle("head_bar",window.scrollY>300);
})



