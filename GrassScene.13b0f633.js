var e=globalThis.parcelRequire2041;(0,e.register)("4dDVm",function(i,t){Object.defineProperty(i.exports,"default",{get:()=>r,set:void 0,enumerable:!0,configurable:!0});var s=e("ilwiq"),n=e("1zN5O");class r{constructor(e,i,t){this.modelLoader=t,this.container=e,this.visitedFromMobileDevice=i,this.width=e.clientWidth,this.height=e.clientHeight,this.scene=new s.Scene,this.clock=new s.Clock,this.camera=new s.PerspectiveCamera(75,this.width/this.height,.1,1e3),this.renderer=new s.WebGLRenderer({antialias:!0,alpha:!0}),this.renderer.setSize(this.width,this.height),this.container.appendChild(this.renderer.domElement),this.mouse=new s.Vector2,this.envMap=null,this.mesh=null,this.container.addEventListener("visibilitychange",()=>{document.hidden?this.stopRendering():this.startRendering()}),window.devicePixelRatio,this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,1.5)),this.renderer.outputEncoding=s.SRGBColorSpace,this.renderer.toneMapping=s.ACESFilmicToneMapping,this.renderer.toneMappingExposure=2.8,this.pointLight=new s.PointLight(0xfcb43a,1.5,2),this.pointLight.position.set(0,0,5),this.scene.add(this.pointLight),this.camera.position.set(0,0,5),this.loadTextures(),this.loadModel(),this.setupResizeObserver(),this.animate(),this.addEventListeners()}setupResizeObserver(){new ResizeObserver(e=>{for(let i of e){let{width:e,height:t}=i.contentRect;this.renderer.setSize(e,t),this.camera.aspect=e/t,this.camera.updateProjectionMatrix()}}).observe(this.container)}onMouseMove(e){this.mouse.x=e.clientX/window.innerWidth*2-1,this.mouse.y=-(2*(e.clientY/window.innerHeight))+1;let i=new s.Raycaster;i.setFromCamera(this.mouse,this.camera);let t=i.ray.origin.clone().add(i.ray.direction.multiplyScalar(1));this.pointLight.position.copy(t)}addEventListeners(){this.container.addEventListener("mousemove",e=>this.onMouseMove(e))}setEnvMapFromPromise(e){e.then(e=>{this.envMap=e,this.scene.environment=e,this.mesh&&(this.mesh.material.envMap=e,this.mesh.material.needsUpdate=!0)})}loadModel(){this.modelLoader.loadModel("./assets/models/grass/grass.glb").then(e=>{e.traverse(e=>{e.isMesh&&"grass"===e.name&&(e.material=this.createShaderMaterial(),e.material.envMap=this.envMap,e.material.map=this.textures.diffuse,this.mesh=e)}),this.visitedFromMobileDevice?(e.scale.set(1.5,1.5,1.5),e.position.set(.2,-.8,4)):(e.scale.set(1.9,1.9,1.9),e.position.set(.3,-.8,4)),this.scene.add(e)})}loadTextures(){this.textures={diffuse:this.modelLoader.ktx2Loader.load("./assets/models/grass/Albedo.ktx2")}}createShaderMaterial(){return new n.default({baseMaterial:s.MeshStandardMaterial,uniforms:{uTime:{value:0},windStrength:{value:1},windDirection:{value:new s.Vector2(1,0)},diffuseTexture:{value:this.textures.diffuse}},vertexShader:`

            float hash(vec2 p) {
                p = 50.0 * fract(p * 0.3183099 + vec2(0.71));
                return -1.0 + 2.0 * fract(p.x * p.y * (p.x + p.y));
            }

            float noise(vec2 p) {
                vec2 i = floor(p);
                vec2 f = fract(p);
                vec2 u = f * f * (3.0 - 2.0 * f);

                return mix(mix(hash(i + vec2(0.0, 0.0)), hash(i + vec2(1.0, 0.0)), u.x),
                        mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
            }


            uniform float uTime;
            uniform float windStrength;
            uniform vec2 windDirection; // The XZ direction of the wind

            varying vec2 vUv;

            void main() {
                vUv = uv;

                // Get the world position of the vertex
                vec4 worldP = modelMatrix * vec4(position, 1.0);

                vec3 pos = position;

                // Use time and some arbitrary values to generate noise
                float n = noise(vec2(uTime * 0.67, pos.x * 0.15));

                // Scale the noise value to be in the range [0.0, 0.2]
                float varyingValue = n * 0.65;

                // Use the Y component of the world position to control the wind influence
                float influence = smoothstep(0.0, 1.5, worldP.y + 0.75);  // Adjust based on world Y position

                // Apply wind movement in the XZ plane, using a sin wave for periodic motion

                float wind1 = sin(vUv.y * 1.0 + (uTime) * windStrength) * 2.5 * influence * varyingValue;
                float wind2 = sin(worldP.z * 1.0 + (uTime) * windStrength) * 1.25 * influence * varyingValue;
                

                pos.x += wind1 * windDirection.x;
                pos.z += wind2 * windDirection.y * varyingValue;

                // Standard transformation
                csm_Position = pos;
                //gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
            }
            `,fragmentShader:`
                uniform sampler2D diffuseTexture; // Diffuse texture (color)
                varying vec2 vUv;

                void main() {
                    // Sample the diffuse texture for the grass color
                    vec3 texColor = texture2D(diffuseTexture, vUv).rgb;
                    csm_DiffuseColor = vec4(texColor, 1.0);
                }
            `,transparent:!1,fog:!1})}animate(){this.renderer.setAnimationLoop(()=>this.animate());let e=this.clock.getDelta();this.mesh&&(this.mesh.material.uniforms.uTime.value+=.65*e),this.renderer.render(this.scene,this.camera)}startRendering(){this.renderer.setAnimationLoop(()=>this.animate())}stopRendering(){this.renderer.setAnimationLoop(null)}}});
//# sourceMappingURL=GrassScene.13b0f633.js.map
