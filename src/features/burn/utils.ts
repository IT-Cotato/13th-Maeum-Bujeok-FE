const TALISMAN_PHRASE_LENGTH = 4;

export type TalismanCharacters = [string, string, string, string];

export function splitTalismanPhrase(phrase: string): TalismanCharacters | null {
  const characters = Array.from(phrase.trim().normalize("NFC"));

  if (characters.length !== TALISMAN_PHRASE_LENGTH) {
    return null;
  }

  return characters as TalismanCharacters;
}
