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
    const repeated = args.filter((s => v => s.has(v) || !s.add(v))(new Set))
    if (args.length < 3) {
      console.log("You need to pass at least 3 arguments to play");
      console.log("")
      console.log("Example: node game.mjs rock paper scissors")
      process.exit(1)
    }
    if (!(args.length % 2)) {
      console.log("Arguments should be an odd number, add 1 argument")
      console.log("")
      console.log(`Example: node game.mjs ${args.join(" ")} ARG${args.length + 1}`)
      process.exit(1)
    }
    if (repeated.length) {
      console.log(`All arguments must be unique, you passed repeated arguments.`)
      console.log("")
      console.log(`These are the repeated arguments: ${repeated.join(" ")}`)
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