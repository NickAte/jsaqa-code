Feature: Booking ticket- Tests

	Scenario: Positive - Should book one seat
		Given user is on start page "http://qamid.tmweb.ru/client/index.php"
		When user chooses day "7" of the week
		When user chooses movie "2" and time "2"
		When user chooses seat "10" and "10"
		When user click on button 'Забронировать'
		When user click on button 'Получить код бронирования'
		Then user can see QR code
		Then user sees the header 'Электронный билет'

			Scenario: Positive - Should book VIP seat
		Given user is on start page "http://qamid.tmweb.ru/client/index.php"
		When user chooses day "7" of the week
		When user chooses movie "2" and time "2"
		When user chooses Vip seat "3"
		When user click on button 'Забронировать'
		When user click on button 'Получить код бронирования'
		Then user can see QR code
		Then user sees the header 'Электронный билет'

	Scenario: Positive - Should book one seat
		Given user is on start page "http://qamid.tmweb.ru/client/index.php"
		When user chooses day "7" of the week
		When user chooses movie "2" and time "2"
		When user chooses seat "9" and "1"
		When user chooses seat "9" and "2"
		When user click on button 'Забронировать'
		When user click on button 'Получить код бронирования'
		Then user can see QR code
		Then user sees the header 'Электронный билет'

	Scenario: Negative - Should not book any seats
		Given user is on start page "http://qamid.tmweb.ru/client/index.php"
		When user chooses day "7" of the week
		When user chooses movie "2" and time "2"
		Then button 'Забронировать' not active