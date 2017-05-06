const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');
const queryString = require('query-string')

exports.get_home_data = function() {
    return fs.readFileSync(path.join(__dirname, '../mock/home.json'), 'utf-8');
};

exports.get_rank_data = function() {
    return fs.readFileSync(path.join(__dirname, '../mock/rank.json'), 'utf-8');
};

exports.get_category_data = function() {
    return fs.readFileSync(path.join(__dirname, '../mock/category.json'), 'utf-8');
};

exports.get_bookbacket_data = function() {
    return fs.readFileSync(path.join(__dirname, '../mock/bookbacket.json'), 'utf-8');
};

exports.get_male_data = function() {
    return fs.readFileSync(path.join(__dirname, '../mock/channel/male.json'), 'utf-8');
};

exports.get_female_data = function() {
    return fs.readFileSync(path.join(__dirname, '../mock/channel/female.json'), 'utf-8');
};

exports.get_search_data = function(start, end, keyword) {
  return new Promise(function(resolve, reject) {
    var data = {
      s: keyword,
      start: start,
      end: end
    };
    let qs = queryString.stringify(data);

    fetch('http://dushu.xiaomi.com/store/v0/lib/query/onebox?' + qs)
      .then(res => res.json())
      .then(json => {
         resolve(json);
      })
      .catch(err => {
        reject(err);
      });
  });
};

exports.get_book_data = function(id) {
  if (!id) {
    id = '18218';
  }
  return fs.readFileSync(path.join(__dirname, '../mock/book/' + id +'.json'), 'utf-8');
};