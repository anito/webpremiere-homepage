precision highp float;
uniform sampler2D tDiffuse;
uniform float time;
varying vec2 vUv;
varying float vFogFactor;
uniform vec3 fogColor;

// /* discontinuous pseudorandom uniformly distributed in [-0.5, +0.5]^3 */
vec3 random3(vec3 c){
  float j=4096.*sin(dot(c,vec3(17.,59.4,15.)));
  vec3 r;
  r.z=fract(512.*j);
  j*=.125;
  r.x=fract(512.*j);
  j*=.125;
  r.y=fract(512.*j);
  return r-.5;
}

/* skew constants for 3d simplex functions */
const float F3 =  0.3333333;
const float G3 =  0.1666667;

/* 3d simplex noise */
float simplex3d(vec3 p) {
  /* 1. find current tetrahedron T and it's four vertices */
  /* s, s+i1, s+i2, s+1.0 - absolute skewed (integer) coordinates of T vertices */
  /* x, x1, x2, x3 - unskewed coordinates of p relative to each of T vertices*/
  
  /* calculate s and x */
  vec3 s = floor(p + dot(p, vec3(F3)));
  vec3 x = p - s + dot(s, vec3(G3));
  
  /* calculate i1 and i2 */
  vec3 e = step(vec3(0.0), x - x.yzx);
  vec3 i1 = e*(1.0 - e.zxy);
  vec3 i2 = 1.0 - e.zxy*(1.0 - e);
  
  /* x1, x2, x3 */
  vec3 x1 = x - i1 + G3;
  vec3 x2 = x - i2 + 2.0*G3;
  vec3 x3 = x - 1.0 + 3.0*G3;
  
  /* 2. find four surflets and store them in d */
  vec4 w, d;
  
  /* calculate surflet weights */
  w.x = dot(x, x);
  w.y = dot(x1, x1);
  w.z = dot(x2, x2);
  w.w = dot(x3, x3);
  
  /* w fades from 0.6 at the center of the surflet to 0.0 at the margin */
  w = max(0.6 - w, 0.0);
  
  /* calculate surflet components */
  d.x = dot(random3(s), x);
  d.y = dot(random3(s + i1), x1);
  d.z = dot(random3(s + i2), x2);
  d.w = dot(random3(s + 1.0), x3);
  
  /* multiply d by w^4 */
  w *= w;
  w *= w;
  d *= w;
  
  /* 3. return the sum of the four surflets */
  return dot(d, vec4(52.0));
}

/* const matrices for 3d rotation */
const mat3 rot1=mat3(-.37,.36,.85,-.14,-.93,.34,.92,.01,.4);
const mat3 rot2=mat3(-.55,-.39,.74,.33,-.91,-.24,.77,.12,.63);
const mat3 rot3=mat3(-.71,.52,-.47,-.08,-.72,-.68,-.7,-.45,.56);

float simplex3d_fractal(vec3 m){
  return .5333333*simplex3d(m*rot1)
  +.2666667*simplex3d(2.*m*rot2)
  +.1333333*simplex3d(4.*m*rot3)
  +.0666667*simplex3d(8.*m);
}

// USE:

// use with simplex
// vec3 p3 = vec3(time*0.0001,  vUv.x, vUv.y);
// float shade = simplex3d_fractal(p3*6.0+7.0);

void main(){
  // vec4 pixel = texture2D(tDiffuse, vUv);
  
  if(vFogFactor<.01)discard;
  vec2 xy=gl_PointCoord.xy;
  float d=distance(vec2(.5),xy);
  if(d>.5)discard;
  
  vec4 pixel=vec4(1.,1.,1.,1);
  
  pixel.rgb=mix(pixel.rgb,fogColor,vFogFactor);
  
  // pixel = vec4(vFogFactor);
  
  gl_FragColor=pixel;
}