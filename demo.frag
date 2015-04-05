precision mediump float;

uniform vec2  iResolution;
uniform float iGlobalTime;

vec2 doModel(vec3 p);

#pragma glslify: getNormal = require('glsl-sdf-normal', map = doModel)
#pragma glslify: raytrace  = require('glsl-raytrace', map = doModel, steps = 90)
#pragma glslify: camera    = require('glsl-turntable-camera')
#pragma glslify: box       = require('glsl-sdf-box')
#pragma glslify: combine   = require('./')

vec2 doModel(vec3 p) {
  float dist = box(p, vec3(1.0));
  vec3  off  = vec3(0, sin(iGlobalTime * 0.75), 0);
  dist = combine(dist, box(p + off, vec3(0.5, 0.5, 2.5)), 0.125);

  return vec2(dist, 1.0);
}

void main() {
  vec3 color = vec3(0.95, 0.95, 1.215);
  vec3 rayOrigin, rayDirection;

  float angle  = iGlobalTime * 0.25;
  float height = 1.5;
  float dist   = 5.0;
  camera(angle, height, dist, iResolution, rayOrigin, rayDirection);

  vec2 t = raytrace(rayOrigin, rayDirection);
  if (t.x > -0.5) {
    vec3 pos = rayOrigin + t.x * rayDirection;
    vec3 nor = getNormal(pos);

    color = nor * 0.5 + 0.5;
  }

  gl_FragColor = vec4(color, 1.0);
}
