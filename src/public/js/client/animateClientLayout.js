// event for sidebar
let menuBtn = document.querySelector(".icon-hamburger");
const sidebar = document.getElementById("mySidebar");
//const contentPage = document.getElementById("content-page");
//const widthSidebar = getComputedStyle(document.documentElement).getPropertyValue('--width-sidebar');
const widthSidebar = sidebar.offsetWidth;
const overlay = document.getElementById("myOverlay");

menuBtn.addEventListener("click", () => {

    //open sidebar
    if (sidebar.offsetLeft < 0) {
        openSidebar();
        overlay.style.display = "block";

    }
    //close sidebar
    else {
        closeSidebar();
    }
})

overlay.addEventListener("click", () => {
    // close sidebar
    closeSidebar();
    overlay.style.display = "none";

})

function openSidebar() {
    sidebar.style.left = '0';
    // if (screen.width > 992) {
    //     contentPage.style.marginLeft = widthSidebar;
    // }

}
function closeSidebar() {
    // sidebar.style.left = ('-' + widthSidebar).replace(/\s/g, '');
    // contentPage.style.marginLeft = '0';
     sidebar.style.left = '-' + widthSidebar + 'px';
}


// funtion for highlight navigation header
let current = 0;
for (let i = 0; i < document.links.length; i++) {

    if (document.links[i].className != "logo" && document.links[i].href === document.URL) {
        current = i;
        document.links[i].className += " actived-page";

    }
}

// // make header sticky when scroll
window.onscroll = function () { myFunction() };

const header = document.getElementById("myHeader");
const headerTop = document.getElementById("topBar");
//const sticky = header.offsetTop;

function myFunction() {
    if (window.pageYOffset > 40) {
        header.classList.add("sticky");
        if (window.getComputedStyle(headerTop).display == "none") {
            header.style.top = '0';
        }


    } else {
        header.classList.remove("sticky");
    }


}
