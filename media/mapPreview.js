/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */,
/* 2 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "create": () => (/* binding */ create),
/* harmony export */   "clone": () => (/* binding */ clone),
/* harmony export */   "length": () => (/* binding */ length),
/* harmony export */   "fromValues": () => (/* binding */ fromValues),
/* harmony export */   "copy": () => (/* binding */ copy),
/* harmony export */   "set": () => (/* binding */ set),
/* harmony export */   "add": () => (/* binding */ add),
/* harmony export */   "subtract": () => (/* binding */ subtract),
/* harmony export */   "multiply": () => (/* binding */ multiply),
/* harmony export */   "divide": () => (/* binding */ divide),
/* harmony export */   "ceil": () => (/* binding */ ceil),
/* harmony export */   "floor": () => (/* binding */ floor),
/* harmony export */   "min": () => (/* binding */ min),
/* harmony export */   "max": () => (/* binding */ max),
/* harmony export */   "round": () => (/* binding */ round),
/* harmony export */   "scale": () => (/* binding */ scale),
/* harmony export */   "scaleAndAdd": () => (/* binding */ scaleAndAdd),
/* harmony export */   "distance": () => (/* binding */ distance),
/* harmony export */   "squaredDistance": () => (/* binding */ squaredDistance),
/* harmony export */   "squaredLength": () => (/* binding */ squaredLength),
/* harmony export */   "negate": () => (/* binding */ negate),
/* harmony export */   "inverse": () => (/* binding */ inverse),
/* harmony export */   "normalize": () => (/* binding */ normalize),
/* harmony export */   "dot": () => (/* binding */ dot),
/* harmony export */   "cross": () => (/* binding */ cross),
/* harmony export */   "lerp": () => (/* binding */ lerp),
/* harmony export */   "hermite": () => (/* binding */ hermite),
/* harmony export */   "bezier": () => (/* binding */ bezier),
/* harmony export */   "random": () => (/* binding */ random),
/* harmony export */   "transformMat4": () => (/* binding */ transformMat4),
/* harmony export */   "transformMat3": () => (/* binding */ transformMat3),
/* harmony export */   "transformQuat": () => (/* binding */ transformQuat),
/* harmony export */   "rotateX": () => (/* binding */ rotateX),
/* harmony export */   "rotateY": () => (/* binding */ rotateY),
/* harmony export */   "rotateZ": () => (/* binding */ rotateZ),
/* harmony export */   "angle": () => (/* binding */ angle),
/* harmony export */   "zero": () => (/* binding */ zero),
/* harmony export */   "str": () => (/* binding */ str),
/* harmony export */   "exactEquals": () => (/* binding */ exactEquals),
/* harmony export */   "equals": () => (/* binding */ equals),
/* harmony export */   "sub": () => (/* binding */ sub),
/* harmony export */   "mul": () => (/* binding */ mul),
/* harmony export */   "div": () => (/* binding */ div),
/* harmony export */   "dist": () => (/* binding */ dist),
/* harmony export */   "sqrDist": () => (/* binding */ sqrDist),
/* harmony export */   "len": () => (/* binding */ len),
/* harmony export */   "sqrLen": () => (/* binding */ sqrLen),
/* harmony export */   "forEach": () => (/* binding */ forEach)
/* harmony export */ });
/* harmony import */ var _common_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);

/**
 * 3 Dimensional Vector
 * @module vec3
 */

/**
 * Creates a new, empty vec3
 *
 * @returns {vec3} a new 3D vector
 */

function create() {
  var out = new _common_js__WEBPACK_IMPORTED_MODULE_0__.ARRAY_TYPE(3);

  if (_common_js__WEBPACK_IMPORTED_MODULE_0__.ARRAY_TYPE != Float32Array) {
    out[0] = 0;
    out[1] = 0;
    out[2] = 0;
  }

  return out;
}
/**
 * Creates a new vec3 initialized with values from an existing vector
 *
 * @param {ReadonlyVec3} a vector to clone
 * @returns {vec3} a new 3D vector
 */

function clone(a) {
  var out = new _common_js__WEBPACK_IMPORTED_MODULE_0__.ARRAY_TYPE(3);
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  return out;
}
/**
 * Calculates the length of a vec3
 *
 * @param {ReadonlyVec3} a vector to calculate length of
 * @returns {Number} length of a
 */

function length(a) {
  var x = a[0];
  var y = a[1];
  var z = a[2];
  return Math.hypot(x, y, z);
}
/**
 * Creates a new vec3 initialized with the given values
 *
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @returns {vec3} a new 3D vector
 */

function fromValues(x, y, z) {
  var out = new _common_js__WEBPACK_IMPORTED_MODULE_0__.ARRAY_TYPE(3);
  out[0] = x;
  out[1] = y;
  out[2] = z;
  return out;
}
/**
 * Copy the values from one vec3 to another
 *
 * @param {vec3} out the receiving vector
 * @param {ReadonlyVec3} a the source vector
 * @returns {vec3} out
 */

function copy(out, a) {
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  return out;
}
/**
 * Set the components of a vec3 to the given values
 *
 * @param {vec3} out the receiving vector
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @returns {vec3} out
 */

function set(out, x, y, z) {
  out[0] = x;
  out[1] = y;
  out[2] = z;
  return out;
}
/**
 * Adds two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {ReadonlyVec3} a the first operand
 * @param {ReadonlyVec3} b the second operand
 * @returns {vec3} out
 */

function add(out, a, b) {
  out[0] = a[0] + b[0];
  out[1] = a[1] + b[1];
  out[2] = a[2] + b[2];
  return out;
}
/**
 * Subtracts vector b from vector a
 *
 * @param {vec3} out the receiving vector
 * @param {ReadonlyVec3} a the first operand
 * @param {ReadonlyVec3} b the second operand
 * @returns {vec3} out
 */

function subtract(out, a, b) {
  out[0] = a[0] - b[0];
  out[1] = a[1] - b[1];
  out[2] = a[2] - b[2];
  return out;
}
/**
 * Multiplies two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {ReadonlyVec3} a the first operand
 * @param {ReadonlyVec3} b the second operand
 * @returns {vec3} out
 */

function multiply(out, a, b) {
  out[0] = a[0] * b[0];
  out[1] = a[1] * b[1];
  out[2] = a[2] * b[2];
  return out;
}
/**
 * Divides two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {ReadonlyVec3} a the first operand
 * @param {ReadonlyVec3} b the second operand
 * @returns {vec3} out
 */

function divide(out, a, b) {
  out[0] = a[0] / b[0];
  out[1] = a[1] / b[1];
  out[2] = a[2] / b[2];
  return out;
}
/**
 * Math.ceil the components of a vec3
 *
 * @param {vec3} out the receiving vector
 * @param {ReadonlyVec3} a vector to ceil
 * @returns {vec3} out
 */

function ceil(out, a) {
  out[0] = Math.ceil(a[0]);
  out[1] = Math.ceil(a[1]);
  out[2] = Math.ceil(a[2]);
  return out;
}
/**
 * Math.floor the components of a vec3
 *
 * @param {vec3} out the receiving vector
 * @param {ReadonlyVec3} a vector to floor
 * @returns {vec3} out
 */

function floor(out, a) {
  out[0] = Math.floor(a[0]);
  out[1] = Math.floor(a[1]);
  out[2] = Math.floor(a[2]);
  return out;
}
/**
 * Returns the minimum of two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {ReadonlyVec3} a the first operand
 * @param {ReadonlyVec3} b the second operand
 * @returns {vec3} out
 */

function min(out, a, b) {
  out[0] = Math.min(a[0], b[0]);
  out[1] = Math.min(a[1], b[1]);
  out[2] = Math.min(a[2], b[2]);
  return out;
}
/**
 * Returns the maximum of two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {ReadonlyVec3} a the first operand
 * @param {ReadonlyVec3} b the second operand
 * @returns {vec3} out
 */

function max(out, a, b) {
  out[0] = Math.max(a[0], b[0]);
  out[1] = Math.max(a[1], b[1]);
  out[2] = Math.max(a[2], b[2]);
  return out;
}
/**
 * Math.round the components of a vec3
 *
 * @param {vec3} out the receiving vector
 * @param {ReadonlyVec3} a vector to round
 * @returns {vec3} out
 */

function round(out, a) {
  out[0] = Math.round(a[0]);
  out[1] = Math.round(a[1]);
  out[2] = Math.round(a[2]);
  return out;
}
/**
 * Scales a vec3 by a scalar number
 *
 * @param {vec3} out the receiving vector
 * @param {ReadonlyVec3} a the vector to scale
 * @param {Number} b amount to scale the vector by
 * @returns {vec3} out
 */

function scale(out, a, b) {
  out[0] = a[0] * b;
  out[1] = a[1] * b;
  out[2] = a[2] * b;
  return out;
}
/**
 * Adds two vec3's after scaling the second operand by a scalar value
 *
 * @param {vec3} out the receiving vector
 * @param {ReadonlyVec3} a the first operand
 * @param {ReadonlyVec3} b the second operand
 * @param {Number} scale the amount to scale b by before adding
 * @returns {vec3} out
 */

function scaleAndAdd(out, a, b, scale) {
  out[0] = a[0] + b[0] * scale;
  out[1] = a[1] + b[1] * scale;
  out[2] = a[2] + b[2] * scale;
  return out;
}
/**
 * Calculates the euclidian distance between two vec3's
 *
 * @param {ReadonlyVec3} a the first operand
 * @param {ReadonlyVec3} b the second operand
 * @returns {Number} distance between a and b
 */

function distance(a, b) {
  var x = b[0] - a[0];
  var y = b[1] - a[1];
  var z = b[2] - a[2];
  return Math.hypot(x, y, z);
}
/**
 * Calculates the squared euclidian distance between two vec3's
 *
 * @param {ReadonlyVec3} a the first operand
 * @param {ReadonlyVec3} b the second operand
 * @returns {Number} squared distance between a and b
 */

function squaredDistance(a, b) {
  var x = b[0] - a[0];
  var y = b[1] - a[1];
  var z = b[2] - a[2];
  return x * x + y * y + z * z;
}
/**
 * Calculates the squared length of a vec3
 *
 * @param {ReadonlyVec3} a vector to calculate squared length of
 * @returns {Number} squared length of a
 */

function squaredLength(a) {
  var x = a[0];
  var y = a[1];
  var z = a[2];
  return x * x + y * y + z * z;
}
/**
 * Negates the components of a vec3
 *
 * @param {vec3} out the receiving vector
 * @param {ReadonlyVec3} a vector to negate
 * @returns {vec3} out
 */

function negate(out, a) {
  out[0] = -a[0];
  out[1] = -a[1];
  out[2] = -a[2];
  return out;
}
/**
 * Returns the inverse of the components of a vec3
 *
 * @param {vec3} out the receiving vector
 * @param {ReadonlyVec3} a vector to invert
 * @returns {vec3} out
 */

function inverse(out, a) {
  out[0] = 1.0 / a[0];
  out[1] = 1.0 / a[1];
  out[2] = 1.0 / a[2];
  return out;
}
/**
 * Normalize a vec3
 *
 * @param {vec3} out the receiving vector
 * @param {ReadonlyVec3} a vector to normalize
 * @returns {vec3} out
 */

function normalize(out, a) {
  var x = a[0];
  var y = a[1];
  var z = a[2];
  var len = x * x + y * y + z * z;

  if (len > 0) {
    //TODO: evaluate use of glm_invsqrt here?
    len = 1 / Math.sqrt(len);
  }

  out[0] = a[0] * len;
  out[1] = a[1] * len;
  out[2] = a[2] * len;
  return out;
}
/**
 * Calculates the dot product of two vec3's
 *
 * @param {ReadonlyVec3} a the first operand
 * @param {ReadonlyVec3} b the second operand
 * @returns {Number} dot product of a and b
 */

function dot(a, b) {
  return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
}
/**
 * Computes the cross product of two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {ReadonlyVec3} a the first operand
 * @param {ReadonlyVec3} b the second operand
 * @returns {vec3} out
 */

function cross(out, a, b) {
  var ax = a[0],
      ay = a[1],
      az = a[2];
  var bx = b[0],
      by = b[1],
      bz = b[2];
  out[0] = ay * bz - az * by;
  out[1] = az * bx - ax * bz;
  out[2] = ax * by - ay * bx;
  return out;
}
/**
 * Performs a linear interpolation between two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {ReadonlyVec3} a the first operand
 * @param {ReadonlyVec3} b the second operand
 * @param {Number} t interpolation amount, in the range [0-1], between the two inputs
 * @returns {vec3} out
 */

function lerp(out, a, b, t) {
  var ax = a[0];
  var ay = a[1];
  var az = a[2];
  out[0] = ax + t * (b[0] - ax);
  out[1] = ay + t * (b[1] - ay);
  out[2] = az + t * (b[2] - az);
  return out;
}
/**
 * Performs a hermite interpolation with two control points
 *
 * @param {vec3} out the receiving vector
 * @param {ReadonlyVec3} a the first operand
 * @param {ReadonlyVec3} b the second operand
 * @param {ReadonlyVec3} c the third operand
 * @param {ReadonlyVec3} d the fourth operand
 * @param {Number} t interpolation amount, in the range [0-1], between the two inputs
 * @returns {vec3} out
 */

function hermite(out, a, b, c, d, t) {
  var factorTimes2 = t * t;
  var factor1 = factorTimes2 * (2 * t - 3) + 1;
  var factor2 = factorTimes2 * (t - 2) + t;
  var factor3 = factorTimes2 * (t - 1);
  var factor4 = factorTimes2 * (3 - 2 * t);
  out[0] = a[0] * factor1 + b[0] * factor2 + c[0] * factor3 + d[0] * factor4;
  out[1] = a[1] * factor1 + b[1] * factor2 + c[1] * factor3 + d[1] * factor4;
  out[2] = a[2] * factor1 + b[2] * factor2 + c[2] * factor3 + d[2] * factor4;
  return out;
}
/**
 * Performs a bezier interpolation with two control points
 *
 * @param {vec3} out the receiving vector
 * @param {ReadonlyVec3} a the first operand
 * @param {ReadonlyVec3} b the second operand
 * @param {ReadonlyVec3} c the third operand
 * @param {ReadonlyVec3} d the fourth operand
 * @param {Number} t interpolation amount, in the range [0-1], between the two inputs
 * @returns {vec3} out
 */

function bezier(out, a, b, c, d, t) {
  var inverseFactor = 1 - t;
  var inverseFactorTimesTwo = inverseFactor * inverseFactor;
  var factorTimes2 = t * t;
  var factor1 = inverseFactorTimesTwo * inverseFactor;
  var factor2 = 3 * t * inverseFactorTimesTwo;
  var factor3 = 3 * factorTimes2 * inverseFactor;
  var factor4 = factorTimes2 * t;
  out[0] = a[0] * factor1 + b[0] * factor2 + c[0] * factor3 + d[0] * factor4;
  out[1] = a[1] * factor1 + b[1] * factor2 + c[1] * factor3 + d[1] * factor4;
  out[2] = a[2] * factor1 + b[2] * factor2 + c[2] * factor3 + d[2] * factor4;
  return out;
}
/**
 * Generates a random vector with the given scale
 *
 * @param {vec3} out the receiving vector
 * @param {Number} [scale] Length of the resulting vector. If ommitted, a unit vector will be returned
 * @returns {vec3} out
 */

function random(out, scale) {
  scale = scale || 1.0;
  var r = _common_js__WEBPACK_IMPORTED_MODULE_0__.RANDOM() * 2.0 * Math.PI;
  var z = _common_js__WEBPACK_IMPORTED_MODULE_0__.RANDOM() * 2.0 - 1.0;
  var zScale = Math.sqrt(1.0 - z * z) * scale;
  out[0] = Math.cos(r) * zScale;
  out[1] = Math.sin(r) * zScale;
  out[2] = z * scale;
  return out;
}
/**
 * Transforms the vec3 with a mat4.
 * 4th vector component is implicitly '1'
 *
 * @param {vec3} out the receiving vector
 * @param {ReadonlyVec3} a the vector to transform
 * @param {ReadonlyMat4} m matrix to transform with
 * @returns {vec3} out
 */

function transformMat4(out, a, m) {
  var x = a[0],
      y = a[1],
      z = a[2];
  var w = m[3] * x + m[7] * y + m[11] * z + m[15];
  w = w || 1.0;
  out[0] = (m[0] * x + m[4] * y + m[8] * z + m[12]) / w;
  out[1] = (m[1] * x + m[5] * y + m[9] * z + m[13]) / w;
  out[2] = (m[2] * x + m[6] * y + m[10] * z + m[14]) / w;
  return out;
}
/**
 * Transforms the vec3 with a mat3.
 *
 * @param {vec3} out the receiving vector
 * @param {ReadonlyVec3} a the vector to transform
 * @param {ReadonlyMat3} m the 3x3 matrix to transform with
 * @returns {vec3} out
 */

function transformMat3(out, a, m) {
  var x = a[0],
      y = a[1],
      z = a[2];
  out[0] = x * m[0] + y * m[3] + z * m[6];
  out[1] = x * m[1] + y * m[4] + z * m[7];
  out[2] = x * m[2] + y * m[5] + z * m[8];
  return out;
}
/**
 * Transforms the vec3 with a quat
 * Can also be used for dual quaternions. (Multiply it with the real part)
 *
 * @param {vec3} out the receiving vector
 * @param {ReadonlyVec3} a the vector to transform
 * @param {ReadonlyQuat} q quaternion to transform with
 * @returns {vec3} out
 */

function transformQuat(out, a, q) {
  // benchmarks: https://jsperf.com/quaternion-transform-vec3-implementations-fixed
  var qx = q[0],
      qy = q[1],
      qz = q[2],
      qw = q[3];
  var x = a[0],
      y = a[1],
      z = a[2]; // var qvec = [qx, qy, qz];
  // var uv = vec3.cross([], qvec, a);

  var uvx = qy * z - qz * y,
      uvy = qz * x - qx * z,
      uvz = qx * y - qy * x; // var uuv = vec3.cross([], qvec, uv);

  var uuvx = qy * uvz - qz * uvy,
      uuvy = qz * uvx - qx * uvz,
      uuvz = qx * uvy - qy * uvx; // vec3.scale(uv, uv, 2 * w);

  var w2 = qw * 2;
  uvx *= w2;
  uvy *= w2;
  uvz *= w2; // vec3.scale(uuv, uuv, 2);

  uuvx *= 2;
  uuvy *= 2;
  uuvz *= 2; // return vec3.add(out, a, vec3.add(out, uv, uuv));

  out[0] = x + uvx + uuvx;
  out[1] = y + uvy + uuvy;
  out[2] = z + uvz + uuvz;
  return out;
}
/**
 * Rotate a 3D vector around the x-axis
 * @param {vec3} out The receiving vec3
 * @param {ReadonlyVec3} a The vec3 point to rotate
 * @param {ReadonlyVec3} b The origin of the rotation
 * @param {Number} rad The angle of rotation in radians
 * @returns {vec3} out
 */

function rotateX(out, a, b, rad) {
  var p = [],
      r = []; //Translate point to the origin

  p[0] = a[0] - b[0];
  p[1] = a[1] - b[1];
  p[2] = a[2] - b[2]; //perform rotation

  r[0] = p[0];
  r[1] = p[1] * Math.cos(rad) - p[2] * Math.sin(rad);
  r[2] = p[1] * Math.sin(rad) + p[2] * Math.cos(rad); //translate to correct position

  out[0] = r[0] + b[0];
  out[1] = r[1] + b[1];
  out[2] = r[2] + b[2];
  return out;
}
/**
 * Rotate a 3D vector around the y-axis
 * @param {vec3} out The receiving vec3
 * @param {ReadonlyVec3} a The vec3 point to rotate
 * @param {ReadonlyVec3} b The origin of the rotation
 * @param {Number} rad The angle of rotation in radians
 * @returns {vec3} out
 */

function rotateY(out, a, b, rad) {
  var p = [],
      r = []; //Translate point to the origin

  p[0] = a[0] - b[0];
  p[1] = a[1] - b[1];
  p[2] = a[2] - b[2]; //perform rotation

  r[0] = p[2] * Math.sin(rad) + p[0] * Math.cos(rad);
  r[1] = p[1];
  r[2] = p[2] * Math.cos(rad) - p[0] * Math.sin(rad); //translate to correct position

  out[0] = r[0] + b[0];
  out[1] = r[1] + b[1];
  out[2] = r[2] + b[2];
  return out;
}
/**
 * Rotate a 3D vector around the z-axis
 * @param {vec3} out The receiving vec3
 * @param {ReadonlyVec3} a The vec3 point to rotate
 * @param {ReadonlyVec3} b The origin of the rotation
 * @param {Number} rad The angle of rotation in radians
 * @returns {vec3} out
 */

function rotateZ(out, a, b, rad) {
  var p = [],
      r = []; //Translate point to the origin

  p[0] = a[0] - b[0];
  p[1] = a[1] - b[1];
  p[2] = a[2] - b[2]; //perform rotation

  r[0] = p[0] * Math.cos(rad) - p[1] * Math.sin(rad);
  r[1] = p[0] * Math.sin(rad) + p[1] * Math.cos(rad);
  r[2] = p[2]; //translate to correct position

  out[0] = r[0] + b[0];
  out[1] = r[1] + b[1];
  out[2] = r[2] + b[2];
  return out;
}
/**
 * Get the angle between two 3D vectors
 * @param {ReadonlyVec3} a The first operand
 * @param {ReadonlyVec3} b The second operand
 * @returns {Number} The angle in radians
 */

function angle(a, b) {
  var ax = a[0],
      ay = a[1],
      az = a[2],
      bx = b[0],
      by = b[1],
      bz = b[2],
      mag1 = Math.sqrt(ax * ax + ay * ay + az * az),
      mag2 = Math.sqrt(bx * bx + by * by + bz * bz),
      mag = mag1 * mag2,
      cosine = mag && dot(a, b) / mag;
  return Math.acos(Math.min(Math.max(cosine, -1), 1));
}
/**
 * Set the components of a vec3 to zero
 *
 * @param {vec3} out the receiving vector
 * @returns {vec3} out
 */

function zero(out) {
  out[0] = 0.0;
  out[1] = 0.0;
  out[2] = 0.0;
  return out;
}
/**
 * Returns a string representation of a vector
 *
 * @param {ReadonlyVec3} a vector to represent as a string
 * @returns {String} string representation of the vector
 */

function str(a) {
  return "vec3(" + a[0] + ", " + a[1] + ", " + a[2] + ")";
}
/**
 * Returns whether or not the vectors have exactly the same elements in the same position (when compared with ===)
 *
 * @param {ReadonlyVec3} a The first vector.
 * @param {ReadonlyVec3} b The second vector.
 * @returns {Boolean} True if the vectors are equal, false otherwise.
 */

function exactEquals(a, b) {
  return a[0] === b[0] && a[1] === b[1] && a[2] === b[2];
}
/**
 * Returns whether or not the vectors have approximately the same elements in the same position.
 *
 * @param {ReadonlyVec3} a The first vector.
 * @param {ReadonlyVec3} b The second vector.
 * @returns {Boolean} True if the vectors are equal, false otherwise.
 */

function equals(a, b) {
  var a0 = a[0],
      a1 = a[1],
      a2 = a[2];
  var b0 = b[0],
      b1 = b[1],
      b2 = b[2];
  return Math.abs(a0 - b0) <= _common_js__WEBPACK_IMPORTED_MODULE_0__.EPSILON * Math.max(1.0, Math.abs(a0), Math.abs(b0)) && Math.abs(a1 - b1) <= _common_js__WEBPACK_IMPORTED_MODULE_0__.EPSILON * Math.max(1.0, Math.abs(a1), Math.abs(b1)) && Math.abs(a2 - b2) <= _common_js__WEBPACK_IMPORTED_MODULE_0__.EPSILON * Math.max(1.0, Math.abs(a2), Math.abs(b2));
}
/**
 * Alias for {@link vec3.subtract}
 * @function
 */

var sub = subtract;
/**
 * Alias for {@link vec3.multiply}
 * @function
 */

var mul = multiply;
/**
 * Alias for {@link vec3.divide}
 * @function
 */

var div = divide;
/**
 * Alias for {@link vec3.distance}
 * @function
 */

var dist = distance;
/**
 * Alias for {@link vec3.squaredDistance}
 * @function
 */

var sqrDist = squaredDistance;
/**
 * Alias for {@link vec3.length}
 * @function
 */

var len = length;
/**
 * Alias for {@link vec3.squaredLength}
 * @function
 */

var sqrLen = squaredLength;
/**
 * Perform some operation over an array of vec3s.
 *
 * @param {Array} a the array of vectors to iterate over
 * @param {Number} stride Number of elements between the start of each vec3. If 0 assumes tightly packed
 * @param {Number} offset Number of elements to skip at the beginning of the array
 * @param {Number} count Number of vec3s to iterate over. If 0 iterates over entire array
 * @param {Function} fn Function to call for each vector in the array
 * @param {Object} [arg] additional argument to pass to fn
 * @returns {Array} a
 * @function
 */

var forEach = function () {
  var vec = create();
  return function (a, stride, offset, count, fn, arg) {
    var i, l;

    if (!stride) {
      stride = 3;
    }

    if (!offset) {
      offset = 0;
    }

    if (count) {
      l = Math.min(count * stride + offset, a.length);
    } else {
      l = a.length;
    }

    for (i = offset; i < l; i += stride) {
      vec[0] = a[i];
      vec[1] = a[i + 1];
      vec[2] = a[i + 2];
      fn(vec, vec, arg);
      a[i] = vec[0];
      a[i + 1] = vec[1];
      a[i + 2] = vec[2];
    }

    return a;
  };
}();

/***/ }),
/* 3 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "EPSILON": () => (/* binding */ EPSILON),
/* harmony export */   "ARRAY_TYPE": () => (/* binding */ ARRAY_TYPE),
/* harmony export */   "RANDOM": () => (/* binding */ RANDOM),
/* harmony export */   "setMatrixArrayType": () => (/* binding */ setMatrixArrayType),
/* harmony export */   "toRadian": () => (/* binding */ toRadian),
/* harmony export */   "equals": () => (/* binding */ equals)
/* harmony export */ });
/**
 * Common utilities
 * @module glMatrix
 */
// Configuration Constants
var EPSILON = 0.000001;
var ARRAY_TYPE = typeof Float32Array !== 'undefined' ? Float32Array : Array;
var RANDOM = Math.random;
/**
 * Sets the type of array used when creating new vectors and matrices
 *
 * @param {Float32ArrayConstructor | ArrayConstructor} type Array type, such as Float32Array or Array
 */

function setMatrixArrayType(type) {
  ARRAY_TYPE = type;
}
var degree = Math.PI / 180;
/**
 * Convert Degree To Radian
 *
 * @param {Number} a Angle in Degrees
 */

function toRadian(a) {
  return a * degree;
}
/**
 * Tests whether or not the arguments have approximately the same value, within an absolute
 * or relative tolerance of glMatrix.EPSILON (an absolute tolerance is used for values less
 * than or equal to 1.0, and a relative tolerance is used for larger values)
 *
 * @param {Number} a The first number to test.
 * @param {Number} b The second number to test.
 * @returns {Boolean} True if the numbers are approximately equal, false otherwise.
 */

function equals(a, b) {
  return Math.abs(a - b) <= EPSILON * Math.max(1.0, Math.abs(a), Math.abs(b));
}
if (!Math.hypot) Math.hypot = function () {
  var y = 0,
      i = arguments.length;

  while (i--) {
    y += arguments[i] * arguments[i];
  }

  return Math.sqrt(y);
};

/***/ }),
/* 4 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "create": () => (/* binding */ create),
/* harmony export */   "identity": () => (/* binding */ identity),
/* harmony export */   "setAxisAngle": () => (/* binding */ setAxisAngle),
/* harmony export */   "getAxisAngle": () => (/* binding */ getAxisAngle),
/* harmony export */   "getAngle": () => (/* binding */ getAngle),
/* harmony export */   "multiply": () => (/* binding */ multiply),
/* harmony export */   "rotateX": () => (/* binding */ rotateX),
/* harmony export */   "rotateY": () => (/* binding */ rotateY),
/* harmony export */   "rotateZ": () => (/* binding */ rotateZ),
/* harmony export */   "calculateW": () => (/* binding */ calculateW),
/* harmony export */   "exp": () => (/* binding */ exp),
/* harmony export */   "ln": () => (/* binding */ ln),
/* harmony export */   "pow": () => (/* binding */ pow),
/* harmony export */   "slerp": () => (/* binding */ slerp),
/* harmony export */   "random": () => (/* binding */ random),
/* harmony export */   "invert": () => (/* binding */ invert),
/* harmony export */   "conjugate": () => (/* binding */ conjugate),
/* harmony export */   "fromMat3": () => (/* binding */ fromMat3),
/* harmony export */   "fromEuler": () => (/* binding */ fromEuler),
/* harmony export */   "str": () => (/* binding */ str),
/* harmony export */   "clone": () => (/* binding */ clone),
/* harmony export */   "fromValues": () => (/* binding */ fromValues),
/* harmony export */   "copy": () => (/* binding */ copy),
/* harmony export */   "set": () => (/* binding */ set),
/* harmony export */   "add": () => (/* binding */ add),
/* harmony export */   "mul": () => (/* binding */ mul),
/* harmony export */   "scale": () => (/* binding */ scale),
/* harmony export */   "dot": () => (/* binding */ dot),
/* harmony export */   "lerp": () => (/* binding */ lerp),
/* harmony export */   "length": () => (/* binding */ length),
/* harmony export */   "len": () => (/* binding */ len),
/* harmony export */   "squaredLength": () => (/* binding */ squaredLength),
/* harmony export */   "sqrLen": () => (/* binding */ sqrLen),
/* harmony export */   "normalize": () => (/* binding */ normalize),
/* harmony export */   "exactEquals": () => (/* binding */ exactEquals),
/* harmony export */   "equals": () => (/* binding */ equals),
/* harmony export */   "rotationTo": () => (/* binding */ rotationTo),
/* harmony export */   "sqlerp": () => (/* binding */ sqlerp),
/* harmony export */   "setAxes": () => (/* binding */ setAxes)
/* harmony export */ });
/* harmony import */ var _common_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);
/* harmony import */ var _mat3_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6);
/* harmony import */ var _vec3_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2);
/* harmony import */ var _vec4_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5);




/**
 * Quaternion
 * @module quat
 */

/**
 * Creates a new identity quat
 *
 * @returns {quat} a new quaternion
 */

function create() {
  var out = new _common_js__WEBPACK_IMPORTED_MODULE_0__.ARRAY_TYPE(4);

  if (_common_js__WEBPACK_IMPORTED_MODULE_0__.ARRAY_TYPE != Float32Array) {
    out[0] = 0;
    out[1] = 0;
    out[2] = 0;
  }

  out[3] = 1;
  return out;
}
/**
 * Set a quat to the identity quaternion
 *
 * @param {quat} out the receiving quaternion
 * @returns {quat} out
 */

function identity(out) {
  out[0] = 0;
  out[1] = 0;
  out[2] = 0;
  out[3] = 1;
  return out;
}
/**
 * Sets a quat from the given angle and rotation axis,
 * then returns it.
 *
 * @param {quat} out the receiving quaternion
 * @param {ReadonlyVec3} axis the axis around which to rotate
 * @param {Number} rad the angle in radians
 * @returns {quat} out
 **/

function setAxisAngle(out, axis, rad) {
  rad = rad * 0.5;
  var s = Math.sin(rad);
  out[0] = s * axis[0];
  out[1] = s * axis[1];
  out[2] = s * axis[2];
  out[3] = Math.cos(rad);
  return out;
}
/**
 * Gets the rotation axis and angle for a given
 *  quaternion. If a quaternion is created with
 *  setAxisAngle, this method will return the same
 *  values as providied in the original parameter list
 *  OR functionally equivalent values.
 * Example: The quaternion formed by axis [0, 0, 1] and
 *  angle -90 is the same as the quaternion formed by
 *  [0, 0, 1] and 270. This method favors the latter.
 * @param  {vec3} out_axis  Vector receiving the axis of rotation
 * @param  {ReadonlyQuat} q     Quaternion to be decomposed
 * @return {Number}     Angle, in radians, of the rotation
 */

