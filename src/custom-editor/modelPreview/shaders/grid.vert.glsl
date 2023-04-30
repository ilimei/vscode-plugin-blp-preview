uniform mat4 u_VP;

attribute vec3 position;
attribute vec3 normal;

varying vec3 vPosition;
varying vec3 vNormal;


void main(void) {
  vPosition = position;
  vNormal = normal;
  gl_Position =  u_VP *  vec4(position, 1.0);
}
