class Mathf {
    static Clamp(min: number, max: number, value: number): number {
        if (value < min) {
            return min
        }
        else if (value > max) {
            return max
        }
        else {
            return value
        }
    }

    static Lerp(a: number, b: number, weight: number) {
        return a + (b - a) * weight
    }

    /**
     * 转化为弧度
     */
    static Rad(d: number) {
        return d * this.Deg2Rad
    }

    /**
     * 转化为角度
     */
    static Deg(r: number) {
        return r * this.Rad2Deg
    }

    static Deg2Rad = 0.017453292;

    static Rad2Deg = 57.29578;
}

export { Mathf }