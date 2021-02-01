var fs = require('fs');

exports.replacer = {
    include: (file, dir, callback) => {
        fs.readFile((dir === undefined ? '' : (dir + '/')) + file, (err, data) => {
            if (err) throw err;
            callback(data.toString().replace(/@@\w+/g, match => {
                if (/header/i.test(match)) {
                    return fs.readFileSync('header.htm');
                } else if (/base/i.test(match)) {
                    return fs.readFileSync('base.htm');
                } else {
                    return '';
                }
            }));
        });
    }
};