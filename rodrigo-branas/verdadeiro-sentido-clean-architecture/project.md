Sistema de leilao

- Requisitos funcionais:
* O leilão abre e fecha em horários específicos, não serão aceitos lances fora
destes horários.
* Existe um valor mínimo, lances abaixo deste valor mínimo não serão aceitos.
* Um novo lance deve ser sempre maior que o maior lance existente mais o valor
mínimo de acréscimo.
* Não é permitido que a mesma pessoa dê lances seguidos.
* O leilão só pode ser encerrado quando passar do horário de término.

- Requisitos não funcionais:
* Deve existir uma API para cadastrar leilões e dar lances.
* Deve existir um WebSocket para acompanhar os lances.
