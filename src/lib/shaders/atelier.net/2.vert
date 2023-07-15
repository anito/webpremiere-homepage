precision highp float;
varying vec2 vUv;
varying vec3 vColor;
attribute vec3 color;
attribute vec3 position2;
uniform float size;

uniform float time;

varying float vFogFactor;
varying float vOpacity;

uniform float fogN;
uniform float fogF;

uniform float fogNear;
uniform float fogFar;
uniform float assemble;
uniform float PI;
uniform float loadVal;
uniform float loadedProg;
attribute vec3 random;

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

float sineInOut(float t){
  return-.5*(cos(PI*t)-1.);
}

void main(){
  vUv=uv;
  vColor=color;
  vec3 r=position;
  
  float lv=loadVal;
  
  float angle=r.x*PI*2.+PI*.5;
  
  float x=cos(angle)*4.*lv;
  float y=sin(angle)*4.*lv;
  
  vec3 pos=vec3(x,y,0.);
  
  pos.x+=sin(time*(1.+r.z)+r.y*PI*25.*r.z)*r.y*(.01+.7*lv);
  pos.y+=sin(time*(1.+r.x)+r.z*PI*25.*r.x)*r.y*(.01+.7*lv);
  pos.z+=cos(time*(1.+r.y)+r.x*PI*25.*r.y)*r.y*(.01+1.*lv);
  
  float s=quarticIn(clamp((loadVal*1.2-(1.-r.x))*5.,0.,1.));
  
  vOpacity=min(s*10.,1.)-min(loadedProg*(1.+r.z),1.);
  
  vec4 projected=projectionMatrix*modelViewMatrix*vec4(pos,1.);
  
  gl_Position=projected;
  gl_PointSize=(10.-pos.z*4.)*s;
}