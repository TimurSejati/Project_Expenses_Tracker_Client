const calcTransaction = arr => {
	const transactionArr = arr?.map(data => data?.amount);

	// Sum
	const sumTotal = arr?.map(data => data?.amount).reduce((acc, curr) => {
		return Number(acc) + Number(curr)
	})

	const avg = sumTotal / 2;
	const min = Math.max(...transactionArr);
	const max = Math.max(...transactionArr);

	return { sumTotal, avg, min, max }
}

export default calcTransaction;