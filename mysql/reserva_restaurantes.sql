-- Crie o banco de dados
	CREATE DATABASE reserva_restaurante;

	-- Use o banco de dados
	USE reserva_restaurante;

	-- Tabela de Usuários
	CREATE TABLE usuarios (
	  id INT AUTO_INCREMENT PRIMARY KEY,
	  username VARCHAR(30) NOT NULL ,
	  senha VARCHAR(255) NOT NULL,
	  name VARCHAR(50) NOT NULL,
	  phone VARCHAR(20) NOT NULL,
	  email VARCHAR(255) NOT NULL,
	  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
	);

	-- Tabela de Mesas
	CREATE TABLE mesas (
	  id INT AUTO_INCREMENT PRIMARY KEY,
	  mesa_number INT NOT NULL,
	  capacidade INT NOT NULL,
	  disponibilidade BOOLEAN NOT NULL DEFAULT 1,
	  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
	);

	-- Tabela de Reservas
	CREATE TABLE reservas (
	  id INT AUTO_INCREMENT PRIMARY KEY,
	  user_id INT NOT NULL,
	  mesa_id INT NOT NULL,
	  reservaDate DATE NOT NULL,
	  reservaTime TIME NOT NULL,
	  number_of_guests INT NOT NULL,
	  status ENUM('pendente', 'confirmada', 'cancelada') NOT NULL DEFAULT 'pendente',
	  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	  FOREIGN KEY (user_id) REFERENCES usuarios(id),
	  FOREIGN KEY (mesa_id) REFERENCES mesas(id)
	);

	-- Inserir uma mesa com número 1, capacidade para 4 pessoas e disponibilidade padrão
	INSERT INTO mesas (mesa_number, capacidade) VALUES (1, 4);
	INSERT INTO mesas (mesa_number, capacidade) VALUES (2, 4);
	INSERT INTO mesas (mesa_number, capacidade) VALUES (3, 4);
	INSERT INTO mesas (mesa_number, capacidade) VALUES (4, 4);
	INSERT INTO mesas (mesa_number, capacidade) VALUES (5, 4);
	INSERT INTO mesas (mesa_number, capacidade) VALUES (6, 4);
	INSERT INTO mesas (mesa_number, capacidade) VALUES (7, 4);
	INSERT INTO mesas (mesa_number, capacidade) VALUES (8, 4);
	INSERT INTO mesas (mesa_number, capacidade) VALUES (9, 4);
	INSERT INTO mesas (mesa_number, capacidade) VALUES (10, 4);

    select * from usuarios;
	select * from mesas;
	select * from reservas;