function getAxisAngle(out_axis, q) {
  var rad = Math.acos(q[3]) * 2.0;
  var s = Math.sin(rad / 2.0);

  if (s > _common_js__WEBPACK_IMPORTED_MODULE_0__.EPSILON) {
    out_axis[0] = q[0] / s;
    out_axis[1] = q[1] / s;
    out_axis[2] = q[2] / s;
  } else {
    // If s is zero, return any axis (no rotation - axis does not matter)
    out_axis[0] = 1;
    out_axis[1] = 0;
    out_axis[2] = 0;
  }

  return rad;
}
/**
 * Gets the angular distance between two unit quaternions
 *
 * @param  {ReadonlyQuat} a     Origin unit quaternion
 * @param  {ReadonlyQuat} b     Destination unit quaternion
 * @return {Number}     Angle, in radians, between the two quaternions
 */

function getAngle(a, b) {
  var dotproduct = dot(a, b);
  return Math.acos(2 * dotproduct * dotproduct - 1);
}
/**
 * Multiplies two quat's
 *
 * @param {quat} out the receiving quaternion
 * @param {ReadonlyQuat} a the first operand
 * @param {ReadonlyQuat} b the second operand
 * @returns {quat} out
 */

function multiply(out, a, b) {
  var ax = a[0],
      ay = a[1],
      az = a[2],
      aw = a[3];
  var bx = b[0],
      by = b[1],
      bz = b[2],
      bw = b[3];
  out[0] = ax * bw + aw * bx + ay * bz - az * by;
  out[1] = ay * bw + aw * by + az * bx - ax * bz;
  out[2] = az * bw + aw * bz + ax * by - ay * bx;
  out[3] = aw * bw - ax * bx - ay * by - az * bz;
  return out;
}
/**
 * Rotates a quaternion by the given angle about the X axis
 *
 * @param {quat} out quat receiving operation result
 * @param {ReadonlyQuat} a quat to rotate
 * @param {number} rad angle (in radians) to rotate
 * @returns {quat} out
 */

function rotateX(out, a, rad) {
  rad *= 0.5;
  var ax = a[0],
      ay = a[1],
      az = a[2],
      aw = a[3];
  var bx = Math.sin(rad),
      bw = Math.cos(rad);
  out[0] = ax * bw + aw * bx;
  out[1] = ay * bw + az * bx;
  out[2] = az * bw - ay * bx;
  out[3] = aw * bw - ax * bx;
  return out;
}
/**
 * Rotates a quaternion by the given angle about the Y axis
 *
 * @param {quat} out quat receiving operation result
 * @param {ReadonlyQuat} a quat to rotate
 * @param {number} rad angle (in radians) to rotate
 * @returns {quat} out
 */

function rotateY(out, a, rad) {
  rad *= 0.5;
  var ax = a[0],
      ay = a[1],
      az = a[2],
      aw = a[3];
  var by = Math.sin(rad),
      bw = Math.cos(rad);
  out[0] = ax * bw - az * by;
  out[1] = ay * bw + aw * by;
  out[2] = az * bw + ax * by;
  out[3] = aw * bw - ay * by;
  return out;
}
/**
 * Rotates a quaternion by the given angle about the Z axis
 *
 * @param {quat} out quat receiving operation result
 * @param {ReadonlyQuat} a quat to rotate
 * @param {number} rad angle (in radians) to rotate
 * @returns {quat} out
 */

function rotateZ(out, a, rad) {
  rad *= 0.5;
  var ax = a[0],
      ay = a[1],
      az = a[2],
      aw = a[3];
  var bz = Math.sin(rad),
      bw = Math.cos(rad);
  out[0] = ax * bw + ay * bz;
  out[1] = ay * bw - ax * bz;
  out[2] = az * bw + aw * bz;
  out[3] = aw * bw - az * bz;
  return out;
}
/**
 * Calculates the W component of a quat from the X, Y, and Z components.
 * Assumes that quaternion is 1 unit in length.
 * Any existing W component will be ignored.
 *
 * @param {quat} out the receiving quaternion
 * @param {ReadonlyQuat} a quat to calculate W component of
 * @returns {quat} out
 */

function calculateW(out, a) {
  var x = a[0],
      y = a[1],
      z = a[2];
  out[0] = x;
  out[1] = y;
  out[2] = z;
  out[3] = Math.sqrt(Math.abs(1.0 - x * x - y * y - z * z));
  return out;
}
/**
 * Calculate the exponential of a unit quaternion.
 *
 * @param {quat} out the receiving quaternion
 * @param {ReadonlyQuat} a quat to calculate the exponential of
 * @returns {quat} out
 */

function exp(out, a) {
  var x = a[0],
      y = a[1],
      z = a[2],
      w = a[3];
  var r = Math.sqrt(x * x + y * y + z * z);
  var et = Math.exp(w);
  var s = r > 0 ? et * Math.sin(r) / r : 0;
  out[0] = x * s;
  out[1] = y * s;
  out[2] = z * s;
  out[3] = et * Math.cos(r);
  return out;
}
/**
 * Calculate the natural logarithm of a unit quaternion.
 *
 * @param {quat} out the receiving quaternion
 * @param {ReadonlyQuat} a quat to calculate the exponential of
 * @returns {quat} out
 */

function ln(out, a) {
  var x = a[0],
      y = a[1],
      z = a[2],
      w = a[3];
  var r = Math.sqrt(x * x + y * y + z * z);
  var t = r > 0 ? Math.atan2(r, w) / r : 0;
  out[0] = x * t;
  out[1] = y * t;
  out[2] = z * t;
  out[3] = 0.5 * Math.log(x * x + y * y + z * z + w * w);
  return out;
}
/**
 * Calculate the scalar power of a unit quaternion.
 *
 * @param {quat} out the receiving quaternion
 * @param {ReadonlyQuat} a quat to calculate the exponential of
 * @param {Number} b amount to scale the quaternion by
 * @returns {quat} out
 */

function pow(out, a, b) {
  ln(out, a);
  scale(out, out, b);
  exp(out, out);
  return out;
}
/**
 * Performs a spherical linear interpolation between two quat
 *
 * @param {quat} out the receiving quaternion
 * @param {ReadonlyQuat} a the first operand
 * @param {ReadonlyQuat} b the second operand
 * @param {Number} t interpolation amount, in the range [0-1], between the two inputs
 * @returns {quat} out
 */

function slerp(out, a, b, t) {
  // benchmarks:
  //    http://jsperf.com/quaternion-slerp-implementations
  var ax = a[0],
      ay = a[1],
      az = a[2],
      aw = a[3];
  var bx = b[0],
      by = b[1],
      bz = b[2],
      bw = b[3];
  var omega, cosom, sinom, scale0, scale1; // calc cosine

  cosom = ax * bx + ay * by + az * bz + aw * bw; // adjust signs (if necessary)

  if (cosom < 0.0) {
    cosom = -cosom;
    bx = -bx;
    by = -by;
    bz = -bz;
    bw = -bw;
  } // calculate coefficients


  if (1.0 - cosom > _common_js__WEBPACK_IMPORTED_MODULE_0__.EPSILON) {
    // standard case (slerp)
    omega = Math.acos(cosom);
    sinom = Math.sin(omega);
    scale0 = Math.sin((1.0 - t) * omega) / sinom;
    scale1 = Math.sin(t * omega) / sinom;
  } else {
    // "from" and "to" quaternions are very close
    //  ... so we can do a linear interpolation
    scale0 = 1.0 - t;
    scale1 = t;
  } // calculate final values


  out[0] = scale0 * ax + scale1 * bx;
  out[1] = scale0 * ay + scale1 * by;
  out[2] = scale0 * az + scale1 * bz;
  out[3] = scale0 * aw + scale1 * bw;
  return out;
}
/**
 * Generates a random unit quaternion
 *
 * @param {quat} out the receiving quaternion
 * @returns {quat} out
 */

function random(out) {
  // Implementation of http://planning.cs.uiuc.edu/node198.html
  // TODO: Calling random 3 times is probably not the fastest solution
  var u1 = _common_js__WEBPACK_IMPORTED_MODULE_0__.RANDOM();
  var u2 = _common_js__WEBPACK_IMPORTED_MODULE_0__.RANDOM();
  var u3 = _common_js__WEBPACK_IMPORTED_MODULE_0__.RANDOM();
  var sqrt1MinusU1 = Math.sqrt(1 - u1);
  var sqrtU1 = Math.sqrt(u1);
  out[0] = sqrt1MinusU1 * Math.sin(2.0 * Math.PI * u2);
  out[1] = sqrt1MinusU1 * Math.cos(2.0 * Math.PI * u2);
  out[2] = sqrtU1 * Math.sin(2.0 * Math.PI * u3);
  out[3] = sqrtU1 * Math.cos(2.0 * Math.PI * u3);
  return out;
}
/**
 * Calculates the inverse of a quat
 *
 * @param {quat} out the receiving quaternion
 * @param {ReadonlyQuat} a quat to calculate inverse of
 * @returns {quat} out
 */

function invert(out, a) {
  var a0 = a[0],
      a1 = a[1],
      a2 = a[2],
      a3 = a[3];
  var dot = a0 * a0 + a1 * a1 + a2 * a2 + a3 * a3;
  var invDot = dot ? 1.0 / dot : 0; // TODO: Would be faster to return [0,0,0,0] immediately if dot == 0

  out[0] = -a0 * invDot;
  out[1] = -a1 * invDot;
  out[2] = -a2 * invDot;
  out[3] = a3 * invDot;
  return out;
}
/**
 * Calculates the conjugate of a quat
 * If the quaternion is normalized, this function is faster than quat.inverse and produces the same result.
 *
 * @param {quat} out the receiving quaternion
 * @param {ReadonlyQuat} a quat to calculate conjugate of
 * @returns {quat} out
 */

function conjugate(out, a) {
  out[0] = -a[0];
  out[1] = -a[1];
  out[2] = -a[2];
  out[3] = a[3];
  return out;
}
/**
 * Creates a quaternion from the given 3x3 rotation matrix.
 *
 * NOTE: The resultant quaternion is not normalized, so you should be sure
 * to renormalize the quaternion yourself where necessary.
 *
 * @param {quat} out the receiving quaternion
 * @param {ReadonlyMat3} m rotation matrix
 * @returns {quat} out
 * @function
 */

function fromMat3(out, m) {
  // Algorithm in Ken Shoemake's article in 1987 SIGGRAPH course notes
  // article "Quaternion Calculus and Fast Animation".
  var fTrace = m[0] + m[4] + m[8];
  var fRoot;

  if (fTrace > 0.0) {
    // |w| > 1/2, may as well choose w > 1/2
    fRoot = Math.sqrt(fTrace + 1.0); // 2w

    out[3] = 0.5 * fRoot;
    fRoot = 0.5 / fRoot; // 1/(4w)

    out[0] = (m[5] - m[7]) * fRoot;
    out[1] = (m[6] - m[2]) * fRoot;
    out[2] = (m[1] - m[3]) * fRoot;
  } else {
    // |w| <= 1/2
    var i = 0;
    if (m[4] > m[0]) i = 1;
    if (m[8] > m[i * 3 + i]) i = 2;
    var j = (i + 1) % 3;
    var k = (i + 2) % 3;
    fRoot = Math.sqrt(m[i * 3 + i] - m[j * 3 + j] - m[k * 3 + k] + 1.0);
    out[i] = 0.5 * fRoot;
    fRoot = 0.5 / fRoot;
    out[3] = (m[j * 3 + k] - m[k * 3 + j]) * fRoot;
    out[j] = (m[j * 3 + i] + m[i * 3 + j]) * fRoot;
    out[k] = (m[k * 3 + i] + m[i * 3 + k]) * fRoot;
  }

  return out;
}
/**
 * Creates a quaternion from the given euler angle x, y, z.
 *
 * @param {quat} out the receiving quaternion
 * @param {x} Angle to rotate around X axis in degrees.
 * @param {y} Angle to rotate around Y axis in degrees.
 * @param {z} Angle to rotate around Z axis in degrees.
 * @returns {quat} out
 * @function
 */

function fromEuler(out, x, y, z) {
  var halfToRad = 0.5 * Math.PI / 180.0;
  x *= halfToRad;
  y *= halfToRad;
  z *= halfToRad;
  var sx = Math.sin(x);
  var cx = Math.cos(x);
  var sy = Math.sin(y);
  var cy = Math.cos(y);
  var sz = Math.sin(z);
  var cz = Math.cos(z);
  out[0] = sx * cy * cz - cx * sy * sz;
  out[1] = cx * sy * cz + sx * cy * sz;
  out[2] = cx * cy * sz - sx * sy * cz;
  out[3] = cx * cy * cz + sx * sy * sz;
  return out;
}
/**
 * Returns a string representation of a quatenion
 *
 * @param {ReadonlyQuat} a vector to represent as a string
 * @returns {String} string representation of the vector
 */

function str(a) {
  return "quat(" + a[0] + ", " + a[1] + ", " + a[2] + ", " + a[3] + ")";
}
/**
 * Creates a new quat initialized with values from an existing quaternion
 *
 * @param {ReadonlyQuat} a quaternion to clone
 * @returns {quat} a new quaternion
 * @function
 */

var clone = _vec4_js__WEBPACK_IMPORTED_MODULE_1__.clone;
/**
 * Creates a new quat initialized with the given values
 *
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @param {Number} w W component
 * @returns {quat} a new quaternion
 * @function
 */

var fromValues = _vec4_js__WEBPACK_IMPORTED_MODULE_1__.fromValues;
/**
 * Copy the values from one quat to another
 *
 * @param {quat} out the receiving quaternion
 * @param {ReadonlyQuat} a the source quaternion
 * @returns {quat} out
 * @function
 */

var copy = _vec4_js__WEBPACK_IMPORTED_MODULE_1__.copy;
/**
 * Set the components of a quat to the given values
 *
 * @param {quat} out the receiving quaternion
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @param {Number} w W component
 * @returns {quat} out
 * @function
 */

var set = _vec4_js__WEBPACK_IMPORTED_MODULE_1__.set;
/**
 * Adds two quat's
 *
 * @param {quat} out the receiving quaternion
 * @param {ReadonlyQuat} a the first operand
 * @param {ReadonlyQuat} b the second operand
 * @returns {quat} out
 * @function
 */

var add = _vec4_js__WEBPACK_IMPORTED_MODULE_1__.add;
/**
 * Alias for {@link quat.multiply}
 * @function
 */

var mul = multiply;
/**
 * Scales a quat by a scalar number
 *
 * @param {quat} out the receiving vector
 * @param {ReadonlyQuat} a the vector to scale
 * @param {Number} b amount to scale the vector by
 * @returns {quat} out
 * @function
 */

var scale = _vec4_js__WEBPACK_IMPORTED_MODULE_1__.scale;
/**
 * Calculates the dot product of two quat's
 *
 * @param {ReadonlyQuat} a the first operand
 * @param {ReadonlyQuat} b the second operand
 * @returns {Number} dot product of a and b
 * @function
 */

var dot = _vec4_js__WEBPACK_IMPORTED_MODULE_1__.dot;
/**
 * Performs a linear interpolation between two quat's
 *
 * @param {quat} out the receiving quaternion
 * @param {ReadonlyQuat} a the first operand
 * @param {ReadonlyQuat} b the second operand
 * @param {Number} t interpolation amount, in the range [0-1], between the two inputs
 * @returns {quat} out
 * @function
 */

var lerp = _vec4_js__WEBPACK_IMPORTED_MODULE_1__.lerp;
/**
 * Calculates the length of a quat
 *
 * @param {ReadonlyQuat} a vector to calculate length of
 * @returns {Number} length of a
 */

var length = _vec4_js__WEBPACK_IMPORTED_MODULE_1__.length;
/**
 * Alias for {@link quat.length}
 * @function
 */

var len = length;
/**
 * Calculates the squared length of a quat
 *
 * @param {ReadonlyQuat} a vector to calculate squared length of
 * @returns {Number} squared length of a
 * @function
 */

var squaredLength = _vec4_js__WEBPACK_IMPORTED_MODULE_1__.squaredLength;
/**
 * Alias for {@link quat.squaredLength}
 * @function
 */

var sqrLen = squaredLength;
/**
 * Normalize a quat
 *
 * @param {quat} out the receiving quaternion
 * @param {ReadonlyQuat} a quaternion to normalize
 * @returns {quat} out
 * @function
 */

var normalize = _vec4_js__WEBPACK_IMPORTED_MODULE_1__.normalize;
/**
 * Returns whether or not the quaternions have exactly the same elements in the same position (when compared with ===)
 *
 * @param {ReadonlyQuat} a The first quaternion.
 * @param {ReadonlyQuat} b The second quaternion.
 * @returns {Boolean} True if the vectors are equal, false otherwise.
 */

var exactEquals = _vec4_js__WEBPACK_IMPORTED_MODULE_1__.exactEquals;
/**
 * Returns whether or not the quaternions have approximately the same elements in the same position.
 *
 * @param {ReadonlyQuat} a The first vector.
 * @param {ReadonlyQuat} b The second vector.
 * @returns {Boolean} True if the vectors are equal, false otherwise.
 */

var equals = _vec4_js__WEBPACK_IMPORTED_MODULE_1__.equals;
/**
 * Sets a quaternion to represent the shortest rotation from one
 * vector to another.
 *
 * Both vectors are assumed to be unit length.
 *
 * @param {quat} out the receiving quaternion.
 * @param {ReadonlyVec3} a the initial vector
 * @param {ReadonlyVec3} b the destination vector
 * @returns {quat} out
 */

var rotationTo = function () {
  var tmpvec3 = _vec3_js__WEBPACK_IMPORTED_MODULE_2__.create();
  var xUnitVec3 = _vec3_js__WEBPACK_IMPORTED_MODULE_2__.fromValues(1, 0, 0);
  var yUnitVec3 = _vec3_js__WEBPACK_IMPORTED_MODULE_2__.fromValues(0, 1, 0);
  return function (out, a, b) {
    var dot = _vec3_js__WEBPACK_IMPORTED_MODULE_2__.dot(a, b);

    if (dot < -0.999999) {
      _vec3_js__WEBPACK_IMPORTED_MODULE_2__.cross(tmpvec3, xUnitVec3, a);
      if (_vec3_js__WEBPACK_IMPORTED_MODULE_2__.len(tmpvec3) < 0.000001) _vec3_js__WEBPACK_IMPORTED_MODULE_2__.cross(tmpvec3, yUnitVec3, a);
      _vec3_js__WEBPACK_IMPORTED_MODULE_2__.normalize(tmpvec3, tmpvec3);
      setAxisAngle(out, tmpvec3, Math.PI);
      return out;
    } else if (dot > 0.999999) {
      out[0] = 0;
      out[1] = 0;
      out[2] = 0;
      out[3] = 1;
      return out;
    } else {
      _vec3_js__WEBPACK_IMPORTED_MODULE_2__.cross(tmpvec3, a, b);
      out[0] = tmpvec3[0];
      out[1] = tmpvec3[1];
      out[2] = tmpvec3[2];
      out[3] = 1 + dot;
      return normalize(out, out);
    }
  };
}();
/**
 * Performs a spherical linear interpolation with two control points
 *
 * @param {quat} out the receiving quaternion
 * @param {ReadonlyQuat} a the first operand
 * @param {ReadonlyQuat} b the second operand
 * @param {ReadonlyQuat} c the third operand
 * @param {ReadonlyQuat} d the fourth operand
 * @param {Number} t interpolation amount, in the range [0-1], between the two inputs
 * @returns {quat} out
 */

var sqlerp = function () {
  var temp1 = create();
  var temp2 = create();
  return function (out, a, b, c, d, t) {
    slerp(temp1, a, d, t);
    slerp(temp2, b, c, t);
    slerp(out, temp1, temp2, 2 * t * (1 - t));
    return out;
  };
}();
/**
 * Sets the specified quaternion with values corresponding to the given
 * axes. Each axis is a vec3 and is expected to be unit length and
 * perpendicular to all other specified axes.
 *
 * @param {ReadonlyVec3} view  the vector representing the viewing direction
 * @param {ReadonlyVec3} right the vector representing the local "right" direction
 * @param {ReadonlyVec3} up    the vector representing the local "up" direction
 * @returns {quat} out
 */

var setAxes = function () {
  var matr = _mat3_js__WEBPACK_IMPORTED_MODULE_3__.create();
  return function (out, view, right, up) {
    matr[0] = right[0];
    matr[3] = right[1];
    matr[6] = right[2];
    matr[1] = up[0];
    matr[4] = up[1];
    matr[7] = up[2];
    matr[2] = -view[0];
    matr[5] = -view[1];
    matr[8] = -view[2];
    return normalize(out, fromMat3(out, matr));
  };
}();

/***/ }),
/* 5 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "create": () => (/* binding */ create),
/* harmony export */   "clone": () => (/* binding */ clone),
/* harmony export */   "fromValues": () => (/* binding */ fromValues),
/* harmony export */   "copy": () => (/* binding */ copy),
/* harmony export */   "set": () => (/* binding */ set),
/* harmony export */   "add": () => (/* binding */ add),
/* harmony export */   "subtract": () => (/* binding */ subtract),
/* harmony export */   "multiply": () => (/* binding */ multiply),
/* harmony export */   "divide": () => (/* binding */ divide),
/* harmony export */   "ceil": () => (/* binding */ ceil),
/* harmony export */   "floor": () => (/* binding */ floor),
/* harmony export */   "min": () => (/* binding */ min),
/* harmony export */   "max": () => (/* binding */ max),
/* harmony export */   "round": () => (/* binding */ round),
/* harmony export */   "scale": () => (/* binding */ scale),
/* harmony export */   "scaleAndAdd": () => (/* binding */ scaleAndAdd),
/* harmony export */   "distance": () => (/* binding */ distance),
/* harmony export */   "squaredDistance": () => (/* binding */ squaredDistance),
/* harmony export */   "length": () => (/* binding */ length),
/* harmony export */   "squaredLength": () => (/* binding */ squaredLength),
/* harmony export */   "negate": () => (/* binding */ negate),
/* harmony export */   "inverse": () => (/* binding */ inverse),
/* harmony export */   "normalize": () => (/* binding */ normalize),
/* harmony export */   "dot": () => (/* binding */ dot),
/* harmony export */   "cross": () => (/* binding */ cross),
/* harmony export */   "lerp": () => (/* binding */ lerp),
/* harmony export */   "random": () => (/* binding */ random),
/* harmony export */   "transformMat4": () => (/* binding */ transformMat4),
/* harmony export */   "transformQuat": () => (/* binding */ transformQuat),
/* harmony export */   "zero": () => (/* binding */ zero),
/* harmony export */   "str": () => (/* binding */ str),
/* harmony export */   "exactEquals": () => (/* binding */ exactEquals),
/* harmony export */   "equals": () => (/* binding */ equals),
/* harmony export */   "sub": () => (/* binding */ sub),
/* harmony export */   "mul": () => (/* binding */ mul),
/* harmony export */   "div": () => (/* binding */ div),
/* harmony export */   "dist": () => (/* binding */ dist),
/* harmony export */   "sqrDist": () => (/* binding */ sqrDist),
/* harmony export */   "len": () => (/* binding */ len),
/* harmony export */   "sqrLen": () => (/* binding */ sqrLen),
/* harmony export */   "forEach": () => (/* binding */ forEach)
/* harmony export */ });
/* harmony import */ var _common_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);

/**
 * 4 Dimensional Vector
 * @module vec4
 */

/**
 * Creates a new, empty vec4
 *
 * @returns {vec4} a new 4D vector
 */

function create() {
  var out = new _common_js__WEBPACK_IMPORTED_MODULE_0__.ARRAY_TYPE(4);

  if (_common_js__WEBPACK_IMPORTED_MODULE_0__.ARRAY_TYPE != Float32Array) {
    out[0] = 0;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
  }

  return out;
}
/**
 * Creates a new vec4 initialized with values from an existing vector
 *
 * @param {ReadonlyVec4} a vector to clone
 * @returns {vec4} a new 4D vector
 */

function clone(a) {
  var out = new _common_js__WEBPACK_IMPORTED_MODULE_0__.ARRAY_TYPE(4);
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  out[3] = a[3];
  return out;
}
/**
 * Creates a new vec4 initialized with the given values
 *
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @param {Number} w W component
 * @returns {vec4} a new 4D vector
 */

function fromValues(x, y, z, w) {
  var out = new _common_js__WEBPACK_IMPORTED_MODULE_0__.ARRAY_TYPE(4);
  out[0] = x;
  out[1] = y;
  out[2] = z;
  out[3] = w;
  return out;
}
/**
 * Copy the values from one vec4 to another
 *
 * @param {vec4} out the receiving vector
 * @param {ReadonlyVec4} a the source vector
 * @returns {vec4} out
 */

function copy(out, a) {
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  out[3] = a[3];
  return out;
}
/**
 * Set the components of a vec4 to the given values
 *
 * @param {vec4} out the receiving vector
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @param {Number} w W component
 * @returns {vec4} out
 */

function set(out, x, y, z, w) {
  out[0] = x;
  out[1] = y;
  out[2] = z;
  out[3] = w;
  return out;
}
/**
 * Adds two vec4's
 *
 * @param {vec4} out the receiving vector
 * @param {ReadonlyVec4} a the first operand
 * @param {ReadonlyVec4} b the second operand
 * @returns {vec4} out
 */

function add(out, a, b) {
  out[0] = a[0] + b[0];
  out[1] = a[1] + b[1];
  out[2] = a[2] + b[2];
  out[3] = a[3] + b[3];
  return out;
}
/**
 * Subtracts vector b from vector a
 *
 * @param {vec4} out the receiving vector
 * @param {ReadonlyVec4} a the first operand
 * @param {ReadonlyVec4} b the second operand
 * @returns {vec4} out
 */

function subtract(out, a, b) {
  out[0] = a[0] - b[0];
  out[1] = a[1] - b[1];
  out[2] = a[2] - b[2];
  out[3] = a[3] - b[3];
  return out;
}
/**
 * Multiplies two vec4's
 *
 * @param {vec4} out the receiving vector
 * @param {ReadonlyVec4} a the first operand
 * @param {ReadonlyVec4} b the second operand
 * @returns {vec4} out
 */

function multiply(out, a, b) {
  out[0] = a[0] * b[0];
  out[1] = a[1] * b[1];
  out[2] = a[2] * b[2];
  out[3] = a[3] * b[3];
  return out;
}
/**
 * Divides two vec4's
 *
 * @param {vec4} out the receiving vector
 * @param {ReadonlyVec4} a the first operand
 * @param {ReadonlyVec4} b the second operand
 * @returns {vec4} out
 */

function divide(out, a, b) {
  out[0] = a[0] / b[0];
  out[1] = a[1] / b[1];
  out[2] = a[2] / b[2];
  out[3] = a[3] / b[3];
  return out;
}
/**
 * Math.ceil the components of a vec4
 *
 * @param {vec4} out the receiving vector
 * @param {ReadonlyVec4} a vector to ceil
 * @returns {vec4} out
 */

function ceil(out, a) {
  out[0] = Math.ceil(a[0]);
  out[1] = Math.ceil(a[1]);
  out[2] = Math.ceil(a[2]);
  out[3] = Math.ceil(a[3]);
  return out;
}
/**
 * Math.floor the components of a vec4
 *
 * @param {vec4} out the receiving vector
 * @param {ReadonlyVec4} a vector to floor
 * @returns {vec4} out
 */

function floor(out, a) {
  out[0] = Math.floor(a[0]);
  out[1] = Math.floor(a[1]);
  out[2] = Math.floor(a[2]);
  out[3] = Math.floor(a[3]);
  return out;
}
/**
 * Returns the minimum of two vec4's
 *
 * @param {vec4} out the receiving vector
 * @param {ReadonlyVec4} a the first operand
 * @param {ReadonlyVec4} b the second operand
 * @returns {vec4} out
 */

function min(out, a, b) {
  out[0] = Math.min(a[0], b[0]);
  out[1] = Math.min(a[1], b[1]);
  out[2] = Math.min(a[2], b[2]);
  out[3] = Math.min(a[3], b[3]);
  return out;
}
/**
 * Returns the maximum of two vec4's
 *
 * @param {vec4} out the receiving vector
 * @param {ReadonlyVec4} a the first operand
 * @param {ReadonlyVec4} b the second operand
 * @returns {vec4} out
 */

function max(out, a, b) {
  out[0] = Math.max(a[0], b[0]);
  out[1] = Math.max(a[1], b[1]);
  out[2] = Math.max(a[2], b[2]);
  out[3] = Math.max(a[3], b[3]);
  return out;
}
/**
 * Math.round the components of a vec4
 *
 * @param {vec4} out the receiving vector
 * @param {ReadonlyVec4} a vector to round
 * @returns {vec4} out
 */

function round(out, a) {
  out[0] = Math.round(a[0]);
  out[1] = Math.round(a[1]);
  out[2] = Math.round(a[2]);
  out[3] = Math.round(a[3]);
  return out;
}
/**
 * Scales a vec4 by a scalar number
 *
 * @param {vec4} out the receiving vector
 * @param {ReadonlyVec4} a the vector to scale
 * @param {Number} b amount to scale the vector by
 * @returns {vec4} out
 */

function scale(out, a, b) {
  out[0] = a[0] * b;
  out[1] = a[1] * b;
  out[2] = a[2] * b;
  out[3] = a[3] * b;
  return out;
}
/**
 * Adds two vec4's after scaling the second operand by a scalar value
 *
 * @param {vec4} out the receiving vector
 * @param {ReadonlyVec4} a the first operand
 * @param {ReadonlyVec4} b the second operand
 * @param {Number} scale the amount to scale b by before adding
 * @returns {vec4} out
 */

function scaleAndAdd(out, a, b, scale) {
  out[0] = a[0] + b[0] * scale;
  out[1] = a[1] + b[1] * scale;
  out[2] = a[2] + b[2] * scale;
  out[3] = a[3] + b[3] * scale;
  return out;
}
/**
 * Calculates the euclidian distance between two vec4's
 *
 * @param {ReadonlyVec4} a the first operand
 * @param {ReadonlyVec4} b the second operand
 * @returns {Number} distance between a and b
 */

function distance(a, b) {
  var x = b[0] - a[0];
  var y = b[1] - a[1];
  var z = b[2] - a[2];
  var w = b[3] - a[3];
  return Math.hypot(x, y, z, w);
}
/**
 * Calculates the squared euclidian distance between two vec4's
 *
 * @param {ReadonlyVec4} a the first operand
 * @param {ReadonlyVec4} b the second operand
 * @returns {Number} squared distance between a and b
 */

function squaredDistance(a, b) {
  var x = b[0] - a[0];
  var y = b[1] - a[1];
  var z = b[2] - a[2];
  var w = b[3] - a[3];
  return x * x + y * y + z * z + w * w;
}
/**
 * Calculates the length of a vec4
 *
 * @param {ReadonlyVec4} a vector to calculate length of
 * @returns {Number} length of a
 */

function length(a) {
  var x = a[0];
  var y = a[1];
  var z = a[2];
  var w = a[3];
  return Math.hypot(x, y, z, w);
}
/**
 * Calculates the squared length of a vec4
 *
 * @param {ReadonlyVec4} a vector to calculate squared length of
 * @returns {Number} squared length of a
 */

function squaredLength(a) {
  var x = a[0];
  var y = a[1];
  var z = a[2];
  var w = a[3];
  return x * x + y * y + z * z + w * w;
}
/**
 * Negates the components of a vec4
 *
 * @param {vec4} out the receiving vector
 * @param {ReadonlyVec4} a vector to negate
 * @returns {vec4} out
 */

