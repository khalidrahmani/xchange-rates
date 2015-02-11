var mongoose        = require('mongoose')
   ,validate        = require('mongoose-validator')
   ,validator       = require('validator') 
   ,uniqueValidator = require('mongoose-unique-validator')
   ,Schema          = mongoose.Schema;

var CurrencySchema = new Schema({
  short_name:      {type: String, unique: true, required: "can't be blank"},
  long_name:       {type: String, required: "can't be blank"},
  valid:           {type: Boolean, default: true}
});

CurrencySchema.virtual('country_code').get(function () {
  return this.short_name.substring(0,2).toLowerCase();
});

CurrencySchema.statics = {  
getCurrencies: function (cb) {  
	cb({ 
USD: 'United States Dollar',
EUR: 'Euro',
GBP: 'British Pound',
AUD: 'Australian Dollar',
CAD: 'Canadian Dollar',
  SEK: 'Swedish Krona',
  CHF: 'Swiss Franc',
  TRY: 'Turkish Lira',
  BTC: 'Bitcoin',
  XAU: 'Gold (troy ounce)',
  XAG: 'Silver (troy ounce)',
AFN: 'Afghan Afghani',
  ALL: 'Albanian Lek',
  DZD: 'Algerian Dinar',
  AOA: 'Angolan Kwanza',
  ARS: 'Argentine Peso',
  AMD: 'Armenian Dram',
  AWG: 'Aruban Florin',
  
  AZN: 'Azerbaijani Manat',
  BSD: 'Bahamian Dollar',
  BHD: 'Bahraini Dinar',
  BDT: 'Bangladeshi Taka',
  BBD: 'Barbadian Dollar',
  BYR: 'Belarusian Ruble',
  BZD: 'Belize Dollar',
  BMD: 'Bermudan Dollar',
  BTN: 'Bhutanese Ngultrum',
  BOB: 'Bolivian Boliviano',
  BAM: 'Bosnia-Herzegovina',
  BWP: 'Botswanan Pula',
  BRL: 'Brazilian Real',
  BND: 'Brunei Dollar',
  BGN: 'Bulgarian Lev',
  BIF: 'Burundian Franc',
  KHR: 'Cambodian Riel',
  CVE: 'Cape Verdean Escudo',
  KYD: 'Cayman Islands Dollar',
  CLP: 'Chilean Peso',
  CLF: 'Chilean Unit (UF)',
  CNY: 'Chinese Yuan',
  COP: 'Colombian Peso',
  KMF: 'Comorian Franc',
  CDF: 'Congolese Franc',
  CRC: 'Costa Rican Colón',
  HRK: 'Croatian Kuna',
  CUP: 'Cuban Peso',
  CZK: 'Czech Rep Koruna',
  DKK: 'Danish Krone',
  DJF: 'Djiboutian Franc',
  DOP: 'Dominican Peso',
  XCD: 'East Caribbean Dollar',
  EGP: 'Egyptian Pound',
  ERN: 'Eritrean Nakfa',
  EEK: 'Estonian Kroon',
  ETB: 'Ethiopian Birr',

  FKP: 'Falkland Pound',
  FJD: 'Fijian Dollar',
  GMD: 'Gambian Dalasi',
  GEL: 'Georgian Lari',
  GHS: 'Ghanaian Cedi',
  GIP: 'Gibraltar Pound',

  GTQ: 'Guatemalan Quetzal',
  GGP: 'Guernsey Pound',
  GNF: 'Guinean Franc',
  GYD: 'Guyanaese Dollar',
  HTG: 'Haitian Gourde',
  HNL: 'Honduran Lempira',
  HKD: 'Hong Kong Dollar',
  HUF: 'Hungarian Forint',
  ISK: 'Icelandic Króna',
  INR: 'Indian Rupee',
  IDR: 'Indonesian Rupiah',
  IRR: 'Iranian Rial',
  IQD: 'Iraqi Dinar',
  JMD: 'Jamaican Dollar',
  JPY: 'Japanese Yen',
  JEP: 'Jersey Pound',
  JOD: 'Jordanian Dinar',
  KZT: 'Kazakhstani Tenge',
  KES: 'Kenyan Shilling',
  KWD: 'Kuwaiti Dinar',
  KGS: 'Kyrgystani Som',
  LAK: 'Laotian Kip',
  LVL: 'Latvian Lats',
  LBP: 'Lebanese Pound',
  LSL: 'Lesotho Loti',
  LRD: 'Liberian Dollar',
  LYD: 'Libyan Dinar',
  LTL: 'Lithuanian Litas',
  MOP: 'Macanese Pataca',
  MKD: 'Macedonian Denar',
  MGA: 'Malagasy Ariary',
  MWK: 'Malawian Kwacha',
  MYR: 'Malaysian Ringgit',
  MVR: 'Maldivian Rufiyaa',
  MTL: 'Maltese Lira',
  IMP: 'Manx pound',
  MRO: 'Mauritanian Ouguiya',
  MUR: 'Mauritian Rupee',
  MXN: 'Mexican Peso',
  MDL: 'Moldovan Leu',
  MNT: 'Mongolian Tugrik',
  MAD: 'Moroccan Dirham',
  MZN: 'Mozambican Metical',
  MMK: 'Myanma Kyat',
  NAD: 'Namibian Dollar',
  NPR: 'Nepalese Rupee',
  ANG: 'Netherlands Guilder',
  TWD: 'New Taiwan Dollar',
  NZD: 'New Zealand Dollar',
  NIO: 'Nicaraguan Córdoba',
  NGN: 'Nigerian Naira',
  KPW: 'North Korean Won',
  NOK: 'Norwegian Krone',
  OMR: 'Omani Rial',
  PKR: 'Pakistani Rupee',
  PAB: 'Panamanian Balboa',
  PGK: 'Papua Guinean Kina',
  PYG: 'Paraguayan Guarani',
  PEN: 'Peruvian Nuevo Sol',
  PHP: 'Philippine Peso',
  PLN: 'Polish Zloty',
  QAR: 'Qatari Rial',
  RON: 'Romanian Leu',
  RUB: 'Russian Ruble',
  RWF: 'Rwandan Franc',
  SHP: 'Saint Helena Pound',
  SVC: 'Salvadoran Colón',
  WST: 'Samoan Tala',
  SAR: 'Saudi Riyal',
  RSD: 'Serbian Dinar',
  SCR: 'Seychellois Rupee',
  SLL: 'Sierra Leonean Leone',
  SGD: 'Singapore Dollar',
  SBD: 'Solomon Islands Dollar',
  SOS: 'Somali Shilling',
  ZAR: 'South African Rand',
  KRW: 'South Korean Won',
  LKR: 'Sri Lankan Rupee',
  SDG: 'Sudanese Pound',
  SRD: 'Surinamese Dollar',
  SZL: 'Swazi Lilangeni',
  SYP: 'Syrian Pound',
  STD: 'São Tomé and Príncipe',
  TJS: 'Tajikistani Somoni',
  TZS: 'Tanzanian Shilling',
  THB: 'Thai Baht',
  TOP: 'Tongan Paʻanga',
  TTD: 'Trinidad Tobago Dollar',
  TND: 'Tunisian Dinar',
  TMT: 'Turkmenistani Manat',
  UGX: 'Ugandan Shilling',
  UAH: 'Ukrainian Hryvnia',
  AED: 'UAE Dirham',
  
  UYU: 'Uruguayan Peso',
  UZS: 'Uzbekistan Som',
  VUV: 'Vanuatu Vatu',
  VEF: 'Venezuelan Fuerte',
  VND: 'Vietnamese Dong',
  YER: 'Yemeni Rial',
  ZMW: 'Zambian Kwacha',
  ZWL: 'Zimbabwean Dollar'
 })
},
getLimitedCurrencies: function (cb) {  
  cb({ 
  USD: 'United States Dollar',
  EUR: 'Euro',
  GBP: 'British Pound',
  AUD: 'Australian Dollar',
  CAD: 'Canadian Dollar',
  SEK: 'Swedish Krona',
  CHF: 'Swiss Franc',
  TRY: 'Turkish Lira'
 })
}
}
//   XDR: 'Special Drawing Rights'
/*
  ZMK: 'Zambian Kwacha (pre-2013)',

  XOF: 'CFA Franc BCEAO',
  XAF: 'CFA Franc BEAC',
  XPF: 'CFP Franc',
*/
CurrencySchema.plugin(uniqueValidator, { message: '{PATH} already in use.' })
mongoose.model('Currency', CurrencySchema);
