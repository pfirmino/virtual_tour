AFRAME.registerShader("mix-shader", {
  // The schema declares any parameters for the shader.
  schema: {
    // `is:'uniform'` tells A-Frame this should appear as uniform value in the shader(s).
    u_map1: { type: "map", is: "uniform" },
    u_uv1: { type: "number", is: "uniform", default: 1}, // 0 for generated Spherical and 1 for mesh UVs
    u_map1_origin: { type: "vec3", is: "uniform"},
    u_map2: { type: "map", is: "uniform" },
    u_uv2: { type: "number", is: "uniform", default: 1}, // 0 for generated Spherical and 1 for mesh UVs
    u_map2_origin: { type: "vec3", is: "uniform"},
    u_factor: { type: "number", is: "uniform"}
  },
  // Setting raw to true uses THREE.RawShaderMaterial instead of ShaderMaterial,
  raw: false,

  // Here, we're going to use the vertex shader to get coordinates.

  vertexShader: `
      varying vec2 v_uv; // mesh UVs
      varying vec4 g_uv; // generated UVs   

       void main(){
          //Define Uvs
          v_uv = uv;
          
          //Preprocessing generated uvs
          g_uv = vec4(position, 1.0);
          
            //basic usage must declare gl_Position
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
       }
  `,
  //multi-line string not suported in older browsers.
  fragmentShader: `
       // Uniforms from the schema
       uniform sampler2D u_map1;
       uniform int u_uv1;
       uniform sampler2D u_map2;
       uniform int u_uv2;
       uniform float u_factor;
       varying vec2 v_uv;
       varying vec4 g_uv;
       
       //Origin Vectors
       uniform vec3 u_map1_origin;
       uniform vec3 u_map2_origin;
       
       vec2 GetSphericalProjection(vec4 uv, vec3 origin){
         float radius = distance(vec4(origin, 1.0), uv);
         return vec2(vec2((atan(uv.z - origin.z, uv.x - origin.x) / 3.1415926538 + 1.0) * 0.5,
         asin(uv.y / radius) / 3.1415926538 + 0.5));
       }
 
       // A fragment shader can set the color via gl_FragColor
       void main () {
          
          vec2 lat_lng1 = GetSphericalProjection(g_uv, u_map1_origin);
          vec2 lat_lng2 = GetSphericalProjection(g_uv, u_map2_origin);
       
          //Blend images using u_factor
          vec3 mixedColors = mix(textureLod(u_map1, (u_uv1 < 1)? lat_lng1 : v_uv, 0.0).xyz, textureLod(u_map2, (u_uv2 < 1)? lat_lng2 : v_uv, 0.0).xyz, u_factor);
          
          //Paint pixels in the FB
          gl_FragColor = vec4(mixedColors, 1.0);
       }
    `
});