function negate(out, a) {
  out[0] = -a[0];
  out[1] = -a[1];
  out[2] = -a[2];
  out[3] = -a[3];
  return out;
}
/**
 * Returns the inverse of the components of a vec4
 *
 * @param {vec4} out the receiving vector
 * @param {ReadonlyVec4} a vector to invert
 * @returns {vec4} out
 */

function inverse(out, a) {
  out[0] = 1.0 / a[0];
  out[1] = 1.0 / a[1];
  out[2] = 1.0 / a[2];
  out[3] = 1.0 / a[3];
  return out;
}
/**
 * Normalize a vec4
 *
 * @param {vec4} out the receiving vector
 * @param {ReadonlyVec4} a vector to normalize
 * @returns {vec4} out
 */

function normalize(out, a) {
  var x = a[0];
  var y = a[1];
  var z = a[2];
  var w = a[3];
  var len = x * x + y * y + z * z + w * w;

  if (len > 0) {
    len = 1 / Math.sqrt(len);
  }

  out[0] = x * len;
  out[1] = y * len;
  out[2] = z * len;
  out[3] = w * len;
  return out;
}
/**
 * Calculates the dot product of two vec4's
 *
 * @param {ReadonlyVec4} a the first operand
 * @param {ReadonlyVec4} b the second operand
 * @returns {Number} dot product of a and b
 */

function dot(a, b) {
  return a[0] * b[0] + a[1] * b[1] + a[2] * b[2] + a[3] * b[3];
}
/**
 * Returns the cross-product of three vectors in a 4-dimensional space
 *
 * @param {ReadonlyVec4} result the receiving vector
 * @param {ReadonlyVec4} U the first vector
 * @param {ReadonlyVec4} V the second vector
 * @param {ReadonlyVec4} W the third vector
 * @returns {vec4} result
 */

function cross(out, u, v, w) {
  var A = v[0] * w[1] - v[1] * w[0],
      B = v[0] * w[2] - v[2] * w[0],
      C = v[0] * w[3] - v[3] * w[0],
      D = v[1] * w[2] - v[2] * w[1],
      E = v[1] * w[3] - v[3] * w[1],
      F = v[2] * w[3] - v[3] * w[2];
  var G = u[0];
  var H = u[1];
  var I = u[2];
  var J = u[3];
  out[0] = H * F - I * E + J * D;
  out[1] = -(G * F) + I * C - J * B;
  out[2] = G * E - H * C + J * A;
  out[3] = -(G * D) + H * B - I * A;
  return out;
}
/**
 * Performs a linear interpolation between two vec4's
 *
 * @param {vec4} out the receiving vector
 * @param {ReadonlyVec4} a the first operand
 * @param {ReadonlyVec4} b the second operand
 * @param {Number} t interpolation amount, in the range [0-1], between the two inputs
 * @returns {vec4} out
 */

function lerp(out, a, b, t) {
  var ax = a[0];
  var ay = a[1];
  var az = a[2];
  var aw = a[3];
  out[0] = ax + t * (b[0] - ax);
  out[1] = ay + t * (b[1] - ay);
  out[2] = az + t * (b[2] - az);
  out[3] = aw + t * (b[3] - aw);
  return out;
}
/**
 * Generates a random vector with the given scale
 *
 * @param {vec4} out the receiving vector
 * @param {Number} [scale] Length of the resulting vector. If ommitted, a unit vector will be returned
 * @returns {vec4} out
 */

function random(out, scale) {
  scale = scale || 1.0; // Marsaglia, George. Choosing a Point from the Surface of a
  // Sphere. Ann. Math. Statist. 43 (1972), no. 2, 645--646.
  // http://projecteuclid.org/euclid.aoms/1177692644;

  var v1, v2, v3, v4;
  var s1, s2;

  do {
    v1 = _common_js__WEBPACK_IMPORTED_MODULE_0__.RANDOM() * 2 - 1;
    v2 = _common_js__WEBPACK_IMPORTED_MODULE_0__.RANDOM() * 2 - 1;
    s1 = v1 * v1 + v2 * v2;
  } while (s1 >= 1);

  do {
    v3 = _common_js__WEBPACK_IMPORTED_MODULE_0__.RANDOM() * 2 - 1;
    v4 = _common_js__WEBPACK_IMPORTED_MODULE_0__.RANDOM() * 2 - 1;
    s2 = v3 * v3 + v4 * v4;
  } while (s2 >= 1);

  var d = Math.sqrt((1 - s1) / s2);
  out[0] = scale * v1;
  out[1] = scale * v2;
  out[2] = scale * v3 * d;
  out[3] = scale * v4 * d;
  return out;
}
/**
 * Transforms the vec4 with a mat4.
 *
 * @param {vec4} out the receiving vector
 * @param {ReadonlyVec4} a the vector to transform
 * @param {ReadonlyMat4} m matrix to transform with
 * @returns {vec4} out
 */

function transformMat4(out, a, m) {
  var x = a[0],
      y = a[1],
      z = a[2],
      w = a[3];
  out[0] = m[0] * x + m[4] * y + m[8] * z + m[12] * w;
  out[1] = m[1] * x + m[5] * y + m[9] * z + m[13] * w;
  out[2] = m[2] * x + m[6] * y + m[10] * z + m[14] * w;
  out[3] = m[3] * x + m[7] * y + m[11] * z + m[15] * w;
  return out;
}
/**
 * Transforms the vec4 with a quat
 *
 * @param {vec4} out the receiving vector
 * @param {ReadonlyVec4} a the vector to transform
 * @param {ReadonlyQuat} q quaternion to transform with
 * @returns {vec4} out
 */

function transformQuat(out, a, q) {
  var x = a[0],
      y = a[1],
      z = a[2];
  var qx = q[0],
      qy = q[1],
      qz = q[2],
      qw = q[3]; // calculate quat * vec

  var ix = qw * x + qy * z - qz * y;
  var iy = qw * y + qz * x - qx * z;
  var iz = qw * z + qx * y - qy * x;
  var iw = -qx * x - qy * y - qz * z; // calculate result * inverse quat

  out[0] = ix * qw + iw * -qx + iy * -qz - iz * -qy;
  out[1] = iy * qw + iw * -qy + iz * -qx - ix * -qz;
  out[2] = iz * qw + iw * -qz + ix * -qy - iy * -qx;
  out[3] = a[3];
  return out;
}
/**
 * Set the components of a vec4 to zero
 *
 * @param {vec4} out the receiving vector
 * @returns {vec4} out
 */

function zero(out) {
  out[0] = 0.0;
  out[1] = 0.0;
  out[2] = 0.0;
  out[3] = 0.0;
  return out;
}
/**
 * Returns a string representation of a vector
 *
 * @param {ReadonlyVec4} a vector to represent as a string
 * @returns {String} string representation of the vector
 */

function str(a) {
  return "vec4(" + a[0] + ", " + a[1] + ", " + a[2] + ", " + a[3] + ")";
}
/**
 * Returns whether or not the vectors have exactly the same elements in the same position (when compared with ===)
 *
 * @param {ReadonlyVec4} a The first vector.
 * @param {ReadonlyVec4} b The second vector.
 * @returns {Boolean} True if the vectors are equal, false otherwise.
 */

function exactEquals(a, b) {
  return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3];
}
/**
 * Returns whether or not the vectors have approximately the same elements in the same position.
 *
 * @param {ReadonlyVec4} a The first vector.
 * @param {ReadonlyVec4} b The second vector.
 * @returns {Boolean} True if the vectors are equal, false otherwise.
 */

function equals(a, b) {
  var a0 = a[0],
      a1 = a[1],
      a2 = a[2],
      a3 = a[3];
  var b0 = b[0],
      b1 = b[1],
      b2 = b[2],
      b3 = b[3];
  return Math.abs(a0 - b0) <= _common_js__WEBPACK_IMPORTED_MODULE_0__.EPSILON * Math.max(1.0, Math.abs(a0), Math.abs(b0)) && Math.abs(a1 - b1) <= _common_js__WEBPACK_IMPORTED_MODULE_0__.EPSILON * Math.max(1.0, Math.abs(a1), Math.abs(b1)) && Math.abs(a2 - b2) <= _common_js__WEBPACK_IMPORTED_MODULE_0__.EPSILON * Math.max(1.0, Math.abs(a2), Math.abs(b2)) && Math.abs(a3 - b3) <= _common_js__WEBPACK_IMPORTED_MODULE_0__.EPSILON * Math.max(1.0, Math.abs(a3), Math.abs(b3));
}
/**
 * Alias for {@link vec4.subtract}
 * @function
 */

var sub = subtract;
/**
 * Alias for {@link vec4.multiply}
 * @function
 */

var mul = multiply;
/**
 * Alias for {@link vec4.divide}
 * @function
 */

var div = divide;
/**
 * Alias for {@link vec4.distance}
 * @function
 */

var dist = distance;
/**
 * Alias for {@link vec4.squaredDistance}
 * @function
 */

var sqrDist = squaredDistance;
/**
 * Alias for {@link vec4.length}
 * @function
 */

var len = length;
/**
 * Alias for {@link vec4.squaredLength}
 * @function
 */

var sqrLen = squaredLength;
/**
 * Perform some operation over an array of vec4s.
 *
 * @param {Array} a the array of vectors to iterate over
 * @param {Number} stride Number of elements between the start of each vec4. If 0 assumes tightly packed
 * @param {Number} offset Number of elements to skip at the beginning of the array
 * @param {Number} count Number of vec4s to iterate over. If 0 iterates over entire array
 * @param {Function} fn Function to call for each vector in the array
 * @param {Object} [arg] additional argument to pass to fn
 * @returns {Array} a
 * @function
 */

var forEach = function () {
  var vec = create();
  return function (a, stride, offset, count, fn, arg) {
    var i, l;

    if (!stride) {
      stride = 4;
    }

    if (!offset) {
      offset = 0;
    }

    if (count) {
      l = Math.min(count * stride + offset, a.length);
    } else {
      l = a.length;
    }

    for (i = offset; i < l; i += stride) {
      vec[0] = a[i];
      vec[1] = a[i + 1];
      vec[2] = a[i + 2];
      vec[3] = a[i + 3];
      fn(vec, vec, arg);
      a[i] = vec[0];
      a[i + 1] = vec[1];
      a[i + 2] = vec[2];
      a[i + 3] = vec[3];
    }

    return a;
  };
}();

/***/ }),
/* 6 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "create": () => (/* binding */ create),
/* harmony export */   "fromMat4": () => (/* binding */ fromMat4),
/* harmony export */   "clone": () => (/* binding */ clone),
/* harmony export */   "copy": () => (/* binding */ copy),
/* harmony export */   "fromValues": () => (/* binding */ fromValues),
/* harmony export */   "set": () => (/* binding */ set),
/* harmony export */   "identity": () => (/* binding */ identity),
/* harmony export */   "transpose": () => (/* binding */ transpose),
/* harmony export */   "invert": () => (/* binding */ invert),
/* harmony export */   "adjoint": () => (/* binding */ adjoint),
/* harmony export */   "determinant": () => (/* binding */ determinant),
/* harmony export */   "multiply": () => (/* binding */ multiply),
/* harmony export */   "translate": () => (/* binding */ translate),
/* harmony export */   "rotate": () => (/* binding */ rotate),
/* harmony export */   "scale": () => (/* binding */ scale),
/* harmony export */   "fromTranslation": () => (/* binding */ fromTranslation),
/* harmony export */   "fromRotation": () => (/* binding */ fromRotation),
/* harmony export */   "fromScaling": () => (/* binding */ fromScaling),
/* harmony export */   "fromMat2d": () => (/* binding */ fromMat2d),
/* harmony export */   "fromQuat": () => (/* binding */ fromQuat),
/* harmony export */   "normalFromMat4": () => (/* binding */ normalFromMat4),
/* harmony export */   "projection": () => (/* binding */ projection),
/* harmony export */   "str": () => (/* binding */ str),
/* harmony export */   "frob": () => (/* binding */ frob),
/* harmony export */   "add": () => (/* binding */ add),
/* harmony export */   "subtract": () => (/* binding */ subtract),
/* harmony export */   "multiplyScalar": () => (/* binding */ multiplyScalar),
/* harmony export */   "multiplyScalarAndAdd": () => (/* binding */ multiplyScalarAndAdd),
/* harmony export */   "exactEquals": () => (/* binding */ exactEquals),
/* harmony export */   "equals": () => (/* binding */ equals),
/* harmony export */   "mul": () => (/* binding */ mul),
/* harmony export */   "sub": () => (/* binding */ sub)
/* harmony export */ });
/* harmony import */ var _common_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);

/**
 * 3x3 Matrix
 * @module mat3
 */

/**
 * Creates a new identity mat3
 *
 * @returns {mat3} a new 3x3 matrix
 */

function create() {
  var out = new _common_js__WEBPACK_IMPORTED_MODULE_0__.ARRAY_TYPE(9);

  if (_common_js__WEBPACK_IMPORTED_MODULE_0__.ARRAY_TYPE != Float32Array) {
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[5] = 0;
    out[6] = 0;
    out[7] = 0;
  }

  out[0] = 1;
  out[4] = 1;
  out[8] = 1;
  return out;
}
/**
 * Copies the upper-left 3x3 values into the given mat3.
 *
 * @param {mat3} out the receiving 3x3 matrix
 * @param {ReadonlyMat4} a   the source 4x4 matrix
 * @returns {mat3} out
 */

function fromMat4(out, a) {
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  out[3] = a[4];
  out[4] = a[5];
  out[5] = a[6];
  out[6] = a[8];
  out[7] = a[9];
  out[8] = a[10];
  return out;
}
/**
 * Creates a new mat3 initialized with values from an existing matrix
 *
 * @param {ReadonlyMat3} a matrix to clone
 * @returns {mat3} a new 3x3 matrix
 */

function clone(a) {
  var out = new _common_js__WEBPACK_IMPORTED_MODULE_0__.ARRAY_TYPE(9);
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  out[3] = a[3];
  out[4] = a[4];
  out[5] = a[5];
  out[6] = a[6];
  out[7] = a[7];
  out[8] = a[8];
  return out;
}
/**
 * Copy the values from one mat3 to another
 *
 * @param {mat3} out the receiving matrix
 * @param {ReadonlyMat3} a the source matrix
 * @returns {mat3} out
 */

function copy(out, a) {
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  out[3] = a[3];
  out[4] = a[4];
  out[5] = a[5];
  out[6] = a[6];
  out[7] = a[7];
  out[8] = a[8];
  return out;
}
/**
 * Create a new mat3 with the given values
 *
 * @param {Number} m00 Component in column 0, row 0 position (index 0)
 * @param {Number} m01 Component in column 0, row 1 position (index 1)
 * @param {Number} m02 Component in column 0, row 2 position (index 2)
 * @param {Number} m10 Component in column 1, row 0 position (index 3)
 * @param {Number} m11 Component in column 1, row 1 position (index 4)
 * @param {Number} m12 Component in column 1, row 2 position (index 5)
 * @param {Number} m20 Component in column 2, row 0 position (index 6)
 * @param {Number} m21 Component in column 2, row 1 position (index 7)
 * @param {Number} m22 Component in column 2, row 2 position (index 8)
 * @returns {mat3} A new mat3
 */

function fromValues(m00, m01, m02, m10, m11, m12, m20, m21, m22) {
  var out = new _common_js__WEBPACK_IMPORTED_MODULE_0__.ARRAY_TYPE(9);
  out[0] = m00;
  out[1] = m01;
  out[2] = m02;
  out[3] = m10;
  out[4] = m11;
  out[5] = m12;
  out[6] = m20;
  out[7] = m21;
  out[8] = m22;
  return out;
}
/**
 * Set the components of a mat3 to the given values
 *
 * @param {mat3} out the receiving matrix
 * @param {Number} m00 Component in column 0, row 0 position (index 0)
 * @param {Number} m01 Component in column 0, row 1 position (index 1)
 * @param {Number} m02 Component in column 0, row 2 position (index 2)
 * @param {Number} m10 Component in column 1, row 0 position (index 3)
 * @param {Number} m11 Component in column 1, row 1 position (index 4)
 * @param {Number} m12 Component in column 1, row 2 position (index 5)
 * @param {Number} m20 Component in column 2, row 0 position (index 6)
 * @param {Number} m21 Component in column 2, row 1 position (index 7)
 * @param {Number} m22 Component in column 2, row 2 position (index 8)
 * @returns {mat3} out
 */

function set(out, m00, m01, m02, m10, m11, m12, m20, m21, m22) {
  out[0] = m00;
  out[1] = m01;
  out[2] = m02;
  out[3] = m10;
  out[4] = m11;
  out[5] = m12;
  out[6] = m20;
  out[7] = m21;
  out[8] = m22;
  return out;
}
/**
 * Set a mat3 to the identity matrix
 *
 * @param {mat3} out the receiving matrix
 * @returns {mat3} out
 */

function identity(out) {
  out[0] = 1;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 1;
  out[5] = 0;
  out[6] = 0;
  out[7] = 0;
  out[8] = 1;
  return out;
}
/**
 * Transpose the values of a mat3
 *
 * @param {mat3} out the receiving matrix
 * @param {ReadonlyMat3} a the source matrix
 * @returns {mat3} out
 */

function transpose(out, a) {
  // If we are transposing ourselves we can skip a few steps but have to cache some values
  if (out === a) {
    var a01 = a[1],
        a02 = a[2],
        a12 = a[5];
    out[1] = a[3];
    out[2] = a[6];
    out[3] = a01;
    out[5] = a[7];
    out[6] = a02;
    out[7] = a12;
  } else {
    out[0] = a[0];
    out[1] = a[3];
    out[2] = a[6];
    out[3] = a[1];
    out[4] = a[4];
    out[5] = a[7];
    out[6] = a[2];
    out[7] = a[5];
    out[8] = a[8];
  }

  return out;
}
/**
 * Inverts a mat3
 *
 * @param {mat3} out the receiving matrix
 * @param {ReadonlyMat3} a the source matrix
 * @returns {mat3} out
 */

function invert(out, a) {
  var a00 = a[0],
      a01 = a[1],
      a02 = a[2];
  var a10 = a[3],
      a11 = a[4],
      a12 = a[5];
  var a20 = a[6],
      a21 = a[7],
      a22 = a[8];
  var b01 = a22 * a11 - a12 * a21;
  var b11 = -a22 * a10 + a12 * a20;
  var b21 = a21 * a10 - a11 * a20; // Calculate the determinant

  var det = a00 * b01 + a01 * b11 + a02 * b21;

  if (!det) {
    return null;
  }

  det = 1.0 / det;
  out[0] = b01 * det;
  out[1] = (-a22 * a01 + a02 * a21) * det;
  out[2] = (a12 * a01 - a02 * a11) * det;
  out[3] = b11 * det;
  out[4] = (a22 * a00 - a02 * a20) * det;
  out[5] = (-a12 * a00 + a02 * a10) * det;
  out[6] = b21 * det;
  out[7] = (-a21 * a00 + a01 * a20) * det;
  out[8] = (a11 * a00 - a01 * a10) * det;
  return out;
}
/**
 * Calculates the adjugate of a mat3
 *
 * @param {mat3} out the receiving matrix
 * @param {ReadonlyMat3} a the source matrix
 * @returns {mat3} out
 */

function adjoint(out, a) {
  var a00 = a[0],
      a01 = a[1],
      a02 = a[2];
  var a10 = a[3],
      a11 = a[4],
      a12 = a[5];
  var a20 = a[6],
      a21 = a[7],
      a22 = a[8];
  out[0] = a11 * a22 - a12 * a21;
  out[1] = a02 * a21 - a01 * a22;
  out[2] = a01 * a12 - a02 * a11;
  out[3] = a12 * a20 - a10 * a22;
  out[4] = a00 * a22 - a02 * a20;
  out[5] = a02 * a10 - a00 * a12;
  out[6] = a10 * a21 - a11 * a20;
  out[7] = a01 * a20 - a00 * a21;
  out[8] = a00 * a11 - a01 * a10;
  return out;
}
/**
 * Calculates the determinant of a mat3
 *
 * @param {ReadonlyMat3} a the source matrix
 * @returns {Number} determinant of a
 */

function determinant(a) {
  var a00 = a[0],
      a01 = a[1],
      a02 = a[2];
  var a10 = a[3],
      a11 = a[4],
      a12 = a[5];
  var a20 = a[6],
      a21 = a[7],
      a22 = a[8];
  return a00 * (a22 * a11 - a12 * a21) + a01 * (-a22 * a10 + a12 * a20) + a02 * (a21 * a10 - a11 * a20);
}
/**
 * Multiplies two mat3's
 *
 * @param {mat3} out the receiving matrix
 * @param {ReadonlyMat3} a the first operand
 * @param {ReadonlyMat3} b the second operand
 * @returns {mat3} out
 */

function multiply(out, a, b) {
  var a00 = a[0],
      a01 = a[1],
      a02 = a[2];
  var a10 = a[3],
      a11 = a[4],
      a12 = a[5];
  var a20 = a[6],
      a21 = a[7],
      a22 = a[8];
  var b00 = b[0],
      b01 = b[1],
      b02 = b[2];
  var b10 = b[3],
      b11 = b[4],
      b12 = b[5];
  var b20 = b[6],
      b21 = b[7],
      b22 = b[8];
  out[0] = b00 * a00 + b01 * a10 + b02 * a20;
  out[1] = b00 * a01 + b01 * a11 + b02 * a21;
  out[2] = b00 * a02 + b01 * a12 + b02 * a22;
  out[3] = b10 * a00 + b11 * a10 + b12 * a20;
  out[4] = b10 * a01 + b11 * a11 + b12 * a21;
  out[5] = b10 * a02 + b11 * a12 + b12 * a22;
  out[6] = b20 * a00 + b21 * a10 + b22 * a20;
  out[7] = b20 * a01 + b21 * a11 + b22 * a21;
  out[8] = b20 * a02 + b21 * a12 + b22 * a22;
  return out;
}
/**
 * Translate a mat3 by the given vector
 *
 * @param {mat3} out the receiving matrix
 * @param {ReadonlyMat3} a the matrix to translate
 * @param {ReadonlyVec2} v vector to translate by
 * @returns {mat3} out
 */

function translate(out, a, v) {
  var a00 = a[0],
      a01 = a[1],
      a02 = a[2],
      a10 = a[3],
      a11 = a[4],
      a12 = a[5],
      a20 = a[6],
      a21 = a[7],
      a22 = a[8],
      x = v[0],
      y = v[1];
  out[0] = a00;
  out[1] = a01;
  out[2] = a02;
  out[3] = a10;
  out[4] = a11;
  out[5] = a12;
  out[6] = x * a00 + y * a10 + a20;
  out[7] = x * a01 + y * a11 + a21;
  out[8] = x * a02 + y * a12 + a22;
  return out;
}
/**
 * Rotates a mat3 by the given angle
 *
 * @param {mat3} out the receiving matrix
 * @param {ReadonlyMat3} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat3} out
 */

function rotate(out, a, rad) {
  var a00 = a[0],
      a01 = a[1],
      a02 = a[2],
      a10 = a[3],
      a11 = a[4],
      a12 = a[5],
      a20 = a[6],
      a21 = a[7],
      a22 = a[8],
      s = Math.sin(rad),
      c = Math.cos(rad);
  out[0] = c * a00 + s * a10;
  out[1] = c * a01 + s * a11;
  out[2] = c * a02 + s * a12;
  out[3] = c * a10 - s * a00;
  out[4] = c * a11 - s * a01;
  out[5] = c * a12 - s * a02;
  out[6] = a20;
  out[7] = a21;
  out[8] = a22;
  return out;
}
/**
 * Scales the mat3 by the dimensions in the given vec2
 *
 * @param {mat3} out the receiving matrix
 * @param {ReadonlyMat3} a the matrix to rotate
 * @param {ReadonlyVec2} v the vec2 to scale the matrix by
 * @returns {mat3} out
 **/

function scale(out, a, v) {
  var x = v[0],
      y = v[1];
  out[0] = x * a[0];
  out[1] = x * a[1];
  out[2] = x * a[2];
  out[3] = y * a[3];
  out[4] = y * a[4];
  out[5] = y * a[5];
  out[6] = a[6];
  out[7] = a[7];
  out[8] = a[8];
  return out;
}
/**
 * Creates a matrix from a vector translation
 * This is equivalent to (but much faster than):
 *
 *     mat3.identity(dest);
 *     mat3.translate(dest, dest, vec);
 *
 * @param {mat3} out mat3 receiving operation result
 * @param {ReadonlyVec2} v Translation vector
 * @returns {mat3} out
 */

function fromTranslation(out, v) {
  out[0] = 1;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 1;
  out[5] = 0;
  out[6] = v[0];
  out[7] = v[1];
  out[8] = 1;
  return out;
}
/**
 * Creates a matrix from a given angle
 * This is equivalent to (but much faster than):
 *
 *     mat3.identity(dest);
 *     mat3.rotate(dest, dest, rad);
 *
 * @param {mat3} out mat3 receiving operation result
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat3} out
 */

function fromRotation(out, rad) {
  var s = Math.sin(rad),
      c = Math.cos(rad);
  out[0] = c;
  out[1] = s;
  out[2] = 0;
  out[3] = -s;
  out[4] = c;
  out[5] = 0;
  out[6] = 0;
  out[7] = 0;
  out[8] = 1;
  return out;
}
/**
 * Creates a matrix from a vector scaling
 * This is equivalent to (but much faster than):
 *
 *     mat3.identity(dest);
 *     mat3.scale(dest, dest, vec);
 *
 * @param {mat3} out mat3 receiving operation result
 * @param {ReadonlyVec2} v Scaling vector
 * @returns {mat3} out
 */

function fromScaling(out, v) {
  out[0] = v[0];
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = v[1];
  out[5] = 0;
  out[6] = 0;
  out[7] = 0;
  out[8] = 1;
  return out;
}
/**
 * Copies the values from a mat2d into a mat3
 *
 * @param {mat3} out the receiving matrix
 * @param {ReadonlyMat2d} a the matrix to copy
 * @returns {mat3} out
 **/

function fromMat2d(out, a) {
  out[0] = a[0];
  out[1] = a[1];
  out[2] = 0;
  out[3] = a[2];
  out[4] = a[3];
  out[5] = 0;
  out[6] = a[4];
  out[7] = a[5];
  out[8] = 1;
  return out;
}
/**
 * Calculates a 3x3 matrix from the given quaternion
 *
 * @param {mat3} out mat3 receiving operation result
 * @param {ReadonlyQuat} q Quaternion to create matrix from
 *
 * @returns {mat3} out
 */

function fromQuat(out, q) {
  var x = q[0],
      y = q[1],
      z = q[2],
      w = q[3];
  var x2 = x + x;
  var y2 = y + y;
  var z2 = z + z;
  var xx = x * x2;
  var yx = y * x2;
  var yy = y * y2;
  var zx = z * x2;
  var zy = z * y2;
  var zz = z * z2;
  var wx = w * x2;
  var wy = w * y2;
  var wz = w * z2;
  out[0] = 1 - yy - zz;
  out[3] = yx - wz;
  out[6] = zx + wy;
  out[1] = yx + wz;
  out[4] = 1 - xx - zz;
  out[7] = zy - wx;
  out[2] = zx - wy;
  out[5] = zy + wx;
  out[8] = 1 - xx - yy;
  return out;
}
/**
 * Calculates a 3x3 normal matrix (transpose inverse) from the 4x4 matrix
 *
 * @param {mat3} out mat3 receiving operation result
 * @param {ReadonlyMat4} a Mat4 to derive the normal matrix from
 *
 * @returns {mat3} out
 */

function normalFromMat4(out, a) {
  var a00 = a[0],
      a01 = a[1],
      a02 = a[2],
      a03 = a[3];
  var a10 = a[4],
      a11 = a[5],
      a12 = a[6],
      a13 = a[7];
  var a20 = a[8],
      a21 = a[9],
      a22 = a[10],
      a23 = a[11];
  var a30 = a[12],
      a31 = a[13],
      a32 = a[14],
      a33 = a[15];
  var b00 = a00 * a11 - a01 * a10;
  var b01 = a00 * a12 - a02 * a10;
  var b02 = a00 * a13 - a03 * a10;
  var b03 = a01 * a12 - a02 * a11;
  var b04 = a01 * a13 - a03 * a11;
  var b05 = a02 * a13 - a03 * a12;
  var b06 = a20 * a31 - a21 * a30;
  var b07 = a20 * a32 - a22 * a30;
  var b08 = a20 * a33 - a23 * a30;
  var b09 = a21 * a32 - a22 * a31;
  var b10 = a21 * a33 - a23 * a31;
  var b11 = a22 * a33 - a23 * a32; // Calculate the determinant

  var det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;

  if (!det) {
    return null;
  }

  det = 1.0 / det;
  out[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
  out[1] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
  out[2] = (a10 * b10 - a11 * b08 + a13 * b06) * det;
  out[3] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
  out[4] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
  out[5] = (a01 * b08 - a00 * b10 - a03 * b06) * det;
  out[6] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
  out[7] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
  out[8] = (a30 * b04 - a31 * b02 + a33 * b00) * det;
  return out;
}
/**
 * Generates a 2D projection matrix with the given bounds
 *
 * @param {mat3} out mat3 frustum matrix will be written into
 * @param {number} width Width of your gl context
 * @param {number} height Height of gl context
 * @returns {mat3} out
 */

function projection(out, width, height) {
  out[0] = 2 / width;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = -2 / height;
  out[5] = 0;
  out[6] = -1;
  out[7] = 1;
  out[8] = 1;
  return out;
}
/**
 * Returns a string representation of a mat3
 *
 * @param {ReadonlyMat3} a matrix to represent as a string
 * @returns {String} string representation of the matrix
 */

function str(a) {
  return "mat3(" + a[0] + ", " + a[1] + ", " + a[2] + ", " + a[3] + ", " + a[4] + ", " + a[5] + ", " + a[6] + ", " + a[7] + ", " + a[8] + ")";
}
/**
 * Returns Frobenius norm of a mat3
 *
 * @param {ReadonlyMat3} a the matrix to calculate Frobenius norm of
 * @returns {Number} Frobenius norm
 */

function frob(a) {
  return Math.hypot(a[0], a[1], a[2], a[3], a[4], a[5], a[6], a[7], a[8]);
}
/**
 * Adds two mat3's
 *
 * @param {mat3} out the receiving matrix
 * @param {ReadonlyMat3} a the first operand
 * @param {ReadonlyMat3} b the second operand
 * @returns {mat3} out
 */

function add(out, a, b) {
  out[0] = a[0] + b[0];
  out[1] = a[1] + b[1];
  out[2] = a[2] + b[2];
  out[3] = a[3] + b[3];
  out[4] = a[4] + b[4];
  out[5] = a[5] + b[5];
  out[6] = a[6] + b[6];
  out[7] = a[7] + b[7];
  out[8] = a[8] + b[8];
  return out;
}
/**
 * Subtracts matrix b from matrix a
 *
 * @param {mat3} out the receiving matrix
 * @param {ReadonlyMat3} a the first operand
 * @param {ReadonlyMat3} b the second operand
 * @returns {mat3} out
 */

function subtract(out, a, b) {
  out[0] = a[0] - b[0];
  out[1] = a[1] - b[1];
  out[2] = a[2] - b[2];
  out[3] = a[3] - b[3];
  out[4] = a[4] - b[4];
  out[5] = a[5] - b[5];
  out[6] = a[6] - b[6];
  out[7] = a[7] - b[7];
  out[8] = a[8] - b[8];
  return out;
}
/**
 * Multiply each element of the matrix by a scalar.
 *
 * @param {mat3} out the receiving matrix
 * @param {ReadonlyMat3} a the matrix to scale
 * @param {Number} b amount to scale the matrix's elements by
 * @returns {mat3} out
 */

function multiplyScalar(out, a, b) {
  out[0] = a[0] * b;
  out[1] = a[1] * b;
  out[2] = a[2] * b;
  out[3] = a[3] * b;
  out[4] = a[4] * b;
  out[5] = a[5] * b;
  out[6] = a[6] * b;
  out[7] = a[7] * b;
  out[8] = a[8] * b;
  return out;
}
/**
 * Adds two mat3's after multiplying each element of the second operand by a scalar value.
 *
 * @param {mat3} out the receiving vector
 * @param {ReadonlyMat3} a the first operand
 * @param {ReadonlyMat3} b the second operand
 * @param {Number} scale the amount to scale b's elements by before adding
 * @returns {mat3} out
 */

function multiplyScalarAndAdd(out, a, b, scale) {
  out[0] = a[0] + b[0] * scale;
  out[1] = a[1] + b[1] * scale;
  out[2] = a[2] + b[2] * scale;
  out[3] = a[3] + b[3] * scale;
  out[4] = a[4] + b[4] * scale;
  out[5] = a[5] + b[5] * scale;
  out[6] = a[6] + b[6] * scale;
  out[7] = a[7] + b[7] * scale;
  out[8] = a[8] + b[8] * scale;
  return out;
}
/**
 * Returns whether or not the matrices have exactly the same elements in the same position (when compared with ===)
 *
 * @param {ReadonlyMat3} a The first matrix.
 * @param {ReadonlyMat3} b The second matrix.
 * @returns {Boolean} True if the matrices are equal, false otherwise.
 */

function exactEquals(a, b) {
  return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3] && a[4] === b[4] && a[5] === b[5] && a[6] === b[6] && a[7] === b[7] && a[8] === b[8];
}
/**
 * Returns whether or not the matrices have approximately the same elements in the same position.
 *
 * @param {ReadonlyMat3} a The first matrix.
 * @param {ReadonlyMat3} b The second matrix.
 * @returns {Boolean} True if the matrices are equal, false otherwise.
 */

