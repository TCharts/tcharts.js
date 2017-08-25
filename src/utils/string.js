/**
 * Created by hustcc.
 * Contract: i@hust.cc
 */

const wordWidth = text => (text ? text.length + (`${text}中`.match(/[^\x00-\x80]/g).length - 1) : 0);

module.exports = {
  wordWidth,
};
