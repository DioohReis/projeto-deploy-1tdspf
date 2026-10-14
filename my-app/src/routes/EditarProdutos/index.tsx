import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import type { TipoProduto } from "../../types/types";

const API_URL =
  import.meta.env.VITE_API_URL ||
  "https://script.google.com/macros/s/AKfycbyonCLRNYhmHWwzIkVI-i8eAZ7eO6-ky8UncZG88aqZ4MzC_8llLr9rE2JkLBJ8wAbyYQ/exec";

export default function EditarProdutos() {
  document.title = "Editar Produto";

  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const [produto, setProduto] = useState<TipoProduto>({
    id: "",
    nome: "",
    preco: 0,
    estoque: 0,
    avatar: "",
  });

  useEffect(() => {
    const carregarProduto = async () => {
      try {
        const response = await fetch(
          `${API_URL}?id=${id}`,
        );

        if (!response.ok) {
          throw new Error(
            `Erro na recuperação: ${response.status}`,
          );
        }

        const resultado = await response.json();

        if (resultado.status === "error") {
          throw new Error(resultado.message);
        }

        setProduto(resultado.data);
      } catch (error) {
        console.error(error);
      }
    };

    carregarProduto();
  }, [id]);

  const handleUpdate = async () => {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "text/plain;charset=utf-8",
        },
        body: JSON.stringify({
          action: "PUT",
          ...produto,
        }),
      });

      if (!response.ok) {
        throw new Error(
          `Erro na atualização: ${response.status}`,
        );
      }

      const resultado = await response.json();

      if (resultado.status === "error") {
        throw new Error(resultado.message);
      }

      alert("Produto alterado com sucesso!");
      navigate("/produtos");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main>
      <h2>Editar Produto</h2>

      <form>
        <fieldset>
          <legend>Dados do Produto</legend>

          <div>
            <label htmlFor="nome">Nome do Produto:</label>
            <input
              type="text"
              name="nome"
              id="nome"
              value={produto.nome}
              onChange={(event) =>
                setProduto({
                  ...produto,
                  nome: event.target.value,
                })
              }
            />
          </div>

          <div>
            <label htmlFor="preco">Preço do Produto:</label>
            <input
              type="number"
              step={0.1}
              name="preco"
              id="preco"
              value={produto.preco}
              onChange={(event) =>
                setProduto({
                  ...produto,
                  preco: parseFloat(event.target.value),
                })
              }
            />
          </div>

          <div>
            <label htmlFor="estoque">Estoque:</label>
            <input
              type="number"
              step={1}
              name="estoque"
              id="estoque"
              value={produto.estoque}
              onChange={(event) =>
                setProduto({
                  ...produto,
                  estoque: parseInt(event.target.value),
                })
              }
            />
          </div>

          <div>
            <label htmlFor="avatar">URL da Imagem:</label>
            <input
              type="url"
              name="avatar"
              id="avatar"
              value={produto.avatar}
              onChange={(event) =>
                setProduto({
                  ...produto,
                  avatar: event.target.value,
                })
              }
            />
            {produto.avatar && (
              <figure>
                <img src={produto.avatar} alt={produto.nome} width={100} />
              </figure>
            )}
          </div>

          <div>
            <button
              type="button"
              onClick={() => handleUpdate()}
            >
              EDITAR
            </button>
          </div>
        </fieldset>
      </form>
    </main>
  );
}