function equals(a, b) {
  var a0 = a[0],
      a1 = a[1],
      a2 = a[2],
      a3 = a[3],
      a4 = a[4],
      a5 = a[5],
      a6 = a[6],
      a7 = a[7],
      a8 = a[8];
  var b0 = b[0],
      b1 = b[1],
      b2 = b[2],
      b3 = b[3],
      b4 = b[4],
      b5 = b[5],
      b6 = b[6],
      b7 = b[7],
      b8 = b[8];
  return Math.abs(a0 - b0) <= _common_js__WEBPACK_IMPORTED_MODULE_0__.EPSILON * Math.max(1.0, Math.abs(a0), Math.abs(b0)) && Math.abs(a1 - b1) <= _common_js__WEBPACK_IMPORTED_MODULE_0__.EPSILON * Math.max(1.0, Math.abs(a1), Math.abs(b1)) && Math.abs(a2 - b2) <= _common_js__WEBPACK_IMPORTED_MODULE_0__.EPSILON * Math.max(1.0, Math.abs(a2), Math.abs(b2)) && Math.abs(a3 - b3) <= _common_js__WEBPACK_IMPORTED_MODULE_0__.EPSILON * Math.max(1.0, Math.abs(a3), Math.abs(b3)) && Math.abs(a4 - b4) <= _common_js__WEBPACK_IMPORTED_MODULE_0__.EPSILON * Math.max(1.0, Math.abs(a4), Math.abs(b4)) && Math.abs(a5 - b5) <= _common_js__WEBPACK_IMPORTED_MODULE_0__.EPSILON * Math.max(1.0, Math.abs(a5), Math.abs(b5)) && Math.abs(a6 - b6) <= _common_js__WEBPACK_IMPORTED_MODULE_0__.EPSILON * Math.max(1.0, Math.abs(a6), Math.abs(b6)) && Math.abs(a7 - b7) <= _common_js__WEBPACK_IMPORTED_MODULE_0__.EPSILON * Math.max(1.0, Math.abs(a7), Math.abs(b7)) && Math.abs(a8 - b8) <= _common_js__WEBPACK_IMPORTED_MODULE_0__.EPSILON * Math.max(1.0, Math.abs(a8), Math.abs(b8));
}
/**
 * Alias for {@link mat3.multiply}
 * @function
 */

var mul = multiply;
/**
 * Alias for {@link mat3.subtract}
 * @function
 */

var sub = subtract;

/***/ }),
/* 7 */,
/* 8 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "setupCamera": () => (/* binding */ setupCamera),
/* harmony export */   "SimpleOrbitCamera": () => (/* binding */ SimpleOrbitCamera)
/* harmony export */ });
/* harmony import */ var gl_matrix__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var gl_matrix__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4);


// Backwards compat with existing clients.
function setupCamera(scene, options = {}) {
  return new SimpleOrbitCamera(scene, options);
}

const vecHeap = gl_matrix__WEBPACK_IMPORTED_MODULE_0__.create();
const vecHeap2 = gl_matrix__WEBPACK_IMPORTED_MODULE_0__.create();
const quatHeap = gl_matrix__WEBPACK_IMPORTED_MODULE_1__.create();
const twistHeap = new Float32Array(1);

// Get the vector length between two touches.
function getTouchesLength(touch1, touch2) {
  let dx = touch2.clientX - touch1.clientX;
  let dy = touch2.clientY - touch1.clientY;

  return Math.sqrt(dx * dx + dy * dy);
}

// Touch modes.
const TOUCH_MODE_INVALID = -1;
const TOUCH_MODE_ROTATE = 0;
const TOUCH_MODE_ZOOM = 1;

// An orbit camera setup example.
// Left mouse button controls the orbit itself.
// The right mouse button allows to move the camera and the point it's looking at on the XY plane.
// Scrolling zooms in and out.
class SimpleOrbitCamera {
  constructor(scene, options = {}) {
    this.scene = scene;
    this.canvas = scene.viewer.canvas;
    this.camera = scene.camera;
    // Movement per pixel of movement.
    this.moveSpeed = options.moveSpeed || 2;
    // Rotation in radians per pixel of movement.
    this.rotationSpeed = options.rotationSpeed || (Math.PI / 180);
    // Zoom factor per scroll.
    this.zoomFactor = options.zoomFactor || 0.1;
    this.horizontalAngle = options.horizontalAngle || Math.PI / 2;
    this.verticalAngle = options.verticalAngle || Math.PI / 4;
    this.distance = options.distance || 500;
    this.position = options.position || gl_matrix__WEBPACK_IMPORTED_MODULE_0__.create();
    // What the camera is looking at.
    this.target = options.target || gl_matrix__WEBPACK_IMPORTED_MODULE_0__.create();
    // The twist angle of the camera, which affects the "up" direction.
    // For example, a twist of 180 degrees, i.e. PI, will flip everything upside down.
    this.twist = options.twist || 0;
    // Mouse.
    this.mouse = { buttons: [false, false, false], x: 0, y: 0, x2: 0, y2: 0 };
    // Touches.
    this.touchMode = TOUCH_MODE_INVALID;
    this.touches = [];
    this.instance = null;
    this.onManualChange = options.onManualChange || null;
    this.fov = options.fov || Math.PI / 4;
    this.nearClipPlane = options.nearClipPlane || 1;
    this.farClipPlane = options.farClipPlane || 200000;

    this.update();

    window.addEventListener('resize', (e) => this.onResize());
    setTimeout(() => this.onResize(), 0);

    // Disable the context menu when right-clicking.
    this.canvas.addEventListener('contextmenu', (e) => e.preventDefault());

    this.canvas.addEventListener('selectstart', (e) => e.preventDefault());

    // Track mouse clicks.
    this.canvas.addEventListener('mousedown', (e) => {
      e.preventDefault();

      this.mouse.buttons[e.button] = true;
    });

    // And mouse unclicks.
    // On the whole document rather than the canvas to stop annoying behavior when moving the mouse out of the canvas.
    document.addEventListener('mouseup', (e) => {
      e.preventDefault();

      this.mouse.buttons[e.button] = false;
    });

    // Handle rotating and moving the camera when the mouse moves.
    window.addEventListener('mousemove', (e) => {
      this.mouse.x2 = this.mouse.x;
      this.mouse.y2 = this.mouse.y;
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;

      let dx = this.mouse.x - this.mouse.x2;
      let dy = this.mouse.y - this.mouse.y2;

      if (this.mouse.buttons[0]) {
        this.rotate(dx, dy);
      }

      if (this.mouse.buttons[2]) {
        this.move(-dx, dy);
      }
    });

    // Handle zooming when the mouse scrolls.
    this.canvas.addEventListener('wheel', (e) => {
      e.preventDefault();

      let deltaY = e.deltaY;

      if (e.deltaMode === 1) {
        deltaY = deltaY / 3 * 100;
      }

      this.zoom(deltaY / 100);
    });

    // Listen to touches.
    // Supports 1 or 2 touch points.
    this.canvas.addEventListener('touchstart', (e) => {
      e.preventDefault();

      let targetTouches = e.targetTouches;

      if (targetTouches.length === 1) {
        this.touchMode = TOUCH_MODE_ROTATE;
      } else if (targetTouches.length == 2) {
        this.touchMode = TOUCH_MODE_ZOOM;
      } else {
        this.touchMode = TOUCH_MODE_INVALID;
      }

      this.touches.length = 0;
      this.touches.push(...targetTouches);
    });

    this.canvas.addEventListener('touchend', (e) => {
      e.preventDefault();

      this.touchMode = TOUCH_MODE_INVALID;
    });

    this.canvas.addEventListener('touchcancel', (e) => {
      e.preventDefault();

      this.touchMode = TOUCH_MODE_INVALID;
    });

    // Rotate or zoom based on the touch mode.
    this.canvas.addEventListener('touchmove', (e) => {
      e.preventDefault();

      let targetTouches = e.targetTouches;

      if (this.touchMode === TOUCH_MODE_ROTATE) {
        let oldTouch = this.touches[0];
        let newTouch = targetTouches[0];
        let dx = newTouch.clientX - oldTouch.clientX;
        let dy = newTouch.clientY - oldTouch.clientY;

        this.rotate(dx, dy);
      } else if (this.touchMode === TOUCH_MODE_ZOOM) {
        let len1 = getTouchesLength(this.touches[0], this.touches[1]);
        let len2 = getTouchesLength(targetTouches[0], targetTouches[1]);

        this.zoom((len1 - len2) / 50);
      }

      this.touches.length = 0;
      this.touches.push(...targetTouches);
    });
  }

  update() {
    if (this.instance) {
      let instance = this.instance;
      let mdxCamera = instance.model.cameras[0];

      mdxCamera.getTranslation(vecHeap, instance.sequence, instance.frame, instance.counter);
      gl_matrix__WEBPACK_IMPORTED_MODULE_0__.add(vecHeap, vecHeap, mdxCamera.position);

      mdxCamera.getTargetTranslation(vecHeap2, instance.sequence, instance.frame, instance.counter);
      gl_matrix__WEBPACK_IMPORTED_MODULE_0__.add(vecHeap2, vecHeap2, mdxCamera.targetPosition);

      mdxCamera.getRotation(twistHeap, instance.sequence, instance.frame, instance.counter);
      this.twist = twistHeap[0];

      // Change to world space in case the instance was moved in any way.
      // I am not sure how well this will handle scales, twists, and other things.
      gl_matrix__WEBPACK_IMPORTED_MODULE_0__.transformMat4(vecHeap, vecHeap, instance.worldMatrix);
      gl_matrix__WEBPACK_IMPORTED_MODULE_0__.transformMat4(vecHeap2, vecHeap2, instance.worldMatrix);

      this.moveToAndFace(vecHeap, vecHeap2);
    } else {
      this.updateInternalCamera();
    }
  }

  // Move the camera and the target on the XY plane.
  move(x, y) {
    let dirX = this.camera.directionX;
    let dirY = this.camera.directionY;
    let w = this.canvas.width;
    let h = this.canvas.height;
    let aspect = w / h;

    let sw = (x / w) * this.distance * aspect;
    let sh = (y / h) * this.distance;

    gl_matrix__WEBPACK_IMPORTED_MODULE_0__.add(this.target, this.target, gl_matrix__WEBPACK_IMPORTED_MODULE_0__.scale(vecHeap, gl_matrix__WEBPACK_IMPORTED_MODULE_0__.normalize(vecHeap, gl_matrix__WEBPACK_IMPORTED_MODULE_0__.set(vecHeap, dirX[0], dirX[1], 0)), sw));
    gl_matrix__WEBPACK_IMPORTED_MODULE_0__.add(this.target, this.target, gl_matrix__WEBPACK_IMPORTED_MODULE_0__.scale(vecHeap, gl_matrix__WEBPACK_IMPORTED_MODULE_0__.normalize(vecHeap, gl_matrix__WEBPACK_IMPORTED_MODULE_0__.set(vecHeap, dirY[0], dirY[1], 0)), sh));

    this.manualChange();
  }

  // Rotate the camera around the target.
  rotate(x, y) {
    this.horizontalAngle -= x * this.rotationSpeed;
    this.verticalAngle -= y * this.rotationSpeed;

    this.manualChange();
  }

  // Zoom the camera by changing the distance from the target.
  zoom(factor) {
    this.distance = Math.max(1, this.distance * (1 + factor * this.zoomFactor));

    this.manualChange();
  }

  manualChange() {
    this.updateInternalCamera();

    if (this.instance) {
      this.instance = null;

      if (this.onManualChange) {
        this.onManualChange();
      }
    }
  }

  // Resize the canvas automatically and update the camera.
  onResize() {
    let width = Math.max(this.canvas.clientWidth, 1);
    let height = Math.max(this.canvas.clientHeight, 1);

    this.canvas.width = width;
    this.canvas.height = height;

    this.scene.viewport[2] = width;
    this.scene.viewport[3] = height;

    this.camera.perspective(this.fov, width / height, this.nearClipPlane, this.farClipPlane);
  }

  moveToAndFace(position, target) {
    gl_matrix__WEBPACK_IMPORTED_MODULE_0__.sub(vecHeap, position, target);

    let r = gl_matrix__WEBPACK_IMPORTED_MODULE_0__.length(vecHeap);
    let theta = Math.atan2(vecHeap[1], vecHeap[0]);
    let phi = Math.acos(vecHeap[2] / r);

    gl_matrix__WEBPACK_IMPORTED_MODULE_0__.copy(this.target, target);

    this.verticalAngle = phi;
    this.horizontalAngle = theta + Math.PI / 2;
    this.distance = r;

    this.updateInternalCamera();
  }

  updateInternalCamera() {
    // Limit the vertical angle so it doesn't flip.
    // Since the camera uses a quaternion, flips don't matter to it, but this feels better.
    this.verticalAngle = Math.min(Math.max(0.01, this.verticalAngle), Math.PI - 0.01);

    gl_matrix__WEBPACK_IMPORTED_MODULE_1__.identity(quatHeap);
    gl_matrix__WEBPACK_IMPORTED_MODULE_1__.rotateZ(quatHeap, quatHeap, this.horizontalAngle);
    gl_matrix__WEBPACK_IMPORTED_MODULE_1__.rotateX(quatHeap, quatHeap, this.verticalAngle);

    gl_matrix__WEBPACK_IMPORTED_MODULE_0__.set(this.position, 0, 0, 1);
    gl_matrix__WEBPACK_IMPORTED_MODULE_0__.transformQuat(this.position, this.position, quatHeap);
    gl_matrix__WEBPACK_IMPORTED_MODULE_0__.scale(this.position, this.position, this.distance);
    gl_matrix__WEBPACK_IMPORTED_MODULE_0__.add(this.position, this.position, this.target);

    let twist = this.twist - Math.PI / 2;
    gl_matrix__WEBPACK_IMPORTED_MODULE_0__.set(vecHeap, 0, -Math.cos(twist), -Math.sin(twist));

    this.camera.moveToAndFace(this.position, this.target, vecHeap);
  }

  applyInstanceCamera(instance) {
    this.instance = instance;
    this.fov = instance.model.cameras[0].fieldOfView;

    this.onResize();

    this.update();
  }
}


/***/ }),
/* 9 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ MapViewer)
/* harmony export */ });
/* harmony import */ var _w3xReader_w3e_w3e__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(10);
/* harmony import */ var _w3xReader_MappedData__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(17);
/* harmony import */ var _variations__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(20);
/* harmony import */ var _common_arrayunique__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(21);
/* harmony import */ var _shaders_ground_vert__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(22);
/* harmony import */ var _shaders_ground_frag__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(23);
/* harmony import */ var _shaders_cliffs_vert__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(25);
/* harmony import */ var _shaders_cliffs_frag__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(26);
/* harmony import */ var _shaders_water_vert__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(27);
/* harmony import */ var _shaders_water_frag__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(28);
/* harmony import */ var _shaders_normal_frag__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(29);
/* harmony import */ var _shaders_normal_vert__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(30);
/* harmony import */ var _shaders_shownormal_vert__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(31);
/* harmony import */ var _shaders_line_frag__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(32);
/* harmony import */ var _shaders_line_vert__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(33);
/* harmony import */ var _terrainmodel__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(34);
/* harmony import */ var _w3xReader_doo_doo__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(35);
/* harmony import */ var _doodad__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(40);
/* harmony import */ var _unit__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(44);
/* harmony import */ var _w3xReader_unitsdoo_unitsdoo__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(45);




















class MapViewer {
  // 地图中心偏移量
  centerOffset = new Float32Array(2); // 地图大小

  mapSize = new Int32Array(2);
  /**
   * 地面贴图数据
   */

  terrainData = new _w3xReader_MappedData__WEBPACK_IMPORTED_MODULE_1__.MappedData();
  /**
   * 悬崖贴图数据
   */

  cliffTypesData = new _w3xReader_MappedData__WEBPACK_IMPORTED_MODULE_1__.MappedData();
  /**
   * 水面贴图数据
   */

  waterData = new _w3xReader_MappedData__WEBPACK_IMPORTED_MODULE_1__.MappedData();
  /**
   * 装饰物数据
   */

  doodadsData = new _w3xReader_MappedData__WEBPACK_IMPORTED_MODULE_1__.MappedData();
  /**
   * 单位数据
   */

  unitsData = new _w3xReader_MappedData__WEBPACK_IMPORTED_MODULE_1__.MappedData();
  /**
   * 贴图组
   */

  tilesets = [];
  cliffTilesets = [];
  tilesetTextures = [];
  cliffTextures = [];
  waterTextures = [];
  maxDeepColor = new Float32Array(4);
  minDeepColor = new Float32Array(4);
  maxShallowColor = new Float32Array(4);
  minShallowColor = new Float32Array(4);
  vertexBuffer = null;
  lineVertexBuffer = null;
  faceBuffer = null;
  lineBuffer = null;
  instanceBuffer = null;
  textureBuffer = null;
  variationBuffer = null;
  waterBuffer = null;
  heightMap = null;
  waterHeightMap = null;
  cliffHeightMap = null;
  waterIndex = 0;
  doodads = [];
  units = [];
  selX = 0;
  selY = 0;

  constructor(viewer, worldScene, buf) {
    this.viewer = viewer;
    this.worldScene = worldScene;
    this.groundShader = this.viewer.webgl.createShader(_shaders_ground_vert__WEBPACK_IMPORTED_MODULE_4__.default, _shaders_ground_frag__WEBPACK_IMPORTED_MODULE_5__.default);
    this.cliffShader = this.viewer.webgl.createShader(_shaders_cliffs_vert__WEBPACK_IMPORTED_MODULE_6__.default, _shaders_cliffs_frag__WEBPACK_IMPORTED_MODULE_7__.default);
    this.waterShader = this.viewer.webgl.createShader(_shaders_water_vert__WEBPACK_IMPORTED_MODULE_8__.default, _shaders_water_frag__WEBPACK_IMPORTED_MODULE_9__.default);
    this.normalShader = this.viewer.webgl.createShader(_shaders_normal_vert__WEBPACK_IMPORTED_MODULE_11__.default, _shaders_normal_frag__WEBPACK_IMPORTED_MODULE_10__.default);
    this.shownormalShader = this.viewer.webgl.createShader(_shaders_shownormal_vert__WEBPACK_IMPORTED_MODULE_12__.default, _shaders_normal_frag__WEBPACK_IMPORTED_MODULE_10__.default);
    this.lineShader = this.viewer.webgl.createShader(_shaders_line_vert__WEBPACK_IMPORTED_MODULE_14__.default, _shaders_line_frag__WEBPACK_IMPORTED_MODULE_13__.default);
    this.w3e = new _w3xReader_w3e_w3e__WEBPACK_IMPORTED_MODULE_0__.default();
    this.w3e.load(buf);
    this.loadBaseFiles().then(() => {
      this.loadTerrainCliffsAndWater();
      this.loadDoodadsAndDestructibles();
      this.loadUnitsAndItems();
    });
  }

  async loadBaseFile(path, dataType) {
    if (dataType === 'text') {
      return await message.loadTextArray(path);
    }

    return await message.loadBlp(path);
  }

  async loadBaseFiles() {
    const promises = [this.loadBaseFile('TerrainArt\\Terrain.slk', 'text'), this.loadBaseFile('TerrainArt\\CliffTypes.slk', 'text'), this.loadBaseFile('TerrainArt\\Water.slk', 'text'), this.loadBaseFile('Doodads\\Doodads.slk', 'text'), this.loadBaseFile('Doodads\\DoodadMetaData.slk', 'text'), this.loadBaseFile('Units\\DestructableData.slk', 'text'), this.loadBaseFile('Units\\DestructableMetaData.slk', 'text'), this.loadBaseFile('Units\\UnitData.slk', 'text'), this.loadBaseFile('Units\\unitUI.slk', 'text'), this.loadBaseFile('Units\\ItemData.slk', 'text'), this.loadBaseFile('Units\\UnitMetaData.slk', 'text'), this.loadBaseFile('table\\unit.ini', 'text')];
    const [terrain, cliffTypes, water, doodads, doodadMetaData, destructableData, destructableMetaData, unitData, unitUi, itemData, unitMetaData, customUnit] = await Promise.all(promises);

    if (!terrain || !cliffTypes || !water || !doodads || !doodadMetaData || !destructableData || !destructableMetaData || !unitData || !unitUi || !itemData || !unitMetaData) {
      throw new Error('Failed to load the base files');
    }

    this.terrainData.load(terrain.join('\n'));
    this.cliffTypesData.load(cliffTypes.join('\n'));
    this.waterData.load(water.join('\n'));
    this.doodadsData.load(doodads.join('\n'));
    this.doodadsData.load(destructableData.join('\n'));
    this.unitsData.load(unitData.join('\n'));
    this.unitsData.load(unitUi.join('\n'));
    this.unitsData.load(itemData.join('\n'));
    this.unitsData.load(customUnit.join('\n'));
  }
  /**
   * 加载地形、悬崖和水面
   */


