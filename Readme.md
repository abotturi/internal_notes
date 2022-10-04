# Internal Notes
Desenvolvido por **Alan Botturi**

## Start
 - Instalar o docker desktop e iniciar
 - Checar se o dokcer-compose esta instalado ```docker-compose -v```
    > Se caso não estiver, instalar
 - Liberar a porta **8080** e **5432** do computador
 - Entrar na raiz da pasta e dar o comando ```docker-compose up --build```
    
    > Esse comando iniciara o servidor e criara o banco de dados ja com as tabelas necessárias
    > Se tudo inicializar certo, ira aparecer</br> **Servidor aberto na porta 8080** e **Data Source has been initialized!**

## Rotas
### User
 - #### GET 
    >URL: **exemple.com/user/nome_usuario**

    >Ira retornar dados do usuario e as 5 ultimas publicações</br>

    >Caso queira solicitar mais 5 publicações e so passar o paramentro **last_post** com o id da ultima postagem carregada no body da requisição

    
    | Comando | Descrição | Como usar
    | --- | --- | --- |
    | `last_post` | Retornar mais 5 publicações | Passar no body |

 - #### POST
    >URL: **exemple.com/user**

    >Os nomes dos usuarios são unicos 

    | Comando | Descrição | Como usar
    | --- | --- | --- |
    | `name` | Ira criar um novo usuario caso o nome ainda não tenha sido criado | Passar no body |

### Post
 - #### GET 
    >URL: **exemple.com/post**

    >Ira retornar dados do usuario e as 10 ultimas publicações</br>

    >Caso queira solicitar mais 10 publicações e so passar o paramentro **last_post** com o id da ultima postagem carregada no body da requisição
    
    | Comando | Descrição | Como usar
    | --- | --- | --- |
    | `last_post` | Retornar mais 10 publicações | Passar no body |
    | `start_date` </br> `end_date` | Adiciona um filtro para busca entre datas (YYYY-MM-DD) | Passar no body |    
    | `name` | Retorna somente as publicações do usuario selecionao (Caso o usuario tenha clicado em 'Minhas publicações' no Front-End) | Passar no body |

 - #### POST
    >URL: **exemple.com/post**

    >Criar uma publicação

    | Comando | Descrição | Como usar
    | --- | --- | --- |
    | `name` | Usuario que estara fazendo a publicação | Passar no body |
    | `text` | Texto da publicação max(777) | Passar no body |
    | `repost` | Id de outra publicação se caso queira Republicar, somente para donos da publicação e publicações originais | Passar no body |

### COMMENT
 - #### GET 
    >URL: **exemple.com/comment/id_post**

    >Ira retornar todos os comentarios de uma publicação</br>

 - #### POST
    >URL: **exemple.com/comment**

    >Cria um comentario em uma publicação, o usuario podera comentar somente 5 comentarios por dia.

    | Comando | Descrição | Como usar
    | --- | --- | --- |
    | `name` | Usuario que estara fazendo o comentario, somente donos da publicação poderam comentar | Passar no body |
    | `text` | Texto do comentario max(777) | Passar no body |
    | `post` | Id da publicação que esta sendo comentada | Passar no body |


## Fase de Codificação
 - Tentei ser o mais fiel possivel ao que fui pedido e com as tecnoligas que foram solicitadas

## Fase de Autoanálise
 - ### Pergunta 1
    - Teria estruturado melhor os sistemas, principalmente na parte de repostagem, teriar criado uma tabela somente para isso, 
    mais como não conhecia o Typeorm e tive que estudar em 2 dias e criar o projeto em 1 dia, usei uma _gambiarra_ para retornar o conteudo da postagem. Ainda não sei a melhor forma de fazer isso usando o Typeorm.

 - ### Pergunta 2
    - Acredito que o sistema para carregar novas postagens, pois aumentaria a demanda.

 - ### Pergunta 3
    - Usaria o EC2 com LoadBalance da AWS, pois ele seria alto escalavel, caso uma maquina estivesse sobrecarregada ele faria a solicitação em outra
