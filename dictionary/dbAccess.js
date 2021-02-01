var mysql = require('mysql');
var dictDB = {};

var pool = mysql.createPool({
    host: "localhost",
    port: "3306",
    user: "michael_dictionary_user",
    password: "michael_dictionary_user",
    database: "michael_dictionary"
});

dictDB.getConnection = (callback) => {
    pool.getConnection((err, con) => {
        callback(err, con);
    });
};

dictDB.searchWordsByID = (term, callback) => {
    pool.query("SELECT ID, Description, Display, IDList FROM `DisplayWords` where IDList LIKE '%" + term + "%'", (err, result) => {
        if (err) throw err;
        callback(err, result);
    });
};

dictDB.searchWords = (term, callback) => {
    var terms = term.match(/\b\w+\b/g);
    if (!terms || !terms.length) {
        terms = [""];
    }
    var whereTerms = terms.map(w => "IDList LIKE '%" + w + "%' or Display LIKE '%" + w + "%' or Description LIKE '%" + w + "%'");
    var whereClause = whereTerms.join(" OR ");
    pool.query("SELECT ID, Description, Display, IDList FROM `DisplayWords` where " + whereClause, (err, result) => {
        if (err) throw err;
        callback(err, result);
    });
};

var verifyIDList = list => {
    return /^(\s*[01][0-9a-fA-F]\s*)(,\s*[01][0-9a-fA-F]\s*)*$/.test(list);
};

dictDB.addWord = (list, desc, callback) => {
    if (verifyIDList(list)) {
        var kls = list.split(",").map(kl => kl.toUpperCase().trim());
        var kquery = "SELECT ID, IDList FROM `DisplayWords` where IDList = '" + kls.join(",") + "'";
        console.error(kquery);
        pool.query(kquery, (err, result) => {
            if (err) throw err;
            if (result.length) {
                var uwquery = "update `KeyWord` set Description = '" + desc + "' where id = " + result[0].ID;
                console.error(uwquery);
                pool.query(uwquery, (uerr, uresult) => {
                    if (uerr) throw uerr;
                    callback(uerr, uresult);
                });
            } else {
                var iwquery = "insert into `KeyWord` (`Description`) values ('" + desc + "')";
                console.error(iwquery);
                pool.query(iwquery, (ierr, iresult) => {
                    if (ierr) throw ierr;
                    var klquery = "INSERT INTO `KeyLetter`(`KeyWordID`, `SequenceID`, `LetterID`) VALUES " + Object.entries(kls).map(kl => "(" + iresult.insertId + "," + kl[0] + ",0x" + kl[1] + ")").join(",");
                    console.error(klquery);
                    pool.query(klquery, (ikerr, ikresult) => {
                        if (ikerr) throw ikerr;
                        callback(null, ikresult);
                    });
                });
            }
        });
    } else {
        callback("IDList was invalid");
    }
}

module.exports = dictDB;