  async loadTerrainCliffsAndWater() {
    const viewer = this.viewer;
    const centerOffset = this.w3e.centerOffset;
    const mapSize = this.w3e.mapSize;
    this.corners = this.w3e.corners;
    this.centerOffset.set(centerOffset);
    this.mapSize.set(mapSize); // Override the grid based on the map.

    this.worldScene.grid = new this.worldScene.grid.constructor(centerOffset[0], centerOffset[1], mapSize[0] * 128 - 128, mapSize[1] * 128 - 128, 16 * 128, 16 * 128);
    const tileset = this.w3e.tileset;
    const tilesetTextures = [];
    const cliffTextures = [];
    const waterTextures = [];

    for (const groundTileset of this.w3e.groundTilesets) {
      const row = this.terrainData.getRow(groundTileset);
      this.tilesets.push(row);
      tilesetTextures.push(this.viewer.load(`${row.string('dir')}\\${row.string('file')}.blp`));
    }

    const blights = {
      A: 'Ashen',
      B: 'Barrens',
      C: 'Felwood',
      D: 'Cave',
      F: 'Lordf',
      G: 'Dungeon',
      I: 'Ice',
      J: 'DRuins',
      K: 'Citadel',
      L: 'Lords',
      N: 'North',
      O: 'Outland',
      Q: 'VillageFall',
      V: 'Village',
      W: 'Lordw',
      X: 'Village',
      Y: 'Village',
      Z: 'Ruins'
    };
    this.blightTextureIndex = tilesetTextures.length;
    tilesetTextures.push(this.viewer.load(`TerrainArt\\Blight\\${blights[tileset]}_Blight.blp`));

    for (const cliffTileset of this.w3e.cliffTilesets) {
      const row = this.cliffTypesData.getRow(cliffTileset);
      this.cliffTilesets.push(row);
      cliffTextures.push(this.viewer.load(`${row.string('texDir')}\\${row.string('texFile')}.blp`));
    }

    const waterRow = this.waterData.getRow(`${tileset}Sha`);
    this.waterHeightOffset = waterRow.number('height');
    this.waterIncreasePerFrame = waterRow.number('texRate') / 60;
    this.waterTextures.length = 0;
    this.maxDeepColor.set([waterRow.number('Dmax_R'), waterRow.number('Dmax_G'), waterRow.number('Dmax_B'), waterRow.number('Dmax_A')]);
    this.minDeepColor.set([waterRow.number('Dmin_R'), waterRow.number('Dmin_G'), waterRow.number('Dmin_B'), waterRow.number('Dmin_A')]);
    this.maxShallowColor.set([waterRow.number('Smax_R'), waterRow.number('Smax_G'), waterRow.number('Smax_B'), waterRow.number('Smax_A')]);
    this.minShallowColor.set([waterRow.number('Smin_R'), waterRow.number('Smin_G'), waterRow.number('Smin_B'), waterRow.number('Smin_A')]);

    for (let i = 0, l = waterRow.number('numTex'); i < l; i++) {
      waterTextures.push(this.viewer.load(`${waterRow.string('texFile')}${i < 10 ? '0' : ''}${i}.blp`));
    }
    /**
     * 加载贴图
     */


    this.tilesetTextures = await Promise.all(tilesetTextures);
    this.cliffTextures = await Promise.all(cliffTextures);
    this.waterTextures = await Promise.all(waterTextures);
    const corners = this.w3e.corners;
    const [columns, rows] = this.mapSize;
    console.info(`columnes ${columns} rows ${rows}`, this);
    const instanceCount = (columns - 1) * (rows - 1);
    const cliffHeights = new Float32Array(columns * rows);
    const cornerHeights = new Float32Array(columns * rows);
    const waterHeights = new Float32Array(columns * rows);
    const cornerTextures = new Uint8Array(instanceCount * 4);
    const cornerVariations = new Uint8Array(instanceCount * 4);
    const waterFlags = new Uint8Array(instanceCount);
    let instance = 0;
    const cliffs = {};
    this.columns = columns - 1;
    this.rows = rows - 1;

    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < columns; x++) {
        const bottomLeft = corners[y][x];
        const index = y * columns + x;
        cliffHeights[index] = bottomLeft.groundHeight;
        cornerHeights[index] = bottomLeft.groundHeight + bottomLeft.layerHeight - 2;
        waterHeights[index] = bottomLeft.waterHeight;

        if (y < rows - 1 && x < columns - 1) {
          // Water can be used with cliffs and normal corners, so store water state regardless.
          waterFlags[instance] = this.w3e.isWater(x, y); // Is this a cliff, or a normal corner?

          if (this.w3e.isCliff(x, y)) {
            const bottomLeftLayer = bottomLeft.layerHeight;
            const bottomRightLayer = corners[y][x + 1].layerHeight;
            const topLeftLayer = corners[y + 1][x].layerHeight;
            const topRightLayer = corners[y + 1][x + 1].layerHeight;
            const base = Math.min(bottomLeftLayer, bottomRightLayer, topLeftLayer, topRightLayer);
            const fileName = this.cliffFileName(bottomLeftLayer, bottomRightLayer, topLeftLayer, topRightLayer, base);

            if (fileName !== 'AAAA') {
              let cliffTexture = bottomLeft.cliffTexture; /// ?

              if (cliffTexture === 15) {
                cliffTexture = 1;
              }

              const cliffRow = this.cliffTilesets[cliffTexture];
              const dir = cliffRow.string('cliffModelDir');
              const path = `Doodads\\Terrain\\${dir}\\${dir}${fileName}${(0,_variations__WEBPACK_IMPORTED_MODULE_2__.default)(dir, fileName, bottomLeft.cliffVariation)}.mdx`;

              if (!cliffs[path]) {
                cliffs[path] = {
                  locations: [],
                  textures: []
                };
              }

              cliffs[path].locations.push((x + 1) * 128 + centerOffset[0], y * 128 + centerOffset[1], (base - 2) * 128);
              cliffs[path].textures.push(cliffTexture);
            }
          } else {
            const bottomLeftTexture = this.w3e.cornerTexture(x, y, this.tilesets, this.cliffTilesets);
            const bottomRightTexture = this.w3e.cornerTexture(x + 1, y, this.tilesets, this.cliffTilesets);
            const topLeftTexture = this.w3e.cornerTexture(x, y + 1, this.tilesets, this.cliffTilesets);
            const topRightTexture = this.w3e.cornerTexture(x + 1, y + 1, this.tilesets, this.cliffTilesets);
            const textures = (0,_common_arrayunique__WEBPACK_IMPORTED_MODULE_3__.default)([bottomLeftTexture, bottomRightTexture, topLeftTexture, topRightTexture]).sort();
            let texture = textures[0];
            cornerTextures[instance * 4] = texture + 1;
            cornerVariations[instance * 4] = this.getVariation(texture, bottomLeft.groundVariation);
            textures.shift();

            for (let i = 0, l = textures.length; i < l; i++) {
              let bitset = 0;
              texture = textures[i];

              if (bottomRightTexture === texture) {
                bitset |= 0b0001;
              }

              if (bottomLeftTexture === texture) {
                bitset |= 0b0010;
              }

              if (topRightTexture === texture) {
                bitset |= 0b0100;
              }

              if (topLeftTexture === texture) {
                bitset |= 0b1000;
              }

              cornerTextures[instance * 4 + 1 + i] = texture + 1;
              cornerVariations[instance * 4 + 1 + i] = bitset;
            }
          }

          instance += 1;
        }
      }
    }

    const gl = this.viewer.gl;
    const webgl = this.viewer.webgl;
    this.xyzBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.xyzBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-10000, 0, 0, 10000, 0, 0, 0, -10000, 0, 0, 10000, 0, 0, 0, -10000, 0, 0, 10000]), gl.STATIC_DRAW);
    this.vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([0, 0, 1, 0, 0, 1, 1, 1]), gl.STATIC_DRAW);
    this.faceBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.faceBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint8Array([0, 1, 2, 1, 3, 2]), gl.STATIC_DRAW);
    this.lineVertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.lineVertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 1, 0, 0, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1]), gl.STATIC_DRAW);
    this.lineBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.lineBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint8Array([0, 1, 2, 3, 4, 5, 6, 7]), gl.STATIC_DRAW);
    this.cliffHeightMap = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, this.cliffHeightMap);
    webgl.setTextureMode(gl.CLAMP_TO_EDGE, gl.CLAMP_TO_EDGE, gl.NEAREST, gl.NEAREST);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.ALPHA, columns, rows, 0, gl.ALPHA, gl.FLOAT, cliffHeights);
    this.heightMap = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, this.heightMap);
    webgl.setTextureMode(gl.CLAMP_TO_EDGE, gl.CLAMP_TO_EDGE, gl.NEAREST, gl.NEAREST);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.ALPHA, columns, rows, 0, gl.ALPHA, gl.FLOAT, cornerHeights);
    this.waterHeightMap = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, this.waterHeightMap);
    webgl.setTextureMode(gl.CLAMP_TO_EDGE, gl.CLAMP_TO_EDGE, gl.NEAREST, gl.NEAREST);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.ALPHA, columns, rows, 0, gl.ALPHA, gl.FLOAT, waterHeights);
    this.instanceBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.instanceBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(instanceCount).map((currentValue, index) => index), gl.STATIC_DRAW);
    this.textureBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.textureBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, cornerTextures, gl.STATIC_DRAW);
    this.variationBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.variationBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, cornerVariations, gl.STATIC_DRAW);
    this.waterBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.waterBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, waterFlags, gl.STATIC_DRAW);
    this.terrainReady = true;
    this.anyReady = true;
    const cliffShader = this.cliffShader;
    const cliffPromises = Object.entries(cliffs).map(async cliff => {
      const path = cliff[0];
      const {
        locations,
        textures
      } = cliff[1];
      const buffer = await this.loadBaseFile(path, 'arrayBuffer');

      if (buffer) {
        return new _terrainmodel__WEBPACK_IMPORTED_MODULE_15__.default(this, buffer, locations, textures, cliffShader);
      }

      return;
    }).filter(x => x); // Sometimes TS isn't the brightest.

    const cliffPromisesForReal = cliffPromises;
    this.cliffModels = await Promise.all(cliffPromisesForReal);
    this.cliffsReady = true;
  }
  /**
   * 加载装饰物和可破坏装饰
   */


  async loadDoodadsAndDestructibles() {
    const buf = await message.loadBlp('war3map.doo');
    const parser = new _w3xReader_doo_doo__WEBPACK_IMPORTED_MODULE_16__.default();

    try {
      parser.load(buf, 0);
    } catch (e) {
      console.warn(`Failed to load war3map.doo: ${e}`);
      return;
    } // Doodads and destructibles.


    for (const doodad of parser.doodads) {
      try {
        const row = this.doodadsData.getRow(doodad.id);

        if (row) {
          let file = row.string('file');

          if (file) {
            const numVar = row.number('numVar');

            if (file.endsWith('.mdl')) {
              file = file.slice(0, -4);
            }

            let fileVar = file;
            file += '.mdx';

            if (numVar > 1) {
              fileVar += Math.min(doodad.variation, numVar - 1);
            }

            fileVar += '.mdx';
            this.viewer.load(fileVar).then(model => {
              if (!model) return;
              this.doodads.push(new _doodad__WEBPACK_IMPORTED_MODULE_17__.default(this, model, row, doodad));
            });
          } else {
            console.log('Unknown doodad ID', doodad.id, doodad);
          }
        }
      } catch (e) {
        console.warn(`Failed to load doodad/destructible ID ${doodad.id}: ${e}`);
      }
    }
  }
  /**
   * 加载单位和物品
   * @returns 
   */


  async loadUnitsAndItems() {
    const buf = await message.loadBlp('war3mapUnits.doo');
    const parser = new _w3xReader_unitsdoo_unitsdoo__WEBPACK_IMPORTED_MODULE_19__.default();

    try {
      parser.load(buf, 0);
    } catch (e) {
      console.warn(`Failed to load war3mapUnits.doo: ${e}`);
      return;
    } // Collect the units and items data.


    for (const unit of parser.units) {
      try {
        let row;
        let path; // Hardcoded?

        if (unit.id === 'sloc') {
          path = 'Objects\\StartLocation\\StartLocation.mdx';
        } else {
          row = this.unitsData.getRow(unit.id);

          if (row) {
            path = row.string('file');

            if (path) {
              if (path.endsWith('.mdl')) {
                path = path.slice(0, -4);
              }

              path += '.mdx';
            }
          }
        }

        if (path) {
          this.viewer.load(path).then(model => {
            if (!model) {
              return this.viewer.load('units/critters/sammycube/sammycube.mdx').then(model => {
                if (!model) return;
                this.units.push(new _unit__WEBPACK_IMPORTED_MODULE_18__.default(this, model, row, unit));
              });
            }

            this.units.push(new _unit__WEBPACK_IMPORTED_MODULE_18__.default(this, model, row, unit));
          });
        } else {
          console.log('Unknown unit ID', unit.id, unit);
        }
      } catch (e) {
        console.warn(`Failed to load unit/item ID ${unit.id}: ${e}`);
      }
    }

    this.unitsReady = true;
    this.anyReady = true;
  }

  getVariation(groundTexture, variation) {
    const texture = this.tilesetTextures[groundTexture]; // Extended?

    if (texture.width > texture.height) {
      if (variation < 16) {
        return 16 + variation;
      } else if (variation === 16) {
        return 15;
      } else {
        return 0;
      }
    } else {
      if (variation === 0) {
        return 0;
      } else {
        return 15;
      }
    }
  }

  cliffFileName(bottomLeftLayer, bottomRightLayer, topLeftLayer, topRightLayer, base) {
    return String.fromCharCode(65 + bottomLeftLayer - base) + String.fromCharCode(65 + topLeftLayer - base) + String.fromCharCode(65 + topRightLayer - base) + String.fromCharCode(65 + bottomRightLayer - base);
  }
  /**
  * Update the map.
  */


  update() {
    if (this.anyReady) {
      this.viewer.update(); // const worldScene = this.worldScene;
      // worldScene.update(17);

      this.waterIndex += this.waterIncreasePerFrame;

      if (this.waterIndex >= this.waterTextures.length) {
        this.waterIndex = 0;
      }

      for (const doodad of this.doodads) {
        doodad.update();
      }

      for (const unit of this.units) {
        unit.update();
      }
    }
  }

  render() {
    if (this.anyReady) {
      const worldScene = this.worldScene;
      worldScene.startFrame();
      this.renderGround();
      this.renderCliffs(); // this.renderCliffsNormal();

      worldScene.renderOpaque();
      this.renderWater();
      this.renderGroudLine();
      worldScene.renderTranslucent();
      this.update();
    }
  }

  renderXYZ() {
    const gl = this.viewer.gl;
    const webgl = this.viewer.webgl;
    gl.depthMask(false);
    const shader = this.normalShader;
    webgl.useShader(shader);
    const uniforms = shader.uniforms;
    const attribs = shader.attribs;
    gl.uniformMatrix4fv(uniforms['u_VP'], false, this.worldScene.camera.viewProjectionMatrix);
    gl.bindBuffer(gl.ARRAY_BUFFER, this.xyzBuffer);
    gl.vertexAttribPointer(attribs['a_position'], 3, gl.FLOAT, false, 0, 0);
    var primitiveType = gl.LINES;
    var offset = 0;
    var count = 6;
    gl.drawArrays(primitiveType, offset, count);
  }
  /**
   * 绘制地面网格线
   */


  renderGroudLine() {
    if (this.terrainReady) {
      const gl = this.viewer.gl;
      const webgl = this.viewer.webgl;
      const instancedArrays = webgl.extensions['ANGLE_instanced_arrays'];
      const shader = this.lineShader;
      const uniforms = shader.uniforms;
      const attribs = shader.attribs;
      const instanceAttrib = attribs['a_InstanceID'];
      const positionAttrib = attribs['a_position'];
      gl.enable(gl.BLEND);
      gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
      webgl.useShader(shader);
      gl.uniformMatrix4fv(uniforms['u_VP'], false, this.worldScene.camera.viewProjectionMatrix);
      gl.uniform2fv(uniforms['u_offset'], this.centerOffset);
      gl.uniform2f(uniforms['u_size'], this.columns, this.rows);
      gl.uniform2f(uniforms['u_sel'], this.selX, this.selY);
      gl.uniform1i(uniforms['u_heightMap'], 15);
      gl.activeTexture(gl.TEXTURE15);
      gl.bindTexture(gl.TEXTURE_2D, this.heightMap);
      gl.bindBuffer(gl.ARRAY_BUFFER, this.lineVertexBuffer);
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.lineBuffer);
      gl.vertexAttribPointer(positionAttrib, 3, gl.FLOAT, false, 0, 0);
      gl.bindBuffer(gl.ARRAY_BUFFER, this.instanceBuffer);
      gl.vertexAttribPointer(instanceAttrib, 1, gl.FLOAT, false, 0, 0);
      instancedArrays.vertexAttribDivisorANGLE(instanceAttrib, 1);
      instancedArrays.drawElementsInstancedANGLE(gl.LINES, 8, gl.UNSIGNED_BYTE, 0, this.rows * this.columns);
      instancedArrays.vertexAttribDivisorANGLE(instanceAttrib, 0);
    }
  }
  /**
   * 绘制地面
   */


  renderGround() {
    if (this.terrainReady) {
      const gl = this.viewer.gl;
      const webgl = this.viewer.webgl;
      const instancedArrays = webgl.extensions['ANGLE_instanced_arrays'];
      const shader = this.groundShader;
      const uniforms = shader.uniforms;
      const attribs = shader.attribs;
      const tilesetTextures = this.tilesetTextures;
      const instanceAttrib = attribs['a_InstanceID'];
      const positionAttrib = attribs['a_position'];
      const texturesAttrib = attribs['a_textures'];
      const variationsAttrib = attribs['a_variations'];
      const tilesetCount = tilesetTextures.length; // This includes the blight texture.

      gl.enable(gl.BLEND);
      gl.enable(gl.CULL_FACE);
      gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
      webgl.useShader(shader);
      gl.uniformMatrix4fv(uniforms['u_VP'], false, this.worldScene.camera.viewProjectionMatrix);
      gl.uniform2fv(uniforms['u_offset'], this.centerOffset);
      gl.uniform2f(uniforms['u_size'], this.columns, this.rows);
      gl.uniform2f(uniforms['u_sel'], this.selX, this.selY);
      gl.uniform1i(uniforms['u_heightMap'], 15);
      gl.uniform1i(uniforms['u_cliff_heightMap'], 16);
      gl.activeTexture(gl.TEXTURE15);
      gl.bindTexture(gl.TEXTURE_2D, this.heightMap);
      gl.activeTexture(gl.TEXTURE16);
      gl.bindTexture(gl.TEXTURE_2D, this.cliffHeightMap);
      gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
      gl.vertexAttribPointer(positionAttrib, 2, gl.FLOAT, false, 0, 0);
      gl.bindBuffer(gl.ARRAY_BUFFER, this.instanceBuffer);
      gl.vertexAttribPointer(instanceAttrib, 1, gl.FLOAT, false, 0, 0);
      instancedArrays.vertexAttribDivisorANGLE(instanceAttrib, 1);
      gl.bindBuffer(gl.ARRAY_BUFFER, this.textureBuffer);
      gl.vertexAttribPointer(texturesAttrib, 4, gl.UNSIGNED_BYTE, false, 0, 0);
      instancedArrays.vertexAttribDivisorANGLE(texturesAttrib, 1);
      gl.bindBuffer(gl.ARRAY_BUFFER, this.variationBuffer);
      gl.vertexAttribPointer(variationsAttrib, 4, gl.UNSIGNED_BYTE, false, 0, 0);
      instancedArrays.vertexAttribDivisorANGLE(variationsAttrib, 1);
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.faceBuffer);
      gl.uniform1f(uniforms['u_baseTileset'], 0);

      for (let i = 0, l = Math.min(tilesetCount, 15); i < l; i++) {
        const isExtended = tilesetTextures[i].width > tilesetTextures[i].height ? 1 : 0;
        gl.uniform1f(uniforms[`u_extended[${i}]`], isExtended);
        gl.uniform1i(uniforms[`u_tilesets[${i}]`], i);
        webgl.bindTexture(tilesetTextures[i], i);
      }

      instancedArrays.drawElementsInstancedANGLE(gl.TRIANGLES, 6, gl.UNSIGNED_BYTE, 0, this.rows * this.columns);

      if (tilesetCount > 15) {
        gl.uniform1f(uniforms['u_baseTileset'], 15);

        for (let i = 0, l = tilesetCount - 15; i < l; i++) {
          const isExtended = tilesetTextures[i + 15].width > tilesetTextures[i + 15].height ? 1 : 0;
          gl.uniform1f(uniforms[`u_extended[${i}]`], isExtended);
          webgl.bindTexture(tilesetTextures[i + 15], i);
        }

        instancedArrays.drawElementsInstancedANGLE(gl.TRIANGLES, 6, gl.UNSIGNED_BYTE, 0, this.rows * this.columns);
      }

      instancedArrays.vertexAttribDivisorANGLE(texturesAttrib, 0);
      instancedArrays.vertexAttribDivisorANGLE(variationsAttrib, 0);
      instancedArrays.vertexAttribDivisorANGLE(instanceAttrib, 0);
    }
  }
  /**
   * 绘制悬崖
   */


  renderCliffs() {
    if (this.cliffsReady) {
      const gl = this.viewer.gl;
      const webgl = this.viewer.webgl;
      const instancedArrays = webgl.extensions['ANGLE_instanced_arrays'];
      const vertexArrayObject = webgl.extensions['OES_vertex_array_object'];
      const shader = this.cliffShader;
      const attribs = shader.attribs;
      const uniforms = shader.uniforms;
      gl.disable(gl.BLEND);
      shader.use();
      gl.uniformMatrix4fv(uniforms['u_VP'], false, this.worldScene.camera.viewProjectionMatrix);
      gl.uniform1i(uniforms['u_heightMap'], 0);
      gl.uniform2f(uniforms['u_pixel'], 1 / (this.columns + 1), 1 / (this.rows + 1));
      gl.uniform2fv(uniforms['u_centerOffset'], this.centerOffset);
      gl.uniform1i(uniforms['u_texture1'], 1);
      gl.uniform1i(uniforms['u_texture2'], 2);
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, this.cliffHeightMap);
      gl.activeTexture(gl.TEXTURE1);
      gl.bindTexture(gl.TEXTURE_2D, this.cliffTextures[0].webglResource);

      if (this.cliffTextures.length > 1) {
        gl.activeTexture(gl.TEXTURE2);
        gl.bindTexture(gl.TEXTURE_2D, this.cliffTextures[1].webglResource);
      } // Set instanced attributes.


      if (!vertexArrayObject) {
        instancedArrays.vertexAttribDivisorANGLE(attribs['a_instancePosition'], 1);
        instancedArrays.vertexAttribDivisorANGLE(attribs['a_instanceTexture'], 1);
      } // Render the cliffs.


      for (const cliff of this.cliffModels) {
        cliff.render(shader);
      } // Clear instanced attributes.


      if (!vertexArrayObject) {
        instancedArrays.vertexAttribDivisorANGLE(attribs['a_instancePosition'], 0);
        instancedArrays.vertexAttribDivisorANGLE(attribs['a_instanceTexture'], 0);
      }
    }
  }

  renderCliffsNormal() {
    if (this.cliffsReady) {
      const gl = this.viewer.gl;
      const webgl = this.viewer.webgl;
      const instancedArrays = webgl.extensions['ANGLE_instanced_arrays'];
      const vertexArrayObject = webgl.extensions['OES_vertex_array_object'];
      const shader = this.shownormalShader;
      const attribs = shader.attribs;
      const uniforms = shader.uniforms;
      gl.disable(gl.BLEND);
      shader.use();
      gl.uniformMatrix4fv(uniforms['u_VP'], false, this.worldScene.camera.viewProjectionMatrix);
      gl.uniform1i(uniforms['u_heightMap'], 0);
      gl.uniform2f(uniforms['u_pixel'], 1 / (this.columns + 1), 1 / (this.rows + 1));
      gl.uniform2fv(uniforms['u_centerOffset'], this.centerOffset);
      gl.uniform1i(uniforms['u_texture1'], 1);
      gl.uniform1i(uniforms['u_texture2'], 2);
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, this.cliffHeightMap);
      gl.activeTexture(gl.TEXTURE1);
      gl.bindTexture(gl.TEXTURE_2D, this.cliffTextures[0].webglResource);

      if (this.cliffTextures.length > 1) {
        gl.activeTexture(gl.TEXTURE2);
        gl.bindTexture(gl.TEXTURE_2D, this.cliffTextures[1].webglResource);
      } // Set instanced attributes.


      if (!vertexArrayObject) {
        instancedArrays.vertexAttribDivisorANGLE(attribs['a_instancePosition'], 1);
        instancedArrays.vertexAttribDivisorANGLE(attribs['a_instanceTexture'], 1);
      } // Render the cliffs.


      for (const cliff of this.cliffModels) {
        cliff.renderNormal(shader);
      } // Clear instanced attributes.


      if (!vertexArrayObject) {
        instancedArrays.vertexAttribDivisorANGLE(attribs['a_instancePosition'], 0);
        instancedArrays.vertexAttribDivisorANGLE(attribs['a_instanceTexture'], 0);
      }
    }
  }
  /**
   * 绘制水面
   */


  renderWater() {
    if (this.terrainReady) {
      const gl = this.viewer.gl;
      const webgl = this.viewer.webgl;
      const instancedArrays = webgl.extensions['ANGLE_instanced_arrays'];
      const shader = this.waterShader;
      const uniforms = shader.uniforms;
      const attribs = shader.attribs;
      const instanceAttrib = attribs['a_InstanceID'];
      const positionAttrib = attribs['a_position'];
      const isWaterAttrib = attribs['a_isWater'];
      gl.depthMask(false);
      gl.enable(gl.BLEND);
      gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
      webgl.useShader(shader);
      gl.uniformMatrix4fv(uniforms['u_VP'], false, this.worldScene.camera.viewProjectionMatrix);
      gl.uniform2fv(uniforms['u_offset'], this.centerOffset);
      gl.uniform2f(uniforms['u_size'], this.columns, this.rows);
      gl.uniform1i(uniforms['u_heightMap'], 0);
      gl.uniform1i(uniforms['u_waterHeightMap'], 1);
      gl.uniform1i(uniforms['u_waterTexture'], 2);
      gl.uniform1f(uniforms['u_offsetHeight'], this.waterHeightOffset);
      gl.uniform4fv(uniforms['u_maxDeepColor'], this.maxDeepColor);
      gl.uniform4fv(uniforms['u_minDeepColor'], this.minDeepColor);
      gl.uniform4fv(uniforms['u_maxShallowColor'], this.maxShallowColor);
      gl.uniform4fv(uniforms['u_minShallowColor'], this.minShallowColor);
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, this.heightMap);
      gl.activeTexture(gl.TEXTURE1);
      gl.bindTexture(gl.TEXTURE_2D, this.waterHeightMap);
      webgl.bindTexture(this.waterTextures[this.waterIndex | 0], 2);
      gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
      gl.vertexAttribPointer(positionAttrib, 2, gl.FLOAT, false, 8, 0);
      gl.bindBuffer(gl.ARRAY_BUFFER, this.instanceBuffer);
      gl.vertexAttribPointer(instanceAttrib, 1, gl.FLOAT, false, 4, 0);
      instancedArrays.vertexAttribDivisorANGLE(instanceAttrib, 1);
      gl.bindBuffer(gl.ARRAY_BUFFER, this.waterBuffer);
      gl.vertexAttribPointer(isWaterAttrib, 1, gl.UNSIGNED_BYTE, false, 1, 0);
      instancedArrays.vertexAttribDivisorANGLE(isWaterAttrib, 1);
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.faceBuffer);
      instancedArrays.drawElementsInstancedANGLE(gl.TRIANGLES, 6, gl.UNSIGNED_BYTE, 0, this.rows * this.columns);
      instancedArrays.vertexAttribDivisorANGLE(isWaterAttrib, 0);
      instancedArrays.vertexAttribDivisorANGLE(instanceAttrib, 0);
    }
  }

}

/***/ }),
/* 10 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ War3MapW3e)
/* harmony export */ });
/* harmony import */ var _common_binarystream__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(11);
/* harmony import */ var _corner__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(16);


/**
 * war3map.w3e - the environment file.
 */

class War3MapW3e {
  version = 0;
  tileset = 'A';
  haveCustomTileset = 0;
  /**
   * 地面贴图组
   */

  groundTilesets = [];
  /**
   * 悬崖贴图
   */

  cliffTilesets = [];
  mapSize = new Int32Array(2);
  centerOffset = new Float32Array(2);
  corners = [];

  load(buffer) {
    const stream = new _common_binarystream__WEBPACK_IMPORTED_MODULE_0__.default(buffer);

    if (stream.readBinary(4) !== 'W3E!') {
      return;
    }

    this.version = stream.readInt32();
    this.tileset = stream.readBinary(1);
    this.haveCustomTileset = stream.readInt32();

    for (let i = 0, l = stream.readInt32(); i < l; i++) {
      this.groundTilesets[i] = stream.readBinary(4);
    }

    for (let i = 0, l = stream.readInt32(); i < l; i++) {
      this.cliffTilesets[i] = stream.readBinary(4);
    }

    stream.readInt32Array(this.mapSize);
    stream.readFloat32Array(this.centerOffset);

    for (let row = 0, rows = this.mapSize[1]; row < rows; row++) {
      this.corners[row] = [];

      for (let column = 0, columns = this.mapSize[0]; column < columns; column++) {
        const corner = new _corner__WEBPACK_IMPORTED_MODULE_1__.default();
        corner.load(stream);
        this.corners[row][column] = corner;
      }
    }
  }

  save() {
    const stream = new _common_binarystream__WEBPACK_IMPORTED_MODULE_0__.default(new ArrayBuffer(this.getByteLength()));
    stream.writeBinary('W3E!');
    stream.writeInt32(this.version);
    stream.writeBinary(this.tileset);
    stream.writeInt32(this.haveCustomTileset);
    stream.writeUint32(this.groundTilesets.length);

    for (const groundTileset of this.groundTilesets) {
      stream.writeBinary(groundTileset);
    }

    stream.writeUint32(this.cliffTilesets.length);

    for (const cliffTileset of this.cliffTilesets) {
      stream.writeBinary(cliffTileset);
    }

    stream.writeInt32Array(this.mapSize);
    stream.writeFloat32Array(this.centerOffset);

    for (const row of this.corners) {
      for (const corner of row) {
        corner.save(stream);
      }
    }

    return stream.uint8array;
  }

  getByteLength() {
    return 37 + this.groundTilesets.length * 4 + this.cliffTilesets.length * 4 + this.mapSize[0] * this.mapSize[1] * 7;
  }
  /**
   * Is the tile at the given column and row water?
   */


  isWater(column, row) {
    const corners = this.corners;
    return corners[row][column].water || corners[row][column + 1].water || corners[row + 1][column].water || corners[row + 1][column + 1].water;
  }
  /**
   * Is the corner at the given column and row a cliff?
   */


  isCliff(column, row) {
    const [columns, rows] = this.mapSize;

    if (column < 1 || column > columns - 2 || row < 1 || row > rows - 2) {
      return false;
    }

    const corners = this.corners;
    const bottomLeft = corners[row][column].layerHeight;
    const bottomRight = corners[row][column + 1].layerHeight;
    const topLeft = corners[row + 1][column].layerHeight;
    const topRight = corners[row + 1][column + 1].layerHeight;
    return bottomLeft !== bottomRight || bottomLeft !== topLeft || bottomLeft !== topRight;
  }
  /**
   * Get the ground texture of a corner, whether it's normal ground, a cliff, or a blighted corner.
   */


  cornerTexture(column, row, tilesets, cliffTilesets) {
    const corners = this.corners;
    const columns = this.mapSize[0] - 1;
    const rows = this.mapSize[1] - 1;

    for (let y = -1; y < 1; y++) {
      for (let x = -1; x < 1; x++) {
        if (column + x > 0 && column + x < columns - 1 && row + y > 0 && row + y < rows - 1) {
          if (this.isCliff(column + x, row + y)) {
            let texture = corners[row + y][column + x].cliffTexture;

            if (texture === 15) {
              texture = 1;
            }

            return this.cliffGroundIndex(texture, tilesets, cliffTilesets);
          }
        }
      }
    }

    const corner = corners[row][column]; // Is this corner blighted?
    // if (corner.blight) {
    //   return this.blightTextureIndex;
    // }

    return corner.groundTexture;
  }
  /**
   * Given a cliff index, get its ground texture index.
   * This is an index into the tilset textures.
   */


  cliffGroundIndex(whichCliff, tilesets, cliffTilesets) {
    const whichTileset = cliffTilesets[whichCliff].string('groundTile');

    for (let i = 0, l = tilesets.length; i < l; i++) {
      if (tilesets[i].string('tileID') === whichTileset) {
        return i;
      }
    }

    return 0;
  }

}

/***/ }),
/* 11 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ BinaryStream)
/* harmony export */ });
/* harmony import */ var _bytesof__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12);
/* harmony import */ var _searches__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(14);
/* harmony import */ var _typecast__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(15);
/* harmony import */ var _utf8__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(13);



 // Memory for all of the xxxToUint type casts.

const uint8 = new Uint8Array(8);
/**
 * A binary stream.
 */

class BinaryStream {
  index = 0;

  constructor(buffer, byteOffset, byteLength) {
    const bytes = (0,_bytesof__WEBPACK_IMPORTED_MODULE_0__.bytesOf)(buffer); // For browsers not supporting the spec.
    // Once upon a time I reported this issue on the Firefox tracker.
    // Seems like Safari needs an issue report too.

    byteOffset = byteOffset || 0;
    byteLength = byteLength || bytes.length;
    this.buffer = buffer;
    this.uint8array = bytes.subarray(byteOffset, byteOffset + byteLength);
    this.byteLength = byteLength;
    this.remaining = byteLength;
  }
  /**
   * Create a subreader of this reader, at its position, with the given byte length.
   */


  substream(byteLength) {
    if (this.remaining < byteLength) {
      throw new Error(`ByteStream: substream: want ${byteLength} bytes but have ${this.remaining}`);
    }

    const index = this.index;
    this.index += byteLength;
    return new BinaryStream(this.uint8array.subarray(index, index + byteLength));
  }
  /**
   * Skip a number of bytes.
   */


  skip(bytes) {
    if (this.remaining < bytes) {
      throw new Error(`ByteStream: skip: premature end - want ${bytes} bytes but have ${this.remaining}`);
    }

    this.index += bytes;
    this.remaining -= bytes;
  }
  /**
   * Set the reader's index.
   */


  seek(index) {
    this.index = index;
    this.remaining = this.byteLength - index;
  }
  /**
   * Read a UTF8 string with the given number of bytes.
   * 
   * The entire size will be read, however the string returned is NULL terminated in its memory block.
   * 
   * For example, the MDX format has many strings that have a constant maximum size, where any bytes after the string are NULLs.
   * Such strings will be loaded correctly given the maximum size.
   */


  read(bytes) {
    if (this.remaining < bytes) {
      throw new Error(`ByteStream: read: premature end - want ${bytes} bytes but have ${this.remaining}`);
    }

    const uint8array = this.uint8array;
    const start = this.index;
    let end = (0,_searches__WEBPACK_IMPORTED_MODULE_1__.boundIndexOf)(uint8array, 0, start, bytes);

    if (end === -1) {
      end = start + bytes;
    }

    this.index += bytes;
    this.remaining -= bytes;
    return (0,_utf8__WEBPACK_IMPORTED_MODULE_3__.decodeUtf8)(uint8array.subarray(start, end));
  }
  /**
   * Read a UTF8 NULL terminated string.
   */


  readNull() {
    if (this.remaining < 1) {
      throw new Error(`ByteStream: readNull: premature end - want at least 1 byte but have 0`);
    }

    const uint8array = this.uint8array;
    const start = this.index;
    let end = uint8array.indexOf(0, start);

    if (end === -1) {
      end = uint8array.length - 1;
    }

    const bytes = end - start + 1;
    this.index += bytes;
    this.remaining -= bytes;
    return (0,_utf8__WEBPACK_IMPORTED_MODULE_3__.decodeUtf8)(uint8array.subarray(start, end));
  }
  /**
   * Read a binary string with the given number of bytes.
   */


  readBinary(bytes) {
    if (this.remaining < bytes) {
      throw new Error(`ByteStream: readBinary: premature end - want ${bytes} bytes but have ${this.remaining}`);
    }

    const uint8array = this.uint8array;
    const index = this.index;
    let data = '';

    for (let i = 0; i < bytes; i++) {
      data += String.fromCharCode(uint8array[index + i]);
    }

    this.index += bytes;
    this.remaining -= bytes;
    return data;
  }
  /**
   * Read a 8 bit signed integer.
   */


  readInt8() {
    if (this.remaining < 1) {
      throw new Error(`ByteStream: readInt8: premature end - want 1 byte but have ${this.remaining}`);
    }

    const index = this.index;
    const uint8array = this.uint8array;
    const data = (0,_typecast__WEBPACK_IMPORTED_MODULE_2__.uint8ToInt8)(uint8array[index]);
    this.index += 1;
    this.remaining -= 1;
    return data;
  }
  /**
   * Read a 16 bit signed integer.
   */


  readInt16() {
    if (this.remaining < 2) {
      throw new Error(`ByteStream: readInt16: premature end - want 2 bytes but have ${this.remaining}`);
    }

    const index = this.index;
    const uint8array = this.uint8array;
    const data = (0,_typecast__WEBPACK_IMPORTED_MODULE_2__.uint8ToInt16)(uint8array[index], uint8array[index + 1]);
    this.index += 2;
    this.remaining -= 2;
    return data;
  }
  /**
   * Read a 32 bit signed integer.
   */


  readInt32() {
    if (this.remaining < 4) {
      throw new Error(`ByteStream: readInt32: premature end - want 4 bytes but have ${this.remaining}`);
    }

    const index = this.index;
    const uint8array = this.uint8array;
    const data = (0,_typecast__WEBPACK_IMPORTED_MODULE_2__.uint8ToInt32)(uint8array[index], uint8array[index + 1], uint8array[index + 2], uint8array[index + 3]);
    this.index += 4;
    this.remaining -= 4;
    return data;
  }
  /**
   * Read a 8 bit unsigned integer.
   */


  readUint8() {
    if (this.remaining < 1) {
      throw new Error(`ByteStream: readUint8: premature end - want 1 byte but have ${this.remaining}`);
    }

    const data = this.uint8array[this.index];
    this.index += 1;
    this.remaining -= 1;
    return data;
  }
  /**
   * Read a 16 bit unsigned integer.
   */


  readUint16() {
    if (this.remaining < 2) {
      throw new Error(`ByteStream: readUint16: premature end - want 2 bytes but have ${this.remaining}`);
    }

    const index = this.index;
    const uint8array = this.uint8array;
    const data = (0,_typecast__WEBPACK_IMPORTED_MODULE_2__.uint8ToUint16)(uint8array[index], uint8array[index + 1]);
    this.index += 2;
    this.remaining -= 2;
    return data;
  }
  /**
   * Read a 32 bit unsigned integer.
   */


  readUint32() {
    if (this.remaining < 4) {
      throw new Error(`ByteStream: readUint32: premature end - want 4 bytes but have ${this.remaining}`);
    }

    const index = this.index;
    const uint8array = this.uint8array;
    const data = (0,_typecast__WEBPACK_IMPORTED_MODULE_2__.uint8ToUint32)(uint8array[index], uint8array[index + 1], uint8array[index + 2], uint8array[index + 3]);
    this.index += 4;
    this.remaining -= 4;
    return data;
  }
  /**
   * Read a 32 bit float.
   */


  readFloat32() {
    if (this.remaining < 4) {
      throw new Error(`ByteStream: readFloat32: premature end - want 4 bytes but have ${this.remaining}`);
    }

    const index = this.index;
    const uint8array = this.uint8array;
    const data = (0,_typecast__WEBPACK_IMPORTED_MODULE_2__.uint8ToFloat32)(uint8array[index], uint8array[index + 1], uint8array[index + 2], uint8array[index + 3]);
    this.index += 4;
    this.remaining -= 4;
    return data;
  }
  /**
   * Read a 64 bit float.
   */


  readFloat64() {
    if (this.remaining < 8) {
      throw new Error(`ByteStream: readFloat64: premature end - want 8 bytes but have ${this.remaining}`);
    }

    const index = this.index;
    const uint8array = this.uint8array;
    const data = (0,_typecast__WEBPACK_IMPORTED_MODULE_2__.uint8ToFloat64)(uint8array[index], uint8array[index + 1], uint8array[index + 2], uint8array[index + 3], uint8array[index + 4], uint8array[index + 5], uint8array[index + 6], uint8array[index + 7]);
    this.index += 8;
    this.remaining -= 8;
    return data;
  }
  /**
   * Read an array of 8 bit signed integers.
   */


  readInt8Array(view) {
    if (!ArrayBuffer.isView(view)) {
      view = new Int8Array(view);
    }

    if (this.remaining < view.byteLength) {
      throw new Error(`ByteStream: readInt8Array: premature end - want ${view.byteLength} bytes but have ${this.remaining}`);
    }

    const index = this.index;
    const uint8array = this.uint8array;

    for (let i = 0, l = view.length; i < l; i++) {
      view[i] = (0,_typecast__WEBPACK_IMPORTED_MODULE_2__.uint8ToInt8)(uint8array[index + i]);
    }

    this.index += view.byteLength;
    this.remaining -= view.byteLength;
    return view;
  }
  /**
   * Read an array of 16 bit signed integers.
   */


