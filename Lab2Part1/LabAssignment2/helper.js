var scattercolor = [];


function PlotBiPlot() {
    document.getElementsByClassName("dropbtn").className = "";
    document.getElementById("BiPlotButton").className = "dropbtn";
    document.getElementById("mysvg").innerHTML = "";
    drawBiplot("PC1","PC2",scattercolor);
}

function PlotScree() {
    document.getElementsByClassName("dropbtn").className = "";
    document.getElementById("ScreeButton").className = "dropbtn";
    document.getElementById("mysvg").innerHTML = "";
    drawBarGraph();
}

d3.csv("new_data.csv", function(csvdata) {
    csvdata.forEach(function (d) {
        scattercolor.push(+d.ColorCluster)
    });
    drawBarGraph();
});