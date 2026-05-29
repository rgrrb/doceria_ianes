const API_URL = 'http://localhost:3000';
const app = document.getElementById('app');
let docesCarregados = [];

const cssContainer = 'display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 100vh;';
const cssPadrao = 'margin: 10px; padding: 10px; width: 200px;';
const cssErro = 'color: red; margin-top: 10px;';

function criarElemento(tag, texto = '', css = '', id = '') {
  const el = document.createElement(tag);
  if (texto) el.textContent = texto;
  if (css) el.style.cssText = css;
  if (id) el.id = id;
  return el;
}

function criarInput(tipo, placeholder, id) {
  const input = criarElemento('input', '', cssPadrao, id);
  input.type = tipo;
  input.placeholder = placeholder;
  return input;
}

function criarBotao(texto, acao, css = cssPadrao) {
  const btn = criarElemento('button', texto, css);
  btn.addEventListener('click', acao);
  return btn;
}

function renderizarVoltar(acao) {
  return criarBotao('Voltar', acao);
}

function obterDadosFormularioDoce() {
  return {
    quantidade: parseInt(document.getElementById('quantidade').value),
    peso: parseFloat(document.getElementById('peso').value),
    porcao: parseFloat(document.getElementById('porcao').value),
    data_validade: document.getElementById('data_validade').value,
    massa: document.getElementById('massa').value,
    recheio: document.getElementById('recheio').value,
    cobertura: document.getElementById('cobertura').value,
    tipo: document.getElementById('tipo').value
  };
}

function renderizarLogin() {
  const container = criarElemento('div', '', cssContainer);
  
  container.appendChild(criarElemento('h1', 'Login'));
  container.appendChild(criarInput('email', 'Email', 'email'));
  container.appendChild(criarInput('password', 'Senha', 'senha'));
  container.appendChild(criarBotao('Entrar', fazerLogin));
  container.appendChild(criarElemento('div', '', cssErro, 'erro'));

  app.replaceChildren(container);
}

async function fazerLogin() {
  const email = document.getElementById('email').value;
  const senha = document.getElementById('senha').value;
  const erroDiv = document.getElementById('erro');

  try {
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, senha })
    });
    const data = await response.json();

    if (data.status_code === 200) {
      localStorage.setItem('usuario', JSON.stringify(data.response));
      renderizarMenu();
    } else {
      erroDiv.textContent = data.message || 'Erro ao fazer login';
    }
  } catch (error) {
    erroDiv.textContent = 'Erro ao conectar com o servidor';
  }
}

function renderizarMenu() {
  const container = criarElemento('div', '', cssContainer);
  container.appendChild(criarElemento('h1', 'Menu'));

  const botoes = [
    { texto: 'Cadastrar Doce', acao: () => renderizarCadastroDoce() },
    { texto: 'Listar Doces', acao: () => renderizarListagemDoces() },
    { texto: 'Descartar Doce', acao: renderizarDescarte },
    { texto: 'Histórico de Descarte', acao: renderizarHistoricoDescarte },
    { texto: 'Sair', acao: fazerLogout }
  ];

  botoes.forEach(({ texto, acao }) => container.appendChild(criarBotao(texto, acao)));
  app.replaceChildren(container);
}

function fazerLogout() {
  localStorage.removeItem('usuario');
  renderizarLogin();
}

const calcularStatus = (dataValidade) => {
  const hoje = new Date();
  hoje.setHours(0, 0, 0, 0);
  const validade = new Date(dataValidade);
  validade.setHours(0, 0, 0, 0);

  const diferencaDias = Math.ceil((validade - hoje) / (1000 * 60 * 60 * 24));
  if (diferencaDias < 0) return 'vencido';
  if (diferencaDias <= 3) return 'proximo_vencimento';
  return 'disponivel';
};

