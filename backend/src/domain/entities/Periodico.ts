export type EstratoQualis = "A1" | "A2" | "A3" | "A4" | "B1" | "B2" | "B3" | "B4" | "B5" | "C";
export type FormatoTexto = "alta" | "baixa";

export class Periodico {

  private id: string;
  private issn: string;
  private titulo: string;
  private areaAvaliacao: string;
  private estrato: EstratoQualis;

  constructor(id: string, issn: string, titulo: string, areaAvaliacao: string, estrato: EstratoQualis) {
    this.id = id;
    this.issn = issn;
    this.titulo = titulo;
    this.areaAvaliacao = areaAvaliacao;
    this.estrato = estrato;
  }
}
