import React from 'react';
import './styles.scss';
import { Button } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestion } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';

const OverviewSection = () => {
  const { t } = useTranslation();

  return (
    <div id="overviewsection">
      <div className="title">
        <h2>{t`about-management`}</h2>
        <hr />
      </div>
      <table>
        <tr>
          <th className="col-header">{t`about-companyName`}</th>
          <th className="col2-header">{t`about-companyName2`}</th>
        </tr>
        <tr>
          <td className="col">{t`about-representative`}</td>
          <td className="col2">{t`about-representative2`}</td>
        </tr>
        <hr />
        <tr>
          <td className="col">{t`about-address`}</td>
          <td className="col2">{t`about-address2`}</td>
        </tr>
        <hr />
        <tr>
          <td className="col">{t`about-business`}</td>
          <td className="col2">{t`about-business2`}</td>
        </tr>
        <hr />
        <tr>
          <td className="col">{t`about-capital`}</td>
          <td className="col2">957,500USD</td>
        </tr>
        <hr />
        <tr>
          <td className="col">{t`about-employees`}</td>
          <td className="col2">{t`about-employees2`}</td>
        </tr>
        <hr />
        <tr>
          <td className="col">{t`about-member`}</td>
          <td className="col2">{t`about-member2`}</td>
        </tr>
        <hr />
        <tr>
          <td className="col">{t`about-website`}</td>
          <td className="col2">{t`about-website2`}</td>
        </tr>
        <hr />
        <tr>
          <td className="col">E-mail</td>
          <td className="col2">
            <span className="link">info@propolifevietnam.com</span>
          </td>
        </tr>
        <hr />
        <tr>
          <td className="col">{t`about-hours`}</td>
          <td className="col2">{t`about-hours2`}</td>
        </tr>
        <hr />
      </table>

      <span className="wrapper-btn">
        <Button className="btn-advise">
          <span>
            <FontAwesomeIcon icon={faQuestion} /> {t`about-consult`}
          </span>
        </Button>
      </span>
    </div>
  );
};

export default OverviewSection;
