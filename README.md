# 🚀 Brain Agriculture

![Static Badge](https://img.shields.io/badge/status-Active-gren?style=for-the-badge)
![Static Badge](https://img.shields.io/badge/coverage-0-red?style=for-the-badge)
![Static Badge](https://img.shields.io/badge/Node-16.20.2-yellow?style=for-the-badge)
![Static Badge](https://img.shields.io/badge/production-192.168.10.18-gren?style=for-the-badge)

## 📋 Descrição

Sistema simples manipulação de dados de produtores rurais.

### Features:  
✔️ Rota para cadastrar produtores rurais  
 Rota para alterar produtores rurais    
✔️ Rota para excluir produtores rurais    
✔️ Rota para listar dados de um produtor rural    
 Rota para listar dados para um dashboard

### Recursos técnicos:  
 Documentação com OpenAPI (swagger)  
✔️ Dockerização com Docker  
 Testes unitários com Jest  
 Deploy automático para uma função lambda na AWS  

## 💻 Pré Requisitos

Para utilizar o projeto é necessário ter instalado em sua máquina:

- [Node >= 10.19.0](https://nodejs.org/en/download)
- [Docker >= 10.19.0](https://nodejs.org/en/download)

## 🛠️ Instalando e Rodando

1. Clone o sistema para seu ambiente com: `git clone https://github.com/JuliaDeNadai/brain-agriculture.git`

2. Em seu ambiente, entre na pasta do projeto `cd brain-agriculture`

3. Para utilizar a aplicação é necessário criar um arquivo `.env` com os dados de conexão com o banco de dados.
> Utilize como modelo o arquivo `.env.example`

5. Inicialize a aplicação em ambiente de desenvolvimento através do comando `docker-compose -f docker-compose.dev.yml up`

6. Pronto! O sistema estará rodando na porta: 3000 e ficará disponível em:
    > http://localhost:3000/


## 📜 Licença 

Este projeto não está sob nenhuma licença.
