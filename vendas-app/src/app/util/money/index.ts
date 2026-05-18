export const converterBigDecimal = (value: any): number => {
    if (!value) return 0;
    if (typeof value === 'number') return value;
    
    // Remove R$, espaços e pontos de milhar, depois troca a vírgula por ponto
    const valorLimpo = value.replace("R$", "").replace(/\s/g, "").replace(/\./g, "").replace(',', '.');
    return parseFloat(valorLimpo) || 0; 
}

export const formatReal = (valor: any): string => {
    const v = ((valor || 0).toString().replace(/\D/g, '')) / 100;
    return v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}