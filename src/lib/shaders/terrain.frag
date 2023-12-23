float map(float value,float inMin,float inMax,float outMin,float outMax){
  return(value-inMin)*(outMax-outMin)/(inMax-inMin)+outMin;
}

uniform float time;
uniform float scroll;
uniform float waveAmplitude;
uniform float topoDefinition;
uniform vec3 topoColor;

varying vec3 vPosition;
varying vec2 vUv;

const float nLines=7.;

void main(void){
  float coord=vPosition.z*topoDefinition;
  float line=abs(fract(coord-0.1)-0.5)/fwidth(coord);
  line *=0.3;
  float c1=105.*sin(scroll)-21.;
  float coordCenter=c1-nLines*0.5;
  if(coord>c1||coord<c1-nLines){
    gl_FragColor=vec4(topoColor,1.-line);
    return;
  }
  float distToCenter=abs(coord-coordCenter);
  // Gradients
  vec3 from=vec3(.086,.086,.086);
  vec3 via=vec3(.086,.086,.086);
  vec3 to=vec3(.086,.086,.086);
  vec3 funColor=vUv.y>.5?mix(via,from,(vUv.y-.5)*2.):mix(to,via,vUv.y*2.);
  gl_FragColor=vec4(mix(vec3(.5,.5,.5),funColor,vUv.y),mix(1.-line,0.,pow(2.*distToCenter/nLines,5.)));
}