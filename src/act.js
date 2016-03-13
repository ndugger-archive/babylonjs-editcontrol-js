export default class Act{

	p = null;
    r = null;
    s = null;

	constructor (mesh) {
		this.p = mesh.position.Clone();
		this.r = mesh.rotationQuaternion.Clone();
		this.s = mesh.scaling.Clone();
	}

	perform (mesh) {
		mesh.position = this.p.Clone();
		mesh.rotationQuaternion = this.r.Clone();
		mesh.scaling = s.Clone();
	}

}
