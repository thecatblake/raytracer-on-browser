const {vector} = require("./tuple");

class Material {
  color = vector(1, 1, 1)
  ambient = 0.1
  diffuse = 0.9
  specular = 0.9
  shininess = 200
  pattern = null

  constructor(color, ambient, diffuse, specular, shininess, pattern=null) {
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
    if(pattern)
      this.pattern = pattern
  }
}

module.exports = {Material}
