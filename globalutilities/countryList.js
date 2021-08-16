 const countriesList = [
    {
        acronym: 'my',
        name: 'Malaysia',
        code: 60,
        default: true
    },
    {
        acronym: 'af',
        name: 'Afghanistan (افغانستان‎)',
        code: 93
    },
    {
        acronym: 'ax',
        name: 'Åland Islands',
        code: 358
    },
    {
        acronym: 'al',
        name: 'Albania (Shqipëri)',
        code: 355
    },
    {
        acronym: 'dz',
        name: 'Algeria (الجزائر‎)',
        code: 213
    },
    {
        acronym: 'as',
        name: 'American Samoa',
        code: 1684
    },
    {
        acronym: 'ad',
        name: 'Andorra',
        code: 376
    },
    {
        acronym: 'ao',
        name: 'Angola',
        code: 244
    },
    {
        acronym: 'ai',
        name: 'Anguilla',
        code: 1264
    },
    {
        acronym: 'ag',
        name: 'Antigua and Barbuda',
        code: 1268
    },
    {
        acronym: 'ar',
        name: 'Argentina',
        code: 54
    },
    {
        acronym: 'am',
        name: 'Armenia (Հայաստան)',
        code: 374
    },
    {
        acronym: 'aw',
        name: 'Aruba',
        code: 297
    },
    {
        acronym: 'au',
        name: 'Australia',
        code: 61
    },
    {
        acronym: 'at',
        name: 'Austria (Österreich)',
        code: 43
    },
    {
        acronym: 'az',
        name: 'Azerbaijan (Azərbaycan)',
        code: 994
    },
    {
        acronym: 'bs',
        name: 'Bahamas',
        code: 1242
    },
    {
        acronym: 'bh',
        name: 'Bahrain (‫البحرين‬‎)',
        code: 973
    },
    {
        acronym: 'bd',
        name: 'Bangladesh (বাংলাদেশ)',
        code: 880
    },
    {
        acronym: 'bb',
        name: 'Barbados',
        code: 1246
    },
    {
        acronym: 'by',
        name: 'Belarus (Беларусь)',
        code: 375
    },
    {
        acronym: 'be',
        name: 'Belgium (België)',
        code: 32
    },
    {
        acronym: 'bz',
        name: 'Belize',
        code: 501
    },
    {
        acronym: 'bj',
        name: 'Benin (Bénin)',
        code: 229
    },
    {
        acronym: 'bm',
        name: 'Bermuda',
        code: 1441
    },
    {
        acronym: 'bt',
        name: 'Bhutan (འབྲུག)',
        code: 975
    },
    {
        acronym: 'bo',
        name: 'Bolivia',
        code: 591
    },
    {
        acronym: 'ba',
        name: 'Bosnia and Herzegovina (Босна и Херцеговина)',
        code: 387
    },
    {
        acronym: 'bw',
        name: 'Botswana',
        code: 267
    },
    {
        acronym: 'br',
        name: 'Brazil (Brasil)',
        code: 55
    },
    {
        acronym: 'io',
        name: 'British Indian Ocean Territory',
        code: 246
    },
    {
        acronym: 'vg',
        name: 'British Virgin Islands',
        code: 1284
    },
    {
        acronym: 'bn',
        name: 'Brunei',
        code: 673
    },
    {
        acronym: 'bg',
        name: 'Bulgaria (България)',
        code: 359
    },
    {
        acronym: 'bf',
        name: 'Burkina Faso',
        code: 226
    },
    {
        acronym: 'bi',
        name: 'Burundi (Uburundi)',
        code: 257
    },
    {
        acronym: 'kh',
        name: 'Cambodia (កម្ពុជា)',
        code: 855
    },
    {
        acronym: 'cm',
        name: 'Cameroon (Cameroun)',
        code: 237
    },
    {
        acronym: 'ca',
        name: 'Canada',
        code: 1
    },
    {
        acronym: 'cv',
        name: 'Cape Verde (Kabu Verdi)',
        code: 238
    },
    {
        acronym: 'bq',
        name: 'Caribbean Netherlands',
        code: 599
    },
    {
        acronym: 'ky',
        name: 'Cayman Islands',
        code: 1345
    },
    {
        acronym: 'cf',
        name: 'Central African Republic (République centrafricaine)',
        code: 236
    },
    {
        acronym: 'td',
        name: 'Chad (Tchad)',
        code: 235
    },
    {
        acronym: 'cl',
        name: 'Chile',
        code: 56
    },
    {
        acronym: 'cn',
        name: 'China (中国)',
        code: 86
    },
    {
        acronym: 'cx',
        name: 'Christmas Island',
        code: 61
    },
    {
        acronym: 'cc',
        name: 'Cocos (Keeling) Islands',
        code: 61
    },
    {
        acronym: 'co',
        name: 'Colombia',
        code: 57
    },
    {
        acronym: 'km',
        name: 'Comoros (‫جزر القمر‬‎)',
        code: 269
    },
    {
        acronym: 'cd',
        name: 'Congo (DRC) (Jamhuri ya Kidemokrasia ya Kongo)',
        code: 243
    },
    {
        acronym: 'cg',
        name: 'Congo (Republic) (Congo-Brazzaville)',
        code: 242
    },
    {
        acronym: 'ck',
        name: 'Cook Islands',
        code: 682
    },
    {
        acronym: 'cr',
        name: 'Costa Rica',
        code: 506
    },
    {
        acronym: 'ci',
        name: 'Côte d’Ivoire',
        code: 225
    },
    {
        acronym: 'hr',
        name: 'Croatia (Hrvatska)',
        code: 385
    },
    {
        acronym: 'cu',
        name: 'Cuba',
        code: 53
    },
    {
        acronym: 'cw',
        name: 'Curaçao',
        code: 599
    },
    {
        acronym: 'cy',
        name: 'Cyprus (Κύπρος)',
        code: 357
    },
    {
        acronym: 'cz',
        name: 'Czech Republic (Česká republika)',
        code: 420
    },
    {
        acronym: 'dk',
        name: 'Denmark (Danmark)',
        code: 45
    },
    {
        acronym: 'dj',
        name: 'Djibouti',
        code: 253
    },
    {
        acronym: 'dm',
        name: 'Dominica',
        code: 1767
    },
    {
        acronym: 'do',
        name: 'Dominican Republic (República Dominicana)',
        code: 1
    },
    {
        acronym: 'ec',
        name: 'Ecuador',
        code: 593
    },
    {
        acronym: 'eg',
        name: 'Egypt (‫مصر‬‎)',
        code: 20
    },
    {
        acronym: 'sv',
        name: 'El Salvador',
        code: 503
    },
    {
        acronym: 'gq',
        name: 'Equatorial Guinea (Guinea Ecuatorial)',
        code: 240
    },
    {
        acronym: 'er',
        name: 'Eritrea',
        code: 291
    },
    {
        acronym: 'ee',
        name: 'Estonia (Eesti)',
        code: 372
    },
    {
        acronym: 'et',
        name: 'Ethiopia',
        code: 251
    },
    {
        acronym: 'fk',
        name: 'Falkland Islands (Islas Malvinas)',
        code: 500
    },
    {
        acronym: 'fo',
        name: 'Faroe Islands (Føroyar)',
        code: 298
    },
    {
        acronym: 'fj',
        name: 'Fiji',
        code: 679
    },
    {
        acronym: 'fi',
        name: 'Finland (Suomi)',
        code: 358
    },
    {
        acronym: 'fr',
        name: 'France',
        code: 33
    },
    {
        acronym: 'gf',
        name: 'French Guiana (Guyane française)',
        code: 594
    },
    {
        acronym: 'pf',
        name: 'French Polynesia (Polynésie française)',
        code: 689
    },
    {
        acronym: 'ga',
        name: 'Gabon',
        code: 241
    },
    {
        acronym: 'gm',
        name: 'Gambia',
        code: 220
    },
    {
        acronym: 'ge',
        name: 'Georgia (საქართველო)',
        code: 995
    },
    {
        acronym: 'de',
        name: 'Germany (Deutschland)',
        code: 49
    },
    {
        acronym: 'gh',
        name: 'Ghana (Gaana)',
        code: 233
    },
    {
        acronym: 'gi',
        name: 'Gibraltar',
        code: 350
    },
    {
        acronym: 'gr',
        name: 'Greece (Ελλάδα)',
        code: 30
    },
    {
        acronym: 'gl',
        name: 'Greenland (Kalaallit Nunaat)',
        code: 299
    },
    {
        acronym: 'gd',
        name: 'Grenada',
        code: 1473
    },
    {
        acronym: 'gp',
        name: 'Guadeloupe',
        code: 590
    },
    {
        acronym: 'gu',
        name: 'Guam',
        code: 1671
    },
    {
        acronym: 'gt',
        name: 'Guatemala',
        code: 502
    },
    {
        acronym: 'gg',
        name: 'Guernsey',
        code: 44
    },
    {
        acronym: 'gn',
        name: 'Guinea (Guinée)',
        code: 224
    },
    {
        acronym: 'gw',
        name: 'Guinea-Bissau (Guiné Bissau)',
        code: 245
    },
    {
        acronym: 'gy',
        name: 'Guyana',
        code: 592
    },
    {
        acronym: 'ht',
        name: 'Haiti',
        code: 509
    },
    {
        acronym: 'hn',
        name: 'Honduras',
        code: 504
    },
    {
        acronym: 'hk',
        name: 'Hong Kong (香港)',
        code: 852
    },
    {
        acronym: 'hu',
        name: 'Hungary (Magyarország)',
        code: 36
    },
    {
        acronym: 'is',
        name: 'Iceland (Ísland)',
        code: 354
    },
    {
        acronym: 'in',
        name: 'India (भारत)',
        code: 91
    },
    {
        acronym: 'id',
        name: 'Indonesia',
        code: 62
    },
    {
        acronym: 'ir',
        name: 'Iran (‫ایران‬‎)',
        code: 98
    },
    {
        acronym: 'iq',
        name: 'Iraq (‫العراق‬‎)',
        code: 964
    },
    {
        acronym: 'ie',
        name: 'Ireland',
        code: 353
    },
    {
        acronym: 'im',
        name: 'Isle of Man',
        code: 44
    },
    {
        acronym: 'il',
        name: 'Israel (‫ישראל‬‎)',
        code: 972
    },
    {
        acronym: 'it',
        name: 'Italy (Italia)',
        code: 39
    },
    {
        acronym: 'jm',
        name: 'Jamaica',
        code: 1
    },
    {
        acronym: 'jp',
        name: 'Japan (日本)',
        code: 81
    },
    {
        acronym: 'je',
        name: 'Jersey',
        code: 44
    },
    {
        acronym: 'jo',
        name: 'Jordan (‫الأردن‬‎)',
        code: 962
    },
    {
        acronym: 'kz',
        name: 'Kazakhstan (Казахстан)',
        code: 7
    },
    {
        acronym: 'ke',
        name: 'Kenya',
        code: 254
    },
    {
        acronym: 'ki',
        name: 'Kiribati',
        code: 686
    },
    {
        acronym: 'xk',
        name: 'Kosovo',
        code: 383
    },
    {
        acronym: 'kw',
        name: 'Kuwait (‫الكويت‬‎)',
        code: 965
    },
    {
        acronym: 'kg',
        name: 'Kyrgyzstan (Кыргызстан)',
        code: 996
    },
    {
        acronym: 'la',
        name: 'Laos (ລາວ)',
        code: 856
    },
    {
        acronym: 'lv',
        name: 'Latvia (Latvija)',
        code: 371
    },
    {
        acronym: 'lb',
        name: 'Lebanon (‫لبنان‬‎)',
        code: 961
    },
    {
        acronym: 'ls',
        name: 'Lesotho',
        code: 266
    },
    {
        acronym: 'lr',
        name: 'Liberia',
        code: 231
    },
    {
        acronym: 'ly',
        name: 'Libya (‫ليبيا‬‎)',
        code: 218
    },
    {
        acronym: 'li',
        name: 'Liechtenstein',
        code: 423
    },
    {
        acronym: 'lt',
        name: 'Lithuania (Lietuva)',
        code: 370
    },
    {
        acronym: 'lu',
        name: 'Luxembourg',
        code: 352
    },
    {
        acronym: 'mo',
        name: 'Macau (澳門)',
        code: 853
    },
    {
        acronym: 'mk',
        name: 'Macedonia (FYROM) (Македонија)',
        code: 389
    },
    {
        acronym: 'mg',
        name: 'Madagascar (Madagasikara)',
        code: 261
    },
    {
        acronym: 'mw',
        name: 'Malawi',
        code: 265
    },
    {
        acronym: 'my',
        name: 'Malaysia',
        code: 60
    },
    {
        acronym: 'mv',
        name: 'Maldives',
        code: 960
    },
    {
        acronym: 'ml',
        name: 'Mali',
        code: 223
    },
    {
        acronym: 'mt',
        name: 'Malta',
        code: 356
    },
    {
        acronym: 'mh',
        name: 'Marshall Islands',
        code: 692
    },
    {
        acronym: 'mq',
        name: 'Martinique',
        code: 596
    },
    {
        acronym: 'mr',
        name: 'Mauritania (‫موريتانيا‬‎)',
        code: 222
    },
    {
        acronym: 'mu',
        name: 'Mauritius (Moris)',
        code: 230
    },
    {
        acronym: 'yt',
        name: 'Mayotte',
        code: 262
    },
    {
        acronym: 'mx',
        name: 'Mexico (México)',
        code: 52
    },
    {
        acronym: 'fm',
        name: 'Micronesia',
        code: 691
    },
    {
        acronym: 'md',
        name: 'Moldova (Republica Moldova)',
        code: 373
    },
    {
        acronym: 'mc',
        name: 'Monaco',
        code: 377
    },
    {
        acronym: 'mn',
        name: 'Mongolia (Монгол)',
        code: 976
    },
    {
        acronym: 'me',
        name: 'Montenegro (Crna Gora)',
        code: 382
    },
    {
        acronym: 'ms',
        name: 'Montserrat',
        code: 1664
    },
    {
        acronym: 'ma',
        name: 'Morocco (‫المغرب‬‎)',
        code: 212
    },
    {
        acronym: 'mz',
        name: 'Mozambique (Moçambique)',
        code: 258
    },
    {
        acronym: 'mm',
        name: 'Myanmar (Burma) (မြန်မာ)',
        code: 95
    },
    {
        acronym: 'na',
        name: 'Namibia (Namibië)',
        code: 264
    },
    {
        acronym: 'nr',
        name: 'Nauru',
        code: 674
    },
    {
        acronym: 'np',
        name: 'Nepal (नेपाल)',
        code: 977
    },
    {
        acronym: 'nl',
        name: 'Netherlands (Nederland)',
        code: 31
    },
    {
        acronym: 'nc',
        name: 'New Caledonia (Nouvelle-Calédonie)',
        code: 687
    },
    {
        acronym: 'nz',
        name: 'New Zealand',
        code: 64
    },
    {
        acronym: 'ni',
        name: 'Nicaragua',
        code: 505
    },
    {
        acronym: 'ne',
        name: 'Niger (Nijar)',
        code: 227
    },
    {
        acronym: 'ng',
        name: 'Nigeria',
        code: 234
    },
    {
        acronym: 'nu',
        name: 'Niue',
        code: 683
    },
    {
        acronym: 'nf',
        name: 'Norfolk Island',
        code: 672
    },
    {
        acronym: 'kp',
        name: 'North Korea (조선 민주주의 인민 공화국)',
        code: 850
    },
    {
        acronym: 'mp',
        name: 'Northern Mariana Islands',
        code: 1670
    },
    {
        acronym: 'no',
        name: 'Norway (Norge)',
        code: 47
    },

    {
        acronym: 'om',
        name: 'Oman (‫عُمان‬‎)',
        code: 968
    },
    {
        acronym: 'pk',
        name: 'Pakistan (‫پاکستان‬‎)',
        code: 92
    },
    {
        acronym: 'pw',
        name: 'Palau',
        code: 680
    },
    {
        acronym: 'ps',
        name: 'Palestine (‫فلسطين‬‎)',
        code: 970
    },
    {
        acronym: 'pa',
        name: 'Panama (Panamá)',
        code: 507
    },
    {
        acronym: 'pg',
        name: 'Papua New Guinea',
        code: 675
    },
    {
        acronym: 'py',
        name: 'Paraguay',
        code: 595
    },
    {
        acronym: 'pe',
        name: 'Peru (Perú)',
        code: 51
    },
    {
        acronym: 'ph',
        name: 'Philippines',
        code: 63
    },
    {
        acronym: 'pl',
        name: 'Poland (Polska)',
        code: 48
    },
    {
        acronym: 'pt',
        name: 'Portugal',
        code: 351
    },
    {
        acronym: 'pr',
        name: 'Puerto Rico',
        code: 1
    },
    {
        acronym: 'qa',
        name: 'Qatar (‫قطر‬‎)',
        code: 974
    },
    {
        acronym: 're',
        name: 'Réunion (La Réunion)',
        code: 262
    },
    {
        acronym: 'ro',
        name: 'Romania (România)',
        code: 40
    },
    {
        acronym: 'ru',
        name: 'Russia (Россия)',
        code: 7
    },
    {
        acronym: 'rw',
        name: 'Rwanda',
        code: 250
    },
    {
        acronym: 'bl',
        name: 'Saint Barthélemy',
        code: 590
    },
    {
        acronym: 'sh',
        name: 'Saint Helena',
        code: 290
    },
    {
        acronym: 'kn',
        name: 'Saint Kitts and Nevis',
        code: 1869
    },
    {
        acronym: 'lc',
        name: 'Saint Lucia',
        code: 1758
    },
    {
        acronym: 'mf',
        name: 'Saint Martin (Saint-Martin (partie française))',
        code: 590
    },
    {
        acronym: 'pm',
        name: 'Saint Pierre and Miquelon (Saint-Pierre-et-Miquelon)',
        code: 508
    },
    {
        acronym: 'vc',
        name: 'Saint Vincent and the Grenadines',
        code: 1784
    },
    {
        acronym: 'ws',
        name: 'Samoa',
        code: 685
    },
    {
        acronym: 'sm',
        name: 'San Marino',
        code: 378
    },
    {
        acronym: 'st',
        name: 'São Tomé and Príncipe (São Tomé e Príncipe)',
        code: 239
    },
    {
        acronym: 'sa',
        name: 'Saudi Arabia (‫المملكة العربية السعودية‬‎)',
        code: 966
    },
    {
        acronym: 'sn',
        name: 'Senegal (Sénégal)',
        code: 221
    },
    {
        acronym: 'rs',
        name: 'Serbia (Србија)',
        code: 381
    },
    {
        acronym: 'sc',
        name: 'Seychelles',
        code: 248
    },
    {
        acronym: 'sl',
        name: 'Sierra Leone',
        code: 232
    },
    {
        acronym: 'sg',
        name: 'Singapore',
        code: 65
    },
    {
        acronym: 'sx',
        name: 'Sint Maarten',
        code: 1721
    },
    {
        acronym: 'sk',
        name: 'Slovakia (Slovensko)',
        code: 421
    },
    {
        acronym: 'si',
        name: 'Slovenia (Slovenija)',
        code: 386
    },
    {
        acronym: 'sb',
        name: 'Solomon Islands',
        code: 677
    },
    {
        acronym: 'so',
        name: 'Somalia (Soomaaliya)',
        code: 252
    },
    {
        acronym: 'za',
        name: 'South Africa',
        code: 27
    },
    {
        acronym: 'kr',
        name: 'South Korea (대한민국)',
        code: 82
    },
    {
        acronym: 'ss',
        name: 'South Sudan (‫جنوب السودان‬‎)',
        code: 211
    },
    {
        acronym: 'es',
        name: 'Spain (España)',
        code: 34
    },
    {
        acronym: 'lk',
        name: 'Sri Lanka (ශ්‍රී ලංකාව)',
        code: 94
    },
    {
        acronym: 'sd',
        name: 'Sudan (‫السودان‬‎)',
        code: 249
    },
    {
        acronym: 'sr',
        name: 'Suriname',
        code: 597
    },
    {
        acronym: 'sj',
        name: 'Svalbard and Jan Mayen',
        code: 47
    },
    {
        acronym: 'sz',
        name: 'Swaziland',
        code: 268
    },
    {
        acronym: 'se',
        name: 'Sweden (Sverige)',
        code: 46
    },
    {
        acronym: 'ch',
        name: 'Switzerland (Schweiz)',
        code: 41
    },
    {
        acronym: 'sy',
        name: 'Syria (‫سوريا‬‎)',
        code: 963
    },
    {
        acronym: 'tw',
        name: 'Taiwan (台灣)',
        code: 886
    },
    {
        acronym: 'tj',
        name: 'Tajikistan',
        code: 992
    },
    {
        acronym: 'tz',
        name: 'Tanzania',
        code: 255
    },
    {
        acronym: 'th',
        name: 'Thailand (ไทย)',
        code: 66
    },
    {
        acronym: 'tl',
        name: 'Timor-Leste',
        code: 670
    },
    {
        acronym: 'tg',
        name: 'Togo',
        code: 228
    },
    {
        acronym: 'tk',
        name: 'Tokelau',
        code: 690
    },
    {
        acronym: 'to',
        name: 'Tonga',
        code: 676
    },
    {
        acronym: 'tt',
        name: 'Trinidad and Tobago',
        code: 1868
    },
    {
        acronym: 'tn',
        name: 'Tunisia (‫تونس‬‎)',
        code: 216
    },
    {
        acronym: 'tr',
        name: 'Turkey (Türkiye)',
        code: 90
    },
    {
        acronym: 'tm',
        name: 'Turkmenistan',
        code: 993
    },
    {
        acronym: 'tc',
        name: 'Turks and Caicos Islands',
        code: 1649
    },
    {
        acronym: 'tv',
        name: 'Tuvalu',
        code: 688
    },
    {
        acronym: 'vi',
        name: 'U.S. Virgin Islands',
        code: 1340
    },
    {
        acronym: 'ug',
        name: 'Uganda',
        code: 256
    },
    {
        acronym: 'ua',
        name: 'Ukraine (Україна)',
        code: 380
    },
    {
        acronym: 'ae',
        name: 'United Arab Emirates (‫الإمارات العربية المتحدة‬‎)',
        code: 971
    },
    {
        acronym: 'gb',
        name: 'United Kingdom',
        code: 44
    },
    {
        acronym: 'us',
        name: 'United States',
        code: 1
    },
    {
        acronym: 'uy',
        name: 'Uruguay',
        code: 598
    },
    {
        acronym: 'uz',
        name: 'Uzbekistan (Oʻzbekiston)',
        code: 998
    },
    {
        acronym: 'vu',
        name: 'Vanuatu',
        code: 678
    },
    {
        acronym: 'va',
        name: 'Vatican City (Città del Vaticano)',
        code: 39
    },
    {
        acronym: 've',
        name: 'Venezuela',
        code: 58
    },
    {
        acronym: 'vn',
        name: 'Vietnam (Việt Nam)',
        code: 84
    },
    {
        acronym: 'wf',
        name: 'Wallis and Futuna (Wallis-et-Futuna)',
        code: 681
    },
    {
        acronym: 'eh',
        name: 'Western Sahara (‫الصحراء الغربية‬‎)',
        code: 212
    },
    {
        acronym: 'ye',
        name: 'Yemen (‫اليمن‬‎)',
        code: 967
    },
    {
        acronym: 'zm',
        name: 'Zambia',
        code: 260
    },
    {
        acronym: 'zw',
        name: 'Zimbabwe',
        code: 263
    },
];

export default countriesList;