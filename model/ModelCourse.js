const database = require('../config/database');

const model = {
    async getCourses(class_name){
        //會根據class_name的比對位置來排序 越先比對到的越前面
        let table = process.env.MYSQL_COURSE_TABLE;
        let limit = Number(process.env.MYSQL_CLASSNAME_NUMBERS_LIMIT);
        //let str = `SELECT * FROM \`${table}\` where \`class_name\` like '%${class_name}%' order by \`selection_count\` DESC limit ${process.env.MYSQL_CLASSNAME_NUMBERS_LIMIT};`;
        let str = "select * from ?? where \`class_name\` like concat('%', ?, '%') order by \`selection_count\` desc limit ?;";
        //console.log(str);
        return new Promise((resolve, reject) => {
            database.query(str, [table, class_name,limit], (err, result, fields) => {
                if (err) {
                    console.log(err);
                    reject(err);
                } else {
                    //console.log(result);
                    resolve(result);
                }
            });
        });
    },
    async updateSelectionCount(course, num){
        let table = process.env.MYSQL_COURSE_TABLE;
        let id = Number(course.id);
        let teacher = course.teacher;
        //let str = `UPDATE \`${table}\` SET \`selection_count\`=\`selection_count\`+${num} WHERE \`id\`= ${id} and \`teacher\`='${teacher}';`;
        let str = "update ?? set `selection_count` = \`selection_count\` + ? where \`id\`=? and \`teacher\`=?;";
        console.log(`query str=${str}`);
        return new Promise((resolve, reject) => {
            database.query(str, [table, num, id, teacher], (err, result, fields) => {
                if (err) {
                    console.log(err);
                    reject(false);
                } else {
                    //console.log(`update result: ${result}`);    
                    resolve(true);
                }
            });
        });
    }
}

module.exports = model;