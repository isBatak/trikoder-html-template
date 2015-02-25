Poštovani,

Zahvaljujem se na prijavi za poziciju front-end developera te vam u nastavku maila šaljem zadatak.

Općenito
- [ ] prilagodba je za sve aktualne verzije browsera (FF, CHROME, IE) + 2 verzije ispod
- [ ] pristup prema funkcionalnostima koje nisu podržane od strane browsera je “gracefull degradation”
- [ ] preporučeno je load-ati vanjske library/framework-e pomoću package managera (npr. bower)

Priloženi design
- [ ] nije potrebno rezati dizajn u "pixel perfect” stilu, dopuštena su manja odstupanja od predloška
- [ ] priloženi dizajn je u Illustrator i Photoshop formatu
- [ ] priložen je icon font koji sadrži sve ikone u font formatu

Responsive
- [ ] navigacija je slide from left
- [ ] dopuštena je sloboda prikaza na tablet varijaciji
- [ ] oprez, banner element mijenja poziciju ovisno o mobile i desktop varijaciji

HTML
- [ ] HTML5 sintaksa
- [ ] nije preporučeno koristiti HTML framework-e

CSS
- [ ] korištenje SASS-a je obavezno
- [ ] nije preporučeno koristiti CSS framework-e
- [ ] preporučeno je koristiti CSS3
- [ ] potrebno je razdvojiti scss fileove po komponentama (header, slider, navigacija i slično)
- [x] poželjno je postaviti sass-watch file unutar bin foldera ili pokrenuti sam sass-watch kroz grunt task
- [x] ikone je preporučeno izvesti u SVG ili font formatu
- [ ] za prikaz fonta (tekst) se koristi google fonts

Javascript
- [ ] odvojene JS komponente trebaju se nalaziti u odvojenim fileovima
- [ ] potrebno je napravit grunt task za minifikaciju i concat JS fileova

Login
- [ ] potrebno je prikazati login unutar popupa i submitati formu pomoću AJAX-a na script.php (nalazi se unutar dropbox foldera)
- [ ] AJAX GET vraća html za login koji je potrebno includeati unutar popupa
- [ ] AJAX POST sluzi za submit forme na php skriptu
- [ ] u slučaju da su username i password ispravni, POST vrača status 200 u headeru, te je login uspješan pa je potrebno ispisati poruku korisniku o statusu
- [ ] u slučaju da je nešto krivo kod submita forme, POST vraća status 400 u headeru i JSON s popisom grešaka. Potrebno je javiti korisniku koje i gdje su greške te to i naznačiti u login formi
- [ ] html se slobodno može prilagoditi
- [ ] testni podaci su -> username: “testuser”, password: “testpass"

Priloženi fileovi:
https://www.dropbox.com/sh/157i3wtb5m7719h/AACfTGt2hveTts2UY-j3KoQ-a?dl=0

Rješenje zadatka je potrebno poslati na ovu e-mail adresu unutar 10 dana od primitka zadatka.
Uz rješenje napišite kako ste saznali za naš natječaj i vrijeme koje Vam je bilo potrebno za rješavanje zadatka.
