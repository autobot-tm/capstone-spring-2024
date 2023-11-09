import React from 'react';
import './styles.scss';
import { Button } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestion } from '@fortawesome/free-solid-svg-icons';

const OverviewSection = () => {
  return (
    <div id="overviewsection">
      <div className="title">
        <h2>Lorem, ipsum dolor.</h2>
        <hr />
      </div>
      <table>
        <tr>
          <th className="col-header">Lorem, ipsum.</th>
          <th className="col2-header">Lorem ipsum dolor sit.</th>
        </tr>
        <tr>
          <td className="col">Lorem</td>
          <td className="col2">Lorem, ipsum.</td>
        </tr>
        <hr />
        <tr>
          <td className="col">Lorem</td>
          <td className="col2">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sit quidem iste, id blanditiis
            nostrum assumenda praesentium voluptate ex eveniet accusantium quia error. Quasi ducimus
            vitae at nostrum rem voluptatibus possimus praesentium inventore! Doloremque, enim
            aliquid odit nobis, nesciunt tempora similique optio voluptatem modi quis obcaecati
            suscipit sequi ullam nam dolorem harum nihil magni at natus atque iusto? Asperiores ex,
            molestiae eius fuga officia libero voluptatem perferendis impedit deleniti error autem
            alias odio, maxime atque dolores aliquid sit harum, perspiciatis nesciunt? Incidunt
            nihil voluptatem quia consectetur a, autem quibusdam eos numquam neque sit natus? Soluta
            nulla at necessitatibus mollitia accusantium eum.
          </td>
        </tr>
        <hr />
        <tr>
          <td className="col">Lorem, ipsum.</td>
          <td className="col2">
            <span className="intro">Lorem ipsum dolor sit amet, consectetur adipisicing.</span>
            <span className="item">Lorem, ipsum.</span>
            <span>Lorem ipsum dolor sit amet.</span>
            <span>Lorem, ipsum.</span>
            <span>Lorem, ipsum.</span>
            <span>Lorem ipsum dolor sit.</span>
            <span>Lorem ipsum dolor sit amet consectetur.</span>
            <span className="item">Lorem ipsum dolor sit amet.</span>
            <span className="item">Lorem, ipsum dolor.</span>
            <span>Lorem ipsum dolor sit.</span>
            <span>Lorem ipsum dolor sit.</span>
            <span className="item">Lorem, ipsum.</span>
            <span className="item">Lorem ipsum dolor sit amet consectetur.</span>
            <span>Lorem ipsum, dolor sit amet consectetur adipisicing.</span>
          </td>
        </tr>
        <hr />
        <tr>
          <td className="col">Lorem</td>
          <td className="col2">Lorem, ipsum.</td>
        </tr>
        <hr />
        <tr>
          <td className="col">Lorem, ipsum dolor.</td>
          <td className="col2">Lorem ipsum dolor sit amet consectetur adipisicing.</td>
        </tr>
        <hr />
        <tr>
          <td className="col">Lorem, ipsum.</td>
          <td className="col2">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti perspiciatis quo
            quibusdam praesentium.
          </td>
        </tr>
        <hr />
        <tr>
          <td className="col">Lorem, ipsum.</td>
          <td className="col2">
            <span>Lorem, ipsum.</span>
            <span className="link">Lorem ipsum dolor, sit amet consectetur adipisicing elit.</span>
            <span>Lorem, ipsum.</span>
            <span className="link">Lorem ipsum dolor, sit amet consectetur adipisicing elit.</span>
            <span>Lorem, ipsum.</span>
            <span className="link">Lorem ipsum dolor, sit amet consectetur adipisicing elit.</span>
          </td>
        </tr>
        <hr />
        <tr>
          <td className="col">Lorem, ipsum.</td>
          <td className="col2">
            <span className="link">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</span>
          </td>
        </tr>
        <hr />
        <tr>
          <td className="col">Lorem, ipsum.</td>
          <td className="col2">
            <span>Lorem ipsum dolor sit amet consectetur.</span>
            <span>Lorem ipsum dolor sit amet.</span>
            <span>Lorem ipsum dolor sit amet consectetur adipisicing elit.</span>
          </td>
        </tr>
        <hr />
      </table>

      <span className="wrapper-btn">
        <Button className="btn-advise">
          <span>
            <FontAwesomeIcon icon={faQuestion} /> 相談する
          </span>
        </Button>
      </span>
    </div>
  );
};

export default OverviewSection;
