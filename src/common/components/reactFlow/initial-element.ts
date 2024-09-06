import { Position } from "reactflow";

export const nodes = [
  {
    id: "1",
    type: "input",
    data: { label: "node1" },
    position: { x: 200, y: 100 },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  },
  {
    id: "2",
    data: { label: "node2" },
    position: { x: 500, y: 100 },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  },
  {
    id: "3",
    data: { label: "node3" },
    className: "circle",
    position: { x: 800, y: 100 },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  },
  {
    id: "4",
    data: { label: "node4" },
    className: "circle",
    position: { x: 1100, y: 400 },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  },
];

export const edges = [
  { id: "e12", source: "1", target: "2", type: "smoothstep" },
  { id: "e23", source: "2", target: "3", type: "smoothstep" },
];
