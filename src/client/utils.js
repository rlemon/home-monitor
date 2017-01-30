export function easeInCubicTiming(t,b,c,d) {
	return c*(t/=d)*t*t + b;
}