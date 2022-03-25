import * as d3 from "d3";
import React, { useEffect } from 'react';
import { useListContext } from "react-admin";
import './trombinoGraph.css';

const json = {
      "nodes": [
              {"id":0, "label": "Bastien", "@type":"pair:Person" },
              {"id":1, "label": "Simon", "@type":"pair:Person" },
              {"id":2, "label": "Seb", "@type":"pair:Person" },
              {"id":3, "label": "Yannick", "@type":"pair:Person" },
              {"id":4, "label": "Vincent", "@type":"pair:Person" },
              {"id":5, "label": "Pierre", "@type":"pair:Person" },
              {"id":6, "label": "Niko", "@type":"pair:Person" },
              {"id":7, "label": "Guillaume", "@type":"pair:Person" }
      ],
      "links": [
              {"index":0, "source": 0, "target": 1 },
              {"index":1, "source": 0, "target": 2 },
              {"index":2, "source": 0, "target": 3 },
              {"index":3, "source": 3, "target": 4 },
              {"index":4, "source": 3, "target": 5 },
              {"index":5, "source": 3, "target": 6 },
              {"index":6, "source": 3, "target": 7 }
      ]
}

function Graph() {
    const height = 600;
    const width = 1000;

    const simulation = d3.forceSimulation()
        .force("link", d3.forceLink().id(function(d) { return d.id; }).distance(100).strength(1))
        .force("charge", d3.forceManyBody())
        .force("center", d3.forceCenter(width / 2, height / 2));

    useEffect(() => {
      const svg = d3.select('.chart')
        .attr('width', width)
        .attr('height', height);

      var link = svg.append("g")
          .attr("class", "links")
        .selectAll("line")
        .data(json.links)
        .enter().append("line");

      var node = svg.append("g")
          .attr("class", "node")
        .selectAll("#node")
        .data(json.nodes)
        .enter()
        .append("g")
        .attr("id", "node")
        .attr("class", "g_node")
        .call(d3.drag()
            .on("start", function dragstarted(event,d) {
              if (!event.active) simulation.alphaTarget(0.3).restart();
              d.fx = d.x;
              d.fy = d.y;
            })
            .on("drag", function dragged(event,d) {
              d.fx = event.x;
              d.fy = event.y;
            })
            .on("end", function dragended(event,d) {
              if (!event.active) simulation.alphaTarget(0);
              d.fx = null;
              d.fy = null;
            })
          );

        node
          .append("rect")
          .attr("id", "nodecircle")
          .attr("class", "nodecircle")
          .attr("x", function (d){
            var radius = 20;
            var x = -radius;
            return x;
          })
          .attr("y", function (d){
            var radius = 20;
            var y = -radius;
            return y;
          })
          .attr("width", function (d){
            var radius = 20;
            var width = radius*2;
            return width;
          })
          .attr("height", function (d){
            var radius = 20;
            var height = radius*2;
            return height;
          })
          .attr("rx", 50)
          .attr("ry", 50)

          .attr("style",function(d) {
            var style =
                        "fill:#FFF800;"
                        +"stroke:#FFF800;"
                        +"stroke-width:1;"

            return style;
          })

          .style("stroke-opacity", 1)
          .style("cursor", "move")
          .style("opacity", 1)

          // Ajout du label sur les noeuds

        var fo_content_closed_node_label = node
          .append("foreignObject")
          .attr("id", "fo_content_closed_node_label")
          .attr("x", -160 / 2)
          .attr("y", -60 / 2)
          .attr("width", 160)
          .attr("height", 60)

        //fo xhtml
        var fo_xhtml_content_closed_node_label = fo_content_closed_node_label
          .append('xhtml:div')
          .attr("class", "fo_xhtml_content_closed_node_label")
          .attr("style", "width:"+160+"px;"
                        +"height:"+60+"px;")

        //label_closed_node
        fo_xhtml_content_closed_node_label
          .append("div")
          .attr("id", "label_closed_node")
          .attr("class", "label_closed_node")
          .attr("style", function(d) {
            var color = "#FFF800";
            var style = "background-color:rgba(" + color
                                        + "," + .5 + ");"
                                        + "border: 1px solid rgba("
                                        + color + ","
                                        + .5 + ");"
                                        + "-moz-border-radius:" + 20 + "px;"
                                        + "-webkit-border-radius:" + 20 + "px;"
                                        + "border-radius:" + 20 + "px;"
            return style;
          })
          .html(function(d, i) {
               return d.label;
          })

      simulation
          .nodes(json.nodes)
          .on("tick", ticked);

      simulation.force("link")
          .links(json.links);

      function ticked() {
        link
            .attr("x1", function(d) { return d.source.x; })
            .attr("y1", function(d) { return d.source.y; })
            .attr("x2", function(d) { return d.target.x; })
            .attr("y2", function(d) { return d.target.y; });

        d3.selectAll(".g_node")
        .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
      }

  });

  return (
    <svg className='chart'>
    </svg>
  );
}

export default Graph;
