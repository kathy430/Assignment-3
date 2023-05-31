var time = 0.0;

function init() {
    var canvas = document.getElementById("webgl-canvas");
    gl = canvas.getContext("webgl2");

    var aspect = canvas.clientWidth / canvas.clientHeight;

    // clear canvas to black
    gl.clearColor(0.0, 0.0, 0.0, 1.0);

    // enable depth buffer
    gl.enable(gl.DEPTH_TEST);

    cube = new Cube(gl, "Cube-vertex-shader", "Cube-fragment-shader");

    cube.P = perspective(100, aspect, 0, -2);
    cube.MV = translate(-1.0, -1.0, 0.0); 
    
    render();
}

function render() {
    // clear canvas
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    time += 0.1;

    cube.MV(mult())

    cube.render();
    requestAnimationFrame(render);
}

window.onload = init;