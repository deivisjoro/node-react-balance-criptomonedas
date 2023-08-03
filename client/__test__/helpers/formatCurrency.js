export const formatCurrency = (value) => {
    value = Number(value);
    return new Intl.NumberFormat('en-US').format(value.toFixed(5));
  }

export const formatCurrencyWithOutFixed = (value) => {
    if(value=='cargando...'){
        return value;
    }
    return new Intl.NumberFormat('en-US').format(value);
}