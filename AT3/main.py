from matrix import transpor_matriz, multiplicar_matriz

def rodar_testes():
    print("===================")
    print("  TESTE DE PACOTE MATEMÁTICO")
    print("==========================")

    # ---- TRANSPOSIÇÃO ----
    print("\n--- TRANSPOSIÇÃO ---")
    A = [[1, 2], [3, 4], [5, 6]]
    print(f"Entrada:  {A}")
    resultado = transpor_matriz(A)
    print(f"Saída:    {resultado}")
    # Esperado: [[1, 3, 5], [2, 4, 6]]

    # ---- MULTIPLICAÇÃO ----
    print("\n--- MULTIPLICAÇÃO ---")
    A = [[1, 2], [3, 4]]
    B = [[5, 6], [7, 8]]
    print(f"Entrada A: {A}")
    print(f"Entrada B: {B}")
    resultado = multiplicar_matriz(A, B)
    print(f"Saída:     {resultado}")
    # Esperado: [[19, 22], [43, 50]]

    # ---- TESTE DE ERRO ----
    print("\n--- TESTE DE VALIDAÇÃO (dimensões incompatíveis) ---")
    A = [[1, 2, 3], [4, 5, 6]]  # 2x3
    B = [[1, 2], [3, 4]]        # 2x2 → colunas A (3) ≠ linhas B (2)
    resultado = multiplicar_matriz(A, B)
    print(f"Resultado: {resultado}")

    print("\n==========================")
    print("  TESTES CONCLUÍDOS")
    print("==========================")

if __name__ == "__main__":
    rodar_testes()
