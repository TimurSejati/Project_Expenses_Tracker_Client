const currencyFormatter = (symbol, amount) => {
	return new Intl.NumberFormat('id', {
		style: 'currency',
		currency: symbol
	}).format(amount)
};

export default currencyFormatter;