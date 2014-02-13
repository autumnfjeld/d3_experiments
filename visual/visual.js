var width = 960,
    height = 600,
    r = 12,
    gravity = 0.1,
    distance = 200,
    charge = -200,
    //fill = d3.scale.category10(),

    // these are the quantities
    // the groups are
    // 1: essential axiomatic units m, l, t
    // 2: related to movement
    // 3: related to energy
    // 4: related to a single unit
    nodes=[
        {title:"One",    url:"www.article-one.com",    unit:"kg", group:1},
        {title:"Two",    url:"www.article-two.com",    unit:"s", group:1},
        {title:"Three",  url:"www.article-three.com",  unit:"m", group:1},
        {title:"Four",   url:"www.article-four.com",   unit:"N", group:3},
        {title:"Five",   url:"www.article-five.com",   unit:"m/s", group:2},
        {title:"Six",    url:"www.article-six.com",    unit:"kg", group:1},
        {title:"Seven",  url:"www.article-seven.com",  unit:"s", group:1},
        {title:"Eight",  url:"www.article-eight.com",  unit:"m", group:1},
        {title:"Nine",   url:"www.article-nine.com",   unit:"N", group:3},
        {title:"Ten",    url:"www.article-ten.com",    unit:"m/s", group:2}

    ],

    // the relations shown can be calculated using
    // formulas from either 1 or 2 other quantities
    links=[
        {"source":0,"target":1,"value":1}, {"source":0,"target":4,"value":1},
        {"source":1,"target":2,"value":1}, {"source":1,"target":8,"value":1},
        {"source":1,"target":3,"value":1}, {"source":1,"target":9,"value":2},
        {"source":2,"target":4,"value":1}, {"source":2,"target":5,"value":1},
        {"source":3,"target":5,"value":1}, {"source":4,"target":7,"value":1},
        {"source":4,"target":8,"value":1}, {"source":6,"target":9,"value":2},
        {"source":5,"target":4,"value":1}, {"source":7,"target":4,"value":1},
        {"source":8,"target":1,"value":1}, {"source":8,"target":1,"value":1},
        {"source":9,"target":3,"value":1}, {"source":9,"target":3,"value":2}
    ];


// create the canvas for the model
var svgCanvas = d3.select("body").append("svg")
  .attr("width", width)
  .attr("height", height);

// construct the force-directed layout
var forceLayout = d3.layout.force()
  .gravity(gravity)
  .distance(distance)
  .charge(charge)
  .size([width, height]);  //size of force layout

// set up data 'feed in' -- nothing displayed until added to DOM
forceLayout.nodes(nodes)
  .links(links)
  .start();

// now add data to svg
var link = svgCanvas.selectAll(".link")
  .data(links)
  .enter().append("line")
  .attr("class", "link");

var node = svgCanvas.selectAll(".node")
  .data(nodes)
  .enter().append("g")  ///g element used to group svg shapes gote
  .attr("class", "node")
  .call(forceLayout.drag);  

node.append("image")
  .attr("xlink:href", "Wiki.png")
  //.attr("xlink:href", "https://upload.wikimedia.org/wikipedia/en/b/bc/Wiki.png")
  .attr("x", -18)
  .attr("y", -18)
  .attr("width", 46)
  .attr("height", 46);

node.append("text")
  .attr("dx", 22)
  .attr("dy", "-.15em")
  .text(function(d) { return d.title });

forceLayout.on("tick", function() {
    link.attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });
node.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
  });




