var canvas   = document.body.appendChild(document.createElement('canvas'))
var triangle = require('a-big-triangle')
var context  = require('gl-context')
var fit      = require('canvas-fit')
var Shader   = require('gl-shader')
var glslify  = require('glslify')

var start = Date.now()
var fitter = fit(canvas, window, window.innerWidth > 600 ? 0.25 : 1)

window.addEventListener('resize', function(e) {
  fitter.scale = window.innerWidth > 600 ? 0.25 : 1
  fitter()
}, false)

console.log(glslify('./demo.frag'))

Toy(function(gl) {
  return Shader(gl
    , glslify('./demo.vert')
    , glslify('./demo.frag')
  )
}, function(gl, shader) {
  shader.uniforms.iResolution = [gl.drawingBufferWidth, gl.drawingBufferHeight]
  shader.uniforms.iGlobalTime = (Date.now() - start) / 1000
})

// Extracted for gl-toy, need to do manual
// downsampling here :)
function Toy(shader, cb) {
  var gl = context(canvas, render)
  shader = shader(gl)

  function render() {
    var width = gl.drawingBufferWidth
    var height = gl.drawingBufferHeight
    gl.viewport(0, 0, width, height)

    shader.bind()
    cb(gl, shader)
    triangle(gl)
  }
}
