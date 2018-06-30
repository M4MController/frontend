export default function(server) {
  const user = server.create('user');
  for (let object of server.createList('object', 3, {user})) {
    for (let controller of server.createList('controller', 2, {object})) {
      for (let sensor of server.createList('sensor', 3, {controller})) {
        server.createList('data', 10, {sensor});
      }
    }
  }
}
