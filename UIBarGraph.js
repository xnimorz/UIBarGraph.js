(function ($) {


    /**
     * Стандартные настройки
     * items список ключ-значение, где ключ - имя столбца, значение - число > minValue и < maxValue
     * maxValue - максимальное возможное значение
     * minValue - минимально возможное значение
     * showValues - true - указывать числовые значения столбцов, false - не указывать
     * blockSize - размер столбца
     * lineColor - обрамляющий цвет графика. Допустимые значения - цвет | null (отсутствие границы
     * blockColor - цвет столбца
     * itemsDistance - расстояние между столбцами
     * fontSize - размер шрифта
     * textWidth - расстояние в px для описания столбца
     * textColor - цвет текста
     * animationTime - время анимации в ms
     * isTextOnProgress - true - отображает описание и значение столбцов непосредственно на столбцах, false - отображает отдельно
     * valueWidth - отступ от правого края контейнера в px
     * @type {{items: Array, maxValue: number, minValue: number, showValues: boolean, blockSize: string, lineColor: string, blockColor: string, itemsDistance: string, fontSize: string, textWidth: string, textColor: string, animationTime: number, isTextOnProgress: boolean, valueWidth: number}}
     */
    var defaults = {
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
    };

    /**
     * Билдер виджета. Инициализирует методы
     * @param settings
     * @returns {*|HTMLElement} цепочные вызовы
     * @constructor
     */
    $.fn.UIBarGraph = function (settings) {
        var options = $.extend({}, defaults, settings),
            barGraph = $('<div class="ui-bar-graph"/>'),
            barWidth = $(this)[0].clientWidth - options.valueWidth - parseInt(options.textWidth);

        options.items = [];

        for (var i in settings.items) {
            options.items[i] = settings.items[i];
        }


        function paintItemsOnContainer(value, text, block, barLine) {
            barLine.append(block.append(text, value));
        }

        function paintItem(value, text, block, barLine) {
            barLine.append(text,block,value);
        }

        function setCSSProperties(text, block, barLine, width) {

            text.css({
                "width": options.textWidth
            });

            block.css({
                    "-webkit-transition": "all " + options.animationTime + "ms ease",
                    "-moz-transition": "all " + options.animationTime + "ms ease",
                    "-ms-transition": "all " + options.animationTime + "ms ease",
                    "transition": "all " + options.animationTime + "ms ease",
                    "background-color": options.blockColor,
                    "height": options.blockSize,
                    "width": width

            });

            barLine.css({
               "margin-top": options.itemsDistance,
                "font-size" : options.fontSize,
                "font-color" : options.textColor
            });
        }

        /**
         * Отрисовка элементов.
         * Отрисовка части элементов, если определен items
         * Если items неопределен, но отрисовываются все элементы из options.items
         * @param items
         */
        function paint(items) {
            var barLine,
                lineBlock,
                lineText,
                lineValue;


            items = items || options.items;

            for (var i in items) {
                barLine = $('<div class="ui-bar-graph-line" data-name="{0}"/>'.replace("{0}",i));
                lineBlock = $('<div class="ui-bar-graph-line__block"/>');
                lineText = $('<div class="ui-bar-graph-line__text">{0}</div>'.replace("{0}", i));

                if (options.isTextOnProgress) {

                    if (options.showValues) {
                        lineValue = $('<div class="ui-bar-graph-line__value ui-bar-graph-line__value_right">{0}</div>'.replace('{0}', options.items[i]));
                    }
                    paintItemsOnContainer(lineValue, lineText, lineBlock, barLine);

                } else {

                    if (options.showValues) {
                        lineValue = $('<div class="ui-bar-graph-line__value">{0}</div>'.replace('{0}', options.items[i]));
                    }
                    paintItem(lineValue, lineText, lineBlock, barLine);

                }

                setCSSProperties(lineText, lineBlock, barLine, ((barWidth*options.items[i])/(options.maxValue - options.minValue))+"px");
                barGraph.append(barLine);
            }
        }


        /**
         * Расширение списка элементов. Если попадаются одинаковые ключи, то результирующий ключ будет обновлен
         * @param {Array} items - массив для расширения
         */
        $.fn.extendItems = function(items) {
            for (var i in items) {
                options.items[i] = items[i];
            }
            $(this).repaint();
        };

        /**
         * Добавление элементов в список. Если попадаются одинаковые ключи - значение перезаписано не будет
         * @param {Array} items
         */
        $.fn.addItems = function(items) {
            var i, newItems = [];

            for (i in items) {
                if (!options.items[i]) {
                    newItems[i] = items[i];
                    options.items[i] = items[i];
                }
            }

            paint(newItems);

        };

        /**
         * Перерисовка виджета
         */
        $.fn.repaint = function() {
            barGraph.html("");
            paint();
        }

        /**
         * Анимация изменения значения столбца
         * @param item - столбец (по ключу)
         * @param value - новое значение
         */
        $.fn.moveItem = function(item, value) {
            var currentBlock = $(this).find(".ui-bar-graph-line[data-name='" + item + "']");


            if (options.items[item]) {
                options.items[item] = value;
            }

            currentBlock.children(".ui-bar-graph-line__block").css({
                "width": ((barWidth*options.items[i])/(options.maxValue - options.minValue))+"px"
            })
                .end().children(".ui-bar-graph-line__value").html(value);
        }


        paint();

        if (options.lineColor) {
            barGraph.css({
                "border" : "1px solid " + options.lineColor
            });
        }

        $(this).append(barGraph);

        return $(this);

    }

})(jQuery);