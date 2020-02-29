// 兼容clientHeight...
function get(name) {
    let cWidth, cHeight, sWidth, sHeight, sLeft, sTop
    if (document.compatMode === 'BackCompat') {
        cWidth = document.body.clientWidth
        cHeight = document.body.clientHeight
        sWidth = document.body.scrollWidth
        sHeight = document.body.scrollHeight
        sLeft = document.body.scrollLeft
        sTop = document.body.scrollTop
    } else {
        cWidth = document.documentElement.clientWidth
        cHeight = document.documentElement.clientHeight
        sWidth = document.documentElement.scrollWidth
        sHeight = document.documentElement.scrollHeight
        sLeft = document.documentElement.scrollLeft || document.body.scrollLeft
        sTop = document.documentElement.scrollTop || document.body.scrollTop
    }
    switch (name) {
        case 'clientWdth': return cWidth;
        case 'clientHeight': return cHeight;
        case 'scrollWidth': return sWidth;
        case 'scrollHeight': return sHeight;
        case 'scrollLeft': return sLeft;
        case 'scrollTop': return sTop;
    }
}

function getScreen(name) {
    const w = window.innerWidth || window.screen.width || document.documentElement.clientWidth,
        h = window.innerHeight || window.screen.height || document.documentElement.clientHeight
    switch (name) {
        case 'width': return w;
        case 'height': return h;
        default: return 0;
    }
}


export {
    get,
    getScreen
}