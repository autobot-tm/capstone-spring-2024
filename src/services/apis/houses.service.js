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

export const getHouseById = ({ house_id }) => {
  return apiCaller.get(`${ENDPOINTS.houses.base}/${house_id}`);
};

export const getHouseReview = ({ house_id }) => {
  const endpoint = ENDPOINTS.houses.reviews(house_id);
  return apiCaller.get(endpoint);
};
