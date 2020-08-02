# presentation

Приложение для презентаций.

Работает в 2 режимах:

- Редактор;
- Режим просмотра.

## Редактор

В данном режиме происходит создание и управление презентацией.

Элементы являются слайдами, линии - связи между слайдами. У каждого слайда есть по 4 сектора для соединения связями с другими слайдами. При нажатии на сектор появляется связанный слайд. Также возможно соединение связью при помощи drag'n'drop.

При создании презентации появляется корневой элемент, который невозможно удалить.

Все элементы и связи между ними можно переносить, создавать, редактировать и удалять.
Контент выделенного слайда можно редактировать, выделив его и нажав `Edit`. Затем для сохранения необходимо нажать `Save`.
Для редактирования контента используется ckeditor.

Очистить презентацию можно при помощи `Clear`.

Для просмотра презентации следует нажать на `View`.

### Управление

- ЛКМ - выделить элемент / снять выделение с элемента;
- Shift - управление секторами;
- Delete - удалить выделенные элементы / связи;
- Escape - выйти из редактирования слайда.

## Режим просмотра

Просмотр созданной презентации при помощи клавиш. Начинается с корневого слайда.

### Управление

- 1 или стрелка вверх - переключение на слайд сверху;
- 2 или стрелка вправо - переключение на слайд справа;
- 3 или стрелка вниз - переключение на слайд снизу;
- 4 или стрелка влево - переключение на слайд слева;
- Escape - выйти из режима презентации.