var title = document.title;
var reg = /Ticket\W+T\d+\W\d+/gm;
var regm = /Ticket\W+T\d+\W\d+...(.+)/;

if (title.match(reg)) {
    var ntitle = title.match(regm)
    document.title = ntitle[1]
};
