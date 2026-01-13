courseToStartIndex = {
  "1" : 0,
  "2" : 2,
  "3" : 4,
  "4" : 6,
  "5" : 8,
  "6" : 10,
  "7" : 12,
  "8" : 14,
  "9" : 16,
  "10" : 18,
  "11" : 20,
  "12" : 22,
  "13" : 24,
  "14" : 26,
  "15" : 28,
  "A" : 0,
  "B" : 3,
  "C" : 6,
  "D" : 9,
  "E" : 12,
  "F" : 15,
  "G" : 18,
  "H" : 21,
  "I" : 24,
  "J" : 27
}

courseToEndIndex = {
  "1" : 2,
  "2" : 4,
  "3" : 6,
  "4" : 8,
  "5" : 10,
  "6" : 12,
  "7" : 14,
  "8" : 16,
  "9" : 18,
  "10" : 20,
  "11" : 22,
  "12" : 24,
  "13" : 26,
  "14" : 28,
  "15" : 30,
  "A" : 3,
  "B" : 6,
  "C" : 9,
  "D" : 12,
  "E" : 15,
  "F" : 18,
  "G" : 21,
  "H" : 24,
  "I" : 27,
  "J" : 30
}

WeekDayToInt = {
  "一" : 1,
  "二" : 2,
  "三" : 3,
  "四" : 4,
  "五" : 5,
  "六" : 6
}

function splittime(time) {
  time.trim();
  let store = time.split(" ");
  // console.log(store);

  let arr = [];
  for (let i = 0; i < store.length; i++) {
    let temp = store[i][0];
    let temp2 = store[i].slice(1);
    let temp3 = temp2.split(",");
    for(let j = 0; j < temp3.length; j++){
      let single_data = [WeekDayToInt[temp], courseToStartIndex[temp3[j]], courseToEndIndex[temp3[j]] - 1];
      // console.log(single_data)
      arr.push(single_data);
    }
  }
  // console.log(arr);
  return arr;
}

module.exports = {
  splittime : splittime
}