import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ofd-agregator-accessibility',
  templateUrl: './accessibility.component.html',
  styleUrls: ['./accessibility.component.scss']
})
export class AccessibilityComponent implements OnInit {
  public pageContent = `    <p>
      Instytut Biologii Ssaków Polskiej Akademii Nauk zobowiązuje się zapewnić dostępność swojej strony internetowej zgodnie
      z ustawą z dnia 4 kwietnia 2019 r. o dostępności cyfrowej stron internetowych i aplikacji mobilnych podmiotów
      publicznych. Oświadczenie w sprawie dostępności ma zastosowanie do strony repozytorium Open Forest Data, dostępnego
      pod adresem openforestdata.pl.
    </p>
    <p>
      Data publikacji strony internetowej: 2020-08-07. Data ostatniej istotnej aktualizacji: 2020-03-05.
    </p>
    <p>
      Strona internetowa jest zgodna z ustawą z dnia 4 kwietnia 2019 r. o dostępności cyfrowej stron internetowych i
      aplikacji mobilnych podmiotów publicznych. Oświadczenie sporządzono dnia 2020-03-05. Deklarację sporządzono na
      podstawie samooceny przeprowadzonej przez podmiot publiczny.
    </p>
    <p>
      Na stronie internetowej można używać standardowych skrótów klawiaturowych przeglądarki.
    </p>
    <br/>
    <h3>
      Informacje zwrotne i dane kontaktowe
    </h3>
    <p>
      W przypadku problemów z dostępnością strony internetowej prosimy o kontakt. Osobą kontaktową jest Joanna Łapińska,
      jlapinska@ibs.bialowieza.pl. Kontaktować można się także dzwoniąc na numer telefonu (+48) 85 682 77 50. Tą samą drogą
      można składać wnioski o udostępnienie informacji niedostępnej oraz składać żądania zapewnienia dostępności.
    </p>
    <p>
      Każdy ma prawo do wystąpienia z żądaniem zapewnienia dostępności cyfrowej strony internetowej, aplikacji mobilnej lub
      jakiegoś ich elementu. Można także zażądać udostępnienia informacji za pomocą alternatywnego sposobu dostępu, na
      przykład przez odczytanie niedostępnego cyfrowo dokumentu, opisanie zawartości filmu bez audiodeskrypcji itp. Żądanie
      powinno zawierać dane osoby zgłaszającej żądanie, wskazanie, o którą stronę internetową lub aplikację mobilną chodzi
      oraz sposób kontaktu. Jeżeli osoba żądająca zgłasza potrzebę otrzymania informacji za pomocą alternatywnego sposobu
      dostępu, powinna także określić dogodny dla niej sposób przedstawienia tej informacji. Podmiot publiczny powinien
      zrealizować żądanie niezwłocznie, nie później niż w ciągu 7 dni od dnia wystąpienia z żądaniem. Jeżeli dotrzymanie
      tego terminu nie jest możliwe, podmiot publiczny niezwłocznie informuje o tym wnoszącego żądanie, kiedy realizacja
      żądania będzie możliwa, przy czym termin ten nie może być dłuższy niż 2 miesiące od dnia wystąpienia z żądaniem.
      Jeżeli zapewnienie dostępności cyfrowej nie jest możliwe, podmiot publiczny może zaproponować alternatywny sposób
      dostępu do informacji. W przypadku, gdy podmiot publiczny odmówi realizacji żądania zapewnienia dostępności lub
      alternatywnego sposobu dostępu do informacji, wnoszący żądanie możne złożyć skargę w sprawie zapewniana dostępności
      cyfrowej strony internetowej, aplikacji mobilnej lub elementu strony internetowej, lub aplikacji mobilnej. Po
      wyczerpaniu wskazanej wyżej procedury można także złożyć wniosek do Rzecznika Praw Obywatelskich.
    </p>
    <p>Link do strony internetowej <a href="https://www.rpo.gov.pl/" target="_blank">Rzecznika Praw Obywatelskich</a>.</p>
    `;

  constructor() {}

  ngOnInit(): void {}
}
