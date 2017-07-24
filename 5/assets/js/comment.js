$(document).ready(function(){
    var feed = new Feed();
    var count = 0;
    loadItems();

    // object definitions
    function Feed() {
        this.feedItems = new Array();
        this.addFeedItem = function(item) {
            this.feedItems.push(item);
        };
    }

    function Comment(text) {
        this.text = text;
    }

    function Item(title,
                  desc,
                  pubdate,
                  linkUrl,
                  count) {
        this.title = title;
        this.desc = desc;
        this.pubdate = pubdate;
        this.link = linkUrl;
        this.count = count;
        this.comments = new Array();
    }

    // AJAX request for feed data
    function loadItems() {
        $.ajax({
            type:"GET",
            url:"http://localhost:8888/rss",
            dataType:"xml",
            success: function(xml) {
                // call display function for each'item'-tag in the xml document
                $(xml).find('item').each(function(index) {
                    displayItem($(this));
                });
            }
        });
    }

    function createCommentItem(id, commentText) {
        var comment = $('<div>').appendTo($("#commentContainer-"+
                                            id));
        $(comment).addClass('comment well well-sm');
        $(comment).attr('id','commentId-'+ id);
        var icon = $('<span>');
        $(icon).addClass('glyphicon glyphicon-comment');
        $(icon).attr('aria-hidden','true');
        $(comment).text(commentText);
        $(comment).prepend("<br>");
        $(comment).prepend(icon);
    }
    
    function btnClicked(inputId) {
        if($("#commentInput-" + inputId).val()) {
            var commentText = $("#commentInput-" + inputId).val();
            createCommentItem(inputId, commentText);
            feed.feedItems[inputId].comments.push(new Comment(commentText));
            $("#commentInput-"+ inputId).val('');
            $("#commentContainer-"+ inputId).show();
        } else {
            alert("Enter your comment first");
        }
    }
    
    function displayItem(item) {
        // construct feed object from request data
        var feedItem = new Item($(item).find('title').text(),
                                $(item).find('description').text(),
                                $(item).find('pubDate').text(),
                                $(item).find('link').text(),
                                count
                               );
        feed.addFeedItem(feedItem);
        count++;
        var itemArea = $('<div>').appendTo($('#content'));
        $(itemArea).addClass('item');
        var heading = $('<h2>').appendTo($(itemArea));
        $(heading).append(feedItem.title);
        var description = $('<p>').appendTo($(itemArea));
        $(description).addClass('desc');
        $(description).append(feedItem.desc);
        var publication = $('<p>').appendTo($(publication));
        $(publication).addClass('pubdate');
        $(publication).append(feedItem.pubdate);
        var btn = $('<a>').appendTo($(itemArea));
        $(btn).addClass('btn btn-default btn-xs');
        $(btn).attr({
            'type':'button',
            'target':'_blank',
            'href': feedItem.link ,
        });
        var spn = $('<s pan>').appendTo($(btn));
        $(spn).addClass('glyphicon glyphicon-open');
        $(spn).attr('aria-hidden','true');
        var commentContainer = $('<div>').appendTo($(itemArea));
        $(commentContainer).attr('id','commentContainer-'+
                                 feedItem.count +'');
        $(commentContainer).addClass('comments panel panel-primary');
        $(commentContainer).append('<div class="panel-heading">Comments </div>');
        $(commentContainer).hide();

        var commentInput = $('<div>').appendTo($(itemArea));
        $(commentInput).addClass('input-group');
        $(commentInput).append('<input type="text"class="form-control" id="commentInput-'+ feedItem.count +'"placeholder="Your comment">');
        $(commentInput).append('<span class="input-group-btn"> <button class="btn btn-default" onClick="btnClicked('+feedItem.count+')"> Post </button> </span>');
    }
});
