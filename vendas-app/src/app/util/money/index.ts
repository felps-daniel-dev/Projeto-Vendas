export const converterBigDecimal = (value: string | number): number => {
    if (!value) return 0;
    if (typeof value === 'number') return value;
    
    const valorLimpo = value.replace(/\./g, '').replace(',', '.');
    return parseFloat(valorLimpo);
}

export const formatReal = (valor: any): string => {
    const v = ((valor || 0).toString().replace(/\D/g, '')) / 100;
    return v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}