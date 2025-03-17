import BigNumber from 'bignumber.js';

export const formatNumber = (numString: string, decimals = 1) => {
  const bn = new BigNumber(numString);
  if (bn.isLessThan(1000)) return numString;

  const units = ['K', 'M', 'B', 'T', 'Q'];
  let unitIndex = -1;
  let reducedNum = bn;

  while (reducedNum.isGreaterThanOrEqualTo(1000) && unitIndex < units.length - 1) {
    reducedNum = reducedNum.div(1000);
    unitIndex++;
  }
  const formattedNum = reducedNum.toFixed(decimals).replace(/\.?0+$/, '');
  return `${formattedNum}${units[unitIndex]}`;
};

export default formatNumber;
