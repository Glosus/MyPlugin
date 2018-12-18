const {CompositeDisposable} = require('atom')
//TERS_Rrqw21_124
function StrToWordsArray(Str){
  console.log(Str);
  var Result = [];
  var k = 0;
  for(var i = 0; i < Str.length - 1; i++){
    if (Result[k] == undefined) Result[k] = "";
    Result[k] += Str[i];
    if (/^[A-Z]+$/.test(Str[i + 1]) && !(/^[A-Z]+$/.test(Str[i]))) {
      k++;
    }
    if (Str[i + 1] == '-' || Str[i + 1] == '_') {
      k++;
      i++;
    }
  }
  console.log(Result);
  Result[k] += Str[Str.length - 1];
  for(var i = 0; i < Result.length; i++){
    Result[i] = Result[i].toLowerCase();
  };
  return Result;
};

function convert () {
  const Editor = atom.workspace.getActiveTextEditor();
  var Selection = Editor.getSelectedText();
  console.log(Selection);
  if (Selection != ""){
    var EditorText = Editor.getText();
    var Reg = new RegExp('\\b' + Selection + '\\b', "g");
    var NewCaseTypeArray = StrToWordsArray(Selection);
    var NewCaseTypeStr = "";
    for(var i = 0; i < NewCaseTypeArray.length; i++){
      NewCaseTypeStr += NewCaseTypeArray[i];
    }
    console.log(NewCaseTypeStr);
    var resultText = EditorText.replace(Reg, NewCaseTypeStr);
    //Editor.setText(resultText);
  }
};

module.exports = {
  subscriptions: null,

  activate () {
    this.subscriptions = new CompositeDisposable();
    this.subscriptions.add(atom.commands.add('atom-workspace',
      {'my-plugin:CamelCase': () => this.CamelCase()})
    );
    this.subscriptions.add(atom.commands.add('atom-workspace',
      {'my-plugin:SnakeCase': () => this.SnakeCase()})
    );
    this.subscriptions.add(atom.commands.add('atom-workspace',
      {'my-plugin:KebabCase': () => this.KebabCase()})
    );
    this.subscriptions.add(atom.commands.add('atom-workspace',
      {'my-plugin:PascalCase': () => this.PascalCase()})
    );
    this.subscriptions.add(atom.commands.add('atom-workspace',
      {'my-plugin:UpperCase': () => this.UpperCase()})
    )
  },

  deactivate () {
    this.subscriptions.dispose();
  },
  CamelCase () {
    convert("CamelCase");
  },
  SnakeCase() {
    convert("SnakeCase");
  },
  KebabCase() {
    convert("KebabCase");
  },
  PascalCase() {
    convert("PascalCase");
  },
  UpperCase() {
    convert("UpperCase");
  }
}
