const shader = `
uniform mat4 u_VP;
uniform sampler2D u_heightMap;
uniform sampler2D u_cliff_heightMap;
uniform vec2 u_size;
uniform vec2 u_offset;
uniform vec2 u_sel;
uniform bool u_extended[14];
uniform float u_baseTileset;

attribute vec3 a_position;
attribute float a_InstanceID;

varying vec3 v_color;

void main() {
    vec2 corner = vec2(mod(a_InstanceID, u_size.x), floor(a_InstanceID / u_size.x));
    vec2 base = corner + a_position.xy;
    float height = texture2D(u_heightMap, base / u_size).a;
    v_color = vec3(1.0, 1.0, 1.0);
    if(mod(base.x, 4.0) == 0.0 && a_position.z == 1.0) {
      v_color.z = 0.0;
    }
    if(mod(base.y, 4.0) == 0.0 && a_position.z == 0.0) {
      v_color.z = 0.0;
    }
    gl_Position = u_VP * vec4(base * 128.0 + u_offset, height * 128.0 + 1.0, 1.0);
}
`;

export default shader;
