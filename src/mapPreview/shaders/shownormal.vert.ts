const shader = `
uniform mat4 u_VP;
uniform sampler2D u_heightMap;
uniform vec2 u_pixel;
uniform vec2 u_centerOffset;

attribute vec3 a_position;
attribute vec3 a_normal;
attribute vec2 a_uv;
attribute float a_flag;
attribute vec3 a_instancePosition;
attribute float a_instanceTexture;

varying vec3 v_normal;
varying vec2 v_uv;
varying float v_texture;
varying vec3 v_position;

void main() {
  vec2 halfPixel = u_pixel * 0.5;
  vec3 vOffset = vec3(u_centerOffset.xy, 0.0);
  
  // The bottom left corner of the map tile this vertex is on.
  vec2 corner = floor((a_instancePosition.xy - vec2(1.0, 0.0) - u_centerOffset.xy) / 128.0);
  float bottomLeft = texture2D(u_heightMap, corner * u_pixel + halfPixel).a;
  float bottomRight = texture2D(u_heightMap, (corner + vec2(1.0, 0.0)) * u_pixel + halfPixel).a;
  float topLeft = texture2D(u_heightMap, (corner + vec2(0.0, 1.0)) * u_pixel + halfPixel).a;
  float topRight = texture2D(u_heightMap, (corner + vec2(1.0, 1.0)) * u_pixel + halfPixel).a;

  // Do a bilinear interpolation between the heights to get the final value.
  float bottom = mix(bottomRight, bottomLeft, -a_position.x / 128.0);
  float top = mix(topRight, topLeft, -a_position.x / 128.0);
  float height = mix(bottom, top, a_position.y / 128.0);

	vec3 off = vec3(1.0, 1.0, 0.0);
	float hL = texture2D(u_heightMap, (corner - off.xz) * u_pixel).a;
	float hR = texture2D(u_heightMap, (corner + off.xz) * u_pixel).a;
	float hD = texture2D(u_heightMap, (corner - off.zy) * u_pixel).a;
	float hU = texture2D(u_heightMap, (corner + off.zy) * u_pixel).a;
	vec3 terrain_normal = normalize(vec3(hL - hR, hD - hU, 2.0));

  v_uv = a_uv;
  v_texture = a_instanceTexture;
  v_position = a_position + vec3(a_instancePosition.xy, a_instancePosition.z + height * 128.0);
  v_normal = normalize(vec3(terrain_normal.xy + a_normal.xy, terrain_normal.z * a_normal.z));
  if(mod(v_position.x, 128.0) == 0.0) {
    v_normal = vec3(0.0, v_normal.yz);
  }
  // v_normal = a_normal;

  if(a_flag == 1.0) {
    v_position = v_position + v_normal * 10.0;
  }

  gl_PointSize = 10.0;
  gl_Position = u_VP * vec4(v_position, 1.0);

}
`;

export default shader;


// const shader = `
// uniform mat4 u_VP;
// uniform sampler2D u_heightMap;
// uniform vec2 u_pixel;
// uniform vec2 u_centerOffset;

// attribute vec3 a_position;
// attribute vec3 a_normal;
// attribute vec2 a_uv;
// attribute vec3 a_instancePosition;
// attribute float a_instanceTexture;

// varying vec3 v_normal;
// varying vec2 v_uv;
// varying float v_texture;
// varying vec3 v_position;

// void main() {
//   // Half of a pixel in the cliff height map.
//   vec2 halfPixel = u_pixel * 0.5;

//   // The bottom left corner of the map tile this vertex is on.
//   vec2 corner = floor((a_instancePosition.xy - vec2(1.0, 0.0) - u_centerOffset.xy) / 128.0);

//   // Get the 4 closest heights in the height map.
//   float bottomLeft = texture2D(u_heightMap, corner * u_pixel + halfPixel).a;
//   float bottomRight = texture2D(u_heightMap, (corner + vec2(1.0, 0.0)) * u_pixel + halfPixel).a;
//   float topLeft = texture2D(u_heightMap, (corner + vec2(0.0, 1.0)) * u_pixel + halfPixel).a;
//   float topRight = texture2D(u_heightMap, (corner + vec2(1.0, 1.0)) * u_pixel + halfPixel).a;
  
//   // Do a bilinear interpolation between the heights to get the final value.
//   float bottom = mix(bottomRight, bottomLeft, -a_position.x / 128.0);
//   float top = mix(topRight, topLeft, -a_position.x / 128.0);
//   float height = mix(bottom, top, a_position.y / 128.0);

//   vec3 rotated_normal = a_normal;

//   vec2 off = vec2(1.0, 1.0);

//   float hL = texture2D(u_heightMap, vec2(corner - vec2(1.0, 0.0))*u_pixel +halfPixel).a;
//   float hR = texture2D(u_heightMap, vec2(corner + vec2(1.0, 0.0))*u_pixel +halfPixel).a;
//   float hD = texture2D(u_heightMap, vec2(corner - vec2(0.0, 1.0))*u_pixel +halfPixel).a;
//   float hU = texture2D(u_heightMap, vec2(corner + vec2(0.0, 1.0))*u_pixel +halfPixel).a;
// 	vec3 terrain_normal = normalize(vec3(hL - hR, hD - hU, 2.0));

//   v_normal = normalize(vec3(rotated_normal.xy + terrain_normal.xy, rotated_normal.z * terrain_normal.z));;
//   v_uv = a_uv;
//   v_texture = a_instanceTexture;
//   v_position = a_position + vec3(a_instancePosition.xy, a_instancePosition.z + height * 128.0);

//   gl_Position = u_VP * vec4(v_position, 1.0);
// }
// `;
