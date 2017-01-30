const dates = ["1月31初四", "2月1初五", "2月2初六", "2月3初七", "2月4初八", "2月5初九"];
const times = ["早上", "中午", "下午", "晚上"];
module.exports = dates.reduce(function (previous, date) {
    return previous.concat(times.map(function (time) {
        return `${date} ${time}`;
    }));
}, []);