  readInt16Array(view) {
    if (!ArrayBuffer.isView(view)) {
      view = new Int16Array(view);
    }

    if (this.remaining < view.byteLength) {
      throw new Error(`ByteStream: readInt16Array: premature end - want ${view.byteLength} bytes but have ${this.remaining}`);
    }

    const index = this.index;
    const uint8array = this.uint8array;

    for (let i = 0, l = view.length; i < l; i++) {
      const offset = index + i * 2;
      view[i] = (0,_typecast__WEBPACK_IMPORTED_MODULE_2__.uint8ToInt16)(uint8array[offset], uint8array[offset + 1]);
    }

    this.index += view.byteLength;
    this.remaining -= view.byteLength;
    return view;
  }
  /**
   * Read an array of 32 bit signed integers.
   */


  readInt32Array(view) {
    if (!ArrayBuffer.isView(view)) {
      view = new Int32Array(view);
    }

    if (this.remaining < view.byteLength) {
      throw new Error(`ByteStream: readInt32Array: premature end - want ${view.byteLength} bytes but have ${this.remaining}`);
    }

    const index = this.index;
    const uint8array = this.uint8array;

    for (let i = 0, l = view.length; i < l; i++) {
      const offset = index + i * 4;
      view[i] = (0,_typecast__WEBPACK_IMPORTED_MODULE_2__.uint8ToInt32)(uint8array[offset], uint8array[offset + 1], uint8array[offset + 2], uint8array[offset + 3]);
    }

    this.index += view.byteLength;
    this.remaining -= view.byteLength;
    return view;
  }
  /**
   * Read an array of 8 bit unsigned integers.
   */


  readUint8Array(view) {
    if (!ArrayBuffer.isView(view)) {
      view = new Uint8Array(view);
    }

    if (this.remaining < view.byteLength) {
      throw new Error(`ByteStream: readUint8Array: premature end - want ${view.byteLength} bytes but have ${this.remaining}`);
    }

    const index = this.index;
    const uint8array = this.uint8array;

    for (let i = 0, l = view.length; i < l; i++) {
      view[i] = uint8array[index + i];
    }

    this.index += view.byteLength;
    this.remaining -= view.byteLength;
    return view;
  }
  /**
   * Read an array of 16 bit unsigned integers.
   */


  readUint16Array(view) {
    if (!ArrayBuffer.isView(view)) {
      view = new Uint16Array(view);
    }

    if (this.remaining < view.byteLength) {
      throw new Error(`ByteStream: readUint16Array: premature end - want ${view.byteLength} bytes but have ${this.remaining}`);
    }

    const index = this.index;
    const uint8array = this.uint8array;

    for (let i = 0, l = view.length; i < l; i++) {
      const offset = index + i * 2;
      view[i] = (0,_typecast__WEBPACK_IMPORTED_MODULE_2__.uint8ToUint16)(uint8array[offset], uint8array[offset + 1]);
    }

    this.index += view.byteLength;
    this.remaining -= view.byteLength;
    return view;
  }
  /**
   * Read an array of 32 bit unsigned integers.
   */


  readUint32Array(view) {
    if (!ArrayBuffer.isView(view)) {
      view = new Uint32Array(view);
    }

    if (this.remaining < view.byteLength) {
      throw new Error(`ByteStream: readUint32Array: premature end - want ${view.byteLength} bytes but have ${this.remaining}`);
    }

    const index = this.index;
    const uint8array = this.uint8array;

    for (let i = 0, l = view.length; i < l; i++) {
      const offset = index + i * 4;
      view[i] = (0,_typecast__WEBPACK_IMPORTED_MODULE_2__.uint8ToUint32)(uint8array[offset], uint8array[offset + 1], uint8array[offset + 2], uint8array[offset + 3]);
    }

    this.index += view.byteLength;
    this.remaining -= view.byteLength;
    return view;
  }
  /**
   * Read an array of 32 bit floats.
   */


  readFloat32Array(view) {
    if (!ArrayBuffer.isView(view)) {
      view = new Float32Array(view);
    }

    if (this.remaining < view.byteLength) {
      throw new Error(`ByteStream: readFloat32Array: premature end - want ${view.byteLength} bytes but have ${this.remaining}`);
    }

    const index = this.index;
    const uint8array = this.uint8array;

    for (let i = 0, l = view.length; i < l; i++) {
      const offset = index + i * 4;
      view[i] = (0,_typecast__WEBPACK_IMPORTED_MODULE_2__.uint8ToFloat32)(uint8array[offset], uint8array[offset + 1], uint8array[offset + 2], uint8array[offset + 3]);
    }

    this.index += view.byteLength;
    this.remaining -= view.byteLength;
    return view;
  }
  /**
   * Read an array of 64 bit floats.
   */


  readFloat64Array(view) {
    if (!ArrayBuffer.isView(view)) {
      view = new Float64Array(view);
    }

    if (this.remaining < view.byteLength) {
      throw new Error(`ByteStream: readFloat64Array: premature end - want ${view.byteLength} bytes but have ${this.remaining}`);
    }

    const index = this.index;
    const uint8array = this.uint8array;

    for (let i = 0, l = view.length; i < l; i++) {
      const offset = index + i * 8;
      view[i] = (0,_typecast__WEBPACK_IMPORTED_MODULE_2__.uint8ToFloat64)(uint8array[offset], uint8array[offset + 1], uint8array[offset + 2], uint8array[offset + 3], uint8array[offset + 4], uint8array[offset + 5], uint8array[offset + 6], uint8array[offset + 7]);
    }

    this.index += view.byteLength;
    this.remaining -= view.byteLength;
    return view;
  }
  /**
   * Write a UTF8 string.
   * 
   * Returns the number of bytes that were written,
   */


  write(utf8) {
    const bytes = (0,_utf8__WEBPACK_IMPORTED_MODULE_3__.encodeUtf8)(utf8);
    this.writeUint8Array(bytes);
    return bytes.length;
  }
  /**
   * Write a UTF8 string as a NULL terminated string.
   * 
   * Returns the number of bytes that were written, including the terminating NULL.
   */


  writeNull(utf8) {
    const bytes = this.write(utf8);
    this.index++;
    this.remaining--;
    return bytes + 1;
  }
  /**
   * Write a binary string.
   */


  writeBinary(value) {
    const index = this.index;
    const uint8array = this.uint8array;
    const count = value.length;

    for (let i = 0; i < count; i++) {
      uint8array[index + i] = value.charCodeAt(i);
    }

    this.index += count;
  }
  /**
   * Write a 8 bit signed integer.
   */


  writeInt8(value) {
    this.uint8array[this.index] = (0,_typecast__WEBPACK_IMPORTED_MODULE_2__.int8ToUint8)(value);
    this.index += 1;
  }
  /**
   * Write a 16 bit signed integer.
   */


  writeInt16(value) {
    const index = this.index;
    const uint8array = this.uint8array;
    (0,_typecast__WEBPACK_IMPORTED_MODULE_2__.int16ToUint8)(uint8, value);
    uint8array[index] = uint8[0];
    uint8array[index + 1] = uint8[1];
    this.index += 2;
  }
  /**
   * Write a 32 bit signed integer.
   */


  writeInt32(value) {
    const index = this.index;
    const uint8array = this.uint8array;
    (0,_typecast__WEBPACK_IMPORTED_MODULE_2__.int32ToUint8)(uint8, value);
    uint8array[index] = uint8[0];
    uint8array[index + 1] = uint8[1];
    uint8array[index + 2] = uint8[2];
    uint8array[index + 3] = uint8[3];
    this.index += 4;
  }
  /**
   * Write a 8 bit unsigned integer.
   */


  writeUint8(value) {
    this.uint8array[this.index] = value;
    this.index += 1;
  }
  /**
   * Write a 16 bit unsigned integer.
   */


  writeUint16(value) {
    const index = this.index;
    const uint8array = this.uint8array;
    (0,_typecast__WEBPACK_IMPORTED_MODULE_2__.uint16ToUint8)(uint8, value);
    uint8array[index] = uint8[0];
    uint8array[index + 1] = uint8[1];
    this.index += 2;
  }
  /**
   * Write a 32 bit unsigned integer.
   */


  writeUint32(value) {
    const index = this.index;
    const uint8array = this.uint8array;
    (0,_typecast__WEBPACK_IMPORTED_MODULE_2__.uint32ToUint8)(uint8, value);
    uint8array[index] = uint8[0];
    uint8array[index + 1] = uint8[1];
    uint8array[index + 2] = uint8[2];
    uint8array[index + 3] = uint8[3];
    this.index += 4;
  }
  /**
   * Write a 32 bit float.
   */


  writeFloat32(value) {
    const index = this.index;
    const uint8array = this.uint8array;
    (0,_typecast__WEBPACK_IMPORTED_MODULE_2__.float32ToUint8)(uint8, value);
    uint8array[index] = uint8[0];
    uint8array[index + 1] = uint8[1];
    uint8array[index + 2] = uint8[2];
    uint8array[index + 3] = uint8[3];
    this.index += 4;
  }
  /**
   * Write a 64 bit float.
   */


  writeFloat64(value) {
    const index = this.index;
    const uint8array = this.uint8array;
    (0,_typecast__WEBPACK_IMPORTED_MODULE_2__.float64ToUint8)(uint8, value);
    uint8array[index] = uint8[0];
    uint8array[index + 1] = uint8[1];
    uint8array[index + 2] = uint8[2];
    uint8array[index + 3] = uint8[3];
    uint8array[index + 4] = uint8[4];
    uint8array[index + 5] = uint8[5];
    uint8array[index + 6] = uint8[6];
    uint8array[index + 7] = uint8[7];
    this.index += 8;
  }
  /**
   * Write an array of 8 bit signed integers.
   */


  writeInt8Array(view) {
    const index = this.index;
    const uint8array = this.uint8array;

    for (let i = 0, l = view.length; i < l; i++) {
      uint8array[index + i] = (0,_typecast__WEBPACK_IMPORTED_MODULE_2__.int8ToUint8)(view[i]);
    }

    this.index += view.byteLength;
  }
  /**
   * Write an array of 16 bit signed integers.
   */


  writeInt16Array(view) {
    const index = this.index;
    const uint8array = this.uint8array;

    for (let i = 0, l = view.length; i < l; i++) {
      const offset = index + i * 2;
      (0,_typecast__WEBPACK_IMPORTED_MODULE_2__.int16ToUint8)(uint8, view[i]);
      uint8array[offset] = uint8[0];
      uint8array[offset + 1] = uint8[1];
    }

    this.index += view.byteLength;
  }
  /**
   * Write an array of 32 bit signed integers.
   */


  writeInt32Array(view) {
    const index = this.index;
    const uint8array = this.uint8array;

    for (let i = 0, l = view.length; i < l; i++) {
      const offset = index + i * 4;
      (0,_typecast__WEBPACK_IMPORTED_MODULE_2__.int32ToUint8)(uint8, view[i]);
      uint8array[offset] = uint8[0];
      uint8array[offset + 1] = uint8[1];
      uint8array[offset + 2] = uint8[2];
      uint8array[offset + 3] = uint8[3];
    }

    this.index += view.byteLength;
  }
  /**
   * Write an array of 8 bit unsigned integers.
   */


  writeUint8Array(view) {
    const index = this.index;
    const uint8array = this.uint8array;

    for (let i = 0, l = view.length; i < l; i++) {
      uint8array[index + i] = view[i];
    }

    this.index += view.byteLength;
  }
  /**
   * Write an array of 16 bit unsigned integers.
   */


  writeUint16Array(view) {
    const index = this.index;
    const uint8array = this.uint8array;

    for (let i = 0, l = view.length; i < l; i++) {
      const offset = index + i * 2;
      (0,_typecast__WEBPACK_IMPORTED_MODULE_2__.uint16ToUint8)(uint8, view[i]);
      uint8array[offset] = uint8[0];
      uint8array[offset + 1] = uint8[1];
    }

    this.index += view.byteLength;
  }
  /**
   * Write an array of 32 bit unsigned integers.
   */


  writeUint32Array(view) {
    const index = this.index;
    const uint8array = this.uint8array;

    for (let i = 0, l = view.length; i < l; i++) {
      const offset = index + i * 4;
      (0,_typecast__WEBPACK_IMPORTED_MODULE_2__.uint32ToUint8)(uint8, view[i]);
      uint8array[offset] = uint8[0];
      uint8array[offset + 1] = uint8[1];
      uint8array[offset + 2] = uint8[2];
      uint8array[offset + 3] = uint8[3];
    }

    this.index += view.byteLength;
  }
  /**
   * Write an array of 32 bit floats.
   */


  writeFloat32Array(view) {
    const index = this.index;
    const uint8array = this.uint8array;

    for (let i = 0, l = view.length; i < l; i++) {
      const offset = index + i * 4;
      (0,_typecast__WEBPACK_IMPORTED_MODULE_2__.float32ToUint8)(uint8, view[i]);
      uint8array[offset] = uint8[0];
      uint8array[offset + 1] = uint8[1];
      uint8array[offset + 2] = uint8[2];
      uint8array[offset + 3] = uint8[3];
    }

    this.index += view.byteLength;
  }
  /**
   * Write an array of 64 bit floats.
   */


  writeFloat64Array(view) {
    const index = this.index;
    const uint8array = this.uint8array;

    for (let i = 0, l = view.length; i < l; i++) {
      const offset = index + i * 8;
      (0,_typecast__WEBPACK_IMPORTED_MODULE_2__.float64ToUint8)(uint8, view[i]);
      uint8array[offset] = uint8[0];
      uint8array[offset + 1] = uint8[1];
      uint8array[offset + 2] = uint8[2];
      uint8array[offset + 3] = uint8[3];
      uint8array[offset + 4] = uint8[4];
      uint8array[offset + 5] = uint8[5];
      uint8array[offset + 6] = uint8[6];
      uint8array[offset + 7] = uint8[7];
    }

    this.index += view.byteLength;
  }

}

/***/ }),
/* 12 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "bytesOf": () => (/* binding */ bytesOf)
/* harmony export */ });
/* harmony import */ var _utf8__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(13);

/**
 * Return the given buffer as a Uint8Array.
 * 
 * Strings are encoded as UTF8.
 */

function bytesOf(buffer) {
  if (buffer instanceof Uint8Array) {
    return buffer;
  } else if (typeof buffer === 'string') {
    return (0,_utf8__WEBPACK_IMPORTED_MODULE_0__.encodeUtf8)(buffer);
  } else {
    return new Uint8Array(buffer);
  }
}

/***/ }),
/* 13 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "decodeUtf8": () => (/* binding */ decodeUtf8),
/* harmony export */   "encodeUtf8": () => (/* binding */ encodeUtf8),
/* harmony export */   "byteLengthUtf8": () => (/* binding */ byteLengthUtf8),
/* harmony export */   "splitUtf8ByteLength": () => (/* binding */ splitUtf8ByteLength)
/* harmony export */ });
const decoder = new TextDecoder();
const encoder = new TextEncoder();
/**
 * Decode bytes as a UTF8 string.
 */

function decodeUtf8(buffer) {
  return decoder.decode(buffer);
}
/**
 * Encode a UTF8 string to bytes.
 */

function encodeUtf8(utf8) {
  return encoder.encode(utf8);
}
/**
 * Get the byte length of a UTF8 string.
 * 
 * @see https://stackoverflow.com/a/23329386
 */

function byteLengthUtf8(str) {
  // returns the byte length of an utf8 string
  let s = str.length;

  for (let i = str.length - 1; i >= 0; i--) {
    const code = str.charCodeAt(i);
    if (code > 0x7f && code <= 0x7ff) s++;else if (code > 0x7ff && code <= 0xffff) s += 2;
    if (code >= 0xDC00 && code <= 0xDFFF) i--; //trail surrogate
  }

  return s;
}
/**
 * Splits the given string into an array of strings.
 * 
 * Each string will have a byte length smaller or equal to chunkBytelength when encoded as UTF8.
 * 
 * @see https://stackoverflow.com/a/18729931
 */

function splitUtf8ByteLength(str, chunkBytelength) {
  const chunks = [];
  let pos = 0;
  let bytes = 0;

  for (let i = 0, l = str.length; i < l; i++) {
    const code = str.charCodeAt(i);

    if (code < 0x80) {
      bytes += 1;
    } else if (code < 0x800) {
      bytes += 2;
    } else if (code < 0xd800 || code >= 0xe000) {
      bytes += 3;
    } else {
      i++;
      bytes += 4;
    }

    if (bytes >= chunkBytelength - 3) {
      chunks.push(str.substr(pos, i));
      pos += i;
      bytes = 0;
    }
  }

  if (bytes > 0) {
    chunks.push(str.substr(pos));
  }

  return chunks;
}

/***/ }),
/* 14 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "isStringInBytes": () => (/* binding */ isStringInBytes),
/* harmony export */   "isStringInString": () => (/* binding */ isStringInString),
/* harmony export */   "boundIndexOf": () => (/* binding */ boundIndexOf)
/* harmony export */ });
function isStringInBytes(buffer, target, offset = 0, length = Infinity) {
  const start = Math.max(offset, 0);
  const end = Math.min(start + length, buffer.length);
  let whichByte = 0;
  let targetByte = target.charCodeAt(0);

  for (let i = start; i < end; i++) {
    const byte = buffer[i];

    if (byte === targetByte) {
      whichByte += 1;

      if (whichByte === target.length) {
        return true;
      }

      targetByte = target.charCodeAt(whichByte);
    } else if (whichByte > 0) {
      whichByte = 0;
      targetByte = target.charCodeAt(0);
    }
  }

  return false;
}
function isStringInString(buffer, target, offset = 0, length = Infinity) {
  const start = Math.max(offset, 0);
  const end = Math.min(start + length, buffer.length);
  let whichByte = 0;
  let targetByte = target[0];

  for (let i = start; i < end; i++) {
    const byte = buffer[i];

    if (byte === targetByte) {
      whichByte += 1;

      if (whichByte === target.length) {
        return true;
      }

      targetByte = target[whichByte];
    } else if (whichByte > 0) {
      whichByte = 0;
      targetByte = target[0];
    }
  }

  return false;
}
function boundIndexOf(buffer, target, offset = 0, length = Infinity) {
  const start = Math.max(offset, 0);
  const end = Math.min(start + length, buffer.length);

  for (let i = start; i < end; i++) {
    if (buffer[i] === target) {
      return i;
    }
  }

  return -1;
}

/***/ }),
/* 15 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "uint8ToInt8": () => (/* binding */ uint8ToInt8),
/* harmony export */   "uint8ToInt16": () => (/* binding */ uint8ToInt16),
/* harmony export */   "uint8ToInt24": () => (/* binding */ uint8ToInt24),
/* harmony export */   "uint8ToInt32": () => (/* binding */ uint8ToInt32),
/* harmony export */   "uint8ToUint16": () => (/* binding */ uint8ToUint16),
/* harmony export */   "uint8ToUint24": () => (/* binding */ uint8ToUint24),
/* harmony export */   "uint8ToUint32": () => (/* binding */ uint8ToUint32),
/* harmony export */   "uint8ToFloat32": () => (/* binding */ uint8ToFloat32),
/* harmony export */   "uint8ToFloat64": () => (/* binding */ uint8ToFloat64),
/* harmony export */   "int8ToUint8": () => (/* binding */ int8ToUint8),
/* harmony export */   "int16ToUint8": () => (/* binding */ int16ToUint8),
/* harmony export */   "int24ToUint8": () => (/* binding */ int24ToUint8),
/* harmony export */   "int32ToUint8": () => (/* binding */ int32ToUint8),
/* harmony export */   "uint16ToUint8": () => (/* binding */ uint16ToUint8),
/* harmony export */   "uint24ToUint8": () => (/* binding */ uint24ToUint8),
/* harmony export */   "uint32ToUint8": () => (/* binding */ uint32ToUint8),
/* harmony export */   "float32ToUint8": () => (/* binding */ float32ToUint8),
/* harmony export */   "float64ToUint8": () => (/* binding */ float64ToUint8),
/* harmony export */   "numberToUint32": () => (/* binding */ numberToUint32),
/* harmony export */   "stringToBase256": () => (/* binding */ stringToBase256),
/* harmony export */   "base256ToString": () => (/* binding */ base256ToString)
/* harmony export */ });
const buffer = new ArrayBuffer(8);
const int8 = new Int8Array(buffer);
const int16 = new Int16Array(buffer);
const int32 = new Int32Array(buffer);
const uint8 = new Uint8Array(buffer);
const uint16 = new Uint16Array(buffer);
const uint32 = new Uint32Array(buffer);
const float32 = new Float32Array(buffer);
const float64 = new Float64Array(buffer);
/**
 * Typecast a 8 bit unsigned integer to a 8 bits signed integer.
 */

function uint8ToInt8(a) {
  uint8[0] = a;
  return int8[0];
}
/**
 * Typecast two 8 bit unsigned integers to a 16 bits signed integer.
 */

function uint8ToInt16(a, b) {
  uint8[0] = a;
  uint8[1] = b;
  return int16[0];
}
/**
 * Typecast three 8 bit unsigned integers to a 24 bits signed integer.
 */

function uint8ToInt24(a, b, c) {
  uint8[0] = a;
  uint8[1] = b;
  uint8[2] = c;
  uint8[3] = 0;
  return int32[0];
}
/**
 * Typecast four 8 bit unsigned integers to a 32 bits signed integer.
 */

function uint8ToInt32(a, b, c, d) {
  uint8[0] = a;
  uint8[1] = b;
  uint8[2] = c;
  uint8[3] = d;
  return int32[0];
}
/**
 * Typecast two 8 bit unsigned integers to a 16 bits unsigned integer.
 */

function uint8ToUint16(a, b) {
  uint8[0] = a;
  uint8[1] = b;
  return uint16[0];
}
/**
 * Typecast three 8 bit unsigned integers to a 24 bits unsigned integer.
 */

function uint8ToUint24(a, b, c) {
  uint8[0] = a;
  uint8[1] = b;
  uint8[2] = c;
  uint8[3] = 0;
  return uint32[0];
}
/**
 * Typecast four 8 bit unsigned integers to a 32 bits unsigned integer.
 */

function uint8ToUint32(a, b, c, d) {
  uint8[0] = a;
  uint8[1] = b;
  uint8[2] = c;
  uint8[3] = d;
  return uint32[0];
}
/**
 * Typecast four 8 bit unsigned integers to a 32 bits IEEE float.
 */

function uint8ToFloat32(a, b, c, d) {
  uint8[0] = a;
  uint8[1] = b;
  uint8[2] = c;
  uint8[3] = d;
  return float32[0];
}
/**
 * Typecast eight 8 bit unsigned integers to a 64 bits IEEE float.
 */

function uint8ToFloat64(a, b, c, d, e, f, g, h) {
  uint8[0] = a;
  uint8[1] = b;
  uint8[2] = c;
  uint8[3] = d;
  uint8[4] = e;
  uint8[5] = f;
  uint8[6] = g;
  uint8[7] = h;
  return float64[0];
}
/**
 * Typecast a 8 bit signed integer to a 8 bit unsigned integer.
 */

function int8ToUint8(a) {
  uint8[0] = a;
  return int8[0];
}
/**
 * Typecast a 16 bit signed integer to two 8 bit unsigned integers.
 * 
 * The result is stored in out.
 */

function int16ToUint8(out, a) {
  int16[0] = a;
  out[0] = uint8[0];
  out[1] = uint8[1];
  return out;
}
/**
 * Typecast a 24 bit signed integer to three 8 bit unsigned integers.
 * 
 * The result is stored in out.
 */

function int24ToUint8(out, a) {
  int32[0] = a;
  out[0] = uint8[0];
  out[1] = uint8[1];
  out[2] = uint8[2];
  return out;
}
/**
 * Typecast a 32 bit signed integer to four 8 bit unsigned integers.
 * 
 * The result is stored in out.
 */

function int32ToUint8(out, a) {
  int32[0] = a;
  out[0] = uint8[0];
  out[1] = uint8[1];
  out[2] = uint8[2];
  out[3] = uint8[3];
  return out;
}
/**
 * Typecast a 16 bit unsigned integer to two 8 bit unsigned integers.
 * 
 * The result is stored in out.
 */

function uint16ToUint8(out, a) {
  uint16[0] = a;
  out[0] = uint8[0];
  out[1] = uint8[1];
  return out;
}
/**
 * Typecast a 24 bit unsigned integer to three 8 bit unsigned integers.
 * 
 * The result is stored in out.
 */

function uint24ToUint8(out, a) {
  uint32[0] = a;
  out[0] = uint8[0];
  out[1] = uint8[1];
  out[2] = uint8[2];
  return out;
}
/**
 * Typecast a 32 bit unsigned integer to four 8 bit unsigned integers.
 * 
 * The result is stored in out.
 */

function uint32ToUint8(out, a) {
  uint32[0] = a;
  out[0] = uint8[0];
  out[1] = uint8[1];
  out[2] = uint8[2];
  out[3] = uint8[3];
  return out;
}
/**
 * Typecast a 32 bit IEEE float to four 8 bit unsigned integers.
 * 
 * The result is stored in out.
 */

function float32ToUint8(out, a) {
  float32[0] = a;
  out[0] = uint8[0];
  out[1] = uint8[1];
  out[2] = uint8[2];
  out[3] = uint8[3];
  return out;
}
/**
 * Typecast a 64 bit IEEE float to eight 8 bit unsigned integers.
 * 
 * The result is stored in out.
 */

function float64ToUint8(out, a) {
  float64[0] = a;
  out[0] = uint8[0];
  out[1] = uint8[1];
  out[2] = uint8[2];
  out[3] = uint8[3];
  out[4] = uint8[4];
  out[5] = uint8[5];
  out[6] = uint8[6];
  out[7] = uint8[7];
  return out;
}
/**
 * Typecast a normal JavaScript number to a 32 bits unsigned integer.
 */

function numberToUint32(number) {
  uint32[0] = number;
  return uint32[0];
}
/**
 * Interperts a string as a base 256 number.
 */

function stringToBase256(string) {
  let number = 0;

  for (const c of string) {
    number = number * 256 + c.charCodeAt(0);
  }

  return number;
}
/**
 * Interperts a number as a base 256 string.
 */

function base256ToString(number) {
  const array = [];

  while (number > 0) {
    array.push(String.fromCharCode(number % 256));
    number = Math.floor(number / 256);
  }

  return array.reverse().join('');
}

/***/ }),
/* 16 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Corner)
/* harmony export */ });
var Flags;
/**
 * A tile corner.
 */

(function (Flags) {
  Flags[Flags["MAP_BOUNDARY"] = 16384] = "MAP_BOUNDARY";
  Flags[Flags["RAMP"] = 16] = "RAMP";
  Flags[Flags["BLIGHT"] = 32] = "BLIGHT";
  Flags[Flags["WATER"] = 64] = "WATER";
  Flags[Flags["BOUNDARY"] = 128] = "BOUNDARY";
})(Flags || (Flags = {}));

class Corner {
  /**
   * 地面高度
   */
  groundHeight = 0;
  waterHeight = 0;
  mapEdge = 0;
  ramp = 0; // 地面是否枯萎

  blight = 0;
  water = 0;
  boundary = 0;
  /**
   * 地面地图 0 - 15 分别指向不同的风格贴图
   */

  groundTexture = 0;
  /**
   * 随机贴图 0 - 20 
   */

  groundVariation = 0;
  /**
   * 悬崖贴图 0 - 15 分别指向不同的风格贴图
   */

  cliffTexture = 0;
  /**
   * 悬崖贴图随机 0 - 6
   */

  cliffVariation = 0;
  layerHeight = 0;

  load(stream) {
    this.groundHeight = (stream.readInt16() - 0x2000) / 512;
    const waterAndEdge = stream.readInt16();
    this.waterHeight = ((waterAndEdge & 0x3FFF) - 0x2000) / 512;
    this.mapEdge = waterAndEdge & Flags.MAP_BOUNDARY;
    const textureAndFlags = stream.readUint8();
    this.ramp = textureAndFlags & Flags.RAMP;
    this.blight = textureAndFlags & Flags.BLIGHT;
    this.water = textureAndFlags & Flags.WATER;
    this.boundary = textureAndFlags & Flags.BOUNDARY;
    this.groundTexture = textureAndFlags & 0x0f;
    const variation = stream.readUint8();
    this.cliffVariation = (variation & 0b1110_0000) >>> 5;
    this.groundVariation = variation & 0b0001_1111;
    const cliffTextureAndLayer = stream.readUint8();
    this.cliffTexture = (cliffTextureAndLayer & 0b1111_0000) >>> 4;
    this.layerHeight = cliffTextureAndLayer & 0b0000_1111;
  }

  save(stream) {
    stream.writeInt16(this.groundHeight * 512 + 8192);
    stream.writeInt16(this.waterHeight * 512 + 8192 + this.mapEdge << 14);
    stream.writeUint8(this.ramp << 4 | this.blight << 5 | this.water << 6 | this.boundary << 7 | this.groundTexture);
    stream.writeUint8(this.cliffVariation << 5 | this.groundVariation);
    stream.writeUint8((this.cliffTexture << 4) + this.layerHeight);
  }

}

/***/ }),
/* 17 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MappedDataRow": () => (/* binding */ MappedDataRow),
/* harmony export */   "MappedData": () => (/* binding */ MappedData)
/* harmony export */ });
/* harmony import */ var _slk__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(18);
/* harmony import */ var _ini__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(19);


/**
 * A MappedData row.
 */

class MappedDataRow {
  map = {};

  set(key, value) {
    if (typeof value !== 'string') {
      value = value.toString();
    }

    this.map[key.toLowerCase()] = value;
  }

  string(key) {
    return this.map[key.toLowerCase()];
  }

  number(key) {
    const string = this.string(key);

    if (!string) {
      return 0;
    }

    return parseFloat(string);
  }

}
/**
 * A structure that holds mapped data from INI and SLK files.
 * 
 * In the case of SLK files, the first row is expected to hold the names of the columns.
 */

class MappedData {
  map = {};

  constructor(buffer) {
    if (buffer) {
      this.load(buffer);
    }
  }
  /**
   * Load data from an SLK file or an INI file.
   * 
   * Note that this may override previous properties!
   */


  load(buffer) {
    if (buffer.startsWith('ID;')) {
      const file = new _slk__WEBPACK_IMPORTED_MODULE_0__.default();
      file.load(buffer);
      const rows = file.rows;
      const header = rows[0];
      const map = this.map;

      for (let i = 1, l = rows.length; i < l; i++) {
        const row = rows[i]; // DialogueDemonBase.slk has an empty row.

        if (row) {
          const name = row[0]; // DialogueDemonBase.slk also has rows containing only a single underline.

          if (name && name !== '_') {
            if (!map[name]) {
              map[name] = new MappedDataRow();
            }

            const mapped = map[name];

            for (let j = 0, k = header.length; j < k; j++) {
              let key = header[j]; // UnitBalance.slk doesn't define the name of one column.

              if (key === undefined) {
                key = `column${j}`;
              }

              mapped.map[key.toLowerCase()] = row[j];
            }
          }
        }
      }
    } else {
      const file = new _ini__WEBPACK_IMPORTED_MODULE_1__.IniFile();
      file.load(buffer);
      const sections = file.sections;
      const map = this.map;

      for (const [row, properties] of sections.entries()) {
        if (!map[row]) {
          map[row] = new MappedDataRow();
        }

        const mapped = map[row];

        for (const [name, property] of properties) {
          mapped.map[name.toLowerCase()] = property;
        }
      }
    }
  }

  getRow(key) {
    return this.map[key];
  }

  getProperty(key, name) {
    return this.map[key].map[name];
  }

