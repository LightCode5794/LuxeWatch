const mongoose = require('mongoose');
async function connect() {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/LuxeWatch_dev'); // không dùng được localhost vi nodejs 18 sẽ phân giải localhost theo IPv6 chứ không phải theo IPv4, do đó không có ra kết quả thành 127.0.0.1 được
        console.log('Connect mogoose to mongodb successfully!!!');
    } catch (err) {
        console.error('Connect mogoose to mongodb Fail!!!');
    }
}

module.exports = { connect };