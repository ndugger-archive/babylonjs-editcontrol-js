module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	__webpack_require__(1);
	
	var _babylonjs = __webpack_require__(2);
	
	var _babylonjs2 = _interopRequireDefault(_babylonjs);
	
	var _acthist = __webpack_require__(3);
	
	var _acthist2 = _interopRequireDefault(_acthist);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Axis = _babylonjs2.default.Axis;
	var Color3 = _babylonjs2.default.Color3;
	var Mesh = _babylonjs2.default.Mesh;
	var Space = _babylonjs2.default.Space;
	var StandardMaterial = _babylonjs2.default.StandardMaterial;
	var Vector3 = _babylonjs2.default.Vector3;
	
	var EditControl = function () {
	    function EditControl(mesh, camera, canvas, scale) {
	        _classCallCheck(this, EditControl);
	
	        this.meshPicked = null;
	        this.canvas = null;
	        this.scene = null;
	        this.mainCamera = null;
	        this.theParent = null;
	        this.local = true;
	        this.snapT = false;
	        this.snapR = false;
	        this.transSnap = 1;
	        this.rotSnap = Math.PI / 18;
	        this.axesLen = 0.4;
	        this.axesScale = 1;
	        this.redMat = null;
	        this.greenMat = null;
	        this.blueMat = null;
	        this.whiteMat = null;
	        this.yellowMat = null;
	        this.actHist = null;
	        this.renderer = null;
	        this.pointerdown = null;
	        this.pointerup = null;
	        this.pointermove = null;
	        this.pDown = false;
	        this.axisPicked = null;
	        this.prevOverMesh = null;
	        this.editing = false;
	        this.prevPos = null;
	        this.snapX = 0;
	        this.snapY = 0;
	        this.snapZ = 0;
	        this.snapRX = 0;
	        this.snapRY = 0;
	        this.snapRZ = 0;
	        this.transEnabled = false;
	        this.rotEnabled = false;
	        this.scaleEnabled = false;
	        this.bXaxis = null;
	        this.bYaxis = null;
	        this.bZaxis = null;
	        this.xaxis = null;
	        this.yaxis = null;
	        this.zaxis = null;
	        this.guideCtl = null;
	        this.pickPlane = null;
	        this.tCtl = null;
	        this.tX = null;
	        this.tY = null;
	        this.tZ = null;
	        this.tEndX = null;
	        this.tEndY = null;
	        this.tEndZ = null;
	        this.rCtl = null;
	        this.rX = null;
	        this.rY = null;
	        this.rZ = null;
	        this.rEndX = null;
	        this.rEndY = null;
	        this.rEndZ = null;
	        this.sCtl = null;
	        this.sX = null;
	        this.sY = null;
	        this.sZ = null;
	        this.sAll = null;
	        this.sEndX = null;
	        this.sEndY = null;
	        this.sEndZ = null;
	        this.sEndAll = null;
	        this.localX = null;
	        this.localY = null;
	        this.localZ = null;
	        this.localRot = null;
	
	        this.meshPicked = mesh;
	        this.canvas = canvas;
	        this.axesScale = scale;
	
	        this.scene = mesh.getScene();
	        this.mainCamera = camera;
	        this.actHist = new _acthist2.default(mesh, 10);
	
	        mesh.computeWorldMatrix(true);
	
	        this.theParent = new Mesh('EditControl', this.scene);
	        this.theParent.position = this.meshPicked.position;
	        this.theParent.visibility = 0;
	        this.theParent.isPickable = false;
	
	        this.createMaterials(this.scene);
	        this.createGuideAxes();
	        this.guideCtl.parent = this.theParent;
	        this.createPickPlane();
	        this.pickPlane.parent = this.theParent;
	
	        this.pointerdown = this.onPointerDown.bind(this);
	        this.pointerup = this.onPointerUp.bind(this);
	        this.pointermove = this.onPointerMove.bind(this);
	
	        canvas.addEventListener('pointerdown', this.pointerdown, false);
	        canvas.addEventListener('pointerup', this.pointerup, false);
	        canvas.addEventListener('pointermove', this.pointermove, false);
	
	        this.setLocalAxes(mesh);
	        this.renderer = this.renderLoopProcess.bind(this);
	        this.scene.registerBeforeRender(this.renderer);
	    }
	
	    _createClass(EditControl, [{
	        key: 'renderLoopProcess',
	        value: function renderLoopProcess() {
	            this.setAxesScale();
	            this.theParent.position = this.meshPicked.position;
	            this.onPointerOver();
	        }
	    }, {
	        key: 'switchTo',
	        value: function switchTo(mesh) {
	            mesh.computeWorldMatrix(true);
	            this.meshPicked = mesh;
	            this.setLocalAxes(mesh);
	            this.actHist = new _acthist2.default(mesh, 10);
	        }
	    }, {
	        key: 'setUndoCount',
	        value: function setUndoCount(c) {
	            this.actHist.setCapacity(c);
	        }
	    }, {
	        key: 'undo',
	        value: function undo() {
	            this.actHist.undo();
	            this.meshPicked.computeWorldMatrix(true);
	            this.setLocalAxes(this.meshPicked);
	        }
	    }, {
	        key: 'redo',
	        value: function redo() {
	            this.actHist.redo();
	            this.meshPicked.computeWorldMatrix(true);
	            this.setLocalAxes(this.meshPicked);
	        }
	    }, {
	        key: 'detach',
	        value: function detach() {
	            this.canvas.removeEventListener('pointerdown', this.pointerdown, false);
	            this.canvas.removeEventListener('pointerup', this.pointerup, false);
	            this.canvas.removeEventListener('pointermove', this.pointermove, false);
	            this.scene.unregisterBeforeRender(this.renderer);
	            this.disposeAll();
	        }
	    }, {
	        key: 'disposeAll',
	        value: function disposeAll() {
	            this.theParent.dispose();
	            this.disposeMaterials();
	            this.actHist = null;
	        }
	    }, {
	        key: 'onPointerDown',
	        value: function onPointerDown(evt) {
	            var _this = this;
	
	            evt.preventDefault();
	            this.pDown = true;
	
	            if (evt.button !== 0) return;
	
	            var pickResult = this.scene.pick(this.scene.pointerX, this.scene.pointerY, function (mesh) {
	                if (_this.transEnabled) {
	                    if (mesh === _this.tX || mesh === _this.tY || mesh === _this.tZ) return true;
	                }
	                if (_this.rotEnabled) {
	                    if (mesh === _this.rX || mesh === _this.rY || mesh === _this.rZ) return true;
	                }
	                if (_this.scaleEnabled) {
	                    if (mesh === _this.sX || mesh === _this.sY || mesh === _this.sZ || mesh === _this.sAll) return true;
	                }
	                return false;
	            }, null, this.mainCamera);
	
	            if (pickResult.hit) {
	                this.setAxisVisiblity(0);
	                this.axisPicked = pickResult.pickedMesh;
	                this.axisPicked.getChildren()[0].visibility = 1;
	
	                var name = this.axisPicked.name;
	
	                if (name === 'X') this.bXaxis.visibility = 1;
	                if (name === 'Y') this.bYaxis.visibility = 1;
	                if (name === 'Z') this.bZaxis.visibility = 1;
	                if (name === 'ALL') {
	                    this.bXaxis.visibility = 1;
	                    this.bYaxis.visibility = 1;
	                    this.bZaxis.visibility = 1;
	                }
	
	                this.editing = true;
	                this.prevPos = this.getPosOnPickPlane();
	
	                window.setTimeout(this.detachControl.bind(this), 0, this.mainCamera, this.canvas);
	            }
	        }
	    }, {
	        key: 'isEditing',
	        value: function isEditing() {
	            return this.editing;
	        }
	    }, {
	        key: 'detachControl',
	        value: function detachControl(cam, can) {
	            var camera = cam;
	            var canvas = can;
	
	            camera.detachControl(canvas);
	        }
	    }, {
	        key: 'onPointerOver',
	        value: function onPointerOver() {
	            var _this2 = this;
	
	            if (this.pDown) return;
	
	            var pickResult = this.scene.pick(this.scene.pointerX, this.scene.pointerY, function (mesh) {
	                if (_this2.transEnabled) {
	                    if (mesh === _this2.tX || mesh === _this2.tY || mesh === _this2.tZ) return true;
	                }
	                if (_this2.rotEnabled) {
	                    if (mesh === _this2.rX || mesh === _this2.rY || mesh === _this2.rZ) return true;
	                }
	                if (_this2.scaleEnabled) {
	                    if (mesh === _this2.sX || mesh === _this2.sY || mesh === _this2.sZ || mesh === _this2.sAll) return true;
	                }
	                return false;
	            }, null, this.mainCamera);
	
	            if (pickResult.hit) {
	                if (pickResult.pickedMesh !== this.prevOverMesh) {
	                    if (this.prevOverMesh) {
	                        this.prevOverMesh.visibility = 0;
	                        this.restoreColor(this.prevOverMesh);
	                    }
	
	                    this.prevOverMesh = pickResult.pickedMesh;
	
	                    if (this.rotEnabled) {
	                        this.prevOverMesh.getChildren()[0].color = Color3.White();
	                    } else {
	                        this.prevOverMesh.getChildren()[0].material = this.whiteMat;
	                    }
	
	                    if (this.prevOverMesh.name === 'X') {
	                        this.xaxis.color = Color3.White();
	                    }
	
	                    if (this.prevOverMesh.name === 'Y') {
	                        this.yaxis.color = Color3.White();
	                    }
	
	                    if (this.prevOverMesh.name === 'Z') {
	                        this.zaxis.color = Color3.White();
	                    }
	                }
	            } else {
	                if (this.prevOverMesh) {
	                    this.restore(this.prevOverMesh);
	                    this.prevOverMesh = null;
	                }
	            }
	        }
	    }, {
	        key: 'restoreColor',
	        value: function restoreColor(mesh) {
	            var col = void 0,
	                mat = void 0;
	
	            if (mesh.name === 'X') {
	                col = Color3.Red();
	                mat = this.redMat;
	                this.xaxis.color = Color3.Red();
	            } else if (this.prevOverMesh.name === 'Y') {
	                col = Color3.Green();
	                mat = this.greenMat;
	                this.yaxis.color = Color3.Green();
	            } else if (this.prevOverMesh.name === 'Z') {
	                col = Color3.Blue();
	                mat = this.blueMat;
	                this.zaxis.color = Color3.Blue();
	            } else {
	                col = Color3.Yellow();
	                mat = this.yellowMat;
	            }
	
	            if (this.rotEnabled) {
	                this.prevOverMesh.getChildren()[0].color = col;
	            } else {
	                this.prevOverMesh.getChildren()[0].material = mat;
	            }
	        }
	    }, {
	        key: 'onPointerUp',
	        value: function onPointerUp(e) {
	            this.pDown = false;
	
	            if (this.editing) {
	                this.mainCamera.attachControl(this.canvas);
	                this.editing = false;
	                this.setAxisVisiblity(1);
	                this.hideBaxis();
	                this.restoreColor(this.prevOverMesh);
	                this.prevOverMesh = null;
	                this.actHist.add();
	            }
	        }
	    }, {
	        key: 'onPointerMove',
	        value: function onPointerMove() {
	            if (!this.pDown || !this.ediging) return;
	
	            var newPos = this.getPosOnPickPlane();
	
	            if (!newPos) return;
	
	            if (this.transEnabled) this.doTranslation(newPos);
	
	            if (this.scaleEnabled && this.local) this.doScaling(newPos);
	
	            if (this.rotEnabled) this.doRotation(newPos);
	
	            this.prevPos = newPos;
	        }
	    }, {
	        key: 'doTranslation',
	        value: function doTranslation(newPos) {
	            var diff = newPos.subtract(this.prevPos);
	            var dl = diff.length();
	            var space = void 0;
	
	            if (this.local) space = Space.LOCAL;else space = Space.WORLD;
	
	            if (this.axisPicked === this.tX) {
	                if (this.local) dl = Vector3.Dot(diff, this.localX) / (this.localX.length() * this.meshPicked.scaling.x);else dl = diff.x;
	
	                if (this.snapT) {
	                    this.snapX += dl;
	                    dl = 0;
	                    var scale = 1;
	
	                    if (this.local) scale = this.meshPicked.scaling.x;
	                    if (Math.abs(this.snapX) > this.transSnap / scale) {
	                        if (this.snapX > 0) dl = this.transSnap / scale;else dl = -this.transSnap / scale;
	
	                        this.snapX = 0;
	                    }
	                }
	
	                if (this.local) this.meshPicked.translate(Axis.X, dl, space);else this.meshPicked.position.x += dl;
	            }
	            if (this.axisPicked === this.tY) {
	                if (this.local) dl = Vector3.Dot(diff, this.localY) / (this.localY.length() * this.meshPicked.scaling.y);else dl = diff.y;
	
	                if (this.snapT) {
	                    this.snapY += dl;
	                    dl = 0;
	                    var _scale = 1;
	
	                    if (this.local) _scale = this.meshPicked.scaling.y;
	                    if (Math.abs(this.snapY) > this.transSnap / _scale) {
	                        if (this.snapY > 0) dl = this.transSnap / _scale;else dl = -this.transSnap / _scale;
	
	                        this.snapY = 0;
	                    }
	                }
	
	                if (this.local) this.meshPicked.translate(Axis.Y, dl, space);else this.meshPicked.position.y += dl;
	            }
	            if (this.axisPicked === this.tZ) {
	                if (this.local) dl = Vector3.Dot(diff, this.localZ) / (this.localZ.length() * this.meshPicked.scaling.z);else dl = diff.z;
	
	                if (this.snapT) {
	                    this.snapZ += dl;
	                    dl = 0;
	                    var _scale2 = 1;
	
	                    if (this.local) _scale2 = this.meshPicked.scaling.z;
	                    if (Math.abs(this.snapZ) > this.transSnap / _scale2) {
	                        if (this.snapZ > 0) dl = this.transSnap / _scale2;else dl = -this.transSnap / _scale2;
	
	                        this.snapZ = 0;
	                    }
	                }
	
	                if (this.local) this.meshPicked.translate(Axis.Z, dl, space);else this.meshPicked.position.z += dl;
	            }
	        }
	    }, {
	        key: 'doScaling',
	        value: function doScaling(newPos) {
	            var ppm = this.prevPos.subtract(this.meshPicked.position);
	            var diff = newPos.subtract(prevPos);
	            var r = diff.length() / ppm.length();
	
	            if (this.axisPicked === this.sX) {
	                var dot = Vector3.Dot(diff, this.localX);
	                if (dot >= 0) this.meshPicked.scaling.x *= 1 + r;else this.meshPicked.scaling.x *= 1 - r;
	            }
	
	            if (this.axisPicked === this.sY) {
	                var _dot = Vector3.Dot(diff, this.localY);
	                if (_dot >= 0) this.meshPicked.scaling.y *= 1 + r;else this.meshPicked.scaling.y *= 1 - r;
	            }
	
	            if (this.axisPicked === this.sZ) {
	                var _dot2 = Vector3.Dot(diff, this.localZ);
	                if (_dot2 >= 0) this.meshPicked.scaling.z *= 1 + r;else this.meshPicked.scaling.z *= 1 - r;
	            }
	
	            if (this.axisPicked === this.sAll) {
	                var _dot3 = Vector3.Dot(diff, this.mainCamera.upVector);
	                r = diff.length() / 5;
	
	                if (_dot3 < 0) {
	                    r = -1;
	                }
	
	                this.meshPicked.scaling.x *= 1 + r;
	                this.meshPicked.scaling.y *= 1 + r;
	                this.meshPicked.scaling.z *= 1 + r;
	            }
	        }
	    }, {
	        key: 'doRotation',
	        value: function doRotation(newPos) {
	            var cN = Vector3.TransformNormal(Axis.Z, this.mainCamera.getWorldMatrix());
	
	            if (this.axisPicked === this.rX) {
	                var angle = this.getAngle(this.prevPos, newPos, this.meshPicked.position, cN);
	
	                if (this.snapR) {
	                    this.snapRX += angle;
	                    angle = 0;
	
	                    if (Math.abs(this.snapRX) >= this.rotSnap) {
	                        if (this.snapRX > 0) this.angle = this.rotSnap;else angle = -this.rotSnap;
	
	                        this.snapRX = 0;
	                    }
	                }
	
	                if (this.local) {
	                    if (Vector3.Dot(this.localX, cN) < 0) angle = -1 * angle;
	
	                    this.meshPicked.rotate(Axis.X, angle, Space.LOCAL);
	                } else this.meshPicked.rotate(new Vector3(cN.x, 0, 0), angle, Space.WORLD);
	
	                this.setLocalAxes(this.meshPicked);
	            }
	            if (this.axisPicked === this.rY) {
	                var _angle = this.getAngle(this.prevPos, newPos, this.meshPicked.position, cN);
	
	                if (this.snapR) {
	                    this.snapRY += _angle;
	                    _angle = 0;
	
	                    if (Math.abs(this.snapRY) >= this.rotSnap) {
	                        if (this.snapRY > 0) _angle = this.rotSnap;else _angle = -this.rotSnap;
	
	                        this.snapRY = 0;
	                    }
	                }
	
	                if (this.local) {
	                    if (Vector3.Dot(this.localY, cN) < 0) _angle = -1 * _angle;
	
	                    this.meshPicked.rotate(Axis.Y, _angle, Space.LOCAL);
	                } else this.meshPicked.rotate(new Vector3(0, cN.y, 0), _angle, Space.WORLD);
	
	                this.setLocalAxes(this.meshPicked);
	            }
	
	            if (this.axisPicked === this.rZ) {
	                var _angle2 = this.getAngle(this.prevPos, newPos, this.meshPicked.position, cN);
	
	                if (this.snapR) {
	                    this.snapRZ += _angle2;
	                    _angle2 = 0;
	
	                    if (Math.abs(this.snapRZ) >= this.rotSnap) {
	                        if (this.snapRZ > 0) _angle2 = this.rotSnap;else _angle2 = -this.rotSnap;
	
	                        this.snapRZ = 0;
	                    }
	                }
	
	                if (this.local) {
	                    if (Vector3.Dot(this.localZ, cN) < 0) _angle2 = -1 * _angle2;
	                    this.meshPicked.rotate(Axis.Z, _angle2, Space.LOCAL);
	                } else this.meshPicked.rotate(new Vector3(0, 0, cN.z), _angle2, Space.WORLD);
	
	                this.setLocalAxes(this.meshPicked);
	            }
	
	            this.meshPicked.rotation = this.meshPicked.rotationQuaternion.toEulerAngles();
	        }
	    }, {
	        key: 'getPosOnPickPlane',
	        value: function getPosOnPickPlane() {
	            var _this3 = this;
	
	            var pickinfo = this.scene.pick(this.scene.pointerX, this.scene.pointerY, function (mesh) {
	                return mesh === _this3.pickPlane;
	            }, null, this.mainCamera);
	
	            if (pickinfo.hit) {
	                return pickinfo.pickedPoint;
	            }
	
	            return null;
	        }
	    }, {
	        key: 'hideBaxis',
	        value: function hideBaxis() {
	            this.bXaxis.visibility = 0;
	            this.bYaxis.visibility = 0;
	            this.bZaxis.visibility = 0;
	        }
	    }, {
	        key: 'setAxisVisiblity',
	        value: function setAxisVisiblity(v) {
	            if (this.transEnabled) {
	                this.tEndX.visibility = v;
	                this.tEndY.visibility = v;
	                this.tEndZ.visibility = v;
	            }
	
	            if (this.rotEnabled) {
	                this.rEndX.visibility = v;
	                this.rEndY.visibility = v;
	                this.rEndZ.visibility = v;
	            }
	
	            if (this.scaleEnabled) {
	                this.sEndX.visibility = v;
	                this.sEndY.visibility = v;
	                this.sEndZ.visibility = v;
	                this.sEndAll.visibility = v;
	            }
	        }
	    }, {
	        key: 'isTranslationEnabled',
	        value: function isTranslationEnabled() {
	            return this.transEnabled;
	        }
	    }, {
	        key: 'enableTranslation',
	        value: function enableTranslation() {
	            if (!this.tX) {
	                this.createTransAxes();
	                this.tCtl.parent = this.theParent;
	            }
	
	            if (!this.transEnabled) {
	                this.tEndX.visibility = 1;
	                this.tEndY.visibility = 1;
	                this.tEndZ.visibility = 1;
	                this.transEnabled = true;
	
	                this.disableRotation();
	                this.disableScaling();
	            }
	        }
	    }, {
	        key: 'disableTranslation',
	        value: function disableTranslation() {
	            if (this.transEnabled) {
	                this.tEndX.visibility = 0;
	                this.tEndY.visibility = 0;
	                this.tEndZ.visibility = 0;
	                this.transEnabled = false;
	            }
	        }
	    }, {
	        key: 'isRotationEnabled',
	        value: function isRotationEnabled() {
	            return this.rotEnabled;
	        }
	    }, {
	        key: 'enableRotation',
	        value: function enableRotation() {
	            if (!this.rX) {
	                this.createRotAxes();
	                this.rCtl.parent = this.theParent;
	            }
	
	            if (!this.rotEnabled) {
	                this.rEndX.visibility = 1;
	                this.rEndY.visibility = 1;
	                this.rEndZ.visibility = 1;
	                this.rotEnabled = true;
	
	                this.disableTranslation();
	                this.disableScaling();
	            }
	        }
	    }, {
	        key: 'disableRotation',
	        value: function disableRotation() {
	            if (this.rotEnabled) {
	                this.rEndX.visibility = 0;
	                this.rEndY.visibility = 0;
	                this.rEndZ.visibility = 0;
	                this.rotEnabled = false;
	            }
	        }
	    }, {
	        key: 'isScaleEnabled',
	        value: function isScaleEnabled() {
	            return this.scaleEnabled;
	        }
	    }, {
	        key: 'enableScaling',
	        value: function enableScaling() {
	            if (!this.sX) {
	                this.createScaleAxes();
	                this.sCtl.parent = this.theParent;
	            }
	
	            if (!this.scaleEnabled) {
	                this.sEndX.visibility = 1;
	                this.sEndY.visibility = 1;
	                this.sEndZ.visibility = 1;
	                this.sEndAll.visibility = 1;
	                this.scaleEnabled = true;
	
	                this.disableTranslation();
	                this.disableRotation();
	            }
	        }
	    }, {
	        key: 'disableScaling',
	        value: function disableScaling() {
	            if (this.scaleEnabled) {
	                this.sEndX.visibility = 0;
	                this.sEndY.visibility = 0;
	                this.sEndZ.visibility = 0;
	                this.sEndAll.visibility = 0;
	                this.scaleEnabled = false;
	            }
	        }
	    }, {
	        key: 'createGuideAxes',
	        value: function createGuideAxes() {
	            var l = this.axesLen * this.axesScale;
	
	            this.guideCtl = new Mesh('guideCtl', this.scene);
	
	            this.bXaxis = Mesh.CreateLines('xAxis', [new Vector3(-100, 0, 0), new Vector3(100, 0, 0)], this.scene);
	            this.bYaxis = Mesh.CreateLines('xAxis', [new Vector3(0, -100, 0), new Vector3(0, 100, 0)], this.scene);
	            this.bZaxis = Mesh.CreateLines('zAxis', [new Vector3(0, 0, -100), new Vector3(0, 0, 100)], this.scene);
	
	            this.bXaxis.parent = this.guideCtl;
	            this.bYaxis.parent = this.guideCtl;
	            this.bZaxis.parent = this.guideCtl;
	
	            this.bXaxis.color = Color3.Red();
	            this.bYaxis.color = Color3.Green();
	            this.bZaxis.color = Color3.Blue();
	
	            this.bXaxis.renderingGroupId = 1;
	            this.bYaxis.renderingGroupId = 1;
	            this.bZaxis.renderingGroupId = 1;
	
	            this.hideBaxis();
	
	            this.xaxis = Mesh.CreateLines('xAxis', [new Vector3(0, 0, 0), new Vector3(l, 0, 0)], this.scene);
	            this.yaxis = Mesh.CreateLines('yAxis', [new Vector3(0, 0, 0), new Vector3(0, l, 0)], this.scene);
	            this.zaxis = Mesh.CreateLines('zAxis', [new Vector3(0, 0, 0), new Vector3(0, 0, l)], this.scene);
	
	            this.xaxis.parent = this.guideCtl;
	            this.yaxis.parent = this.guideCtl;
	            this.zaxis.parent = this.guideCtl;
	
	            this.xaxis.color = Color3.Red();
	            this.yaxis.color = Color3.Green();
	            this.zaxis.color = Color3.Blue();
	
	            this.xaxis.renderingGroupId = 2;
	            this.yaxis.renderingGroupId = 2;
	            this.zaxis.renderingGroupId = 2;
	        }
	    }, {
	        key: 'createPickPlane',
	        value: function createPickPlane() {
	            this.pickPlane = Mesh.CreatePlane('axisPlane', 200, this.scene);
	            this.pickPlane.isPickable = false;
	            this.pickPlane.visibility = 0;
	            this.pickPlane.billboardMode = Mesh.BILLBOARDMODE_ALL;
	            this.pickPlane.renderingGroupId = 1;
	        }
	    }, {
	        key: 'createTransAxes',
	        value: function createTransAxes() {
	            var r = 0.04;
	            var l = this.axesLen * this.axesScale;
	
	            this.tCtl = new Mesh('tarnsCtl', this.scene);
	
	            this.tX = this.extrudeBox(r / 2, l);
	            this.tX.name = 'X';
	            this.tY = this.tX.clone('Y');
	            this.tZ = this.tX.clone('Z');
	
	            this.tX.material = this.redMat;
	            this.tY.material = this.greenMat;
	            this.tZ.material = this.blueMat;
	
	            this.tX.parent = this.tCtl;
	            this.tY.parent = this.tCtl;
	            this.tZ.parent = this.tCtl;
	
	            this.tX.rotation.y = 1.57;
	            this.tY.rotation.x -= 1.57;
	
	            this.tX.visibility = 0;
	            this.tY.visibility = 0;
	            this.tZ.visibility = 0;
	
	            this.tX.renderingGroupId = 1;
	            this.tY.renderingGroupId = 1;
	            this.tZ.renderingGroupId = 1;
	
	            this.tX.isPickable = false;
	            this.tY.isPickable = false;
	            this.tZ.isPickable = false;
	
	            var cl = l * this.axesScale / 4;
	            var cr = r * this.axesScale;
	
	            this.tEndX = Mesh.CreateCylinder('tEndX', cl, 0, cr, 6, 1, this.scene);
	            this.tEndY = this.tEndX.clone('tEndY');
	            this.tEndZ = this.tEndX.clone('tEndZ');
	
	            this.tEndX.rotation.x = 1.57;
	            this.tEndY.rotation.x = 1.57;
	            this.tEndZ.rotation.x = 1.57;
	
	            this.tEndX.parent = this.tX;
	            this.tEndY.parent = this.tY;
	            this.tEndZ.parent = this.tZ;
	
	            this.tEndX.position.z = l - cl / 2;
	            this.tEndY.position.z = l - cl / 2;
	            this.tEndZ.position.z = l - cl / 2;
	
	            this.tEndX.material = this.redMat;
	            this.tEndY.material = this.greenMat;
	            this.tEndZ.material = this.blueMat;
	
	            this.tEndX.renderingGroupId = 1;
	            this.tEndY.renderingGroupId = 1;
	            this.tEndZ.renderingGroupId = 1;
	
	            this.tEndX.isPickable = false;
	            this.tEndY.isPickable = false;
	            this.tEndZ.isPickable = false;
	        }
	    }, {
	        key: 'createRotAxes',
	        value: function createRotAxes() {
	            var r = 0.04;
	            var d = this.axesLen * this.axesScale * 2;
	
	            this.rCtl = new Mesh('rotCtl', this.scene);
	
	            this.rX = Mesh.CreateTorus('X', d, r, 30, this.scene);
	            this.rY = rX.clone('Y');
	            this.rZ = rX.clone('Z');
	
	            this.rX.material = this.redMat;
	            this.rY.material = this.greenMat;
	            this.rZ.material = this.blueMat;
	
	            this.rX.parent = this.rCtl;
	            this.rY.parent = this.rCtl;
	            this.rZ.parent = this.rCtl;
	
	            this.rX.rotation.z -= 1.57;
	            this.rZ.rotation.x = 1.57;
	
	            this.rX.visibility = 0;
	            this.rY.visibility = 0;
	            this.rZ.visibility = 0;
	
	            this.rX.renderingGroupId = 1;
	            this.rY.renderingGroupId = 1;
	            this.rZ.renderingGroupId = 1;
	
	            this.rX.isPickable = false;
	            this.rY.isPickable = false;
	            this.rZ.isPickable = false;
	
	            var cl = d;
	
	            this.rEndX = this.createCircle(cl / 2);
	            this.rEndY = this.rEndX.clone('');
	            this.rEndZ = this.rEndX.clone('');
	
	            this.rEndX.parent = this.rX;
	            this.rEndY.parent = this.rY;
	            this.rEndZ.parent = this.rZ;
	
	            this.rEndX.rotation.x = 1.57;
	            this.rEndY.rotation.x = 1.57;
	            this.rEndZ.rotation.x = 1.57;
	
	            this.rEndX.color = Color3.Red();
	            this.rEndY.color = Color3.Green();
	            this.rEndZ.color = Color3.Blue();
	
	            this.rEndX.renderingGroupId = 1;
	            this.rEndY.renderingGroupId = 1;
	            this.rEndZ.renderingGroupId = 1;
	
	            this.rEndX.isPickable = false;
	            this.rEndY.isPickable = false;
	            this.rEndZ.isPickable = false;
	        }
	    }, {
	        key: 'extrudeBox',
	        value: function extrudeBox(w, l) {
	            var shape = [new Vector3(w, w, 0), new Vector3(-w, w, 0), new Vector3(-w, -w, 0), new Vector3(w, -w, 0), new Vector3(w, w, 0)];
	            var path = [new Vector3(0, 0, 0), new Vector3(0, 0, l)];
	            var box = Mesh.ExtrudeShape('', shape, path, 1, 0, 2, this.scene);
	
	            return box;
	        }
	    }, {
	        key: 'createCircle',
	        value: function createCircle(r) {
	            var points = [];
	            var a = Math.PI / 180;
	            var x = 0,
	                y = 0,
	                p = 0;
	
	            for (var i = 0; i <= 360; i += 10) {
	                x = r * Math.cos(i * 1);
	
	                if (i === 90) y = r;else if (i === 270) y = -r;else y = r * Math.sin(i * a);
	
	                points[p] = new Vector3(x, y, 0);
	                p++;
	            }
	
	            var circle = Mesh.CreateLines('', points, this.scene);
	
	            return circle;
	        }
	    }, {
	        key: 'createScaleAxes',
	        value: function createScaleAxes() {
	            var r = 0.04;
	            var l = this.axesLen * this.axesScale;
	
	            this.sCtl = new Mesh('sCtl', this.scene);
	            this.sAll = Mesh.CreateBox('ALL', r * 2, this.scene);
	
	            this.sX = this.extrudeBox(r / 2, l);
	            this.sX.name = 'X';
	            this.sY = this.sX.clone('Y');
	            this.sZ = this.sX.clone('Z');
	
	            this.sX.material = this.redMat;
	            this.sY.material = this.greenMat;
	            this.sZ.material = this.blueMat;
	            this.sAll.material = this.yellowMat;
	
	            this.sX.parent = this.sCtl;
	            this.sY.parent = this.sCtl;
	            this.sZ.parent = this.sCtl;
	            this.sAll.parent = this.sCtl;
	
	            this.sX.rotation.y = 1.57;
	            this.sY.rotation.x -= 1.57;
	
	            this.sX.visibility = 0;
	            this.sY.visibility = 0;
	            this.sZ.visibility = 0;
	            this.sAll.visibility = 0;
	
	            this.sX.renderingGroupId = 1;
	            this.sY.renderingGroupId = 1;
	            this.sZ.renderingGroupId = 1;
	            this.sAll.renderingGroupId = 1;
	
	            this.sX.isPickable = false;
	            this.sY.isPickable = false;
	            this.sZ.isPickable = false;
	            this.sAll.isPickable = false;
	
	            var cr = r * this.axesScale;
	
	            this.sEndX = Mesh.CreateBox('', cr, this.scene);
	            this.sEndY = sEndX.clone('');
	            this.sEndZ = sEndX.clone('');
	            this.sEndAll = sEndX.clone('');
	
	            this.sEndX.parent = this.sX;
	            this.sEndY.parent = this.sY;
	            this.sEndZ.parent = this.sZ;
	            this.sEndAll.parent = this.sAll;
	
	            this.sEndX.position.z = l - cr / 2;
	            this.sEndY.position.z = l - cr / 2;
	            this.sEndZ.position.z = l - cr / 2;
	
	            this.sEndX.material = this.redMat;
	            this.sEndY.material = this.greenMat;
	            this.sEndZ.material = this.blueMat;
	            this.sEndAll.material = this.yellowMat;
	
	            this.sEndX.renderingGroupId = 1;
	            this.sEndY.renderingGroupId = 1;
	            this.sEndZ.renderingGroupId = 1;
	            this.sEndAll.renderingGroupId = 1;
	
	            this.sEndX.isPickable = false;
	            this.sEndY.isPickable = false;
	            this.sEndZ.isPickable = false;
	            this.sEndAll.isPickable = false;
	        }
	    }, {
	        key: 'setLocalAxes',
	        value: function setLocalAxes(mesh) {
	            var meshMatrix = mesh.getWorldMatrix();
	            var pos = mesh.position;
	
	            this.localX = Vector3.TransformCoordinates(Axis.X, meshMatrix).subtract(pos);
	            this.localY = Vector3.TransformCoordinates(Axis.Y, meshMatrix).subtract(pos);
	            this.localZ = Vector3.TransformCoordinates(Axis.Z, meshMatrix).subtract(pos);
	            this.localRot = Vector3.RotationFromAxis(this.localX, this.localY, this.localZ);
	
	            if (this.local) this.theParent.rotation.copyFrom(this.localRot);
	        }
	    }, {
	        key: 'setLocal',
	        value: function setLocal(l) {
	            if (this.local === l) return;
	
	            this.local = l;
	
	            if (this.local) this.theParent.rotation.copyFrom(this.localRot);else this.theParent.rotation.copyFrom(Vector3.Zero());
	        }
	    }, {
	        key: 'isLocal',
	        value: function isLocal() {
	            return this.local;
	        }
	    }, {
	        key: 'setTransSnap',
	        value: function setTransSnap(s) {
	            this.snapT = s;
	        }
	    }, {
	        key: 'setRotSnap',
	        value: function setRotSnap(s) {
	            this.snapR = s;
	        }
	    }, {
	        key: 'setTransSnapValue',
	        value: function setTransSnapValue(t) {
	            this.transSnap = t;
	        }
	    }, {
	        key: 'setRotSnapValue',
	        value: function setRotSnapValue(r) {
	            this.rotSnap = r;
	        }
	    }, {
	        key: 'setAxesScale',
	        value: function setAxesScale() {
	            var distFromCamera = 2;
	            var toParent = this.theParent.position.subtract(this.mainCamera.position);
	            var cameraNormal = Vector3.TransformNormal(Axis.Z, this.mainCamera.getWorldMatrix());
	            var parentOnNormal = Vector3.Dot(toParent, cameraNormal) / cameraNormal.length();
	            var s = parentOnNormal / distFromCamera;
	            var scale = new Vector3(s, s, s);
	
	            this.theParent.scaling = scale;
	        }
	    }, {
	        key: 'getAngle',
	        value: function getAngle(p1, p2, p, cN) {
	            var v1 = p1.subtract(p);
	            var v2 = p2.subtract(p);
	            var n = Vector3.Cross(v1, v2);
	            var angle = Math.asin(n.length() / (v1.length() * v2.length()));
	
	            if (Vector3.Dot(n, cN) < 0) {
	                angle = -1 * angle;
	            }
	
	            return angle;
	        }
	    }, {
	        key: 'createMaterials',
	        value: function createMaterials(scene) {
	            this.redMat = this.getStandardMaterial('redMat', Color3.Red(), scene);
	            this.greenMat = this.getStandardMaterial('greenMat', Color3.Green(), scene);
	            this.blueMat = this.getStandardMaterial('blueMat', Color3.Blue(), scene);
	            this.whiteMat = this.getStandardMaterial('whiteMat', Color3.White(), scene);
	            this.yellowMat = this.getStandardMaterial('whiteMat', Color3.Yellow(), scene);
	        }
	    }, {
	        key: 'disposeMaterials',
	        value: function disposeMaterials() {
	            this.redMat.dispose();
	            this.greenMat.dispose();
	            this.blueMat.dispose();
	            this.whiteMat.dispose();
	            this.yellowMat.dispose();
	        }
	    }, {
	        key: 'getStandardMaterial',
	        value: function getStandardMaterial(name, col, scene) {
	            var mat = new StandardMaterial(name, scene);
	            mat.emissiveColor = col;
	            mat.diffuseColor = Color3.Black();
	            mat.specularColor = Color3.Black();
	
	            return mat;
	        }
	    }]);
	
	    return EditControl;
	}();

	exports.default = EditControl;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	/*!
	 * PEP v0.4.1 | https://github.com/jquery/PEP
	 * Copyright jQuery Foundation and other contributors | http://jquery.org/license
	 */
	(function (global, factory) {
	  ( false ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' ? module.exports = factory() :  true ? !(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : global.PointerEventsPolyfill = factory();
	})(undefined, function () {
	  'use strict';
	
	  /**
	   * This is the constructor for new PointerEvents.
	   *
	   * New Pointer Events must be given a type, and an optional dictionary of
	   * initialization properties.
	   *
	   * Due to certain platform requirements, events returned from the constructor
	   * identify as MouseEvents.
	   *
	   * @constructor
	   * @param {String} inType The type of the event to create.
	   * @param {Object} [inDict] An optional dictionary of initial event properties.
	   * @return {Event} A new PointerEvent of type `inType`, initialized with properties from `inDict`.
	   */
	
	  var MOUSE_PROPS = ['bubbles', 'cancelable', 'view', 'detail', 'screenX', 'screenY', 'clientX', 'clientY', 'ctrlKey', 'altKey', 'shiftKey', 'metaKey', 'button', 'relatedTarget', 'pageX', 'pageY'];
	
	  var MOUSE_DEFAULTS = [false, false, null, null, 0, 0, 0, 0, false, false, false, false, 0, null, 0, 0];
	
	  function PointerEvent(inType, inDict) {
	    inDict = inDict || Object.create(null);
	
	    var e = document.createEvent('Event');
	    e.initEvent(inType, inDict.bubbles || false, inDict.cancelable || false);
	
	    // define inherited MouseEvent properties
	    // skip bubbles and cancelable since they're set above in initEvent()
	    for (var i = 2, p; i < MOUSE_PROPS.length; i++) {
	      p = MOUSE_PROPS[i];
	      e[p] = inDict[p] || MOUSE_DEFAULTS[i];
	    }
	    e.buttons = inDict.buttons || 0;
	
	    // Spec requires that pointers without pressure specified use 0.5 for down
	    // state and 0 for up state.
	    var pressure = 0;
	    if (inDict.pressure) {
	      pressure = inDict.pressure;
	    } else {
	      pressure = e.buttons ? 0.5 : 0;
	    }
	
	    // add x/y properties aliased to clientX/Y
	    e.x = e.clientX;
	    e.y = e.clientY;
	
	    // define the properties of the PointerEvent interface
	    e.pointerId = inDict.pointerId || 0;
	    e.width = inDict.width || 0;
	    e.height = inDict.height || 0;
	    e.pressure = pressure;
	    e.tiltX = inDict.tiltX || 0;
	    e.tiltY = inDict.tiltY || 0;
	    e.pointerType = inDict.pointerType || '';
	    e.hwTimestamp = inDict.hwTimestamp || 0;
	    e.isPrimary = inDict.isPrimary || false;
	    return e;
	  }
	
	  var _PointerEvent = PointerEvent;
	
	  /**
	   * This module implements a map of pointer states
	   */
	  var USE_MAP = window.Map && window.Map.prototype.forEach;
	  var PointerMap = USE_MAP ? Map : SparseArrayMap;
	
	  function SparseArrayMap() {
	    this.array = [];
	    this.size = 0;
	  }
	
	  SparseArrayMap.prototype = {
	    set: function set(k, v) {
	      if (v === undefined) {
	        return this.delete(k);
	      }
	      if (!this.has(k)) {
	        this.size++;
	      }
	      this.array[k] = v;
	    },
	    has: function has(k) {
	      return this.array[k] !== undefined;
	    },
	    delete: function _delete(k) {
	      if (this.has(k)) {
	        delete this.array[k];
	        this.size--;
	      }
	    },
	    get: function get(k) {
	      return this.array[k];
	    },
	    clear: function clear() {
	      this.array.length = 0;
	      this.size = 0;
	    },
	
	    // return value, key, map
	    forEach: function forEach(callback, thisArg) {
	      return this.array.forEach(function (v, k) {
	        callback.call(thisArg, v, k, this);
	      }, this);
	    }
	  };
	
	  var _pointermap = PointerMap;
	
	  var CLONE_PROPS = [
	
	  // MouseEvent
	  'bubbles', 'cancelable', 'view', 'detail', 'screenX', 'screenY', 'clientX', 'clientY', 'ctrlKey', 'altKey', 'shiftKey', 'metaKey', 'button', 'relatedTarget',
	
	  // DOM Level 3
	  'buttons',
	
	  // PointerEvent
	  'pointerId', 'width', 'height', 'pressure', 'tiltX', 'tiltY', 'pointerType', 'hwTimestamp', 'isPrimary',
	
	  // event instance
	  'type', 'target', 'currentTarget', 'which', 'pageX', 'pageY', 'timeStamp'];
	
	  var CLONE_DEFAULTS = [
	
	  // MouseEvent
	  false, false, null, null, 0, 0, 0, 0, false, false, false, false, 0, null,
	
	  // DOM Level 3
	  0,
	
	  // PointerEvent
	  0, 0, 0, 0, 0, 0, '', 0, false,
	
	  // event instance
	  '', null, null, 0, 0, 0, 0];
	
	  var BOUNDARY_EVENTS = {
	    'pointerover': 1,
	    'pointerout': 1,
	    'pointerenter': 1,
	    'pointerleave': 1
	  };
	
	  var HAS_SVG_INSTANCE = typeof SVGElementInstance !== 'undefined';
	
	  /**
	   * This module is for normalizing events. Mouse and Touch events will be
	   * collected here, and fire PointerEvents that have the same semantics, no
	   * matter the source.
	   * Events fired:
	   *   - pointerdown: a pointing is added
	   *   - pointerup: a pointer is removed
	   *   - pointermove: a pointer is moved
	   *   - pointerover: a pointer crosses into an element
	   *   - pointerout: a pointer leaves an element
	   *   - pointercancel: a pointer will no longer generate events
	   */
	  var dispatcher = {
	    pointermap: new _pointermap(),
	    eventMap: Object.create(null),
	    captureInfo: Object.create(null),
	
	    // Scope objects for native events.
	    // This exists for ease of testing.
	    eventSources: Object.create(null),
	    eventSourceList: [],
	    /**
	     * Add a new event source that will generate pointer events.
	     *
	     * `inSource` must contain an array of event names named `events`, and
	     * functions with the names specified in the `events` array.
	     * @param {string} name A name for the event source
	     * @param {Object} source A new source of platform events.
	     */
	    registerSource: function registerSource(name, source) {
	      var s = source;
	      var newEvents = s.events;
	      if (newEvents) {
	        newEvents.forEach(function (e) {
	          if (s[e]) {
	            this.eventMap[e] = s[e].bind(s);
	          }
	        }, this);
	        this.eventSources[name] = s;
	        this.eventSourceList.push(s);
	      }
	    },
	    register: function register(element) {
	      var l = this.eventSourceList.length;
	      for (var i = 0, es; i < l && (es = this.eventSourceList[i]); i++) {
	
	        // call eventsource register
	        es.register.call(es, element);
	      }
	    },
	    unregister: function unregister(element) {
	      var l = this.eventSourceList.length;
	      for (var i = 0, es; i < l && (es = this.eventSourceList[i]); i++) {
	
	        // call eventsource register
	        es.unregister.call(es, element);
	      }
	    },
	    contains: /*scope.external.contains || */function contains(container, contained) {
	      try {
	        return container.contains(contained);
	      } catch (ex) {
	
	        // most likely: https://bugzilla.mozilla.org/show_bug.cgi?id=208427
	        return false;
	      }
	    },
	
	    // EVENTS
	    down: function down(inEvent) {
	      inEvent.bubbles = true;
	      this.fireEvent('pointerdown', inEvent);
	    },
	    move: function move(inEvent) {
	      inEvent.bubbles = true;
	      this.fireEvent('pointermove', inEvent);
	    },
	    up: function up(inEvent) {
	      inEvent.bubbles = true;
	      this.fireEvent('pointerup', inEvent);
	    },
	    enter: function enter(inEvent) {
	      inEvent.bubbles = false;
	      this.fireEvent('pointerenter', inEvent);
	    },
	    leave: function leave(inEvent) {
	      inEvent.bubbles = false;
	      this.fireEvent('pointerleave', inEvent);
	    },
	    over: function over(inEvent) {
	      inEvent.bubbles = true;
	      this.fireEvent('pointerover', inEvent);
	    },
	    out: function out(inEvent) {
	      inEvent.bubbles = true;
	      this.fireEvent('pointerout', inEvent);
	    },
	    cancel: function cancel(inEvent) {
	      inEvent.bubbles = true;
	      this.fireEvent('pointercancel', inEvent);
	    },
	    leaveOut: function leaveOut(event) {
	      this.out(event);
	      if (!this.contains(event.target, event.relatedTarget)) {
	        this.leave(event);
	      }
	    },
	    enterOver: function enterOver(event) {
	      this.over(event);
	      if (!this.contains(event.target, event.relatedTarget)) {
	        this.enter(event);
	      }
	    },
	
	    // LISTENER LOGIC
	    eventHandler: function eventHandler(inEvent) {
	
	      // This is used to prevent multiple dispatch of pointerevents from
	      // platform events. This can happen when two elements in different scopes
	      // are set up to create pointer events, which is relevant to Shadow DOM.
	      if (inEvent._handledByPE) {
	        return;
	      }
	      var type = inEvent.type;
	      var fn = this.eventMap && this.eventMap[type];
	      if (fn) {
	        fn(inEvent);
	      }
	      inEvent._handledByPE = true;
	    },
	
	    // set up event listeners
	    listen: function listen(target, events) {
	      events.forEach(function (e) {
	        this.addEvent(target, e);
	      }, this);
	    },
	
	    // remove event listeners
	    unlisten: function unlisten(target, events) {
	      events.forEach(function (e) {
	        this.removeEvent(target, e);
	      }, this);
	    },
	    addEvent: /*scope.external.addEvent || */function addEvent(target, eventName) {
	      target.addEventListener(eventName, this.boundHandler);
	    },
	    removeEvent: /*scope.external.removeEvent || */function removeEvent(target, eventName) {
	      target.removeEventListener(eventName, this.boundHandler);
	    },
	
	    // EVENT CREATION AND TRACKING
	    /**
	     * Creates a new Event of type `inType`, based on the information in
	     * `inEvent`.
	     *
	     * @param {string} inType A string representing the type of event to create
	     * @param {Event} inEvent A platform event with a target
	     * @return {Event} A PointerEvent of type `inType`
	     */
	    makeEvent: function makeEvent(inType, inEvent) {
	
	      // relatedTarget must be null if pointer is captured
	      if (this.captureInfo[inEvent.pointerId]) {
	        inEvent.relatedTarget = null;
	      }
	      var e = new _PointerEvent(inType, inEvent);
	      if (inEvent.preventDefault) {
	        e.preventDefault = inEvent.preventDefault;
	      }
	      e._target = e._target || inEvent.target;
	      return e;
	    },
	
	    // make and dispatch an event in one call
	    fireEvent: function fireEvent(inType, inEvent) {
	      var e = this.makeEvent(inType, inEvent);
	      return this.dispatchEvent(e);
	    },
	    /**
	     * Returns a snapshot of inEvent, with writable properties.
	     *
	     * @param {Event} inEvent An event that contains properties to copy.
	     * @return {Object} An object containing shallow copies of `inEvent`'s
	     *    properties.
	     */
	    cloneEvent: function cloneEvent(inEvent) {
	      var eventCopy = Object.create(null);
	      var p;
	      for (var i = 0; i < CLONE_PROPS.length; i++) {
	        p = CLONE_PROPS[i];
	        eventCopy[p] = inEvent[p] || CLONE_DEFAULTS[i];
	
	        // Work around SVGInstanceElement shadow tree
	        // Return the <use> element that is represented by the instance for Safari, Chrome, IE.
	        // This is the behavior implemented by Firefox.
	        if (HAS_SVG_INSTANCE && (p === 'target' || p === 'relatedTarget')) {
	          if (eventCopy[p] instanceof SVGElementInstance) {
	            eventCopy[p] = eventCopy[p].correspondingUseElement;
	          }
	        }
	      }
	
	      // keep the semantics of preventDefault
	      if (inEvent.preventDefault) {
	        eventCopy.preventDefault = function () {
	          inEvent.preventDefault();
	        };
	      }
	      return eventCopy;
	    },
	    getTarget: function getTarget(inEvent) {
	      var capture = this.captureInfo[inEvent.pointerId];
	      if (!capture) {
	        return inEvent._target;
	      }
	      if (inEvent._target === capture || !(inEvent.type in BOUNDARY_EVENTS)) {
	        return capture;
	      }
	    },
	    setCapture: function setCapture(inPointerId, inTarget) {
	      if (this.captureInfo[inPointerId]) {
	        this.releaseCapture(inPointerId);
	      }
	      this.captureInfo[inPointerId] = inTarget;
	      var e = document.createEvent('Event');
	      e.initEvent('gotpointercapture', true, false);
	      e.pointerId = inPointerId;
	      this.implicitRelease = this.releaseCapture.bind(this, inPointerId);
	      document.addEventListener('pointerup', this.implicitRelease);
	      document.addEventListener('pointercancel', this.implicitRelease);
	      e._target = inTarget;
	      this.asyncDispatchEvent(e);
	    },
	    releaseCapture: function releaseCapture(inPointerId) {
	      var t = this.captureInfo[inPointerId];
	      if (t) {
	        var e = document.createEvent('Event');
	        e.initEvent('lostpointercapture', true, false);
	        e.pointerId = inPointerId;
	        this.captureInfo[inPointerId] = undefined;
	        document.removeEventListener('pointerup', this.implicitRelease);
	        document.removeEventListener('pointercancel', this.implicitRelease);
	        e._target = t;
	        this.asyncDispatchEvent(e);
	      }
	    },
	    /**
	     * Dispatches the event to its target.
	     *
	     * @param {Event} inEvent The event to be dispatched.
	     * @return {Boolean} True if an event handler returns true, false otherwise.
	     */
	    dispatchEvent: /*scope.external.dispatchEvent || */function dispatchEvent(inEvent) {
	      var t = this.getTarget(inEvent);
	      if (t) {
	        return t.dispatchEvent(inEvent);
	      }
	    },
	    asyncDispatchEvent: function asyncDispatchEvent(inEvent) {
	      requestAnimationFrame(this.dispatchEvent.bind(this, inEvent));
	    }
	  };
	  dispatcher.boundHandler = dispatcher.eventHandler.bind(dispatcher);
	
	  var _dispatcher = dispatcher;
	
	  var targeting = {
	    shadow: function shadow(inEl) {
	      if (inEl) {
	        return inEl.shadowRoot || inEl.webkitShadowRoot;
	      }
	    },
	    canTarget: function canTarget(shadow) {
	      return shadow && Boolean(shadow.elementFromPoint);
	    },
	    targetingShadow: function targetingShadow(inEl) {
	      var s = this.shadow(inEl);
	      if (this.canTarget(s)) {
	        return s;
	      }
	    },
	    olderShadow: function olderShadow(shadow) {
	      var os = shadow.olderShadowRoot;
	      if (!os) {
	        var se = shadow.querySelector('shadow');
	        if (se) {
	          os = se.olderShadowRoot;
	        }
	      }
	      return os;
	    },
	    allShadows: function allShadows(element) {
	      var shadows = [];
	      var s = this.shadow(element);
	      while (s) {
	        shadows.push(s);
	        s = this.olderShadow(s);
	      }
	      return shadows;
	    },
	    searchRoot: function searchRoot(inRoot, x, y) {
	      if (inRoot) {
	        var t = inRoot.elementFromPoint(x, y);
	        var st, sr;
	
	        // is element a shadow host?
	        sr = this.targetingShadow(t);
	        while (sr) {
	
	          // find the the element inside the shadow root
	          st = sr.elementFromPoint(x, y);
	          if (!st) {
	
	            // check for older shadows
	            sr = this.olderShadow(sr);
	          } else {
	
	            // shadowed element may contain a shadow root
	            var ssr = this.targetingShadow(st);
	            return this.searchRoot(ssr, x, y) || st;
	          }
	        }
	
	        // light dom element is the target
	        return t;
	      }
	    },
	    owner: function owner(element) {
	      var s = element;
	
	      // walk up until you hit the shadow root or document
	      while (s.parentNode) {
	        s = s.parentNode;
	      }
	
	      // the owner element is expected to be a Document or ShadowRoot
	      if (s.nodeType !== Node.DOCUMENT_NODE && s.nodeType !== Node.DOCUMENT_FRAGMENT_NODE) {
	        s = document;
	      }
	      return s;
	    },
	    findTarget: function findTarget(inEvent) {
	      var x = inEvent.clientX;
	      var y = inEvent.clientY;
	
	      // if the listener is in the shadow root, it is much faster to start there
	      var s = this.owner(inEvent.target);
	
	      // if x, y is not in this root, fall back to document search
	      if (!s.elementFromPoint(x, y)) {
	        s = document;
	      }
	      return this.searchRoot(s, x, y);
	    }
	  };
	
	  /**
	   * This module uses Mutation Observers to dynamically adjust which nodes will
	   * generate Pointer Events.
	   *
	   * All nodes that wish to generate Pointer Events must have the attribute
	   * `touch-action` set to `none`.
	   */
	  var forEach = Array.prototype.forEach.call.bind(Array.prototype.forEach);
	  var map = Array.prototype.map.call.bind(Array.prototype.map);
	  var toArray = Array.prototype.slice.call.bind(Array.prototype.slice);
	  var filter = Array.prototype.filter.call.bind(Array.prototype.filter);
	  var MO = window.MutationObserver || window.WebKitMutationObserver;
	  var SELECTOR = '[touch-action]';
	  var OBSERVER_INIT = {
	    subtree: true,
	    childList: true,
	    attributes: true,
	    attributeOldValue: true,
	    attributeFilter: ['touch-action']
	  };
	
	  function Installer(add, remove, changed, binder) {
	    this.addCallback = add.bind(binder);
	    this.removeCallback = remove.bind(binder);
	    this.changedCallback = changed.bind(binder);
	    if (MO) {
	      this.observer = new MO(this.mutationWatcher.bind(this));
	    }
	  }
	
	  Installer.prototype = {
	    watchSubtree: function watchSubtree(target) {
	
	      // Only watch scopes that can target find, as these are top-level.
	      // Otherwise we can see duplicate additions and removals that add noise.
	      //
	      // TODO(dfreedman): For some instances with ShadowDOMPolyfill, we can see
	      // a removal without an insertion when a node is redistributed among
	      // shadows. Since it all ends up correct in the document, watching only
	      // the document will yield the correct mutations to watch.
	      if (this.observer && targeting.canTarget(target)) {
	        this.observer.observe(target, OBSERVER_INIT);
	      }
	    },
	    enableOnSubtree: function enableOnSubtree(target) {
	      this.watchSubtree(target);
	      if (target === document && document.readyState !== 'complete') {
	        this.installOnLoad();
	      } else {
	        this.installNewSubtree(target);
	      }
	    },
	    installNewSubtree: function installNewSubtree(target) {
	      forEach(this.findElements(target), this.addElement, this);
	    },
	    findElements: function findElements(target) {
	      if (target.querySelectorAll) {
	        return target.querySelectorAll(SELECTOR);
	      }
	      return [];
	    },
	    removeElement: function removeElement(el) {
	      this.removeCallback(el);
	    },
	    addElement: function addElement(el) {
	      this.addCallback(el);
	    },
	    elementChanged: function elementChanged(el, oldValue) {
	      this.changedCallback(el, oldValue);
	    },
	    concatLists: function concatLists(accum, list) {
	      return accum.concat(toArray(list));
	    },
	
	    // register all touch-action = none nodes on document load
	    installOnLoad: function installOnLoad() {
	      document.addEventListener('readystatechange', function () {
	        if (document.readyState === 'complete') {
	          this.installNewSubtree(document);
	        }
	      }.bind(this));
	    },
	    isElement: function isElement(n) {
	      return n.nodeType === Node.ELEMENT_NODE;
	    },
	    flattenMutationTree: function flattenMutationTree(inNodes) {
	
	      // find children with touch-action
	      var tree = map(inNodes, this.findElements, this);
	
	      // make sure the added nodes are accounted for
	      tree.push(filter(inNodes, this.isElement));
	
	      // flatten the list
	      return tree.reduce(this.concatLists, []);
	    },
	    mutationWatcher: function mutationWatcher(mutations) {
	      mutations.forEach(this.mutationHandler, this);
	    },
	    mutationHandler: function mutationHandler(m) {
	      if (m.type === 'childList') {
	        var added = this.flattenMutationTree(m.addedNodes);
	        added.forEach(this.addElement, this);
	        var removed = this.flattenMutationTree(m.removedNodes);
	        removed.forEach(this.removeElement, this);
	      } else if (m.type === 'attributes') {
	        this.elementChanged(m.target, m.oldValue);
	      }
	    }
	  };
	
	  var installer = Installer;
	
	  function shadowSelector(v) {
	    return 'body /shadow-deep/ ' + selector(v);
	  }
	  function selector(v) {
	    return '[touch-action="' + v + '"]';
	  }
	  function rule(v) {
	    return '{ -ms-touch-action: ' + v + '; touch-action: ' + v + '; touch-action-delay: none; }';
	  }
	  var attrib2css = ['none', 'auto', 'pan-x', 'pan-y', {
	    rule: 'pan-x pan-y',
	    selectors: ['pan-x pan-y', 'pan-y pan-x']
	  }];
	  var styles = '';
	
	  // only install stylesheet if the browser has touch action support
	  var hasNativePE = window.PointerEvent || window.MSPointerEvent;
	
	  // only add shadow selectors if shadowdom is supported
	  var hasShadowRoot = !window.ShadowDOMPolyfill && document.head.createShadowRoot;
	
	  function applyAttributeStyles() {
	    if (hasNativePE) {
	      attrib2css.forEach(function (r) {
	        if (String(r) === r) {
	          styles += selector(r) + rule(r) + '\n';
	          if (hasShadowRoot) {
	            styles += shadowSelector(r) + rule(r) + '\n';
	          }
	        } else {
	          styles += r.selectors.map(selector) + rule(r.rule) + '\n';
	          if (hasShadowRoot) {
	            styles += r.selectors.map(shadowSelector) + rule(r.rule) + '\n';
	          }
	        }
	      });
	
	      var el = document.createElement('style');
	      el.textContent = styles;
	      document.head.appendChild(el);
	    }
	  }
	
	  var mouse__pointermap = _dispatcher.pointermap;
	
	  // radius around touchend that swallows mouse events
	  var DEDUP_DIST = 25;
	
	  // left, middle, right, back, forward
	  var BUTTON_TO_BUTTONS = [1, 4, 2, 8, 16];
	
	  var HAS_BUTTONS = false;
	  try {
	    HAS_BUTTONS = new MouseEvent('test', { buttons: 1 }).buttons === 1;
	  } catch (e) {}
	
	  // handler block for native mouse events
	  var mouseEvents = {
	    POINTER_ID: 1,
	    POINTER_TYPE: 'mouse',
	    events: ['mousedown', 'mousemove', 'mouseup', 'mouseover', 'mouseout'],
	    register: function register(target) {
	      _dispatcher.listen(target, this.events);
	    },
	    unregister: function unregister(target) {
	      _dispatcher.unlisten(target, this.events);
	    },
	    lastTouches: [],
	
	    // collide with the global mouse listener
	    isEventSimulatedFromTouch: function isEventSimulatedFromTouch(inEvent) {
	      var lts = this.lastTouches;
	      var x = inEvent.clientX;
	      var y = inEvent.clientY;
	      for (var i = 0, l = lts.length, t; i < l && (t = lts[i]); i++) {
	
	        // simulated mouse events will be swallowed near a primary touchend
	        var dx = Math.abs(x - t.x);
	        var dy = Math.abs(y - t.y);
	        if (dx <= DEDUP_DIST && dy <= DEDUP_DIST) {
	          return true;
	        }
	      }
	    },
	    prepareEvent: function prepareEvent(inEvent) {
	      var e = _dispatcher.cloneEvent(inEvent);
	
	      // forward mouse preventDefault
	      var pd = e.preventDefault;
	      e.preventDefault = function () {
	        inEvent.preventDefault();
	        pd();
	      };
	      e.pointerId = this.POINTER_ID;
	      e.isPrimary = true;
	      e.pointerType = this.POINTER_TYPE;
	      return e;
	    },
	    prepareButtonsForMove: function prepareButtonsForMove(e, inEvent) {
	      var p = mouse__pointermap.get(this.POINTER_ID);
	      e.buttons = p ? p.buttons : 0;
	      inEvent.buttons = e.buttons;
	    },
	    mousedown: function mousedown(inEvent) {
	      if (!this.isEventSimulatedFromTouch(inEvent)) {
	        var p = mouse__pointermap.get(this.POINTER_ID);
	        var e = this.prepareEvent(inEvent);
	        if (!HAS_BUTTONS) {
	          e.buttons = BUTTON_TO_BUTTONS[e.button];
	          if (p) {
	            e.buttons |= p.buttons;
	          }
	          inEvent.buttons = e.buttons;
	        }
	        mouse__pointermap.set(this.POINTER_ID, inEvent);
	        if (!p) {
	          _dispatcher.down(e);
	        } else {
	          _dispatcher.move(e);
	        }
	      }
	    },
	    mousemove: function mousemove(inEvent) {
	      if (!this.isEventSimulatedFromTouch(inEvent)) {
	        var e = this.prepareEvent(inEvent);
	        if (!HAS_BUTTONS) {
	          this.prepareButtonsForMove(e, inEvent);
	        }
	        _dispatcher.move(e);
	      }
	    },
	    mouseup: function mouseup(inEvent) {
	      if (!this.isEventSimulatedFromTouch(inEvent)) {
	        var p = mouse__pointermap.get(this.POINTER_ID);
	        var e = this.prepareEvent(inEvent);
	        if (!HAS_BUTTONS) {
	          var up = BUTTON_TO_BUTTONS[e.button];
	
	          // Produces wrong state of buttons in Browsers without `buttons` support
	          // when a mouse button that was pressed outside the document is released
	          // inside and other buttons are still pressed down.
	          e.buttons = p ? p.buttons & ~up : 0;
	          inEvent.buttons = e.buttons;
	        }
	        mouse__pointermap.set(this.POINTER_ID, inEvent);
	
	        // Support: Firefox <=44 only
	        // FF Ubuntu includes the lifted button in the `buttons` property on
	        // mouseup.
	        // https://bugzilla.mozilla.org/show_bug.cgi?id=1223366
	        if (e.buttons === 0 || e.buttons === BUTTON_TO_BUTTONS[e.button]) {
	          this.cleanupMouse();
	          _dispatcher.up(e);
	        } else {
	          _dispatcher.move(e);
	        }
	      }
	    },
	    mouseover: function mouseover(inEvent) {
	      if (!this.isEventSimulatedFromTouch(inEvent)) {
	        var e = this.prepareEvent(inEvent);
	        if (!HAS_BUTTONS) {
	          this.prepareButtonsForMove(e, inEvent);
	        }
	        _dispatcher.enterOver(e);
	      }
	    },
	    mouseout: function mouseout(inEvent) {
	      if (!this.isEventSimulatedFromTouch(inEvent)) {
	        var e = this.prepareEvent(inEvent);
	        if (!HAS_BUTTONS) {
	          this.prepareButtonsForMove(e, inEvent);
	        }
	        _dispatcher.leaveOut(e);
	      }
	    },
	    cancel: function cancel(inEvent) {
	      var e = this.prepareEvent(inEvent);
	      _dispatcher.cancel(e);
	      this.cleanupMouse();
	    },
	    cleanupMouse: function cleanupMouse() {
	      mouse__pointermap.delete(this.POINTER_ID);
	    }
	  };
	
	  var mouse = mouseEvents;
	
	  var captureInfo = _dispatcher.captureInfo;
	  var findTarget = targeting.findTarget.bind(targeting);
	  var allShadows = targeting.allShadows.bind(targeting);
	  var touch__pointermap = _dispatcher.pointermap;
	
	  // This should be long enough to ignore compat mouse events made by touch
	  var DEDUP_TIMEOUT = 2500;
	  var CLICK_COUNT_TIMEOUT = 200;
	  var ATTRIB = 'touch-action';
	  var INSTALLER;
	
	  // The presence of touch event handlers blocks scrolling, and so we must be careful to
	  // avoid adding handlers unnecessarily.  Chrome plans to add a touch-action-delay property
	  // (crbug.com/329559) to address this, and once we have that we can opt-in to a simpler
	  // handler registration mechanism.  Rather than try to predict how exactly to opt-in to
	  // that we'll just leave this disabled until there is a build of Chrome to test.
	  var HAS_TOUCH_ACTION_DELAY = false;
	
	  // handler block for native touch events
	  var touchEvents = {
	    events: ['touchstart', 'touchmove', 'touchend', 'touchcancel'],
	    register: function register(target) {
	      if (HAS_TOUCH_ACTION_DELAY) {
	        _dispatcher.listen(target, this.events);
	      } else {
	        INSTALLER.enableOnSubtree(target);
	      }
	    },
	    unregister: function unregister(target) {
	      if (HAS_TOUCH_ACTION_DELAY) {
	        _dispatcher.unlisten(target, this.events);
	      } else {
	
	        // TODO(dfreedman): is it worth it to disconnect the MO?
	      }
	    },
	    elementAdded: function elementAdded(el) {
	      var a = el.getAttribute(ATTRIB);
	      var st = this.touchActionToScrollType(a);
	      if (st) {
	        el._scrollType = st;
	        _dispatcher.listen(el, this.events);
	
	        // set touch-action on shadows as well
	        allShadows(el).forEach(function (s) {
	          s._scrollType = st;
	          _dispatcher.listen(s, this.events);
	        }, this);
	      }
	    },
	    elementRemoved: function elementRemoved(el) {
	      el._scrollType = undefined;
	      _dispatcher.unlisten(el, this.events);
	
	      // remove touch-action from shadow
	      allShadows(el).forEach(function (s) {
	        s._scrollType = undefined;
	        _dispatcher.unlisten(s, this.events);
	      }, this);
	    },
	    elementChanged: function elementChanged(el, oldValue) {
	      var a = el.getAttribute(ATTRIB);
	      var st = this.touchActionToScrollType(a);
	      var oldSt = this.touchActionToScrollType(oldValue);
	
	      // simply update scrollType if listeners are already established
	      if (st && oldSt) {
	        el._scrollType = st;
	        allShadows(el).forEach(function (s) {
	          s._scrollType = st;
	        }, this);
	      } else if (oldSt) {
	        this.elementRemoved(el);
	      } else if (st) {
	        this.elementAdded(el);
	      }
	    },
	    scrollTypes: {
	      EMITTER: 'none',
	      XSCROLLER: 'pan-x',
	      YSCROLLER: 'pan-y',
	      SCROLLER: /^(?:pan-x pan-y)|(?:pan-y pan-x)|auto$/
	    },
	    touchActionToScrollType: function touchActionToScrollType(touchAction) {
	      var t = touchAction;
	      var st = this.scrollTypes;
	      if (t === 'none') {
	        return 'none';
	      } else if (t === st.XSCROLLER) {
	        return 'X';
	      } else if (t === st.YSCROLLER) {
	        return 'Y';
	      } else if (st.SCROLLER.exec(t)) {
	        return 'XY';
	      }
	    },
	    POINTER_TYPE: 'touch',
	    firstTouch: null,
	    isPrimaryTouch: function isPrimaryTouch(inTouch) {
	      return this.firstTouch === inTouch.identifier;
	    },
	    setPrimaryTouch: function setPrimaryTouch(inTouch) {
	
	      // set primary touch if there no pointers, or the only pointer is the mouse
	      if (touch__pointermap.size === 0 || touch__pointermap.size === 1 && touch__pointermap.has(1)) {
	        this.firstTouch = inTouch.identifier;
	        this.firstXY = { X: inTouch.clientX, Y: inTouch.clientY };
	        this.scrolling = false;
	        this.cancelResetClickCount();
	      }
	    },
	    removePrimaryPointer: function removePrimaryPointer(inPointer) {
	      if (inPointer.isPrimary) {
	        this.firstTouch = null;
	        this.firstXY = null;
	        this.resetClickCount();
	      }
	    },
	    clickCount: 0,
	    resetId: null,
	    resetClickCount: function resetClickCount() {
	      var fn = function () {
	        this.clickCount = 0;
	        this.resetId = null;
	      }.bind(this);
	      this.resetId = setTimeout(fn, CLICK_COUNT_TIMEOUT);
	    },
	    cancelResetClickCount: function cancelResetClickCount() {
	      if (this.resetId) {
	        clearTimeout(this.resetId);
	      }
	    },
	    typeToButtons: function typeToButtons(type) {
	      var ret = 0;
	      if (type === 'touchstart' || type === 'touchmove') {
	        ret = 1;
	      }
	      return ret;
	    },
	    touchToPointer: function touchToPointer(inTouch) {
	      var cte = this.currentTouchEvent;
	      var e = _dispatcher.cloneEvent(inTouch);
	
	      // We reserve pointerId 1 for Mouse.
	      // Touch identifiers can start at 0.
	      // Add 2 to the touch identifier for compatibility.
	      var id = e.pointerId = inTouch.identifier + 2;
	      e.target = captureInfo[id] || findTarget(e);
	      e.bubbles = true;
	      e.cancelable = true;
	      e.detail = this.clickCount;
	      e.button = 0;
	      e.buttons = this.typeToButtons(cte.type);
	      e.width = inTouch.radiusX || inTouch.webkitRadiusX || 0;
	      e.height = inTouch.radiusY || inTouch.webkitRadiusY || 0;
	      e.pressure = inTouch.force || inTouch.webkitForce || 0.5;
	      e.isPrimary = this.isPrimaryTouch(inTouch);
	      e.pointerType = this.POINTER_TYPE;
	
	      // forward touch preventDefaults
	      var self = this;
	      e.preventDefault = function () {
	        self.scrolling = false;
	        self.firstXY = null;
	        cte.preventDefault();
	      };
	      return e;
	    },
	    processTouches: function processTouches(inEvent, inFunction) {
	      var tl = inEvent.changedTouches;
	      this.currentTouchEvent = inEvent;
	      for (var i = 0, t; i < tl.length; i++) {
	        t = tl[i];
	        inFunction.call(this, this.touchToPointer(t));
	      }
	    },
	
	    // For single axis scrollers, determines whether the element should emit
	    // pointer events or behave as a scroller
	    shouldScroll: function shouldScroll(inEvent) {
	      if (this.firstXY) {
	        var ret;
	        var scrollAxis = inEvent.currentTarget._scrollType;
	        if (scrollAxis === 'none') {
	
	          // this element is a touch-action: none, should never scroll
	          ret = false;
	        } else if (scrollAxis === 'XY') {
	
	          // this element should always scroll
	          ret = true;
	        } else {
	          var t = inEvent.changedTouches[0];
	
	          // check the intended scroll axis, and other axis
	          var a = scrollAxis;
	          var oa = scrollAxis === 'Y' ? 'X' : 'Y';
	          var da = Math.abs(t['client' + a] - this.firstXY[a]);
	          var doa = Math.abs(t['client' + oa] - this.firstXY[oa]);
	
	          // if delta in the scroll axis > delta other axis, scroll instead of
	          // making events
	          ret = da >= doa;
	        }
	        this.firstXY = null;
	        return ret;
	      }
	    },
	    findTouch: function findTouch(inTL, inId) {
	      for (var i = 0, l = inTL.length, t; i < l && (t = inTL[i]); i++) {
	        if (t.identifier === inId) {
	          return true;
	        }
	      }
	    },
	
	    // In some instances, a touchstart can happen without a touchend. This
	    // leaves the pointermap in a broken state.
	    // Therefore, on every touchstart, we remove the touches that did not fire a
	    // touchend event.
	    // To keep state globally consistent, we fire a
	    // pointercancel for this "abandoned" touch
	    vacuumTouches: function vacuumTouches(inEvent) {
	      var tl = inEvent.touches;
	
	      // pointermap.size should be < tl.length here, as the touchstart has not
	      // been processed yet.
	      if (touch__pointermap.size >= tl.length) {
	        var d = [];
	        touch__pointermap.forEach(function (value, key) {
	
	          // Never remove pointerId == 1, which is mouse.
	          // Touch identifiers are 2 smaller than their pointerId, which is the
	          // index in pointermap.
	          if (key !== 1 && !this.findTouch(tl, key - 2)) {
	            var p = value.out;
	            d.push(p);
	          }
	        }, this);
	        d.forEach(this.cancelOut, this);
	      }
	    },
	    touchstart: function touchstart(inEvent) {
	      this.vacuumTouches(inEvent);
	      this.setPrimaryTouch(inEvent.changedTouches[0]);
	      this.dedupSynthMouse(inEvent);
	      if (!this.scrolling) {
	        this.clickCount++;
	        this.processTouches(inEvent, this.overDown);
	      }
	    },
	    overDown: function overDown(inPointer) {
	      touch__pointermap.set(inPointer.pointerId, {
	        target: inPointer.target,
	        out: inPointer,
	        outTarget: inPointer.target
	      });
	      _dispatcher.over(inPointer);
	      _dispatcher.enter(inPointer);
	      _dispatcher.down(inPointer);
	    },
	    touchmove: function touchmove(inEvent) {
	      if (!this.scrolling) {
	        if (this.shouldScroll(inEvent)) {
	          this.scrolling = true;
	          this.touchcancel(inEvent);
	        } else {
	          inEvent.preventDefault();
	          this.processTouches(inEvent, this.moveOverOut);
	        }
	      }
	    },
	    moveOverOut: function moveOverOut(inPointer) {
	      var event = inPointer;
	      var pointer = touch__pointermap.get(event.pointerId);
	
	      // a finger drifted off the screen, ignore it
	      if (!pointer) {
	        return;
	      }
	      var outEvent = pointer.out;
	      var outTarget = pointer.outTarget;
	      _dispatcher.move(event);
	      if (outEvent && outTarget !== event.target) {
	        outEvent.relatedTarget = event.target;
	        event.relatedTarget = outTarget;
	
	        // recover from retargeting by shadow
	        outEvent.target = outTarget;
	        if (event.target) {
	          _dispatcher.leaveOut(outEvent);
	          _dispatcher.enterOver(event);
	        } else {
	
	          // clean up case when finger leaves the screen
	          event.target = outTarget;
	          event.relatedTarget = null;
	          this.cancelOut(event);
	        }
	      }
	      pointer.out = event;
	      pointer.outTarget = event.target;
	    },
	    touchend: function touchend(inEvent) {
	      this.dedupSynthMouse(inEvent);
	      this.processTouches(inEvent, this.upOut);
	    },
	    upOut: function upOut(inPointer) {
	      if (!this.scrolling) {
	        _dispatcher.up(inPointer);
	        _dispatcher.out(inPointer);
	        _dispatcher.leave(inPointer);
	      }
	      this.cleanUpPointer(inPointer);
	    },
	    touchcancel: function touchcancel(inEvent) {
	      this.processTouches(inEvent, this.cancelOut);
	    },
	    cancelOut: function cancelOut(inPointer) {
	      _dispatcher.cancel(inPointer);
	      _dispatcher.out(inPointer);
	      _dispatcher.leave(inPointer);
	      this.cleanUpPointer(inPointer);
	    },
	    cleanUpPointer: function cleanUpPointer(inPointer) {
	      touch__pointermap.delete(inPointer.pointerId);
	      this.removePrimaryPointer(inPointer);
	    },
	
	    // prevent synth mouse events from creating pointer events
	    dedupSynthMouse: function dedupSynthMouse(inEvent) {
	      var lts = mouse.lastTouches;
	      var t = inEvent.changedTouches[0];
	
	      // only the primary finger will synth mouse events
	      if (this.isPrimaryTouch(t)) {
	
	        // remember x/y of last touch
	        var lt = { x: t.clientX, y: t.clientY };
	        lts.push(lt);
	        var fn = function (lts, lt) {
	          var i = lts.indexOf(lt);
	          if (i > -1) {
	            lts.splice(i, 1);
	          }
	        }.bind(null, lts, lt);
	        setTimeout(fn, DEDUP_TIMEOUT);
	      }
	    }
	  };
	
	  if (!HAS_TOUCH_ACTION_DELAY) {
	    INSTALLER = new installer(touchEvents.elementAdded, touchEvents.elementRemoved, touchEvents.elementChanged, touchEvents);
	  }
	
	  var touch = touchEvents;
	
	  var ms__pointermap = _dispatcher.pointermap;
	  var HAS_BITMAP_TYPE = window.MSPointerEvent && typeof window.MSPointerEvent.MSPOINTER_TYPE_MOUSE === 'number';
	  var msEvents = {
	    events: ['MSPointerDown', 'MSPointerMove', 'MSPointerUp', 'MSPointerOut', 'MSPointerOver', 'MSPointerCancel', 'MSGotPointerCapture', 'MSLostPointerCapture'],
	    register: function register(target) {
	      _dispatcher.listen(target, this.events);
	    },
	    unregister: function unregister(target) {
	      _dispatcher.unlisten(target, this.events);
	    },
	    POINTER_TYPES: ['', 'unavailable', 'touch', 'pen', 'mouse'],
	    prepareEvent: function prepareEvent(inEvent) {
	      var e = inEvent;
	      if (HAS_BITMAP_TYPE) {
	        e = _dispatcher.cloneEvent(inEvent);
	        e.pointerType = this.POINTER_TYPES[inEvent.pointerType];
	      }
	      return e;
	    },
	    cleanup: function cleanup(id) {
	      ms__pointermap.delete(id);
	    },
	    MSPointerDown: function MSPointerDown(inEvent) {
	      ms__pointermap.set(inEvent.pointerId, inEvent);
	      var e = this.prepareEvent(inEvent);
	      _dispatcher.down(e);
	    },
	    MSPointerMove: function MSPointerMove(inEvent) {
	      var e = this.prepareEvent(inEvent);
	      _dispatcher.move(e);
	    },
	    MSPointerUp: function MSPointerUp(inEvent) {
	      var e = this.prepareEvent(inEvent);
	      _dispatcher.up(e);
	      this.cleanup(inEvent.pointerId);
	    },
	    MSPointerOut: function MSPointerOut(inEvent) {
	      var e = this.prepareEvent(inEvent);
	      _dispatcher.leaveOut(e);
	    },
	    MSPointerOver: function MSPointerOver(inEvent) {
	      var e = this.prepareEvent(inEvent);
	      _dispatcher.enterOver(e);
	    },
	    MSPointerCancel: function MSPointerCancel(inEvent) {
	      var e = this.prepareEvent(inEvent);
	      _dispatcher.cancel(e);
	      this.cleanup(inEvent.pointerId);
	    },
	    MSLostPointerCapture: function MSLostPointerCapture(inEvent) {
	      var e = _dispatcher.makeEvent('lostpointercapture', inEvent);
	      _dispatcher.dispatchEvent(e);
	    },
	    MSGotPointerCapture: function MSGotPointerCapture(inEvent) {
	      var e = _dispatcher.makeEvent('gotpointercapture', inEvent);
	      _dispatcher.dispatchEvent(e);
	    }
	  };
	
	  var ms = msEvents;
	
	  function platform_events__applyPolyfill() {
	
	    // only activate if this platform does not have pointer events
	    if (!window.PointerEvent) {
	      window.PointerEvent = _PointerEvent;
	
	      if (window.navigator.msPointerEnabled) {
	        var tp = window.navigator.msMaxTouchPoints;
	        Object.defineProperty(window.navigator, 'maxTouchPoints', {
	          value: tp,
	          enumerable: true
	        });
	        _dispatcher.registerSource('ms', ms);
	      } else {
	        _dispatcher.registerSource('mouse', mouse);
	        if (window.ontouchstart !== undefined) {
	          _dispatcher.registerSource('touch', touch);
	        }
	      }
	
	      _dispatcher.register(document);
	    }
	  }
	
	  var n = window.navigator;
	  var s, r;
	  function assertDown(id) {
	    if (!_dispatcher.pointermap.has(id)) {
	      throw new Error('InvalidPointerId');
	    }
	  }
	  if (n.msPointerEnabled) {
	    s = function s(pointerId) {
	      assertDown(pointerId);
	      this.msSetPointerCapture(pointerId);
	    };
	    r = function r(pointerId) {
	      assertDown(pointerId);
	      this.msReleasePointerCapture(pointerId);
	    };
	  } else {
	    s = function setPointerCapture(pointerId) {
	      assertDown(pointerId);
	      _dispatcher.setCapture(pointerId, this);
	    };
	    r = function releasePointerCapture(pointerId) {
	      assertDown(pointerId);
	      _dispatcher.releaseCapture(pointerId, this);
	    };
	  }
	
	  function _capture__applyPolyfill() {
	    if (window.Element && !Element.prototype.setPointerCapture) {
	      Object.defineProperties(Element.prototype, {
	        'setPointerCapture': {
	          value: s
	        },
	        'releasePointerCapture': {
	          value: r
	        }
	      });
	    }
	  }
	
	  applyAttributeStyles();
	  platform_events__applyPolyfill();
	  _capture__applyPolyfill();
	
	  var pointerevents = {
	    dispatcher: _dispatcher,
	    Installer: installer,
	    PointerEvent: _PointerEvent,
	    PointerMap: _pointermap,
	    targetFinding: targeting
	  };
	
	  return pointerevents;
	});

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = require("babylonjs");

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _babylonjs = __webpack_require__(2);
	
	var _babylonjs2 = _interopRequireDefault(_babylonjs);
	
	var _act = __webpack_require__(4);
	
	var _act2 = _interopRequireDefault(_act);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Quaternion = _babylonjs2.default.Quaternion;
	
	var ActHist = function () {
	    function ActHist(mesh, capacity) {
	        _classCallCheck(this, ActHist);
	
	        this.mesh = null;
	        this.lastMax = 10;
	        this.acts = [];
	        this.last = -1;
	        this.current = -1;
	
	        this.mesh = mesh;
	        this.lastMax = capacity - 1;
	
	        if (!mesh.rotationQuaternion) {
	            if (mesh.rotation) {
	                mesh.rotationQuaternion = Quaternion.RotationYawPitchRoll(mesh.rotation.y, mesh.rotation.x, mesh.rotation.z);
	            }
	        }
	
	        this.add();
	    }
	
	    _createClass(ActHist, [{
	        key: 'setCapacity',
	        value: function setCapacity(c) {
	            if (c === 0) {
	                console.error("capacity should be more than zero");
	                return;
	            }
	
	            this.lastMax = c - 1;
	            this.last = -1;
	            this.current = -1;
	            this.acts = [];
	
	            this.add();
	        }
	    }, {
	        key: 'add',
	        value: function add() {
	            var act = new _act2.default(this.mesh);
	
	            if (this.current < this.last) {
	                this.acts.splice(current + 1);
	                this.late = this.current;
	            }
	
	            if (this.last === this.lastMax) {
	                this.acts.shift();
	                this.acts.push(act);
	            } else {
	                this.acts.push(act);
	                this.last++;
	                this.current++;
	            }
	        }
	    }, {
	        key: 'undo',
	        value: function undo() {
	            if (this.current > 0) {
	                this.current--;
	                this.acts[this.current].perform(this.mesh);
	            }
	        }
	    }, {
	        key: 'redo',
	        value: function redo() {
	            if (this.current < this.last) {
	                this.current++;
	                this.acts[this.current].perform(this.mesh);
	            }
	        }
	    }]);
	
	    return ActHist;
	}();

	exports.default = ActHist;

/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Act = function () {
		function Act(mesh) {
			_classCallCheck(this, Act);
	
			this.p = null;
			this.r = null;
			this.s = null;
	
			this.p = mesh.position.clone();
			this.r = mesh.rotationQuaternion.clone();
			this.s = mesh.scaling.clone();
		}
	
		_createClass(Act, [{
			key: "perform",
			value: function perform(mesh) {
				mesh.position = this.p.clone();
				mesh.rotationQuaternion = this.r.clone();
				mesh.scaling = s.clone();
			}
		}]);
	
		return Act;
	}();

	exports.default = Act;

/***/ }
/******/ ]);
//# sourceMappingURL=editcontrol.js.map