# Baza filmova i serija
<table>
<tr>
<td>
 Ova veb-aplikacija koristi TMDb-Api da prikaže najpopularnije filmove i serije, filmove koji se trnutno prikazuju u bioskopima
  i omogućava pretragu fimova i serija po nazivu.
</td>
</tr>
</table>

## Demo
Ovo je demo prikaz veb-aplikacije :  https://crown123.github.io/bazaFilmovaiSerija/html/index.html

## Sajt

### Početna strana
Na početnoj strani imamo jedan tekst dobrodošlice, najpopularnije filmove i serije trenutno, filmove koji se prikazuju
u bioskopima sada.

![](https://github.com/Crown123/bazaFilmovaiSerija/blob/master/readmeSlike/slika1.png)

![](https://github.com/Crown123/bazaFilmovaiSerija/blob/master/readmeSlike/slika2.png)

### Strane za pretragu filmoova i serija
Ima samo search bar za kucanje naziva filma ili serije

![](https://github.com/Crown123/bazaFilmovaiSerija/blob/master/readmeSlike/slika5.png)

Dobijamo rezultate za taj naziv

![](https://github.com/Crown123/bazaFilmovaiSerija/blob/master/readmeSlike/slika7.png)

### Strana sa detaljima o filmu ili seriji
Sadrži osnovne podatke o filmu ili seriji, radnju filma/serije

![](https://github.com/Crown123/bazaFilmovaiSerija/blob/master/readmeSlike/slika3.png)

Video trejler za film/serijju

![](https://github.com/Crown123/bazaFilmovaiSerija/blob/master/readmeSlike/slika4.png)

## Prikaz na telefonu
Veb-aplikacije je responzivna i kompatibilna je za prikaz na telefonu ili tabletu

![](https://github.com/Crown123/bazaFilmovaiSerija/blob/master/readmeSlike/slika8.png)
![](https://github.com/Crown123/bazaFilmovaiSerija/blob/master/readmeSlike/slika9.png)

## Napravljeno pomoću
Tehnologije koje su korišćene za pravljenje ove veb-aplikacije

- [HTML - CSS](https://www.w3schools.com/html/html_css.asp) - Korišćeni za izgled stranica
- [TMDb API](https://developers.themoviedb.org/3) - TMDb je veb-sajt na kojem mogu da se nađu sve moguće informacije vezane za filmove i serija, takođe imaju svoj API koji je besplatan za korišćenje za nekomercijalnu upotrebu, dok se komercijalna upotreba plaća. 
- [JavaScript-jQuery](https://www.w3schools.com/jquery/) - Najveći deo projekta urađen je pomoću vanila javascrript-a, samo deo navigacije sa jQuery-em. 
 [Axios](https://appdividend.com/2018/08/30/getting-started-with-axios-tutorial-example/) - Axios je Javascript biblioteka koja se koristi za slanje HTTP zahteva sa node.js ili XMLHttpRequests iz brauzera. Kada dobijemoodgovor ne moramo da ga prosleđujemo JSON metodu već se to automatksi izvršava. Lakše hvatanje grešaka sa catch().


## Šta dalje?
- Omogućiti pretrage po žanru, imenu glumca i godini u kojoj je film izašao
- Informacije o glumcima
- Dodati informacije o sezonama i epizodama serija u stranicu sa detaljima
- Mogućnost pravljenja naloga i prijave, koji omogućava pravljenje liste omiljenih filmova, filmova koje treba pogledati itd.
- Dodati loading spiner kada se otvara stranica sa detaljima


