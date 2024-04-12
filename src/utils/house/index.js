import { HousePropertyName } from '../../constants/house.constant';
import bedroomIcon from '../../assets/images/bed.png';
import bathroomIcon from '../../assets/images/bathroom.svg';
export const housePropertiesIconMapper = propertyName => {
  switch (propertyName) {
    case HousePropertyName.BEDROOMS:
      return {
        attributeName: HousePropertyName.BEDROOMS,
        translationKey: 'house.property.bedrooms',
        icon: bedroomIcon,
      };
    case HousePropertyName.BATHROOMS:
      return {
        attributeName: HousePropertyName.BATHROOMS,
        translationKey: 'house.property.bathrooms',
        icon: bathroomIcon,
      };

    default: {
      return {
        attributeName: propertyName,
        translationKey: propertyName,
        icon: 'abc',
      };
    }
  }
};
