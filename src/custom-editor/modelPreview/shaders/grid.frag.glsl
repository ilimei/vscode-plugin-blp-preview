// https://developer.mozilla.org/en-US/docs/Web/API/OES_standard_derivatives
#extension GL_OES_standard_derivatives : enable

precision mediump float;

#define SQRT2 1.41421356
#define PI 3.14159

uniform float visibility;

uniform vec3 mainColor;
uniform vec3 lineColor;
uniform vec4 gridControl;
uniform vec3 gridOffset;

varying vec3 vPosition;
varying vec3 vNormal;

float getDynamicVisibility(float position) {
    // Major grid line every Frequency defined in material.
    float majorGridFrequency = gridControl.y;
    if (floor(position + 0.5) == floor(position / majorGridFrequency + 0.5) * majorGridFrequency)
    {
        return 1.0;
    }  

    return gridControl.z;
}

float getAnisotropicAttenuation(float differentialLength) {
    const float maxNumberOfLines = 10.0;
    return clamp(1.0 / (differentialLength + 1.0) - 1.0 / maxNumberOfLines, 0.0, 1.0);
}

float isPointOnLine(float position, float differentialLength) {
    float fractionPartOfPosition = position - floor(position + 0.5); // fract part around unit [-0.5; 0.5]
    fractionPartOfPosition /= differentialLength; // adapt to the screen space size it takes
    fractionPartOfPosition = clamp(fractionPartOfPosition, -1., 1.);
    
    float result = 0.5 + 0.5 * cos(fractionPartOfPosition * PI); // Convert to 0-1 for antialiasing.
    return result;    
}

float contributionOnAxis(float position) {
    float differentialLength = length(vec2(dFdx(position), dFdy(position)));
    differentialLength *= SQRT2;  // Multiply by SQRT2 for diagonal length
    
    // Is the point on the line.
    float result = isPointOnLine(position, differentialLength);

    // Add dynamic visibility.
    float dynamicVisibility = getDynamicVisibility(position);
    result *= dynamicVisibility;
    
    // Anisotropic filtering.
    float anisotropicAttenuation = getAnisotropicAttenuation(differentialLength);
    result *= anisotropicAttenuation;
    
    return result;
}

float normalImpactOnAxis(float x) {
    float normalImpact = clamp(1.0 - 3.0 * abs(x * x * x), 0.0, 1.0);
    return normalImpact;
}

void main()
{
    // Scale position to the requested ratio.
    float gridRatio = gridControl.x;
    vec3 gridPos = (vPosition + gridOffset.xyz) / gridRatio;
    
    // Find the contribution of each coords.
    float x = contributionOnAxis(gridPos.x);
    float y = contributionOnAxis(gridPos.y);
    float z = contributionOnAxis(gridPos.z);
    
    // Find the normal contribution.
    vec3 normal = normalize(vNormal);
    x *= normalImpactOnAxis(normal.x);
    y *= normalImpactOnAxis(normal.y);
    z *= normalImpactOnAxis(normal.z);

    float grid = clamp(x + y + z, 0., 1.);

    vec3 color = mix(mainColor, lineColor, grid);
    float opacity = 1.0;

     // Apply the color.
    gl_FragColor = vec4(color.rgb, opacity * visibility);
}
