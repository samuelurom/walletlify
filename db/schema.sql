CREATE DATABASE walletlify;

\c walletlify;

DROP TABLE IF EXISTS currencies CASCADE;
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS categories CASCADE;
DROP TABLE IF EXISTS transactions CASCADE;

CREATE TABLE currencies (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  iso_code VARCHAR(25) NOT NULL,
  symbol VARCHAR(25) NOT NULL
);

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  full_name VARCHAR(255),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  profile_image_url VARCHAR(255),
  currency_id INTEGER REFERENCES currencies(id)
);

CREATE TABLE categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) UNIQUE NOT NULL,
  category_type VARCHAR(20) NOT NULL CHECK (category_type IN ('income', 'expense')),
  icon_url VARCHAR(255) DEFAULT '/images/default-category-icon.svg'
);

CREATE TABLE transactions (
  id SERIAL PRIMARY KEY,
  amount NUMERIC(10, 2) NOT NULL,
  transaction_type VARCHAR(20) NOT NULL CHECK (transaction_type IN ('income', 'expense')),
  description TEXT,
  date DATE NOT NULL,
  user_id INTEGER REFERENCES users(id) NOT NULL,
  category_id INTEGER REFERENCES categories(id) NOT NULL
);

-- Insert Items for Currencies

INSERT INTO currencies (name, iso_code, symbol)  VALUES
('Afghan Afghani', 'AFN', '؋'),
('Albanian Lek', 'ALL', 'L'),
('Algerian Dinar', 'DZD', 'دج'),
('Angolan Kwanza', 'AOA', 'Kz'),
('Argentine Peso', 'ARS', '$'),
('Armenian Dram', 'AMD', '֏'),
('Aruban Florin', 'AWG', 'ƒ'),
('Australian Dollar', 'AUD', '$'),
('Azerbaijani Manat', 'AZN', '₼'),
('Bahamian Dollar', 'BSD', '$'),
('Bahraini Dinar', 'BHD', '.د.ب'),
('Bangladeshi Taka', 'BDT', '৳'),
('Barbados Dollar', 'BBD', '$'),
('Belarusian Ruble', 'BYN', 'Br'),
('Belizian Dollar', 'BZD', '$'),
('Bermudian Dollar', 'BMD', '$'),
('Bhutanese Ngultrum', 'BTN', 'Nu.'),
('Bolivian Boliviano', 'BOB', 'Bs.'),
('Bosnia-Herzegovina Convertible Mark', 'BAM', 'KM'),
('Botswanan Pula', 'BWP', 'P'),
('Brazilian Real', 'BRL', 'R$'),
('British Pound Sterling', 'GBP', '£'),
('Brunei Dollar', 'BND', '$'),
('Bulgarian Lev', 'BGN', 'лв'),
('Burundian Franc', 'BIF', 'FBu'),
('Cambodian Riel', 'KHR', '៛'),
('Canadian Dollar', 'CAD', '$'),
('Cape Verdean Escudo', 'CVE', 'Esc'),
('Cayman Islands Dollar', 'KYD', '$'),
('Central African CFA Franc', 'XAF', 'FCFA'),
('Chilean Peso', 'CLP', '$'),
('Chinese Yuan', 'CNY', '¥'),
('Colombian Peso', 'COP', '$'),
('Comorian Franc', 'KMF', 'CF'),
('Congolese Franc', 'CDF', 'FC'),
('Costa Rican Colón', 'CRC', '₡'),
('Croatian Kuna', 'HRK', 'kn'),
('Cuban Peso', 'CUP', '₱'),
('Czech Republic Koruna', 'CZK', 'Kč'),
('Danish Krone', 'DKK', 'kr'),
('Djiboutian Franc', 'DJF', 'Fdj'),
('Dominican Peso', 'DOP', 'RD$'),
('East Caribbean Dollar', 'XCD', '$'),
('Egyptian Pound', 'EGP', 'ج.م'),
('Eritrean Nakfa', 'ERN', 'Nfk'),
('Estonian Kroon', 'EEK', 'kr'),
('Ethiopian Birr', 'ETB', 'Br'),
('Euro', 'EUR', '€'),
('Falkland Islands Pound', 'FKP', '£'),
('Fijian Dollar', 'FJD', 'FJ$'),
('Gambian Dalasi', 'GMD', 'D'),
('Georgian Lari', 'GEL', '₾'),
('Ghanaian Cedi', 'GHS', '₵'),
('Gibraltar Pound', 'GIP', '£'),
('Guatemalan Quetzal', 'GTQ', 'Q'),
('Guinean Franc', 'GNF', 'FG'),
('Guyanaese Dollar', 'GYD', 'G$'),
('Haitian Gourde', 'HTG', 'G'),
('Honduran Lempira', 'HNL', 'L'),
('Hong Kong Dollar', 'HKD', 'HK$'),
('Hungarian Forint', 'HUF', 'Ft'),
('Icelandic Króna', 'ISK', 'kr'),
('Indian Rupee', 'INR', '₹'),
('Indonesian Rupiah', 'IDR', 'Rp'),
('Iranian Rial', 'IRR', 'ريال'),
('Iraqi Dinar', 'IQD', 'ع.د'),
('Israeli New Sheqel', 'ILS', '₪'),
('Jamaican Dollar', 'JMD', 'J$'),
('Japanese Yen', 'JPY', '¥'),
('Jordanian Dinar', 'JOD', 'د.ا'),
('Kazakhstani Tenge', 'KZT', '₸'),
('Kenyan Shilling', 'KES', 'KSh'),
('Kuwaiti Dinar', 'KWD', 'د.ك'),
('Kyrgystani Som', 'KGS', 'с'),
('Laotian Kip', 'LAK', '₭'),
('Latvian Lats', 'LVL', 'Ls'),
('Lebanese Pound', 'LBP', 'ل.ل'),
('Lesotho Loti', 'LSL', 'L'),
('Liberian Dollar', 'LRD', '$'),
('Libyan Dinar', 'LYD', 'ل.د'),
('Swiss Franc', 'CHF', 'Fr.'),
('Lithuanian Litas', 'LTL', 'Lt'),
('Macanese Pataca', 'MOP', 'P'),
('Macedonian Denar', 'MKD', 'ден'),
('Malagasy Ariary', 'MGA', 'Ar'),
('Malawian Kwacha', 'MWK', 'MK'),
('Malaysian Ringgit', 'MYR', 'RM'),
('Maldivian Rufiyaa', 'MVR', 'ރ'),
('Mauritanian Ouguiya', 'MRU', 'UM'),
('Mauritian Rupee', 'MUR', '₨'),
('Mexican Peso', 'MXN', '$'),
('Moldovan Leu', 'MDL', 'L'),
('Mongolian Tugrik', 'MNT', '₮'),
('Moroccan Dirham', 'MAD', 'د.م.'),
('Mozambican Metical', 'MZN', 'MT'),
('Namibian Dollar', 'NAD', '$'),
('Nepalese Rupee', 'NPR', 'रू'),
('Netherlands Antillean Guilder', 'ANG', 'ƒ'),
('New Taiwan Dollar', 'TWD', 'NT$'),
('New Zealand Dollar', 'NZD', '$'),
('Nicaraguan Córdoba', 'NIO', 'C$'),
('Nigerian Naira', 'NGN', '₦'),
('North Korean Won', 'KPW', '₩'),
('Norwegian Krone', 'NOK', 'kr'),
('Omani Rial', 'OMR', 'ر.ع.'),
('Pakistani Rupee', 'PKR', 'Rs'),
('Panamanian Balboa', 'PAB', 'B/'),
('Papua New Guinean Kina', 'PGK', 'K'),
('Paraguayan Guarani', 'PYG', '₲'),
('Peruvian Nuevo Sol', 'PEN', 'S/.'),
('Philippine Peso', 'PHP', '₱'),
('Polish Zloty', 'PLN', 'zł'),
('Qatari Rial', 'QAR', 'ر.ق'),
('Romanian Leu', 'RON', 'lei'),
('Russian Ruble', 'RUB', '₽'),
('Rwandan Franc', 'RWF', 'RF'),
('Saint Helena Pound', 'SHP', '£'),
('Samoan Tala', 'WST', 'T'),
('Sao Tome and Principe Dobra', 'STD', 'Db'),
('Saudi Riyal', 'SAR', 'ر.س'),
('Serbian Dinar', 'RSD', 'РСД'),
('Seychellois Rupee', 'SCR', '₨'),
('Sierra Leonean Leone', 'SLL', 'Le'),
('Singapore Dollar', 'SGD', '$'),
('Solomon Islands Dollar', 'SBD', '$'),
('Somali Shilling', 'SOS', 'S'),
('South African Rand', 'ZAR', 'R'),
('South Korean Won', 'KRW', '₩'),
('Sri Lankan Rupee', 'LKR', 'Rs'),
('Sudanese Pound', 'SDG', 'ج.س.'),
('Swedish Krona', 'SEK', 'kr'),
('Swiss Franc', 'CHF', 'Fr.'),
('Surinamese Dollar', 'SRD', '$'),
('Swazi Lilangeni', 'SZL', 'L'),
('Syrian Pound', 'SYP', '£S'),
('Tajikistani Somoni', 'TJS', 'ЅМ'),
('Tanzanian Shilling', 'TZS', 'Sh'),
('Thai Baht', 'THB', '฿'),
('Tongan Pa''anga', 'TOP', 'T$'),
('Trinidad and Tobago Dollar', 'TTD', 'TT$'),
('Tunisian Dinar', 'TND', 'د.ت'),
('Turkish Lira', 'TRY', '₺'),
('Turkmenistani Manat', 'TMT', 'T'),
('Ugandan Shilling', 'UGX', 'USh'),
('Ukrainian Hryvnia', 'UAH', '₴'),
('United Arab Emirates Dirham', 'AED', 'د.إ'),
('United States Dollar', 'USD', '$'),
('Uruguayan Peso', 'UYU', '$'),
('Uzbekistan Som', 'UZS', 'so''m'),
('Vanuatu Vatu', 'VUV', 'VT'),
('Venezuelan Bolívar', 'VES', 'Bs.'),
('Vietnamese Dong', 'VND', '₫'),
('Yemeni Rial', 'YER', '﷼'),
('Zambian Kwacha', 'ZMW', 'ZK'),
('Zimbabwean Dollar', 'ZWL', 'Z$');

