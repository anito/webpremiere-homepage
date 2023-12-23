#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_mouse;
uniform vec2 u_resolution;
uniform float u_time;

float random(vec3 scale,float seed){
  return fract(sin(dot(gl_FragCoord.xyz+seed,scale))*43758.5453+seed);
}

vec2 N22(vec2 p){
  vec3 a=fract(p.xyx*vec3(123.34,234.45,345.65));
  a+=dot(a,a+34.45);
  return fract(vec2(a.x*a.y,a.y*a.z));
}

void main(void){
  vec2 uv=(2.*gl_FragCoord.xy-u_resolution.xy)/u_resolution.y;

  float amount=3.;
  float m = 0.;
  float t = u_time*.1;
  float minDist = 100.;
  float cellIndex = 0.;
  vec3 col=vec3(0.);
  vec2 cid = vec2(0.);

  if(false){
    for (float i=0.; i<amount;i++) {
      vec2 n = N22(vec2(i));
      vec2 p = sin(n*t);

      float d = length(uv-p);
      m += smoothstep(.05, .049, d);

      if(d<minDist) {
        minDist=d;
        cellIndex=i;
      }
    }
  } else {
    uv *=amount;
    vec2 gv=fract(uv)-.5;
    vec2 id = floor(uv);
    // col.rg=id*.1;

    for(float y=-1.; y<=1.; y++) {
      for(float x=-1.; x<=1.; x++) {
        vec2 offset = vec2(x, y);
        
        vec2 n = N22(id+offset);
        vec2 p = offset+sin(n*t)*.5;
        float d = length(gv-p);

        if(d<minDist){
          minDist=d;
          cid=id+offset;
        }
      }
    }
    col = vec3(minDist);
    col.rg = cid*.1;
  }

  gl_FragColor=vec4(col,1.);
}