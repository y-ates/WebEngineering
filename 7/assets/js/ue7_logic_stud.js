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
        return str;
    },
    // call this function if a th is clicked. $this is supposed to be the th element
    execute: function($this, index) {

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
