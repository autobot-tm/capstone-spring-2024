import React, { useState } from 'react';
import { Layout } from '../../../../hoc/Layout';
import './styles.scss';
import { Caption, Paragraph, SubHeading } from '../../../../components/Typography';
import { Avatar, Button, Col, Divider, Form, Input, Row, Select } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import SpinLoading from '../../../../components/SpinLoading/SpinLoading';
import { updateUserCurrentService } from '../../../../services/apis/users.service';
import { useUserSlice } from '../../../../store/slices/user.slice';
import { COUNTRY } from '../../../../constants/country.constant';
import UploadAvatar from '../../../../components/UploadFile/UploadAvatar';
import AVATAR from '../../../../assets/images/avatar.png';
import { useTranslation } from 'react-i18next';
import { PHONE_NUMBER } from '../../../../constants/auth.constant';

const EditUserInfo = () => {
  const { t } = useTranslation();
  const { actions: userActions } = useUserSlice();

  const [editName, setEditName] = useState(false);
  const [editPhone, setEditPhone] = useState(false);
  const [editCountry, setEditCountry] = useState(false);
  const [editAvatar, setEditAvatar] = useState(false);
  const { user, loading } = useSelector(state => state.user);
  const [avatar, setAvatar] = useState('');

  const dispatch = useDispatch();
  const [updateLoading, setUpdateLoading] = useState(false);

  const options = COUNTRY.map(item => ({
    label: item.country,
    value: item.country,
  }));

  const handleFinishName = async values => {
    setUpdateLoading(true);
    const { firstName, lastName } = values;

    await updateUserCurrentService({
      first_name: firstName,
      last_name: lastName,
    });

    setEditName(false);
    dispatch(userActions.getUserProfile());
    setUpdateLoading(false);
  };
  const handleFinishPhone = async values => {
    setUpdateLoading(true);

    const { phoneNumber } = values;
    await updateUserCurrentService({
      phone_number: phoneNumber,
    });
    setEditPhone(false);
    dispatch(userActions.getUserProfile());
    setUpdateLoading(false);
  };

  const handleFinishCountry = async values => {
    setUpdateLoading(true);

    const { country } = values;
    await updateUserCurrentService({
      country: country,
    });
    setEditCountry(false);
    dispatch(userActions.getUserProfile());
    setUpdateLoading(false);
  };

  const handleFinishAvatar = async () => {
    await updateUserCurrentService({
      avatar_url: avatar,
    });
    setEditAvatar(false);
    dispatch(userActions.getUserProfile());
  };
  return (
    <Layout>
      <div className="editUserInfo-container">
        {loading ? (
          <SpinLoading size="large" />
        ) : (
          <Row align="center">
            <Col style={{ margin: '60px 0' }} xs={24} sm={16} lg={16}>
              <SubHeading strong>{t('label.personal')}</SubHeading>
            </Col>
            <Col xs={24} sm={16} lg={16}>
              <div className="infoItem">
                <Form onFinish={handleFinishAvatar}>
                  <Form.Item>
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Avatar src={avatar ? avatar : user?.avatar_url ? user?.avatar_url : AVATAR} size={80} />
                        <Button
                          type="text"
                          onClick={() => {
                            setEditAvatar(!editAvatar);
                          }}>
                          <Caption size={140} strong>
                            {!editAvatar ? t('button.edit') : t('button.cancel')}
                          </Caption>
                        </Button>
                      </div>

                      {editAvatar && (
                        <div style={{ display: 'flex', gap: '8px', marginTop: '10px' }}>
                          <Button type="primary" htmlType="submit">
                            {t('button.upload')}
                          </Button>
                          <UploadAvatar
                            acceptTypes="image/*"
                            multiple={false}
                            onChange={value => {
                              setAvatar(value);
                            }}
                          />
                        </div>
                      )}
                    </div>
                  </Form.Item>
                </Form>
              </div>
              <Divider />
              <div className="infoItem">
                <div className="top">
                  <Caption size={140}>{t('label.name')}</Caption>
                  <Button
                    type="text"
                    onClick={() => {
                      setEditName(!editName);
                    }}>
                    <Caption size={140} strong>
                      {!editName ? t('button.edit') : t('button.cancel')}
                    </Caption>
                  </Button>
                </div>
                <div className="bottom">
                  {!editName ? (
                    <Paragraph strong>
                      {user?.first_name ? user?.first_name : `-`} {user?.last_name ? user?.last_name : `-`}
                    </Paragraph>
                  ) : (
                    <div>
                      <Form onFinish={handleFinishName}>
                        <Row gutter={8}>
                          <Col xs={24} sm={12}>
                            <Form.Item
                              name="firstName"
                              initialValue={user?.first_name}
                              rules={[{ required: true, message: t('validationRules.required.firstName') }]}>
                              <Input placeholder={t('placeholder.firstName')} size="large" disabled={updateLoading} />
                            </Form.Item>
                          </Col>
                          <Col xs={24} sm={12}>
                            <Form.Item
                              name="lastName"
                              initialValue={user?.last_name}
                              rules={[{ required: true, message: t('validationRules.required.lastName') }]}>
                              <Input placeholder={t('placeholder.lastName')} size="large" disabled={updateLoading} />
                            </Form.Item>
                          </Col>
                        </Row>
                        <Form.Item>
                          <Button
                            type="primary"
                            size="large"
                            htmlType="submit"
                            loading={updateLoading}
                            disabled={updateLoading}>
                            {t('button.save')}
                          </Button>
                        </Form.Item>
                      </Form>
                    </div>
                  )}
                </div>
              </div>
              <Divider />
              <div className="infoItem">
                <div className="top">
                  <Caption size={140}>{t('label.phoneNumber')}</Caption>
                  <Button
                    type="text"
                    onClick={() => {
                      setEditPhone(!editPhone);
                    }}>
                    <Caption size={140} strong>
                      {!editPhone ? t('button.edit') : t('button.cancel')}
                    </Caption>
                  </Button>
                </div>
                <div className="bottom">
                  {!editPhone ? (
                    <Paragraph strong>{user?.phone_number ? user?.phone_number : '-'}</Paragraph>
                  ) : (
                    <Form onFinish={handleFinishPhone}>
                      <Form.Item
                        name="phoneNumber"
                        initialValue={user?.phone_number}
                        rules={[
                          { required: true, message: t('validationRules.required.phoneNumber') },
                          {
                            pattern: PHONE_NUMBER.VALID_LENGTH,
                            message: t('USER-DASHBOARD.mobile-phone-error-valid-length'),
                          },
                        ]}>
                        <Input
                          type="tel"
                          placeholder={t('placeholder.phoneNumber')}
                          size="large"
                          disabled={updateLoading}
                        />
                      </Form.Item>
                      <Form.Item>
                        <Button
                          type="primary"
                          size="large"
                          htmlType="submit"
                          loading={updateLoading}
                          disabled={updateLoading}>
                          {t('button.save')}
                        </Button>
                      </Form.Item>
                    </Form>
                  )}
                </div>
              </div>
              <Divider />
              <div className="infoItem">
                <div className="top">
                  <Caption size={140}>{t('label.country')}</Caption>
                  <Button
                    type="text"
                    onClick={() => {
                      setEditCountry(!editCountry);
                    }}>
                    <Caption size={140} strong>
                      {!editCountry ? t('button.edit') : t('button.cancel')}
                    </Caption>
                  </Button>
                </div>
                <div className="bottom">
                  {!editCountry ? (
                    <Paragraph strong>{user?.country ? user?.country : '-'}</Paragraph>
                  ) : (
                    <Form onFinish={handleFinishCountry}>
                      <Form.Item
                        name="country"
                        initialValue={user?.country}
                        rules={[{ required: true, message: t('validationRules.required.country') }]}>
                        <Select
                          placeholder={t('placeholder.country')}
                          size="large"
                          options={options}
                          disabled={updateLoading}
                        />
                      </Form.Item>
                      <Form.Item>
                        <Button
                          type="primary"
                          size="large"
                          htmlType="submit"
                          disabled={updateLoading}
                          loading={updateLoading}>
                          {t('button.save')}
                        </Button>
                      </Form.Item>
                    </Form>
                  )}
                </div>
              </div>
            </Col>
          </Row>
        )}
      </div>
    </Layout>
  );
};

export default EditUserInfo;
