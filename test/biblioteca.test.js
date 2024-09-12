const Biblioteca = require('../src/biblioteca');

describe('Testes da classe Biblioteca', () => {
    let biblioteca;
    let livro1, livro2, livro3;
    let membro1, membro2;

    beforeEach(() => {
        biblioteca = new Biblioteca();

        
        livro1 = { id: 1, titulo: 'livro1', autor: 'Gabriel', genero: 'ação', ano: 2020, emprestado: false };
        livro2 = { id: 2, titulo: 'livro2', autor: 'Naum', genero: 'terror', ano: 2021, emprestado: false };
        livro3 = { id: 3, titulo: 'livro3', autor: 'Rafael', genero: 'comedia', ano: 2022, emprestado: false };

        
        membro1 = { id: 1, nome: 'Salazar' };
        membro2 = { id: 2, nome: 'Marcirio' };


        biblioteca.adicionarLivro(livro1);
        biblioteca.adicionarLivro(livro2);
        biblioteca.adicionarLivro(livro3);
        biblioteca.adicionarMembro(membro1);
        biblioteca.adicionarMembro(membro2);
    });

    test('Adicionar e remover livros', () => {
        expect(biblioteca.listarLivros().length).toBe(3);

        biblioteca.removerLivro(1);
        expect(biblioteca.listarLivros().length).toBe(2);

        biblioteca.adicionarLivro(livro1);
        expect(biblioteca.listarLivros().length).toBe(3);
    });

     test('Buscar livro por id', () => {
        expect(biblioteca.buscarLivroPorId(1).titulo).toBe("livro1");
    });

    test('Buscar livro por Titulo', () => {
        expect(biblioteca.buscarLivroPorTitulo("livro1").length).toBe(1);
    });

    test('Adicionar e remover membros', () => {
        expect(biblioteca.listarMembros().length).toBe(2);

        biblioteca.removerMembro(1);
        expect(biblioteca.listarMembros().length).toBe(1);

        biblioteca.adicionarMembro(membro1);
        expect(biblioteca.listarMembros().length).toBe(2);
    });

    test('Buscar membro por id', () => {
        expect(biblioteca.buscarMembroPorId(1).nome).toBe("Salazar");
    });

    test('Emprestar livro', () => {
        biblioteca.emprestarLivro(1, 1);
        expect(biblioteca.buscarLivroPorId(1).emprestado).toBe(true);
    });

    test('Não emprestar livro indisponível', () => {
        biblioteca.emprestarLivro(1, 1);  
        const falha = biblioteca.emprestarLivro(1, 2); 
        expect(falha).toBe(false);
    });

    test('Devolver livro', () => {
        biblioteca.emprestarLivro(1, 1);  
        const sucesso = biblioteca.devolverLivro(1);
        expect(sucesso).toBe(true);
    });

    test('Listar livros emprestados', () => {
        biblioteca.emprestarLivro(1, 1);
        expect(biblioteca.listarLivrosEmprestados().length).toBe(1);
    });

    test('Listar livros disponíveis', () => {
        biblioteca.emprestarLivro(1, 1);
        expect(biblioteca.listarLivrosDisponiveis().length).toBe(2);
    });

    test('Contar livros', () => {
        expect(biblioteca.contarLivros()).toBe(3);
    });

    test('Contar membros', () => {
        expect(biblioteca.contarMembros()).toBe(2);
    });

    test('Listar livros por autor', () => {
        expect(biblioteca.listarLivrosPorAutor('Gabriel').length).toBe(1);
    });

    test('Listar livros por gênero', () => {
        expect(biblioteca.listarLivrosPorGenero('terror').length).toBe(1);
    });

    test('atualizar informações de um livro', () => {
        biblioteca.atualizarInformacaoLivro(1, { titulo: 'livro4', ano: 2019 });
        expect(biblioteca.buscarLivroPorId(1).titulo).toBe('livro4');
        expect(biblioteca.buscarLivroPorId(1).ano).toBe(2019);
    });

    test('Deve listar livros por ano', () => {
        expect(biblioteca.listarLivrosPorAno(2020).length).toBe(1);
        expect(biblioteca.listarLivrosPorAno(2020)[0].titulo).toBe('livro1');
    });
});










  