-- Insert Items for Expense Categories

-- Insert Items for Essentials
INSERT INTO categories (name, category_type) VALUES
('Groceries', 'expense'),
('Utilities', 'expense'),
('Rent or Mortgage', 'expense'),
('Insurance', 'expense'),
('Taxes', 'expense'),
('Loan Repayment', 'expense'),
('Healthcare', 'expense');

-- Insert Items for Transportation
INSERT INTO categories (name, category_type) VALUES
('Vehicle Costs', 'expense'),
('Public Transportation', 'expense'),
('Fuel & Gas', 'expense'),
('Vehicle Maintenance', 'expense'),
('Parking & Tolls', 'expense');

-- Insert Items for Food & Dining
INSERT INTO categories (name, category_type) VALUES
('Dining Out', 'expense'),
('Alcoholic Beverages', 'expense'),
('Coffee & Snacks', 'expense'),
('Fast Food', 'expense'),
('Fine Dining', 'expense');

-- Insert Items for Entertainment & Leisure
INSERT INTO categories (name, category_type) VALUES
('Entertainment', 'expense'),
('Hobbies & Interests', 'expense'),
('Sports & Recreation', 'expense'),
('Movies & Events', 'expense'),
('Travel & Vacations', 'expense');

-- Insert Items for Shopping
INSERT INTO categories (name, category_type) VALUES
('Clothing and Apparel', 'expense'),
('Electronics & Gadgets', 'expense'),
('Home & Decor', 'expense'),
('Personal Care', 'expense'),
('Books & Media', 'expense'),
('Gifts & Celebrations', 'expense');

