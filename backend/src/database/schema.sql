-- Criar banco de dados
CREATE DATABASE IF NOT EXISTS doceria_gourmet_ianes;
USE doceria_gourmet_ianes;

CREATE TABLE IF NOT EXISTS tb_funcionario (
    id_funcionario INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS tb_doce (
    id_doce INT AUTO_INCREMENT PRIMARY KEY,
    quantidade INT NOT NULL,
    peso DECIMAL(10, 2) NOT NULL,
    porcao DECIMAL(10, 2) NOT NULL,
    data_validade DATE NOT NULL,
    massa VARCHAR(50) NOT NULL,
    recheio VARCHAR(50) NOT NULL,
    cobertura VARCHAR(50) NOT NULL,
    status VARCHAR(50) NOT NULL,
    tipo VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS tb_historico_descarte (
    id_historico INT AUTO_INCREMENT PRIMARY KEY,
    data_descarte DATE NOT NULL,
    fk_id_funcionario INT NOT NULL,
    fk_id_doce INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (fk_id_funcionario) REFERENCES tb_funcionario(id_funcionario) ON DELETE CASCADE,
    FOREIGN KEY (fk_id_doce) REFERENCES tb_doce(id_doce) ON DELETE CASCADE
);

-- LOGIN DE EXEMPLO
INSERT INTO tb_funcionario (nome, email, senha) VALUES
('Rogerio', 'roger@gmail.com', '123');

INSERT INTO tb_doce (quantidade, peso, porcao, data_validade, massa, recheio, cobertura, status, tipo) VALUES
(50, 100.00, 25.00, '2026-06-15', 'chocolate', 'morango', 'chocolate', 'disponivel', 'bombom'),
(30, 80.00, 20.00, '2026-06-01', 'branqueamento', 'doce de leite', 'ao leite', 'proximo_vencimento', 'trufa'),
(20, 120.00, 30.00, '2026-05-20', 'chocolate', 'ninho', 'chocolate', 'vencido', 'cupcake'),
(40, 90.00, 22.50, '2026-07-10', 'laranja', 'chocolate', 'branca', 'disponivel', 'torta'),
(25, 150.00, 37.50, '2026-05-28', 'chocolate', 'marshmallow', 'chocolate', 'proximo_vencimento', 'brownie');

-- Inserir histórico de descarte de teste
INSERT INTO tb_historico_descarte (data_descarte, fk_id_funcionario, fk_id_doce) VALUES
('2026-05-29', 1, 3);

-- Atualizar status do doce descartado
UPDATE tb_doce SET status = 'descartado' WHERE id_doce = 3;
