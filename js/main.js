// =========Create new edge between two nodes

// Default sigma
var g = {
    "nodes": [{
        "id": "n0",
        "label": "Node 1",
        "x": 0,
        "y": 0,
        "size": 3,
    }, {
        "id": "n1",
        "label": "Node 2",
        "x": 3,
        "y": 1,
        "size": 2
    }, {
        "id": "n2",
        "label": "Node 3",
        "x": 1,
        "y": 3,
        "size": 2
    }, {
        "id": "n3",
        "label": "Node 4",
        "x": 4,
        "y": 6,
        "size": 5
    }, {
        "id": "n4",
        "label": "Node 5",
        "x": 6,
        "y": 1,
        "size": 5
    }],
    "edges": [{
        "id": "e0",
        "source": "n0",
        "target": "n1",
    }, {
        "id": "e1",
        "source": "n1",
        "target": "n2"
    }, {
        "id": "e2",
        "source": "n2",
        "target": "n0"
    }]
}
var lines = [];
// create sigma with object g
s = new sigma({
    graph: g,
    container: 'container',
    settings: {
        defaultNodeColor: '#ec5148'
    }
});
// =========FUNCTION==========
// get id of node from label name node
function getIdNode(label) {
    var node = "";
    for (var i in g.nodes) {
        node = g.nodes[i];
        if (label === node.label) {
            return node.id;
        }
    }
}
// update edges infomation
function updateEdge(edge, str) {
    s.graph.dropEdge(edge.id);
    edge.color = str;
    s.graph.addEdge(edge);
}
// reset grap sigma
function resetSigma() {
    for (var i in g.edges) {
        updateEdge(g.edges[i], "");
        s.refresh();
    }
}
// change color's edges node
function changeColorOfEdge(index, color) {
    updateEdge(g.edges[index], "green");
    s.refresh();
}

// check edges exist between two nodes
function checkEdgeExist(idNode1, idNode2) {
    if (idNode1 !== undefined && idNode2 !== undefined) {
        for (var i in g.edges) {
            if ((g.edges[i].source === idNode1 && g.edges[i].target === idNode2) || (g.edges[i].source === idNode2 && g.edges[i].target === idNode1)) {
                return true;
            }
            if (parseInt(i) === g.edges.length - 1) {
                console.log(2);
                return false;
            }
        }
    }

}
// ==========================
// catch event click to a node
s.bind('clickStage', function(e) {
    resetSigma();
});

s.bind('clickNode', function(e) {
    var idNode = getIdNode(e.data.node.label);
    // reset sigma if had choice any node
    resetSigma();
    for (var i in g.edges) {
        if (g.edges[i].source === idNode || g.edges[i].target === idNode) {
            changeColorOfEdge(i, "green");
            s.refresh();
        }
    }
    lines.push(idNode);
    // select nodes 
    checkEdgeExist(lines[0], lines[1]);
    if (lines.length === 2 && !checkEdgeExist(lines[0], lines[1])) {
        if (lines[0] !== lines[1]) {
            var edge = {
                id: 'e' + g.edges.length,
                source: lines[0],
                target: lines[1]
            }
            g.edges.push(edge);
            s.graph.addEdge(edge);
            changeColorOfEdge(g.edges.length - 1, "green");
            console.log(g.edges);
        }
        s.refresh();
        lines = [];
    }
    console.log(g);
});
// ============
// ===========mark edges of node