-- Insert Items for Technology & Gadgets
INSERT INTO categories (name, category_type) VALUES
('Computer Hardware', 'expense'),
('Software and Apps', 'expense'),
('Tech Accessories', 'expense');

-- Insert Items for Education & Learning
INSERT INTO categories (name, category_type) VALUES
('Tuition and Courses', 'expense'),
('School Supplies', 'expense'),
('Books & Publications', 'expense'),
('Educational Tools', 'expense'),
('Online Learning', 'expense');

-- Insert Items for Savings & Investments
INSERT INTO categories (name, category_type) VALUES
('Savings', 'expense'),
('Investments', 'expense'),
('Retirement Savings', 'expense'),
('Stock Market', 'expense'),
('Cryptocurrency', 'expense');

-- Insert Items for Business Expenses
INSERT INTO categories (name, category_type) VALUES
('Home Office', 'expense'),
('Marketing & Advertising', 'expense'),
('Office Supplies', 'expense'),
('Professional Fees', 'expense'),
('Travel for Work', 'expense');

-- Insert Items for Travel & Adventures
INSERT INTO categories (name, category_type) VALUES
('Flights and Airlines', 'expense'),
('Accommodation', 'expense'),
('Dining Abroad', 'expense'),
('Souvenirs', 'expense'),
('Adventure Activities', 'expense');