function renderizarCadastroDoce(doceParaEditar = null) {
  const container = criarElemento('div', '', cssContainer);
  container.appendChild(criarElemento('h1', doceParaEditar ? 'Editar Doce' : 'Cadastro de Doce'));

  const campos = [
    { p: 'Quantidade', id: 'quantidade', t: 'number' },
    { p: 'Peso (g)', id: 'peso', t: 'number' },
    { p: 'Porção (g)', id: 'porcao', t: 'number' },
    { p: 'Data de Validade', id: 'data_validade', t: 'date' },
    { p: 'Massa', id: 'massa', t: 'text' },
    { p: 'Recheio', id: 'recheio', t: 'text' },
    { p: 'Cobertura', id: 'cobertura', t: 'text' },
    { p: 'Nome', id: 'tipo', t: 'text' }
  ];

  campos.forEach(c => {
    container.appendChild(criarInput(c.t, c.p, c.id));
    if (c.id === 'data_validade') {
      container.appendChild(criarElemento('span', '( data prevista de vencimento )', 'font-size: 12px; margin-top: -10px; margin-bottom: 10px; color: #555;'));
    }
  });

  const statusDiv = criarElemento('div', 'Status: -', 'margin: 10px;', 'status');
  container.appendChild(statusDiv);

  const acaoBotao = () => doceParaEditar ? atualizarDoce(doceParaEditar.id_doce) : cadastrarDoce();
  container.appendChild(criarBotao(doceParaEditar ? 'Atualizar' : 'Cadastrar', acaoBotao));
  container.appendChild(renderizarVoltar(renderizarMenu));
  container.appendChild(criarElemento('div', '', cssErro, 'erro'));

  app.replaceChildren(container);

  document.getElementById('data_validade').addEventListener('change', (e) => {
    const val = e.target.value;
    statusDiv.textContent = val ? `Status: ${calcularStatus(val).toUpperCase()}` : 'Status: -';
  });

  if (doceParaEditar) {
    campos.forEach(c => document.getElementById(c.id).value = doceParaEditar[c.id]);
    statusDiv.textContent = 'Status: ' + doceParaEditar.status.toUpperCase();
  }
}

async function cadastrarDoce() {
  const erroDiv = document.getElementById('erro');
  try {
    const response = await fetch(`${API_URL}/doces`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(obterDadosFormularioDoce())
    });
    const data = await response.json();

    if (data.status_code === 201) {
      erroDiv.style.color = 'green';
      erroDiv.textContent = 'Doce cadastrado com sucesso!';
      setTimeout(() => renderizarMenu(), 1500);
    } else {
      erroDiv.style.color = 'red';
      erroDiv.textContent = data.message || 'Erro ao cadastrar doce';
    }
  } catch (error) {
    erroDiv.textContent = 'Erro ao conectar com o servidor';
  }
}

