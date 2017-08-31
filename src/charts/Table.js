/**
 * Created by hustcc.
 */


const Chart = require('./Chart');
const invariant = require('../utils/invariant');
const RectText = require('../core/RectText');
const Point = require('../core/Point');
const { wordWidth } = require('../utils/string');
const { round } = require('../utils/number');

/**
 * 表格
 *
 *
 * +----+----------+----------------+
 * | id |   name   |    birthday    |
 * +----+----------+----------------+
 * | #1 |  xiaowei |   1992-08-01   |
 * +----+----------+----------------+
 * | #2 |  hello   |   1992-09-20   |
 * +----+----------+----------------+
 * | #3 | tcharts  |   2017-06-27   |
 * +----+----------+----------------+
 * | #4 |     d    |                |
 * +----+----------+----------------+
 *
 *
 *
 */
class Table extends Chart {
  constructor(rate = 0) {
    super(0, 0); // table 的宽高有内容自动伸缩
    this.rate = rate; // 比例，比如文字宽度为10, rate = 0.1，则表格 cell 宽度为 12
  }

  // 通过内容计算每一列的宽高
  _calColSizes = (data, row, col) => {
    let sizes = new Array(col).fill(0);
    data.forEach((d) => {
      sizes = sizes.map((s, i) => Math.max(wordWidth(d[i]), s));
    });
    // 乘以 rate
    sizes = sizes.map(s => s + round(s * this.rate) * 2);
    return sizes;
  };

  _getRowAndCol = (data) => {
    const row = data.length;
    let col = 0;
    data.forEach((d) => {
      col = Math.max(col, d.length);
    });

    // 数据不能为零长度
    invariant(
      row !== 0 && col !== 0,
      `TCharts: data of \`Table\` chart should be type of matrix Array, 
      and can not be zero row or column. Got row: %s, column: %s.`,
      row,
      col
    );
    return {
      row,
      col,
    };
  };

  // 填充数据（对于有空缺的数据）
  // 并将数据转换为 string
  _fullFillData = (data, row, col) => {
    const result = [];
    for (let r = 0; r < row; r += 1) {
      result[r] = [];
      for (let c = 0; c < col; c += 1) {
         result[r][c] = data[r][c] !== undefined ? data[r][c].toString() : '';
      }
    }
    return result;
  };

  _calTableSizes = (colSizes, row, col) => {
    // width height 是从 0 开始计数的，所以这里的 width height 比实际的 - 1
    const height = row * 2;
    const width = col + colSizes.reduce((r, ele) => r + ele);
    return {
      width,
      height,
    };
  };

  setData = (data) => {
    const { row, col } = this._getRowAndCol(data);
    const updatedData = this._fullFillData(data, row, col);
    this.data = updatedData;

    const colSizes = this._calColSizes(this.data, row, col);
    const { width, height } = this._calTableSizes(colSizes, row, col);

    this.resetSize(width, height);
    this.generateLayer(colSizes, row, col);
  };

  /**
   * 具体 table 的实现
   */
  generateLayer = (colSizes, row, col) => {
    const rectTexts = []; // 非常多有的 rectText 实例
    let startX = 0;
    let startY = 0;

    for (let i = 0; i < row; i += 1) {
      startX = 0;
      for (let j = 0; j < col; j += 1) {
        rectTexts.push(new RectText(
          new Point(startX, startY),
          new Point(startX + colSizes[j] + 1, startY + 2),
          this.data[row - i - 1][j]).draw());

        startX += (colSizes[j] + 1);
      }
      startY += 2;
    }
    return this.layer.mergeArray(rectTexts);
  }
}

module.exports = Table;
