let jsondataBiplot = "";
let apiUrlBiplot = "http://127.0.0.1:5000/getpca1and2"

async function fetchJsonData(url) {
    let response = await fetch(url);
    let data = await response.json()
    return data;
}


async function drawBiplot(toPlot1, toPlot2,data3) {
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

    var div = document.createElement('ul');
    div.id = 'legend';
    div.className = 'legend';
    div.innerHTML = '<li><span class="whitedot"></span><text> Cluster 0</text></li><br></br><li><span class="bluedot"></span><text> Cluster 1</text></li><br></br><li><span class="greendot"></span><text> Cluster 2</text></li><br></br><li><span class="newdot"></span><text> Cluster 3</text></li><br></br>';
    document.body.appendChild(div);


    jsondataBiplot = await fetchJsonData(apiUrlBiplot)
    //console.log(jsondataBiplot)
    data1 = jsondataBiplot["pc1"]
    data2 = jsondataBiplot["pc2"]
    min1 = Math.min.apply(Math, data1)
    max1 = Math.max.apply(Math, data1)
    //console.log("max");
    //console.log(max1);
    //Normalizing
    data1.forEach(function(element, index) {
        this[index] = (+element) / ((+max1) - (+min1))
    },data1);

    //console.log("After normaizing")
    //console.log(data1);


    min2 = Math.min.apply(Math, data2)
    max2 = Math.max.apply(Math, data2)
    //console.log("max");
    //console.log(max2);
    //Normalizing
    data2.forEach(function(element, index) {
        this[index] = (+element) / ((+max2) - (+min2))
    },data2);

    //console.log("After normaizing")
    //console.log(data2);

    var myDATA = [new Array('data1', 'data2','data3')];
    for(i = 0 ; i <800; i++)
    {
        //console.log(+data3[i]);
        myDATA.push([data1[i],data2[i],data3[i]]);
    }

    biplotcolor = ["orange","rgb(32, 123, 241)","rgb(38, 192, 97)","purple"];

    console.log(myDATA[2]);
 
   // console.log("Scatter")
    var svg = d3.select("svg"),
        margin = 200;
        svg.attr("width",724),
        svg.attr("height",724);
        width = svg.attr("width") - margin,
        height = svg.attr("height") - margin;

    svg.on("mousedown", null)
     var x = d3.scaleLinear().range([0, width]).domain([d3.min(data1), d3.max(data1)]);
     var y = d3.scaleLinear().range([height, 0]).domain([d3.min(data2), d3.max(data2)]);

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
         .text(toPlot1);
         
    g.append("g")
         .attr("transform", "translate(0," + height + ")")
         .append("text")
         .attr("y", -555)
         .attr("x", width/2-50)
         .attr("text-anchor", "middle")
         .attr("fill", "rgb(38, 192, 97)")
         .attr("font-family", "sans-serif")
         .attr("font-size", "25px")
         .text("BiPlot between top 2 PCs");

    g.append("g")
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 70)
        .attr("x", -280)
        .attr("dy", "-5.1em")
        .attr("text-anchor", "middle")
        .attr("fill", "white")
        .attr("font-family", "sans-serif")
        .attr("font-size", "20px")
        .text(toPlot2);

        g.append("g")
        .call(d3.axisLeft(y).tickFormat("").ticks(10).tickSizeInner(-width)).attr("class", "grid");

    
    g.append("g")
    .selectAll("dot")
    .data(myDATA)
    .enter()
    .append("circle")
      .attr("cx", function (d) { return x(d[0]); } )
      .attr("cy", function (d) { return y(d[1]); } )
      .transition()
      .ease(d3.easeLinear)
      .duration(0.5)
      .delay(function (d, i) {
          return i * 1;
      })
      .attr("r", 3)
      .style("fill", function(d) {return biplotcolor[d[2]]});


      var biplotPoint = jsondataBiplot["biPlotLine"]
      
      function lineMouseOver() {
        d3.select(this).style("stroke-width", "4")
        .style("stroke","red")
      }

      function lineMouseOut() {
        d3.select(this).style("stroke-width", "2")
        .style("stroke","rgb(34, 114, 235)")
      }

      function textMouseOver() {
        d3.select(this).attr("font-size", "16")
        .attr("fill", "red")
      }

      function textMouseOut() {
        d3.select(this).attr("font-size", "13")
        .attr("fill", "yellow")
      }

      biplotPoint.forEach(index =>{

        g.append("text")
        .attr("x", function() {
            return x(index.x)
        })
        .attr("y", function() {
            return y(index.y)
        })
        .text(function(){
            return index.attr
        })
        .attr("fill", "yellow")
        .attr("font-size", "13")
        .attr("font-family", "Archia")
        .style("backgroud-color", "white")
        .on("mouseover", textMouseOver)
        .on("mouseout", textMouseOut)

        g.append('line')
        .style("stroke","rgb(34, 114, 235)")
        .style("stroke-width",2)
        .attr("x1",x(0))
        .attr("y1",y(0))
        .attr("x2", x(index.x))
        .attr("y2",y(index.y))
        .on("mouseover", lineMouseOver)
        .on("mouseout", lineMouseOut)
  
      });
 
}
