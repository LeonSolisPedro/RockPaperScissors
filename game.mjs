import inquirer from "inquirer";
import Crypto from "./Crypto.mjs";
import Rules from "./Rules.mjs";
import Table from "./Table.mjs";
import Util from "./Util.mjs"
import chalk from "chalk"

//Initialization
const args = process.argv.slice(2)
const rulesObj = new Rules();
const table = new Table();
const crypto = new Crypto();
const util = new Util();
util.ValidateArguments(args)
process.stdout.write('\x1Bc')

//Computer's move:
const cpuMove = args[Math.floor(Math.random() * args.length)];

//Crypto
const key = crypto.GenerateKey()
const hmac = crypto.EncryptMessage(cpuMove, key)

//Rules
const rules = rulesObj.GenerateRules(args)

//Game Mechanics
do {
  util.PrintMenu(hmac, args)
  try {
    const promp = await inquirer.prompt({ name: "name", message: "Enter your move:" })
    if (promp.name == "0")
      process.exit(1)
    if (promp.name == "?") {
      console.log(table.GenerateHelp(args, rules))
      console.log(table.GenerateTable(args, rules))
      await util.PressKeyToContinue()
    }
    const move = parseInt(promp.name)
    const userMove = args[(move - 1)]
    if (userMove === undefined) {
      process.stdout.write('\x1Bc')
      continue
    }
    //Results
    console.log(`Your move: ${chalk.blue(userMove)}`)
    console.log(`Computer's move: ${chalk.red(cpuMove)}`)
    const winner = rulesObj.FindWinner(rules, userMove, cpuMove)
    console.log(winner.message)
    console.log(`HMAC key: \n ${key}`)
    process.exit(1)
  } catch (error) {
    process.exit(1)
  }
} while (true)