/**
 * 프로모션 할인 계산 (1+1, 2+1)
 * @param {object} item - 상품 객체
 * @returns {number} 할인 금액
 */
export function calculateDiscount(item) {
    const { price = 0, quantity = 0, isPromo = 0 } = item;
  
    if (isPromo === 2) {
      // 1+1
      return Math.floor(quantity / 2) * price;
    }
  
    if (isPromo === 3) {
      // 2+1
      return Math.floor(quantity / 3) * price;
    }
  
    return 0;
}
  
/**
 * 프로모션 포함 최종 결제 금액 계산
* @param {object} item - 상품 객체
* @returns {number} 최종 결제 금액
*/
export function calculateFinalAmount(item) {
    const { price = 0, quantity = 0, isPromo = 0 } = item;

    if (isPromo === 2) {
        const paid = Math.floor(quantity / 2) + (quantity % 2); // 1+1
        return paid * price;
    }

    if (isPromo === 3) {
        const paid = Math.floor(quantity / 3) * 2 + (quantity % 3); // 2+1
        return paid * price;
    }

    return price * quantity;
}
  