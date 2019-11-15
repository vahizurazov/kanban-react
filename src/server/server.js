const io = require("socket.io")();

const state = {
  boardColumn: [
    {
      colunmTitle: "Backlog",
      id: Math.floor(+new Date() + Math.random() * 0xffffffff).toString(36),
      card: [
        {
          cardDescription: "111111111111111111",
          cardTitle: "111111111111111111",
          id: Math.floor(+new Date() + Math.random() * 0xffffffff).toString(36)
        },
        {
          cardDescription: "222222222222222",
          cardTitle: "222222222222222",
          id: Math.floor(+new Date() + Math.random() * 0xffffffff).toString(36)
        },
        {
          cardDescription: "33333333333333",
          cardTitle: "33333333333333",
          id: Math.floor(+new Date() + Math.random() * 0xffffffff).toString(36)
        }
      ]
    },
    {
      colunmTitle: "In Dev",
      id: Math.floor(+new Date() + Math.random() * 0xffffffff).toString(36),
      card: [
        {
          cardDescription: "1 in DEV",
          cardTitle: "1 in DEV",
          id: Math.floor(+new Date() + Math.random() * 0xffffffff).toString(36)
        },
        {
          cardDescription: "2 in DEV",
          cardTitle: "2 in DEV",
          id: Math.floor(+new Date() + Math.random() * 0xffffffff).toString(36)
        }
      ]
    },
    {
      colunmTitle: "Done",
      id: Math.floor(+new Date() + Math.random() * 0xffffffff).toString(36),
      card: [
        {
          cardDescription: "1 DONE",
          cardTitle: "1 DONE",
          id: Math.floor(+new Date() + Math.random() * 0xffffffff).toString(36)
        },
        {
          cardDescription: "2 DONE",
          cardTitle: "2 DONE",
          id: Math.floor(+new Date() + Math.random() * 0xffffffff).toString(36)
        },
        {
          cardDescription: "3 DONE",
          cardTitle: "3 DONE",
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
