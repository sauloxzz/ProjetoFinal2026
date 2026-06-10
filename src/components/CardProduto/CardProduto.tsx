import type { CardProdutoProps } from '../../Types/CardProdutoProps'
import joia_default from '../../assets/img/joia_default.png'
import './CardProduto.css'

export default function CardProduto({ nome, descricao, preco, imagem, id, parcelamento }: CardProdutoProps) {
    const imageUrl = imagem && imagem.length > 0
        ? `http://localhost:5103/${imagem}`
        : joia_default;

    return (
        <div key={id} className="card_produto">
            <img src={imageUrl} alt={nome} />
            <h2>{nome}</h2>
            <p>{(descricao && descricao.length > 0) ? descricao : 'Descrição não informada'}</p>
            <div className="card_footer">
                <span className="preco">R$ {typeof preco === 'number' ? preco.toFixed(2) : preco}</span>
                {parcelamento && <small className="parcelamento">{parcelamento}</small>}
            </div>
        </div>
    )
}
