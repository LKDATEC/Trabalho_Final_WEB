import React, { useEffect, useState } from "react";
import { cidadeService } from "../services/api";

export default function Cidades() {
  const [cidades, setCidades] = useState([]);
  const [nome, setNome] = useState("");
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
      const res = await cidadeService.listar();
      setCidades(res.data || []);
    } catch (err) {
      setErro("Erro ao carregar cidades: " + (err.response?.data?.message || err.message));
      console.error(err);
    } finally {
      setCarregando(false);
    }
  };

  const salvar = async () => {
    if (!nome.trim()) {
      setErro("Nome é obrigatório");
      return;
    }
    
    setCarregando(true);
    setErro("");
    setMensagem("");
    
    try {
      if (editando) {
        await cidadeService.atualizar(editando, { nome });
        setMensagem("Cidade atualizada com sucesso!");
      } else {
        await cidadeService.criar({ nome });
        setMensagem("Cidade cadastrada com sucesso!");
      }
      setNome("");
      setEditando(null);
      carregar();
    } catch (err) {
      setErro("Erro ao salvar cidade: " + (err.response?.data?.message || err.message));
      console.error(err);
    } finally {
      setCarregando(false);
    }
  };

  const editar = (cidade) => {
    setNome(cidade.nome);
    setEditando(cidade.id);
    setErro("");
    setMensagem("");
  };

  const remover = async (id) => {
    if (!window.confirm("Tem certeza que deseja deletar?")) return;
    
    setCarregando(true);
    setErro("");
    setMensagem("");
    
    try {
      await cidadeService.remover(id);
      setMensagem("Cidade deletada com sucesso!");
      carregar();
    } catch (err) {
      setErro("Erro ao deletar cidade: " + (err.response?.data?.message || err.message));
      console.error(err);
      setCarregando(false);
    }
  };

  return (
    <div>
      <h2>Cidades</h2>

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
        <button onClick={salvar} disabled={carregando} style={{ padding: "8px 15px" }}>
          {carregando ? "Processando..." : editando ? "Atualizar" : "Cadastrar"}
        </button>
      </div>

      {carregando && <p>Carregando...</p>}

      <ul>
        {cidades.map((c) => (
          <li key={c.id} style={{ marginBottom: "8px" }}>
            {c.nome}
            <button onClick={() => editar(c)} style={{ marginLeft: "10px", marginRight: "5px" }} disabled={carregando}>
              Editar
            </button>
            <button onClick={() => remover(c.id)} disabled={carregando}>
              Excluir
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
