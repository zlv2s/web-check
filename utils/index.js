const faker = require('faker')
const {Random} = require('mockjs')

function randomPhoneNum() {
    const headerNums = ["139", "138", "137", "136", "135", "134", "159", "158", "157", "150", "151", "152", "188", "187", "182", "183", "184", "178", "130", "131", "132", "156", "155", "186", "185", "176", "133", "153", "189", "180", "181", "177"]
    const headerNum = headerNums[parseInt(Math.random() * 10 + '', 10)]
    const bodyNum = Math.random().toString().replace('0.', '').slice(0, 8)
    return headerNum + bodyNum
}

function randomName() {
    return Random.cname()
}

function randomBankCard() {
}

function randomId() {
    const Id = {
        aProvince: [11, 12, 13, 14, 15, 21, 22, 23, 31, 32, 33, 34, 35, 36, 37, 41, 42, 43, 44, 45, 46, 50, 51, 52, 53, 54, 61, 62, 63, 64, 65],
        aCity: ['0101', '0201'],
        sId: '',
        iBirDate: '',
        repTimes: 50,
        getRandom: function (iMin, iMax) {
            return Math.round(Math.random() * (iMax - iMin)) + iMin;
        },
        addZero: function (str, num) {
            str = str.toString();
            for (let i = 0, len = num - str.length; i < len; i++) {
                str = '0' + str;
            }
            return str;
        },
        init: function () {
            return this.toId();
        },
        toProvince: function () {
            return this.aProvince[this.getRandom(0, this.aProvince.length - 1)];//不包含 香港、澳门、台湾、国外
        },
        toCity: function () {
            return this.aCity[this.getRandom(0, this.aCity.length - 1)];
            //return '0101';//省会
        },
        toBirthday: function () {
            let ia = new Date();
            let start = new Date() - 50 * 365 * 24 * 60 * 60 * 1000;
            let end = new Date() - 18 * 365 * 24 * 60 * 60 * 1000;
            let ageDate = this.getRandom(start, end);
            ia.setTime(ageDate);
            return ia.getFullYear() + '' + this.addZero(ia.getMonth() + 1, 2) + this.addZero(ia.getDate(), 2);//随机生日
        },
        toLast: function () {
            const arrLastFour = []
            for (let i = 0; i < 4; i++) {
                arrLastFour.push(this.getRandom(0, 9));
            }
            return arrLastFour.join('');
        },
        toId: function () {
            //this.repTimes
            for (let j = 0; j < 50; j++) {
                this.sId = '' + this.toProvince() + '' + this.toCity() + this.toBirthday() + this.toLast();
                let iSum = 0;
                for (let i = 17; i >= 0; i--) {
                    iSum += (Math.pow(2, i) % 11) * parseInt(this.sId.charAt(17 - i), 11);
                }
                if (iSum % 11 == 1) {
                    return this.sId;
                }
            }
        },
    }
    return Id.init()
}

console.log(randomId())

module.exports = {
    randomPhoneNum,
    randomName,
    randomId,
    randomBankCard
}