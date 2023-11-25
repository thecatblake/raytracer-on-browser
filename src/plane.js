import {Object3D} from "./object3d";

import {EPSILON} from "./util";

import {Intersection} from "./intersection";

import {vector} from "./tuple";


class Plane extends Object3D {
  local_intersect(ray) {
    if(Math.abs(ray.direction.y) < EPSILON)
      return []

    let t = -ray.origin.y / ray.direction.y;

    return [new Intersection(t, this)]
  }

  local_normal_at(p) {
    return vector(0, 1, 0)
  }
}

export {Plane};
