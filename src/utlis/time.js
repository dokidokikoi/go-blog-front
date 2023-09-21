
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