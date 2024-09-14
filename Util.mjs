import inquirer from "inquirer";
import PressToContinuePrompt from 'inquirer-press-to-continue';

export default class Util {

  TranslateScore(binary) {
    if (binary == -1) return "Lose"
    if (binary == 0) return "Draw"
    if (binary == 1) return "Win"
  }

  async PressKeyToContinue() {
    inquirer.registerPrompt('press-to-continue', PressToContinuePrompt);
    await inquirer.prompt({
      name: 'key',
      type: 'press-to-continue',
      anyKey: true,
      pressToContinueMessage: 'Press a key to continue...',
    });
    process.stdout.write('\x1Bc')
  }

  ValidateArguments(args) {
    const distinct = [...new Set(args.map(x => x.toLowerCase()))].length;
    if (args.length < 3) {
      console.log("Se necesitan al menos 3 opciones ejemplo: ");
      process.exit(1)
    }
    if (!(args.length % 2)) {
      console.log("You passed 4 arguments, number should be odd: ejemplo: 3");
      process.exit(1)
    }
    if (args.length !== distinct) {
      console.log("Todos deben ser diferentes., ejemplo: ");
      process.exit(1)
    }
  }

  PrintMenu(hmac, args) {
    console.log(`HMAC: \n ${hmac}`)
    console.log("Available moves:")
    for (const [i, arg] of args.entries()) {
      console.log(` ${i + 1} - ${arg}`)
    }
    console.log(" 0 - exit")
    console.log(" ? - help")
  }
}