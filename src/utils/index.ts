export function formatCurrency(amount: number) {  /// Para formatear el monto
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(amount)
}

export function toBoolean(str: string) {   /// Para retornar la funcion en lower
    return str.toLowerCase() === "true"  
}