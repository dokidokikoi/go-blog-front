
export const getTimeStamp = () => {
    return new Date().getTime();
}

export const formatTime = (originVal) => {
    if (!originVal) return

    const dt = new Date(originVal)
    const y = (dt.getFullYear() + '').slice(0, 4)
    const m = (dt.getMonth() + 1 + '').padStart(2, '0')
    const d = (dt.getDate() + '').padStart(2, '0')
    const hh = (dt.getHours() + '').padStart(2, '0')
    const mm = (dt.getMinutes() + '').padStart(2, '0')
    const ss = (dt.getSeconds() + '').padStart(2, '0')
    return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
}

export const formatDay = (originVal) => {
    if (!originVal) return

    const dt = new Date(originVal)
    const y = (dt.getFullYear() + '').slice(0, 4)
    const m = (dt.getMonth() + 1 + '').padStart(2, '0')
    const d = (dt.getDate() + '').padStart(2, '0')
    return `${y}-${m}-${d}`
}

export const getYear = (originVal) => {
    if (!originVal) return

    const dt = new Date(originVal)
    const y = (dt.getFullYear() + '').slice(0, 4)
    return y
}

export const getMonth = (originVal) => {
    if (!originVal) return

    const dt = new Date(originVal)
    const m = (dt.getMonth() + 1 + '').padStart(2, '0')
    return m
}

export const calcDays = (originVal) => {
    const start = new Date(originVal).getTime()
    const now = new Date().getTime()

    let interval = (now - start)/1000/60/60/24
    let str = ""
    if (interval > 365) {
        let y = Math.floor(interval/365)
        interval %= 365
        str += `${y} 年`
    }
    if (interval > 30) {
        let m = Math.floor(interval/30)
        interval %= 30
        str += `${m} 个月`
    }
    if (interval > 1) {
        str += `${Math.floor(interval)} 天`
    }
    
    return str
}