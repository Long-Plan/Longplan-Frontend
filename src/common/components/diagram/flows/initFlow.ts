import { MarkerType } from "reactflow";
import CoreNode from "../nodes/CoreNode";
import MajorReqNode from "../nodes/MajorReqNode";
import MajorElecNode from "../nodes/MajorElecNode";
import CoCreNode from "../nodes/CoCreNode";
import ActNode from "../nodes/ActNode";
import LearnerNode from "../nodes/LearnerNode";
import SemesterLine from "../nodes/SemesterLine";
import HeaderText from "../nodes/HeaderText";
import { SmartStepEdge } from "@tisoap/react-flow-smart-edge";

export const edgeTypes = {
  smart: SmartStepEdge,
};

export const nodeTypes: any = {
  Core: CoreNode,
  MajorReq: MajorReqNode,
  MajorElec: MajorElecNode,
  CoCre: CoCreNode,
  Act: ActNode,
  Learner: LearnerNode,
  Line: SemesterLine,
  Header: HeaderText,
};

export const initialNodes: any = [
  // { id: "HeaderText", type: "Header", position: { x: 0, y: -80 } },
  // { id: "semester-line1", type: "Line", position: { x: 160, y: -50 } },
  // { id: "semester-line2", type: "Line", position: { x: 360, y: -50 } },
  // { id: "semester-line3", type: "Line", position: { x: 560, y: -50 } },
  // { id: "semester-line4", type: "Line", position: { x: 760, y: -50 } },
  // { id: "semester-line5", type: "Line", position: { x: 960, y: -50 } },
  // { id: "semester-line6", type: "Line", position: { x: 1160, y: -50 } },
  // { id: "semester-line7", type: "Line", position: { x: 1360, y: -50 } },
  {
    id: "cal1",
    sourcePosition: "right",
    type: "Core",
    data: {
      courseNo: "206161",
      courseTitleEng: "Calculus 1",
      totalCredit: 3,
    },
    position: { x: 0, y: 0 },
  },
  {
    id: "cal2",
    type: "Core",
    sourcePosition: "right",
    targetPosition: "left",
    data: {
      courseNo: "206162",
      courseTitleEng: "Calculus 2",
      totalCredit: 3,
    },
    position: { x: 200, y: 0 },
  },
  {
    id: "cal3",
    type: "Core",
    data: {
      courseNo: "206261",
      courseTitleEng: "Calculus 3",
      totalCredit: 3,
    },
    position: { x: 400, y: 0 },
  },
  {
    id: "numer",
    type: "Core",
    data: {
      courseNo: "261208",
      courseTitleEng: "Numerical",
      totalCredit: 3,
    },
    position: { x: 600, y: 0 },
  },
  {
    id: "prob",
    type: "Core",
    data: {
      courseNo: "261306",
      courseTitleEng: "Prob & Stats",
      totalCredit: 3,
    },
    position: { x: 1000, y: 0 },
  },
  {
    id: "discrete",
    type: "Core",
    data: {
      courseNo: "261216",
      courseTitleEng: "Discrete Math",
      totalCredit: 3,
    },
    position: { x: 400, y: 100 },
  },
  {
    id: "act1",
    type: "Act",
    data: {
      courseNo: "259191",
      courseTitleEng: "Activities 1",
      totalCredit: 3,
    },
    position: { x: 0, y: 100 },
  },
  {
    id: "workshop",
    type: "Core",
    data: {
      courseNo: "259106",
      courseTitleEng: "Workshop",
      totalCredit: 3,
    },
    position: { x: 0, y: 200 },
  },
  {
    id: "act2",
    type: "CoCre",
    data: {
      courseNo: "259192",
      courseTitleEng: "Activities 2",
      totalCredit: 3,
    },
    position: { x: 1400, y: 100 },
  },
  {
    id: "basiccpe",
    type: "MajorReq",
    data: {
      courseNo: "261103",
      courseTitleEng: "Basic CPE",
      totalCredit: 3,
    },
    position: { x: 0, y: 400 },
  },
  {
    id: "cpelab",
    type: "MajorReq",
    data: {
      courseNo: "261207",
      courseTitleEng: "CPE Lab",
      totalCredit: 3,
    },
    position: { x: 400, y: 400 },
  },
  {
    id: "compro",
    type: "MajorReq",
    data: {
      courseNo: "261102",
      courseTitleEng: "Comp Prog",
      totalCredit: 3,
    },
    position: { x: 200, y: 300 },
  },
  {
    id: "datastruct",
    type: "MajorReq",
    data: {
      courseNo: "261217",
      courseTitleEng: "Data Structures",
      totalCredit: 3,
    },
    position: { x: 400, y: 200 },
  },
  {
    id: "oop",
    type: "MajorReq",
    data: {
      courseNo: "261200",
      courseTitleEng: "OO Prog",
      totalCredit: 3,
    },
    position: { x: 600, y: 300 },
  },
  {
    id: "softwareen",
    type: "MajorReq",
    data: {
      courseNo: "261361",
      courseTitleEng: "Software Engr",
      totalCredit: 3,
    },
    position: { x: 1000, y: 300 },
  },
  {
    id: "advanced",
    type: "MajorReq",
    data: {
      courseNo: "261405",
      courseTitleEng: "Advanced CPE",
      totalCredit: 3,
    },
    position: { x: 1400, y: 300 },
  },
  {
    id: "algo",
    type: "MajorReq",
    data: {
      courseNo: "261218",
      courseTitleEng: "Algorithms",
      totalCredit: 3,
    },
    position: { x: 600, y: 100 },
  },
  {
    id: "database",
    type: "MajorReq",
    data: {
      courseNo: "261342",
      courseTitleEng: "Database",
      totalCredit: 3,
    },
    position: { x: 800, y: 100 },
  },
  {
    id: "databaselab",
    type: "MajorReq",
    data: {
      courseNo: "261343",
      courseTitleEng: "Database Lab",
      totalCredit: 3,
    },
    position: { x: 800, y: 200 },
  },
  {
    id: "projsurvey",
    type: "MajorReq",
    data: {
      courseNo: "261491",
      courseTitleEng: "Project Survey",
      totalCredit: 3,
    },
    position: { x: 1200, y: 200 },
  },
  {
    id: "proj",
    type: "MajorReq",
    data: {
      courseNo: "261492",
      courseTitleEng: "Project",
      totalCredit: 3,
    },
    position: { x: 1400, y: 200 },
  },
  {
    id: "melec1",
    type: "MajorElec",
    position: { x: 1400, y: 400 },
  },
  {
    id: "melec2",
    type: "MajorElec",
    position: { x: 1200, y: 400 },
  },
  {
    id: "melec3",
    type: "MajorElec",
    position: { x: 1000, y: 400 },
  },
  {
    id: "melec4",
    type: "MajorElec",
    position: { x: 800, y: 400 },
  },
  {
    id: "melec5",
    type: "MajorElec",
    position: { x: 1200, y: 500 },
  },
  {
    id: "melec6",
    type: "MajorElec",
    position: { x: 1200, y: 600 },
  },
  {
    id: "datacom",
    type: "MajorReq",
    data: {
      courseNo: "261332",
      courseTitleEng: "Data Comm",
      totalCredit: 3,
    },
    position: { x: 600, y: 500 },
  },
  {
    id: "network",
    type: "MajorReq",
    data: {
      courseNo: "261335",
      courseTitleEng: "Networks",
      totalCredit: 3,
    },
    position: { x: 800, y: 500 },
  },
  {
    id: "networklab",
    type: "MajorReq",
    data: {
      courseNo: "261336",
      courseTitleEng: "Networks Lab",
      totalCredit: 3,
    },
    position: { x: 800, y: 600 },
  },
  {
    id: "physic1",
    type: "Core",
    data: {
      courseNo: "207105",
      courseTitleEng: "Physics 1",
      totalCredit: 3,
    },
    position: { x: 0, y: 700 },
  },
  {
    id: "physic2",
    type: "Core",
    data: {
      courseNo: "207106",
      courseTitleEng: "Physics 2",
      totalCredit: 3,
    },
    position: { x: 200, y: 700 },
  },
  {
    id: "logic",
    type: "MajorReq",
    data: {
      courseNo: "261210",
      courseTitleEng: "Logic",
      totalCredit: 3,
    },
    position: { x: 400, y: 700 },
  },
  {
    id: "micro",
    type: "MajorReq",
    data: {
      courseNo: "261214",
      courseTitleEng: "Microprocessors",
      totalCredit: 3,
    },
    position: { x: 600, y: 700 },
  },
  {
    id: "comarch",
    type: "MajorReq",
    data: {
      courseNo: "261304",
      courseTitleEng: "Comp Arch",
      totalCredit: 3,
    },
    position: { x: 800, y: 700 },
  },
  {
    id: "os",
    type: "MajorReq",
    data: {
      courseNo: "261305",
      courseTitleEng: "OS",
      totalCredit: 3,
    },
    position: { x: 1000, y: 700 },
  },
  {
    id: "free1",
    type: "Free",
    position: { x: 1200, y: 700 },
  },
  {
    id: "free2",
    type: "Free",
    position: { x: 1400, y: 700 },
  },
  {
    id: "physiclab1",
    type: "Core",
    data: {
      courseNo: "207115",
      courseTitleEng: "PhysicsLab1",
      totalCredit: 3,
    },
    position: { x: 0, y: 800 },
  },
  {
    id: "physiclab2",
    type: "Core",
    data: {
      courseNo: "207116",
      courseTitleEng: "PhysicsLab2",
      totalCredit: 3,
    },
    position: { x: 200, y: 800 },
  },
  {
    id: "logiclab",
    type: "MajorReq",
    data: {
      courseNo: "261212",
      courseTitleEng: "Logic Lab",
      totalCredit: 3,
    },
    position: { x: 400, y: 800 },
  },
  {
    id: "embedded",
    type: "MajorReq",
    data: {
      courseNo: "261215",
      courseTitleEng: "Embedded Lab",
      totalCredit: 3,
    },
    position: { x: 600, y: 800 },
  },
  {
    id: "drawing",
    type: "MajorReq",
    data: {
      courseNo: "259104",
      courseTitleEng: "Drawing",
      totalCredit: 3,
    },
    position: { x: 0, y: 900 },
  },
  {
    id: "circuit",
    type: "MajorReq",
    data: {
      courseNo: "252281",
      courseTitleEng: "Circuits",
      totalCredit: 3,
    },
    position: { x: 200, y: 900 },
  },
  {
    id: "eng1",
    type: "Learner",
    data: {
      courseNo: "001101",
      courseTitleEng: "English 1",
      totalCredit: 3,
    },
    position: { x: 0, y: 1000 },
  },
  {
    id: "eng2",
    type: "Learner",
    data: {
      courseNo: "001102",
      courseTitleEng: "English 2",
      totalCredit: 3,
    },
    position: { x: 200, y: 1000 },
  },
  {
    id: "eng3",
    type: "Learner",
    data: {
      courseNo: "001201",
      courseTitleEng: "English R/W",
      totalCredit: 3,
    },
    position: { x: 400, y: 1000 },
  },
  {
    id: "eng4",
    type: "Learner",
    data: {
      courseNo: "001225",
      courseTitleEng: "English in Sci",
      totalCredit: 3,
    },
    position: { x: 600, y: 1000 },
  },
  {
    id: "ge1",
    type: "Elec",
    data: {
      courseNo: "000000",
      courseTitleEng: "GE",
      totalCredit: 3,
    },
    position: { x: 1000, y: 1000 },
  },
  {
    id: "citizen",
    type: "Act",
    data: {
      courseNo: "140104",
      courseTitleEng: "Citizenship",
      totalCredit: 3,
    },
    position: { x: 0, y: 1100 },
  },
  {
    id: "ge2",
    type: "Elec",
    data: {
      courseNo: "000000",
      courseTitleEng: "GE",
      totalCredit: 3,
    },
    position: { x: 200, y: 1100 },
  },
  {
    id: "ge3",
    type: "Elec",
    data: {
      courseNo: "000000",
      courseTitleEng: "GE",
      totalCredit: 3,
    },
    position: { x: 400, y: 1100 },
  },
  {
    id: "ccge1",
    type: "CoCre",
    data: {
      courseNo: "000000",
      courseTitleEng: "GE",
      totalCredit: 3,
    },
    position: { x: 800, y: 1100 },
  },
  {
    id: "learnge1",
    type: "Learner",
    data: {
      courseNo: "000000",
      courseTitleEng: "GE",
      totalCredit: 3,
    },
    position: { x: 1000, y: 1100 },
  },
];

