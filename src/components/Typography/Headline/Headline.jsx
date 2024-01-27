import React from 'react';
import { Typography } from 'antd';
import './styles.scss';
const { Text } = Typography;
/**
 * Title component
 * Inherit from Ant Design Typography, please refer to https://ant.design/components/typography/
 * @param {Object} props - The properties passed to the component
 * @param {string} props.classNames - The CSS classes to apply to the component
 * @param {(450|600)} props.size - The size of the text. Should be either '110' or '140'
 */
export const Headline = ({ classNames, size = 450, ...props }) => {
  const classes = classNames
    ? `headline headline-${size} ${classNames}`
    : `headline headline-${size}`;
  return <Text {...props} className={classes} />;
};
