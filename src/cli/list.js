const list = require("select-shell")({
  pointer: " ▸ ",
  pointerColor: "yellow",
  checked: " ◉  ",
  unchecked: " ◎  ",
  checkedColor: "blue",
  msgCancel: "No selected options!",
  msgCancelColor: "orange",
  multiSelect: false,
  inverse: true,
  prepend: true,
  disableInput: true
});

class List {
  constructor(options) {
    this.list = list
    this.options = options

    for (let o of this.options) {
      this.list.option(o.name, o.id)
    }
    this.list.list()

    list.on("select", function(options) {
      this.groupID = options[0].value
      process.exit(0);
    });

    list.on("cancel", function(options) {
      console.log(`Cancel list, ${options.length} options selected`);
      process.exit(0);
    });
  }
}

module.exports = {
  List
}


const tester = async () => {
  const options = [ { name: 'Dnd', id: '22873356' },
  { name: 'Siblings', id: '21341112' },
  { name: 'Stevens CS Class of 2019', id: '28737320' },
  { name: 'Gargantwan', id: '15911615' },
  { name: 'wawayanda', id: '13369143' },
  { name: 'Aaa', id: '21157197' },
  { name: 'Google Games Team', id: '20854722' },
  { name: 'Bobs Birthday Bash II', id: '38062164' },
  { name: 'Fuck Leased Housing', id: '38835494' },
  { name: 'Stevens Ultimate', id: '5891508' } ]

  const test = await new List(options)
  console.log(test.groupID);
}

tester()