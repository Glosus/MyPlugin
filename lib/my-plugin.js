const {CompositeDisposable} = require('atom')

module.exports = {
  subscriptions: null,

  activate () {
    this.subscriptions = new CompositeDisposable()
    this.subscriptions.add(atom.commands.add('atom-workspace',
      {'my-plugin:convert': () => this.convert()})
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
      var rg = new RegExp("[^0-9A-Za-z]" + selection + "[^0-9A-Za-z]", "g");
      console.log(rg);
      var resultText = editorText.replace(rg, 'NEW');
      console.log(selection);
      var convertable = 0;
      var unconvert = 0
      console.log(resultText);
      var reg = new RegExp("");
      var re = new RegExp("\bJava\b");
      var str = "Java and JavaScript";
      var newstr = str.replace(re);
      console.log(re);
      //editor.setText(resultText)
    }
  }
}
