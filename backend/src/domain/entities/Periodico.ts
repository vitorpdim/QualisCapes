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

  getId(): string { return this.id; }
  setId(id: string): void { this.id = id; }

  getIssn(): string { return this.issn; }
  setIssn(issn: string): void { this.issn = issn; }

  getTitulo(): string { return this.titulo; }
  setTitulo(titulo: string): void { this.titulo = titulo; }

  getAreaAvaliacao(): string { return this.areaAvaliacao; }
  setAreaAvaliacao(areaAvaliacao: string): void { this.areaAvaliacao = areaAvaliacao; }

  getEstrato(): EstratoQualis { return this.estrato; }
  setEstrato(estrato: EstratoQualis): void { this.estrato = estrato; }

  // ==============================================================
  // MÉTODOS UTILITÁRIOS (formatação para exibição no frontend/)
  // ==============================================================

  getTituloFormatado(formato: FormatoTexto): string { return formato === "alta" ? this.titulo.toUpperCase() : this.titulo.toLowerCase(); }
  getAreaFormatada(formato: FormatoTexto): string { return formato === "alta" ? this.areaAvaliacao.toUpperCase() : this.areaAvaliacao.toLowerCase(); }
  getString(): string { return `[${this.estrato}] ${this.titulo} (ISSN: ${this.issn}) - ${this.areaAvaliacao}`; }
}
