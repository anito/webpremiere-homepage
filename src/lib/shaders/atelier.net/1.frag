precision highp float;
uniform float time;
varying vec2 vUv;
varying vec3 vColor;

uniform float opacity;
uniform vec3 fogColor;
// uniform float fogNear;
// uniform float fogFar;
varying float vFogFactor;

void main(){
  
  vec2 xy=gl_PointCoord.xy;
  float d=distance(vec2(.5),xy);
  
  if(d>.5)discard;
  
  vec4 pixel=vec4(vColor,1.);
  // float fogFactor = smoothstep( fogNear, fogFar, vDist );
  
  pixel.rgb=mix(fogColor,pixel.rgb,opacity);
  
  pixel.rgb=mix(pixel.rgb,fogColor,vFogFactor);
  
  gl_FragColor=pixel;
}