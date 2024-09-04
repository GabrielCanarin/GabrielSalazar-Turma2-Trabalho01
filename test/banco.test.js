const Banco = require("../src/banco");

describe('Testes da classe Banco', () => {
    let conta;
    let contaDestino;

    beforeEach(() => {
        conta = new Banco('Conta Ugioni', 2);
        contaDestino = new Banco('Conta Destino', 10);
    });

    test('Deve depositar dinheiro corretamente', () => {
        conta.depositar(7.7);
        expect(conta.obterSaldo()).toBe(9.7);
    });

    test('Deve sacar dinheiro corretamente', () => {
        conta.sacar(1);
        expect(conta.obterSaldo()).toBe(1);
    });

    test('Deve lançar erro ao tentar sacar mais do que o saldo disponível', () => {
        expect(() => conta.sacar(5)).toThrow('Saldo insuficiente');
    });

    test('Deve transferir dinheiro para outra conta corretamente', () => {
        conta.transferir(2, contaDestino);
        expect(conta.obterSaldo()).toBe(0);
        expect(contaDestino.obterSaldo()).toBe(12);
    });

    test('Deve obter o saldo atual corretamente', () => {
        expect(conta.obterSaldo()).toBe(2);
    });

    test('Deve obter o histórico de transações corretamente', () => {
        conta.depositar(5);
        conta.sacar(2);
        expect(conta.obterHistorico()).toEqual([
            { tipo: 'Depósito', valor: 5 },
            { tipo: 'Saque', valor: 2 }
        ]);
    });

    test('Deve definir o limite de saque corretamente', () => {
        conta.definirLimiteDeSaque(100);
        expect(conta.limiteDeSaque).toBe(100);
    });

    test('Deve lançar erro ao tentar sacar acima do limite permitido', () => {
        conta.definirLimiteDeSaque(50);
        expect(() => conta.verificarLimiteDeSaque(51)).toThrow('Saque acima do limite permitido');
    });

    test('Deve aplicar juros ao saldo corretamente', () => {
        conta.aplicarJuros(10);
        expect(conta.obterSaldo()).toBe(2.2);  // 10% de 2 é 0.2, então saldo final é 2 + 0.2 = 2.2
    });

    test('Deve pagar uma conta corretamente', () => {
        conta.pagarConta(1, 'Pagamento de conta de luz');
        expect(conta.obterSaldo()).toBe(1);
        expect(conta.obterHistorico()).toContainEqual({ tipo: 'Pagamento', valor: 1, descricao: 'Pagamento de conta de luz' });
    });

    test('Deve obter o total depositado corretamente', () => {
        conta.depositar(10);
        conta.depositar(5);
        expect(conta.obterTotalDepositado()).toBe(15);
    });
});