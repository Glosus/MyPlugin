'use babel';

import MyPluginView from './my-plugin-view';
import { CompositeDisposable } from 'atom';

export default {

  myPluginView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.myPluginView = new MyPluginView(state.myPluginViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.myPluginView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'my-plugin:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.myPluginView.destroy();
  },

  serialize() {
    return {
      myPluginViewState: this.myPluginView.serialize()
    };
  },

  toggle() {
    console.log('MyPlugin was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
