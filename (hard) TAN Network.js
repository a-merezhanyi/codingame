/**
 * TAN Network
 * https://www.codingame.com/training/hard/tan-network
 * Statement:
 * Given a list of train stations, their locations and connections, a
 * starting point, and a final point, determine the names of the stations
 * from the start to the end, based on the shortest path.
 * Story:
 * "Yeah, sure. Wait... Gonna have to call you back, I'm entering the
 * subway.... No, not the sandwich thing, the... Oh come on.... Yeah, I'll
 * meet you at the museum. No, the one next to the plaza where we had a
 * coffee last week. Take the tramway line 6. Yeah. Right. Bye."
 */
const findStop = id => route.find(n => n.id === id);

const trip = {
  startPoint: readline(),
  endPoint: readline()
};

const route = [];
let N = +readline();
while(N--) {
  const [id, name, , lat, lng] = readline().split`,`;
  
  route.push({
    id: id,
    name: name.substr(1, name.length - 2),
    lat: +lat * Math.PI / 180,
    lng: +lng * Math.PI / 180,
    links: [],
    weight: Infinity,
    previous: null
  });
}

let M = +readline();
while(M--) {
  const [startId, endId] = readline().split` `;
  findStop(startId).links.push(route.findIndex(n => n.id === endId));
}

trip.startPoint = findStop(trip.startPoint);
trip.endPoint = findStop(trip.endPoint);

const DijkstraPath = (start, end) => {
  const closed = route.concat();
  start.weight = 0;
  while(closed.length > 0) {
    const next = closed.reduce((min, stop) => stop.weight < min.weight ? stop : min);
    closed.splice(closed.indexOf(next), 1);
    next.links.forEach(i => {
      const current = route[i];
        const weight = next.weight + Math.sqrt(
            Math.pow((current.lng - next.lng) * Math.cos((next.lat + current.lat) / 2), 2)
            + Math.pow(current.lat - next.lat, 2)
            ) * 6371
      if (current.weight > weight) {
        current.weight = weight;
        current.previous = next;
      }
    });
  }
  const result = [];
  for (let stop = end; stop; stop = stop.previous) {
    result.unshift(stop);
  }
  
  return result;
};

const path = DijkstraPath(trip.startPoint, trip.endPoint);
print(trip.endPoint.weight === Infinity
    ? 'IMPOSSIBLE'
    : path.map(s => s.name).join('\n')
);