  setRow(key, values) {
    this.map[key] = values;
  }

  findRow(key, expectedValue) {
    for (const row of Object.values(this.map)) {
      if (row.string(key) === expectedValue) {
        return row;
      }
    }

    return;
  }

}

/***/ }),
/* 18 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ SlkFile)
/* harmony export */ });
/**
 * A SLK table file.
 */
class SlkFile {
  rows = [];

  load(buffer) {
    if (!buffer.startsWith('ID')) {
      throw new Error('WrongMagicNumber');
    }

    const rows = this.rows;
    let x = 0;
    let y = 0;

    for (const line of buffer.split('\n')) {
      // The B command is supposed to define the total number of columns and rows, however in UbetSplatData.slk it gives wrong information
      // Therefore, just ignore it, since JavaScript arrays grow as they want either way
      if (line[0] !== 'B') {
        for (const token of line.split(';')) {
          const op = token[0];
          const valueString = token.substring(1).trim();
          let value;

          if (op === 'X') {
            x = parseInt(valueString, 10) - 1;
          } else if (op === 'Y') {
            y = parseInt(valueString, 10) - 1;
          } else if (op === 'K') {
            if (!rows[y]) {
              rows[y] = [];
            }

            if (valueString[0] === '"') {
              value = valueString.slice(1, -1);
            } else {
              value = valueString;
            }

            rows[y][x] = value;
          }
        }
      }
    }
  }

  save() {
    const rows = this.rows;
    const rowCount = rows.length;
    const lines = [];
    let biggestColumn = 0;

    for (let y = 0; y < rowCount; y++) {
      const row = rows[y];
      const columnCount = row.length;

      if (columnCount > biggestColumn) {
        biggestColumn = columnCount;
      }

      let firstOfRow = true;

      for (let x = 0; x < columnCount; x++) {
        const value = row[x];

        if (value !== undefined) {
          let encoded;

          if (typeof value === 'string') {
            encoded = `"${value}"`;
          } else if (typeof value === 'boolean') {
            if (value) {
              encoded = 'TRUE';
            } else {
              encoded = 'FALSE';
            }
          } else {
            encoded = `${value}`;
          }

          if (firstOfRow) {
            firstOfRow = false;
            lines.push(`C;X${x + 1};Y${y + 1};K${encoded}`);
          } else {
            lines.push(`C;X${x + 1};K${encoded}`);
          }
        }
      }
    }

    return `ID;P\r\nB;X${biggestColumn};Y${rowCount}\r\n${lines.join('\r\n')}\r\nE`;
  }

}

/***/ }),
/* 19 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "IniFile": () => (/* binding */ IniFile)
/* harmony export */ });
/**
 * An INI section.
 */

/**
 * An INI file.
 */
class IniFile {
  properties = new Map();
  sections = new Map();

  load(buffer) {
    // All properties added until a section is reached are added to the properties map.
    // Once a section is reached, any further properties will be added to it until matching another section, etc.
    let section = this.properties;
    const sections = this.sections;

    for (const line of buffer.split('\r\n')) {
      // INI defines comments as starting with a semicolon ';'.
      // However, Warcraft 3 INI files use normal C comments '//'.
      // w3x2lni,  use comments '--'.
      // In addition, Warcraft 3 files have empty lines.
      // Therefore, ignore any line matching any of these conditions.
      if (line.length && !line.startsWith('//') && !line.startsWith(';') && !line.startsWith('--')) {
        let match = line.match(/^\[(.+?)\]/);

        if (match) {
          const name = match[1].trim();
          section = sections.get(name);

          if (!section) {
            section = new Map();
            sections.set(name, section);
          }
        } else {
          match = line.match(/^(.+?)=(.*?)$/);

          if (match) {
            let value = match[2].trim();

            if (value[0] === '"') {
              value = value.slice(1, -1);
            }

            section.set(match[1].trim(), value);
          }
        }
      }
    }
  }

  save() {
    const lines = [];

    for (const [key, value] of this.properties) {
      lines.push(`${key}=${value}`);
    }

    for (const [name, section] of this.sections) {
      lines.push(`[${name}]`);

      for (const [key, value] of section) {
        lines.push(`${key}=${value}`);
      }
    }

    return lines.join('\r\n');
  }

  getSection(name) {
    return this.sections.get(name);
  }

}

/***/ }),
/* 20 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getCliffVariation)
/* harmony export */ });
const cliffVariations = {
  AAAB: 1,
  AAAC: 1,
  AABA: 1,
  AABB: 2,
  AABC: 0,
  AACA: 1,
  AACB: 0,
  AACC: 1,
  ABAA: 1,
  ABAB: 1,
  ABAC: 0,
  ABBA: 2,
  ABBB: 1,
  ABBC: 0,
  ABCA: 0,
  ABCB: 0,
  ABCC: 0,
  ACAA: 1,
  ACAB: 0,
  ACAC: 1,
  ACBA: 0,
  ACBB: 0,
  ACBC: 0,
  ACCA: 1,
  ACCB: 0,
  ACCC: 1,
  BAAA: 1,
  BAAB: 1,
  BAAC: 0,
  BABA: 1,
  BABB: 1,
  BABC: 0,
  BACA: 0,
  BACB: 0,
  BACC: 0,
  BBAA: 1,
  BBAB: 1,
  BBAC: 0,
  BBBA: 1,
  BBCA: 0,
  BCAA: 0,
  BCAB: 0,
  BCAC: 0,
  BCBA: 0,
  BCCA: 0,
  CAAA: 1,
  CAAB: 0,
  CAAC: 1,
  CABA: 0,
  CABB: 0,
  CABC: 0,
  CACA: 1,
  CACB: 0,
  CACC: 1,
  CBAA: 0,
  CBAB: 0,
  CBAC: 0,
  CBBA: 0,
  CBCA: 0,
  CCAA: 1,
  CCAB: 0,
  CCAC: 1,
  CCBA: 0,
  CCCA: 1
};
const cityCliffVariations = {
  AAAB: 2,
  AAAC: 1,
  AABA: 1,
  AABB: 3,
  AABC: 0,
  AACA: 1,
  AACB: 0,
  AACC: 3,
  ABAA: 1,
  ABAB: 2,
  ABAC: 0,
  ABBA: 3,
  ABBB: 0,
  ABBC: 0,
  ABCA: 0,
  ABCB: 0,
  ABCC: 0,
  ACAA: 1,
  ACAB: 0,
  ACAC: 2,
  ACBA: 0,
  ACBB: 0,
  ACBC: 0,
  ACCA: 3,
  ACCB: 0,
  ACCC: 1,
  BAAA: 1,
  BAAB: 3,
  BAAC: 0,
  BABA: 2,
  BABB: 0,
  BABC: 0,
  BACA: 0,
  BACB: 0,
  BACC: 0,
  BBAA: 3,
  BBAB: 1,
  BBAC: 0,
  BBBA: 1,
  BBCA: 0,
  BCAA: 0,
  BCAB: 0,
  BCAC: 0,
  BCBA: 0,
  BCCA: 0,
  CAAA: 1,
  CAAB: 0,
  CAAC: 3,
  CABA: 0,
  CABB: 0,
  CABC: 0,
  CACA: 2,
  CACB: 0,
  CACC: 1,
  CBAA: 0,
  CBAB: 0,
  CBAC: 0,
  CBBA: 0,
  CBCA: 0,
  CCAA: 3,
  CCAB: 0,
  CCAC: 1,
  CCBA: 0,
  CCCA: 1
};
function getCliffVariation(dir, tag, variation) {
  if (dir === 'Cliffs') {
    return Math.min(variation, cliffVariations[tag]);
  } else {
    return Math.min(variation, cityCliffVariations[tag]);
  }
}

/***/ }),
/* 21 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ unique)
/* harmony export */ });
/**
 * Returns an array that only contains unique values found in the source array.
 */
function unique(a) {
  return a.reverse().filter((e, i, arr) => {
    return arr.indexOf(e, i + 1) === -1;
  }).reverse();
}

/***/ }),
/* 22 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const shader = `
uniform mat4 u_VP;
uniform sampler2D u_heightMap;
uniform sampler2D u_cliff_heightMap;
uniform vec2 u_size;
uniform vec2 u_offset;
uniform vec2 u_sel;
uniform bool u_extended[14];
uniform float u_baseTileset;

attribute vec2 a_position;
attribute float a_InstanceID;
attribute vec4 a_textures;
attribute vec4 a_variations;

varying vec4 v_tilesets;
varying vec2 v_uv[4];
varying vec3 v_normal;

varying float v_id;

vec2 getCell(float variation) {
  if (variation < 16.0) {
    return vec2(mod(variation, 4.0), floor(variation / 4.0));
  } else {
    variation -= 16.0;

    return vec2(4.0 + mod(variation, 4.0), floor(variation / 4.0));
  }
}

vec2 getUV(vec2 position, bool extended, float variation) {
  vec2 cell = getCell(variation);
  vec2 cellSize = vec2(extended ? 0.125 : 0.25, 0.25);
  vec2 uv = vec2(position.x, 1.0 - position.y);
  vec2 pixelSize = vec2(1.0 / 512.0, 1.0 / 256.0); /// Note: hardcoded to 512x256 for now.

  return clamp((cell + uv) * cellSize, cell * cellSize + pixelSize, (cell + 1.0) * cellSize - pixelSize); 
}

void main() {
  vec4 textures = a_textures - u_baseTileset;
  v_id = 0.0;
  
  if (textures[0] > 0.0 || textures[1] > 0.0 || textures[2] > 0.0 || textures[3] > 0.0) {
    v_tilesets = textures;

    v_uv[0] = getUV(a_position, u_extended[int(textures[0]) - 1], a_variations[0]);
    v_uv[1] = getUV(a_position, u_extended[int(textures[1]) - 1], a_variations[1]);
    v_uv[2] = getUV(a_position, u_extended[int(textures[2]) - 1], a_variations[2]);
    v_uv[3] = getUV(a_position, u_extended[int(textures[3]) - 1], a_variations[3]);

    vec2 corner = vec2(mod(a_InstanceID, u_size.x), floor(a_InstanceID / u_size.x));
    vec2 base = corner + a_position;
    float height = texture2D(u_heightMap, base / u_size).a;

    float hL = texture2D(u_cliff_heightMap, vec2(base - vec2(1.0, 0.0)) / (u_size)).a;
    float hR = texture2D(u_cliff_heightMap, vec2(base + vec2(1.0, 0.0)) / (u_size)).a;
    float hD = texture2D(u_cliff_heightMap, vec2(base - vec2(0.0, 1.0)) / (u_size)).a;
    float hU = texture2D(u_cliff_heightMap, vec2(base + vec2(0.0, 1.0)) / (u_size)).a;

    v_normal = normalize(vec3(hL - hR, hD - hU, 2.0));
    if(corner[0] == u_sel[0] && corner[1] == u_sel[1]) {
      v_id = 0.5;
    }

    gl_Position = u_VP * vec4(base * 128.0 + u_offset, height * 128.0, 1.0);
  } else {
    v_tilesets = vec4(0.0);

    v_uv[0] = vec2(0.0);
    v_uv[1] = vec2(0.0);
    v_uv[2] = vec2(0.0);
    v_uv[3] = vec2(0.0);

    v_normal = vec3(0.0);

    gl_Position = vec4(0.0);
  }
}
`;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (shader);

/***/ }),
/* 23 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _precision_glsl__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(24);

const shader = `
${_precision_glsl__WEBPACK_IMPORTED_MODULE_0__.default}

uniform sampler2D u_tilesets[15];

varying vec4 v_tilesets;
varying vec2 v_uv[4];
varying vec3 v_normal;
varying float v_id;

const vec3 lightDirection = normalize(vec3(-1.0, -1.0, 1.0));

vec4 sample(float tileset, vec2 uv) {
  // 1.0 - 1.0 == 0.0 is not always true.
  int i = int(tileset - 0.6);

  if (i == 0) {
    return texture2D(u_tilesets[0], uv);
  } else if (i == 1) {
    return texture2D(u_tilesets[1], uv);
  } else if (i == 2) {
    return texture2D(u_tilesets[2], uv);
  } else if (i == 3) {
    return texture2D(u_tilesets[3], uv);
  } else if (i == 4) {
    return texture2D(u_tilesets[4], uv);
  } else if (i == 5) {
    return texture2D(u_tilesets[5], uv);
  } else if (i == 6) {
    return texture2D(u_tilesets[6], uv);
  } else if (i == 7) {
    return texture2D(u_tilesets[7], uv);
  } else if (i == 8) {
    return texture2D(u_tilesets[8], uv);
  } else if (i == 9) {
    return texture2D(u_tilesets[9], uv);
  } else if (i == 10) {
    return texture2D(u_tilesets[10], uv);
  } else if (i == 11) {
    return texture2D(u_tilesets[11], uv);
  } else if (i == 12) {
    return texture2D(u_tilesets[12], uv);
  } else if (i == 13) {
    return texture2D(u_tilesets[13], uv);
  } else if (i == 14) {
    return texture2D(u_tilesets[14], uv);
  }
}

vec4 blend(vec4 color, float tileset, vec2 uv) {
  vec4 texel = sample(tileset, uv);

  return mix(color, texel, texel.a);
}

void main() {
  vec4 color = sample(v_tilesets[0], v_uv[0]);

  if (v_tilesets[1] > 0.5) {
    color = blend(color, v_tilesets[1], v_uv[1]);
  }

  if (v_tilesets[2] > 0.5) {
    color = blend(color, v_tilesets[2], v_uv[2]);
  }

  if (v_tilesets[3] > 0.5) {
    color = blend(color, v_tilesets[3], v_uv[3]);
  }

  color *= clamp(dot(lightDirection,v_normal)*0.5 + 0.5, 0.0, 1.0);

  gl_FragColor = vec4(color.xyz + v_id, 1.0);
  // gl_FragColor = vec4(v_normal * 0.5 + 0.5, 1.0);
}
`;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (shader);

/***/ }),
/* 24 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// Used by all fragment shaders.
const shader = `
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif
`;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (shader);

/***/ }),
/* 25 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const shader = `
uniform mat4 u_VP;
uniform sampler2D u_heightMap;
uniform vec2 u_pixel;
uniform vec2 u_centerOffset;

attribute vec3 a_instancePosition;
attribute float a_instanceTexture;
attribute vec3 a_position;
attribute vec3 a_normal;
attribute vec2 a_uv;
attribute float a_color;


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

  gl_PointSize = 10.0;
  gl_Position = u_VP * vec4(v_position, 1.0);
	v_normal = normalize(vec3(terrain_normal.xy + a_normal.xy, terrain_normal.z * a_normal.z));
  v_normal = a_normal;
  if(mod(v_position.x, 128.0) == 0.0) {
    v_normal = vec3(0.0, v_normal.yz);
  }
  if(mod(v_position.y, 128.0) == 0.0) {
    v_normal = vec3(v_normal.x, 0.0, v_normal.z);
  }
}
`;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (shader); // const shader = `
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

/***/ }),
/* 26 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _precision_glsl__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(24);

const shader = `
// #extension GL_OES_standard_derivatives : enable

${_precision_glsl__WEBPACK_IMPORTED_MODULE_0__.default}

uniform sampler2D u_texture1;
uniform sampler2D u_texture2;

varying vec3 v_normal;
varying vec2 v_uv;
varying float v_texture;
varying vec3 v_position;

const vec3 lightDirection = normalize(vec3(-1.0, -1.0, 1.0));

vec4 sample(float texture, vec2 uv) {
  // int(0.0) == 0 is not always true.
  int i = int(texture + 0.1);

  if (i == 0) {
    return texture2D(u_texture1, uv);
  } else {
    return texture2D(u_texture2, uv);
  }
}

void main() {
  vec4 color = sample(v_texture, v_uv);

  // vec3 faceNormal = cross(dFdx(v_position), dFdy(v_position));
  // vec3 normal = normalize((faceNormal + v_normal) * 0.5);

  color *= clamp(dot(lightDirection,v_normal)*0.5 + 0.5, 0.0, 1.0);

  gl_FragColor = color;
  // gl_FragColor = vec4(v_normal * 0.5 + 0.5, 1.0);
}
`;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (shader);

/***/ }),
/* 27 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const shader = `
uniform mat4 u_VP;
uniform sampler2D u_heightMap;
uniform sampler2D u_waterHeightMap;
uniform vec2 u_size;
uniform vec2 u_offset;
uniform float u_offsetHeight;
uniform vec4 u_minDeepColor;
uniform vec4 u_maxDeepColor;
uniform vec4 u_minShallowColor;
uniform vec4 u_maxShallowColor;

attribute vec2 a_position;
attribute float a_InstanceID;
attribute float a_isWater;

varying vec2 v_uv;
varying vec4 v_color;

const float minDepth = 10.0 / 128.0;
const float deepLevel = 64.0 / 128.0;
const float maxDepth = 72.0 / 128.0;

void main() {
  if (a_isWater > 0.5) {
    v_uv = a_position;

    vec2 corner = vec2(mod(a_InstanceID, u_size.x), floor(a_InstanceID / u_size.x));
    vec2 base = corner + a_position;
    float height = texture2D(u_heightMap, base / u_size).a;
    float waterHeight = texture2D(u_waterHeightMap, base / u_size).a + u_offsetHeight;
    float value = clamp(waterHeight - height, 0.0, 1.0);

    if (value <= deepLevel) {
      value = max(0.0, value - minDepth) / (deepLevel - minDepth);
      v_color = mix(u_minShallowColor, u_maxShallowColor, value) / 255.0;
    } else {
      value = clamp(value - deepLevel, 0.0, maxDepth - deepLevel) / (maxDepth - deepLevel);
      v_color = mix(u_minDeepColor, u_maxDeepColor, value) / 255.0;
    }

    gl_Position = u_VP * vec4(base * 128.0 + u_offset, waterHeight * 128.0, 1.0);
  } else {
    v_uv = vec2(0.0);
    v_color = vec4(0.0);

    gl_Position = vec4(0.0);
  }
}
`;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (shader);

/***/ }),
/* 28 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _precision_glsl__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(24);

const shader = `
${_precision_glsl__WEBPACK_IMPORTED_MODULE_0__.default}

uniform sampler2D u_waterTexture;

varying vec2 v_uv;
varying vec4 v_color;

void main() {
  gl_FragColor = texture2D(u_waterTexture, v_uv) * v_color;
}
`;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (shader);

/***/ }),
/* 29 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const shader = `
void main() {
  gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
}
`;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (shader);

/***/ }),
/* 30 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const shader = `
uniform mat4 u_VP;

attribute vec3 a_position;

void main() {
    gl_Position = u_VP * vec4(a_position.xyz, 1.0);
}
`;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (shader);

/***/ }),
/* 31 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (shader); // const shader = `
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

/***/ }),
/* 32 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _precision_glsl__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(24);

const shader = `
${_precision_glsl__WEBPACK_IMPORTED_MODULE_0__.default}

varying vec3 v_color;

void main() {
  gl_FragColor = vec4(v_color.xyz, 1.0);
}
`;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (shader);

/***/ }),
/* 33 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (shader);

/***/ }),
/* 34 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ TerrainModel)
/* harmony export */ });
const MdlxModel = ModelViewer.parsers.mdlx.Model;

function double(vertices) {
  return new Float32Array(vertices.length * 2).fill(0).map((_, index) => {
    return vertices[index % vertices.length];
  });
}
/**
 * A static terrain model.
 */


class TerrainModel {
  constructor(map, arrayBuffer, locations, textures, shader) {
    const gl = map.viewer.gl;
    const webgl = map.viewer.webgl;
    const instancedArrays = webgl.extensions['ANGLE_instanced_arrays'];
    const vertexArrayObject = webgl.extensions['OES_vertex_array_object'];
    const parser = new MdlxModel();
    parser.load(arrayBuffer);
    const geoset = parser.geosets[0];
    console.info('faces', parser);
    const originLength = geoset.vertices.length / 3;
    const vertices = double(geoset.vertices);
    const normals = double(geoset.normals);
    const uvs = double(geoset.uvSets[0]);
    const faces = geoset.faces;
    const flags = new Float32Array(uvs.length / 2).fill(0).map((_, index) => {
      return index >= originLength ? 1 : 0;
    });
    const normalFaces = new Uint16Array(faces.reduce((ret, cur) => {
      ret.push(cur);
      ret.push(cur + originLength);
      return ret;
    }, [])); // console.info(`faces`, vertices, flags);

    const normalsOffset = vertices.byteLength;
    const uvsOffset = normalsOffset + normals.byteLength;
    const flagsOffset = uvsOffset + uvs.byteLength;
    let vao = null;
    const attribs = shader.attribs;

    if (vertexArrayObject) {
      vao = vertexArrayObject.createVertexArrayOES();
      vertexArrayObject.bindVertexArrayOES(vao);
    }

    const vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flagsOffset + flags.byteLength, gl.STATIC_DRAW);
    gl.bufferSubData(gl.ARRAY_BUFFER, 0, vertices);
    gl.bufferSubData(gl.ARRAY_BUFFER, normalsOffset, normals);
    gl.bufferSubData(gl.ARRAY_BUFFER, uvsOffset, uvs);
    gl.bufferSubData(gl.ARRAY_BUFFER, flagsOffset, flags);
    console.info(`normals`, vertices, normals);

    if (vertexArrayObject) {
      gl.vertexAttribPointer(attribs['a_position'], 3, gl.FLOAT, false, 0, 0);
      gl.enableVertexAttribArray(attribs['a_position']);
      gl.vertexAttribPointer(attribs['a_normal'], 3, gl.FLOAT, false, 0, normalsOffset);
      gl.enableVertexAttribArray(attribs['a_normal']);
      gl.vertexAttribPointer(attribs['a_uv'], 2, gl.FLOAT, false, 0, uvsOffset);
      gl.enableVertexAttribArray(attribs['a_uv']);
    }

    const texturesOffset = locations.length * 4;
    const locationAndTextureBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, locationAndTextureBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, texturesOffset + textures.length, gl.STATIC_DRAW);
    gl.bufferSubData(gl.ARRAY_BUFFER, 0, new Float32Array(locations));
    gl.bufferSubData(gl.ARRAY_BUFFER, texturesOffset, new Uint8Array(textures));

    if (vertexArrayObject) {
      gl.vertexAttribPointer(attribs['a_instancePosition'], 3, gl.FLOAT, false, 0, 0);
      gl.enableVertexAttribArray(attribs['a_instancePosition']);
      instancedArrays.vertexAttribDivisorANGLE(attribs['a_instancePosition'], 1);
      gl.vertexAttribPointer(attribs['a_instanceTexture'], 1, gl.UNSIGNED_BYTE, false, 0, texturesOffset);
      gl.enableVertexAttribArray(attribs['a_instanceTexture']);
      instancedArrays.vertexAttribDivisorANGLE(attribs['a_instanceTexture'], 1);
    }

    const faceBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, faceBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, faces, gl.STATIC_DRAW);
    const normalFaceBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, normalFaceBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, normalFaces, gl.STATIC_DRAW);

    if (vertexArrayObject) {
      vertexArrayObject.bindVertexArrayOES(null);
    }

    this.map = map;
    this.vertexBuffer = vertexBuffer;
    this.faceBuffer = faceBuffer;
    this.normalFaceBuffer = normalFaceBuffer;
    this.normalsOffset = normalsOffset;
    this.uvsOffset = uvsOffset;
    this.flagsOffset = flagsOffset;
    this.elements = faces.length;
    this.locationAndTextureBuffer = locationAndTextureBuffer;
    this.texturesOffset = texturesOffset;
    this.instances = locations.length / 3;
    this.vao = vao;
  }

  render(shader) {
    const viewer = this.map.viewer;
    const gl = viewer.gl;
    const webgl = viewer.webgl;
    const instancedArrays = webgl.extensions['ANGLE_instanced_arrays'];
    const vertexArrayObject = webgl.extensions['OES_vertex_array_object'];
    const attribs = shader.attribs;

    if (vertexArrayObject) {
      vertexArrayObject.bindVertexArrayOES(this.vao);
    } else {
      // Locations and textures.
      gl.bindBuffer(gl.ARRAY_BUFFER, this.locationAndTextureBuffer);
      gl.vertexAttribPointer(attribs['a_instancePosition'], 3, gl.FLOAT, false, 0, 0);
      gl.vertexAttribPointer(attribs['a_instanceTexture'], 1, gl.UNSIGNED_BYTE, false, 0, this.texturesOffset); // Vertices.

      gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
      gl.vertexAttribPointer(attribs['a_position'], 3, gl.FLOAT, false, 0, 0);
      gl.vertexAttribPointer(attribs['a_normal'], 3, gl.FLOAT, false, 0, this.normalsOffset);
      gl.vertexAttribPointer(attribs['a_uv'], 2, gl.FLOAT, false, 0, this.uvsOffset); // gl.vertexAttribPointer(attribs['a_color'], 1, gl.FLOAT, false, 0, this.flagsOffset);
      // Faces.

      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.faceBuffer);
    } // Draw.
    // instancedArrays.drawElementsInstancedANGLE(gl.LINE_STRIP, this.elements, gl.UNSIGNED_SHORT, 0, this.instances);


    instancedArrays.drawElementsInstancedANGLE(gl.TRIANGLES, this.elements, gl.UNSIGNED_SHORT, 0, this.instances);

    if (vertexArrayObject) {
      vertexArrayObject.bindVertexArrayOES(null);
    }
  }

  renderNormal(shader) {
    const viewer = this.map.viewer;
    const gl = viewer.gl;
    const webgl = viewer.webgl;
    const instancedArrays = webgl.extensions['ANGLE_instanced_arrays'];
    const vertexArrayObject = webgl.extensions['OES_vertex_array_object'];
    const attribs = shader.attribs;

    if (vertexArrayObject) {
      vertexArrayObject.bindVertexArrayOES(this.vao);
    } else {
      // Locations and textures.
      gl.bindBuffer(gl.ARRAY_BUFFER, this.locationAndTextureBuffer);
      gl.vertexAttribPointer(attribs['a_instancePosition'], 3, gl.FLOAT, false, 0, 0);
      gl.vertexAttribPointer(attribs['a_instanceTexture'], 1, gl.UNSIGNED_BYTE, false, 0, this.texturesOffset); // Vertices.

      gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
      gl.vertexAttribPointer(attribs['a_position'], 3, gl.FLOAT, false, 0, 0);
      gl.vertexAttribPointer(attribs['a_normal'], 3, gl.FLOAT, false, 0, this.normalsOffset); // gl.vertexAttribPointer(attribs['a_uv'], 2, gl.FLOAT, false, 0, this.uvsOffset);

      gl.vertexAttribPointer(attribs['a_flag'], 1, gl.FLOAT, false, 0, this.flagsOffset); // Faces.

      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.normalFaceBuffer);
    } // Draw.


    instancedArrays.drawElementsInstancedANGLE(gl.LINES, this.elements * 2, gl.UNSIGNED_SHORT, 0, this.instances); // instancedArrays.drawElementsInstancedANGLE(gl.TRIANGLES, this.elements, gl.UNSIGNED_SHORT, 0, this.instances);

    if (vertexArrayObject) {
      vertexArrayObject.bindVertexArrayOES(null);
    }
  }

}

/***/ }),
/* 35 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ War3MapDoo)
/* harmony export */ });
/* harmony import */ var _common_binarystream__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(11);
/* harmony import */ var _doodad__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(36);
/* harmony import */ var _terraindoodad__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(39);



/**
 * war3map.doo - the doodad and destructible file.
 */

class War3MapDoo {
  version = 0;
  u1 = new Uint8Array(4);
  doodads = [];
  u2 = new Uint8Array(4);
  terrainDoodads = [];

  load(buffer, buildVersion) {
    const stream = new _common_binarystream__WEBPACK_IMPORTED_MODULE_0__.default(buffer);

    if (stream.readBinary(4) !== 'W3do') {
      throw new Error('Not a valid war3map.doo buffer');
    }

    this.version = stream.readInt32();
    stream.readUint8Array(this.u1);

    for (let i = 0, l = stream.readInt32(); i < l; i++) {
      const doodad = new _doodad__WEBPACK_IMPORTED_MODULE_1__.default();
      doodad.load(stream, this.version, buildVersion);
      this.doodads.push(doodad);
    }

    stream.readUint8Array(this.u2);

    for (let i = 0, l = stream.readInt32(); i < l; i++) {
      const terrainDoodad = new _terraindoodad__WEBPACK_IMPORTED_MODULE_2__.default();
      terrainDoodad.load(stream, this.version);
      this.terrainDoodads.push(terrainDoodad);
    }
  }

  save(buildVersion) {
    const stream = new _common_binarystream__WEBPACK_IMPORTED_MODULE_0__.default(new ArrayBuffer(this.getByteLength(buildVersion)));
    stream.writeBinary('W3do');
    stream.writeInt32(this.version);
    stream.writeUint8Array(this.u1);
    stream.writeUint32(this.doodads.length);

    for (const doodad of this.doodads) {
      doodad.save(stream, this.version, buildVersion);
    }

    stream.writeUint8Array(this.u2);
    stream.writeUint32(this.terrainDoodads.length);

    for (const terrainDoodad of this.terrainDoodads) {
      terrainDoodad.save(stream, this.version);
    }

    return stream.uint8array;
  }

  getByteLength(buildVersion) {
    let size = 24 + this.terrainDoodads.length * 16;

    for (const doodad of this.doodads) {
      size += doodad.getByteLength(this.version, buildVersion);
    }

    return size;
  }

}

/***/ }),
/* 36 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Doodad)
/* harmony export */ });
/* harmony import */ var _randomitemset__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(37);

/**
 * A doodad.
 */

class Doodad {
  id = '\0\0\0\0';
  variation = 0;
  location = new Float32Array(3);
  angle = 0;
  scale = new Float32Array([1, 1, 1]);
  /**
   * @since Game version 1.32
   */

  skin = '\0\0\0\0';
  flags = 0;
  life = 0;
  itemTable = -1;
  itemSets = [];
  editorId = 0;
  u1 = new Uint8Array(8);

  load(stream, version, buildVersion) {
    this.id = stream.readBinary(4);
    this.variation = stream.readInt32();
    stream.readFloat32Array(this.location);
    this.angle = stream.readFloat32();
    stream.readFloat32Array(this.scale);

    if (buildVersion > 131) {
      this.skin = stream.readBinary(4);
    }

    this.flags = stream.readUint8();
    this.life = stream.readUint8();

    if (version > 7) {
      this.itemTable = stream.readUint32();

      for (let i = 0, l = stream.readUint32(); i < l; i++) {
        const itemSet = new _randomitemset__WEBPACK_IMPORTED_MODULE_0__.default();
        itemSet.load(stream);
        this.itemSets.push(itemSet);
      }
    }

    this.editorId = stream.readInt32();
  }

  save(stream, version, buildVersion) {
    stream.writeBinary(this.id);
    stream.writeInt32(this.variation);
    stream.writeFloat32Array(this.location);
    stream.writeFloat32(this.angle);
    stream.writeFloat32Array(this.scale);

    if (buildVersion > 131) {
      stream.writeBinary(this.skin);
    }

    stream.writeUint8(this.flags);
    stream.writeUint8(this.life);

    if (version > 7) {
      stream.writeUint32(this.itemTable);
      stream.writeUint32(this.itemSets.length);

      for (const itemSet of this.itemSets) {
        itemSet.save(stream);
      }
    }

    stream.writeInt32(this.editorId);
  }

  getByteLength(version, buildVersion) {
    let size = 42;

    if (buildVersion > 131) {
      size += 4;
    }

    if (version > 7) {
      size += 8;

      for (const itemSet of this.itemSets) {
        size += itemSet.getByteLength();
      }
    }

    return size;
  }

}

/***/ }),
/* 37 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ RandomItemSet)
/* harmony export */ });
/* harmony import */ var _randomitem__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(38);


/**
 * A random item set.
 */
class RandomItemSet {
  items = [];

