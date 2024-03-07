// import React, { useRef, useEffect } from 'react';
// import * as THREE from 'three';
// import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
// import { OrbitControls } from 'three/addons/controls/OrbitControls.js';


// const ThreeScene = () => {

//     useEffect(() => {
//         let camera, scene, renderer, Dau, Co1;
//         const init = () => {
//             // Khởi tạo scene, camera, renderer, và các biến cần thiết

//             camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.01, 10);
//             camera.position.set(3, 3, 1);
//             camera.lookAt(0, 0, 0);

//             scene = new THREE.Scene();
//             //scene.background = new THREE.Color(0xffffff);
//             scene.background = new THREE.Color(0x3A3B3C);


//             // const light = new THREE.HemisphereLight(0xbbbbff, 0x444422);
//             const light = new THREE.HemisphereLight(0xffffff, 0x444422);
//             light.position.set(0, 1, 0);
//             scene.add(light);

//             const mesh = new THREE.Mesh(
//                 new THREE.PlaneGeometry(6, 6),
//                 new THREE.MeshPhongMaterial({ color: 0x999999, depthWrite: false })
//             );

//             mesh.rotation.x = -Math.PI / 2;
//             mesh.receiveShadow = true;
//             scene.add(mesh);

//             const grid = new THREE.GridHelper(6, 20, 0x000000, 0x000000);
//             grid.material.opacity = 0.1;
//             grid.material.transparent = true;
//             scene.add(grid);
//             const maxContainerWidth = 1000;
//             const maxContainerHeight = 1000;
//             const scaleFactor = Math.min(maxContainerWidth / window.innerWidth, maxContainerHeight / window.innerHeight);
//             // Khởi tạo GLTFLoader và tải model
//             const loader = new GLTFLoader();
//             loader.load('https://raw.githubusercontent.com/K13T/3Dtest/master/mohinh.glb', (gltf) => {
//                 // Xử lý mô hình 3D
//                 const model = gltf.scene;
//                 console.log(model);
//                 model.traverse((o) => {
//                     if (o.isMesh) {
//                         o.material.metalness = false;
//                         o.material.wireframe = false;
//                         o.castShadow = true;
//                         o.receiveShadow = true;
//                     }
//                 });

//                 const SkinnedMesh = model.children[0].children[1];
//                 scene.add(model);

//                 // Thêm mô hình vào scene
//                 const Skeleton = SkinnedMesh.skeleton;
//                 const SkeletonHelper = new THREE.SkeletonHelper(Skeleton.bones[0]);
//                 SkeletonHelper.skeleton = Skeleton;
//                 SkeletonHelper.visible = true;
//                 scene.add(SkeletonHelper);

//                 const Bones = SkinnedMesh.skeleton.bones;
//                 Dau = Bones.find((bone) => bone.name === 'mixamorigHead');
//                 Co1 = Bones.find((bone) => bone.name === 'mixamorigNeck');
//                 // Dau.rotation.z = 0;
//                 // Dau.rotation.x = 0;
//                 // Co.rotation.y = 0;


//                 async function fetchData() {

//                     fetch('https://ap-southeast-1.aws.data.mongodb-api.com/app/application-0-khcpn/endpoint/Get_motion').then(response => {
//                         if (!response.ok) {
//                             throw new Error('Cannot Connect');
//                         }
//                         return response.json();
//                     })
//                         .then(data => {

//                             const Daux = data[0]?.public?.input?.jsonData?.Roll;
//                             const Dauz = data[0]?.public?.input?.jsonData?.Pitch;
//                             const Co = data[0]?.public?.input?.jsonData?.Yaw;
//                             Dau.rotation.z = Dauz;
//                             Dau.rotation.x = Daux;
//                             Co1.rotation.y = Co;
//                         })
//                         .catch(error => {
//                             console.error('There was a problem with the fetch operation:', error);
//                         });
//                 } fetchData();
//                 setInterval(fetchData, 100);
//             });

//             // Khởi tạo renderer và thêm vào DOM
//             renderer = new THREE.WebGLRenderer({ antialias: true });
//             renderer.setPixelRatio(window.devicePixelRatio);
//             renderer.setSize(window.innerWidth, window.innerHeight);
//             renderer.outputEncoding = THREE.sRGBEncoding;
//             document.body.appendChild(renderer.domElement);

//             // Xử lý sự kiện thay đổi kích thước cửa sổ
//             window.addEventListener('resize', onWindowResize, false);

//             const controls = new OrbitControls(camera, renderer.domElement);
//             controls.target.set(0, 1, 0);
//             controls.update();

//         };
//         function onWindowResize() {
//             camera.aspect = window.innerWidth / window.innerHeight;
//             camera.updateProjectionMatrix();
//             renderer.setSize(window.innerWidth, window.innerHeight);
//         };
//         // Hàm animate để tạo vòng lặp render
//         function animate() {
//             requestAnimationFrame(animate);
//             renderer.render(scene, camera);
//         };

