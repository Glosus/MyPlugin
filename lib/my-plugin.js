const {CompositeDisposable} = require('atom')

//Split String to Words
function StrToWordsArray(Str){
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
  };
  Result[k] += Str[Str.length - 1];
  for(var i = 0; i < Result.length; i++){
    Result[i] = Result[i].toLowerCase();
  };
  return Result;
};

//Create strings in new Case Type
function CamelCaseConverter(NewCaseTypeArray){
  var NewCaseTypeStr = NewCaseTypeArray[0];
  for(var i = 1; i < NewCaseTypeArray.length; i++){
    NewCaseTypeStr += NewCaseTypeArray[i][0].toUpperCase() + NewCaseTypeArray[i].substring(1);
  }
  return NewCaseTypeStr;
};

function SnakeCaseConverter(NewCaseTypeArray){
  var NewCaseTypeStr = NewCaseTypeArray[0];
  for(var i = 1; i < NewCaseTypeArray.length; i++){
    NewCaseTypeStr += '_' + NewCaseTypeArray[i];
  }
  return NewCaseTypeStr;
};

function KebabCaseConverter(NewCaseTypeArray){
  var NewCaseTypeStr = SnakeCaseConverter(NewCaseTypeArray).replace(/\_/g, "-");
  return NewCaseTypeStr;
};

function PascalCaseConverter(NewCaseTypeArray){
  NewCaseTypeStr = CamelCaseConverter(NewCaseTypeArray);
  NewCaseTypeStr = NewCaseTypeStr[0].toUpperCase() + NewCaseTypeStr.substring(1);
  return NewCaseTypeStr;
};

function UpperCaseConverter(NewCaseTypeArray){
  var NewCaseTypeStr = SnakeCaseConverter(NewCaseTypeArray).toUpperCase();
  return NewCaseTypeStr;
};

//Overwrites text in the Atom Text Editor
function convert (CaseType) {
  const Editor = atom.workspace.getActiveTextEditor();
  var Selection = Editor.getSelectedText();
  if (Selection != ""){
    var EditorText = Editor.getText();
    var Reg = new RegExp('\\b' + Selection + '\\b', "g");
    var NewCaseTypeArray = StrToWordsArray(Selection);
    var NewCaseTypeStr = "";
    switch(CaseType) {
      case 'CamelCase':
        NewCaseTypeStr = CamelCaseConverter(NewCaseTypeArray);
        break;
      case 'SnakeCase':
        NewCaseTypeStr = SnakeCaseConverter(NewCaseTypeArray);
        break;
      case 'KebabCase':
        NewCaseTypeStr = KebabCaseConverter(NewCaseTypeArray);
        break;
      case 'PascalCase':
        NewCaseTypeStr = PascalCaseConverter(NewCaseTypeArray);
        break;
      case 'UpperCase':
        NewCaseTypeStr = UpperCaseConverter(NewCaseTypeArray);
        break;
      default:
        break;
    }
    var resultText = EditorText.replace(Reg, NewCaseTypeStr);
    Editor.setText(resultText);
  }
};

//Entry point
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
