class Time {
    static GetTime(e: Date | string | number | null = null, isForce = true, l = '-', r = ':') {
        let time = e ? new Date(e) : new Date()
        let year = time.getFullYear()
        let month = time.getMonth() + 1
        let day = time.getDate()
        let hours = time.getHours()
        let minutes = time.getMinutes()
        let seconds = time.getSeconds()
        if (isForce) {
            return year + l + this.FormatZero(month) + l + this.FormatZero(day) + ' ' + this.FormatZero(hours) + r + this.FormatZero(minutes) + r + this.FormatZero(seconds)
        }
        else {
            return year + l + this.FormatZero(month) + l + this.FormatZero(day)
        }

    }

    static FormatZero(n: number) {
        if (n >= 0 && n <= 9) {
            return '0' + n
        } else {
            return n
        }
    }

    static GenerateRandomUid() {
        return 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx'.replace(/[x]/g, function (c) {
            let r = Math.random() * 16 | 0
            let v = c == 'x' ? r : (r & 0x3 | 0x8)
            return v.toString(16)
        })
    }

    static GenerateRandomColor() {
        return '#' + ('00000' + (Math.random() * 0x1000000 << 0).toString(16)).substr(-6);
    }
}

export { Time }
