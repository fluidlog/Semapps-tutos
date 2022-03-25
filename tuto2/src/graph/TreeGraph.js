import * as d3 from "d3";
import './treeGraph.css';
import React, { useRef, useLayoutEffect } from 'react';
import { useResizeDetector } from 'react-resize-detector';

const TreeGraph = ({root_data}) => {
  const { width, height, ref: wrapper } = useResizeDetector();
  const offset_y = 50;

  const svgRef=useRef();

  console.log("root_data", root_data )

  useLayoutEffect(() => {
    if (!root_data) return
    if (!width || !height) return

    const treeLayout = d3.tree()
        .size([width, height+offset_y*2]); //more space between nodes

    let root = d3.hierarchy(root_data);

    treeLayout(root);

    const svg=d3.select(svgRef.current)

    const linkGenerator = d3.linkVertical()
                      .x(node => node.x)
                      .y(node => node.y + offset_y)

    // adds the links between the nodes
    svg.selectAll(".link")
        .data(root.links())
        .join("path")
        .attr("class", "link")
        .attr("d", linkGenerator);

    // adds each node as a group
    svg.selectAll(".node")
        .data(root.descendants())
        .join(enter => enter.append("circle"))
        .attr("r", 10)
        .attr("class", "node")
        .attr("cx", node => node.x)
        .attr("cy", node => node.y + offset_y)


    // adds the text to the node
    svg.selectAll(".label")
        .data(root.descendants())
        .join("text")
        .attr("class", "label")
        .text(node => node.data.data["pair:label"])
        .attr("text-anchor", "middle")
        .attr("font-size", 12)
        .attr("x", node => node.x)
        .attr("y", node => node.y + offset_y-15)

  }, [root_data, width, height]);

  return <div ref={wrapper}>
    <svg ref={svgRef}></svg>
  </div>
}

export default TreeGraph;
