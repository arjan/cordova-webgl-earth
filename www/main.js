/*jslint browser:true, devel:true, white:true, vars:true, eqeq:true */
/*global THREE:false, requestAnimationFrame:false*/

/*
 * Based on http://threejs.org/examples/canvas_geometry_cube.html
 */
document.addEventListener ('DOMContentLoaded', function () {

    document.addEventListener("deviceready", function() {

	    var webglEl = document.getElementById('webgl');

	    if (!Detector.webgl) {
	        Detector.addGetWebGLMessage(webglEl);
	        return;
	    }

	    var width  = window.innerWidth,
		    height = window.innerHeight;

        console.log("w=" + window.innerWidth + ",h=" + window.innerHeight+",r="+window.devicePixelRatio);
        //width = width / window.devicePixelRatio; //540;
        //height = height / window.devicePixelRatio; //960;


	    // Earth params
	    var radius   = 0.2,
		    segments = 64,
		    rotation = 6;  

	    var scene = new THREE.Scene();

	    var camera = new THREE.PerspectiveCamera(45, width / height, 0.01, 10000);
	    camera.position.z = 1.5;

	    var renderer = new THREE.WebGLRenderer();
	    renderer.setSize(width, height);

        window.r = renderer;
        
	    scene.add(new THREE.AmbientLight(0x333333));

	    var light = new THREE.DirectionalLight(0xffffff, 1);
	    light.position.set(5,3,5);
	    scene.add(light);

        var sphere = createSphere(radius, segments);
	    sphere.rotation.y = rotation; 
	    scene.add(sphere)

        var clouds = createClouds(radius, segments);
	    clouds.rotation.y = rotation;
	    scene.add(clouds)

	    var stars = createStars(90, 64);
	    scene.add(stars);

	    var controls = new THREE.TrackballControls(camera);

	    webglEl.appendChild(renderer.domElement);
	    render();

	    function render() {
	        controls.update();
	        sphere.rotation.y += 0.0015;
	        clouds.rotation.y += 0.0015;		
	        requestAnimationFrame(render);
	        renderer.render(scene, camera);
	    }

	    function createSphere(radius, segments) {
	        return new THREE.Mesh(
		        new THREE.SphereGeometry(radius, segments, segments),
		        new THREE.MeshPhongMaterial({
		            map:         THREE.ImageUtils.loadTexture('images/2_no_clouds_4k.jpg'),
		            bumpMap:     THREE.ImageUtils.loadTexture('images/elev_bump_4k.jpg'),
		            bumpScale:   -0.005
		            //specularMap: THREE.ImageUtils.loadTexture('images/water_4k.png'),
		            //specular:    new THREE.Color('grey')								
		        })
	        );
	    }

	    function createClouds(radius, segments) {
	        return new THREE.Mesh(
		        new THREE.SphereGeometry(radius + 0.003, segments, segments),			
		        new THREE.MeshPhongMaterial({
		            map:         THREE.ImageUtils.loadTexture('images/weather2.png'),
		            transparent: true
		        })
	        );		
	    }

	    function createStars(radius, segments) {
	        return new THREE.Mesh(
		        new THREE.SphereGeometry(radius, segments, segments), 
		        new THREE.MeshBasicMaterial({
                    color: '0x000000',
		            //map:  THREE.ImageUtils.loadTexture('images/galaxy_starfield.png'), 
		            side: THREE.BackSide
		        })
	        );
	    }
        
    }, false);

});
