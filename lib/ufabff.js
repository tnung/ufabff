'use babel';

import UfabffView from './ufabff-view';
import { CompositeDisposable } from 'atom';

export default {

  ufabffView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.ufabffView = new UfabffView(state.ufabffViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.ufabffView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'ufabff:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.ufabffView.destroy();
  },

  serialize() {
    return {
      ufabffViewState: this.ufabffView.serialize()
    };
  },

  toggle() {
    console.log('Ufabff was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
