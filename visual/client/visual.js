var width = 960,
    height = 600,
    r = 12,
    gravity = 0.1,   //force at center of layout
    distance = 1,//length of link
    charge = -400,    //repulsive force between nodes
        //fill = d3.scale.category10(),
    data = null;

// create the canvas for the model
var svgCanvas = d3.select("body").append("svg")
  .attr("width", width)
  .attr("height", height);

// construct the force-directed layout
var forceLayout = d3.layout.force()
  .gravity(gravity)
  .linkDistance(function(link){ return link.value; })
  .charge(charge)
  .size([width, height]);  //size of force layout

var visualize = function(){
  // set up data 'feed in' -- nothing displayed until added to DOM
  forceLayout.nodes(data.nodes)
    .links(data.links)
    .start();

  // add data to links and nodes
  var link = svgCanvas.selectAll(".link")
    .data(data.links)
    .enter().append("line")
    .attr("class", "link");

  var node = svgCanvas.selectAll(".node")
    .data(data.nodes)
    .enter().append("g")        //g element used to group svg shapes 
    .attr("class", "node");

  node.append("image")
    .attr("xlink:href", "Wiki.png")
    .attr("x", -18)
    .attr("y", -18)
    .attr("width", 36)
    .attr("height", 36);

  // add tooltip
  node.append("title").text(function(d, i) { return "Yo some info!" + d.url; });
  $('.node')

  // var text = svgCanvas.selectAll(".text")  //svg element consisting of text
  //   .data(forceLayout.nodes())
  //   .enter().append("g");

  //set up rectangle for background coloring behind text, then overlay with text
  // node.append("text")
  //   .attr("class", "shadow")
  //   .attr("dx", 22)
  //   .attr("dy", "-.15em")
  //   .text(function(d) { return d.title; });


  // set node & link positions on tick -- d must be calculated from force settings???
  forceLayout.on("tick", function() { 
    link.attr("x1", function(d) { return d.source.x; })  //pos of source node
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })  //pos of target node
        .attr("y2", function(d) { return d.target.y; });
    node.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
    // node.attr("cx", function(d) {return d.x})
    //     .attr("cy", function(d) {return d.y});
  });
};

// get json data and assign to global variable
//debugger;
d3.json("testdata.json", function(jsondata){
  data = jsondata;
  console.log('got data',data);
  visualize();
});


