export const groupStocksByProduct = (items) => {
  if (!items || !items.length) return [];

  const map = new Map();

  items.forEach((item) => {
    const key = `${item.productName}_${item.storage}_${item.grade}`;

    if (!map.has(key)) {
      map.set(key, {
        groupKey: key,
        productName: item.productName,
        storage: item.storage,
        grade: item.grade,
        productImage: item.productImage,
        minPrice: item.minPrice,
        productMinPrice: item.productMinPrice,
        productMaxPrice: item.productMaxPrice,
        productSuggestPrice: item.productSuggestPrice,
        updatedAt: item.updatedAt,
        varieties: [],
      });
    }

    const group = map.get(key);

    // 최저가 갱신
    if (item.minPrice && (!group.minPrice || item.minPrice < group.minPrice)) {
      group.minPrice = item.minPrice;
    }
    // 최근 수정일 갱신
    if (item.updatedAt && (!group.updatedAt || item.updatedAt > group.updatedAt)) {
      group.updatedAt = item.updatedAt;
    }

    group.varieties.push({
      productVarietyId: item.productVarietyId,
      color: item.color || item.productColor,
      productPrice: item.productPrice || 0,
      productStock: item.productStock || 0,
    });
  });

  return Array.from(map.values());
};
