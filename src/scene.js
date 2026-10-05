import * as THREE from 'three';
import {SVGRenderer} from 'three/examples/jsm/renderers/SVGRenderer.js';
export function mountLandscape(el){
 if(!el)return()=>{};
 let renderer,vector=false;
 const canvas=document.createElement('canvas');let context=null;try{context=canvas.getContext('webgl2',{alpha:true,antialias:true})}catch{}
 if(context){renderer=new THREE.WebGLRenderer({canvas,context,antialias:true,alpha:true});renderer.setPixelRatio(Math.min(window.devicePixelRatio,1.8));renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFSoftShadowMap;renderer.setClearColor(0x000000,0);renderer.outputColorSpace=THREE.SRGBColorSpace;}else{vector=true;renderer=new SVGRenderer();renderer.setQuality('high');}
 el.appendChild(renderer.domElement);
 const scene=new THREE.Scene(),camera=new THREE.PerspectiveCamera(33,1,.1,100);camera.position.set(8,7,11);camera.lookAt(0,.3,0);
 const root=new THREE.Group();scene.add(root);root.rotation.y=-.25;root.position.set(.65,-.3,0);
 const ambient=new THREE.AmbientLight(0xffffff,vector?.8:2.3);scene.add(ambient);
 const sun=new THREE.DirectionalLight(0xfff5d6,vector?.85:4);sun.position.set(-4,10,7);sun.castShadow=true;sun.shadow.mapSize.set(2048,2048);sun.shadow.camera.left=-8;sun.shadow.camera.right=8;sun.shadow.camera.top=8;sun.shadow.camera.bottom=-8;sun.shadow.normalBias=.03;scene.add(sun);
 const fill=new THREE.DirectionalLight(0xc4dfd0,vector?.3:1.2);fill.position.set(5,3,-4);scene.add(fill);
 const mat=(c,roughness=.88)=>new THREE.MeshStandardMaterial({color:c,roughness,flatShading:true});
 const greens=[mat('#7f9b69'),mat('#668666'),mat('#a1b780'),mat('#4d735a'),mat('#8ba773')],soil=mat('#c4b59a'),rock=mat('#acb69a'),wood=mat('#a28f68'),roof=mat('#8e6950'),cream=mat('#f2e6c6'),water=mat('#91c5ba',.25);
 function mesh(geometry,material,parent=root){const m=new THREE.Mesh(geometry,material);m.castShadow=true;m.receiveShadow=true;parent.add(m);return m}
 const outline=new THREE.Shape();const points=[[-3,-1.4],[-2.7,-2.3],[-.9,-2.7],[1.2,-2.5],[2.8,-1.6],[3.1,.5],[2,2.1],[.2,2.7],[-1.7,2.3],[-3.1,.6]];points.forEach(([x,y],j)=>j?outline.lineTo(x,y):outline.moveTo(x,y));outline.closePath();
 const islandGeo=new THREE.ExtrudeGeometry(outline,{depth:.65,bevelEnabled:true,bevelSegments:2,steps:1,bevelSize:.23,bevelThickness:.18});islandGeo.rotateX(-Math.PI/2);
 let island=mesh(islandGeo,soil);island.position.y=-.95;
 let topGeo=new THREE.ExtrudeGeometry(outline,{depth:.15,bevelEnabled:true,bevelSegments:2,bevelSize:.2,bevelThickness:.12});topGeo.rotateX(-Math.PI/2);let top=mesh(topGeo,greens[2]);top.position.y=-.12;
 const lower=mesh(new THREE.CylinderGeometry(2.5,1.85,.55,9),rock);lower.position.y=-1.13;lower.scale.z=.87;
 const riverCurve=new THREE.CatmullRomCurve3([new THREE.Vector3(-2.3,.13,-1.9),new THREE.Vector3(-1.35,.13,-1.2),new THREE.Vector3(-.5,.13,-.7),new THREE.Vector3(.4,.13,.15),new THREE.Vector3(1.05,.13,1),new THREE.Vector3(.75,.13,2.43)]);
 const river=mesh(new THREE.TubeGeometry(riverCurve,70,.26,8,false),water);river.scale.y=.18;river.position.y=.13;river.receiveShadow=true;
 const falls=mesh(new THREE.BoxGeometry(.4,.92,.07),new THREE.MeshStandardMaterial({color:'#c0e3d9',transparent:true,opacity:.8,roughness:.35}));falls.position.set(.76,-.39,2.52);
 for(let j=0;j<4;j++){let stream=mesh(new THREE.BoxGeometry(.02,.94,.018),mat('#e4f1db'));stream.position.set(.61+j*.09,-.39,2.57)}
 function mountain(x,z,r,h,material){const g=new THREE.Group();root.add(g);const m=mesh(new THREE.ConeGeometry(r,h,5,1),material,g);m.position.set(x,h/2+.15,z);m.rotation.y=.4;const cap=mesh(new THREE.ConeGeometry(r*.22,h*.22,5),mat('#e7e8cb'),g);cap.position.set(x,h*.89+.15,z);cap.rotation.y=.4;return g}
 mountain(.3,-1.45,1.28,2.95,greens[1]);mountain(-1.05,-1.35,1,2.1,greens[0]);mountain(1.55,-1.02,.98,2.2,greens[4]);mountain(2.05,-.25,.69,1.25,greens[2]);
 // Fine contour paths wrap around the hills.
 for(let j=0;j<3;j++){const curve=new THREE.CatmullRomCurve3([new THREE.Vector3(-2.7+j*.06,.17,.35+j*.35),new THREE.Vector3(-2.1,.19,.05+j*.35),new THREE.Vector3(-1.5,.2,.13+j*.4),new THREE.Vector3(-1,.18,.55+j*.35)]);mesh(new THREE.TubeGeometry(curve,30,.025,5,false),mat('#c7d09b'))}
 function tree(x,z,s=1,color=1){let g=new THREE.Group();root.add(g);g.position.set(x,.15,z);g.scale.setScalar(s);let trunk=mesh(new THREE.CylinderGeometry(.035,.05,.55,6),wood,g);trunk.position.y=.27;let crown=mesh(new THREE.ConeGeometry(.28,.8,7),greens[color],g);crown.position.y=.8;let low=mesh(new THREE.ConeGeometry(.35,.62,7),greens[color],g);low.position.y=.57;return g}
 [[-2.5,-.55,.8],[-2.25,-.05,.65],[-2.4,1.1,.9],[-1.8,1.8,.8],[-.9,2,.7],[1.9,1.1,.75],[2.5,.3,.65],[1.8,1.65,.7],[-1.6,-.4,.55],[2,-1.8,.5],[-2,-1.8,.6]].forEach(([x,z,s],j)=>tree(x,z,s,j%4));
 function roundTree(x,z,s){const t=mesh(new THREE.CylinderGeometry(.035,.055,.38,5),wood);t.position.set(x,.3,z);let crown=mesh(new THREE.IcosahedronGeometry(.26,1),greens[0]);crown.position.set(x,.7,z);crown.scale.set(.8,s,1)}
 roundTree(-.5,1.5,1);roundTree(2.15,.85,1.2);
 const house=new THREE.Group();root.add(house);house.position.set(-1.4,.17,.85);house.rotation.y=.32;
 let walls=mesh(new THREE.BoxGeometry(.72,.52,.57),cream,house);walls.position.y=.32;
 let houseRoof=mesh(new THREE.CylinderGeometry(.59,.59,.9,3),roof,house);houseRoof.rotation.z=Math.PI/2;houseRoof.rotation.y=Math.PI/2;houseRoof.position.y=.68;houseRoof.scale.set(1,1,.68);
 const door=mesh(new THREE.BoxGeometry(.13,.27,.014),wood,house);door.position.set(.1,.2,.29);let win=mesh(new THREE.BoxGeometry(.16,.15,.015),mat('#6f9685'),house);win.position.set(-.17,.36,.29);
 let chimney=mesh(new THREE.BoxGeometry(.11,.3,.11),cream,house);chimney.position.set(.21,.83,-.1);
 const bridge=new THREE.Group();root.add(bridge);bridge.position.set(.45,.24,.45);bridge.rotation.y=-.7;
 for(let j=0;j<9;j++){let plank=mesh(new THREE.BoxGeometry(.12,.06,.45),wood,bridge);plank.position.x=(j-4)*.12;plank.position.y=Math.sin(j/8*Math.PI)*.12;}
 for(let j=0;j<2;j++){const curve=new THREE.CatmullRomCurve3([new THREE.Vector3(-.54,.1,j?.24:-.24),new THREE.Vector3(0,.23,j?.24:-.24),new THREE.Vector3(.54,.1,j?.24:-.24)]);mesh(new THREE.TubeGeometry(curve,20,.026,5,false),roof,bridge)}
 // Floating leaves and a miniature butterfly provide a quiet sense of life.
 const butterfly=new THREE.Group();root.add(butterfly);butterfly.position.set(-1.4,2.8,.8);const wingMat=new THREE.MeshStandardMaterial({color:'#dfa97c',side:THREE.DoubleSide,roughness:.65});
 const wings=[];[-1,1].forEach(side=>{const pivot=new THREE.Group();butterfly.add(pivot);const wing=mesh(new THREE.SphereGeometry(.21,14,8),wingMat,pivot);wing.scale.set(1,.08,.63);wing.position.x=side*.17;wing.rotation.y=side*.3;wings.push(pivot)});
 const shadowCanvas=document.createElement('canvas');shadowCanvas.width=128;shadowCanvas.height=128;const ctx=shadowCanvas.getContext('2d'),gradient=ctx.createRadialGradient(64,64,5,64,64,64);gradient.addColorStop(0,'rgba(70,91,57,.30)');gradient.addColorStop(1,'rgba(70,91,57,0)');ctx.fillStyle=gradient;ctx.fillRect(0,0,128,128);const shadow=new THREE.Mesh(new THREE.PlaneGeometry(8,7),new THREE.MeshBasicMaterial({map:new THREE.CanvasTexture(shadowCanvas),transparent:true,depthWrite:false}));shadow.rotation.x=-Math.PI/2;shadow.position.set(.6,-2.1,.1);if(!vector)scene.add(shadow);
 let width=0,height=0;function resize(){width=el.clientWidth;height=el.clientHeight;renderer.setSize(width,height);camera.aspect=width/height;camera.updateProjectionMatrix();}const ro=new ResizeObserver(resize);ro.observe(el);resize();
 let dragging=false,lastX=0,target=-.25,raf,start=performance.now(),disposed=false,lastFrame=0;
 function down(e){dragging=true;lastX=e.clientX;el.setPointerCapture(e.pointerId)}function move(e){if(dragging){target+=(e.clientX-lastX)*.009;lastX=e.clientX}}function up(){dragging=false}el.addEventListener('pointerdown',down);el.addEventListener('pointermove',move);el.addEventListener('pointerup',up);el.addEventListener('pointercancel',up);el.style.touchAction='pan-y';
 const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
 function animate(now){if(disposed)return;if(vector&&now-lastFrame<65){raf=requestAnimationFrame(animate);return}lastFrame=now;const t=(now-start)*.001;root.rotation.y+=(target-root.rotation.y)*.06;if(!reduced){root.position.y=-.2+Math.sin(t*.8)*.065;butterfly.position.y=2.65+Math.sin(t*1.7)*.16;butterfly.position.x=-1.3+Math.sin(t*.7)*.27;wings[0].rotation.z=Math.sin(t*7)*.55;wings[1].rotation.z=-Math.sin(t*7)*.55;}renderer.render(scene,camera);if(vector)renderer.domElement.style.background='transparent';raf=requestAnimationFrame(animate)}raf=requestAnimationFrame(animate);
 return()=>{disposed=true;cancelAnimationFrame(raf);ro.disconnect();el.removeEventListener('pointerdown',down);el.removeEventListener('pointermove',move);el.removeEventListener('pointerup',up);el.removeEventListener('pointercancel',up);scene.traverse(o=>{if(o.geometry)o.geometry.dispose();if(o.material){const materials=Array.isArray(o.material)?o.material:[o.material];materials.forEach(m=>{m.map?.dispose();m.dispose()})}});renderer.dispose?.();renderer.forceContextLoss?.();};
}
