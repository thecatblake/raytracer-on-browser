const {vector} = require("./tuple");

class Material {
  color = vector(1, 1, 1)
  ambient = 0.1
  diffuse = 0.9
  specular = 0.9
  shininess = 200

  constructor(color, ambient, diffuse, specular, shininess) {
    if(color)
      this.color = color
    if(ambient)
      this.ambient = ambient
    if(diffuse)
      this.diffuse = diffuse
    if(specular)
      this.specular = specular
    if(shininess)
      this.shininess = shininess
  }
}

module.exports = {Material}
