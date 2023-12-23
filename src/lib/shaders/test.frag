
#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_mouse;
uniform vec2 u_resolution;
uniform float u_time;

vec3 color_A=vec3(.8,.2,.2);
vec3 color_B=vec3(.2,.8,.2);
vec3 color_C=vec3(.2,.8,.8);

float circle(vec2 coord,vec2 center,float r){
  float dist=distance(coord,center);
  return 1.-step(r,dist);
}

float smoothcircle(vec2 coord,vec2 center,float r,float s){
  float dist=distance(coord,center);
  return 1.-smoothstep(r-s/2.,r+s/2.,dist);
}

void main(void){
  vec2 coord=gl_FragCoord.xy/u_resolution;
  vec2 mouse=u_mouse/u_resolution;
  
  vec2 st=gl_FragCoord.xy*1./u_resolution;
  vec3 c_1=color_A*circle(coord,mouse,.1);
  vec3 c_2=color_B*smoothcircle(coord,vec2(.4,.5),.3,.0);
  vec3 c_3=color_C*circle(coord,vec2(.4,.5),.05);
  
  gl_FragColor=vec4(c_1+c_3,1.);
  // gl_FragColor=vec4(c_1+c_2,1.);
}