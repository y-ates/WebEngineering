var sortable = {
    init: function() {
        // default settings
        sortable.config  = {
            $obj: $('table#sortable'),
        }
        // collect all table rows from sortable table
        sortable.tableRows = $('tbody tr', sortable.config.$obj);
        sortable.onReady();
    },
    replaceSpecials: function(str) {
        str = str.replace(new RegExp('ä', 'g'), 'a');
        str = str.replace(new RegExp('ö', 'g'), 'o');
        str = str.replace(new RegExp('ü', 'g'), 'u');
        str = str.replace(new RegExp('ß', 'g'), 'ss');

        return str;
    },
    // call this function if a th is clicked. $this is supposed to be the th
    // element
    execute: function($this, index) {
        var rows = $('table tbody tr').get();
        var order = $($this).attr("class");
        console.log(order);
        var n = $($this).find("tr").length;

        // if desc, simply reverse array as it has been sorted
        var getOrder = function() {
            return (order === "desc") || (order === "numeric desc") ? -1 : 1;
        }
        var f = getOrder();

        rows.sort(function(a, b) {
            var A = getVal(a, (index+1));
            var B = getVal(b, (index+1));

            if(A < B) {
                return -1*f;
            }
            if(A > B) {
                return 1*f;
            }

            return 0;
        });

        $.each(rows, function(index, row) {
            $('table').children('tbody').append(row);
        });


        function getVal(elm, index){
            var v = $(elm).children('td:nth-child(' + index + ')').eq(n).text().toLowerCase();
            if($.isNumeric(v)){
                v = parseInt(v, 10);
            }
            return v;
        }
    },
    onReady: function() {
        sortable.config.$obj.each(function() {
            // alternating styles for even and odd rows
            $('tbody tr:even', sortable.config.$obj).addClass('even');
            // collect table header from sortable table
            var th = $('th', sortable.config.$obj);
            th.each(function(index) {
                sortable.asc = false;
                $(this).click(function() {
                    // switch ascending/descending state for clicked table header
                    sortable.asc ? sortable.asc = false :sortable.asc = true;
                    th.removeClass('desc asc');
                    sortable.asc ? $(this).addClass('asc') : $(this).addClass('desc');
                    sortable.execute($(this), index);
                    $('tbody tr', sortable.config.$obj).removeClass('even');
                    $('tbody tr:even', sortable.config.$obj).addClass('even');
                });
            });
        });
    }
}
$(document).ready(sortable.init);
