 function drawHistogram(data, noOfBins, toPlot) {

    var dataMin = d3.min(data);
    var dataMax = d3.max(data);

    var binWidth = (dataMax - dataMin)/noOfBins;

    //console.log(binWidth);

    var Value_Yaxis = new Array(noOfBins).fill(0);
    //console.log(Value_Yaxis);
    data.forEach(function (d) {
        //console.log(d);
        Value_Yaxis[Math.floor((d - dataMin)/binWidth)]++;
    });
    
    //console.log(Value_Yaxis);

    
    var Range_Xaxis = [];
    for(var i = 0; i < noOfBins; i++){
        var end = (+dataMin + +binWidth).toFixed(1);
        Range_Xaxis.push(dataMin); //X axis value
        //console.log(Range_Xaxis);
        dataMin = end;
    }
    Range_Xaxis.push(dataMin);
    

    var svg = d3.select("svg"),
        margin = 200,
        width = svg.attr("width") - margin,
        height = svg.attr("height") - margin;
    
    svg.attr("class", "hist")

    var x = d3.scaleBand().range([0, width]).padding(0).domain(Range_Xaxis);
    var y = d3.scaleLinear().range([height, 0]).domain([0, d3.max(Value_Yaxis)]);

    var g = svg.append("g")
        .attr("transform", "translate(" + 100 + "," + 100 + ")")


        g.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))
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
         .text(toPlot);

         g.append("g")
         .attr("transform", "translate(0," + height+ ")")
         .append("text")
         .attr("y", height - 220)
         .attr("x", width/2)
         .attr("text-anchor", "middle")
         .attr("fill", "white")
         .attr("font-family", "sans-serif")
         .attr("font-size", "20px")
         .text("No of Bins = " + noOfBins);



     g.append("g")
        .call(d3.axisLeft(y).tickFormat(function(d){
            return  d;
        }).ticks(10))
        .attr("font-size", "15px");
    
        g.append("g")
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 50)
        .attr("x", -140)
        .attr("dy", "-5.1em")
        .attr("text-anchor", "middle")
        .attr("fill", "white")
        .attr("font-family", "sans-serif")
        .attr("font-size", "20px")
        .text("Number of Players");

     g.append("g")
         .call(d3.axisLeft(y).tickFormat("").ticks(10).tickSizeInner(-width)).attr("class", "grid");

    g.selectAll(".bar")
        .data(Range_Xaxis)
        .enter().append("rect")
        .attr("class", "bar")
        .on("mouseover", onMouseOver)
        .on("mouseout", onMouseOut)
        .attr("x", function(d) { return x(d)+(x.bandwidth())/2 ; })
        .attr("y", height)
        .attr("height", 0)
        .attr("width", x.bandwidth())
        .transition()
        .ease(d3.easeLinear)
        .duration(600)
        .attr("y", function(d,i) { return y(Value_Yaxis[i]); })
        .attr("height", function(d,i) { return height - y(Value_Yaxis[i]); });

    function onMouseOver(d, i) {
        d3.select(this).attr('class', 'highlight');


        g.append("text")
            .attr('class', 'val')
            .attr('x', function() {
                
                return x(d)+(x.bandwidth())/2+10 ;
                
            })
            .attr('y', function() {
                console.log((i));
                return y(Value_Yaxis[i]) - 2;
            })
            .text(function() {
                return [+Value_Yaxis[i]];
            })
            .attr("fill", "red");
    }

    function onMouseOut(d, i) {
        d3.select(this).attr('class', 'bar');
        d3.select(this)
            .transition()
            .duration(200)
            .attr('width', x.bandwidth())
            .attr("y", function() { return y(Value_Yaxis[i]); })
            .attr("height", function() { return height - y(Value_Yaxis[i]); });

        d3.selectAll('.val')
            .remove()
    }



    d3.select(".hist").on("mousedown", function() {
        console.log("Mouse Down")
        console.log( d3.event.pageX, d3.event.pageY )
        var mouseisdown = true;
        var xOnDown = d3.event.pageX;
        //InitialNoOfBins = noOfBins;

        d3.select(window)
              .on("mousemove", mousemove)
               .on("mouseup", mouseup);
        
           d3.event.preventDefault();
        
          function mousemove() {
            //console.log("Mouse Moving");
            
            if(Boolean(mouseisdown) == true)
            {   var xOnMove = d3.event.pageX;
                
                if(xOnMove - xOnDown > 20)
                {
                    d3.selectAll("svg > *").remove();
                    noOfBins--;
                    if(noOfBins < 1)
                    {
                        noOfBins = 1;
                    }
                    drawHistogram(data, noOfBins, toPlot);
                    xOnDown = xOnMove
                }
                else if(xOnDown - xOnMove > 20)
                {
                    d3.selectAll("svg > *").remove();
                    console.log("Increasing bins");
                    noOfBins++;
                    if(noOfBins > 25)
                    {
                        noOfBins = 25;
                    }
                    drawHistogram(data, noOfBins, toPlot);
                    xOnDown = xOnMove
                } 
              }
            }
        
          function mouseup() {
            //console.log("Mouse up");
            //console.log( d3.event.pageX, d3.event.pageY );
            mouseisdown = false;

          }
        });
}