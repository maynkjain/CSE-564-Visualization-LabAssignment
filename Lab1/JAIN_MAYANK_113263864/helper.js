//Global Variables that we will be used for function calls

var scatterXName = "Pace";
var scatterYName = "Age";

var age = [];
var overall = [];
var nationality = [];
var club = [];
var playingposition = [];
var height = [];
var weight = [];
var foot = [];
var marketvalue = [];
var wage = [];
var pace = [];
var shot = [];
var pass = [];
var defend = [];
var physical = [];
var goalkeeping = [];
var penalties = [];
var crossing = [];
var finishing = [];
var dribbling = [];


aMap = {};

aMap["Player's Overall Rating"] = overall ;
aMap["Age"] = age ;
aMap["Nationality"] = nationality ;
aMap["Club"] = club ;
aMap["Playing Position"] = playingposition ;
aMap["Height"] = height ;
aMap["Weight"] = weight ;
aMap["Foot"] = foot ;
aMap["Value"] = marketvalue ;
aMap["Wage"] = wage ;
aMap["Pace"] = pace ;
aMap["Shot"] = shot ;
aMap["Pass"] = pass ;
aMap["Defend"] = defend ;
aMap["Physical"] = physical ;
aMap["Goalkeeping"] = goalkeeping ;
aMap["Penalties"] = penalties ;
aMap["Crossing"] = crossing ;
aMap["Finishing"] = finishing ;
aMap["Dribbling"] = dribbling ;



function PlotScatter(toplotX,toplotY) {
    document.getElementsByClassName("active").className = "";
    document.getElementById("ScatterButton").className = "active";
    document.getElementById("mysvg").innerHTML = "";
   // console.log(scatterXName);
   // console.log(scatterYName);
   drawScatter(aMap[toplotX], aMap[toplotY],scatterXName,scatterYName);
}

function PlotScatterDefault() {
    document.getElementsByClassName("active").className = "";
    document.getElementById("ScatterButton").className = "active";
    document.getElementById("mysvg").innerHTML = "";
   // console.log(scatterXName);
    //console.log(scatterYName);
   drawScatter(pace, age,scatterXName,scatterYName);
}

function GetIDScatterX(id) {

    scatterXName = id;
    PlotScatter(scatterXName,scatterYName);

}

function GetIDScatterY(id) {

    scatterYName = id;
    PlotScatter(scatterXName,scatterYName);

}

function PlotOverall() {
    document.getElementsByClassName("active").className = "";
    document.getElementById("OvaButton").className = "active";
    noOfBins = 10;
    document.getElementById("mysvg").innerHTML = "";
    drawHistogram(overall, +noOfBins,"Player's Overall Rating");
}

function PlotAge() {
    document.getElementsByClassName("active").className = "";
    document.getElementById("AgeButton").className = "active";
    noOfBins = 10;
    document.getElementById("mysvg").innerHTML = "";
    drawHistogram(age, +noOfBins,"Age");
}

function PlotNationality() {
    document.getElementsByClassName("active").className = "";
    document.getElementById("NationButton").className = "active";
    document.getElementById("mysvg").innerHTML = "";
    drawBarGraph(nationality,"Nationality");
}

function PlotClub() {
    document.getElementsByClassName("active").className = "";
    document.getElementById("ClubButton").className = "active";
    document.getElementById("mysvg").innerHTML = "";
    drawBarGraph(club,"Club");
}

function PlotPlayingPosition() {
    document.getElementsByClassName("active").className = "";
    document.getElementById("PlayPosButton").className = "active";
    document.getElementById("mysvg").innerHTML = "";
    drawBarGraph(playingposition,"Playing Position");
}

function PlotHeight() {
    document.getElementsByClassName("active").className = "";
    document.getElementById("HeightButton").className = "active";
    noOfBins = 10;
    document.getElementById("mysvg").innerHTML = "";
    drawHistogram(height, +noOfBins,"Height");
}

function PlotWeight() {
    document.getElementsByClassName("active").className = "";
    document.getElementById("WeightButton").className = "active";
    noOfBins = 10;
    document.getElementById("mysvg").innerHTML = "";
    drawHistogram(weight, +noOfBins,"Weight");
}

function PlotWage() {
    document.getElementsByClassName("active").className = "";
    document.getElementById("WageButton").className = "active";
    noOfBins = 10;
    document.getElementById("mysvg").innerHTML = "";
    drawHistogram(wage, +noOfBins,"Wage");
}

