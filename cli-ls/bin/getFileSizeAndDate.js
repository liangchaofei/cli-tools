module.exports = function getFileSizeAndDate(stat){
    const { mtimeMs, size  } = stat;
    const birthTime = new Date(mtimeMs)
    const month = birthTime.getMonth() + 1;
    const date = birthTime.getDate();
    const hour = birthTime.getHours();
    const minute = birthTime.getMinutes();

    return size + ' '+month + '月  ' + date + ' ' + hour + ' ' + minute;
}