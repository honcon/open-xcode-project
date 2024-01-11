const vscode = require('vscode');
const child_process = require('child_process');
const path = require('path');

module.exports = {
    activate: (context) => {

        let disposable = vscode.commands.registerCommand('extension.openXcodeProject', function (fileUri) {
            if (fileUri && fileUri.fsPath) {
                const filePath = fileUri.fsPath;
                const extname = path.extname(filePath);
                const basename = path.basename(filePath);
                if (extname === '.xcodeproj' || extname === '.xcworkspace' || basename === 'Package.swift') {
                    const command = 'open -a Xcode ' + filePath;
                    child_process.exec(command, (error, stdout, stderr) => {
                        if (error) {
                            vscode.window.showErrorMessage('Error during open with Xcode: ' + error.message);
                        }
                    });
                }
            }
        });

        context.subscriptions.push(disposable);
    }
};
