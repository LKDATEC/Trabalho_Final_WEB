import React, { useEffect, useState } from "react";
import { funcionarioService } from "../services/api";

export default function Funcionarios() {
  const [lista, setLista] = useState([]);
  const [nome, setNome] = useState("");
  const [cargo, setCargo] = useState("");
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
      const res = await funcionarioService.listar();
      setLista(res.data || []);
    } catch (err) {
      setErro("Erro ao carregar funcionários: " + (err.response?.data?.message || err.message));
      console.error(err);
    } finally {
      setCarregando(false);
    }
  };

  const salvar = async () => {
    if (!nome.trim() || !cargo.trim() || !setor.trim()) {
      setErro("Nome, cargo e setor são obrigatórios");
      return;
    }

    const dados = { nome, cargo, setor };
    setCarregando(true);
    setErro("");
    setMensagem("");

    try {
      if (editando) {
        await funcionarioService.atualizar(editando, dados);
        setMensagem("Funcionário atualizado com sucesso!");
      } else {
        await funcionarioService.criar(dados);
        setMensagem("Funcionário cadastrado com sucesso!");
      }
      setNome("");
      setCargo("");
      setSetor("");
      setEditando(null);
      carregar();
    } catch (err) {
      setErro("Erro ao salvar funcionário: " + (err.response?.data?.message || err.message));
      console.error(err);
    } finally {
      setCarregando(false);
    }
  };

  const editar = (f) => {
    setNome(f.nome);
    setCargo(f.cargo);
    setSetor(f.setor);
    setEditando(f.id);
    setErro("");
    setMensagem("");
  };

  const remover = async (id) => {
    if (!window.confirm("Tem certeza que deseja deletar?")) return;

    setCarregando(true);
    setErro("");
    setMensagem("");

    try {
      await funcionarioService.remover(id);
      setMensagem("Funcionário deletado com sucesso!");
      carregar();
    } catch (err) {
      setErro("Erro ao deletar funcionário: " + (err.response?.data?.message || err.message));
      console.error(err);
      setCarregando(false);
    }
  };

  return (
    <div>
      <h2>Funcionários</h2>

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
          placeholder="Cargo"
          value={cargo}
          onChange={(e) => setCargo(e.target.value)}
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
        {lista.map((f) => (
          <li key={f.id} style={{ marginBottom: "8px" }}>
            {f.nome} - {f.cargo} ({f.setor})
            <button onClick={() => editar(f)} style={{ marginLeft: "10px", marginRight: "5px" }} disabled={carregando}>
              Editar
            </button>
            <button onClick={() => remover(f.id)} disabled={carregando}>
              Excluir
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
