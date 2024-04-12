import React from 'react';
import { Typography } from 'antd';
import './styles.scss';
const { Text } = Typography;
/**
 * Caption component
 * Inherit from Ant Design Typography, please refer to https://ant.design/components/typography/
 * @param {Object} props - The properties passed to the component
 * @param {string} props.classNames - The CSS classes to apply to the component
 * @param {(110|140)} props.size - The size of the text. Should be either '110' or '140'
 */
export const Caption = ({ classNames, size = 110, ...props }) => {
  const classes = classNames ? `caption caption-${size} ${classNames}` : `caption caption-${size}`;
  return <Text {...props} className={classes} />;
};
