export enum Language {
  rus = "rus",
  eng = "eng",
}
export type Translations = {
  [key in Language]: string;
};

export type VocabWord = {
  id: string;
  translate: Translations;
};
