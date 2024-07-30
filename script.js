// http://www.3d-meier.de/tut3/Seite176.html


window.onload = function () {
	var renderer, scene, camera, controls;
	var geometry, material, mesh;
	var pi = Math.PI;
	var x, y, z;
	var R1, s, t;

	var scale = 16;

	var a = 0.4, aMin = -5, aMax = 5, aStep = 0.05;
	var b = 1, bMin = -5, bMax = 5, bStep = 0.05;
	var c = 2, cMin = -5, cMax = 5, cStep = 0.1;
	var d = 0.4, dMin = -5, dMax = 5, dStep = 0.05;

	var e = 2, eMin = -5, eMax = 5, eStep = 0.1;
	var f = 2, fMin = -5, fMax = 5, fStep = 0.1;
	var g = 2, gMin = -5, gMax = 5, gStep = 0.1;

	var u = 30;
	var v = 120;

	var width = window.innerWidth
	var height = window.innerHeight;
	var canvas = document.getElementById('canvas');

	canvas.setAttribute('width', width);
	canvas.setAttribute('height', height);

	var renderer = new THREE.WebGLRenderer({ canvas: canvas });
	renderer.setClearColor(0x000000);

	var camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 5000);
	camera.position.set(0, 0, 1000);//controls = new THREE.TrackballControls( camera, renderer.domElement );
	scene = new THREE.Scene();
	geometry = new THREE.ParametricGeometry(curve, u, v);
	material = new THREE.MeshNormalMaterial({ shading: THREE.SmoothShading, side: 2 })
	mesh = new THREE.Mesh(geometry, material);
	scene.add(mesh);

	function curve(u, v, target) {
		u = 30 * (u - 0.5);
		v = 90 * (v - 0.5);

		t = b - pow(a, c);
		R1 = sqrt(t);
		s = a * ((R1 * cosh(a * u)) * (R1 * cosh(d * u)) + (a * sin(R1 * v)) * (a * sin(R1 * v)));

		x = scale * (- u + (e * t * cosh(a * u) * sinh(a * u) / s));
		y = scale * (f * R1 * cosh(a * u) * (- (R1 * cos(v) * cos(R1 * v)) - (sin(v) * sin(R1 * v))) / s);
		z = scale * (g * R1 * cosh(a * u) * (- (R1 * sin(v) * cos(R1 * v)) + (cos(v) * sin(R1 * v))) / s);
		target.set(x, y, z).multiplyScalar(3);

		return new THREE.Vector3(x, y, z);
	}

	function cos(a) { return Math.cos(a); }
	function sin(a) { return Math.sin(a); }
	function tan(a) { return Math.tan(a); }

	function cos2(a) { return Math.cos(a) * Math.cos(a); }
	function sin2(a) { return Math.sin(a) * Math.sin(a); }

	function abs(a) { return Math.abs(a); }
	function exp(a) { return Math.exp(a); }
	function log(a) { return Math.log(a); }
	function pow(a, b) { return Math.pow(a, b); }
	function ran() { return Math.random(); }
	function sqrt(a) { return Math.sqrt(a); }
	function sinh(a) { return (exp(a) - exp(-a)) / 2; }
	function cosh(a) { return (exp(a) + exp(-a)) / 2; }
	function tanh(a) { return sinh(a) / cosh(a); }
	function sech(a) { return 1 / cosh(a); }

	function loop() {
		mesh.rotation.y += Math.PI / 500;
		mesh.rotation.x += Math.PI / 500;
		mesh.rotation.z += Math.PI / 500;



		renderer.render(scene, camera);
		requestAnimationFrame(function () { loop(); });
	}
	loop();
}