const io = require("socket.io")();

const loremI =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

const state = {
  lanes: [
    {
      title: "Backlog",
      id: Math.floor(+new Date() + Math.random() * 0xffffffff).toString(36),
      cards: [
        {
          description: loremI,
          title: "First Backlog",
          id: Math.floor(+new Date() + Math.random() * 0xffffffff).toString(36)
        },
        {
          description: loremI,
          title: "Second Backlog",
          id: Math.floor(+new Date() + Math.random() * 0xffffffff).toString(36)
        },
        {
          description: loremI,
          title: "Third Backlog",
          id: Math.floor(+new Date() + Math.random() * 0xffffffff).toString(36)
        }
      ]
    },
    {
      title: "In Dev",
      id: Math.floor(+new Date() + Math.random() * 0xffffffff).toString(36),
      cards: [
        {
          description: loremI,
          title: "1 in DEV",
          id: Math.floor(+new Date() + Math.random() * 0xffffffff).toString(36)
        },
        {
          description: loremI,
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
          description: loremI,
          title: "1 DONE",
          id: Math.floor(+new Date() + Math.random() * 0xffffffff).toString(36)
        },
        {
          description: loremI,
          title: "2 DONE",
          id: Math.floor(+new Date() + Math.random() * 0xffffffff).toString(36)
        },
        {
          description: loremI,
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
