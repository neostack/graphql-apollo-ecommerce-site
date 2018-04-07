import { SELECTED_PRODUCTS_QUERY } from "../queries";

export default {
  Mutation: {
    toggleProductSelection: (_, { productId }, { cache }) => {
      const { selectedProducts } = cache.readQuery({
        query: SELECTED_PRODUCTS_QUERY
      });
      const newSelectedProducts = selectedProducts.includes(productId)
        ? selectedProducts.filter(p => p !== productId)
        : selectedProducts.concat(productId);
      const data = {
        selectedProducts: newSelectedProducts
      };
      cache.writeData({ data });
      return null;
    }
  }
};
