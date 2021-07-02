function drawBarGraph(data, toPlot) {

    var countOfvalues = data.reduce((acc, e) => acc.set(e, (acc.get(e) || 0) + 1), new Map());
    var res = [];
    
    if(toPlot == "Club" || toPlot == "Nationality")
    {
        countOfvalues.forEach(function(val, key) {
            if(val < 5)
            {
                countOfvalues.delete(key); //deleting club and countries keys with less than 5 players
            }
        });
    }


    countOfvalues.forEach(function(val, key) {

        res.push({ xval: key, yval: val });
    });

    //console.log(res);
    
    var svg = d3.select("svg"),
        margin = 200,
        width = svg.attr("width")-100,
        height = svg.attr("height") - margin;
    
    svg.on("mousedown", null)
    console.log(width);
    console.log(height);
    
    var x = d3.scaleBand().range([0, width]).padding(0.4).domain(res.map(function(d){return d.xval}));
    var y = d3.scaleLinear().range([height, 0]).domain([0, d3.max(res,function(d,i){return d.yval})]).nice();
    
    var color1 = d3.schemeCategory20;
    var color2 = d3.schemeCategory20b;
    var color3 = d3.schemeCategory20c;
    var color4 = color1.concat(color2).concat(color3);
    var colors = color4.concat(color4);
    console.log(colors);

    var g = svg.append("g")
        .attr("transform", "translate(" + 100 + "," + 100 + ")");

    if(toPlot == "Club" || toPlot == "Nationality")
    {
         g.append("g")
         .attr("transform", "translate(0," + height + ")")
         .call(d3.axisBottom(x))
         .attr("font-size", "10px")
         .selectAll("text")  
            .style("text-anchor", "end")
            .attr("dx", "-1em")
            .attr("dy", "-0.5em")
            .attr("transform", "rotate(-45)");
    }
    else
    {
        g.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))
    }

    var xlabeheight = height+10;
    if(toPlot == "Club")
    {
        xlabeheight = height+10;
    }

    if(toPlot == "Club" || toPlot == "Nationality")
    {
        g.append("g")
        .attr("transform", "translate(0," + xlabeheight + ")")
        .append("text")
            .attr("y", height - 220)
            .attr("x", width/2 -70)
            .attr("text-anchor", "middle")
            .attr("fill", "white")
            .attr("font-family", "sans-serif")
            .attr("font-size", "20px")
            .text(toPlot);  
    }
    else
    {
        g.append("g")
        .attr("transform", "translate(0," + xlabeheight + ")")
        .append("text")
            .attr("y", height - 250)
            .attr("x", width/2 - 70)
            .attr("text-anchor", "middle")
            .attr("fill", "white")
            .attr("font-family", "sans-serif")
            .attr("font-size", "20px")
            .text(toPlot);   
    }
 

    g.append("g")
        .call(d3.axisLeft(y).tickFormat(function(d){
            return  d;
        }).ticks(10))
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
         .data(res).enter().append("rect")
         .on("mouseover", onMouseOver)
         .on("mouseout", onMouseOut)
         .attr("x", function(d, i) { return x(d.xval); })
         .attr("width", x.bandwidth())
         .transition()
         .ease(d3.easeLinear)
         .duration(200)
         .delay(function (d, i) {
             return i * 50;
         })
         .attr("height", function(d, i) { return height -y(d.yval); })
         .attr("x", function(d, i) { return x(d.xval); })
         .attr("y", function(d, i) { return y(d.yval); })
         .attr("fill", function(d, i) { return colors[i]; });

         function onMouseOver(d, i) {
            d3.select(this).attr('class', 'highlight');
            g.append("text")
                .attr('class', 'val')
                .attr('x', function() {
                    return x(d.xval);
                })
                .attr('y', function() {
                    return y(d.yval) - 15;
                })
                .text(function() {
                    return [+d.yval];
                })
                .attr("fill", "red");
        }

        function onMouseOut(d, i) {
            d3.select(this).attr('class', 'bar');
            d3.select(this)
                .transition()
                .duration(200)
                .attr('width', x.bandwidth())
                .attr("y", function() { return y(d.yval); })
                .attr("height", function() { return height - y(d.yval); });
    
            d3.selectAll('.val')
                .remove()
        }

        }