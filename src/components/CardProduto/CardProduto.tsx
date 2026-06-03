import { formatosService } from '../../services/formatosService'
import type { CardProdutoProps } from '../../Types/CardProdutoProps'
import joia_default from '../../assets/img/joia_default.png'
import './CardProduto.css'

export default function CardProduto({nome, descricao, preco, imagem, id, parcelamento}: CardProdutoProps) {
    return (

        <div key={id} className="card_produto">

            

            <h2 className='titulo_card_produto' > {nome} </h2>

           
            <img src={(imagem.length > 0) ?`http://localhost:3000/static/${imagem}` : joia_default} alt="Imagem de um produto"/>
            <p>{ (descricao.length > 0) ? descricao: "Descrição não informada" }</p>
            <span className="preco"> {formatosService.PrecoBR(preco)} </span>
            <small> { (parcelamento.length > 0) ? parcelamento: "Parcelamento não informado"} </small>
        </div>

    )
}
