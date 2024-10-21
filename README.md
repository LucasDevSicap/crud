CRUD EIKINHO
Este é um CRUD desenvolvido em php, html, css, js, e PostgreSQL, usando o bootstrap, jquery e ajax como parte de um desafio técnico passado. 
Ele permite realizar o cadastro de desenvolvedores da empresa, podendo adicionar as informações de endereço, nome, cpf, telefone, email, 
stack, nível e adicionar uma observação quanto o desenvolvedor.


Instalação
Para iniciar o cliente e o servidor, utilize o comando npm start. Para criar a tabela no MySQL, utilize o seguinte comando SQL:
-- Database: dev_crud


CREATE DATABASE dev_crud
    WITH
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'Portuguese_Brazil.1252'
    LC_CTYPE = 'Portuguese_Brazil.1252'
    LOCALE_PROVIDER = 'libc'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1
    IS_TEMPLATE = False;



-- Table: public.developers

CREATE TABLE IF NOT EXISTS public.developers
(
    id integer NOT NULL DEFAULT nextval('developers_id_seq'::regclass),
    nome character varying(255) COLLATE pg_catalog."default",
    cidade character varying(255) COLLATE pg_catalog."default",
    observacao text COLLATE pg_catalog."default",
    funcao character varying(2000) COLLATE pg_catalog."default",
    estado character varying(255) COLLATE pg_catalog."default",
    nivel character varying(600) COLLATE pg_catalog."default",
    cpf character varying(50) COLLATE pg_catalog."default",
    telefone character varying(50) COLLATE pg_catalog."default",
    email character varying(255) COLLATE pg_catalog."default",
    CONSTRAINT developers_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.developers
    OWNER to postgres;

##Estou realizando uma correção quanto o get, mas em breve estará em pleno funcionamento…