export const initialEdges = [
  {
    id: "e1",
    source: "cal1",
    type: "smoothstep",
    target: "cal2",
  },
  {
    id: "e2",
    source: "cal2",
    type: "smoothstep",
    target: "cal3",
  },
  {
    id: "e3",
    source: "cal3",
    type: "smoothstep",
    target: "numer",
    animated: true,
  },
  {
    id: "e4",
    source: "cal3",
    type: "smart",
    target: "prob",
    animated: true,
  },
  {
    id: "e5",
    source: "discrete",
    type: "smoothstep",
    target: "algo",
  },
  {
    id: "e6",
    source: "algo",
    type: "smoothstep",
    target: "database",
  },
  {
    id: "e7",
    source: "basiccpe",
    type: "smoothstep",
    target: "cpelab",
  },
  {
    id: "e8",
    source: "compro",
    type: "smoothstep",
    target: "oop",
  },
  {
    id: "e9",
    source: "oop",
    type: "smoothstep",
    target: "softwareen",
  },
  {
    id: "e10",
    source: "softwareen",
    type: "smoothstep",
    target: "advanced",
  },
  {
    id: "e11",
    source: "projsurvey",
    type: "smoothstep",
    target: "proj",
  },
  {
    id: "e12",
    source: "compro",
    type: "straight",
    target: "datastruct",
  },
  {
    id: "e13",
    source: "datastruct",
    type: "straight",
    target: "algo",
  },
  {
    id: "e14",
    source: "physic1",
    type: "smoothstep",
    target: "physic2",
  },
  {
    id: "e15",
    source: "physic2",
    type: "smoothstep",
    target: "logic",
  },
  {
    id: "e16",
    source: "logic",
    type: "smoothstep",
    target: "micro",
  },
  {
    id: "e17",
    source: "micro",
    type: "smoothstep",
    target: "comarch",
  },
  {
    id: "e18",
    source: "comarch",
    type: "smoothstep",
    target: "os",
  },
  {
    id: "e19",
    source: "physiclab1",
    type: "smoothstep",
    target: "physiclab2",
  },
  {
    id: "e20",
    source: "circuit",
    type: "smart",
    animated: true,
    target: "micro",
  },
  {
    id: "e21",
    source: "eng1",
    type: "smoothstep",
    target: "eng2",
  },
  {
    id: "e22",
    source: "eng2",
    type: "smoothstep",
    target: "eng3",
  },
  {
    id: "e23",
    source: "eng2",
    type: "smart",
    target: "eng4",
  },
  {
    id: "e24",
    source: "physic2",
    type: "straight",
    target: "datacom",
  },
  {
    id: "e25",
    source: "datacom",
    type: "smoothstep",
    target: "network",
  },
  {
    id: "e26",
    source: "network",
    type: "smoothstep",
    target: "networklab",
    sourceHandle: "b",
    targetHandle: "b",
    markerEnd: "logo",
    style: {
      strokeWidth: 2,
      stroke: "#fc0303",
    },
  },
  {
    id: "e27",
    source: "logic",
    type: "smoothstep",
    target: "logiclab",
    sourceHandle: "b",
    targetHandle: "b",
    markerEnd: "logo",
    style: {
      strokeWidth: 2,
      stroke: "#fc0303",
    },
  },
  {
    id: "e28",
    source: "micro",
    type: "smoothstep",
    target: "embedded",
    sourceHandle: "b",
    targetHandle: "b",
    markerEnd: "logo",
    style: {
      strokeWidth: 2,
      stroke: "#fc0303",
    },
  },
  {
    id: "e29",
    source: "database",
    type: "smoothstep",
    target: "databaselab",
    sourceHandle: "b",
    targetHandle: "b",
    markerEnd: "logo",
    style: {
      strokeWidth: 2,
      stroke: "#fc0303",
    },
  },
];

export const defaultEdgeOptions = {
  style: { strokeWidth: 1.5, stroke: "black" },
  type: "floating",
  markerEnd: {
    type: MarkerType.ArrowClosed,
    color: "black",
  },
};
