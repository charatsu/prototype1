export default class StringHelper {

  public static formatString(str: string, ...val: string[]) {
    for (let index = 0; index < val.length; index++) {
      str = str.replace(`{${index}}`, val[index]);
    }
    return str;
  }

  public static replaceSpecialCharacter(input: string, replacement: string) {
    return input.replace(/[^a-zA-Z0-9]/g, replacement);
  }

  public static isJSON(str) {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  }

  public static isNullOrWhiteSpace(input: string): boolean {
    if (typeof input === 'undefined' || !input || !input.trim()) {
      return true;
    }

    return false;
  }
}
