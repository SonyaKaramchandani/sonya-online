export const MathUtils = {
	lineEq: (y2: number, y1: number, x2: number, x1: number, currentVal: number) => {
		// y = mx + b
		var m = (y2 - y1) / (x2 - x1),
			b = y1 - m * x1;
		return m * currentVal + b;
	},
	lerp: (a: number, b: number, n: number) => (1 - n) * a + n * b,
	distance: (x1: number, x2: number, y1: number, y2: number) => {
		var a = x1 - x2;
		var b = y1 - y2;
		return Math.hypot(a, b);
	}
};
