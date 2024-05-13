import { apiCaller } from '../../axios';
import { ENDPOINTS } from './api-endpoints.service';

export const getHousesService = ({ offset, limit }) => {
  return apiCaller.post(ENDPOINTS.houses.houses, {
    offset,
    limit,
  });
};

export const filterHousesService = ({
  name,
  categories,
  provinces,
  districts,
  wards,
  minArea,
  maxArea,
  minPrice,
  maxPrice,
  amenities,
  utilities,
  offset,
  limit,
}) => {
  return apiCaller.post(ENDPOINTS.houses.houses, {
    name,
    categories,
    province_id: provinces,
    district_id: districts,
    ward_id: wards,
    min_area: minArea,
    max_area: maxArea,
    min_price: minPrice,
    max_price: maxPrice,
    amenities,
    utilities,
    offset,
    limit,
  });
};

export const getMetaData = () => {
  return apiCaller.get(ENDPOINTS.houses.metadata);
};

export const getHouseById = async ({ house_id }) => {
  return apiCaller.get(`${ENDPOINTS.houses.base}/${house_id}`);
};

export const getHouseReview = async ({ house_id }) => {
  const endpoint = ENDPOINTS.houses.reviews(house_id);
  return apiCaller.get(endpoint);
};

export const updateWishlist = async ({ added_house_ids, removed_house_ids }) => {
  return apiCaller.patch(ENDPOINTS.houses.wishlist, {
    added_house_ids,
    removed_house_ids,
  });
};

export const getWishlist = async () => {
  return apiCaller.get(ENDPOINTS.houses.wishlist);
};

//House Service for Review
export const addHouseReview = async ({ house_id, rating, comment }) => {
  return apiCaller.post(ENDPOINTS.houses.reviews(house_id), { rating, comment });
};

export const updateHouseReview = async ({ house_id, rating, comment }) => {
  return apiCaller.patch(ENDPOINTS.houses.updateReview(house_id), { rating, comment });
};

export const deleteHouseReview = async ({ house_id }) => {
  return apiCaller.delete(ENDPOINTS.houses.updateReview(house_id));
};
