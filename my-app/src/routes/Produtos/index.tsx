import { useEffect, useState } from "react";
import type { TipoProduto } from "../../types/types";
import { Link } from "react-router";
import CardProduto from "../../components/CardProduto";
import { FaEdit as Editar } from "react-icons/fa";
import { MdDeleteForever as Excluir } from "react-icons/md";

const API_URL =
  import.meta.env.VITE_API_URL ||
  "https://script.google.com/macros/s/AKfycbyonCLRNYhmHWwzIkVI-i8eAZ7eO6-ky8UncZG88aqZ4MzC_8llLr9rE2JkLBJ8wAbyYQ/exec";

export default function Produtos() {
  document.title = "Produtos";

  const [produtos, setProdutos] = useState<TipoProduto[]>([]);

  useEffect(() => {
    const carregarProdutos = async () => {
      try {
        const response = await fetch(API_URL);

        if (!response.ok) {
          throw new Error(
            `Erro na listagem: ${response.status}`,
          );
        }

        const resultado = await response.json();

        if (resultado.status === "error") {
          throw new Error(resultado.message);
        }

        setProdutos(resultado.data);
      } catch (error) {
        console.error(error);
      }
    };

    carregarProdutos();
  }, []);

  const handleDelete = async (id: string) => {
    const confirmou = window.confirm(
      "Deseja realmente excluir este produto?",
    );

    if (!confirmou) return;

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "text/plain;charset=utf-8",
        },
        body: JSON.stringify({
          action: "DELETE",
          id: id,
        }),
      });

      if (!response.ok) {
        throw new Error(
          `Erro na exclusão: ${response.status}`,
        );
      }

      const resultado = await response.json();

      if (resultado.status === "error") {
        throw new Error(resultado.message);
      }

      alert("Produto excluído com sucesso!");

      setProdutos(
        produtos.filter((produto) => produto.id !== id),
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main>
      <h2>Produtos</h2>

      <p>
        <Link to="/cadastrar-produto">
          Cadastrar produto
        </Link>
      </p>

      <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", marginBottom: "20px" }}>
        {produtos.map((produto) => (
          <CardProduto
            key={produto.id}
            produto={produto}
            onDelete={handleDelete}
          />
        ))}
      </div>

      <div>
        <table
          border={1}
          style={{
            width: "100%",
            borderCollapse: "collapse",
            border: "1px solid black",
          }}
        >
          <thead>
            <tr>
              <th>ID</th>
              <th>NOME</th>
              <th>PREÇO</th>
              <th>ESTOQUE</th>
              <th>SITUAÇÃO</th>
              <th>AVATAR</th>
              <th>AÇÕES</th>
            </tr>
          </thead>
          <tbody>
            {produtos.map((produto) => (
              <tr key={produto.id}>
                <td>{produto.id}</td>
                <td>{produto.nome}</td>
                <td>R$ {produto.preco.toFixed(2)}</td>
                <td>{produto.estoque}</td>
                <td>
                  {produto.estoque < 5
                    ? "Estoque baixo"
                    : "Estoque normal"}
                </td>
                <td>
                  <img src={produto.avatar} alt={produto.nome} width={40} />
                </td>
                <td>
                  <Link to={`/editar-produtos/${produto.id}`}>
                    <Editar /> Editar
                  </Link>{" "}
                  |{" "}
                  <button
                    type="button"
                    onClick={() => handleDelete(produto.id)}
                  >
                    <Excluir /> Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={7}>
                Quantidade de produtos: {produtos.length}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </main>
  );
}
