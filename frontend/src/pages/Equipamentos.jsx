import React, { useEffect, useState } from "react";
import { equipamentoService } from "../services/api";

export default function Equipamentos() {
  const [lista, setLista] = useState([]);
  const [nome, setNome] = useState("");
  const [setor, setSetor] = useState("");
  const [editando, setEditando] = useState(null);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState("");
  const [mensagem, setMensagem] = useState("");

  useEffect(() => {
    carregar();
  }, []);

  const carregar = async () => {
    setCarregando(true);
    setErro("");
    try {
      const res = await equipamentoService.listar();
      setLista(res.data || []);
    } catch (err) {
      setErro("Erro ao carregar equipamentos: " + (err.response?.data?.message || err.message));
      console.error(err);
    } finally {
      setCarregando(false);
    }
  };

  const salvar = async () => {
    if (!nome.trim() || !setor.trim()) {
      setErro("Nome e setor são obrigatórios");
      return;
    }

    const dados = { nome, setor };
    setCarregando(true);
    setErro("");
    setMensagem("");

    try {
      if (editando) {
        await equipamentoService.atualizar(editando, dados);
        setMensagem("Equipamento atualizado com sucesso!");
      } else {
        await equipamentoService.criar(dados);
        setMensagem("Equipamento cadastrado com sucesso!");
      }
      setNome("");
      setSetor("");
      setEditando(null);
      carregar();
    } catch (err) {
      setErro("Erro ao salvar equipamento: " + (err.response?.data?.message || err.message));
      console.error(err);
    } finally {
      setCarregando(false);
    }
  };

  const editar = (e) => {
    setNome(e.nome);
    setSetor(e.setor);
    setEditando(e.id);
    setErro("");
    setMensagem("");
  };

  const remover = async (id) => {
    if (!window.confirm("Tem certeza que deseja deletar?")) return;

    setCarregando(true);
    setErro("");
    setMensagem("");

    try {
      await equipamentoService.remover(id);
      setMensagem("Equipamento deletado com sucesso!");
      carregar();
    } catch (err) {
      setErro("Erro ao deletar equipamento: " + (err.response?.data?.message || err.message));
      console.error(err);
      setCarregando(false);
    }
  };

  return (
    <div>
      <h2>Equipamentos</h2>

      {erro && <div style={{ color: "red", marginBottom: "10px", padding: "10px", backgroundColor: "#ffebee", borderRadius: "4px" }}>{erro}</div>}
      {mensagem && <div style={{ color: "green", marginBottom: "10px", padding: "10px", backgroundColor: "#e8f5e9", borderRadius: "4px" }}>{mensagem}</div>}

      <div style={{ marginBottom: "15px" }}>
        <input
          placeholder="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          disabled={carregando}
          style={{ padding: "8px", marginRight: "5px" }}
        />

        <input
          placeholder="Setor"
          value={setor}
          onChange={(e) => setSetor(e.target.value)}
          disabled={carregando}
          style={{ padding: "8px", marginRight: "5px" }}
        />

        <button onClick={salvar} disabled={carregando} style={{ padding: "8px 15px" }}>
          {carregando ? "Processando..." : editando ? "Atualizar" : "Cadastrar"}
        </button>
      </div>

      {carregando && <p>Carregando...</p>}

      <ul>
        {lista.map((e) => (
          <li key={e.id} style={{ marginBottom: "8px" }}>
            <strong>{e.nome}</strong> - {e.setor}
            <button onClick={() => editar(e)} style={{ marginLeft: "10px", marginRight: "5px" }} disabled={carregando}>
              Editar
            </button>
            <button onClick={() => remover(e.id)} disabled={carregando}>
              Excluir
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
