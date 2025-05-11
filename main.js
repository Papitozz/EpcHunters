window.addEventListener('DOMContentLoaded', () => {
    const hide = (item) => {
        item.style.display = 'none';
    }

    const show = (item, type) => {
        item.style.display = type;
    }

    // popup
    const infoBtn = document.querySelector('.info');
    const closeBtn = document.querySelector('.close');
    const popupWindow = document.querySelector('.popup-window');

    infoBtn.addEventListener('click', () => {
        show(popupWindow, 'flex');
    });

    closeBtn.addEventListener('click', () => {
        hide(popupWindow);
    });

    popupWindow.addEventListener('click', e => {
        if (e.target === popupWindow) {
            hide(popupWindow);
        }
    })

    // slider
    const leftSlide = document.querySelector('.left-slide');
    const rightSlide = document.querySelector('.right-slide');
    const slider = document.querySelector('.slider');
    let counter = 0;
    let touchX = null;

    const moveLeft = () => {
        if (counter === 0) {
            counter = 1600;
        } else {
            counter -= 320;
        }
        slider.style.transform = `translateX(-${counter}px)`;
    }

    const moveRight = () => {
        if (counter === 1600) {
            counter = 0;
        } else {
            counter += 320;
        }
        slider.style.transform = `translateX(-${counter}px)`
    }

    leftSlide.addEventListener('click', () => {
        moveLeft();
    })

    rightSlide.addEventListener('click', () => {
        moveRight();
    })

    slider.addEventListener('touchstart', e => {
        touchX = e.changedTouches[0].clientX;
    })

    slider.addEventListener('touchmove', e => {
        const calcMove = Math.abs(e.changedTouches[0].clientX - touchX);
        let prevTouch = touchX;
        const matrix = new DOMMatrix(window.getComputedStyle(slider).transform);
        const currentTransform = Math.abs(matrix.e);
        if (prevTouch - e.changedTouches[0].clientX >= 0) {
            slider.style.transform = `translateX(-${currentTransform + calcMove}px)`;
        } else if (e.changedTouches[0].clientX - prevTouch >= 0) {
            if (slider.style.transform == '' || currentTransform == 0) {
                slider.style.transform = `translateX(${calcMove}px)`;
            } else {
                slider.style.transform = `translateX(-${currentTransform - calcMove}px)`;
            }
        }
    })

    slider.addEventListener('touchend', e => {
        if (touchX && e.changedTouches[0].clientX != touchX) {
            if (touchX - e.changedTouches[0].clientX >= 0) {
                moveRight();
            } else if (e.changedTouches[0].clientX - touchX >= 0) {
                moveLeft();
            }
        }
    })

    // burger
    const burger = document.querySelector('.burger');
    const burgerBtn = document.querySelector('.burger-btn');
    const logo = document.querySelector('.logo');
    const loren = document.querySelector('.loren');
    const overlay = document.querySelector('.overlay');

    burgerBtn.addEventListener('click', e => {
        burgerBtn.classList.toggle('active');
        burger.classList.toggle('active');
        overlay.classList.toggle('active');

         if (burgerBtn.classList.contains('active')) {
            logo.style.color = '#F2F3EF';
            loren.style.display = 'inline';
        } else {
            loren.style.display = 'none';
            logo.style.color = '#fff';
        }
    })
})