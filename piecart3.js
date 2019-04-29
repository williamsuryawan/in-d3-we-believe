// set the dimensions and margins of the graph
var width = 450
    height = 450
    margin = 40

// The radius of the pieplot is half the width or half the height (smallest one). I substract a bit of margin.
var radius = Math.min(width, height) / 2 - margin

// append the svg object to the div called 'my_dataviz'
var pieChart3 = d3.select("#piechart3")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .style('background', '#D3D3D3')
    .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")")

// create 2 data_set
var data1 = {a: 9, b: 20, c:30, d:8, e:12}
var data2 = {a: 6, b: 16, c:20, d:14, e:19, f:12}
var data3 = {a: 6, b: 16, c:20, d:14, e:19, f:12, g:20, h:15}

function updateDataPie (input) {
    d3.csv("./tuition_graduate.csv")
    .then (function(data) {
        console.log("data pie", data)
        filterData = data.filter(function (item) {
            return item.academic == input;
        });
        delete filterData[0].academic;
        console.log("hasil filter", filterData[0])
        updatePieYear(filterData[0])
    })
    // updatePieYear(input)
}
// set the color scale
var color = d3.scaleOrdinal()
  .domain(["academic", "MBA", "Divinity", "Education", "Law", "PublicHealth", "Medical"])
  .range(d3.schemeDark2);

// A function that create / update the plot for a given variable:
function updatePieYear(data) {
    console.log("invoke pie", data)
  // Compute the position of each group on the pie:
  var pie = d3.pie()
    .value(function(d) {return d.value; })
    // .sort(function(a, b) { console.log("dalam pie", a) ; return d3.ascending(a.key, b.key);} ) // This make sure that group order remains the same in the pie chart
  var data_ready = pie(d3.entries(data))

  console.log("sebelum enter", data_ready)
  // map to data
  var u = pieChart3.selectAll("path")
    .data(data_ready)
  // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
  u
    .enter()
    .append('path')
    .merge(u)
    .transition()
    .duration(3000)
    .attr('d', d3.arc()
      .innerRadius(0)
      .outerRadius(radius)
    )
    .attr('fill', function(d){ return(color(d.data.key)) })
    .attr("stroke", "white")
    .style("stroke-width", "3px")
    .style("opacity", 1)

    u
    .enter()  
    .append('text')
    .text(function(d){ return d.data.key})
    .attr("transform", function(d) { return "translate(" + d3.arc()
        .innerRadius(0)
        .outerRadius(radius).centroid(d) + ")";  })
    .style("text-anchor", "middle")
    .style("font-size", 17)
    
    
  // remove the group that is not present anymore
  u
    .exit()
    .remove()

}

// Initialize the plot with the first dataset
updateDataPie(1986)