//         init();
//         animate();

//         // Cleanup
//         return () => {
//             // window.removeEventListener('resize', onWindowResize);
//             document.body.removeChild(renderer.domElement);
//         };
//     }, []);

// };

// export default ThreeScene;

import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import './Model3D.css'; // Import CSS file
const ThreeScene = () => {

    useEffect(() => {
        let camera, scene, renderer, Dau, Co1;
        const init = () => {
            // Khởi tạo scene, camera, renderer, và các biến cần thiết
            camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.01, 10);
            camera.position.set(3, 3, 1);
            camera.lookAt(0, 0, 0);

            scene = new THREE.Scene();
            //scene.background = new THREE.Color(0xffffff);
            scene.background = new THREE.Color(0x3A3B3C);

            // const light = new THREE.HemisphereLight(0xbbbbff, 0x444422);
            const light = new THREE.HemisphereLight(0xffffff, 0x444422);
            light.position.set(0, 1, 0);
            scene.add(light);

            const mesh = new THREE.Mesh(
                new THREE.PlaneGeometry(6, 6),
                new THREE.MeshPhongMaterial({ color: 0x999999, depthWrite: false })
            );

            mesh.rotation.x = -Math.PI / 2;
            mesh.receiveShadow = true;
            scene.add(mesh);

            const grid = new THREE.GridHelper(6, 20, 0x000000, 0x000000);
            grid.material.opacity = 0.1;
            grid.material.transparent = true;
            scene.add(grid);
            const maxContainerWidth = 1000;
            const maxContainerHeight = 1000;
            const scaleFactor = Math.min(maxContainerWidth / window.innerWidth, maxContainerHeight / window.innerHeight);
            // Khởi tạo GLTFLoader và tải model
            const loader = new GLTFLoader();
            loader.load('https://raw.githubusercontent.com/K13T/3Dtest/master/mohinh.glb', (gltf) => {
                // Xử lý mô hình 3D
                const model = gltf.scene;
                console.log(model);
                model.traverse((o) => {
                    if (o.isMesh) {
                        o.material.metalness = false;
                        o.material.wireframe = false;
                        o.castShadow = true;
                        o.receiveShadow = true;
                    }
                });

                const SkinnedMesh = model.children[0].children[1];
                scene.add(model);

                // Thêm mô hình vào scene
                const Skeleton = SkinnedMesh.skeleton;
                const SkeletonHelper = new THREE.SkeletonHelper(Skeleton.bones[0]);
                SkeletonHelper.skeleton = Skeleton;
                SkeletonHelper.visible = true;
                scene.add(SkeletonHelper);

                const Bones = SkinnedMesh.skeleton.bones;
                Dau = Bones.find((bone) => bone.name === 'mixamorigHead');
                Co1 = Bones.find((bone) => bone.name === 'mixamorigNeck');
                // Dau.rotation.z = 0;
                // Dau.rotation.x = 0;
                // Co.rotation.y = 0;


                async function fetchData() {

                    fetch('https://ap-southeast-1.aws.data.mongodb-api.com/app/application-0-khcpn/endpoint/Get_motion').then(response => {
                        if (!response.ok) {
                            throw new Error('Cannot Connect');
                        }
                        return response.json();
                    })
                        .then(data => {

                            const Daux = data[0]?.public?.input?.jsonData?.Roll;
                            const Dauz = data[0]?.public?.input?.jsonData?.Pitch;
                            const Co = data[0]?.public?.input?.jsonData?.Yaw;
                            Dau.rotation.z = Dauz;
                            Dau.rotation.x = Daux;
                            Co1.rotation.y = Co;
                        })
                        .catch(error => {
                            console.error('There was a problem with the fetch operation:', error);
                        });
                } fetchData();
                setInterval(fetchData, 100);
            });

            // Khởi tạo renderer và thêm vào DOM
            renderer = new THREE.WebGLRenderer({ antialias: true });
            renderer.setPixelRatio(window.devicePixelRatio);
            renderer.setSize(window.innerWidth, window.innerHeight);
            renderer.outputEncoding = THREE.sRGBEncoding;
            const container = document.getElementById('three-container');
            container.appendChild(renderer.domElement);

            // Xử lý sự kiện thay đổi kích thước cửa sổ
            window.addEventListener('resize', onWindowResize, false);

            const controls = new OrbitControls(camera, renderer.domElement);
            controls.target.set(0, 1, 0);
            controls.update();

        };
        function onWindowResize() {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };
        // Hàm animate để tạo vòng lặp render
        function animate() {
            requestAnimationFrame(animate);
            renderer.render(scene, camera);
        };

        init();
        animate();

        // Cleanup
        return () => {
            // window.removeEventListener('resize', onWindowResize);
            const container = document.getElementById('three-container');
            container.removeChild(renderer.domElement);
        };
    }, []);

    return (
        <div id="three-container" className="three-scene-wrapper"></div>
    );
};

export default ThreeScene;
