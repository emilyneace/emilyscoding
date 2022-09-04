"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
var jimp = require("jimp");
function activate(context) {
    var disposable = vscode.commands.registerCommand("extension.resizeImage", function (filePath) {
        let userInput = vscode.window.showInputBox();
        userInput.then(widthXheight => {
            let resizeDimensions = widthXheight.split("x");
            if (resizeDimensions[0] == null || resizeDimensions[1] == null) {
                vscode.window.showInformationMessage("Input not of format: width[x]height");
            }
            else {
                let resizedImageLocationParts = filePath.fsPath.split(".");
                jimp
                    .read(filePath.fsPath)
                    .then(function (image) {
                    // if one of the dimentions is set to "auto" it'll be auto scaled. 
                    var width = resizeDimensions[0].toLowerCase() == 'auto' ? jimp.AUTO : Number.parseInt(resizeDimensions[0]);
                    var height = resizeDimensions[1].toLowerCase() == 'auto' ? jimp.AUTO : Number.parseInt(resizeDimensions[1]);
                    image
                        .resize(width, height)
                        .write(resizedImageLocationParts[0] + "-" + widthXheight + "." + resizedImageLocationParts[1], (error, image) => {
                        if (error === null) {
                            vscode.window.showInformationMessage("Image resized");
                        }
                        else {
                            vscode.window.showInformationMessage("Error resizing");
                        }
                    });
                })
                    .catch(function (err) {
                    vscode.window.showInformationMessage(err);
                });
            }
        });
    });
    context.subscriptions.push(disposable);
}
exports.activate = activate;
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map