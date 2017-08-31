/**
 * Created by hustcc.
 * Contract: i@hust.cc
 */

const VT = require('variable-type');

const COMMON_TYPE = VT.arrayOf(
  VT.shape({
    name: VT.or([
      VT.number,
      VT.string,
    ]),
    value: VT.number,
  })
);

const BAR_DATA_TYPE = COMMON_TYPE;

const BOX_DATA_TYPE = COMMON_TYPE;

const HBAR_DATA_TYPE = COMMON_TYPE;

const TABLE_DATA_TYPE = VT.arrayOf(
  VT.arrayOf(
    VT.any
  ),
);

const TREE_DATA_TYPE = VT.shape({
  name: VT.or([
    VT.number,
    VT.string,
  ]),
  // TODO children 一个递归结构的数组
  children: VT.arrayOf(
    VT.recursive
  ),
});

module.exports = {
  BAR_DATA_TYPE,
  BOX_DATA_TYPE,
  HBAR_DATA_TYPE,
  TABLE_DATA_TYPE,
  TREE_DATA_TYPE,
};
