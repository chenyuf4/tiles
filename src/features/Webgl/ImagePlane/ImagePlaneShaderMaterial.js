import { ShaderMaterial } from "three";
import { extend } from "@react-three/fiber";
import {
  IMAGE_BLOCK_HEIGHT,
  IMAGE_BLOCK_WIDTH,
  IMAGE_DIMENSION,
} from "utils/format";

class ImagePlaneShaderMaterial extends ShaderMaterial {
  constructor() {
    super({
      vertexShader: `
      #define PI 3.1415926535897932384626433832795
      varying vec2 vUv;
      uniform float uStrength;
      uniform float boundary;
      varying float zOffset;
      float i(float m){
        return m<.5?2.*m*m:-1.+(4.-2.*m)*m;
      }
      void main() {
        vec4 j=modelViewMatrix*vec4(position.xy,0.,1.);
        float z=0.;
        float k=abs(distance(j.x,0.));
        if(k<boundary){
          z=(boundary-i(k/boundary)*boundary)*uStrength;
        }
        gl_Position=projectionMatrix * vec4(j.xy,j.z+z,j.w);
        vUv = uv;
        zOffset = min(z * 0.5, 0.7);
      }`,
      fragmentShader: `
      uniform sampler2D tex;
      varying vec2 vUv;
      uniform vec2 planeDimension;
      varying float zOffset;
      void main() {
        vec4 s = vec4(0.07843, 0.07843, 0.07843, 1.);
        float x = vUv.x;
        float y = vUv.y;
        vec4 imageTexture = texture2D(tex, vec2((x - 0.5) * planeDimension.x + 0.5, (y - 0.5) * planeDimension.y + 0.5));
        float greyColor = (imageTexture.r + imageTexture.g + imageTexture.b) / 5.0;
        vec4 res = mix(vec4(greyColor,greyColor,greyColor,1.), imageTexture, zOffset + 0.1);
        res = mix(res, res * s, 0.);
        gl_FragColor = res;
      }`,
      uniforms: {
        tex: { value: null },
        uStrength: { value: 0 },
        boundary: { value: 0 },
        planeDimension: {
          value: [
            ((IMAGE_BLOCK_WIDTH / IMAGE_BLOCK_HEIGHT) *
              IMAGE_DIMENSION.height) /
              IMAGE_DIMENSION.width,
            1,
          ],
        },
      },
    });
  }

  set tex(value) {
    this.uniforms.tex.value = value;
  }

  get tex() {
    return this.uniforms.tex.value;
  }

  set uStrength(value) {
    this.uniforms.uStrength.value = value;
  }

  get uStrength() {
    return this.uniforms.uStrength.value;
  }

  set boundary(value) {
    this.uniforms.boundary.value = value;
  }

  get boundary() {
    return this.uniforms.boundary.value;
  }

  get planeDimension() {
    return this.uniforms.planeDimension.value;
  }

  set planeDimension(value) {
    this.uniforms.planeDimension.value = value;
  }
}

extend({ ImagePlaneShaderMaterial });
//vertex: "precision highp float;
// attribute vec2 a;
// attribute vec2 b;
// varying vec2 c;
// varying float d;
// uniform mat4 e;
// uniform mat4 f;
// uniform float g;
// uniform float h;
// float i(float m){return m<.5?2.*m*m:-1.+(4.-2.*m)*m;}
// void main(){
//   vec4 j=f*vec4(a,0.,1.);
//   float z=0.;
//   float k=abs(distance(j.x,0.));
//   if(k<h){
//     z=(h-i(k/h)*h)*g;
//   }
//   gl_Position=e*vec4(j.xy,j.z+z,j.w);c=b;d=min(z*.005,0.7);
// }",
//fragment: "precision highp float;
//varying float d;
//varying vec2 c;
//uniform sampler2D tex;
//uniform vec2 m;
// /
