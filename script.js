// --- Three.js luxury hero ---------------------------------------------------
import * as THREE from "https://unpkg.com/three@0.160.0/build/three.module.js";
import { OrbitControls } from "https://unpkg.com/three@0.160.0/examples/jsm/controls/OrbitControls.js";
import { EffectComposer } from "https://unpkg.com/three@0.160.0/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "https://unpkg.com/three@0.160.0/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "https://unpkg.com/three@0.160.0/examples/jsm/postprocessing/UnrealBloomPass.js";

const canvas = document.getElementById("hero-canvas");

// Respect reduced motion
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

let renderer, scene, camera, composer, controls, group, clock;
init3D();
animate();

function init3D(){
  const w = window.innerWidth, h = window.innerHeight;

  renderer = new THREE.WebGLRenderer({ canvas, antialias:true, alpha:true, powerPreference:"high-performance" });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(w, h);

  scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x0b1220, 0.03);

  camera = new THREE.PerspectiveCamera(55, w/h, 0.1, 100);
  camera.position.set(0, 1.2, 5);

  // Lighting
  const hemi = new THREE.HemisphereLight(0xffffff, 0x0b1220, 0.8);
  const dir = new THREE.DirectionalLight(0xffffff, 0.8);
  dir.position.set(5, 5, 3);
  scene.add(hemi, dir);

  // Group of premium shapes
  group = new THREE.Group();
  scene.add(group);

  const gold = new THREE.MeshPhysicalMaterial({
    color: 0x22c55e, metalness: 0.8, roughness: 0.2, reflectivity: 1, clearcoat: 0.6
  });

  const glass = new THREE.MeshPhysicalMaterial({
    color: 0x88fff0, metalness: 0, roughness: 0, transmission: 0.85, thickness: 0.6, transparent: true
  });

  // Centerpiece — icosahedron
  const ico = new THREE.Mesh(new THREE.IcosahedronGeometry(1.2, 1), gold);
  ico.rotation.x = 0.6;
  group.add(ico);

  // Orbiting rings + small shapes
  for (let i=0;i<18;i++){
    const r = 2.2 + Math.random()*1.1;
    const t = (i/18)*Math.PI*2;
    const geom = i%3===0 ? new THREE.TorusGeometry(0.28, 0.06, 16, 64)
               : i%3===1 ? new THREE.OctahedronGeometry(0.2)
               : new THREE.DodecahedronGeometry(0.22);
    const mat = i%2 ? glass : gold;
    const m = new THREE.Mesh(geom, mat);
    m.position.set(Math.cos(t)*r, (Math.random()-0.5)*0.6, Math.sin(t)*r);
    m.rotation.set(Math.random(), Math.random(), Math.random());
    m.userData.speed = 0.2 + Math.random()*0.6;
    group.add(m);
  }

  // Ground hints
  const plane = new THREE.Mesh(new THREE.PlaneGeometry(30, 30), new THREE.MeshBasicMaterial({ color:0x0b1220, transparent:true, opacity:.3 }));
  plane.rotation.x = -Math.PI/2;
  plane.position.y = -2.2;
  scene.add(plane);

  // Controls (disabled pan/zoom; just gentle orbit)
  controls = new OrbitControls(camera, renderer.domElement);
  controls.enableZoom = false;
  controls.enablePan = false;
  controls.enableDamping = true;
  controls.autoRotate = !reduceMotion;
  controls.autoRotateSpeed = 0.8;

  // Post-processing bloom (subtle)
  composer = new EffectComposer(renderer);
  composer.addPass(new RenderPass(scene, camera));
  const bloom = new UnrealBloomPass(new THREE.Vector2(w, h), 0.6, 0.8, 0.1);
  composer.addPass(bloom);

  clock = new THREE.Clock();

  window.addEventListener("resize", onResize);
  window.addEventListener("mousemove", onMouse);
}

function onResize(){
  const w = window.innerWidth, h = window.innerHeight;
  renderer.setSize(w, h);
  camera.aspect = w/h; camera.updateProjectionMatrix();
  composer.setSize(w, h);
}

function onMouse(e){
  // Subtle parallax
  const x = (e.clientX / window.innerWidth - 0.5);
  const y = (e.clientY / window.innerHeight - 0.5);
  group.rotation.y = x * 0.6;
  group.rotation.x = -y * 0.3;
}

function animate(){
  requestAnimationFrame(animate);
  const t = clock.getElapsedTime();

  group.children.forEach((m,i)=>{
    if (m.isMesh && i>0){
      m.position.y = Math.sin(t * m.userData.speed + i) * 0.6;
      m.rotation.y += 0.01;
      m.rotation.x += 0.005;
    }
  });

  controls.update();
  composer.render();
}

// --- UI interactions ---------------------------------------------------------
document.getElementById("year").textContent = new Date().getFullYear();

// Theme toggle (persist)
const themeToggle = document.getElementById("themeToggle");
const saved = localStorage.getItem("theme");
if (saved === "light") document.documentElement.classList.add("light");
themeToggle.addEventListener("click", ()=>{
  document.documentElement.classList.toggle("light");
  localStorage.setItem("theme", document.documentElement.classList.contains("light") ? "light" : "dark");
  themeToggle.textContent = document.documentElement.classList.contains("light") ? "☀️" : "🌙";
});
themeToggle.textContent = document.documentElement.classList.contains("light") ? "☀️" : "🌙";

// Mobile nav
const burger = document.getElementById("hamburger");
const mobileNav = document.getElementById("mobileNav");
burger.addEventListener("click", ()=>{
  const open = !mobileNav.hasAttribute("hidden");
  if (open){ mobileNav.setAttribute("hidden",""); burger.setAttribute("aria-expanded","false"); }
  else { mobileNav.removeAttribute("hidden"); burger.setAttribute("aria-expanded","true"); }
});

// Reveal on scroll
const io = new IntersectionObserver(entries=>{
  entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add("visible"); io.unobserve(e.target);} });
},{threshold:.15});
document.querySelectorAll(".reveal").forEach(el=>io.observe(el));
