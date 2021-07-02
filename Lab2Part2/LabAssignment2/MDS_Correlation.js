let jsondataMDS_CorrData = "";
let apiUrlmds_corr = "http://127.0.0.1:5000/getmds_corr"

async function fetchJsonData(url) {
    let response = await fetch(url);
    let data = await response.json()
    return data;
}

const fields = ['OVA','Pace','Finishing','Shot','Age','Height','Pass','Defend','Physical','Goalkeeping','Penalties','Crossing','Dribbling']


async function drawMds_corr() {
    var element = document. getElementById("HighestPCATable");
    //console.log(element)
    if(element != null)
    {
        element. parentNode. removeChild(element);
    }

    var element1 = document. getElementById("content");
    //console.log(element)
    if(element1 != null)
    {
        element1. parentNode. removeChild(element1);
    }

    var element2 = document. getElementById("legend");
    //console.log(element)
    if(element2 != null)
    {
        element2. parentNode. removeChild(element2);
    }

    var element3 = document. getElementById("content1");
    //console.log(element)
    if(element3 != null)
    {
        element3. parentNode. removeChild(element3);
    }

    var element4 = document. getElementById("content2");
    //console.log(element)
    if(element4 != null)
    {
        element4. parentNode. removeChild(element4);
    }


    var div = document.createElement('div');
    div.id = 'content2';
    div.className = 'note2';
    div.innerHTML = '<p>Join the Attributes in your desired order to Plot its PCP</p>';
    document.body.appendChild(div);

    jsondataMDS_CorrData = await fetchJsonData(apiUrlmds_corr)
    var data1 = jsondataMDS_CorrData["xval1"]
    var data2 = jsondataMDS_CorrData["yval1"]

    var myDATA = [];
    for(i = 0 ; i < 13; i++)
    {
        //console.log(+data3[i]);
        myDATA.push([data1[i],data2[i]]);
    }
 
   // console.log("Scatter")
    var svg = d3.select("svg"),
        margin = 200;
        svg.attr("width",724),
        svg.attr("height",724);
        width = svg.attr("width") - margin,
        height = svg.attr("height") - margin;

    svg.append("svg:defs").append("svg:marker")
    .attr("id","triangle")
    .attr("refX",6)
    .attr("refY",6)
    .attr("markerWidth",30)
    .attr("markerHeight",30)
    .attr("orient","auto")
    .append("path")
    .attr("d","M 0 0 12 6 0 12 3 6")
    .style("fill","rgb(38, 192, 97)")

    //svg.on("mousedown", null)
     var x = d3.scaleLinear().range([0, width]).domain([d3.min(data1)-0.2, d3.max(data1)+0.2]);
     var y = d3.scaleLinear().range([height, 0]).domain([d3.min(data2)-0.2, d3.max(data2)+0.2]);

    var g = svg.append("g")
        .attr("transform", "translate(" + 120 + "," + 90 + ")")

    


    g.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x))
    .attr("font-size", "15px");
    
    g.append("g")
    .attr("transform", "translate(0," + height - 10+ ")")
    .call(d3.axisLeft(y))
    .attr("font-size", "15px");

    g.append("g")
         .attr("transform", "translate(0," + height + ")")
         .append("text")
         .attr("y", 60)
         .attr("x", width/2-70)
         .attr("text-anchor", "middle")
         .attr("fill", "white")
         .attr("font-family", "sans-serif")
         .attr("font-size", "20px")
         .text("Dimension 1");
         
    g.append("g")
         .attr("transform", "translate(0," + height + ")")
         .append("text")
         .attr("y", -555)
         .attr("x", width/2-50)
         .attr("text-anchor", "middle")
         .attr("fill", "rgb(38, 192, 97)")
         .attr("font-family", "sans-serif")
         .attr("font-size", "25px")
         .text("MDS Variables Plot");

    g.append("g")
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 60)
        .attr("x", -280)
        .attr("dy", "-5.1em")
        .attr("text-anchor", "middle")
        .attr("fill", "white")
        .attr("font-family", "sans-serif")
        .attr("font-size", "20px")
        .text("Dimension 2");

        g.append("g")
        .call(d3.axisLeft(y).tickFormat("").ticks(10).tickSizeInner(-width)).attr("class", "grid");

    
    g.append("g")
    .selectAll("dot")
    .data(myDATA)
    .enter()
    .append("circle")
      .attr("cx", function (d) { return x(d[0]); } )
      .attr("cy", function (d,i) {
        if(fields[i] == "Dribbling")
        {
            return y(d[1])-60;
        }  
        else
        {
            return y(d[1]); 
        }})
      .on("mousedown",onmousedown)
      .transition()
      .ease(d3.easeLinear)
      .duration(0.5)
      .delay(function (d, i) {
          return i * 1;
      })
      .attr("r", 8) 
      .style("fill", "rgb(10, 61, 155)");

      var dribbling = 0;
        g.append("g")
            .selectAll("text")
            .data(myDATA)
            .enter()
            .append("text")
            .text(function(d,i){
                if(fields[i] == "Dribbling"){
                    dribbling = i;
                }
                return fields[i];
            })
            .attr("x", function (d) { return x(d[0])+20; } )
            .attr("y", function (d,i) { 
                if(dribbling == i){
                    return y(d[1])-80;
                } 
                else{
                    return y(d[1])-15; 
                }
            })
            .attr("fill","white")
            .style("text-anchor","middle")

        var pcpUserOrder = []
        pcpUserOrderVariables =[]

        function onmousedown(d,i){
            d3.event.preventDefault();
            var obj = {}
            obj["x"] = d3.select(this).attr("cx")
            obj["y"] = d3.select(this).attr("cy")
            pcpUserOrder.push(obj)

            var curr = pcpUserOrder.length-1

            pcpUserOrderVariables.push(fields[i])
            console.log(pcpUserOrderVariables)

            if(pcpUserOrder.length > 1 && pcpUserOrder.length < 14){
                g.append('line')
                .style("stroke","white")
                .attr("x1", pcpUserOrder[curr-1].x)
                .attr("y1", pcpUserOrder[curr-1].y)
                .attr("x2", pcpUserOrder[curr].x)
                .attr("y2", pcpUserOrder[curr].y)
                .attr("marker-end","url(#triangle)");

            }

        }

}
