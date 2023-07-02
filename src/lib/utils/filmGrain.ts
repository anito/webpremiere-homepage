import {
	S as E,
	i as T,
	s as y,
	k as M,
	l as L,
	m as B,
	h as m,
	n as g,
	K as v,
	b as k,
	J as w,
	o as A
} from './index.8e2abd4b.js';
import {
	O as D,
	B as z,
	F as S,
	M as U,
	a as C,
	U as F,
	V as _,
	b as W,
	H,
	c as O,
	C as Q,
	S as V,
	d as G,
	W as K
} from './three.module.f439ee88.js';
const I = {
	name: 'CopyShader',
	uniforms: {
		tDiffuse: {
			value: null
		},
		opacity: {
			value: 1
		}
	},
	vertexShader: `

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,
	fragmentShader: `

		uniform float opacity;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			gl_FragColor = texture2D( tDiffuse, vUv );
			gl_FragColor.a *= opacity;


		}`
};
class f {
	constructor() {
		(this.isPass = !0),
			(this.enabled = !0),
			(this.needsSwap = !0),
			(this.clear = !1),
			(this.renderToScreen = !1);
	}
	setSize() {}
	render() {
		console.error('THREE.Pass: .render() must be implemented in derived pass.');
	}
	dispose() {}
}
const j = new D(-1, 1, 1, -1, 0, 1),
	u = new z();
u.setAttribute('position', new S([-1, 3, 0, -1, -1, 0, 3, -1, 0], 3));
u.setAttribute('uv', new S([0, 2, 0, 0, 2, 0], 2));
class $ {
	constructor(e) {
		this._mesh = new U(u, e);
	}
	dispose() {
		this._mesh.geometry.dispose();
	}
	render(e) {
		e.render(this._mesh, j);
	}
	get material() {
		return this._mesh.material;
	}
	set material(e) {
		this._mesh.material = e;
	}
}
class b extends f {
	constructor(e, t) {
		super(),
			(this.textureID = t !== void 0 ? t : 'tDiffuse'),
			e instanceof C
				? ((this.uniforms = e.uniforms), (this.material = e))
				: e &&
				  ((this.uniforms = F.clone(e.uniforms)),
				  (this.material = new C({
						name: e.name !== void 0 ? e.name : 'unspecified',
						defines: Object.assign({}, e.defines),
						uniforms: this.uniforms,
						vertexShader: e.vertexShader,
						fragmentShader: e.fragmentShader
				  }))),
			(this.fsQuad = new $(this.material));
	}
	render(e, t, i) {
		this.uniforms[this.textureID] && (this.uniforms[this.textureID].value = i.texture),
			(this.fsQuad.material = this.material),
			this.renderToScreen
				? (e.setRenderTarget(null), this.fsQuad.render(e))
				: (e.setRenderTarget(t),
				  this.clear && e.clear(e.autoClearColor, e.autoClearDepth, e.autoClearStencil),
				  this.fsQuad.render(e));
	}
	dispose() {
		this.material.dispose(), this.fsQuad.dispose();
	}
}
class x extends f {
	constructor(e, t) {
		super(),
			(this.scene = e),
			(this.camera = t),
			(this.clear = !0),
			(this.needsSwap = !1),
			(this.inverse = !1);
	}
	render(e, t, i) {
		const a = e.getContext(),
			s = e.state;
		s.buffers.color.setMask(!1),
			s.buffers.depth.setMask(!1),
			s.buffers.color.setLocked(!0),
			s.buffers.depth.setLocked(!0);
		let r, o;
		this.inverse ? ((r = 0), (o = 1)) : ((r = 1), (o = 0)),
			s.buffers.stencil.setTest(!0),
			s.buffers.stencil.setOp(a.REPLACE, a.REPLACE, a.REPLACE),
			s.buffers.stencil.setFunc(a.ALWAYS, r, 4294967295),
			s.buffers.stencil.setClear(o),
			s.buffers.stencil.setLocked(!0),
			e.setRenderTarget(i),
			this.clear && e.clear(),
			e.render(this.scene, this.camera),
			e.setRenderTarget(t),
			this.clear && e.clear(),
			e.render(this.scene, this.camera),
			s.buffers.color.setLocked(!1),
			s.buffers.depth.setLocked(!1),
			s.buffers.stencil.setLocked(!1),
			s.buffers.stencil.setFunc(a.EQUAL, 1, 4294967295),
			s.buffers.stencil.setOp(a.KEEP, a.KEEP, a.KEEP),
			s.buffers.stencil.setLocked(!0);
	}
}
class q extends f {
	constructor() {
		super(), (this.needsSwap = !1);
	}
	render(e) {
		e.state.buffers.stencil.setLocked(!1), e.state.buffers.stencil.setTest(!1);
	}
}
class N {
	constructor(e, t) {
		if (((this.renderer = e), (this._pixelRatio = e.getPixelRatio()), t === void 0)) {
			const i = e.getSize(new _());
			(this._width = i.width),
				(this._height = i.height),
				(t = new W(this._width * this._pixelRatio, this._height * this._pixelRatio, {
					type: H
				})),
				(t.texture.name = 'EffectComposer.rt1');
		} else (this._width = t.width), (this._height = t.height);
		(this.renderTarget1 = t),
			(this.renderTarget2 = t.clone()),
			(this.renderTarget2.texture.name = 'EffectComposer.rt2'),
			(this.writeBuffer = this.renderTarget1),
			(this.readBuffer = this.renderTarget2),
			(this.renderToScreen = !0),
			(this.passes = []),
			(this.copyPass = new b(I)),
			(this.clock = new O());
	}
	swapBuffers() {
		const e = this.readBuffer;
		(this.readBuffer = this.writeBuffer), (this.writeBuffer = e);
	}
	addPass(e) {
		this.passes.push(e), e.setSize(this._width * this._pixelRatio, this._height * this._pixelRatio);
	}
	insertPass(e, t) {
		this.passes.splice(t, 0, e),
			e.setSize(this._width * this._pixelRatio, this._height * this._pixelRatio);
	}
	removePass(e) {
		const t = this.passes.indexOf(e);
		t !== -1 && this.passes.splice(t, 1);
	}
	isLastEnabledPass(e) {
		for (let t = e + 1; t < this.passes.length; t++) if (this.passes[t].enabled) return !1;
		return !0;
	}
	render(e) {
		e === void 0 && (e = this.clock.getDelta());
		const t = this.renderer.getRenderTarget();
		let i = !1;
		for (let a = 0, s = this.passes.length; a < s; a++) {
			const r = this.passes[a];
			if (r.enabled !== !1) {
				if (
					((r.renderToScreen = this.renderToScreen && this.isLastEnabledPass(a)),
					r.render(this.renderer, this.writeBuffer, this.readBuffer, e, i),
					r.needsSwap)
				) {
					if (i) {
						const o = this.renderer.getContext(),
							h = this.renderer.state.buffers.stencil;
						h.setFunc(o.NOTEQUAL, 1, 4294967295),
							this.copyPass.render(this.renderer, this.writeBuffer, this.readBuffer, e),
							h.setFunc(o.EQUAL, 1, 4294967295);
					}
					this.swapBuffers();
				}
				x !== void 0 && (r instanceof x ? (i = !0) : r instanceof q && (i = !1));
			}
		}
		this.renderer.setRenderTarget(t);
	}
	reset(e) {
		if (e === void 0) {
			const t = this.renderer.getSize(new _());
			(this._pixelRatio = this.renderer.getPixelRatio()),
				(this._width = t.width),
				(this._height = t.height),
				(e = this.renderTarget1.clone()),
				e.setSize(this._width * this._pixelRatio, this._height * this._pixelRatio);
		}
		this.renderTarget1.dispose(),
			this.renderTarget2.dispose(),
			(this.renderTarget1 = e),
			(this.renderTarget2 = e.clone()),
			(this.writeBuffer = this.renderTarget1),
			(this.readBuffer = this.renderTarget2);
	}
	setSize(e, t) {
		(this._width = e), (this._height = t);
		const i = this._width * this._pixelRatio,
			a = this._height * this._pixelRatio;
		this.renderTarget1.setSize(i, a), this.renderTarget2.setSize(i, a);
		for (let s = 0; s < this.passes.length; s++) this.passes[s].setSize(i, a);
	}
	setPixelRatio(e) {
		(this._pixelRatio = e), this.setSize(this._width, this._height);
	}
	dispose() {
		this.renderTarget1.dispose(), this.renderTarget2.dispose(), this.copyPass.dispose();
	}
}
class J extends f {
	constructor(e, t, i, a, s) {
		super(),
			(this.scene = e),
			(this.camera = t),
			(this.overrideMaterial = i),
			(this.clearColor = a),
			(this.clearAlpha = s !== void 0 ? s : 0),
			(this.clear = !0),
			(this.clearDepth = !1),
			(this.needsSwap = !1),
			(this._oldClearColor = new Q());
	}
	render(e, t, i) {
		const a = e.autoClear;
		e.autoClear = !1;
		let s, r;
		this.overrideMaterial !== void 0 &&
			((r = this.scene.overrideMaterial), (this.scene.overrideMaterial = this.overrideMaterial)),
			this.clearColor &&
				(e.getClearColor(this._oldClearColor),
				(s = e.getClearAlpha()),
				e.setClearColor(this.clearColor, this.clearAlpha)),
			this.clearDepth && e.clearDepth(),
			e.setRenderTarget(this.renderToScreen ? null : i),
			this.clear && e.clear(e.autoClearColor, e.autoClearDepth, e.autoClearStencil),
			e.render(this.scene, this.camera),
			this.clearColor && e.setClearColor(this._oldClearColor, s),
			this.overrideMaterial !== void 0 && (this.scene.overrideMaterial = r),
			(e.autoClear = a);
	}
}
function Y(n) {
	let e;
	return {
		c() {
			(e = M('div')), this.h();
		},
		l(t) {
			(e = L(t, 'DIV', {
				id: !0,
				class: !0
			})),
				B(e).forEach(m),
				this.h();
		},
		h() {
			g(e, 'id', 'fg-canvas'),
				g(e, 'class', 'transition-opacity duration-1000 ease-in-out opacity-0'),
				v(e, 'loaded', n[0]);
		},
		m(t, i) {
			k(t, e, i);
		},
		p(t, [i]) {
			i & 1 && v(e, 'loaded', t[0]);
		},
		i: w,
		o: w,
		d(t) {
			t && m(e);
		}
	};
}
function X(n, e, t) {
	let i = !1;
	const a = `varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix 
      * modelViewMatrix 
      * vec4( position, 1.0 );
  }`,
		s = `uniform float amount;
  uniform sampler2D tDiffuse;
  varying vec2 vUv;

  float random( vec2 p )
  {
    vec2 K1 = vec2(
      23.14069263277926, // e^pi (Gelfond's constant)
      2.665144142690225 // 2^sqrt(2) (Gelfondâ€“Schneider constant)
    );
    return fract( cos( dot(p,K1) ) * 121345.6789 );
  }

  void main() {
	vec4 color = vec4(.3, .35, .4, 0.5); // color here: r, g, b, a. 
		// Note the alpha doesn't work as you might expect. I recommend leaving it
		color.r *= random(vUv * (amount + 12.123));
		color.g *= random(vUv * (amount + 11.913));
		color.b *= random(vUv * (amount + 8.19));
		color.a *= random(vUv * (amount + 6.6));
		// *= vec4() * 0.2; // old intensity
    gl_FragColor = color; 
  }`;
	return (
		A(() => {
			const r = new V(),
				o = new G(75, window.innerWidth / window.innerHeight, 0.1, 1e3),
				h = new K({
					alpha: !0
				});
			h.setSize(window.innerWidth, window.innerHeight),
				document.getElementById('fg-canvas').appendChild(h.domElement);
			let l = new N(h),
				P = new J(r, o);
			l.addPass(P),
				window.addEventListener('resize', () => {
					(o.aspect = window.innerWidth / window.innerHeight),
						o.updateProjectionMatrix(),
						h.setSize(window.innerWidth, window.innerHeight),
						l.setSize(window.innerWidth, window.innerHeight);
				});
			let c = 0,
				R = {
					uniforms: {
						tDiffuse: {
							value: null
						},
						amount: {
							value: c
						}
					},
					vertexShader: a,
					fragmentShader: s
				},
				d = new b(R);
			(d.renderToScreen = !0), l.addPass(d), p();
			function p() {
				i ||
					setTimeout(() => {
						t(0, (i = !0));
					}, 0),
					requestAnimationFrame(p),
					(c += 0.01),
					(d.uniforms.amount.value = c),
					l.render();
			}
		}),
		[i]
	);
}
class te extends E {
	constructor(e) {
		super(), T(this, e, X, Y, y, {});
	}
}
export { te as default };
