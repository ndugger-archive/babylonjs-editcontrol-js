**Originally written by [ssatguru](https://github.com/ssatguru) in Java:
[BabylonJS-EditControl](https://github.com/ssatguru/BabylonJS-EditControl)**

Translated to modern JavaScript by [ndugger](https://github.com/ndugger) for use in a modular environment (via webpack, browserify, or in an electron app).

---

**Prerequisites**
- Node 4.x+
- NPM 3.x+

---

# BabylonJS-EditControl
An edit control for use in [BabylonJS](http://www.babylonjs.com/) (a 3D HTML Webgl framework)  applications

## About
All 3d editors provide a widget to translate, rotate or scale 3d objects in the editor.

This EditControl is similar to those widgets.

You can embed this in your BabylonJS application to provide those same capabilities.

Currently has the following features

* Translate
* Snap Translate
* Rotate
* Snap Rotate
* Scale
* Local or Global  Translation, Rotation. (Scaling only in local axis)
* Create multiple instances in the same scene with each instance attached to a different mesh
* Scale size of control
* undo, redo

For a demo head on over to [http://ssatguru.appspot.com/BabylonJS-EditControl/webapp/index.html](http://ssatguru.appspot.com/babylonjs/EditControl/webapp/index.html)

## Quick start
**1)** run `npm init` to generate a `package.json` file, and then add the following snippet:
```json
"dependencies": {
    "babylonjs-editcontrol": "git://github.com/ndugger/babylonjs-editcontrol-js.git"
}
```

As you can see, this installs the github repo as a dependency. **You must have your github account with your ssh key  set up on your computer**.

Once you have edited the `package.json` file, run `npm install` in your terminal.

**2)** add the following dependencies to your file
 ```javascript
 var EditControl = require('babylonjs-editcontrol');
```

In order to use this code, you must have a module system implemented, either via 'Webpack', 'Browserify', or by running your code on 'Electron'.

**3)** A small snippet of js code to get you running
```javascript
//------------------EDIT CONTROL -------------------------------------------------
//create edit control (mesh to attach to, active camera, canvas, scale of editcontrol)
var editControl = new EditControl(box, camera, canvas, 0.75);
//enable translation controls
editControl.enableTranslation();
//set transalation sna value in meters
editControl.setTransSnapValue(0.5);
//set rotational snap value in radians
editControl.setRotSnapValue(3.14 / 18);
```
## API
1) To Instantiate
```javascript
var EditControl = require('babylonjs-editcontrol');
var editControl = new EditControl(mesh,camera, canvas, 0.75);
```
This attaches the edit control to a mesh and displays  x,y,z axis.

Takes three params
* mesh - the mesh to attach the editcontrol
* camera - active camera
* canvas - the mesh canvas
* scale - how small or large the editcontrol should appear


2) To enable Translation, Rotation or Scaling controls
```javascript
editControl.enableTranslation();
```
```javascript
editControl.enableRotation();
```
```javascript
editControl.enableScaling();
```
3) To disable Translation, Rotation or Scaling controls (just displays x,y,z axis)
```javascript
editControl.disableTranslation();
```
```javascript
editControl.disableRotation();
```
```javascript
editControl.disableScaling();
```
4) To check if Translation, Rotation or Scaling is enabled
```javascript
editControl.isTranslationEnabled();
```
```javascript
editControl.isRotationEnabled();
```
```javascript
editControl.isScalingEnabled();
```
5) To turn on/off local/ global mode
```javascript
editControl.setLocal(boolean true/false);
```
6) To check if local/ global mode
```javascript
editControl.isLocal();
```
7) To turn on/off translation or rotation snapping
```javascript
editControl.setTransSnap(boolean true/false);
```
```javascript
editControl.setRotSnap(boolean true/false);
```
8) To set translation or Rotation snap values
```javascript
editControl.setTransSnapValue(number n in meters);
```
```javascript
editControl.setRotSnapValue(number n in radians);
```
9) To undo or redo
```javascript
editControl.undo();
```
```javascript
editControl.redo();
```
10) To set undo count

By default does up to 10 undos
```javascript
editControl.setUndoCount(number count);
```
11) To check if user editing (moving,translating or scaling object)
```javascript
editControl.isEditing();
```
12) To switch edit control to another mesh
```javascript
editControl.switchTo(Mesh mesh);
```
This quickly removes control from one mesh and attaches it to anotehr mesh.

The translation, rotation, scaling mode is maintained.

13) To detach from the mesh and clean up resources.
```javascript
editControl.detach();
```
