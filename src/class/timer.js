export default class Timer {
  constructor () {
    this.interval = null
    this.lastTime = ''
    this.clears()
  }
  countDown (end, update, handle) {
    let now = new Date().getTime()
    // console.log(now, 'now')
    if (end - now < 1000) {
      this.clears()
      handle('00:00')
    } else {
      this.lastTime = end - now
      const pxD = 24 * 60 * 60 * 1000
      const pxH = 60 * 60 * 1000
      const pxM = 60 * 1000
      const pxS = 1000
      let d = Math.floor(this.lastTime / pxD)
      let h = Math.floor((this.lastTime - d * pxD) / pxH)
      let m = Math.floor((this.lastTime - d * pxD - h * pxH) / pxM)
      let s = Math.floor((this.lastTime - d * pxD - h * pxH - m * pxM) / pxS)
      m = this._padStart0(m)
      s = this._padStart0(s)
      // s = parseInt(s)
      let r = []
      if (d > 0) {
        r.push(`${d}`)
      }
      if (h > 0 || r.length) {
        r.push(`${h}`)
      }
      if (m > 0 || r.length) {
        r.push(`${m}:`)
      }
      if (s > 0 || r.length) {
        r.push(`${s}`)
      }
      if (this.lastTime <= 0) {
        update('00:00')
        this.clears()
        return
        // clearInterval(interval)
      }
      this.lastTime = r.join('')
      update(r.join(''))
      this.interval = setTimeout(() => {
        this.countDown(end, update, handle)
      }, 1000)
    }
  }
  _padStart0 (s) {
    s = s.toString()
    s = s.padStart(2, '0')
    return s
  }
  clears () {
    clearTimeout(this.interval)
  }
}
