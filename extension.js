const vscode = require('vscode');

function activate(context) {
	console.log('Congratulations, your extension "run-it-bro" is now active!');

	let disposable = vscode.commands.registerCommand('run-it-bro.run', function () {
		let terminals = vscode.window.terminals;
		let workingTerminal = terminals.find(terminals => terminals.name === "Working Terminal");

		if (!workingTerminal) {
			workingTerminal = vscode.window.createTerminal("Working Terminal");
		}
		workingTerminal.show();

		writeJSCommand(workingTerminal);
	})

	context.subscriptions.push(disposable);
}

async function writeJSCommand(terminal) {
	const openEditor = vscode.window.activeTextEditor;

	if (openEditor) {
		const filePath = openEditor.document.uri.fsPath;
		openEditor.document.save().then(() => {
			terminal.sendText("node " + filePath);
		});
	} else {
		vscode.window.showErrorMessage("No active text editor.");
	}
}

function deactivate() { }

module.exports = {
	activate,
	deactivate
}
