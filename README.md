Poštovani,

Zahvaljujem se na prijavi za poziciju front-end developera te vam u nastavku maila šaljem zadatak.

Općenito
- [x] prilagodba je za sve aktualne verzije browsera (FF, CHROME, IE) + 2 verzije ispod
- [x] pristup prema funkcionalnostima koje nisu podržane od strane browsera je “gracefull degradation”
- [x] preporučeno je load-ati vanjske library/framework-e pomoću package managera (npr. bower)

Priloženi design
- [x] nije potrebno rezati dizajn u "pixel perfect” stilu, dopuštena su manja odstupanja od predloška
- [x] priloženi dizajn je u Illustrator i Photoshop formatu
- [x] priložen je icon font koji sadrži sve ikone u font formatu

Responsive
- [x] navigacija je slide from left
- [x] dopuštena je sloboda prikaza na tablet varijaciji
- [x] oprez, banner element mijenja poziciju ovisno o mobile i desktop varijaciji

HTML
- [x] HTML5 sintaksa
- [x] nije preporučeno koristiti HTML framework-e

CSS
- [x] korištenje SASS-a je obavezno
- [x] nije preporučeno koristiti CSS framework-e
- [x] preporučeno je koristiti CSS3
- [x] potrebno je razdvojiti scss fileove po komponentama (header, slider, navigacija i slično)
- [x] poželjno je postaviti sass-watch file unutar bin foldera ili pokrenuti sam sass-watch kroz grunt task
- [x] ikone je preporučeno izvesti u SVG ili font formatu
- [x] za prikaz fonta (tekst) se koristi google fonts

Javascript
- [x] odvojene JS komponente trebaju se nalaziti u odvojenim fileovima
- [x] potrebno je napravit grunt task za minifikaciju i concat JS fileova

Login
- [x] potrebno je prikazati login unutar popupa i submitati formu pomoću AJAX-a na script.php (nalazi se unutar dropbox foldera)
- [x] AJAX GET vraća html za login koji je potrebno includeati unutar popupa
- [x] AJAX POST sluzi za submit forme na php skriptu
- [x] u slučaju da su username i password ispravni, POST vrača status 200 u headeru, te je login uspješan pa je potrebno ispisati poruku korisniku o statusu
- [x] u slučaju da je nešto krivo kod submita forme, POST vraća status 400 u headeru i JSON s popisom grešaka. Potrebno je javiti korisniku koje i gdje su greške te to i naznačiti u login formi
- [x] html se slobodno može prilagoditi
- [x] testni podaci su -> username: “testuser”, password: “testpass"

Priloženi fileovi:
https://www.dropbox.com/sh/157i3wtb5m7719h/AACfTGt2hveTts2UY-j3KoQ-a?dl=0

Rješenje zadatka je potrebno poslati na ovu e-mail adresu unutar 10 dana od primitka zadatka.
Uz rješenje napišite kako ste saznali za naš natječaj i vrijeme koje Vam je bilo potrebno za rješavanje zadatka.
