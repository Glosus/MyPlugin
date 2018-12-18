const {CompositeDisposable} = require('atom')

module.exports = {
  subscriptions: null,

  activate () {
    this.subscriptions = new CompositeDisposable();
    this.subscriptions.add(atom.commands.add('atom-workspace',
      {'my-plugin:convert': () => this.convert()})
    );
    this.subscriptions.add(atom.commands.add('atom-workspace',
      {'my-plugin:ff1': () => this.ff1()})
    );
    this.subscriptions.add(atom.commands.add('atom-workspace',
      {'my-plugin:ff2': () => this.ff2()})
    )
  },

  deactivate () {
    this.subscriptions.dispose()
  },

  convert () {
    const editor = atom.workspace.getActiveTextEditor();
    var selection = editor.getSelectedText();
    if (selection != ""){
      var editorText = editor.getText();
      var reg = new RegExp('\\b' + selection + '\\b', "g");
      var resultText = editorText.replace(reg, 'TestName');
      var convertable = 0;
      var unconvert = 0;
      editor.setText(resultText)
    }
  },
  ff1 () {
    console.log("ff1");
  },
  ff2 () {
    console.log("ff2");
  }
}
