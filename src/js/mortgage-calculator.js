export default function calculate(P, r, n) {
    if (r > 1) r = r/100;
    const a = r/12;
    const b = (1 + a)**n;
    const c = P*a*b;
    const d = b - 1;
    return c/d;
}