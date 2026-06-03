
import './Produtos.css';

import banner from "../../assets/img/transferir (1) (1) (1).png"

import JoiaDefault from "../../assets/img/joia_default.png"

import { useEffect, useState } from "react";
import { getJoias } from "../../services/JoiaService";
import type { Joia } from "../../Types/Joia";
import CardProduto from '../../components/CardProduto/CardProduto';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import { useLocation, useNavigate, useParams } from 'react-router-dom';



export default function Produtos() {


    const [joias, setJoias] = useState<Joia[]>([]);

    const location = useLocation();
    const { categoria } = useParams<{ categoria: string }>();

    const parametrosPesquisados = new URLSearchParams(location.search);
    const termo_pesquisado = parametrosPesquisados.get('query');






    const [pesquisa, setPesquisa] = useState<string>("");
    const navigate = useNavigate();

    const handleSearch = () => {
        if (!pesquisa.trim()) return;

        navigate(`/produtos/pesquisa?query=${encodeURIComponent(pesquisa)}`)
        setPesquisa("")
    }
    const handleKeyDown = (evento: React.KeyboardEvent<HTMLInputElement>) => {
        if (evento.key === 'Enter') {
            handleSearch();
        }
    }







    const fetchJoias = async () => {
        try {
            const dados = await getJoias();

            // console.log("Lista de Joias vindas da API: ", dados);
            if (categoria) {
                const dados_filtrados = dados.filter(j => j.categorias.some(cat => cat.toLowerCase() === categoria.toLowerCase()));
                setJoias(dados_filtrados);
            }

            else if (termo_pesquisado) {
                const dados_filtrados = dados.filter(j =>
                    j.nome.toLowerCase().includes(termo_pesquisado.toLowerCase()) ||
                    j.descricao.toLowerCase().includes(termo_pesquisado.toLowerCase()) ||
                    j.categorias.some(cat => cat.toLowerCase().includes(termo_pesquisado.toLowerCase()))
                );
                console.log("Filtro pesquisa: ", dados_filtrados);
                
                setJoias(dados_filtrados);
            } else {
                console.warn("Nenhuma categorias ou termo de busca definido.");
                setJoias(dados);
            }
        }
        catch (error) {
            console.error("Erro ao executar getJoias: ", error);
        }
    }
    useEffect(() => {
        fetchJoias();
        console.log("Termo pesquisado: ", termo_pesquisado);
    }, [termo_pesquisado])




    return (
        <>
            <Header />

            <main>


                <section className="banner_pesquisa" >
                    <img className="Ariana " src={banner} alt="" />
                    <div className="pesquisa" >
                        <svg className="lupa" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M384 208a176 176 0 1 0 -352 0 176 176 0 1 0 352 0zM343.3 366C307 397.2 259.7 416 208 416 93.1 416 0 322.9 0 208S93.1 0 208 0 416 93.1 416 208c0 51.7-18.8 99-50 135.3L507.3 484.7c6.2 6.2 6.2 16.4 0 22.6s-16.4 6.2-22.6 0L343.3 366z" /></svg>
                        <input
                            className='input_pesquisa'
                            type="text"
                            placeholder="O que procura?"
                            value={pesquisa}
                            onChange={p => setPesquisa(p.target.value)}
                            onKeyDown={handleKeyDown}
                        />

                        {/* <span>
                            {
                                categorias
                                    ? categorias.charAt(0).toUpperCase() + categorias.slice(1).toLowerCase()
                                    : termo_pesquisado
                                        ? `Resultado para:" ${termo_pesquisado}" `
                                        : "Nenhum filtro aplicado"
                            }
                        </span> */}

                    </div>

                </section>







                <section className="cards_produto">{
                    joias.map((j: Joia) => (
                        <CardProduto
                            key={j.id}
                            nome={j.nome}
                            descricao={j.descricao}
                            preco={j.preco ?? 0}
                            imagem={j.imagens[0] ?? ""}
                            parcelamento={j.parcelamento} />


                    ))
                }
                    {
                        joias.length == 0 &&
                        <div className='joia404' >
                            <h3>O termo pesquisado <br />Não foi encontrado</h3>
                            <img className='imagem_nao_encontrado' src={JoiaDefault} alt="foto_termo_não_encontrado" />
                        </div>
                    }
                </section>
            </main>

            <Footer />
        </>
    )
}