'use strict';

document.addEventListener('DOMContentLoaded', function () {
    let menuBtn = document.querySelector('.menu-btn');
    var sidebar = document.getElementById('sidebar-container');
    var contentPage = document.getElementById('content-page');
    const widthSidebar = sidebar.offsetWidth; //getComputedStyle(document.documentElement).getPropertyValue('--width-sidebar');
    let btnCloseSidebar = document.querySelector('.btn-close-sidebar');

    console.log(menuBtn);

    menuBtn.addEventListener('click', () => {
        //open sidebar
        if (sidebar.offsetLeft < 0) {
            openSidebar();
        }
        //close sidebar
        else {
            closeSidebar();
        }
    });

    btnCloseSidebar.addEventListener('click', () => {
        // close sidebar
        closeSidebar();
    });

    function openSidebar() {
        sidebar.style.left = '0';
        if (screen.width > 992) {
            contentPage.style.marginLeft = widthSidebar + 'px';
        }
    }
    function closeSidebar() {
        console.log(widthSidebar);
        //sidebar.style.left = ('-' + widthSidebar).replace(/\s/g, '');
        sidebar.style.left = '-' + widthSidebar + 'px';
        contentPage.style.marginLeft = '0';
    }
});
