export const cutTextIfToLong = (txt, num) =>
	txt
		.split('', num)
		.reduce((o, c) => (o.length === num - 1 ? `${o}${c}...` : `${o}${c}`), '');
