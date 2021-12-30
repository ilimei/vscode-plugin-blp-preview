import precision from './precision.glsl';

const shader = `
${precision}

varying vec3 v_color;

void main() {
  gl_FragColor = vec4(v_color.xyz, 1.0);
}
`;

export default shader;
