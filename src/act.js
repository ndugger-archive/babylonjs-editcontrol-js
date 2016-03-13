export default class Act{

	p = null;
    r = null;
    s = null;

	constructor (mesh) {
		this.p = mesh.position.clone();
		this.r = mesh.rotationQuaternion.clone();
		this.s = mesh.scaling.clone();
	}

	perform (mesh) {
		mesh.position = this.p.clone();
		mesh.rotationQuaternion = this.r.clone();
		mesh.scaling = s.clone();
	}

}
