import {Tuple, vector} from "./tuple";


class PointLight {
  position = null
  intensity = null
  constructor(position, intensity) {
    this.position = position
    this.intensity = intensity
  }
}

function lighting(material, obj, light, point, eyev, normalv, in_shadow=false) {
  let color = material.color

  if(material.pattern != null)
    color = material.pattern.at_obj(obj, point)

  let e_c, lightv, reflectv;

  e_c = Tuple.mul(color, light.intensity)

  lightv = Tuple.sub(light.position, point).normalize()

  let ambient, diffuse, specular;
  ambient = e_c.sc_mul(material.ambient)

  let light_dot_norm = Tuple.dot(lightv, normalv)

  if (light_dot_norm < 0) {
    diffuse = vector(0, 0, 0);
    specular = vector(0, 0, 0);
  } else {
    diffuse = e_c.sc_mul(material.diffuse * light_dot_norm)
    reflectv = lightv.neg().reflect(normalv)
    let reflect_dot_eye = Tuple.dot(reflectv, eyev)

    if (reflect_dot_eye <= 0)
      specular = vector(0, 0, 0);
    else {
      let factor = Math.pow(reflect_dot_eye, material.shininess);
      specular = light.intensity.sc_mul(material.specular * factor)
    }
  }

  if (in_shadow)
    return ambient;

  return ambient.add(diffuse).add(specular)
}


export {PointLight, lighting};
