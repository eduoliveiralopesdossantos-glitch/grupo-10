def transpor_matriz(matriz):
    """
    Transpõe uma matriz M x N para N x M.
    Transforma linhas em colunas e vice-versa.
    """
    linhas = len(matriz)
    colunas = len(matriz[0])

    transposta = []
    for j in range(colunas):
        nova_linha = []
        for i in range(linhas):
            nova_linha.append(matriz[i][j])
        transposta.append(nova_linha)

    return transposta


def multiplicar_matriz(matriz_a, matriz_b):
    """
    Multiplica duas matrizes (linha por coluna).
    Valida se o número de colunas de A é igual ao número de linhas de B.
    """
    colunas_a = len(matriz_a[0])
    linhas_b  = len(matriz_b)

    if colunas_a != linhas_b:
        return "Erro: número de colunas de A deve ser igual ao número de linhas de B."

    linhas_a  = len(matriz_a)
    colunas_b = len(matriz_b[0])

    resultado = []
    for i in range(linhas_a):
        linha = []
        for j in range(colunas_b):
            soma = 0
            for k in range(colunas_a):
                soma += matriz_a[i][k] * matriz_b[k][j]
            linha.append(soma)
        resultado.append(linha)

    return resultado
