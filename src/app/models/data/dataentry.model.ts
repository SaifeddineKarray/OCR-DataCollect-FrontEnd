export class dataentry {
    id: string;
    imageurl: string;
    language: string;
    score: number;
    text: string;
  
    constructor(id: string, imageurl: string, language: string, score: number, text: string) {
      this.id = id;
      this.imageurl = imageurl;
      this.language = language;
      this.score = score;
      this.text = text;
    }
  }
