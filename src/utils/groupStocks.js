/**
 * API 응답의 variety 목록을 productName + storage + grade 기준으로 그룹핑한다.
 *
 * @param {Array} items - API에서 내려온 variety 배열
 * @returns {Array} 등급별로 묶인 배열
 *   [{ grade: 2, items: [그룹1, 그룹2, ...] }, { grade: 1, items: [...] }, ...]
 *
 * 각 그룹 객체:
 *   {
 *     groupKey, productName, storage, grade, productImage, minPrice,
 *     lowestSellingPrice, updatedAt,
 *     colors: [{ color, productStock, productVarietyId, productPrice }, ...]
 *   }
 */
export const groupStocksByProduct = (items) => {
  if (!items || !items.length) return [];

  const groupMap = {};

  items.forEach((item) => {
    const key = `${item.productName}_${item.storage}_${item.grade}`;

    if (!groupMap[key]) {
      groupMap[key] = {
        groupKey: key,
        productName: item.productName,
        storage: item.storage,
        grade: item.grade,
        productImage: item.productImage,
        minPrice: item.minPrice,
        lowestSellingPrice: item.productPrice || 0,
        updatedAt: item.updatedAt,
        colors: [],
      };
    }

    const group = groupMap[key];

    // 최저 판매가 갱신
    if (item.productPrice && item.productPrice < group.lowestSellingPrice) {
      group.lowestSellingPrice = item.productPrice;
    }

    // 최저가(minPrice) 갱신
    if (item.minPrice && (!group.minPrice || item.minPrice < group.minPrice)) {
      group.minPrice = item.minPrice;
    }

    // 가장 최근 수정일 갱신
    if (item.updatedAt && (!group.updatedAt || item.updatedAt > group.updatedAt)) {
      group.updatedAt = item.updatedAt;
    }

    group.colors.push({
      color: item.color,
      productStock: item.productStock || 0,
      productVarietyId: item.productVarietyId,
      productPrice: item.productPrice || 0,
    });
  });

  // 그룹들을 등급별로 분류 (S=2 → A=1 → B=0)
  const gradeMap = {};
  Object.values(groupMap).forEach((group) => {
    const g = group.grade;
    if (!gradeMap[g]) {
      gradeMap[g] = [];
    }
    gradeMap[g].push(group);
  });

  // 등급 내림차순 정렬 (S → A → B)
  return Object.keys(gradeMap)
    .sort((a, b) => Number(b) - Number(a))
    .map((grade) => ({
      grade: Number(grade),
      items: gradeMap[grade],
    }));
};
