function init() {
    var canvas = document.getElementById("webgl-canvas");
    gl = canvas.getContext("webgl2");

    // clear canvas to black
    gl.clearColor(0.0, 0.0, 0.0, 1.0);

    cube = new Cube(gl, )
}