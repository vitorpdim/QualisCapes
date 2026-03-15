export class ApiService {
  private readonly baseUrl: string;

  constructor(baseUrl: string = 'http://localhost:3000/api') {
    this.baseUrl = baseUrl;
  }

  async listarAreas(): Promise<string[]> {
    try {
      const response = await fetch(`${this.baseUrl}/areas`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (erro) {
      console.error('Erro ao listar áreas:', erro);
      throw erro;
    }
  }
}