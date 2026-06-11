import { Link } from 'react-router-dom'
import './Home.css'
import logo_cisne from '../../assets/img/LOGO CISNE.png'
import foto_ariana1 from '../../assets/img/Ariana-1.png'
import foto_ariana2 from '../../assets/Swarovski-celebra-nova-colecao-em-parceria-com-Ariana-Grande 1.svg'
import foto_ariana4 from '../../assets/ariana-4 1.svg'
import Header from '../../components/Header/Header'
import { useEffect, useState } from 'react'


export default function Home() {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        // Só roda no cliente
        const check = () =>
            setIsMobile(window.matchMedia("(max-width: 768px)").matches);

        check(); // Executa ao montar

        // Opcional: escutar mudanças no tamanho da tela
        window.addEventListener("resize", check);
        return () => window.removeEventListener("resize", check);
    }, []);




    return (
        <>
            {isMobile && <Header />}

            <main className="main_home"> { /* CONTEUDO PRINCIPAL */}

                <aside className="secao_logo">
                    <img src={logo_cisne} alt="Logo Cisne" />

                    <nav className="menu_lateral">
                        <ul className="lista_vertical">
                            <li><Link to="/produtos">PRODUTOS</Link></li>
                            <li><Link to="/produtos/cadastroListagem">CADASTRO</Link></li>
                            <li><Link to="/produtos/pingente">PINGENTE</Link></li>
                            <li><Link to="/produtos/relogio">RELÓGIOS</Link></li>
                            <li><Link to="/produtos/pesquisa">ACESSÓRIOS</Link></li>
                            <li><Link to="/produtos/pesquisa">PRESENTES</Link></li>
                        </ul>
                    </nav>

                    <div className="icones">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M378.9 64c-32.4 0-62.9 15.6-81.9 41.9l-28 38.7c-3 4.2-7.8 6.6-13 6.6s-10-2.5-13-6.6l-28-38.7 0 0c-19-26.3-49.5-41.9-81.9-41.9-55.9 0-101.1 45.3-101.1 101.1 0 55 34.4 107.1 71.8 152.5 42.1 51.2 93.4 96 128.5 122.9 6.2 4.8 14.4 7.5 23.7 7.5s17.4-2.7 23.7-7.5c35.1-26.8 86.4-71.7 128.5-122.9 37.3-45.4 71.8-97.5 71.8-152.5 0-55.9-45.3-101.1-101.1-101.1zM271 87.1c25-34.6 65.2-55.1 107.9-55.1 73.5 0 133.1 59.6 133.1 133.1 0 67.4-41.6 127.3-79.1 172.8-44.1 53.6-97.3 100.1-133.8 127.9-12.4 9.4-27.6 14.1-43.1 14.1s-30.8-4.6-43.1-14.1C176.4 438 123.2 391.5 79.1 338 41.6 292.4 0 232.5 0 165.1 0 91.6 59.6 32 133.1 32 175.8 32 216 52.5 241 87.1l15 20.7 15-20.7z" /></svg>

                        { /* coracao  */}

                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M384 208a176 176 0 1 0 -352 0 176 176 0 1 0 352 0zM343.3 366C307 397.2 259.7 416 208 416 93.1 416 0 322.9 0 208S93.1 0 208 0 416 93.1 416 208c0 51.7-18.8 99-50 135.3L507.3 484.7c6.2 6.2 6.2 16.4 0 22.6s-16.4 6.2-22.6 0L343.3 366z" /></svg>

                    </div>

                </aside>

                <section className="conteudo">  { /* main home */}

                    <div className="card1">
                        <img src={foto_ariana1} alt="foto da Ariana" />
                        <div>
                            <h2>SWAROVSKI</h2>
                        </div>
                    </div>

                    <div className="cards_home">
                        <div className="card2">
                            <img src={foto_ariana2} alt="Foto da Ariana-2" title='Coleção Idillya' />
                            <title>"Coleção Idillya"</title>
                        </div>

                        <div className="card3">
                            <img src={foto_ariana4} alt="Foto da Ariana-4" title='Coleção Millenia '/>
                        </div>

                    </div>

                    <div className="card_consultora">
                        <div className="card_consultora_conteudo">
                            <h2>Consultora Virtual</h2>
                            <p>Dúvidas sobre qual joia escolher ou quer conhecer melhor nossas coleções? Converse com nossa Consultora Virtual e encontre a peça perfeita.</p>
                        </div>
                        <Link to="/consultora" className="botao_consultora">Falar com Consultora</Link>
                    </div>
                </section>


            </main>

            <footer className='footer_home'>
                <div>

                </div>
                <div className="coluna_1">

                    <p className='p_final' >A Swarovski transforma cristais em verdadeiras obras de arte, unindo brilho, elegância e inovação em cada
                        detalhe.
                    </p>

                </div>
            </footer>
        </>
    )
}
