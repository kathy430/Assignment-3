//---------------------------------------------------------------------------
//
//  --- Cube.js ---
//
//    A simple, encapsulated Cube object

const DefaultNumSides = 8;

//
//  All of the parameters of this function are optional, although, it's
//    possible that the WebGL context (i.e., the "gl" parameter) may not
//    be global, so passing that is a good idea.
//
//  Further, the vertex- and fragment-shader ids assume that the HTML "id" 
//    attributes for the vertex and fragment shaders are named
//
//      Vertex shader:   "Cube-vertex-shader"
//      Fragment shader: "Cube-fragment-shader"
//
function Cube(gl, vertexShaderId, fragmentShaderId) {

    // Initialize the shader pipeline for this object using either shader ids
    //   declared in the application's HTML header, or use the default names.
    //
    const vertShdr = vertexShaderId || "Cube-vertex-shader";
    const fragShdr = fragmentShaderId || "Cube-fragment-shader";

    // Initialize the object's shader program from the provided vertex
    //   and fragment shaders.  We make the shader program private to
    //   the object for simplicity's sake.
    // 
    const shaderProgram = initShaders(gl, vertShdr, fragShdr);

    if (shaderProgram < 0) {
        alert("Error: Cube shader pipeline failed to compile.\n\n" +
            "\tvertex shader id:  \t" + vertShdr + "\n" +
            "\tfragment shader id:\t" + fragShdr + "\n");
        return;
    }

    // We'll generate the cone's geometry (vertex positions).  The cone's
    //   base will be a one-unit radius circle in the XY plane, centered 
    //   at the origin.  The cone's apex will be located one unit up the
    //   +Z access.  We'll build our positions using that specification,
    //   and some trigonometry.
    //
    // Initialize temporary arrays for the Cone's indices and vertex positions,
    //   storing the position and index for the base's center
    //

    let positions = [
        0.0, 0.0, 0.0,   // vertex 0
        0.0, 1.0, 0.0,   // vertex 1
        1.0, 1.0, 0.0,   // vertex 2
        1.0, 0.0, 0.0,   // vertex 3
        0.0, 0.0, -1.0,  // vertex 4
        0.0, 1.0, -1.0,  // vertex 5
        1.0, 1.0, -1.0,  // vertex 6
        1.0, 0.0, -1.0   // vertex 7
    ];

    let indices = [
        1, 0, 2,
        0, 3, 2,
        2, 3, 6,
        3, 7, 6,
        6, 7, 5,
        7, 4, 5,
        5, 4, 1,
        4, 0, 1,
        5, 1, 6,
        1, 2, 6,
        0, 4, 3,
        4, 7, 3
    ];


    // Record the number of indices in one of our two disks that we're using 
    //   to make the cone.  At this point, the indices array contains the
    //   correct number of indices for a single disk, and as we render the
    //   cone as two disks of the same size (with one having its center pushed
    //   up to make the cone shade) , this value is precisely what we need.
    //
    const count = indices.length;



    // Create our vertex buffer and initialize it with our positions data
    //

    aPosition = new Attribute(gl, shaderProgram, positions,
        "aPosition", 3, gl.FLOAT);
    indices = new Indices(gl, indices);

    // Create a render function that can be called from our main application.
    //   In this case, we're using JavaScript's "closure" feature, which
    //   automatically captures variable values that are necessary for this
    //   routine so we can be less particular about variables scopes.  As 
    //   you can see, our "positions", and "indices" variables went out of
    //   scope when the Cone() constructor exited, but their values were
    //   automatically saved so that calls to render() succeed.
    // 
    this.render = function () {
        // Enable our shader program
        gl.useProgram(shaderProgram);

        // Activate our vertex, enabling the vertex attribute we want data
        //   to be read from, and tell WebGL how to decode that data.
        //
        aPosition.enable();

        // Likewise enable our index buffer so we can use it for rendering
        //
        indices.enable();

        // Since our list of indices contains equal-sized sets of
        //    indices values that we'll use to specify how many
        //    vertices to render, we divide the length of the 
        //    indices buffer by two, and use that as the "count"
        //    parameter for each of our draw calls.
        let count = indices.count / 3;

        // Draw the cone's base.  Since our index buffer contains two
        //   "sets" of indices: one for the top, and one for the base,
        //   we divide the number of indices by two to render each
        //   part separately
        //
        gl.drawElements(gl.POINTS, count, indices.type, 0);

        // Finally, reset our rendering state so that other objects we
        //   render don't try to use the Cone's data
        //
        aPosition.disable();
        indices.disable();
    }
};
