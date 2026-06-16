import { useState } from "react";
import axios from "axios";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import "./ConsultoraVirtual.css";

export default function ConsultoraVirtual() {
  const [pergunta, setPergunta] = useState<string>("");
  const [resposta, setResposta] = useState<string>("");
  const [carregando, setCarregando] = useState<boolean>(false);

  const API_BASE = "http://localhost:5103/api";

  const obterRespostaFallback = (texto: string): string => {
    const query = texto.toLowerCase();
    let respostaMock = "Olá! Como sua consultora virtual Swarovski, estou aqui para ajudar você a encontrar o brilho perfeito. ";

    if (query.includes("anel") || query.includes("anéis") || query.includes("anelzinho")) {
      respostaMock += "Os anéis Swarovski são lendários pelo seu design elegante. Atualmente, os anéis da coleção Idyllia (em verde e azul com lapidações de flor) são destaques incríveis na nossa loja!";
    } else if (query.includes("colar") || query.includes("colares") || query.includes("pingente")) {
      respostaMock += "Para colares e pingentes, o Colar Idyllia Flor Multicor e o Pingente Idyllia Florido Pavé são escolhas maravilhosas, unindo um acabamento de combinação de metais com lapidações brilhantes.";
    } else if (query.includes("relógio") || query.includes("relogio") || query.includes("relogios")) {
      respostaMock += "Nossos relógios combinam estilo e utilidade. Destaco o sofisticado Relógio Prata Cristal e o moderno Relógio Prata Azul, ambos ideais para elevar qualquer look.";
    } else if (query.includes("preço") || query.includes("preco") || query.includes("valor") || query.includes("quanto custa")) {
      respostaMock += "Temos peças luxuosas para todos os gostos! Nossos anéis começam em R$ 1.000,00 e colares em R$ 3.700,00. Tudo com parcelamento facilitado em até 10x ou 12x sem juros.";
    } else if (query.includes("coleção") || query.includes("colecoes") || query.includes("coleções") || query.includes("idyllia")) {
      respostaMock += "A coleção Idyllia é inspirada em elements da natureza, como flores exuberantes e combinações de lapidações que capturam a luz de maneira mágica. É perfeita para presentes inesquecíveis!";
    } else {
      respostaMock += "Seja para um presente especial ou para completar seu visual com elegância, temos a joia ideal. Você tem interesse em alguma categoria específica como anéis, colares ou relógios?";
    }
    return respostaMock;
  };

  const handleEnviar = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pergunta.trim()) return;

    setCarregando(true);
    setResposta("");

    try {
      // Tenta fazer a requisição para a API configurada na porta 5103
      // O endpoint /api/Consultoria da IA espera uma string JSON bruta no corpo
      let response;
      try {
        response = await axios.post(`${API_BASE}/Consultoria`, JSON.stringify(pergunta), {
          headers: {
            "Content-Type": "application/json"
          }
        });
      } catch (err) {
        console.warn("Falha ao conectar na porta 5103 (/api/Consultoria), tentando na porta 3000...", err);
        // Fallback na porta 3000 (mock/json-server) que espera o objeto { pergunta }
        response = await axios.post("http://localhost:3000/api/consultora", { pergunta });
      }

      if (response && response.data) {
        if (typeof response.data === "string") {
          setResposta(response.data);
        } else if (response.data.resposta) {
          setResposta(response.data.resposta);
        } else {
          throw new Error("Formato de resposta inesperado");
        }
      } else {
        throw new Error("Resposta da API vazia");
      }
    } catch (error) {
      console.warn("Erro ao conectar aos endpoints da API. Usando resposta simulada offline.", error);
      // Fallback offline caso a API não esteja rodando ou a rota falhe
      setTimeout(() => {
        const respostaSimulada = obterRespostaFallback(pergunta);
        setResposta(respostaSimulada);
      }, 800); // Pequeno atraso para simular rede
    } finally {
      setCarregando(false);
    }
  };

  return (
    <>
      <Header />
      <main className="consultora-main">
        <section className="consultora-section">
          <div className="consultora-card">
            <h1 className="consultora-titulo">Consultora Virtual</h1>
            <p className="consultora-desc">
              Bem-vindo ao espaço de atendimento personalizado da Swarovski.
              Tire suas dúvidas sobre coleções, preços, anéis, colares ou relógios.
            </p>

            <form onSubmit={handleEnviar} className="consultora-form">
              <label htmlFor="pergunta" className="consultora-label">
                Qual é a sua dúvida hoje?
              </label>
              <div className="consultora-input-wrapper">
                <textarea
                  id="pergunta"
                  className="consultora-textarea"
                  placeholder="Ex: Qual anel você me recomenda para presente? Ou qual o preço médio das peças?"
                  value={pergunta}
                  onChange={(e) => setPergunta(e.target.value)}
                  disabled={carregando}
                  required
                />
              </div>

              <button
                type="submit"
                className="consultora-botao"
                disabled={carregando || !pergunta.trim()}
              >
                {carregando ? (
                  <span className="consultora-spinner">Processando...</span>
                ) : (
                  "Enviar Pergunta"
                )}
              </button>
            </form>

            <div className="consultora-resposta-box">
              <h3 className="consultora-resposta-titulo">Resposta da Consultora:</h3>
              <div className="consultora-resposta-content">
                {carregando ? (
                  <div className="consultora-loading-dots">
                    <span>.</span>
                    <span>.</span>
                    <span>.</span>
                  </div>
                ) : resposta ? (
                  <p className="consultora-resposta-texto">{resposta}</p>
                ) : (
                  <p className="consultora-resposta-placeholder">
                    A sua resposta aparecerá aqui assim que você enviar uma pergunta.
                  </p>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
