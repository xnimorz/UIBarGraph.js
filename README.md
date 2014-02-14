## UIBarGraph.js

JQuery плагин, позволяющий представить словарь (ключ-значение) в виде столбчатого графика.
Поддерживается анимация

## Demo
http://xnimorz.github.io/UIBarGraph.js/DEMO/

## Тестировался

Chrome\Opera\Mozilla\Safari
IE10+

мобильные бразуеры с движком WebKit


## Использование

Для работы с данным плагином, необходимо подключить JQuery версии 1.8 и выше, подключить плагин -
UIBarGraph.js и добавить таблицу стилей UIBarGraph.css

Стандартное использование предполагает верстку по типу

````html
<div class='graph'>
</div>
````

Стандартный вызов:
````javascript
$(".graph").UIBarGraph({
    //параметры. Обязательный параметр:
    items : [/* словарь ключ-значение */]
});
````

Поддерживаемые параметры:
````html
     {Array} items список ключ-значение, где ключ - имя столбца, значение - число > minValue и < maxValue
     {Number}  maxValue - максимальное возможное значение (> minValue)
     {Number} minValue - минимально возможное значение ( > 0)
     {Boolean} showValues - true - указывать числовые значения столбцов, false - не указывать
     {String} blockSize - размер столбца (px\em и т.д.)
     {String or null} lineColor - обрамляющий цвет графика. Допустимые значения - цвет | null (отсутствие границы)
     {String} blockColor - цвет столбца
     {String} itemsDistance - расстояние между столбцами (px\em и т.д.)
     {String} fontSize - размер шрифта (px\em и т.д.)
     {String} textWidth - расстояние в px для описания столбца (px)
     {String} textColor - цвет текста
     {Number} animationTime - время анимации в ms ( > 0)
     {Boolean} isTextOnProgress - true - отображает описание и значение столбцов непосредственно на столбцах, false - отображает отдельно
     {Number) valueWidth - отступ от правого края контейнера в px ( >= 0)
````
Параметры передаются в виде JSON объекта:

Пример вызова с перечислением СТАНДАРТНЫХ параметров:
````javascript
$(".graph").UIBarGraph({
                               items: [],
                               maxValue: 100,
                               minValue: 0,
                               showValues: true,
                               blockSize: "16px",
                               lineColor: null, /* "#000" */
                               blockColor: "#abe",
                               itemsDistance: "5px",
                               fontSize: "16px",
                               textWidth: "50px",
                               textColor: "#000",
                               animationTime : 1000,
                               isTextOnProgress: false,
                               valueWidth: 30
                           });
````

Управление виджетом:

````javascript
$(".graph").extendItems(items);
````
Расширение списка элементов. Если попадаются одинаковые ключи, то результирующий ключ будет обновлен.
Параметр: {Array} items - пары ключ-значение


````javascript
$('.graph').addItems(items);
````
Добавление элементов в список. Если попадаются одинаковые ключи - значение перезаписано не будет
Параметр: {Array} items - пары ключ-значение


````javascript
$('.graph').repaint();
````
Перерисовка виджета

````javascript
$('.graph').getItem(key);
````
 Получение значени по ключу
 Параметр: {String} key - ключ

 ````javascript
 $('.graph').getItemsArray();
 ````
 Получение ссылки на массив элементов

 ````javascript
  $('.graph').extendOptions(settings);
  ````
  Обновление параметров. НЕ рекомендуется добавлять данным образом новые значения столбцов.
  Параметр: {JSON} settings - новые параметры для виджета.

  ````javascript
    $('.graph').moveItem(item, value);
    ````
  Анимация изменения значения столбца
  Параметры:  item - столбец (по ключу)
              value - новое значение



