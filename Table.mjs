import { AsciiTable3, AlignmentEnum } from "ascii-table3"
import Util from "./Util.mjs";
import chalk from "chalk"

export default class Table {
  util = new Util()

  GenerateHelp(args, rules) {
    return `${chalk.blue('■')} = You   ${chalk.red('■')} = CPU    Example: ${chalk.blue(args[0])} x ${chalk.red(args[1])} = ${this.util.TranslateScore(rules[args[0]][args[1]])}`
  }

  GenerateTable(args, rules) {
    const headers = args.map(x => chalk.blue(x))
    const table = new AsciiTable3()
      .setHeading("", ...headers)
      .setAlign(3, AlignmentEnum.CENTER)
      .addRowMatrix(this.#GenerateRows(args, rules))
    return table.toString();
  }

  #GenerateRows(args, rules) {
    let rows = [];
    for (const arg of args) {
      let row = []
      for (const argg of args)
        row.push(this.util.TranslateScore(rules[argg][arg]))
      row.unshift(chalk.red(arg))
      rows.push(row)
    }
    return rows
  }

}