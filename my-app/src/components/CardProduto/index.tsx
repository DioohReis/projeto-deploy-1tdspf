import { Link } from "react-router";
import type { TipoProduto } from "../../types/types";
import { FaEdit as Editar } from "react-icons/fa";
import { MdDeleteForever as Excluir } from "react-icons/md";

type Props = {
  produto: TipoProduto;
  onDelete?: (id: string) => void;
};

export default function CardProduto({ produto, onDelete }: Props) {
  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: "16px",
        borderRadius: "8px",
        width: "200px",
      }}
    >
      <h3>{produto.nome}</h3>
      <p>R$ {produto.preco.toFixed(2)}</p>
      <figure>
        <img src={produto.avatar} alt={produto.nome} width={80} />
        <figcaption>
          Estoque: {produto.estoque} (
          {produto.estoque < 5 ? "Estoque baixo" : "Estoque normal"})
        </figcaption>
      </figure>
      <div>
        <span>
          <Link to={`/editar-produtos/${produto.id}`}>
            <Editar />
          </Link>
        </span>{" "}
        -{" "}
        <span>
          <button
            type="button"
            onClick={() => onDelete && onDelete(produto.id)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 0,
            }}
            title="Excluir produto"
          >
            <Excluir />
          </button>
        </span>
      </div>
    </div>
  );
}
