

const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    smooth: true
}); 


function firstPageAnim(){
    var tl = gsap.timeline()

    tl.from("#nav", {
        y: '-10',
        opacity: 0,
        duration: 2,
        ease: Expo.easeInOut
    })
    .to(".boundingelem",{
        y: 0,
        ease: Expo.easeInOut,
        duration: 1,
        stagger: .2
    })
    .from("#herofooter",{
        y: -10,
        opacity: 0,
        duration: 1.5,
        delay: -.5,
        ease: Expo.easeInOut
    })
}

var timeout;

function circleMouseFlat(){
    // defaul scal value
    var xscale = 1;
    var yscale = 1;

    var xprev = 0;
    var yprev = 0;

    window.addEventListener("mousemove", function(details){
        this.clearTimeout(timeout)
        
        var xdiff = details.clientX - xprev;
        var ydiff = details.clientY - yprev;

        xscale = gsap.utils.clamp(0.8, 1.2, xdiff);
        yscale = gsap.utils.clamp(0.8, 1.2, ydiff);

        xprev = details.clientX;
        yprev = details.clientY;


        circleMouseFollower(xscale, yscale)

        timeout = this.setTimeout(function(){
            document
            .querySelector('#minicircle')
            .style.transform = `translate(${details.clientX}px,${details.clientY}px) scale(1,1)`
        }, 100)
        
    })
}

circleMouseFlat()

function circleMouseFollower(xscale, yscale){
    window.addEventListener("mousemove", function(details){
        document
            .querySelector('#minicircle')
            .style.transform = `translate(${details.clientX}px,${details.clientY}px) scale(${xscale}, ${yscale})`
    })
}

firstPageAnim()

document.querySelectorAll('.elem').forEach(ele => {

    var rotate = 0;
    var diffrot = 0;

    ele.addEventListener("mouseleave", function(details){
        gsap.to(ele.querySelector('img'),{
            opacity: 0,
            ease: Power3,
            duration: 0.5
        })
    })

    ele.addEventListener("mousemove", function(details){
        var diff = details.clientY - ele.getBoundingClientRect().top;

        diffrot = details.clientX - rotate;
        rotate = details.clientX

        gsap.to(ele.querySelector('img'), {
            opacity: 1,
            ease: Power3, 
            top: diff,
            left: details.clientX,
            rotate:  gsap.utils.clamp(-20, 20, diffrot * 2)
        })
    });

})
