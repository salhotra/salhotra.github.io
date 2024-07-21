declare module "three-orbit-controls" {
  import * as THREE from "three";
  import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

  class SolarSystemCanvas {
    private camera: THREE.PerspectiveCamera;
    private renderer: THREE.WebGLRenderer;
    private controls: OrbitControls;

    constructor() {
      this.camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
      this.renderer = new THREE.WebGLRenderer();
      this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    }

    public animate(): void {
      requestAnimationFrame(() => this.animate());
      this.controls.update();
      this.renderer.render(this.scene, this.camera);
    }
  }

  const solarSystemCanvas = new SolarSystemCanvas();
  solarSystemCanvas.animate();
}
