import { nanoid } from 'nanoid'

export default class ShortLink {
  public static make() {
    return nanoid(6)
  }
}
