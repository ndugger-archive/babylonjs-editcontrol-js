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
	
	var _babylonjs = __webpack_require__(1);
	
	var _babylonjs2 = _interopRequireDefault(_babylonjs);
	
	var _acthist = __webpack_require__(2);
	
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
	
	        canvas.addEventListener('mousedown', this.pointerdown, false);
	        canvas.addEventListener('mouseup', this.pointerup, false);
	        canvas.addEventListener('mousemove', this.pointermove, false);
	
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
	            this.canvas.removeEventListener('mousedown', this.pointerdown, false);
	            this.canvas.removeEventListener('mouseup', this.pointerup, false);
	            this.canvas.removeEventListener('mousemove', this.pointermove, false);
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
	                    this.restoreColor(this.prevOverMesh);
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
	            this.rY = this.rX.clone('Y');
	            this.rZ = this.rX.clone('Z');
	
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
	            this.sEndY = this.sEndX.clone('');
	            this.sEndZ = this.sEndX.clone('');
	            this.sEndAll = this.sEndX.clone('');
	
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
/***/ function(module, exports) {

	module.exports = require("babylonjs");

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _babylonjs = __webpack_require__(1);
	
	var _babylonjs2 = _interopRequireDefault(_babylonjs);
	
	var _act = __webpack_require__(3);
	
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
/* 3 */
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