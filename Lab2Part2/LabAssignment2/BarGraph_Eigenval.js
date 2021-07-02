let jsondata = "";
let apiUrl = "http://127.0.0.1:5000/getpca"
let barindex = 0;

async function fetchJsonData(url) {
    let response = await fetch(url);
    let data = await response.json()
    return data;
}

async function draw() {
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

    jsondata = await fetchJsonData(apiUrl)
    
    //console.log(jsondata);
    document.getElementById("mysvg").innerHTML = "";

    var div = document.createElement('div');
    div.id = 'content';
    div.className = 'note';
    div.innerHTML = '<p>Click on Bar to select Intrinsic Dimensionality Index</p>';
    document.body.appendChild(div);

    
     var svg = d3.select("svg"),
        margin = 100;
        svg.attr("width",724),
        svg.attr("height",724);
       var width = svg.attr("width")-100,
        height = svg.attr("height") - 180;

    
    var x = d3.scaleBand().range([0, width]).padding(0.4).domain(jsondata.map(function(d){return d.xval}));
    var y = d3.scaleLinear().range([height, 0]).domain([0, 100]).nice();
    

    var g = svg.append("g")
        .attr("transform", "translate(" + 80 + "," + 90 + ")");

        g.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))


    var xlabeheight = height+10;

    g.append("g")
        .attr("transform", "translate(0," + xlabeheight + ")")
        .append("text")
            .attr("y", 50)
            .attr("x", width/2 - 70)
            .attr("text-anchor", "middle")
            .attr("fill", "white")
            .attr("font-family", "sans-serif")
            .attr("font-size", "20px")
            .text("Principal Component");   

            g.append("g")
            .attr("transform", "translate(0," + height + ")")
            .append("text")
            .attr("y", -585)
            .attr("x", width/2-30)
            .attr("text-anchor", "middle")
            .attr("fill", "rgb(38, 192, 97)")
            .attr("font-family", "sans-serif")
            .attr("font-size", "21px")
            .text("Scree Plot showing Percentage Variance Explained vs Principal Component");
 

    g.append("g")
        .call(d3.axisLeft(y).tickFormat(function(d){
            return  d;
        }).ticks(10))
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 50)
        .attr("x", -240)
        .attr("dy", "-5.1em")
        .attr("text-anchor", "middle")
        .attr("fill", "white")
        .attr("font-family", "sans-serif")
        .attr("font-size", "20px")
        .text("Variance Explained (%)");

      g.append("g")
         .call(d3.axisLeft(y).tickFormat("").ticks(10).tickSizeInner(-width)).attr("class", "grid");
          
        g.selectAll(".bar")
         .data(jsondata).enter().append("rect")
         .on("mouseover", onMouseOver)
         .on("mousedown", onMouseDown)
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
         .attr("fill","rgb(10, 61, 155)");


         g.append("g")
         .selectAll("dot")
         .data(jsondata)
         .enter()
         .append("circle")
         .on("mouseover", onCircleMouseOver)
           .on("mouseout", onCircleMouseOut)
           .attr("cx", function (d,i) { return x(d.xval) + x.bandwidth()/2; } )
           .attr("cy", function (d) { return y(d.cumulative); } )
           .transition()
           .ease(d3.easeLinear)
           .duration(0.5)
           .delay(function (d, i) {
               return i * 1;
           })
           .attr("r", 8)
           .style("fill", "rgb(10, 61, 155)");

           g.append("path")
           .datum(jsondata)
           .attr("fill","none")
           .attr("stroke","orange")
           .attr("stroke-width",2)
           .attr("d",d3.line()
                .x(function(d,i) {
               return x(d.xval)+ x.bandwidth()/2;
             })
           .y(function(d,i) {
            return y(d.cumulative); 
           })
           );

         function onMouseOver(d, i) {
            d3.select(this).attr("fill", "rgb(38, 192, 97)");
            g.append("text")
                .attr('class', 'val')
                .attr('x', function() {
                    return x(d.xval);
                })
                .attr('y', function() {
                    return y(d.yval) - 15;
                })
                .text(function() {
                    t = +d.yval;
                    s = Math.round(t * 100) / 100;
                    return s;
                })
                .attr("fill", "rgb(38, 192, 97)");

        }

        function onCircleMouseOver(d, i) {
            d3.select(this).style("fill", "rgb(38, 192, 97)");
            g.append("text")
                .attr('class', 'val')
                .attr('x', function() {
                    return x(d.xval-0.25);
                })
                .attr('y', function() {
                    return y(d.cumulative);
                })
                .text(function() {
                    t = +d.cumulative;
                    s = Math.round(t * 100) / 100;
                    return s;
                })
                .attr("fill", "rgb(38, 192, 97)");

        }

        function onMouseDown(d, i) {

                barindex = i+1;
                drawScatterMatrix(barindex)
        }

        function onMouseOut(d, i) {
            d3.select(this).attr("fill","rgb(10, 61, 155)");
            d3.select(this)
                .transition()
                .duration(200)
                .attr('width', x.bandwidth())
                .attr("y", function() { return y(d.yval); })
                .attr("height", function() { return height - y(d.yval); });
    
            d3.selectAll('.val')
                .remove()
        }

        function onCircleMouseOut(d, i) {
            d3.select(this).style("fill", "rgb(10, 61, 155)")
                .transition()
                .duration(200)
                .attr('width', x.bandwidth())
                .attr("y", function() { return y(d.yval); })
                .attr("height", function() { return height - y(d.yval); });
    
            d3.selectAll('.val')
                .remove()
        }
}

function drawBarGraph() {
    
    draw();

}