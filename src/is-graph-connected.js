'use strict';

const Queue = require('queue-fifo');

const isGraphConnected = module.exports = {};

isGraphConnected.traverse = (graph) => {
  const queue = new Queue();
  const visitedVertices = new Set();
  const startVertex = graph._adjacencyList.values().next().value[0];

  queue.enqueue(startVertex);
  visitedVertices.add(startVertex);

  while (queue.size() > 0) {
    const currentVertex = queue.dequeue();

    const neighbors = graph.getNeighbors(currentVertex);

    for (const neighbor of neighbors) { // eslint-disable-line
      const neighborVertex = neighbor.vertex;
      if (visitedVertices.has(neighborVertex)) {
        continue; //eslint-disable-line
      } else {
        visitedVertices.add(neighborVertex);
      }
      queue.enqueue(neighborVertex);
    }

    if (graph._adjacencyList.has(currentVertex) && !visitedVertices.has(currentVertex)) {
      return false;
    }
  }
  return true;
};
