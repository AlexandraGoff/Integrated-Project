

    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');
    const navA = document.querySelectorAll('.nav-links li a');

    burger.addEventListener('click', () => {
        const visibility = nav.getAttribute("data-visible");

        if (visibility === "false"){
            nav.setAttribute('data-visible', true);
            //Toggle burger menu
            nav.classList.toggle('nav-active');
            //Toggle
            burger.classList.toggle('toggle');
            burger.setAttribute('btn-active', false);
            }
        else if (visibility === "true"){
            nav.setAttribute('data-visible', false);
            
            //Close burger menu
            burger.classList.toggle('toggle');

            burger.setAttribute('btn-active', true);

            
        }
        
      
    
    });

    function underline() {
        const underlined = navA.getAttribute("underlined");

        if (underlined === "false"){
            navA.setAttribute('underlined', true);
        }
    }