async function atualizarDoce(id) {
  const erroDiv = document.getElementById('erro');
  try {
    const response = await fetch(`${API_URL}/doces/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(obterDadosFormularioDoce())
    });
    const data = await response.json();

    if (data.status_code === 200) {
      erroDiv.style.color = 'green';
      erroDiv.textContent = 'Doce atualizado com sucesso!';
      setTimeout(() => renderizarMenu(), 1500);
    } else {
      erroDiv.style.color = 'red';
      erroDiv.textContent = data.message || 'Erro ao atualizar doce';
    }
  } catch (error) {
    erroDiv.textContent = 'Erro ao conectar com o servidor';
  }
}

async function renderizarListagemDoces() {
  const container = criarElemento('div', '', cssContainer);
  container.appendChild(criarElemento('h1', 'Listagem de Doces'));

  const pesquisaInput = criarInput('text', 'Pesquisar doces...', '');
  pesquisaInput.style.width = '300px';
  container.appendChild(pesquisaInput);

  const ordenacaoDiv = criarElemento('div', '', 'margin: 10px;');
  ordenacaoDiv.appendChild(criarBotao('A-Z', () => {
    atualizarListaDOM([...docesCarregados].sort((a, b) => a.tipo.localeCompare(b.tipo)));
  }, 'margin: 5px; padding: 5px;'));
  
  ordenacaoDiv.appendChild(criarBotao('Z-A', () => {
    atualizarListaDOM([...docesCarregados].sort((a, b) => b.tipo.localeCompare(a.tipo)));
  }, 'margin: 5px; padding: 5px;'));
  container.appendChild(ordenacaoDiv);

  const listaDiv = criarElemento('div', '', '', 'listaDoces');
  container.appendChild(listaDiv);
  
  container.appendChild(renderizarVoltar(renderizarMenu));
  const erroDiv = criarElemento('div', '', cssErro, 'erro');
  container.appendChild(erroDiv);

  app.replaceChildren(container);

  function atualizarListaDOM(docesParaExibir) {
    listaDiv.replaceChildren();
    if (!docesParaExibir || docesParaExibir.length === 0) {
      listaDiv.textContent = 'Nenhum doce encontrado';
    } else {
      docesParaExibir.forEach(doce => {
        const item = criarElemento('div', '', 'margin: 10px; padding: 10px; border: 1px solid #ccc; width: 300px;');
        item.appendChild(criarElemento('span', `${doce.tipo} - ${doce.massa}/${doce.recheio}/${doce.cobertura} - ${doce.status}`));
        item.appendChild(criarBotao('Ver Detalhes', () => renderizarDetalhesDoce(doce.id_doce), 'margin-left: 10px; padding: 5px;'));
        listaDiv.appendChild(item);
      });
    }
  }

  pesquisaInput.addEventListener('input', (e) => {
    const termo = e.target.value.toLowerCase();
    if (!termo) return atualizarListaDOM(docesCarregados);

    const filtrados = docesCarregados.filter(d => 
      [d.tipo, d.massa, d.recheio, d.cobertura, d.status].some(val => val.toLowerCase().includes(termo))
    );
    atualizarListaDOM(filtrados);
  });

  try {
    const response = await fetch(`${API_URL}/doces`);
    const data = await response.json();
    if (data.status_code === 200) {
      docesCarregados = data.response.doces;
      atualizarListaDOM(docesCarregados);
    }
  } catch (error) {
    erroDiv.textContent = 'Erro ao conectar com o servidor';
  }
}

async function renderizarDetalhesDoce(id) {
  const container = criarElemento('div', '', cssContainer);
  container.appendChild(criarElemento('h1', 'Detalhes do Doce'));

  const detalhesDiv = criarElemento('div', '', '', 'detalhes');
  container.appendChild(detalhesDiv);
  
  const erroDiv = criarElemento('div', '', cssErro, 'erro');
  container.appendChild(erroDiv);

  const botoesDiv = criarElemento('div', '', 'margin-top: 20px;');
  botoesDiv.appendChild(renderizarVoltar(renderizarListagemDoces));
  botoesDiv.appendChild(criarBotao('Editar', async () => {
    try {
      const response = await fetch(`${API_URL}/doces/${id}`);
      const data = await response.json();
      if (data.status_code === 200) renderizarCadastroDoce(data.response);
    } catch (error) {
      erroDiv.textContent = 'Erro ao carregar doce para edição';
    }
  }, 'margin: 10px; padding: 10px; width: 100px;'));

  container.appendChild(botoesDiv);
  app.replaceChildren(container);

  try {
    const response = await fetch(`${API_URL}/doces/${id}`);
    const data = await response.json();

    if (data.status_code === 200) {
      const d = data.response;
      const info = [
        `Nome: ${d.tipo}`, `Quantidade: ${d.quantidade}`, `Peso: ${d.peso}g`,
        `Porção: ${d.porcao}g`, `Validade: ${new Date(d.data_validade).toLocaleDateString('pt-BR')}`,
        `Massa: ${d.massa}`, `Recheio: ${d.recheio}`, `Cobertura: ${d.cobertura}`, `Status: ${d.status}`
      ];
      info.forEach(texto => detalhesDiv.appendChild(criarElemento('p', texto, 'margin: 5px;')));
    } else {
      erroDiv.textContent = data.message || 'Erro ao carregar doce';
    }
  } catch (error) {
    erroDiv.textContent = 'Erro ao conectar com o servidor';
  }
}

async function renderizarDescarte() {
  const container = criarElemento('div', '', cssContainer);
  container.appendChild(criarElemento('h1', 'Descarte de Doce'));

  const select = criarElemento('select', '', cssPadrao, 'fk_id_doce');
  container.appendChild(select);
  
  container.appendChild(criarBotao('Descartar', realizarDescarte));
  container.appendChild(renderizarVoltar(renderizarMenu));
  container.appendChild(criarElemento('div', '', cssErro, 'erro'));

  app.replaceChildren(container);

  try {
    const response = await fetch(`${API_URL}/doces`);
    const data = await response.json();

    if (data.status_code === 200) {
      const optionVazia = criarElemento('option', 'Selecione um doce');
      optionVazia.value = '';
      select.appendChild(optionVazia);

      data.response.doces.forEach(doce => {
        if (doce.status !== 'descartado') {
          const option = criarElemento('option', `${doce.tipo} - ${doce.massa}/${doce.recheio}`);
          option.value = doce.id_doce;
          select.appendChild(option);
        }
      });
    }
  } catch (error) {
    document.getElementById('erro').textContent = 'Erro ao carregar doces';
  }
}

async function realizarDescarte() {
  const fk_id_doce = document.getElementById('fk_id_doce').value;
  const erroDiv = document.getElementById('erro');

  if (!fk_id_doce) {
    erroDiv.textContent = 'Selecione um doce';
    return;
  }

  const usuario = JSON.parse(localStorage.getItem('usuario'));

  try {
    const response = await fetch(`${API_URL}/descartes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ fk_id_funcionario: usuario.id_funcionario, fk_id_doce: parseInt(fk_id_doce) })
    });
    const data = await response.json();

    if (data.status_code === 201) {
      erroDiv.style.color = 'green';
      erroDiv.textContent = 'Doce descartado com sucesso!';
      setTimeout(() => renderizarMenu(), 1500);
    } else {
      erroDiv.style.color = 'red';
      erroDiv.textContent = data.message || 'Erro ao descartar doce';
    }
  } catch (error) {
    erroDiv.textContent = 'Erro ao conectar com o servidor';
  }
}

