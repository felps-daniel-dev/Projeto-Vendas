export const converterBigDecimal = (value: string | number): number => {
    if (!value) return 0;
    if (typeof value === 'number') return value;
    
    const valorLimpo = value.replace(/\./g, '').replace(',', '.');
    return parseFloat(valorLimpo);
}

export const formatReal = (valor: string) => {
    if (!valor) return '';

    const v = ((parseInt(valor.replace(/\D/g, '')) / 100).toFixed(2) + '').split('.');

    const m = v[0].split('').reverse().join('').match(/.{1,3}/g);
    if (!m) return v[0] + ',' + v[1]; 
    for (let i = 0; i < m.length; i++) {
        m[i] = m[i].split('').reverse().join('') + '.';
    }
    const r = m.reverse().join('');

    return r.substring(0, r.lastIndexOf('.')) + ',' + v[1];
}