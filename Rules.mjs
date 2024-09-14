import Util from "./Util.mjs"

export default class Rules {
  util = new Util()

  GenerateRules(args) {
    let rules = {}
    rules = this.#FillFirst(rules, args)
    rules = this.#FillSecond(rules, args)
    return rules
  }

  FindWinner(rules, user, pc) {
    const score = rules[user][pc]
    return {
      score,
      message: `You ${this.util.TranslateScore(score)}!`
    }
  }

  #FillFirst(x, args) {
    for (const arg of args) {
      x[arg] = {}
    }
    return x
  }

  #FillSecond(x, args) {
    const top = (args.length - 1) / 2
    for (const [i, arg] of args.entries()) {

      // Loses
      let deno = i;
      for (let l = 1; l <= top; l++) {
        deno = deno - 1;
        deno = deno < 0 ? args.length - 1 : deno;
        x[args[deno]][arg] = -1
      }

      // Wins
      deno = i;
      for (let l = 1; l <= top; l++) {
        deno = deno + 1;
        deno = deno > args.length - 1 ? 0 : deno;
        x[args[deno]][arg] = 1
      }

      //Draws
      x[arg][arg] = 0
    }
    return x;
  }
}