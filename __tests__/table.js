/**
 * Created by hustcc.
 * Contract: i@hust.cc
 */


module.exports = (Table) => {
  test('1. draw a table chart.', () => {
    let table = new Table();
    table.setData([
      ['id', 'name', 'birthday'],
      ['#1', 'xiaowei', '1992-08-01'],
      ['#2', 'hello', '1992-09-20'],
      ['#3', 'tcharts', '2017-06-27'],
      ['#4', 'world'],
    ]);
    const r = `
+--+-------+----------+
|id|  name | birthday |
+--+-------+----------+
|#1|xiaowei|1992-08-01|
+--+-------+----------+
|#2| hello |1992-09-20|
+--+-------+----------+
|#3|tcharts|2017-06-27|
+--+-------+----------+
|#4| world |          |
+--+-------+----------+`.trim();
    expect(table.string()).toBe(r);

    table = new Table(0.5); // set gap rate = 0.5
    table.setData([
      ['id', 'name', 'birthday'],
      ['#1', 'xiaowei', '1992-08-01'],
      ['#2', 'hello', '1992-09-20'],
      ['#3', 'tcharts', '2017-06-27'],
      ['#4', 'world'],
    ]);
    console.log(table.string());
  });

    test('2. draw a table chart, contains chinese.', () => {
        let table = new Table();
        table.setData([
            ['標識符', '名字', '生日'],
            ['#1', '圖靈', '1992-08-01'],
            ['#2', '潘金蓮', '1992-09-20'],
            ['#3', '西門慶', '2017-06-27'],
            ['#4', '明日花绮罗'],
        ]);
        const r = `
+------+----------+----------+
|標識符|   名字   |   生日   |
+------+----------+----------+
|  #1  |   圖靈   |1992-08-01|
+------+----------+----------+
|  #2  |  潘金蓮  |1992-09-20|
+------+----------+----------+
|  #3  |  西門慶  |2017-06-27|
+------+----------+----------+
|  #4  |明日花绮罗|          |
+------+----------+----------+`.trim();
        expect(table.string()).toBe(r);

        table = new Table(0.5); // set gap rate = 0.5
        table.setData([
            ['標識符', '名字', '生日'],
            ['#1', '圖靈', '1992-08-01'],
            ['#2', '潘金蓮', '1992-09-20'],
            ['#3', '西門慶', '2017-06-27'],
            ['#4', '明日花绮罗'],
        ]);
        console.log(table.string());
    });
};
