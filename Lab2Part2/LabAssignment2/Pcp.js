function drawpcp(colordata,dimensions){
    console.log(dimensions);
    if(dimensions.length == 0)
    {
        dimensions = ['OVA','Pace','Finishing','Shot','Age','Height','Pass','Defend','Physical','Goalkeeping','Penalties','Crossing','Dribbling']
    }
    var margin = {top: 30, right: 60, bottom: 90, left: 60},
    width = 1000 - margin.left - margin.right,
    height = 700 - margin.top - margin.bottom;


    var element2 = document. getElementById("legend");
    //console.log(element)
    if(element2 != null)
    {
        element2. parentNode. removeChild(element2);
    }

    var element = document. getElementById("HighestPCATable");
    //console.log(element)
    if(element != null)
    {
        element. parentNode. removeChild(element);
    }

    var element4 = document. getElementById("content2");
    //console.log(element)
    if(element4 != null)
    {
        element4. parentNode. removeChild(element4);
    }
    var element1 = document. getElementById("content");
    //console.log(element)
    if(element1 != null)
    {
        element1. parentNode. removeChild(element1);
    }

    var div = document.createElement('ul');
    div.id = 'legend';
    div.className = 'legend';
    div.innerHTML = '<li><span class="whitedot"></span><text> Cluster 0</text></li><br></br><li><span class="bluedot"></span><text> Cluster 1</text></li><br></br><li><span class="greendot"></span><text> Cluster 2</text></li><br></br><li><span class="newdot"></span><text> Cluster 3</text></li><br></br>';
    document.body.appendChild(div);

    var x = d3.scalePoint().range([10, width-10], 1),
    y = {},
    dragging = {};

    var line = d3.line(),
    axis = d3.axisLeft(),
    foreground;

    var svg = d3.select("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    
    pcpcolor = ["orange","rgb(32, 123, 241)","rgb(38, 192, 97)","purple"];

    d3.csv("new_data.csv", function(error, val) {

        // Extract the list of dimensions and create a scale for each.
        // x.domain(dimensions = d3.keys(val[0]).filter(function(d) {
        // return  d != "ColorCluster" && (y[d] = d3.scaleLinear()
        //     .domain(d3.extent(val, function(p) { return +p[d]; }))
        //     .range([height, 0]));
        // }));

        x.domain(dimensions)
        dimensions.forEach(d =>{
            y[d] = d3.scaleLinear()
            .domain(d3.extent(val, function(p) { return +p[d]; }))
            .range([height, 0]);
            y[d].brush = d3.brushY()
                .extent([[-8, y[d].range()[1]], [8, y[d].range()[0]]])
                .on('brush', brush);
        })

        // Add blue foreground lines for focus.
    foreground = svg.append("g")
                    .attr("class", "foreground")
                    .selectAll("path")
                    .data(val)
                    .enter().append("path")
                    .attr("d", path)
                    .attr("style", function(d,i) {
                        return "stroke:" + pcpcolor[colordata[i]] + ";";
                    });

        // Add a group element for each dimension.
        var g = svg.selectAll(".dimension")
        .data(dimensions)
        .enter().append("g")
        .attr("class", "dimension")
        .attr("stroke","white")
        .attr("fill","white")
        .attr("transform", function(d) { return "translate(" + x(d) + ")"; })
        .call(d3.drag()
            .subject(function(d) { return {x: x(d)}; })
            .on("start", function(d) {
            dragging[d] = x(d);
            })
            .on("drag", function(d) {
            dragging[d] = Math.min(width, Math.max(0, d3.event.x));
            foreground.attr("d", path);
            dimensions.sort(function(a, b) { return position(a) - position(b); });
            x.domain(dimensions);
            g.attr("transform", function(d) { return "translate(" + position(d) + ")"; })
            })
            .on("end", function(d) {
            delete dragging[d];
            transition(d3.select(this)).attr("transform", "translate(" + x(d) + ")");
            transition(foreground).attr("d", path);
            }));



        // // Add an axis and title.
        g.append("g")
        .attr("class", "axis1")
        .each(function(d) { d3.select(this).call(axis.scale(y[d])); })
        .append("text")
        .style("text-anchor", "middle")
        .attr("stroke", "white")
        .attr("fill","white")
        .attr("font-family", "sans-serif")
        .attr("font-size", "13px")
        .attr("y", -9)
        .text(function(d) { return d; });

        // Add and store a brush for each axis.
        g.append("g")
        .attr("class", "brush")
        .each(function(d) {
            d3.select(this).call(y[d].brush);
        })
        .selectAll("rect")
        .attr("x", 0)
        .attr("width", 2);


        
    });

    svg.append("g")
            .attr("transform", "translate(0," + 650 + ")")
            .append("text")
            .attr("y", -10)
            .attr("x", width/2-30)
            .attr("text-anchor", "middle")
            .attr("fill", "white")
            .attr("font-family", "sans-serif")
            .attr("font-size", "21px")
            .text("Parallel Coordinates Plot");

    function position(d) {
        var v = dragging[d];
        return v == null ? x(d) : v;
    }

    function transition(g) {
    return g.transition().duration(500);
    }

    // Returns the path for a given data point.
    function path(d) {
    return line(dimensions.map(function(p) { return [position(p), y[p](d[p])]; }));
    }

    function brush() {
        const actives = [];
        svg.selectAll('.brush')
        .filter(function(d) {
            return d3.brushSelection(this);
          })
          .each(function(d) {
            actives.push({
              dimension: d,
              extent: d3.brushSelection(this)
            });
          });
        foreground.style('display', function(d) {
          return actives.every(function(active) {
            const dim = active.dimension;
            return active.extent[0] <= y[dim](d[dim]) && y[dim](d[dim]) <= active.extent[1];
          }) ? null : 'none';
        });
    }
}
