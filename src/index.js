import { schema } from "prosemirror-schema-basic";
import { EditorState } from "prosemirror-state";
import { EditorView } from "prosemirror-view";

// plugins
import { undo, redo, history } from "prosemirror-history";
import { keymap } from "prosemirror-keymap";
import { baseKeymap } from "prosemirror-commands";

let state = EditorState.create({
    schema,
    plugins: [
        history(),
        keymap({ "Mod-z": undo, "Mod-y": redo }),
        keymap(baseKeymap),
    ],
});

let view = new EditorView(document.body, {
    state,
    dispatchTransaction(transaction) {
        console.log("transaction", transaction);
        let newState = view.state.apply(transaction);
        view.updateState(newState);
    },
});
