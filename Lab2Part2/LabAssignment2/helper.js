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

function PlotMds_Euc() {
    document.getElementsByClassName("dropbtn").className = "";
    document.getElementById("Mds_EuclidianButton").className = "dropbtn";
    document.getElementById("mysvg").innerHTML = "";
    drawMds_euc(scattercolor);
}

function PlotMds_Corr() {
    document.getElementsByClassName("dropbtn").className = "";
    document.getElementById("Mds_CorrelationButton").className = "dropbtn";
    document.getElementById("mysvg").innerHTML = "";
    drawMds_corr(scattercolor);
}

function PlotPcp() {
    document.getElementsByClassName("dropbtn").className = "";
    document.getElementById("PcpButton").className = "dropbtn";
    document.getElementById("mysvg").innerHTML = "";
    drawpcp(scattercolor,pcpUserOrderVariables);
}
var pcpUserOrderVariables = ['OVA','Pace','Finishing','Shot','Age','Height','Pass','Defend','Physical','Goalkeeping','Penalties','Crossing','Dribbling']

d3.csv("new_data.csv", function(csvdata) {
    csvdata.forEach(function (d) {
        scattercolor.push(+d.ColorCluster)
    });
    drawBarGraph();
});