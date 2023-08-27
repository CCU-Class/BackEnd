const database = require('../config/database');

const model = {
    async getCourses(class_name){
        //會根據class_name的比對位置來排序 越先比對到的越前面
        let table = process.env.MYSQL_COURSE_TABLE;

        let str = `SELECT * FROM \`${table}\` where \`class_name\` like '%${class_name}%' order by \`selection_count\` DESC limit ${process.env.MYSQL_CLASSNAME_NUMBERS_LIMIT};`;
        //console.log(str);
        return new Promise((resolve, reject) => {
            database.query(str, (err, result, fields) => {
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
        let id = course.id;
        let teacher = course.teacher;
        let str = `UPDATE \`${table}\` SET \`selection_count\`=\`selection_count\`+${num} WHERE \`id\`= ${id} and \`teacher\`='${teacher}';`;
        
        console.log(`query str=${str}`);
        return new Promise((resolve, reject) => {
            database.query(str, (err, result, fields) => {
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