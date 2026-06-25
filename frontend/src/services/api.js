import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:5000",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor para tratamento de erros
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Erro da resposta do servidor
      console.error("Erro na resposta:", error.response.status, error.response.data);
    } else if (error.request) {
      // Erro de requisição (sem resposta do servidor)
      console.error("Erro na requisição:", error.request);
    } else {
      // Erro ao configurar a requisição
      console.error("Erro:", error.message);
    }
    return Promise.reject(error);
  }
);

// =========================
// CIDADES
// =========================

export const cidadeService = {
  listar: () => {
    return api.get("/cidades");
  },

  criar: (dados) => {
    return api.post("/cidades", dados);
  },

  atualizar: (id, dados) => {
    return api.put(`/cidades/${id}`, dados);
  },

  remover: (id) => {
    return api.delete(`/cidades/${id}`);
  },
};

// =========================
// EQUIPAMENTOS
// =========================

export const equipamentoService = {
  listar: () => {
    return api.get("/equipamentos");
  },

  criar: (dados) => {
    return api.post("/equipamentos", dados);
  },

  atualizar: (id, dados) => {
    return api.put(`/equipamentos/${id}`, dados);
  },

  remover: (id) => {
    return api.delete(`/equipamentos/${id}`);
  },
};

// =========================
// FUNCIONÁRIOS
// =========================

export const funcionarioService = {
  listar: () => {
    return api.get("/funcionarios");
  },

  criar: (dados) => {
    return api.post("/funcionarios", dados);
  },

  atualizar: (id, dados) => {
    return api.put(`/funcionarios/${id}`, dados);
  },

  remover: (id) => {
    return api.delete(`/funcionarios/${id}`);
  },
};

// =========================
// SERVIÇOS
// =========================

export const servicoService = {
  listar: () => {
    return api.get("/servicos");
  },

  criar: (dados) => {
    return api.post("/servicos", dados);
  },

  atualizar: (id, dados) => {
    return api.put(`/servicos/${id}`, dados);
  },

  remover: (id) => {
    return api.delete(`/servicos/${id}`);
  },
};

export default api;
