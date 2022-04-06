let isOk = true

const miniatures            = document.querySelectorAll(".carroussel__defilement__miniatures .carroussel__defilement__miniature")
const miniatures_containers = document.querySelectorAll(".carroussel__defilement__miniatures")
const carrousel             = document.querySelector("#carroussel")

let doIHover  = false
carroussel.addEventListener('mouseover', () => {
    doIHover = true
    function makeHoverFalse() {doIHover = false}

     carroussel.addEventListener('mouseout', () => {
        makeHoverFalse()
        carroussel.removeEventListener('mouseout',makeHoverFalse)
    })
})

miniatures_containers.forEach(miniatures_container => {

    let initialWidthContainer = miniatures_container.offsetWidth
    let gap                   = parseFloat(getComputedStyle(miniatures_container).gap)
    let widthMiniature        = parseFloat(getComputedStyle(miniatures[0]).width)
    let widthContainer        = initialWidthContainer-(2*gap)

    // miniatures_container.style.width = `${widthContainer}px`

    miniatures.forEach(x => {

        let d = /droite/.test(x.parentNode.className) ? 1 : -1

        let speed           = .5
        let initialOffset   = x.offsetLeft
        let finalOffset     = initialWidthContainer + gap - widthMiniature
        let differenceWidth = ((initialWidthContainer - widthContainer)/2)

        const animate = () =>{
            if(!doIHover) x.style.left = `${(parseFloat(x.style.left) || 0) + speed*d}px`
            if(x.offsetLeft <= -widthMiniature       && d===-1) x.style.left = `${finalOffset-initialOffset}px`
            if(x.offsetLeft >= initialWidthContainer && d=== 1) x.style.left = `${-gap-initialOffset}px`
            requestAnimationFrame(animate)
        }

        requestAnimationFrame(animate)
    })

})
