// set the dimensions and margins of the graph
var margin = {top: 30, right: 30, bottom: 70, left: 60},
    width = 920 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#barchart3")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

// Initialize the X axis
var x = d3.scaleBand()
  .range([ 0, width ])
  .padding(0.2);
var xAxis = svg.append("g")
  .attr("transform", "translate(0," + height + ")")

svg.append("text")
  .attr("class", "x label")
  .attr("text-anchor", "end")
  .attr("x", 400)
  .attr("y", 350)
  .text("Year");

// Initialize the Y axis
var y = d3.scaleLinear()
  .range([ height, 0]);
var yAxis = svg.append("g")
  .attr("class", "myYaxis")
  svg.append("text")
  .attr("class", "y label")
  .attr("text-anchor", "end")
  .attr("y", -15)
  .attr("dy", "-2em")
  .attr("x", -50)
  .attr("transform", "rotate(-90)")
  .text("Annual Tuition Fee (in USD)");

var tooltip = d3.select("body").append("div").attr("class", "toolTip");
// A function that create / update the plot for a given variable:
function updateDepartment(selectedVar) {

  // Parse the Data
  d3.csv("./tuition_graduate.csv")
  .then (function(data) {
    console.log(data)
    // X axis
    x.domain(data.map(function(d) { return d.academic; }))
    xAxis.transition().duration(1000).call(d3.axisBottom(x))

    // Add Y axis
    y.domain([0, d3.max(data, function(d) { return +d[selectedVar] }) ]);
    yAxis.transition().duration(1000).call(d3.axisLeft(y));

    // variable u: map data to existing bars
    var u = svg.selectAll("rect")
      .data(data)

    // update bars
    u
      .enter()
      .append("rect")
      .merge(u)
      // .transition()
      // .duration(2000)
        .attr("x", function(d) { return x(d.academic); })
        .attr("y", function(d) { return y(d[selectedVar]); })
        .attr("width", x.bandwidth())
        .attr("height", function(d) { return height - y(d[selectedVar]); })
        .attr("fill", "#69b3a2")
        .on("mousemove", function(d){
          tooltip
            .style("left", d3.event.pageX - 80 + "px")
            .style("top", d3.event.pageY - 100 + "px")
            .style("display", "inline-block")
            .html((selectedVar) + "<br>"+(d.academic) + "<br>" + "$" + (d[selectedVar]).toLocaleString());
          d3.select(this).style('fill', 'red')
        })
        .on("mouseout", function(d){
           tooltip.style("display", "none");
           d3.select(this).style('fill', '#69b3a2')
        });


  })


}

// Initialize plot
updateDepartment('MBA')