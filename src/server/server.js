const io = require("socket.io")();

const state = {
  lanes: [
    {
      title: "Backlog",
      id: Math.floor(+new Date() + Math.random() * 0xffffffff).toString(36),
      cards: [
        {
          description: "111111111111111111",
          title: "111111111111111111",
          id: Math.floor(+new Date() + Math.random() * 0xffffffff).toString(36)
        },
        {
          description: "222222222222222",
          title: "222222222222222",
          id: Math.floor(+new Date() + Math.random() * 0xffffffff).toString(36)
        },
        {
          description: "33333333333333",
          title: "33333333333333",
          id: Math.floor(+new Date() + Math.random() * 0xffffffff).toString(36)
        }
      ]
    },
    {
      title: "In Dev",
      id: Math.floor(+new Date() + Math.random() * 0xffffffff).toString(36),
      cards: [
        {
          description: "1 in DEV",
          title: "1 in DEV",
          id: Math.floor(+new Date() + Math.random() * 0xffffffff).toString(36)
        },
        {
          description: "2 in DEV",
          title: "2 in DEV",
          id: Math.floor(+new Date() + Math.random() * 0xffffffff).toString(36)
        }
      ]
    },
    {
      title: "Done",
      id: Math.floor(+new Date() + Math.random() * 0xffffffff).toString(36),
      cards: [
        {
          description: "1 DONE",
          title: "1 DONE",
          id: Math.floor(+new Date() + Math.random() * 0xffffffff).toString(36)
        },
        {
          description: "2 DONE",
          title: "2 DONE",
          id: Math.floor(+new Date() + Math.random() * 0xffffffff).toString(36)
        },
        {
          description: "3 DONE",
          title: "3 DONE",
          id: Math.floor(+new Date() + Math.random() * 0xffffffff).toString(36)
        }
      ]
    }
  ]
};

io.on("connection", socket => {
  io.emit("new state", state);
  socket.on("new state", state => {
    console.log("here is update");
    io.emit("new state", state);
  });
});
const port = 8000;
io.listen(port);
console.log("listening on port ", port);
