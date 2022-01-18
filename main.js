export default class threeScene {
    constructor() {
    }
    init(container, GLTFLoader, RGBELoader) {
        this.scene = new THREE.Scene();
        this.container = container
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.camera = new THREE.PerspectiveCamera(
            75,
            this.width / this.height,
            1,
            10000
        );

        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        this.renderer.outputEncoding = THREE.sRGBEncoding;
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMapSoft = true;

        container.appendChild(this.renderer.domElement);

        this.camera.forwardRotationScalar = 0
        this.camera.sideRotationScalar = 0

        this.camera.position.set(0, 20, 100);
        //resize
        window.addEventListener('resize', () => {
            this.width = window.innerWidth;
            this.height = window.innerHeight;

            this.camera.aspect = this.width / this.height;
            this.camera.updateProjectionMatrix();

            this.renderer.setSize(this.width, this.height);

            this.renderer.render(this.scene, this.camera)
        });

        this.currentTimelinePos = 0
        this.movementTimeline = gsap.timeline()

        this.raycaster = new THREE.Raycaster();

        this.index = 0
        this.spinAnim
        this.rotateCoords = { x: 0, y: 0, z: 0 }
        this.sceneAssets = [
            'https://raw.githubusercontent.com/HanSpringett/DearRider_Webflow_embedtest/release5.0/assets/building_shadows_v11.gltf',
            'https://raw.githubusercontent.com/HanSpringett/DearRider_Webflow_embedtest/release5.0/assets/Cubes_v2.gltf',
            './assets/DearRider_1977.gltf',
            './assets/DearRider_1983.gltf',
            './assets/DearRider_1986.gltf',
            './assets/DearRider_1989.gltf',
            './assets/DearRider_1993.gltf',
            './assets/DearRider_1996_Custom.gltf',
            './assets/DearRider_1996_Dolphin.gltf',
            './assets/DearRider_2002.gltf',
            './assets/DearRider_2013.gltf',
            './assets/DearRider_2020.gltf',
            './assets/DearRider_2021.gltf',
            'https://raw.githubusercontent.com/HanSpringett/DearRider_Webflow_embedtest/main/assets/DearRiderOutro1.gltf',
            'https://raw.githubusercontent.com/HanSpringett/DearRider_Webflow_embedtest/main/assets/DearRiderOutro2.gltf'
        ];

        this.loadedItems = {};
        this.mouse = new THREE.Vector2();

        this.timelineObj = [
            {
                id: 0,
                position: { x: -0, y: 105, z: -1100 },
                rotation: { x: 3.096496824068951, y: -0.03892926785276455, z: 3.1398363604390074 },
                obj: false,
            },
            {
                id: 1,
                position: { x: 1143.25, y: 150, z: -300 },
                rotation: { x: 3.096496824068951, y: -0.03892926785276455, z: 3.1398363604390074 },
                obj: false,
            },
            {
                id: 2,
                position: { x: 408.5, y: 150, z: -300 },
                rotation: { x: 3.096496824068951, y: -0.03892926785276455, z: 3.1398363604390074 },
                obj: false,
            },
            {
                id: 3,
                position: { x: -351.5, y: 150, z: -300 },
                rotation: { x: 3.096496824068951, y: -0.03892926785276455, z: 3.1398363604390074 },
                obj: false,
            },
            {
                id: 4,
                position: { x: -1092, y: 150, z: -300 },
                rotation: { x: 3.096496824068951, y: -0.03892926785276455, z: 3.1398363604390074 },
                obj: false,
            },
            {
                id: 5,
                position: { x: -732.25, y: 150, z: 320 },
                rotation: { x: 3.096496824068951, y: -0.03892926785276455, z: 3.1398363604390074 },
                obj: false,
            },
            {
                id: 6,
                position: { x: 38.5, y: 150, z: 320 },
                rotation: { x: 3.096496824068951, y: -0.03892926785276455, z: 3.1398363604390074 },
                obj: false,
            },
            {
                id: 7,
                position: { x: 772, y: 150, z: 320 },
                rotation: { x: 3.096496824068951, y: -0.03892926785276455, z: 3.1398363604390074 },
                obj: false,
            },
            {
                id: 8,
                position: { x: 1163, y: 150, z: 825 },
                rotation: { x: 3.096496824068951, y: -0.03892926785276455, z: 3.1398363604390074 },
                obj: false,
            },
            {
                id: 9,
                position: { x: 414, y: 150, z: 825 },
                rotation: { x: 3.096496824068951, y: -0.03892926785276455, z: 3.1398363604390074 },
                obj: false,
            },
            {
                id: 10,
                position: { x: -336.5, y: 150, z: 825 },
                rotation: { x: 3.096496824068951, y: -0.03892926785276455, z: 3.1398363604390074 },
                obj: false,
            },
            {
                id: 11,
                position: { x: -1071.5, y: 150, z: 825 },
                rotation: { x: 3.096496824068951, y: -0.03892926785276455, z: 3.1398363604390074 },
                obj: false,
            },
            {
                id: 12,
                position: { x: -500, y: 150, z: 985 },
                rotation: { x: 3.096496824068951, y: -0.03892926785276455, z: 3.1398363604390074 },
                obj: false,
            },
            {
                id: 13,
                position: { x: 100, y: 250, z: 1935 },
                rotation: { x: 3.096496824068951, y: -0.03892926785276455, z: 3.1398363604390074 },
                obj: false,
            }
        ]

        this.currentCameraCoords = {
            x: 0,
            y: 0,
            z: 0
        }

        this.scroll = false
        this.exploreBtnOpen = true
        this.movementTimeline = gsap.timeline()
        this.singleMoveTimeline = gsap.timeline()
        this.boardRotation = gsap.timeline()
        this.gltfLoader = GLTFLoader
        this.RGBELoader = RGBELoader
    }
    loadModels() {
        this.manager = new THREE.LoadingManager();
        this.manager.onStart = function (url, itemsLoaded, itemsTotal) {
            // console.log('Started loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.');
        };
        this.manager.onLoad = () => {
            console.log('Loading complete!');
            this.setUpScene()
        };
        this.manager.onProgress = function (url, itemsLoaded, itemsTotal) {
            // console.log('Loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.');
        };
        this.manager.onError = function (url) {
            // console.log('There was an error loading ' + url);
        };

        //Loading of assets
        const loader = new this.gltfLoader(this.manager);
        const self = this
        // Load a glTF resource
        for (let i = 0; i < self.sceneAssets.length; i++) {
            loader.load(
                // resource URL
                self.sceneAssets[i],
                // called when the resource is loaded
                (gltf) => {
                    this.scene.add(gltf.scene);
                    self.loadedItems[i] = gltf.scene
                    gltf.scene.traverse(child => {
                        // if (child.isMesh) {
                        //     // child.castShadow = true;
                        //     // child.receiveShadow = true;
                        //     child.visible = false
                        // }
                    })
                }
            );
        }
        const textureLoader = new THREE.TextureLoader()
        const geometry = new THREE.PlaneGeometry(15000, 8000);
        const material = new THREE.MeshBasicMaterial({ side: THREE.DoubleSide, map: textureLoader.load("https://raw.githubusercontent.com/HanSpringett/DearRider/main/assets/cube/mountains-covered-with-snow-2-Ab.jpg") });
        const plane = new THREE.Mesh(geometry, material);
        plane.position.set(1000, -1000, 3000)
        plane.scale.set(1.25, 1.25, 1.25)
        this.bg = plane

        const plane2 = new THREE.Mesh(geometry, material);
        plane2.position.set(10000, -1000, -4000)
        plane2.rotateOnAxis(new THREE.Vector3(0, 1, 0), 20)
        this.scene.add(plane2);

        this.scene.add(this.bg);


        const pmremGenerator = new THREE.PMREMGenerator(this.renderer);
        pmremGenerator.compileEquirectangularShader();
        //Loading of assets
        new this.RGBELoader().setDataType(THREE.UnsignedByteType)
            .load('https://raw.githubusercontent.com/HanSpringett/DearRider_Webflow_embedtest/main/assets/studio_small_09_1k.hdr', (texture) => {

                const envMap = pmremGenerator.fromEquirectangular(texture).texture;

                // this.scene.background = envMap;
                this.scene.environment = envMap;

                texture.dispose();
                pmremGenerator.dispose();

                this.renderer.render(this.scene, this.camera);
            })
    }
    //maps the loaded models to the timeline and places them in the scene at their positions
    setUpScene() {
        const self = this
        //building
        self.loadedItems[0].position.set(0, 0, 0)
        //cubes
        self.loadedItems[1].position.set(0, 120, -825)
        //1977 board
        self.loadedItems[2].position.set(1150, 70, -130)
        self.loadedItems[2].rotateOnAxis(new THREE.Vector3(0, 1, 0), 3.14159)
        self.timelineObj[1].obj = self.loadedItems[2]
        //1983 board
        self.loadedItems[3].position.set(415, 70, -135)
        self.loadedItems[3].rotateOnAxis(new THREE.Vector3(0, 1, 0), 3.14159)
        self.timelineObj[2].obj = self.loadedItems[3]
        //1986 board
        self.loadedItems[4].position.set(-345, 70, -135)
        self.loadedItems[4].rotateOnAxis(new THREE.Vector3(0, 1, 0), 3.14159)
        self.timelineObj[3].obj = self.loadedItems[4]
        //1989 board
        self.loadedItems[5].position.set(-1085, 70, -135)
        self.loadedItems[5].rotateOnAxis(new THREE.Vector3(0, 1, 0), 3.14159)
        self.timelineObj[4].obj = self.loadedItems[5]
        //1996_dolphin board
        self.loadedItems[6].position.set(-725, 70, 485)
        self.loadedItems[6].rotateOnAxis(new THREE.Vector3(0, 1, 0), 3.14159)
        self.timelineObj[5].obj = self.loadedItems[6]
        //1996 board
        self.loadedItems[7].position.set(45, 70, 485)
        self.loadedItems[7].rotateOnAxis(new THREE.Vector3(0, 1, 0), 3.14159)
        self.timelineObj[6].obj = self.loadedItems[7]
        //1993 board
        self.loadedItems[8].position.set(780, 70, 485)
        self.loadedItems[8].scale.set(1, 1, -1)
        self.timelineObj[7].obj = self.loadedItems[8]
        //2002 board
        console.log(self.loadedItems[9])
        self.loadedItems[9].position.set(1170, 70, 1000)
        self.loadedItems[9].rotateOnAxis(new THREE.Vector3(0, 1, 0), 3.14159)
        self.timelineObj[8].obj = self.loadedItems[9]
        //2013 board
        self.loadedItems[10].position.set(420, 70, 1000)
        self.loadedItems[10].rotateOnAxis(new THREE.Vector3(0, 1, 0), 3.14159)
        self.timelineObj[9].obj = self.loadedItems[10]
        //2020 board
        self.loadedItems[11].position.set(-330, 70, 1000)
        self.loadedItems[11].rotateOnAxis(new THREE.Vector3(0, 1, 0), 3.14159)
        self.timelineObj[10].obj = self.loadedItems[11]
        //2021 board
        self.loadedItems[12].position.set(-1065, 70, 1000)
        self.loadedItems[12].rotateOnAxis(new THREE.Vector3(0, 1, 0), 3.14159)
        console.log(self.loadedItems[12])
        self.timelineObj[11].obj = self.loadedItems[12]

        //placeholder1
        self.loadedItems[13].position.set(-493, 150, 1150)
        self.loadedItems[13].rotateOnAxis(new THREE.Vector3(0, 1, 0), 0.04)
        self.loadedItems[13].scale.set(-0, 0, 0)
        this.placeholder1 = self.loadedItems[13]
        //placeholder2
        self.loadedItems[14].position.set(100, 250, 2000)
        self.loadedItems[14].scale.set(-0, 0, 0)
        self.loadedItems[14].rotateOnAxis(new THREE.Vector3(0, 1, 0), 0.02)
        self.loadedItems[14].rotateOnAxis(new THREE.Vector3(0, 0, 1), 0.02)
        this.placeholder2 = self.loadedItems[14]

        //event for mouse wheel
        window.addEventListener("wheel", (evt) => {
            if (evt.deltaY > 0 && this.scroll && this.exploreBtnOpen) {
                this.fowards()
            }
            else if (evt.deltaY < 0 && this.scroll && this.exploreBtnOpen) {
                this.backwards()
            }
        })

        this.touchDown = false
        this.initPoint = 0
        //events for touch drag
        window.addEventListener("touchstart", (event) => {
            this.touchDown = true
            this.initPoint = event.touches[0].clientY
        })
        window.addEventListener("touchmove", (event) => {
            if (event.targetTouches.length === 1 && this.touchDown) {
                if (event.touches[0].clientY < this.initPoint && this.scroll) {
                    this.fowards()
                }
                else if (event.touches[0].clientY > this.initPoint && this.scroll) {
                    this.backwards()
                }
                event.preventDefault()
            }
        })
        window.addEventListener("touchend", () => {
            this.touchDown = false
        })

        window.addEventListener("pointerdown", (event) => {
            self.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
            self.mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
            this.raycaster.setFromCamera(self.mouse, this.camera);

            // calculate objects intersecting the picking ray
            const intersects = this.raycaster.intersectObjects(this.scene.children);
            if (intersects[0].object.name == "explore") {
                window.dispatchEvent(new CustomEvent("openExplore", { detail: this.index }))
                console.log("Index", this.index)
            }
        })
        //move the camera at the event.detail where event.detail is the index of the timelineObj
        window.addEventListener("click", (evt) => {
            this.goTo(self.timelineObj[evt.detail])
        })

        this.camera.position.set(-1302, 492, -983)
        this.camera.rotation.set(3.096496824068951, -0.635938533090549, 3.1398363604390074)

        this.currentCameraCoords.x = -1302
        this.currentCameraCoords.y = 492
        this.currentCameraCoords.z = -983

        //events for camera zoom in on mobile
        this.setCameraPinch()


        this.circle = this.addRing()
        this.circle.scale.set(3, 3, 3)
        this.circle.visible = false
        this.scene.add(this.circle)

        //add camera movement on pan
        let initX
        let initY
        window.addEventListener("pointermove", (evt) => {
            this.onMouseMove(evt)
            gsap.delayedCall(0.5, () => {
                initX = evt.x
                initY = evt.y
            })
            if (evt.x < initX && this.camera.position.x < this.currentCameraCoords.x + 2) {
                this.camera.position.x += 0.1
            }
            if (evt.y < initY && this.camera.position.y < this.currentCameraCoords.y + 2) {
                this.camera.position.y += 0.1
            }
            if (evt.x > initX && this.camera.position.x > this.currentCameraCoords.x - 2) {
                this.camera.position.x -= 0.1
            }
            if (evt.y > initY && this.camera.position.y > this.currentCameraCoords.y - 2) {
                this.camera.position.y -= 0.1
            }
        })

        window.addEventListener("beforeunload", () => {
            this.dispose()
        })

        this.circleInterval = setInterval(() => {
            if (this.circle) {
                this.raycaster.setFromCamera(this.mouse, this.camera);
                const intersects = this.raycaster.intersectObjects(this.scene.children);
                if (intersects[0].object.name == "explore") {
                    this.text.material.color = new THREE.Color(0x808080);
                    gsap.to([this.circle.children[2].material], { opacity: 1, duration: 1 })
                    gsap.to([this.circle.children[3].material], { opacity: 0.3, duration: 1 })
                    gsap.to(this.circle.children[3].scale, {
                        x: 1.15,
                        y: 1.15,
                        z: 1.15,
                        duration: 1
                    })
                }
                else {
                    gsap.to([this.circle.children[2].material, this.circle.children[3].material], { opacity: 0, duration: 1 })
                    gsap.to(this.circle.children[3].scale, {
                        x: 1,
                        y: 1,
                        z: 1,
                        duration: 1
                    })
                    this.text.material.color = new THREE.Color(0xffffff);
                }
            }
        }, 100)

    }
    //move camera backwards on the timeline
    backwards() {
        if (this.index > 0) {
            this.index--
            this.moveCamera(this.index, this.index + 1)
        }
    }
    //move camera forwards on the timeline
    fowards() {
        if (this.index < this.timelineObj.length - 1) {
            this.index++
            this.moveCamera(this.index, this.index - 1)
        }
    }
    //initial animation that moves the camera from the corner to the cubes
    startAnim() {
        this.moveCamera(0, false)
    }
    moveCamera(index, oldIndex) {
        this.movementTimeline.kill()
        this.boardRotation.kill()
        this.singleMoveTimeline.kill()

        this.currentTimelinePos = index
        this.scroll = false
        const self = this
        if (oldIndex) {
            this.endSpinBoard(oldIndex)
            this.circle.visible = false
        }
        this.singleMoveTimeline = gsap.to(this.camera.position, {
            x: self.timelineObj[index].position.x,
            y: self.timelineObj[index].position.y,
            z: self.timelineObj[index].position.z,
            duration: 2,
            onComplete: () => {
                self.startSpinBoard(index)
                this.scroll = true
                if (index == 0) {
                    this.circle.position.set(self.timelineObj[index].position.x + 7, (self.timelineObj[index].position.y / 2) - 0.5, self.timelineObj[index].position.z - 150)
                    this.circle.visible = true
                }
                else if (index <= 12) {
                    this.circle.position.set(self.timelineObj[index].position.x + 7, self.timelineObj[index].position.y / 1.55, self.timelineObj[index].position.z - 150)
                    this.circle.visible = true
                }
                else {
                    this.circle.visible = false
                }
            }
        })
        this.boardRotation = gsap.to(this.camera.rotation, {
            x: self.timelineObj[index].rotation.x,
            y: self.timelineObj[index].rotation.y,
            z: self.timelineObj[index].rotation.z,
            duration: 2,
        })

        this.currentCameraCoords.x = self.timelineObj[index].position.x
        this.currentCameraCoords.y = self.timelineObj[index].position.y
        this.currentCameraCoords.z = self.timelineObj[index].position.z
        if (index > 12) {
            gsap.to(this.bg.position, { z: 4500, duration: 2 })
        }
        else if (index > 11) {
            gsap.to(this.bg.position, { z: 4052, duration: 2 })
        }
        else if (index > 7) {
            gsap.to(this.bg.position, { z: 3600, duration: 2 })
        }
        else if (index > 4) {
            gsap.to(this.bg.position, { z: 3185, duration: 2 })
        }
        else if (index > 0) {
            gsap.to(this.bg.position, { z: 3550, duration: 2 })
        }

        if (index <= 11) {
            gsap.to(this.placeholder1.scale, {
                x: 0,
                y: 0,
                z: 0,
                duration: 1,
            })
        }
        else if (index == 12) {
            gsap.to(this.placeholder2.scale, {
                x: 0,
                y: 0,
                z: 0,
                duration: 0.25,
            })
            gsap.to(this.placeholder1.scale, {
                x: -1,
                y: 1,
                z: 1,
                duration: 1,
            })
        }
        else if (index == 13) {
            gsap.to(this.placeholder1.scale, {
                x: 0,
                y: 0,
                z: 0,
                duration: 0.25,
            })
            gsap.to(this.placeholder2.scale, {
                x: -0.4,
                y: 0.4,
                z: 0.4,
                duration: 1,
            })
        }
    }
    startSpinBoard(index) {
        const self = this
        if (self.timelineObj[index].obj) {
            this.rotateCoords = {
                x: self.timelineObj[index].obj.rotation.x,
                y: self.timelineObj[index].obj.rotation.y,
                z: self.timelineObj[index].obj.rotation.z
            }
            this.spinAnim = gsap.timeline({ repeat: -1, duration: 0.01 })
            this.spinAnim.add(() => {
                self.timelineObj[index].obj.rotateOnAxis(new THREE.Vector3(0, 1, 0), 0.01)
            })
        }
    }
    endSpinBoard(index) {
        const self = this
        if (self.timelineObj[index].obj) {
            try {
                this.spinAnim.kill()
            } catch (e) { }
            this.spinAnim = null;

            self.timelineObj[index].obj.rotation.set(this.rotateCoords.x, this.rotateCoords.y, this.rotateCoords.z)
        }
    }
    //function that cleans and disposes the scene
    dispose() {
        // stop sounds
        const cleanMaterial = material => {
            // dispose material
            material.dispose()
            // dispose textures
            for (const key of Object.keys(material)) {
                const value = material[key]
                if (value && typeof value === 'object' && 'minFilter' in value) {
                    value.dispose()
                }
            }
        }
        this.scene.traverse(object => {
            if (!object.isMesh) return

            // dispose geometry
            object.geometry.dispose()

            if (object.material.isMaterial) {
                cleanMaterial(object.material)
            } else {
                // an array of materials
                for (const material of object.material) cleanMaterial(material)
            }
        })

        //kill all tweens
        gsap.globalTimeline.clear()

        //remove interval
        clearInterval(this.circleInterval);

        this.scene = null
        this.camera = null
        this.renderer && this.renderer.renderLists.dispose()
        this.renderer = null

        cancelAnimationFrame(this.animFrame)
    }
    animate() {
        const animate = () => {
            this.renderer.render(this.scene, this.camera);
            this.animFrame = requestAnimationFrame(animate);
        }
        animate()
    }
    setCameraPinch() {
        let value = 0
        const self = this
        window.addEventListener("touchstart", (evt) => {
            value = evt.touches[0].clientY

        })
        window.addEventListener("touchmove", (evt) => {
            if (evt.touches.length > 1 && self.index == 0) {
                let f = (evt.touches[0].clientY - value) / 10
                this.camera.fov = Math.min(Math.max(this.camera.fov + f, 20), 125);
                this.camera.updateProjectionMatrix()
            }
        })
    }
    cameraMovementEvents() {
        let thisPoint, lastPoint
        let pointerDown = false
        this.initAngle = 0
        window.addEventListener("pointerdown", (event) => {
            lastPoint = new THREE.Vector2(event.clientX, event.clientY)
            pointerDown = true
        })

        document.addEventListener("pointermove", (event) => {
            if (pointerDown) {
                thisPoint = new THREE.Vector2(event.clientX, event.clientY)
                this.camera.forwardRotationScalar = (thisPoint.x - lastPoint.x);
                this.camera.sideRotationScalar = (thisPoint.y - lastPoint.y);
                lastPoint = new THREE.Vector2(event.clientX, event.clientY)
            }
        })
        window.addEventListener("touchmove", (evt) => {
            let value1 = (evt.touches[0].x + evt.touches[1].x) - initPointX
            let value2 = (evt.touches[0].y + evt.touches[1].y) - initPointY
            this.camera.fov = Math.min(Math.max(this.camera.fov + (value1 + value2), 20), 65);
            this.camera.updateProjectionMatrix()
        })

        window.addEventListener("pointerup", () => {
            this.camera.forwardRotationScalar = 0;
            this.camera.sideRotationScalar = 0;
            pointerDown = false
        })
        window.addEventListener("touchend", () => {
            this.camera.forwardRotationScalar = 0;
            this.camera.sideRotationScalar = 0;
            pointerDown = false
        })
    }
    //add button
    addRing() {
        const circleGroup = new THREE.Group()

        let radius1 = window.innerWidth / 192
        if (radius1 < 5) {
            radius1 = 5
        }
        let radius2 = window.innerWidth / 160
        if (radius2 < 6) {
            radius2 = 6
        }

        const ring1Geom = new THREE.RingGeometry(radius1 - 0.1, radius1, 80);
        const ring1Mat = new THREE.MeshBasicMaterial({ color: 0xe0e0e0, side: THREE.DoubleSide, transparent: true });
        const mesh1 = new THREE.Mesh(ring1Geom, ring1Mat);
        mesh1.position.set(0, 20, 100)
        circleGroup.add(mesh1);

        const ring2Geom = new THREE.RingGeometry(radius2 - 0.1, radius2, 80);
        const ring2Mat = new THREE.MeshBasicMaterial({ color: 0xe0e0e0, side: THREE.DoubleSide, transparent: true });
        const mesh2 = new THREE.Mesh(ring2Geom, ring2Mat);
        mesh2.position.set(0, 20, 100)
        circleGroup.add(mesh2);

        const circleGeometry = new THREE.CircleGeometry(radius1, 32);
        const circleMat = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0, side: THREE.DoubleSide });
        const circle = new THREE.Mesh(circleGeometry, circleMat);
        circle.position.set(0, 20, 100.1)
        circle.name = "explore"
        circleGroup.add(circle);

        const circleGeometry2 = new THREE.CircleGeometry(radius2, 32);
        const circleMat2 = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0, side: THREE.DoubleSide });
        const circle2 = new THREE.Mesh(circleGeometry2, circleMat2);
        circle2.position.set(0, 20, 100.2)
        circleGroup.add(circle2);

        const text = this.loadText("Explore", 125)
        text.position.set(0, 20, 100)
        text.scale.set(-1, 1, -1)
        circleGroup.add(text)
        this.text = text
        text.name = "explore"

        return circleGroup
    }
    loadText(text, fontSize) {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');

        // 2d duty
        context.font = fontSize + "px HelveticaNowText";

        let metrics = context.measureText(text);

        let textWidth = this.roundUp(metrics.width + 20.0, 2);
        let textHeight = this.roundUp(fontSize + 10.0, 2);

        canvas.width = textWidth;
        canvas.height = textHeight;

        context.font = "bold " + fontSize + "px HelveticaNowText";
        context.textAlign = "center";
        context.textBaseline = "middle";
        context.fillStyle = "#ffffff";
        context.fillText(text, textWidth / 2, textHeight / 2);

        const texture = new THREE.Texture(canvas);
        texture.needsUpdate = true;

        const material = new THREE.MeshBasicMaterial({
            map: texture,
            transparent: true,
            side: THREE.DoubleSide
            //color: 0xffffff,
            //useScreenCoordinates: false
        });

        console.log("textw: " + textWidth, "texth: " + textHeight);



        let mesh = new THREE.Mesh(new THREE.PlaneGeometry(textWidth / 60, textHeight / 60, 10, 10), material);

        mesh.position.y = 5;
        mesh.position.z = 5;
        mesh.position.x = 0;

        return mesh;

    }
    roundUp(numToRound, multiple) {
        let value = multiple;
        while (value < numToRound) {
            value = value * multiple;
        }
        return value;
    }
    hideExploreButton() {
        gsap.to([this.circle.children[0].material, this.circle.children[1].material, this.circle.children[2].material], { opacity: 0, duration: 1 })
    }
    showExploreButton() {
        gsap.to([this.circle.children[0].material, this.circle.children[1].material, this.circle.children[2].material], { opacity: 1, duration: 1 })
    }
    onMouseMove(event) {

        // calculate mouse position in normalized device coordinates
        // (-1 to +1) for both components

        this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        this.mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;

    }
    showExploreBtn(visible) {
        this.circle.visible = visible
        this.exploreBtnOpen = visible
    }
    goTo(target) {
        this.endSpinBoard(this.index)
        const self = this
        this.movementTimeline.kill()
        this.boardRotation.kill()
        this.singleMoveTimeline.kill()
        this.movementTimeline = gsap.timeline({
            onComplete: () => {
                this.startSpinBoard(target.id)
                this.scroll = true
                if(target.id == 0){
                    this.circle.position.set(self.timelineObj[target.id].position.x + 7, (self.timelineObj[target.id].position.y / 2) - 0.5, self.timelineObj[target.id].position.z - 150)
                    this.circle.visible = true
                }
                else if (target.id <= 12) {
                    this.circle.position.set(self.timelineObj[target.id].position.x + 7, self.timelineObj[target.id].position.y / 1.55, self.timelineObj[target.id].position.z - 150)
                    this.circle.visible = true
                }
                if (target.id <= 11) {
                    gsap.to(this.placeholder1.scale, {
                        x: 0,
                        y: 0,
                        z: 0,
                        duration: 1,
                    })
                    gsap.to(this.placeholder2.scale, {
                        x: 0,
                        y: 0,
                        z: 0,
                        duration: 1,
                    })
                }
                else if (target.id == 12) {
                    gsap.to(this.placeholder2.scale, {
                        x: 0,
                        y: 0,
                        z: 0,
                        duration: 0.25,
                    })
                    gsap.to(this.placeholder1.scale, {
                        x: -1,
                        y: 1,
                        z: 1,
                        duration: 0.25,
                    })
                }
                else if (target.id == 13) {
                    gsap.to(this.placeholder1.scale, {
                        x: 0,
                        y: 0,
                        z: 0,
                        duration: 0.25,
                    })
                    gsap.to(this.placeholder2.scale, {
                        x: -0.4,
                        y: 0.4,
                        z: 0.4,
                        duration: 0.25,
                    })
                }
        
                this.currentCameraCoords.x = self.timelineObj[this.index].position.x
                this.currentCameraCoords.y = self.timelineObj[this.index].position.y
                this.currentCameraCoords.z = self.timelineObj[this.index].position.z

            }
        })
        this.movementTimeline.to(this.camera.position, {
            x: self.timelineObj[target.id].position.x,
            y: self.timelineObj[target.id].position.y,
            z: self.timelineObj[target.id].position.z,
            duration: 1,
        }, 0)
        if (target.id == 1) {
            this.movementTimeline.add(() => {
                gsap.to(this.bg.position, { z: 3550, duration: 1 })
            }, 0)
        }
        if (target.id == 5) {
            this.movementTimeline.add(() => {
                gsap.to(this.bg.position, { z: 3185, duration: 1 })
            }, 0)
        }
        if (target.id == 8) {
            this.movementTimeline.add(() => {
                gsap.to(this.bg.position, { z: 3600, duration: 1 })
            }, 0)
        }
        if (target.id == 12) {
            this.movementTimeline.add(() => {
                gsap.to(this.bg.position, { z: 4052, duration: 1 })
            }, 0)
        }
        if (target.id == 13) {
            this.movementTimeline.add(() => {
                gsap.to(this.bg.position, { z: 4500, duration: 1 })
            }, 0)
        }
        this.index = target.id
        this.movementTimeline.play()
        this.currentTimelinePos = target.id
    }
    showUI(show){
        for(let i = 0; i < this.circle.children.length; i++){
            this.circle.children[i].visible = show
        }
    }
}