-- Insert Items for Family & Childcare
INSERT INTO categories (name, category_type) VALUES
('Childcare & Babysitters', 'expense'),
('Children''s Education', 'expense'),
('Family Activities', 'expense'),
('Kids'' Essentials', 'expense'),
('Family Celebrations', 'expense');

-- Insert Items for Philanthropy
INSERT INTO categories (name, category_type) VALUES
('Charitable Donations', 'expense'),
('Community Support', 'expense'),
('Fundraising', 'expense'),
('Volunteering', 'expense');

-- Insert Items for Pets & Animals
INSERT INTO categories (name, category_type) VALUES
('Pet Food/Supplies', 'expense'),
('Veterinary Care', 'expense'),
('Pet Services', 'expense'),
('Pet Accessories', 'expense');

-- Insert Items for Home Improvement
INSERT INTO categories (name, category_type) VALUES
('Home Renovation', 'expense'),
('Furniture & Decor', 'expense'),
('Maintenance & Repairs', 'expense'),
('Gardening & Landscaping', 'expense');

-- Insert Items for Legal & Financial
INSERT INTO categories (name, category_type) VALUES
('Legal Services', 'expense'),
('Financial Planning', 'expense'),
('Taxes & Deductions', 'expense'),
('Debt Payments', 'expense');

-- Insert Items for Art & Culture
INSERT INTO categories (name, category_type) VALUES
('Art Supplies', 'expense'),
('Museum/Gallery Visits', 'expense'),
('Art Collectibles', 'expense'),
('Cultural Experiences', 'expense');

-- Insert Items for Health & Wellness
INSERT INTO categories (name, category_type) VALUES
('Fitness and Gym', 'expense'),
('Health Supplements', 'expense'),
('Medical Bills', 'expense'),
('Mental Health', 'expense'),
('Wellness Retreats', 'expense');

-- Insert Items for Unique Hobbies
INSERT INTO categories (name, category_type) VALUES
('Collectibles and Rare Items', 'expense'),
('Unique Hobbies', 'expense'),
('Craft Supplies', 'expense'),
('Special Collections', 'expense');

-- Insert Items for Events & Celebrations
INSERT INTO categories (name, category_type) VALUES
('Birthdays & Parties', 'expense'),
('Wedding & Engagement', 'expense'),
('Anniversaries', 'expense'),
('Special Occasions', 'expense');

-- Insert Items for Other Expenses
INSERT INTO categories (name, category_type) VALUES
('Miscellaneous Expenses', 'expense'),
('Unforeseen Costs', 'expense'),
('Unexpected Expenses', 'expense');


-- Insert Items for Income Categories

