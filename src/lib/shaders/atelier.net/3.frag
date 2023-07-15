precision highp float;
uniform float time;
varying vec2 vUv;
varying vec3 vColor;
varying float vOpacity;
uniform float loadVal;

void main(){
  
  vec2 xy=gl_PointCoord.xy;
  float d=distance(vec2(.5),xy);
  
  if(d>.5)discard;
  
  vec4 pixel=vec4(vColor,1.);
  
  pixel=mix(vec4(1.),pixel,clamp(loadVal*5.,0.,1.)*vOpacity);
  
  gl_FragColor=pixel;
}