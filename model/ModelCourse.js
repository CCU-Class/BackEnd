const database = require('../config/database');
const time = require('../functions/time');
const { v4: uuidv4 } = require('uuid');

const model = {
    async getCourses(class_name, courseTable){
        //會根據class_name的比對位置來排序 越先比對到的越前面
        let table = courseTable || process.env.MYSQL_COURSE_TABLE;
        let limit = Number(process.env.MYSQL_CLASSNAME_NUMBERS_LIMIT);
        //let str = `SELECT * FROM \`${table}\` where \`class_name\` like '%${class_name}%' order by \`selection_count\` DESC limit ${process.env.MYSQL_CLASSNAME_NUMBERS_LIMIT};`;
        let str = "select * from ?? where  \`class_name\` like concat('%', ?, '%') AND `deprecated` = 0 order by \`selection_count\` desc limit ?;";
        //console.log(str);
        return new Promise((resolve, reject) => {
            database.query(str, [table, class_name,limit], (err, result, fields) => {
                if (err) {
                    console.log(err);
                    // reject(err);
                    resolve([]);
                } else {
                    //console.log(result);
                    resolve(result);
                }
            });
        });
    },
    async updateSelectionCount(course, num, courseTable){
        let table = courseTable || process.env.MYSQL_COURSE_TABLE;
        let id = Number(course.id);
        let teacher = course.teacher;
        //let str = `UPDATE \`${table}\` SET \`selection_count\`=\`selection_count\`+${num} WHERE \`id\`= ${id} and \`teacher\`='${teacher}';`;
        let str = "update ?? set `selection_count` = \`selection_count\` + ? where \`id\`=? and \`teacher\`=?;";
        console.log(`query str=${str}`);
        return new Promise((resolve, reject) => {
            database.query(str, [table, num, id, teacher], (err, result, fields) => {
                if (err) {
                    console.log(err);
                    resolve(false);
                } else {
                    //console.log(`update result: ${result}`);    
                    resolve(true);
                }
            });
        });
    },
    async getCoursesByDay(day, courseTable){
        //會根據class_name的比對位置來排序 越先比對到的越前面
        let table = courseTable || process.env.MYSQL_COURSE_TABLE;
        let limit = Number(process.env.MYSQL_CLASSNAME_NUMBERS_LIMIT);
        let weekday = {
            1 : "一",
            2 : "二",
            3 : "三",
            4 : "四",
            5 : "五",
            6 : "六"
        }
        let str = "select * from ?? where  \`class_time\` like concat('%', ?, '%') AND `deprecated` = 0 order by \`selection_count\` desc limit ?;";
        //console.log(str);
        return new Promise((resolve, reject) => {
            database.query(str, [table, weekday[day],limit], (err, result, fields) => {
                if (err) {
                    console.log(err);
                    // reject(err);
                    resolve([]);
                } else {
                    resolve(result);
                }
            });
        });
    },
    async getCoursesByTime(day, start, end, courseTable){
        //會根據class_name的比對位置來排序 越先比對到的越前面
        let array = await this.getCoursesByDay(day,courseTable);
        let classArray = [];
        for (let index = 0; index < array.length; index++) {
            const TimeString = array[index]['class_time'];
            const classtime = time.splittime(TimeString);
            for(let j = 0; j < classtime.length; j++){
                if(classtime[j][0] != day) continue;
                if(classtime[j][1] >= start && classtime[j][2] <= end){
                    classArray.push(array[index]);
                    break;
                }
            }
        }
        return classArray;
    },
    async getCoursesByTeacher(Teacher, courseTable){
        //會根據class_name的比對位置來排序 越先比對到的越前面
        let table = courseTable || process.env.MYSQL_COURSE_TABLE;
        let limit = Number(process.env.MYSQL_CLASSNAME_NUMBERS_LIMIT);
        
        let str = "select * from ?? where  \`teacher\` like concat('%', ?, '%') AND `deprecated` = 0 order by \`selection_count\` desc limit ?;";
        //console.log(str);
        return new Promise((resolve, reject) => {
            database.query(str, [table, Teacher,limit], (err, result, fields) => {
                if (err) {
                    console.log(err);
                    resolve([]);
                } else {
                    //console.log(result);
                    resolve(result);
                }
            });
        });
    },
    async getCourseByDepartment(department, courseTable){
        console.log("model", department)
        let table = courseTable || process.env.MYSQL_COURSE_TABLE;
        let limit = Number(process.env.MYSQL_CLASSNAME_NUMBERS_LIMIT);
        let str = "select * from ?? where  \`department\` like concat('%', ?, '%') AND `deprecated` = 0 order by \`id\` asc limit ?;";
        return new Promise((resolve, reject) => {
            database.query(str, [table, department,limit], (err, result, fields) => {
                if (err) {
                    console.log(err);
                    // reject(err);
                    resolve([]);
                } else {
                    // console.log(result);
                    resolve(result);
                }
            });
        });
    }, 
    async getCourseByDepartmentAndGrade(department, grade, courseTable){
        let table = courseTable || process.env.MYSQL_COURSE_TABLE;
        let limit = Number(process.env.MYSQL_CLASSNAME_NUMBERS_LIMIT);
        let str = "select * from ?? where  \`department\` like concat('%', ?, '%') and \`grade\` like concat('%', ?, '%')  AND `deprecated` = 0 order by \`selection_count\` desc limit ?;";
        return new Promise((resolve, reject) => {
            database.query(str, [table, department, grade,limit], (err, result, fields) => {
                if (err) {
                    console.log(err);
                    // reject(err);
                    resolve([]);
                } else {
                    //console.log(result);
                    resolve(result);
                }
            });
        });
        
    }, 
    async getGradeByDepartment(department, courseTable){
        let table = courseTable || process.env.MYSQL_COURSE_TABLE;
        let limit = Number(process.env.MYSQL_CLASSNAME_NUMBERS_LIMIT);
        let str = "select distinct grade from ?? where \`department\` = ?";
        return new Promise((resolve, reject) => {
            database.query(str, [table, department], (err, result, fields) => {
                if (err) {
                    console.log(err);
                    // reject(err);
                    resolve([]);
                } else {
                    console.log(result);
                    resolve(result);
                }
            });
        });
    },
    async getDepartment(courseTable){
        let table = courseTable || process.env.MYSQL_COURSE_TABLE;
        let str = "SELECT DISTINCT department FROM ??";
        return new Promise((resolve, reject) => {
            database.query(str, [table], (err, result, fields) => {
                if (err) {
                    console.log(err);
                    // reject(err);
                    resolve([]);
                    
                } else {
                    let data = []
                    for (const item of result) data.push(item['department'])
                    resolve(data);
                }
            });
        });
    },
    async getDepartmentByOther(id, class_name, teacher, class_room, credit, courseTable){
        let table = courseTable || process.env.MYSQL_COURSE_TABLE;
        let str = "select department from ?? where  \`id\` = ? and \`class_name\` = ? and \`teacher\` = ? and \`class_room\` = ? and \`credit\` = ?;";
        return new Promise(function(resolve, reject){
            database.query(str, [table, id, class_name,teacher,class_room, credit], function(err,result, fields){
                // console.log(fields);
                if(err){
                    console.log(err);
                    resolve([]);
                }
                else{
                    
                    resolve(result);
                }
            });
        });
    },
    async getGradeByOther(id, class_name, teacher, class_room, credit, courseTable){
        let table = courseTable || process.env.MYSQL_COURSE_TABLE;
        let str = "select grade from ?? where  \`id\` = ? and \`class_name\` = ? and \`teacher\` = ? and \`class_room\` = ? and \`credit\` = ?;"
        return new Promise(function(resolve, reject){
            database.query(str, [table, id, class_name,teacher,class_room, credit], function(err,result, fields){
                if(err){
                    console.log(err);
                    resolve([]);
                }else{
                    resolve(result);
                }
            });
        });
    },
    async saveCourseRecord(data){
        let str = "INSERT INTO `course_table_save_file`(`uuid`, `json_data`) VALUES (?,?);";
        let uuid = uuidv4();
        return new Promise(function(resolve, reject){
            database.query(str, [uuid, data], function(err,result, fields){
                if(err){
                    console.log(err);
                    resolve(false);
                }else{
                    resolve(uuid);
                }
            });
        });
    },
    async getCourseRecord(uuid) {
        let str = "SELECT * FROM `course_table_save_file` WHERE `uuid` = ?;";
        return new Promise((resolve, reject) => {
            database.query(str, [uuid], (err, result, fields) => {
                if (err) {
                    console.log(err);
                    resolve([]);
                } else {
                    if (result.length > 0) {
                        let updateStr = "UPDATE `course_table_save_file` SET `last_used_at` = CURRENT_TIMESTAMP WHERE `uuid` = ?;";
                        database.query(updateStr, [uuid], (updateErr, updateResult) => {
                            if (updateErr) {
                                console.log(updateErr);
                            } else {
                                console.log(`Updated last_used_at for uuid: ${uuid}`);
                            }
                        });
                    }
                    resolve(result);
                }
            });
        });
    }
    

}

module.exports = model;