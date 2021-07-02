function drawScatter(data1, data2, toPlot1, toPlot2) {
    


    var myDATA = [new Array('data1', 'data2')];
    for(i = 0 ; i <800; i++)
    {
        myDATA.push([data1[i],data2[i]]);
    }
    console.log(myDATA[1]);
 
   // console.log("Scatter")
    var svg = d3.select("svg"),
        margin = 200,
        width = svg.attr("width") - margin,
        height = svg.attr("height") - margin;

    svg.on("mousedown", null)
     var x = d3.scaleLinear().range([0, width]).domain([d3.min(data1), d3.max(data1)]);
     var y = d3.scaleLinear().range([height, 0]).domain([d3.min(data2), d3.max(data2)]);

    var g = svg.append("g")
        .attr("transform", "translate(" + 100 + "," + 100 + ")")

    


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
         .attr("y", height - 250)
         .attr("x", width/2)
         .attr("text-anchor", "middle")
         .attr("fill", "white")
         .attr("font-family", "sans-serif")
         .attr("font-size", "20px")
         .text(toPlot1);

    g.append("g")
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 70)
        .attr("x", -150)
        .attr("dy", "-5.1em")
        .attr("text-anchor", "middle")
        .attr("fill", "white")
        .attr("font-family", "sans-serif")
        .attr("font-size", "25px")
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
      .style("fill", "white");
 
}
