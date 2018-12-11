# glsl-combine-chamfer

[![stable](http://badges.github.io/stability-badges/dist/stable.svg)](http://github.com/badges/stability-badges)

Combine two signed distance fields with a
[chamfer](http://en.wikipedia.org/wiki/Chamfer)-like join.

**[view demo](http://glslify.github.io/glsl-combine-chamfer/)**

This technique was derived from a
[great talk](https://www.youtube.com/watch?v=s8nFqwOho-s) at
[NVScene](http://nv.scene.org/) by
[Johann Korndörfer](https://twitter.com/cupe_cupe).

## Usage

[![NPM](https://nodei.co/npm/glsl-combine-chamfer.png)](https://nodei.co/npm/glsl-combine-chamfer/)

### `float combine(float d1, float d2, float radius)`

Given two distances `d1` and `d2`, merge them together
within the supplied `radius`.

``` glsl
uniform float iGlobalTime;

#pragma glslify: combine = require('glsl-combine-chamfer')
#pragma glslify: box     = require('glsl-sdf-box')

vec2 doModel(vec3 p) {
  vec3  off    = sin(0, iGlobalTime, 0);
  float dist1  = box(p, vec3(2.0));
  float dist2  = box(p + off, vec3(1.0));
  float radius = 0.5;

  float dist = combine(dist1, dist2, radius);

  return vec2(dist, 1.0);
}
```

## Contributing

See [stackgl/contributing](https://github.com/stackgl/contributing) for details.

## License

MIT. See [LICENSE.md](http://github.com/stackgl/glsl-combine-chamfer/blob/master/LICENSE.md) for details.
