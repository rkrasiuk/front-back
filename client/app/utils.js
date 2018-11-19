import React from 'react';
import ReactDOMServer from 'react-dom/server';
import jsPDF from 'jspdf';
import moment from 'moment';

import data from './data';

const constructInitialForm = (tableName) => {
  const form = {};
  data.formInfo[tableName].fields.forEach(({name, isNum}) => {
    form[name] = isNum ? undefined : '';
  });
  return form;
};

const invalidFields = form => Object.keys(form).find(field => form[field] === '');

const generatePDF = ({goods, competitors, competitorgoods, parsedgoods}) => {
  const doc = new jsPDF('l', 'px', 'a4');
  const source = (
    <table>
      <thead>
        <tr>
          <th>Good</th>
          <th>ID</th>
          <th>Our Price</th>
          <th>Competitor ID</th>
          <th>Competitor Price</th>
          <th>Time</th>
        </tr>
      </thead>
      <tbody className="tbody">
        {
          goods.map((good) => {
            const goodData = {...good, parsedCompetitorGoods: parsedgoods.filter(({goodId}) => goodId === good._id)};
            goodData.parsedCompetitorGoods.sort((lhs, rhs) => {
              const lhsTime = moment(lhs.time);
              const rhsTime = moment(rhs.time);
              if (lhsTime.isBefore(rhsTime)) return -1;
              if (lhsTime.isAfter(rhsTime)) return 1;
              return 0;
            });
            return goodData.parsedCompetitorGoods.map(({time, competitorId, price}) => (
              <tr>
                <td>{goodData.name}</td>
                <td>{goodData._id}</td>
                <td>{goodData.price} UAH</td>
                <td>{competitorId}</td>
                <td>{price}</td>
                <td>{moment(time).format('MMMM Do YYYY')}</td>
              </tr>
            ));
          })
        }
      </tbody>
    </table>
  );

  doc.setFont("helvetica");
  doc.setFontType("bold");
  doc.setFontSize(9);
  doc.fromHTML(
    ReactDOMServer.renderToString(source),
    10, // x coord
    10, // y coord
    {width: 522},
    10,
  );
  doc.save('report.pdf');
};

export {generatePDF, invalidFields, constructInitialForm};