(function(f, define){
    define([ "./pdf/core", "./pdf/ttf", "./kendo.saveas" ], f);
}) (function(){

var __meta__ = {
    id: "ooxml",
    name: "PDF export",
    category: "framework",
    advanced: true,
    depends: [ "saveas" ]
};

(function(kendo){

kendo.PDFMixin = {
    extend: function(proto) {
        proto.events.push("pdfExport");
        proto.options.pdf = this.options;
        proto.saveAsPDF = this.saveAsPDF;
    },
    options: {
        fileName  : "Export.pdf",
        proxyURL  : "",

        // paperSize can be an usual name, i.e. "A4", or an array of two Number-s specifying the
        // width/height in points (1pt = 1/72in), or strings including unit, i.e. "10mm".  Supported
        // units are "mm", "cm", "in" and "pt".  The default "auto" means paper size is determined
        // by content.
        paperSize : "auto",

        // pass true to reverse the paper dimensions if needed such that width is the larder edge.
        // doesn't make much sense with "auto" paperSize.
        landscape : false,

        // pass an object containing { left, top, bottom, right } margins (numbers of strings with
        // units).
        margin    : null,

        // optional information for the PDF Info dictionary; all strings except for the date.
        title     : null,
        author    : null,
        subject   : null,
        keywords  : null,
        creator   : "Kendo UI PDF Generator",
        date      : null        // CreationDate; must be a Date object, defaults to new Date()
    },
    saveAsPDF: function() {
        if (this.trigger("pdfExport")) {
            return;
        }

        var options = this.options.pdf;

        kendo.dataviz.drawing.drawDOM(this.wrapper[0], function(root) {
            root.options.set("pdf", options);

            kendo.dataviz.drawing.pdf.toDataURL(root, function(dataURI) {
                kendo.saveAs({
                    dataURI: dataURI,
                    fileName: options.fileName,
                    proxyURL: options.proxyURL
                });
            });
        });
    }
};

})(kendo);

return kendo;

}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
