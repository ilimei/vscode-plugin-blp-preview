const shader = `
uniform mat4 u_VP;

attribute vec3 a_position;

void main() {
    gl_Position = u_VP * vec4(a_position.xyz, 1.0);
}
`;

export default shader;
