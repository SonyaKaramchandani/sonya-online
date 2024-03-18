<script lang="ts">
	import { Curtains, Plane, ShaderPass } from 'curtainsjs';
	import { TextTexture } from '../utils/textTexture';
	import { onMount } from 'svelte';

	const scrollFs = `
    #ifdef GL_FRAGMENT_PRECISION_HIGH
    precision highp float;
    #else
    precision mediump float;
    #endif

    varying vec3 vVertexPosition;
    varying vec2 vTextureCoord;

    uniform sampler2D uRenderTexture;

    // lerped scroll deltas
    // negative when scrolling down, positive when scrolling up
    uniform float uScrollEffect;

    // default to 2.5
    uniform float uScrollStrength;


    void main() {
        vec2 scrollTextCoords = vTextureCoord;
        float horizontalStretch;

        // branching on an uniform is ok
        if(uScrollEffect >= 0.0) {
            scrollTextCoords.y *= 1.0 + -uScrollEffect * 0.00625 * uScrollStrength;
            horizontalStretch = sin(scrollTextCoords.y);
        }
        else if(uScrollEffect < 0.0) {
            scrollTextCoords.y += (scrollTextCoords.y - 1.0) * uScrollEffect * 0.00625 * uScrollStrength;
            horizontalStretch = sin(-1.0 * (1.0 - scrollTextCoords.y));
        }

        scrollTextCoords.x = scrollTextCoords.x * 2.0 - 1.0;
        scrollTextCoords.x *= 1.0 + uScrollEffect * 0.0035 * horizontalStretch * uScrollStrength;
        scrollTextCoords.x = (scrollTextCoords.x + 1.0) * 0.5;

        gl_FragColor = texture2D(uRenderTexture, scrollTextCoords);
    }
`;

	const vs = `
    #ifdef GL_FRAGMENT_PRECISION_HIGH
    precision highp float;
    #else
    precision mediump float;
    #endif

    // default mandatory variables
    attribute vec3 aVertexPosition;
    attribute vec2 aTextureCoord;

    uniform mat4 uMVMatrix;
    uniform mat4 uPMatrix;

    // custom variables
    varying vec3 vVertexPosition;
    varying vec2 vTextureCoord;

    void main() {
        gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);

        // varyings
        vVertexPosition = aVertexPosition;
        vTextureCoord = aTextureCoord;
    }
`;

	const fs = `
    #ifdef GL_FRAGMENT_PRECISION_HIGH
    precision highp float;
    #else
    precision mediump float;
    #endif

    varying vec3 vVertexPosition;
    varying vec2 vTextureCoord;

    uniform sampler2D uTexture;

    void main( void ) {
        gl_FragColor = texture2D(uTexture, vTextureCoord);
    }
`;
	onMount(() => {
		window.addEventListener('load', () => {
			// create curtains instance
			const curtains = new Curtains({
				container: 'canvas',
				pixelRatio: Math.min(1.5, window.devicePixelRatio)
			});

			// track scroll values
			const scroll = {
				value: 0,
				lastValue: 0,
				effect: 0,
				delta: 0
			};

			// on success
			curtains.onSuccess(() => {
				const fonts = {
					list: ['normal 300 1em "Neue Montreal", sans-serif', 'normal 800 1em "Pangaia", serif'],
					loaded: 0
				};

				// load the fonts first
				fonts.list.forEach((font) => {
					document.fonts.load(font).then(() => {
						fonts.loaded++;

						if (fonts.loaded === fonts.list.length) {
							// create our shader pass
							const scrollPass = new ShaderPass(curtains, {
								fragmentShader: scrollFs,
								depth: false,
								uniforms: {
									scrollEffect: {
										name: 'uScrollEffect',
										type: '1f',
										value: scroll.effect
									},
									scrollStrength: {
										name: 'uScrollStrength',
										type: '1f',
										value: 2.5
									}
								}
							});

							// calculate the lerped scroll effect
							scrollPass.onRender(() => {
								scroll.lastValue = scroll.value;
								scroll.value = curtains.getScrollValues().y;

								// clamp delta
								scroll.delta = Math.max(-30, Math.min(30, scroll.lastValue - scroll.value));

								scroll.effect = curtains.lerp(scroll.effect, scroll.delta, 0.05);
								scrollPass.uniforms.scrollEffect.value = scroll.effect;
							});

							// create our text planes
							const textEls = document.querySelectorAll('.text-plane');
							textEls.forEach((textEl) => {
								const textPlane = new Plane(curtains, textEl, {
									vertexShader: vs,
									fragmentShader: fs
								});

								// create the text texture and... that's it!
								const textTexture = new TextTexture({
									plane: textPlane,
									textElement: textPlane.htmlElement,
									sampler: 'uTexture',
									resolution: 1,
									skipFontLoading: true // we've already loaded the fonts
								});
							});
						}
					});
				});
			});
		});
	});
</script>

<svelte:window />