  load(stream) {
    for (let i = 0, l = stream.readUint32(); i < l; i++) {
      const item = new _randomitem__WEBPACK_IMPORTED_MODULE_0__.default();
      item.load(stream);
      this.items.push(item);
    }
  }

  save(stream) {
    stream.writeUint32(this.items.length);

    for (const item of this.items) {
      item.save(stream);
    }
  }

  getByteLength() {
    return 4 + this.items.length * 8;
  }

}

/***/ }),
/* 38 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ RandomItem)
/* harmony export */ });
/**
 * A random item.
 */
class RandomItem {
  id = '\0\0\0\0';
  chance = 0;

  load(stream) {
    this.id = stream.readBinary(4);
    this.chance = stream.readInt32();
  }

  save(stream) {
    stream.writeBinary(this.id);
    stream.writeInt32(this.chance);
  }

}

/***/ }),
/* 39 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ TerrainDoodad)
/* harmony export */ });
/**
 * A terrain doodad.
 *
 * This type of doodad works much like cliffs.
 * It uses the height of the terrain, and gets affected by the ground heightmap.
 * It cannot be manipulated in any way in the World Editor once placed.
 * Indeed, the only way to change it is to remove it by changing cliffs around it.
 */
class TerrainDoodad {
  id = '\0\0\0\0';
  u1 = 0;
  location = new Uint32Array(2);

  load(stream, _version) {
    this.id = stream.readBinary(4);
    this.u1 = stream.readUint32();
    stream.readUint32Array(this.location);
  }

  save(stream, _version) {
    stream.writeBinary(this.id);
    stream.writeUint32(this.u1);
    stream.writeUint32Array(this.location);
  }

}

/***/ }),
/* 40 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Doodad)
/* harmony export */ });
/* harmony import */ var gl_matrix__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4);
/* harmony import */ var _common_gl_matrix_addon__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(41);
/* harmony import */ var _widget__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(42);



/**
 * A doodad.
 */

class Doodad extends _widget__WEBPACK_IMPORTED_MODULE_1__.Widget {
  constructor(map, model, row, doodad) {
    super(map, model);
    const instance = this.instance;
    instance.move(doodad.location);
    instance.rotateLocal(gl_matrix__WEBPACK_IMPORTED_MODULE_2__.setAxisAngle(gl_matrix__WEBPACK_IMPORTED_MODULE_2__.create(), _common_gl_matrix_addon__WEBPACK_IMPORTED_MODULE_0__.VEC3_UNIT_Z, doodad.angle));
    instance.scale(doodad.scale);
    instance.setScene(map.worldScene);
    this.instance = instance;
    this.row = row;
  }

}

/***/ }),
/* 41 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "VEC3_UNIT_X": () => (/* binding */ VEC3_UNIT_X),
/* harmony export */   "VEC3_UNIT_Y": () => (/* binding */ VEC3_UNIT_Y),
/* harmony export */   "VEC3_UNIT_Z": () => (/* binding */ VEC3_UNIT_Z),
/* harmony export */   "VEC3_ZERO": () => (/* binding */ VEC3_ZERO),
/* harmony export */   "VEC3_ONE": () => (/* binding */ VEC3_ONE),
/* harmony export */   "QUAT_ZERO": () => (/* binding */ QUAT_ZERO),
/* harmony export */   "QUAT_DEFAULT": () => (/* binding */ QUAT_DEFAULT),
/* harmony export */   "unproject": () => (/* binding */ unproject),
/* harmony export */   "distanceToPlane": () => (/* binding */ distanceToPlane),
/* harmony export */   "distanceToPlane2": () => (/* binding */ distanceToPlane2),
/* harmony export */   "distanceToPlane3": () => (/* binding */ distanceToPlane3),
/* harmony export */   "testSphere": () => (/* binding */ testSphere),
/* harmony export */   "testCell": () => (/* binding */ testCell),
/* harmony export */   "planeLength": () => (/* binding */ planeLength),
/* harmony export */   "normalizePlane": () => (/* binding */ normalizePlane),
/* harmony export */   "unpackPlanes": () => (/* binding */ unpackPlanes),
/* harmony export */   "quatLookAt": () => (/* binding */ quatLookAt)
/* harmony export */ });
/* harmony import */ var gl_matrix__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var gl_matrix__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4);
/* harmony import */ var gl_matrix__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5);

const VEC3_UNIT_X = gl_matrix__WEBPACK_IMPORTED_MODULE_0__.fromValues(1, 0, 0);
const VEC3_UNIT_Y = gl_matrix__WEBPACK_IMPORTED_MODULE_0__.fromValues(0, 1, 0);
const VEC3_UNIT_Z = gl_matrix__WEBPACK_IMPORTED_MODULE_0__.fromValues(0, 0, 1);
const VEC3_ZERO = gl_matrix__WEBPACK_IMPORTED_MODULE_0__.create();
const VEC3_ONE = gl_matrix__WEBPACK_IMPORTED_MODULE_0__.fromValues(1, 1, 1);
const QUAT_ZERO = gl_matrix__WEBPACK_IMPORTED_MODULE_1__.fromValues(0, 0, 0, 0);
const QUAT_DEFAULT = gl_matrix__WEBPACK_IMPORTED_MODULE_1__.create();
const vec4Heap = gl_matrix__WEBPACK_IMPORTED_MODULE_2__.create();
function unproject(out, v, inverseMatrix, viewport) {
  const x = 2 * (v[0] - viewport[0]) / viewport[2] - 1;
  const y = 1 - 2 * (v[1] - viewport[1]) / viewport[3];
  const z = 2 * v[2] - 1;
  gl_matrix__WEBPACK_IMPORTED_MODULE_2__.set(vec4Heap, x, y, z, 1);
  gl_matrix__WEBPACK_IMPORTED_MODULE_2__.transformMat4(vec4Heap, vec4Heap, inverseMatrix);
  gl_matrix__WEBPACK_IMPORTED_MODULE_0__.set(out, vec4Heap[0] / vec4Heap[3], vec4Heap[1] / vec4Heap[3], vec4Heap[2] / vec4Heap[3]);
  return out;
}
/**
 * Get the distance of a point from a plane.
 * 
 *     dot(plane, vec4(point, 1))
 */

function distanceToPlane(plane, point) {
  return plane[0] * point[0] + plane[1] * point[1] + plane[2] * point[2] + plane[3];
}
/**
 * Get the distance of a point from a plane.
 * 
 *     dot(plane, vec4(x, y, 0, 1))
 */

function distanceToPlane2(plane, x, y) {
  return plane[0] * x + plane[1] * y + plane[3];
}
/**
 * Get the distance of a point from a plane.
 * 
 *     dot(plane, vec4(x, y, z, 1))
 */

function distanceToPlane3(plane, x, y, z) {
  return plane[0] * x + plane[1] * y + plane[2] * z + plane[3];
}
/**
 * Test if a sphere with the given center and radius intersects the given planes.
 * If it doesn't, the index of the first plane that proved this is returned.
 * Otherwise returns -1.
 *
 * If first is given, the test will begin from the plane at that index.
 */

function testSphere(planes, x, y, z, r, first) {
  if (first === -1) {
    first = 0;
  }

  for (let i = 0; i < 6; i++) {
    const index = (first + i) % 6;

    if (distanceToPlane3(planes[index], x, y, z) <= -r) {
      return index;
    }
  }

  return -1;
}
/**
 * Test if a cell with the given coordinates intersects the given planes.
 * If it doesn't, the index of the first plane that proved this is returned.
 * Otherwise returns -1.
 *
 * If first is given, the test will begin from the plane at that index.
 */

function testCell(planes, left, right, bottom, top, first) {
  if (first === -1) {
    first = 0;
  }

  for (let i = 0; i < 6; i++) {
    const index = (first + i) % 6;
    const plane = planes[index];

    if (distanceToPlane2(plane, left, bottom) < 0 && distanceToPlane2(plane, left, top) < 0 && distanceToPlane2(plane, right, top) < 0 && distanceToPlane2(plane, right, bottom) < 0) {
      return index;
    }
  }

  return -1;
}
function planeLength(plane) {
  return Math.hypot(plane[0], plane[1], plane[2]);
}
/**
 * Normalize a plane.
 * 
 * Note that this is not the same as normalizing a vec4.
 */

function normalizePlane(out, plane) {
  const len = planeLength(plane);
  out[0] = plane[0] / len;
  out[1] = plane[1] / len;
  out[2] = plane[2] / len;
  out[3] = plane[3] / len;
}
/**
 * Unpacks a matrix's planes.
 */

function unpackPlanes(planes, m) {
  // eslint-disable-next-line one-var
  const a00 = m[0],
        a01 = m[4],
        a02 = m[8],
        a03 = m[12],
        a10 = m[1],
        a11 = m[5],
        a12 = m[9],
        a13 = m[13],
        a20 = m[2],
        a21 = m[6],
        a22 = m[10],
        a23 = m[14],
        a30 = m[3],
        a31 = m[7],
        a32 = m[11],
        a33 = m[15];
  let plane; // Left clipping plane

  plane = planes[0];
  plane[0] = a30 + a00;
  plane[1] = a31 + a01;
  plane[2] = a32 + a02;
  plane[3] = a33 + a03; // Right clipping plane

  plane = planes[1];
  plane[0] = a30 - a00;
  plane[1] = a31 - a01;
  plane[2] = a32 - a02;
  plane[3] = a33 - a03; // Top clipping plane

  plane = planes[2];
  plane[0] = a30 - a10;
  plane[1] = a31 - a11;
  plane[2] = a32 - a12;
  plane[3] = a33 - a13; // Bottom clipping plane

  plane = planes[3];
  plane[0] = a30 + a10;
  plane[1] = a31 + a11;
  plane[2] = a32 + a12;
  plane[3] = a33 + a13; // Near clipping plane

  plane = planes[4];
  plane[0] = a30 + a20;
  plane[1] = a31 + a21;
  plane[2] = a32 + a22;
  plane[3] = a33 + a23; // Far clipping plane

  plane = planes[5];
  plane[0] = a30 - a20;
  plane[1] = a31 - a21;
  plane[2] = a32 - a22;
  plane[3] = a33 - a23;
  normalizePlane(planes[0], planes[0]);
  normalizePlane(planes[1], planes[1]);
  normalizePlane(planes[2], planes[2]);
  normalizePlane(planes[3], planes[3]);
  normalizePlane(planes[4], planes[4]);
  normalizePlane(planes[5], planes[5]);
}
const F = gl_matrix__WEBPACK_IMPORTED_MODULE_0__.create();
const R = gl_matrix__WEBPACK_IMPORTED_MODULE_0__.create();
const U = gl_matrix__WEBPACK_IMPORTED_MODULE_0__.create();
/**
 * A look-at matrix, but for quaternions.
 * 
 * See https://stackoverflow.com/a/52551983/2503048
 */

function quatLookAt(out, from, to, worldUp) {
  gl_matrix__WEBPACK_IMPORTED_MODULE_0__.normalize(F, gl_matrix__WEBPACK_IMPORTED_MODULE_0__.sub(F, to, from));
  gl_matrix__WEBPACK_IMPORTED_MODULE_0__.normalize(R, gl_matrix__WEBPACK_IMPORTED_MODULE_0__.cross(R, worldUp, F));
  gl_matrix__WEBPACK_IMPORTED_MODULE_0__.cross(U, R, F);
  const trace = R[0] + U[2] + F[1];

  if (trace > 0.0) {
    const s = 0.5 / Math.sqrt(trace + 1.0);
    out[3] = 0.25 / s;
    out[0] = (U[1] - F[2]) * s;
    out[2] = (F[0] - R[1]) * s;
    out[1] = (R[2] - U[0]) * s;
  } else {
    if (R[0] > U[2] && R[0] > F[1]) {
      const s = 2.0 * Math.sqrt(1.0 + R[0] - U[2] - F[1]);
      out[3] = (U[1] - F[2]) / s;
      out[0] = 0.25 * s;
      out[2] = (U[0] + R[2]) / s;
      out[1] = (F[0] + R[1]) / s;
    } else if (U[2] > F[1]) {
      const s = 2.0 * Math.sqrt(1.0 + U[2] - R[0] - F[1]);
      out[3] = (F[0] - R[1]) / s;
      out[0] = (U[0] + R[2]) / s;
      out[2] = 0.25 * s;
      out[1] = (F[2] + U[1]) / s;
    } else {
      const s = 2.0 * Math.sqrt(1.0 + F[1] - R[0] - U[2]);
      out[3] = (R[2] - U[0]) / s;
      out[0] = (F[0] + R[1]) / s;
      out[2] = (F[2] + U[1]) / s;
      out[1] = 0.25 * s;
    }
  }

  return out;
}

/***/ }),
/* 42 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WidgetState": () => (/* binding */ WidgetState),
/* harmony export */   "Widget": () => (/* binding */ Widget)
/* harmony export */ });
/* harmony import */ var _standsequence__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(43);

let WidgetState;
/**
 * A widget.
 */

(function (WidgetState) {
  WidgetState[WidgetState["IDLE"] = 0] = "IDLE";
  WidgetState[WidgetState["WALK"] = 1] = "WALK";
})(WidgetState || (WidgetState = {}));

class Widget {
  state = WidgetState.IDLE;

  constructor(map, model) {
    this.instance = model.addInstance();
    this.instance.setScene(map.worldScene);
  }

  update() {
    if (this.instance.sequenceEnded || this.instance.sequence === -1) {
      if (this.state === WidgetState.IDLE) {
        (0,_standsequence__WEBPACK_IMPORTED_MODULE_0__.default)(this.instance);
      }
    }
  }

}

/***/ }),
/* 43 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ randomStandSequence)
/* harmony export */ });
function sequenceSorter(a, b) {
  return a.sequence.rarity - b.sequence.rarity;
}

function filterSequences(type, sequences) {
  const filtered = [];

  for (let i = 0, l = sequences.length; i < l; i++) {
    const sequence = sequences[i],
          name = sequence.name.split('-')[0].replace(/\d/g, '').trim().toLowerCase();

    if (name === type) {
      filtered.push({
        sequence,
        index: i
      });
    }
  }

  return filtered;
}

function selectSequence(type, sequences) {
  const filtered = filterSequences(type, sequences);
  let i, l;
  filtered.sort(sequenceSorter);

  for (i = 0, l = filtered.length; i < l; i++) {
    const sequence = filtered[i].sequence;
    const rarity = sequence.rarity;

    if (rarity === 0) {
      break;
    }

    if (Math.random() * 10 > rarity) {
      return filtered[i];
    }
  }

  const sequencesLeft = filtered.length - i;
  const random = i + Math.floor(Math.random() * sequencesLeft);
  const sequence = filtered[random];
  return sequence;
}

function randomStandSequence(target) {
  const model = target.model;
  const sequences = model.sequences;
  const sequence = selectSequence('stand', sequences);

  if (sequence) {
    target.setSequence(sequence.index);
  }
}

/***/ }),
/* 44 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Unit)
/* harmony export */ });
/* harmony import */ var gl_matrix__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2);
/* harmony import */ var gl_matrix__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(4);
/* harmony import */ var _common_gl_matrix_addon__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(41);
/* harmony import */ var _widget__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(42);



const heapZ = gl_matrix__WEBPACK_IMPORTED_MODULE_2__.create();
/**
 * A unit.
 */

class Unit extends _widget__WEBPACK_IMPORTED_MODULE_1__.Widget {
  /**
   * StartLocation.mdx (and others?) seems to be built-in, and has no row.
   */
  constructor(map, model, row, unit) {
    super(map, model);
    const instance = this.instance;
    instance.move(unit.location);
    instance.rotateLocal(gl_matrix__WEBPACK_IMPORTED_MODULE_3__.setAxisAngle(gl_matrix__WEBPACK_IMPORTED_MODULE_3__.create(), _common_gl_matrix_addon__WEBPACK_IMPORTED_MODULE_0__.VEC3_UNIT_Z, unit.angle));
    instance.scale(unit.scale);
    instance.setTeamColor(unit.player);
    instance.setScene(map.worldScene);

    if (row) {
      heapZ[2] = row.number('moveHeight');
      instance.move(heapZ);
      instance.setVertexColor([row.number('red') / 255, row.number('green') / 255, row.number('blue') / 255, 1]);
      instance.uniformScale(row.number('modelScale'));
    }

    this.instance = instance;
    this.row = row;
  }

}

/***/ }),
/* 45 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ War3MapUnitsDoo)
/* harmony export */ });
/* harmony import */ var _common_binarystream__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(11);
/* harmony import */ var _unit__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(46);


/**
 * war3mapUnits.doo - the units and items file.
 */

class War3MapUnitsDoo {
  version = 8;
  subversion = 11;
  units = [];

  load(buffer, buildVersion) {
    const stream = new _common_binarystream__WEBPACK_IMPORTED_MODULE_0__.default(buffer);

    if (stream.readBinary(4) !== 'W3do') {
      throw new Error('Not a valid war3mapUnits.doo buffer');
    }

    this.version = stream.readInt32();
    this.subversion = stream.readUint32();

    for (let i = 0, l = stream.readInt32(); i < l; i++) {
      const unit = new _unit__WEBPACK_IMPORTED_MODULE_1__.default();
      unit.load(stream, this.version, this.subversion, buildVersion);
      this.units[i] = unit;
    }
  }

  save(buildVersion) {
    const stream = new _common_binarystream__WEBPACK_IMPORTED_MODULE_0__.default(new ArrayBuffer(this.getByteLength(buildVersion)));
    stream.writeBinary('W3do');
    stream.writeInt32(this.version);
    stream.writeUint32(this.subversion);
    stream.writeInt32(this.units.length);

    for (const unit of this.units) {
      unit.save(stream, this.version, this.subversion, buildVersion);
    }

    return stream.uint8array;
  }

  getByteLength(buildVersion) {
    let size = 16;

    for (const unit of this.units) {
      size += unit.getByteLength(this.version, this.subversion, buildVersion);
    }

    return size;
  }

}

/***/ }),
/* 46 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Unit)
/* harmony export */ });
/* harmony import */ var _droppeditemset__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(47);
/* harmony import */ var _inventoryitem__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(49);
/* harmony import */ var _modifiedability__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(50);
/* harmony import */ var _randomunit__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(51);




/**
 * A unit.
 */

class Unit {
  id = '\0\0\0\0';
  variation = 0;
  location = new Float32Array(3);
  angle = 0;
  scale = new Float32Array([1, 1, 1]);
  /**
   * @since Game version 1.32
   */

  skin = '\0\0\0\0';
  flags = 0;
  player = 0;
  unknown = 0;
  hitpoints = -1;
  mana = -1;
  /**
   * @since 8
   */

  droppedItemTable = 0;
  droppedItemSets = [];
  goldAmount = 0;
  targetAcquisition = 0;
  heroLevel = 0;
  /**
   * @since 8
   */

  heroStrength = 0;
  /**
   * @since 8
   */

  heroAgility = 0;
  /**
   * @since 8
   */

  heroIntelligence = 0;
  itemsInInventory = [];
  modifiedAbilities = [];
  randomFlag = 0;
  level = new Uint8Array(3);
  itemClass = 0;
  unitGroup = 0;
  positionInGroup = 0;
  randomUnitTables = [];
  customTeamColor = 0;
  waygate = 0;
  creationNumber = 0;

  load(stream, version, subversion, buildVersion) {
    this.id = stream.readBinary(4);
    this.variation = stream.readInt32();
    stream.readFloat32Array(this.location);
    this.angle = stream.readFloat32();
    stream.readFloat32Array(this.scale);

    if (buildVersion > 131) {
      this.skin = stream.readBinary(4);
    }

    this.flags = stream.readUint8();
    this.player = stream.readInt32();
    this.unknown = stream.readUint16();
    this.hitpoints = stream.readInt32();
    this.mana = stream.readInt32();

    if (subversion > 10) {
      this.droppedItemTable = stream.readInt32();
    }

    for (let i = 0, l = stream.readInt32(); i < l; i++) {
      const set = new _droppeditemset__WEBPACK_IMPORTED_MODULE_0__.default();
      set.load(stream);
      this.droppedItemSets[i] = set;
    }

    this.goldAmount = stream.readInt32();
    this.targetAcquisition = stream.readFloat32();
    this.heroLevel = stream.readInt32();

    if (subversion > 10) {
      this.heroStrength = stream.readInt32();
      this.heroAgility = stream.readInt32();
      this.heroIntelligence = stream.readInt32();
    }

    for (let i = 0, l = stream.readInt32(); i < l; i++) {
      const item = new _inventoryitem__WEBPACK_IMPORTED_MODULE_1__.default();
      item.load(stream);
      this.itemsInInventory[i] = item;
    }

    for (let i = 0, l = stream.readInt32(); i < l; i++) {
      const modifiedAbility = new _modifiedability__WEBPACK_IMPORTED_MODULE_2__.default();
      modifiedAbility.load(stream);
      this.modifiedAbilities[i] = modifiedAbility;
    }

    this.randomFlag = stream.readInt32();

    if (this.randomFlag === 0) {
      stream.readUint8Array(this.level); // 24bit number

      this.itemClass = stream.readUint8();
    } else if (this.randomFlag === 1) {
      this.unitGroup = stream.readUint32();
      this.positionInGroup = stream.readUint32();
    } else if (this.randomFlag === 2) {
      for (let i = 0, l = stream.readInt32(); i < l; i++) {
        const randomUnit = new _randomunit__WEBPACK_IMPORTED_MODULE_3__.default();
        randomUnit.load(stream);
        this.randomUnitTables[i] = randomUnit;
      }
    }

    this.customTeamColor = stream.readInt32();
    this.waygate = stream.readInt32();
    this.creationNumber = stream.readInt32();
  }

  save(stream, version, subversion, buildVersion) {
    stream.writeBinary(this.id);
    stream.writeInt32(this.variation);
    stream.writeFloat32Array(this.location);
    stream.writeFloat32(this.angle);
    stream.writeFloat32Array(this.scale);

    if (buildVersion > 131) {
      stream.writeBinary(this.skin);
    }

    stream.writeUint8(this.flags);
    stream.writeInt32(this.player);
    stream.writeUint16(this.unknown);
    stream.writeInt32(this.hitpoints);
    stream.writeInt32(this.mana);

    if (subversion > 10) {
      stream.writeInt32(this.droppedItemTable);
    }

    stream.writeInt32(this.droppedItemSets.length);

    for (const droppedItemSet of this.droppedItemSets) {
      droppedItemSet.save(stream);
    }

    stream.writeInt32(this.goldAmount);
    stream.writeFloat32(this.targetAcquisition);
    stream.writeInt32(this.heroLevel);

    if (subversion > 10) {
      stream.writeInt32(this.heroStrength);
      stream.writeInt32(this.heroAgility);
      stream.writeInt32(this.heroIntelligence);
    }

    stream.writeInt32(this.itemsInInventory.length);

    for (const itemInInventory of this.itemsInInventory) {
      itemInInventory.save(stream);
    }

    stream.writeInt32(this.modifiedAbilities.length);

    for (const modifiedAbility of this.modifiedAbilities) {
      modifiedAbility.save(stream);
    }

    stream.writeInt32(this.randomFlag);

    if (this.randomFlag === 0) {
      stream.writeUint8Array(this.level);
      stream.writeUint8(this.itemClass);
    } else if (this.randomFlag === 1) {
      stream.writeUint32(this.unitGroup);
      stream.writeUint32(this.positionInGroup);
    } else if (this.randomFlag === 2) {
      stream.writeInt32(this.randomUnitTables.length);

      for (const randomUnitTable of this.randomUnitTables) {
        randomUnitTable.save(stream);
      }
    }

    stream.writeInt32(this.customTeamColor);
    stream.writeInt32(this.waygate);
    stream.writeInt32(this.creationNumber);
  }

  getByteLength(version, subversion, buildVersion) {
    let size = 91;

    if (buildVersion > 131) {
      size += 4;
    }

    if (subversion > 10) {
      size += 16;
    }

    for (const droppedItemSet of this.droppedItemSets) {
      size += droppedItemSet.getByteLength();
    }

    size += this.itemsInInventory.length * 8;
    size += this.modifiedAbilities.length * 12;

    if (this.randomFlag === 0) {
      size += 4;
    } else if (this.randomFlag === 1) {
      size += 8;
    } else if (this.randomFlag === 2) {
      size += 4 + this.randomUnitTables.length * 8;
    }

    return size;
  }

}

/***/ }),
/* 47 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ DroppedItemSet)
/* harmony export */ });
/* harmony import */ var _droppeditem__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(48);

/**
 * A dropped item set.
 */

class DroppedItemSet {
  items = [];

  load(stream) {
    for (let i = 0, l = stream.readInt32(); i < l; i++) {
      const item = new _droppeditem__WEBPACK_IMPORTED_MODULE_0__.default();
      item.load(stream);
      this.items[i] = item;
    }
  }

  save(stream) {
    stream.writeInt32(this.items.length);

    for (const item of this.items) {
      item.save(stream);
    }
  }

  getByteLength() {
    return 4 + this.items.length * 8;
  }

}

/***/ }),
/* 48 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ DroppedItem)
/* harmony export */ });
/**
 * A dropped item.
 */
class DroppedItem {
  id = '\0\0\0\0';
  chance = 0;

  load(stream) {
    this.id = stream.readBinary(4);
    this.chance = stream.readInt32();
  }

  save(stream) {
    stream.writeBinary(this.id);
    stream.writeInt32(this.chance);
  }

}

/***/ }),
/* 49 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ InventoryItem)
/* harmony export */ });
/**
 * An inventory item.
 */
class InventoryItem {
  slot = 0;
  id = '\0\0\0\0';

  load(stream) {
    this.slot = stream.readInt32();
    this.id = stream.readBinary(4);
  }

  save(stream) {
    stream.writeInt32(this.slot);
    stream.writeBinary(this.id);
  }

}

/***/ }),
/* 50 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ModifiedAbility)
/* harmony export */ });
/**
 * A modified ability.
 */
class ModifiedAbility {
  id = '\0\0\0\0';
  activeForAutocast = 0;
  heroLevel = 1;

  load(stream) {
    this.id = stream.readBinary(4);
    this.activeForAutocast = stream.readInt32();
    this.heroLevel = stream.readInt32();
  }

  save(stream) {
    stream.writeBinary(this.id);
    stream.writeInt32(this.activeForAutocast);
    stream.writeInt32(this.heroLevel);
  }

}

/***/ }),
/* 51 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ RandomUnit)
/* harmony export */ });
/**
 * A random unit.
 */
class RandomUnit {
  id = '\0\0\0\0';
  chance = 0;

  load(stream) {
    this.id = stream.readBinary(4);
    this.chance = stream.readInt32();
  }

  save(stream) {
    stream.writeBinary(this.id);
    stream.writeInt32(this.chance);
  }

}

/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _camera__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8);
/* harmony import */ var _mapViewer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9);
/* harmony import */ var gl_matrix__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2);
/**
 * 地图查看器
 */



const handlers = ModelViewer.viewer.handlers;
const common = ModelViewer.common;
let canvas = document.getElementById('canvas');
canvas.width = 800;
canvas.height = 600; // Create the viewer!

let viewer = new ModelViewer.viewer.ModelViewer(canvas);
viewer.debugRenderMode = ModelViewer.viewer.DebugRenderMode.None; // Create a new scene. Each scene has its own camera, and a list of things to render.

let scene = viewer.addScene(); // Check camera.js!

(0,_camera__WEBPACK_IMPORTED_MODULE_0__.setupCamera)(scene, {
  distance: 1000
}).moveToAndFace(gl_matrix__WEBPACK_IMPORTED_MODULE_2__.fromValues(0, -1285.9781494140625, 1428.2235107421875), gl_matrix__WEBPACK_IMPORTED_MODULE_2__.create()); // Events.

viewer.on('loadstart', e => console.log(e));
viewer.on('load', e => console.log('load', e));
viewer.on('loadend', e => console.log('loadend', e));
viewer.on('error', e => console.log('error', e)); // Add the MDX handler.
// Note that this also loads all of the team colors/glows.
// You can optionally supply a path solver (look below) to point the viewer to the right location of the textures.
// Additionally, a boolean can be given that selects between RoC/TFT and Reforged team colors.
// For example:
//   viewer.addHandler(handlers.mdx, pathSolver); // Roc/TFT = 14 teams.
//   viewer.addHandler(handlers.mdx, pathSolver, true); // Reforged = 28 teams.
// In the case of this example, team colors aren't used, so it's fine for their loads to simply fail.

viewer.addHandler(handlers.mdx); // Add the BLP handler.

viewer.addHandler(handlers.blp); // Add the DDS handler.

viewer.addHandler(handlers.dds); // Add the TGA handler.

viewer.addHandler(handlers.tga);
document.querySelector('.controls').remove(); // @ts-ignore

window.fetch = async function (path) {
  /**
   * 优先查找resource下面的文件
   */
  const resourceBuf = await message.loadResource(path);

  if (!resourceBuf) {
    const buf = await message.loadBlp(path);
    return {
      ok: true,
      arrayBuffer: () => buf
    };
  }

  return {
    ok: true,
    arrayBuffer: () => resourceBuf
  };
};

let model = null;
let map = null;
message.load().then(({
  buf,
  ext
}) => {
  map = new _mapViewer__WEBPACK_IMPORTED_MODULE_1__.default(viewer, scene, buf); // The viewer has the update(), startFrame(), render(), and updateAndRender() functions.
  // Generally speaking, you will want a simple never ending loop like the one that follows, but who knows. The control is in your hands.

  function step(timestamp) {
    requestAnimationFrame(step);
    map.render();
  }

  requestAnimationFrame(step);
}).then(() => {
  viewer.load('war3mapImported\\HeroBlackSaber.mdx').then(v => {
    if (v) {
      model = v.addInstance();
      model.move([0, 0, 0]);
      model.setSequence(0); // Tell the instance to loop animations forever.
      // This overrides the setting in the model itself.

      model.setSequenceLoopMode(2);
      model.setScene(scene);
      console.info(`model`, model);
    }

    ;
  });
});
const ray = new Float32Array(6);
canvas.addEventListener('click', e => {
  const {
    x,
    y
  } = canvas.getBoundingClientRect();
  console.info(e.clientX - x, e.clientY - y);
  scene.camera.screenToWorldRay(ray, [e.clientX - x, e.clientY - y], scene.viewport);
  const a = gl_matrix__WEBPACK_IMPORTED_MODULE_2__.fromValues(ray[0], ray[1], ray[2]);
  const b = gl_matrix__WEBPACK_IMPORTED_MODULE_2__.fromValues(ray[3], ray[4], ray[5]);
  const z = gl_matrix__WEBPACK_IMPORTED_MODULE_2__.fromValues(0, 0, 0);
  const n = gl_matrix__WEBPACK_IMPORTED_MODULE_2__.fromValues(0, 0, 1);
  gl_matrix__WEBPACK_IMPORTED_MODULE_2__.normalize(b, gl_matrix__WEBPACK_IMPORTED_MODULE_2__.sub(b, b, a));
  const t = gl_matrix__WEBPACK_IMPORTED_MODULE_2__.dot(z, n) - gl_matrix__WEBPACK_IMPORTED_MODULE_2__.dot(a, n) / gl_matrix__WEBPACK_IMPORTED_MODULE_2__.dot(b, n);
  gl_matrix__WEBPACK_IMPORTED_MODULE_2__.add(a, a, gl_matrix__WEBPACK_IMPORTED_MODULE_2__.scale(b, b, t));

  if (map) {
    const column = Math.floor((a[0] - map.centerOffset[0]) / 128);
    const row = Math.floor((a[1] - map.centerOffset[1]) / 128);
    const corner = map.corners[row][column];
    console.info(corner);
    const height = corner.groundHeight + corner.layerHeight - 2;
    a[2] = height * 128;
    map.selX = column;
    map.selY = row;
    console.info(a[0] - map.centerOffset[0], a[1] - map.centerOffset[1]);
  }

  if (model) {
    model.setLocation(a);
  }

  console.info(a[0] % 128, a[1] % 128);
  console.info(a, scene.camera.location);
});
})();

module.exports = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=mapPreview.js.map