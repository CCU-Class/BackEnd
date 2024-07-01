var regex = new RegExp("^[\u4E00-\u9FA5A-Za-z0-9]+$");

function checkChineseEnglishNum(str){
    return regex.test(str);
}
function checkEnglish(str){
    return /^[A-Za-z]+$/.test(str);
}
function checkCourseTable(str){
    // return format `course${year}_${semester}`
    return /^course\d+_\d+$/;

}

//檢測是否為數字
function checkNum(str){
    return /^\d+$/.test(str);
}
module.exports = {
    checkChineseEnglishNum: checkChineseEnglishNum,
    checkNum: checkNum,
    checkCourseTable: checkCourseTable,
}