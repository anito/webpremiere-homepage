precision highp float;
varying vec2 vUv;
varying float vFogFactor;

uniform float fogN;
uniform float fogF;

uniform float fogNear;
uniform float fogFar;

uniform float time;
uniform float progress;

// Simplex 2D noise
//
vec3 permute(vec3 x){return mod(((x*34.)+1.)*x,289.);}

float simplex(vec2 v){
  const vec4 C=vec4(.211324865405187,.366025403784439,
  -.577350269189626,.024390243902439);
  vec2 i=floor(v+dot(v,C.yy));
  vec2 x0=v-i+dot(i,C.xx);
  vec2 i1;
  i1=(x0.x>x0.y)?vec2(1.,0.):vec2(0.,1.);
  vec4 x12=x0.xyxy+C.xxzz;
  x12.xy-=i1;
  i=mod(i,289.);
  vec3 p=permute(permute(i.y+vec3(0.,i1.y,1.))
  +i.x+vec3(0.,i1.x,1.));
  vec3 m=max(.5-vec3(dot(x0,x0),dot(x12.xy,x12.xy),
  dot(x12.zw,x12.zw)),0.);
  m=m*m;
  m=m*m;
  vec3 x=2.*fract(p*C.www)-1.;
  vec3 h=abs(x)-.5;
  vec3 ox=floor(x+.5);
  vec3 a0=x-ox;
  m*=1.79284291400159-.85373472095314*(a0*a0+h*h);
  vec3 g;
  g.x=a0.x*x0.x+h.x*x0.y;
  g.yz=a0.yz*x12.xz+h.yz*x12.yw;
  return 130.*dot(m,g);
}

void main(){
  vUv=uv;
  
  vec3 pos=position;
  float newY=simplex(pos.xz*.5+time*.1)*10.+15.;
  pos.y+=sin(pos.x+time)*.4;
  pos.y=mix(pos.y,newY,progress);
  // use the delta between the point position and camera position to size point
  float xDelta=pow(pos[0]-cameraPosition[0],2.);
  float yDelta=pow(pos[1]-cameraPosition[1],2.);
  float zDelta=pow(pos[2]-cameraPosition[2],2.);
  float delta=pow(xDelta+yDelta+zDelta,.5);
  // vDist = delta;
  vFogFactor=smoothstep(fogN,fogF,delta);
  
  // pos.y = position.y;
  
  gl_PointSize=30./delta;
  gl_Position=projectionMatrix*modelViewMatrix*vec4(pos,1.);
}