INSERT INTO categories (name, category_type) VALUES
('Salary/Wage', 'income'),
('Freelance Work', 'income'),
('Business Income', 'income'),
('Rental Income', 'income'),
('Investment Income', 'income'),
('Side Hustle', 'income'),
('Online Sales', 'income'),
('Consulting Fees', 'income'),
('Commission', 'income'),
('Dividends', 'income'),
('Interest', 'income'),
('Royalties', 'income'),
('Pension', 'income'),
('Annuities', 'income'),
('Gifts & Inheritance', 'income'),
('Alimony', 'income'),
('Government Assistance', 'income'),
('Rental Property', 'income'),
('Blog/Website Income', 'income'),
('Selling Crafts', 'income'),
('Teaching/Tutoring', 'income'),
('Music/Art Sales', 'income'),
('Real Estate Sales', 'income'),
('Ad Revenue', 'income'),
('Licensing Fees', 'income'),
('Grants & Scholarships', 'income'),
('Gig Economy', 'income'),
('Airbnb Income', 'income'),
('Crowdfunding', 'income'),
('Partnership Income', 'income'),
('Other Income', 'income');

-- Insert items for Transactions
INSERT INTO transactions (amount, transaction_type, description, date, user_id, category_id)
VALUES
  (100.00, 'income', 'Salary deposit', '2023-01-05', 1, 93),
  (45.99, 'expense', 'Grocery shopping', '2023-01-10', 1, 1),
  (500.00, 'income', 'Freelance payment', '2023-01-15', 1, 94),
  (29.99, 'expense', 'Dining out', '2023-01-20', 1, 13),
  (120.00, 'income', 'Part-time job', '2023-01-25', 1, 93),
  (89.99, 'expense', 'Online shopping', '2023-02-03', 1, 24),
  (300.00, 'income', 'Investment dividend', '2023-02-10', 1, 102),
  (35.00, 'expense', 'Transportation', '2023-02-18', 1, 9),
  (150.00, 'income', 'Consulting fee', '2023-02-25', 1, 98),
  (20.99, 'expense', '', '2023-03-02', 1, 15);

INSERT INTO transactions (amount, transaction_type, description, date, user_id, category_id)
VALUES
  (75.50, 'expense', 'Grocery shopping', current_date - interval '2 days', 1, 1),
  (29.99, 'expense', 'Dining out', current_date - interval '5 days', 1, 2),
  (15.00, 'expense', 'Transportation', current_date - interval '7 days', 2, 3),
  (45.99, 'expense', 'Online shopping', current_date - interval '12 days', 2, 4),
  (22.50, 'expense', 'Utilities', current_date - interval '15 days', 1, 5),
  (80.00, 'expense', 'Rent', current_date - interval '18 days', 1, 6),
  (36.75, 'expense', 'Healthcare', current_date - interval '21 days', 2, 7),
  (50.00, 'expense', 'Education', current_date - interval '23 days', 1, 8),
  (18.99, 'expense', 'Entertainment', current_date - interval '28 days', 2, 9),
  (30.25, 'expense', 'Home improvement', current_date - interval '30 days', 1, 10),
  (500.00, 'income', 'Freelance payment', current_date - interval '3 days', 2, 11),
  (120.00, 'income', 'Part-time job', current_date - interval '6 days', 1, 11),
  (600.00, 'income', 'Salary deposit', current_date - interval '10 days', 1, 11),
  (300.00, 'income', 'Investment dividend', current_date - interval '13 days', 2, 11),
  (200.00, 'income', 'Consulting fee', current_date - interval '17 days', 1, 11),
  (450.00, 'income', 'Online sales', current_date - interval '20 days', 2, 11),
  (180.00, 'income', 'Rent income', current_date - interval '24 days', 1, 11),
  (250.00, 'income', 'Interest income', current_date - interval '26 days', 2, 11),
  (90.00, 'income', 'Side project payment', current_date - interval '32 days', 1, 11),
  (350.00, 'income', 'Advisory fee', current_date - interval '37 days', 2, 11);