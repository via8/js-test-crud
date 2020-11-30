const fs = require('fs');
const path = './util/data.json';

let data = JSON.parse(fs.readFileSync(path));
let size = Object.keys(data.names).length;

function update_data() {
    size = Object.keys(data.names).length;
    fs.writeFileSync(path, JSON.stringify(data));
}

function get_id(str_id) {
    if (str_id === '') {
        return -1;
    }
    else {
        let id = parseInt(str_id);
        if (!Number.isSafeInteger(id) || id < 0 || id >= size) {
            return -2;
        }
        else {
            return id;
        }
    }
}

exports.create = function (req, res) {
    let name = req.url.split('/')[1];
    if (name === '') {
        res.send('specify name to create');
    }
    else {
        data.names.push(name);
        update_data();
        res.send('successfully added name: ' + name);
        console.log('INFO: name has been added: ' + name);
    }
}

exports.read = function (req, res) {
    let str_id = req.url.split('/')[1];
    let id = get_id(str_id);
    switch (get_id(str_id)) {
    case -1:
        let list = '';
        for (let i = 0; i < size; ++i) {
            list += i.toString() + ': ' + data.names[i] + '<br>';
        }
        res.send('saved names:<br><br>' + list);
        // res.send('saved names:<br><br>' + data.names.join('<br>'));
        break;
    case -2:
        res.send('invalid ID number');
        break;
    default:
        res.send('name under ID ' + str_id + ':<br><br>' + data.names[id]);
    }
}

exports.update = function (req, res) {
    let splitted_url = req.url.split('/');
    let str_id = splitted_url[1];
    let name = splitted_url[2];
    let id = get_id(str_id);
    switch (get_id(str_id)) {
    case -1:
        res.send('specify ID number of name to update');
        break;
    case -2:
        res.send('invalid ID number');
        break;
    default:
        if (name == null) {
            res.send('specify new name to update');
        }
        else {
            data.names[id] = name;
            update_data();
            res.send('successfully updated name under ID ' + str_id);
            console.log('INFO: name under ID ' + str_id + ' has been updated to: ' + name);
        }
    }
}

exports.delete = function (req, res) {
    let str_id = req.url.split('/')[1];
    let id = get_id(str_id);
    switch (get_id(str_id)) {
    case -1:
        res.send('specify ID number of name to delete');
        break;
    case -2:
        res.send('invalid ID number');
        break;
    default:
        data.names.splice(id, 1);
        update_data();
        res.send('successfully deleted name under ID ' + str_id);
        console.log('INFO: name under ID ' + str_id + ' has been deleted');
    }
}