async function renderizarHistoricoDescarte() {
  const container = criarElemento('div', '', cssContainer);
  container.appendChild(criarElemento('h1', 'Histórico de Descarte'));

  const listaDiv = criarElemento('div', '', '', 'listaDescartes');
  container.appendChild(listaDiv);
  container.appendChild(renderizarVoltar(renderizarMenu));
  container.appendChild(criarElemento('div', '', cssErro, 'erro'));

  app.replaceChildren(container);

  try {
    const response = await fetch(`${API_URL}/descartes`);
    const data = await response.json();

    if (data.status_code === 200) {
      const descartes = data.response.descartes;

      if (descartes.length === 0) {
        listaDiv.textContent = 'Nenhum descarte registrado';
      } else {
        descartes.forEach(desc => {
          const texto = `${new Date(desc.data_descarte).toLocaleDateString('pt-BR')} - ${desc.nome_funcionario} - ${desc.tipo_doce}`;
          listaDiv.appendChild(criarElemento('div', texto, 'margin: 10px; padding: 10px; border: 1px solid #ccc; width: 300px;'));
        });
      }
    } else {
      document.getElementById('erro').textContent = data.message || 'Erro ao carregar histórico';
    }
  } catch (error) {
    document.getElementById('erro').textContent = 'Erro ao conectar com o servidor';
  }
}

const usuarioLogado = localStorage.getItem('usuario');
if (usuarioLogado) {
  renderizarMenu();
} else {
  renderizarLogin();
}