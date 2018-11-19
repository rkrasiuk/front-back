export default {
  tableNames: [
    'Goods',
    'Competitors',
    'Competitor Goods',
    'Parsed Goods',
  ],
  tableHeaders: {
    goods: [
      'ID',
      'Vendor Code',
      'Name',
      'Brand',
      'Price',
      '',
    ],
    competitors: [
      'ID',
      'Name',
      'Parsing Rules (optional)',
      '',
    ],
    competitorgoods: [
      'ID',
      'Good ID',
      'Competitor ID',
      'URL',
      '',
    ],
    parsedgoods: [
      'ID',
      'Time',
      'Good ID',
      'Competitor ID',
      'Price',
      '',
    ],
  },
  formInfo: {
    goods: {
      fields: [
        {
          name: 'id',
          placeholder: 'Good ID',
        },
        {
          name: 'vendorCode',
          placeholder: 'Vendor Code',
          isNum: true,
        },
        {
          name: 'name',
          placeholder: 'Name',
        },
        {
          name: 'brand',
          placeholder: 'Brand',
        },
        {
          name: 'price',
          placeholder: 'Price',
          isNum: true,
        },
      ],
      addMethodName: 'goods.addGood',
      removeMethodName: 'goods.removeGood',
    },
    competitors: {
      fields: [
        {
          name: 'name',
          placeholder: 'Name',
        },
        {
          name: 'parsingRules',
          placeholder: 'Parsing Rules (Optional)',
        },
      ],
      addMethodName: 'competitors.addCompetitor',
      removeMethodName: 'competitors.removeCompetitor',
    },
    competitorgoods: {
      fields: [
        {
          name: 'goodId',
          placeholder: 'Good ID',
        },
        {
          name: 'competitorId',
          placeholder: 'Competitor ID',
        },
        {
          name: 'url',
          placeholder: 'URL',
        },
      ],
      addMethodName: 'competitorgoods.addCompetitorGood',
      removeMethodName: 'competitorgoods.removeCompetitorGood',
    },
    parsedgoods: {
      fields: [
        {
          name: 'time',
          placeholder: 'Time',
        },
        {
          name: 'goodId',
          placeholder: 'Good ID',
        },
        {
          name: 'competitorId',
          placeholder: 'Competitor ID',
        },
        {
          name: 'price',
          placeholder: 'Price',
          isNum: true,
        },
      ],
      addMethodName: 'parsedgoods.addParsedGood',
      removeMethodName: 'parsedgoods.removeParsedGood',
    },
  },
};
