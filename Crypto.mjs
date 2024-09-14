import crypto from "crypto"

export default class Crypto {

  EncryptMessage(message, key) {
    return crypto.createHmac("sha256", key).update(message).digest("hex")
  }

  GenerateKey() {
    const letters = ["A", "B", "C", "D", "E", "F", "G", "5", "6", "7", "8", "9"];
    let key = ""
    for (const letter of letters)
      key += letters[Math.floor(Math.random() * letters.length)];
    return key
  }
}