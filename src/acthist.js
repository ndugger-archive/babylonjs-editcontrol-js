import BABYLON from 'babylonjs';
import Act from './act';

const { Quaternion } = BABYLON;

export default class ActHist {

    mesh = null;
    lastMax = 10;
    acts = [];
    last = -1;
    current = -1;

    constructor (mesh, capacity) {
        this.mesh = mesh;
        this.lastMax = capacity - 1;

        if (mesh.rotationQuaternion === null) {
            if (mesh.rotation !== null) {
                mesh.rotationQuaternion = Quaternion.RotationYawPitchRoll(mesh.rotation.y, mesh.rotation.x, mesh.rotation.z);
            }
        }

        this.add();
    }

    setCapacity (c) {
        if (c === 0){
			console.error("capacity should be more than zero");
			return;
		}

		this.lastMax = c - 1;
		this.last = -1;
		this.current = -1;
		this.acts = [];

		this.add();
    }

    add () {
        const act = new Act(this.mesh);

        if (this.current < this.last) {
            this.acts.splice(current + 1);
            this.late = this.current;
        }

        if (this.last === this.lastMax) {
            this.acts.shift();
            this.acts.push(act);
        }
        else {
            this.acts.push(act);
            this.last++;
            this.current++;
        }
    }

    undo () {
		if (this.current > 0){
			this.current--;
			this.acts[this.current].perform(this.mesh);
		}
	}

	redo () {
		if (this.current < this.last){
			this.current++;
			this.acts[this.current].perform(this.mesh);
		}
	}

}