function PlotPace() {
    document.getElementsByClassName("active").className = "";
    document.getElementById("PaceButton").className = "active";
    noOfBins = 10;
    document.getElementById("mysvg").innerHTML = "";
    drawHistogram(pace, +noOfBins,"Pace");
}

function PlotShot() {
    document.getElementsByClassName("active").className = "";
    document.getElementById("ShotButton").className = "active";
    noOfBins = 10;
    document.getElementById("mysvg").innerHTML = "";
    drawHistogram(shot, +noOfBins,"Shot");
}

function PlotPass() {
    document.getElementsByClassName("active").className = "";
    document.getElementById("PassButton").className = "active";
    noOfBins = 10;
    document.getElementById("mysvg").innerHTML = "";
    drawHistogram(pass, +noOfBins,"Pass");
}

function PlotDefend() {
    document.getElementsByClassName("active").className = "";
    document.getElementById("DefendButton").className = "active";
    noOfBins = 10;
    document.getElementById("mysvg").innerHTML = "";
    drawHistogram(defend, +noOfBins,"Defend");
}

function PlotPhysical() {
    document.getElementsByClassName("active").className = "";
    document.getElementById("PhysicalButton").className = "active";
    noOfBins = 10;
    document.getElementById("mysvg").innerHTML = "";
    drawHistogram(physical, +noOfBins,"Physical");
}

function PlotGoalkeeping() {
    document.getElementsByClassName("active").className = "";
    document.getElementById("GoalkeepingButton").className = "active";
    noOfBins = 10;
    document.getElementById("mysvg").innerHTML = "";
    drawHistogram(goalkeeping, +noOfBins,"Goalkeeping");
}

function PlotPenalties() {
    document.getElementsByClassName("active").className = "";
    document.getElementById("PenaltiesButton").className = "active";
    noOfBins = 10;
    document.getElementById("mysvg").innerHTML = "";
    drawHistogram(penalties, +noOfBins,"Penalties");
}

function PlotCrossing() {
    document.getElementsByClassName("active").className = "";
    document.getElementById("CrossingButton").className = "active";
    noOfBins = 10;
    document.getElementById("mysvg").innerHTML = "";
    drawHistogram(crossing, +noOfBins,"Crossing");
}

function PlotFinishing() {
    document.getElementsByClassName("active").className = "";
    document.getElementById("FinishingButton").className = "active";
    noOfBins = 10;
    document.getElementById("mysvg").innerHTML = "";
    drawHistogram(finishing, +noOfBins,"Finishing");
}

function PlotFoot() {
    document.getElementsByClassName("active").className = "";
    document.getElementById("FootButton").className = "active";
    document.getElementById("mysvg").innerHTML = "";
    drawBarGraph(foot,"Foot");
}


function PlotValue() {
    document.getElementsByClassName("active").className = "";
    document.getElementById("ValueButton").className = "active";
    noOfBins = 10;
    document.getElementById("mysvg").innerHTML = "";
    drawHistogram(marketvalue, +noOfBins,"Market Value");
}


function PlotDribbling() {
    document.getElementsByClassName("active").className = "";
    document.getElementById("DribblingButton").className = "active";
    noOfBins = 10;
    document.getElementById("mysvg").innerHTML = "";
    drawHistogram(dribbling, +noOfBins,"Dribbling");
}



d3.csv("data.csv", function(csvdata) {
    csvdata.forEach(function (d) {
        age.push(+d.Age);
        overall.push(+d.OVA);
        nationality.push(d.Nationality);
        club.push(d.Club);
        playingposition.push(d.PlayingPosition);
        height.push(+d.Height);
        weight.push(+d.Weight);
        foot.push(d.foot);
        marketvalue.push(+d.Value);
        wage.push(+d.Wage);
        pace.push(+d.Pace);
        shot.push(+d.Shot);
        pass.push(+d.Pass);
        defend.push(+d.Defend);
        physical.push(+d.Physical);
        goalkeeping.push(+d.Goalkeeping);
        penalties.push(+d.Penalties);
        crossing.push(+d.Crossing);
        finishing.push(+d.Finishing);
        dribbling.push(+d.Dribbling);
    });
    drawHistogram(overall, 10,"Player's Overall Rating");
});