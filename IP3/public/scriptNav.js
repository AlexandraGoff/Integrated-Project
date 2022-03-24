const navSlide = () => {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');
    
    //Toggle
    burger.addEventListener('click', () => {
        //Toggle
        nav.classList.toggle('nav-active');
        
        //Animate
        navLinks.forEach((link, index) => {
            if(link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.2s ease forwards ${index / 7 + 1}s`;}
        });
        //burger
        burger.classList.toggle('toggle');
    
    });

}

navSlide();