# Twitter Client App

## Demo
https://twitter-client-app.herokuapp.com

## Technologie wykorzystane do stworzenia aplikacji

1) serwer: Node.js (Express.js)
2) klient: Angular5
3) baza danych: MongoDb (Mongoose ORM)

## Opis procesu budowania aplikacji

Prace rozpoczęto od przestudiowania dokumentacji Api Twittera, w którym znajdują się niezbędnę informacje dotyczące implementacji autentykacji użytkownika za pomocą OAuth oraz korzystania z Api.

Nastepnym krokiem było stworzenie aplikacji "wchmiel_twitter_app" w "Twitter Application Management", dzięki czemu uzyskano niezbędne dane: Consumer Key, Consumer Secret. Ustawiono także Callback Url na środowisko lokalne "http://127.0.0.1:3000/auth/twitter/callback". Stworzono szkielet aplikacji w frameworku Node.js - Express.

Pozwoliło to następnie na stworzenie trzy etapowego procesu logowania użytkownika do aplikacji:
1) uzyskanie danych: token, token_secret po wysłaniu http post "https://api.twitter.com/oauth/request_token",
2) redirect użytkownika do strony twittera gdzie zostaje wyświetlona akceptacja warunków korzystania z danych użytkownika przez aplikację oraz logowanie do Twittera. Po zalogowaniu twitter wysyła dane: oauth_token, oauth_verifier z powrotem do aplikacji,
3) po wysłaniu http get "https://api.twitter.com/oauth/access_token" z danymi: consumer_key, consumer_secret, token, token_secret, verifier otrzymanie danych: oauth_token oraz oauth_token_secret.

Po otrzymaniu danych weryfikacyjnych użytkownika zdecydowano się na zapis tych danych do bazy oraz generowanie Json Web Tokena z czasem ważności ustawionym na 60 minut (wykorzystano w tym celu bibliotekę auth0/node-jsonwebtoken). Dzięki temu tokeny z twittera były dostępne przez użytkownika, który przy wysłaniu żądania dostarczał właściwy, nieprzeterminowany token. Po stronie klienta token był przechowywany w Local Storage i wysyłany przy każdym żądaniu http do serwera.

Nastepnym krokiem było stworzenie modułów do komunikacji z api twittera (wysyłanie tweetów oraz otrzymywanie danych o użytkowniku). Na potrzeby zadania stworzono nastepujące moduły:
- add-tweet.js - dodawanie tweetów
- get-followers-list.js - otrzymywanie listy obserwujących użytkownika
- get-friends-list.js - otrzymywanie listy osób które obserwuje użytkownik
- get-user-timeline.js - otrzymywanie listy tweetów dodanych przez użytkownika
- get-user.js - otrzymywanie danych o użytkowniku

Do testowania modułów komunikacji z api tweetera oraz api serwera wykorzystano Postmana i framework Mocha. Testy autmoatyczne znajdują się w server-tests/twitter-api.test.js .

Kolejnym etapem prac było stworzenie aplikacji klienckiej SPA, w tym celu wykorzystano framework Angular5. Do stylizacji użyto preprocesora css - sass oraz frameworka Bootstrap v4.

Aplikacja składa się z dwóch widoków:
1) dla niezalogowanego użytkownika - strona logowania
2) dla zalogowanego użytkownika - strona z profilem użytkownika
- nazwa użytkownika, login i zdjęcie profilowe
- 5-ciu ostatnich obserwujących
- listę obserwowanych
- ostatnie 10 tweetów użytkownika
- modal z formularzem do dodawania tweetów
- flash-messenger do wyświetlania informacji dla użytkownika


## Opis procesu uruchamiania aplikacji

W konsoli:
1) npm install - instalacja wszystkich bibliotek
2) sudo service mongod start - uruchomienie bazy danych MongoDb
3) node server.js - uruchomienie serwera na porcie 3000

W przeglądarce:
1) localhost:3000


Uruchomienie testów automatycznych:
(Aby testy Api Twittera były pozytywne należy dodać dane dotyczące tokenów otrzymanych z Twittera do obiektu "realAuthData" w pliku server-tests/twitter-api.test.js)

w konsoli:
1) npm run mocha-test
