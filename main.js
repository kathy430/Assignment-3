function init() {
    var canvas = document.getElementById("webgl-canvas");
    gl = canvas.getContext("webgl2");

    // clear canvas to black
    gl.clearColor(0.0, 0.0, 0.0, 1.0);

    // enable depth buffer
    gl.enable(gl.DEPTH_TEST);

    cube = new Cube(gl, "Cube-vertex-shader", "Cube-fragment-shader");
    
    render();
}

function render() {
    // clear canvas
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    requestAnimationFrame(cube.render);
}

window.onload = init;