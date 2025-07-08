def marcar_opcoes(opcoes, selecionado):
    return "   ".join(f"({'X' if o == selecionado.upper() else '  '}) {o}" for o in opcoes)