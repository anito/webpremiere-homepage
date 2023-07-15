precision highp float;
varying vec2 vUv;
varying vec3 vColor;
attribute vec3 color;
attribute vec3 position2;
attribute float size;

uniform float time;

varying float vFogFactor;

uniform float fogN;
uniform float fogF;

uniform float fogNear;
uniform float fogFar;
uniform float assemble;

float HALF_PI=3.1428*.5;

float sineOut(float t){
  return sin(t*HALF_PI);
}
float sineIn(float t){
  return sin((t-1.)*HALF_PI)+1.;
}
float quarticIn(float t){
  return pow(t,4.);
}
float quarticOut(float t){
  return pow(t-1.,3.)*(1.-t)+1.;
}

void main(){
  vUv=uv;
  vColor=color;
  
  vec3 pos=vec3(position);
  
  // gl_PointSize = 4. ;
  
  // use the delta between the point position and camera position to size point
  float xDelta=pow(pos[0]-cameraPosition[0],2.);
  float yDelta=pow(pos[1]-cameraPosition[1],2.);
  float zDelta=pow(pos[2]-cameraPosition[2],2.);
  float delta=pow(xDelta+yDelta+zDelta,.5);
  
  // vDist = delta;
  
  vFogFactor=smoothstep(fogN,fogF,delta);
  
  vec3 norm=pos-cameraPosition;
  
  pos+=((position2-pos)+norm)*quarticIn(clamp(-.1+vFogFactor,0.,1.))*assemble;
  
  vec4 projected=projectionMatrix*modelViewMatrix*vec4(pos,1.);
  
  gl_Position=projected;
  
  gl_PointSize=size/delta;
  
}