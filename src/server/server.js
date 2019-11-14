const io = require("socket.io")();

const state = {
  boardColumn: [
    {
      colunmTitle: "Backlog",
      id: Math.floor(+new Date() + Math.random() * 0xffffffff).toString(36),
      card: [
        {
          cardDescription:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          cardTitle: "First card",
          id: Math.floor(+new Date() + Math.random() * 0xffffffff).toString(
            36
          )
        },
        {
          cardDescription:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          cardTitle: "Second card",
          id: Math.floor(+new Date() + Math.random() * 0xffffffff).toString(
            36
          )
        },
        {
          cardDescription:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          cardTitle: "Third card",
          id: Math.floor(+new Date() + Math.random() * 0xffffffff).toString(
            36
          )
        }
      ]
    },
    {
      colunmTitle: "In Dev",
      id: Math.floor(+new Date() + Math.random() * 0xffffffff).toString(36),
      card: [
        {
          cardDescription:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          cardTitle: "First card in DEV",
          id: Math.floor(+new Date() + Math.random() * 0xffffffff).toString(
            36
          )
        },
        {
          cardDescription:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          cardTitle: "Second card in DEV",
          id: Math.floor(+new Date() + Math.random() * 0xffffffff).toString(
            36
          )
        }
      ]
    },
    {
      colunmTitle: "Done",
      id: Math.floor(+new Date() + Math.random() * 0xffffffff).toString(36),
      card: [
        {
          cardDescription:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          cardTitle: "First card DONE",
          id: Math.floor(+new Date() + Math.random() * 0xffffffff).toString(
            36
          )
        },
        {
          cardDescription:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          cardTitle: "Second card DONE",
          id: Math.floor(+new Date() + Math.random() * 0xffffffff).toString(
            36
          )
        },
        {
          cardDescription:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          cardTitle: "Third card DONE",
          id: Math.floor(+new Date() + Math.random() * 0xffffffff).toString(
            36
          )
        }
      ]
    }
  ]
};

io.on("connection", socket => {
  io.emit('new state', state);
  socket.on('new state', function(state){
    console.log('here is update');
    io.emit('new state', state);
  });
});
const port = 8000;
io.listen(port);
console.log("listening on port ", port);
