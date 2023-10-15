export const textLimit = (num, text) => {
    let textNum = 100
    if (num) {
        textNum = num
    }

    if (text.length > textNum) {
        text = text.Slice(0, textNum)+"..."
    }
    return text
} 