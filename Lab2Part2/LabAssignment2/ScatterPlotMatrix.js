let jsondataScatterMatrix = "";
let apiUrlScatterMatrix = "http://127.0.0.1:5000/getScatterPlotmatrixValues?di="

async function fetchJsonData(url,n) {
    let response = await fetch(url);
    let data = await response.json()
    return data;
}


async function drawScatterMatrix(n) {
    newurl = apiUrlScatterMatrix
    newurl += String(n)
    //console.log(newurl)
    jsondataScatterMatrix = await fetchJsonData(newurl,n)
    //console.log("jsondataScatterMatrix")
    //console.log(jsondataScatterMatrix)
    //console.log(n)

    console.log("top 4 attributes")
    jsondataScatterMatrix.forEach(element => {
        //console.log(element["Attribute"])   
    });

    var element1 = document. getElementById("content");
    //console.log(element)
    if(element1 != null)
    {
        element1. parentNode. removeChild(element1);
    }

    var element4 = document. getElementById("content2");
    //console.log(element)
    if(element4 != null)
    {
        element4. parentNode. removeChild(element4);
    }

    var table = document.createElement('table');

    table.setAttribute('id', 'HighestPCATable');

    var arrHead = new Array();
    arrHead = ['Att. No', 'Attribute', 'Sum of Squares'];

    var arrValue = new Array();
    arrValue.push(['1', jsondataScatterMatrix[0]["Attribute"], jsondataScatterMatrix[0]["Value"]]);
    arrValue.push(['2', jsondataScatterMatrix[1]["Attribute"], jsondataScatterMatrix[1]["Value"]]);
    arrValue.push(['3', jsondataScatterMatrix[2]["Attribute"], jsondataScatterMatrix[2]["Value"]]);
    arrValue.push(['4', jsondataScatterMatrix[3]["Attribute"], jsondataScatterMatrix[3]["Value"]]);

    var tr = table.insertRow(-1);

    for (var h = 0; h < arrHead.length; h++) {
        var th = document.createElement('th');            
        th.innerHTML = arrHead[h];
        tr.appendChild(th);
    }

    for (var c = 0; c <= arrValue.length - 1; c++) {
        tr = table.insertRow(-1);

        for (var j = 0; j < arrHead.length; j++) {
            var td = document.createElement('td');        
            td = tr.insertCell(-1);
            td.innerHTML = arrValue[c][j];                 
        }
    }

    document.body.appendChild(table);

    var div1 = document.createElement('div');
    div1.id = 'content1';
    div1.className = 'note1';
    div1.innerHTML = '<p>Scatter Plot Matrix</p>';
    document.body.appendChild(div1);


    var div = document.createElement('ul');
    div.id = 'legend';
    div.className = 'legend';
    div.innerHTML = '<li><span class="whitedot"></span><text> Cluster 0</text></li><br></br><li><span class="bluedot"></span><text> Cluster 1</text></li><br></br><li><span class="greendot"></span><text> Cluster 2</text></li><br></br><li><span class="newdot"></span><text> Cluster 3</text></li><br></br>';
    document.body.appendChild(div);
    
    color = ["orange","rgb(32, 123, 241)","rgb(38, 192, 97)","purple"]


d3.selectAll("svg > *").remove();


var attributes = [jsondataScatterMatrix[0]["Attribute"], jsondataScatterMatrix[1]["Attribute"],
                    jsondataScatterMatrix[2]["Attribute"], jsondataScatterMatrix[3]["Attribute"]]
    
    top4 = attributes.length;

    var width = 900,
    size = (width / 5),
    padding = 22;

    var x = d3.scaleLinear()
    .range([padding / 2, size - padding / 2]);

    var y = d3.scaleLinear()
    .range([size - padding / 2, padding / 2]);

    var xAxis = d3.axisBottom()
    .scale(x)
    .ticks(5)
		.tickFormat(d3.format("d"));

    var yAxis = d3.axisLeft()
    .scale(y)
    .ticks(5)
		.tickFormat(d3.format("d"));;

    xAxis.tickSize(size * top4);
    yAxis.tickSize(-size * top4);

    d3.csv("new_data.csv", function(error, data) {
        if (error) throw error;

        data.forEach(function(d) {
            attributes.forEach(function(attribute) {
                return d[attribute] = +d[attribute];
            });
        });


        var attributeDomain = {};
  
        attributes.forEach(function(attribute) {
          attributeDomain[attribute] = d3.extent(data, function(d) { return d[attribute]; });
        });
      
        var g = d3.select("svg")
            .attr("width", size * top4 + padding)
            .attr("height", size * top4 + padding)
            .append("g")
            .attr("transform", "translate(" + 24 + "," + 10+ ")");

        g.selectAll(".x.axis")
            .data(attributes)
            .enter().append("g")
            .attr("transform", function(d, i) { return "translate(" + (top4 - i - 1) * size + ",0)"; })
            .each(function(d) {
                x.domain(attributeDomain[d]).nice();
                d3.select(this).call(xAxis);
            });

        g.selectAll(".y.axis")
            .data(attributes)
          .enter().append("g")
            .attr("transform", function(d, i) { return "translate(0," + i * size + ")"; })
            .each(function(d) { 
                y.domain(attributeDomain[d]);
                d3.select(this).call(yAxis); 
            });

            var cell = g.selectAll(".cell")
            .data(getCombinations(attributes,attributes))
            .enter().append("g")
            .attr("class", "cell")
            .attr("transform", function(d) { return "translate(" + (top4 - d.i - 1) * size + "," + d.j * size + ")"; })
            .each(plot);
    
        // Titles for the diagonal.
        cell.filter(function(d) { return d.i === d.j; }).append("text")
            .attr("x", size/2)
            .attr("y", size/2)
            .attr("text-anchor", "middle")
            .attr("fill","white")
            .text(function(d) { return d.x; });

        function plot(p) {
                var cell = d3.select(this);
            
                x.domain(attributeDomain[p.x]);
                y.domain(attributeDomain[p.y]);
            
                cell.append("rect")
                    .attr("class", "frame")
                    .classed("diagonal", function(d) {return d.i === d.j; })
                    .attr("x", 11)
                    .attr("y", 11)
                    .attr("width", size - 22 )
                    .attr("height", size - 22 );
            
                cell.filter(function(d) {return d.i !== d.j; }) 
                  .selectAll("circle")
                  .data(data)
                  .enter().append("circle")
                    .attr("cx", function(d) { return x(d[p.x]); })
                    .attr("cy", function(d) { return y(d[p.y]); })
                    .attr("r", 2.5)
                    .style("fill", function(d) {return color[d["ColorCluster"]]});
              }
       });

       function getCombinations(a,b) {
        var combinations = [], n = a.length, m = b.length, i, j;
        for (i = -1; ++i < n;){
            for (j = -1; ++j < m;){
                combinations.push({x: a[i], i: i, y: b[j], j: j});
            }
        }  
        console.log(combinations)
        return combinations;
      }
 
}
