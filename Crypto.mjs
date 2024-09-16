import crypto from "crypto"

export default class Crypto {

  EncryptMessage(message, key) {
    return crypto.createHmac("sha256", key).update(message).digest("hex")
  }

  GenerateKey() {
    return crypto.randomBytes(32).toString('hex')
  }
}