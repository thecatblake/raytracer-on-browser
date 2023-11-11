const {Tuple, vector} = require("./tuple");

class PointLight {
  position = null
  intensity = null
  constructor(position, intensity) {
    this.position = position
    this.intensity = intensity
  }
}

function lighting(material, light, point, eyev, normalv) {
  let e_c, lightv, reflectv;

  e_c = Tuple.mul(material.color, light.intensity)

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

  return ambient.add(diffuse).add(specular)
}


module.exports = {PointLight, lighting}
