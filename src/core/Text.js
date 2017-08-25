/**
 * Created by hustcc.
 */

const evenly = require('evenly');
const { wordWidth } = require('../utils/string');
const invariant = require('../utils/invariant');
const types = require('../utils/types');
const { fillMatrix } = require('../utils/array');
const Element = require('./Element');

/**
 * 一段文本（目前仅支持横向）
 *
 * hello world，这个是一个控制台图标库
 */
class Text extends Element {
  constructor(p, text, align = 'center') {
    super();
    invariant(
      types.isPoint(p) && types.isString(text),
      'TCharts: constructor props of Text should be (Point, string), got (%s, %s).',
      types.typeof(p),
      types.typeof(text));

    invariant(
      ['center', 'left', 'right'].indexOf(align) >= 0,
      'TCharts: constructor props `align` of Text should be one of [\'center\', \'left\', \'right\'], got %s.',
      align);
    this.p = p;
    this.text = text;
    this.align = align;


    const textWidth = wordWidth(this.text);

    if (this.align === 'center') {
      // 居中显示
      const _width = evenly(textWidth, 2, 0);
      this.box = {
        x1: p.x - _width[0] + 1, // 因为当前 p 位置还可以存一个字符串
        y1: p.y,
        x2: p.x + _width[1],
        y2: p.y,
      };
    } else if (this.align === 'left') {
      // 局左显示
      this.box = {
        x1: p.x,
        y1: p.y,
        x2: p.x + textWidth - 1,
        y2: p.y,
      };
    } else {
      // 居右显示
      this.box = {
        x1: p.x - textWidth + 1,
        y1: p.y,
        x2: p.x,
        y2: p.y,
      };
    }

    this.initLayer();
  }

  clone = () => new Text(this.p, this.text);

  toString = () => `Text(${this.p}, ${this.text})`;

  draw = () => {
    const { width } = this.size();

    this.layer.ascii = fillMatrix(1, width, '');
    this.layer.ascii[0][0] = this.text;
    return this.layer;
  };

  get CLASSNAME() {
    return 'Text';
  }
}

module.exports = Text;
